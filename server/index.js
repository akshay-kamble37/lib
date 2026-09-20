import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONTENT_FILE = path.join(__dirname, 'content.json');

const PORT = process.env.PORT || 8787;

const { ADMIN_EMAIL, ADMIN_PASSWORD, SESSION_SECRET } = process.env;

if (!ADMIN_EMAIL) throw new Error('Missing ADMIN_EMAIL in .env');
if (!ADMIN_PASSWORD) throw new Error('Missing ADMIN_PASSWORD in .env');
if (!SESSION_SECRET) throw new Error('Missing SESSION_SECRET in .env');

const app = express();

app.use(
  cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true,
  })
);
app.use(express.json({ limit: '25mb' }));
app.use(cookieParser(SESSION_SECRET));

/* ------------------------------------------------------------------
 * Local JSON storage
 * ------------------------------------------------------------------ */

async function readContent() {
  try {
    const raw = await fs.readFile(CONTENT_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    if (err.code === 'ENOENT') return {};
    throw err;
  }
}

async function writeContent(data) {
  await fs.writeFile(CONTENT_FILE, JSON.stringify(data, null, 2), 'utf8');
}

/* ------------------------------------------------------------------
 * Session helpers
 * ------------------------------------------------------------------ */

const COOKIE_NAME = 'sggs_session';
const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 7; // 7 days

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
  const idx = signed.lastIndexOf('.');
  if (idx === -1) return null;
  const value = signed.slice(0, idx);
  const sig = signed.slice(idx + 1);
  const expected = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(value)
    .digest('base64url');
  const a = Buffer.from(sig);
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
    sameSite: 'lax',
    secure: false,
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  });
}

function clearSessionCookie(res) {
  res.clearCookie(COOKIE_NAME, { path: '/' });
}

function getSessionUser(req) {
  const raw = req.cookies?.[COOKIE_NAME];
  const payload = unsign(raw);
  if (!payload) return null;
  try {
    const email = Buffer.from(payload, 'base64url').toString('utf8');
    if (!email) return null;
    // Return the full admin user shape the frontend expects.
    return { email, name: 'Administrator', role: 'admin' };
  } catch {
    return null;
  }
}

function requireAuth(req, res, next) {
  const user = getSessionUser(req);
  if (!user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  req.user = user;
  next();
}

/* ------------------------------------------------------------------
 * Auth routes
 * ------------------------------------------------------------------ */

app.get('/api/auth/session', (req, res) => {
  const user = getSessionUser(req);
  if (!user) {
    return res.status(401).json({ authenticated: false, user: null });
  }
  res.json({ authenticated: true, user });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body || {};

  if (
    typeof email !== 'string' ||
    typeof password !== 'string' ||
    email.trim().toLowerCase() !== ADMIN_EMAIL.trim().toLowerCase() ||
    password !== ADMIN_PASSWORD
  ) {
    return res
      .status(401)
      .json({ error: 'Invalid administrator credentials' });
  }

  const user = { ...ADMIN_USER };
  setSessionCookie(res, user.email);
  res.json({ user });
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
  } catch (err) {
    console.error('GET /api/content failed:', err);
    res.status(500).json({ error: 'Failed to load content' });
  }
});

app.post('/api/content', requireAuth, async (req, res) => {
  try {
    const body = req.body || {};
    await writeContent(body);
    res.json({ ok: true, data: body });
  } catch (err) {
    console.error('POST /api/content failed:', err);
    res.status(500).json({ error: 'Failed to save content' });
  }
});

/* ------------------------------------------------------------------
 * Upload route — disabled locally
 * ------------------------------------------------------------------ */

app.post('/api/upload', requireAuth, (req, res) => {
  res.status(503).json({
    error: 'Uploads are disabled in local mode (no Vercel Blob configured).',
  });
});

/* ------------------------------------------------------------------
 * Start
 * ------------------------------------------------------------------ */

app.listen(PORT, () => {
  console.log(`API server listening on http://localhost:${PORT}`);
});