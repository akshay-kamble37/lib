import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  departments,
  defaultBooks,
  defaultPapers,
  defaultResources,
  defaultPublications,
  defaultAnnouncements,
  defaultSite,
} from '../src/data/defaultData.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONTENT_FILE = path.join(__dirname, 'content.json');

const PORT = Number(process.env.PORT || 8787);
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

const { ADMIN_EMAIL, ADMIN_PASSWORD, SESSION_SECRET } = process.env;

if (!ADMIN_EMAIL) throw new Error('Missing ADMIN_EMAIL in .env');
if (!ADMIN_PASSWORD) throw new Error('Missing ADMIN_PASSWORD in .env');
if (!SESSION_SECRET) throw new Error('Missing SESSION_SECRET in .env');
if (IS_PRODUCTION && SESSION_SECRET.length < 32) {
  throw new Error('SESSION_SECRET must be at least 32 characters in production');
}

const app = express();

const configuredOrigins = String(process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map((value) => value.trim())
  .filter(Boolean);

const allowedOrigins = new Set([
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  ...configuredOrigins,
  ...(process.env.FRONTEND_URL ? [process.env.FRONTEND_URL.trim()] : []),
]);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.has(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error('CORS origin not allowed'));
    },
    credentials: true,
  })
);

app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());

/* ------------------------------------------------------------------
 * Default content / local JSON storage
 * ------------------------------------------------------------------ */

const clone = (value) => JSON.parse(JSON.stringify(value));

function defaultContent() {
  return {
    books: clone(defaultBooks),
    departments: clone(departments),
    resources: clone(defaultResources),
    papers: clone(defaultPapers),
    announcements: clone(defaultAnnouncements),
    publications: clone(defaultPublications),
    site: clone(defaultSite),
  };
}

async function ensureContentFile() {
  try {
    await fs.access(CONTENT_FILE);
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
    await fs.mkdir(path.dirname(CONTENT_FILE), { recursive: true });
    await fs.writeFile(
      CONTENT_FILE,
      JSON.stringify(defaultContent(), null, 2),
      'utf8'
    );
  }
}

async function readContent() {
  await ensureContentFile();

  try {
    const raw = await fs.readFile(CONTENT_FILE, 'utf8');
    const stored = JSON.parse(raw);
    const defaults = defaultContent();

    return {
      ...defaults,
      ...stored,
    };
  } catch (error) {
    console.error('Unable to read content.json:', error);
    return defaultContent();
  }
}

const CONTENT_KEYS = [
  'books',
  'departments',
  'resources',
  'papers',
  'announcements',
  'publications',
  'site',
];

function sanitizeContent(body, current) {
  const next = { ...current };

  for (const key of CONTENT_KEYS) {
    if (!(key in body)) continue;

    if (key === 'site') {
      if (!body.site || typeof body.site !== 'object' || Array.isArray(body.site)) {
        throw new Error('Invalid site payload');
      }
      next.site = body.site;
      continue;
    }

    if (!Array.isArray(body[key])) {
      throw new Error(`Invalid ${key} payload`);
    }

    if (body[key].length > 5000) {
      throw new Error(`${key} contains too many records`);
    }

    next[key] = body[key];
  }

  return next;
}

async function writeContent(body) {
  const current = await readContent();
  const next = sanitizeContent(body, current);

  await fs.mkdir(path.dirname(CONTENT_FILE), { recursive: true });

  const temporaryFile = `${CONTENT_FILE}.${process.pid}.${Date.now()}.tmp`;

  await fs.writeFile(
    temporaryFile,
    JSON.stringify(next, null, 2),
    'utf8'
  );

  await fs.rename(temporaryFile, CONTENT_FILE);

  return next;
}

/* ------------------------------------------------------------------
 * Session helpers
 * ------------------------------------------------------------------ */

const COOKIE_NAME = 'sggs_session';
const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 7;

const ADMIN_USER = {
  email: ADMIN_EMAIL,
  name: 'Administrator',
  role: 'admin',
};

function sign(value) {
  const hmac = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(value)
    .digest('base64url');

  return `${value}.${hmac}`;
}

function unsign(signed) {
  if (typeof signed !== 'string') return null;

  const index = signed.lastIndexOf('.');
  if (index === -1) return null;

  const value = signed.slice(0, index);
  const signature = signed.slice(index + 1);

  const expected = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(value)
    .digest('base64url');

  const a = Buffer.from(signature);
  const b = Buffer.from(expected);

  if (a.length !== b.length) return null;
  if (!crypto.timingSafeEqual(a, b)) return null;

  return value;
}

function setSessionCookie(res, email) {
  const payload = Buffer.from(email).toString('base64url');
  const token = sign(payload);

  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: IS_PRODUCTION ? 'none' : 'lax',
    secure: IS_PRODUCTION,
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  });
}

function clearSessionCookie(res) {
  res.clearCookie(COOKIE_NAME, {
    httpOnly: true,
    sameSite: IS_PRODUCTION ? 'none' : 'lax',
    secure: IS_PRODUCTION,
    path: '/',
  });
}

function getSessionUser(req) {
  const raw = req.cookies?.[COOKIE_NAME];
  const payload = unsign(raw);
  if (!payload) return null;

  try {
    const email = Buffer.from(payload, 'base64url').toString('utf8');
    if (!email) return null;

    if (email.trim().toLowerCase() !== ADMIN_EMAIL.trim().toLowerCase()) {
      return null;
    }

    return {
      email,
      name: 'Administrator',
      role: 'admin',
    };
  } catch {
    return null;
  }
}

function requireAuth(req, res, next) {
  const user = getSessionUser(req);

  if (!user) {
    return res.status(401).json({
      error: 'Not authenticated',
    });
  }

  req.user = user;
  next();
}

/* ------------------------------------------------------------------
 * Security / health
 * ------------------------------------------------------------------ */

app.disable('x-powered-by');

app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Cache-Control', 'no-store');
  next();
});

app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    service: 'sggs-library-api',
    storage: 'local-json',
  });
});

/* ------------------------------------------------------------------
 * Auth routes
 * ------------------------------------------------------------------ */

app.get('/api/auth/session', (req, res) => {
  const user = getSessionUser(req);

  if (!user) {
    return res.status(401).json({
      authenticated: false,
      user: null,
    });
  }

  res.json({
    authenticated: true,
    user,
  });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body || {};

  if (
    typeof email !== 'string' ||
    typeof password !== 'string' ||
    email.trim().toLowerCase() !== ADMIN_EMAIL.trim().toLowerCase() ||
    password !== ADMIN_PASSWORD
  ) {
    return res.status(401).json({
      error: 'Invalid administrator credentials',
    });
  }

  setSessionCookie(res, ADMIN_USER.email);
  res.json({ user: ADMIN_USER });
});

app.post('/api/auth/logout', (req, res) => {
  clearSessionCookie(res);
  res.json({ ok: true });
});

/* ------------------------------------------------------------------
 * Content routes
 * ------------------------------------------------------------------ */

app.get('/api/content', async (req, res) => {
  try {
    const data = await readContent();
    res.json(data);
  } catch (error) {
    console.error('GET /api/content failed:', error);
    res.status(500).json({
      error: 'Failed to load content',
    });
  }
});

app.post('/api/content', requireAuth, async (req, res) => {
  try {
    const saved = await writeContent(req.body || {});

    res.json({
      ok: true,
      data: saved,
    });
  } catch (error) {
    console.error('POST /api/content failed:', error);

    const status = /Invalid|too many/.test(error?.message || '')
      ? 400
      : 500;

    res.status(status).json({
      error: error?.message || 'Failed to save content',
    });
  }
});

/* ------------------------------------------------------------------
 * Upload route
 * ------------------------------------------------------------------ */

app.post('/api/upload', requireAuth, (req, res) => {
  res.status(503).json({
    error: 'Uploads are disabled in local JSON mode. Configure your media storage service before enabling uploads.',
  });
});

/* ------------------------------------------------------------------
 * Error handler
 * ------------------------------------------------------------------ */

app.use((error, req, res, next) => {
  console.error('Unhandled API error:', error);

  if (res.headersSent) {
    return next(error);
  }

  res.status(500).json({
    error: 'Server error',
  });
});

/* ------------------------------------------------------------------
 * Start
 * ------------------------------------------------------------------ */

app.listen(PORT, () => {
  console.log(`SGGS Library API listening on http://localhost:${PORT}`);
  console.log(`Content file: ${CONTENT_FILE}`);
});
