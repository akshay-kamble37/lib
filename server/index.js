import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(root, '..');
const dataFile = path.join(root, 'content.json');
const uploadDir = path.join(projectRoot, 'public', 'uploads');

fs.mkdirSync(uploadDir, { recursive: true });
if (!fs.existsSync(dataFile)) {
  fs.writeFileSync(dataFile, JSON.stringify({ announcements: [], papers: [], publications: [], books: [], resources: [] }, null, 2));
}

const send = (res, status, data) => {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(JSON.stringify(data));
};

const safeName = name => name.toLowerCase().replace(/[^a-z0-9._-]/g, '-').replace(/-+/g, '-');
const extensionFor = (mime, original) => {
  const ext = path.extname(original || '').toLowerCase();
  if (ext) return ext;
  const map = { 'image/jpeg': '.jpg', 'image/png': '.png', 'image/webp': '.webp', 'image/avif': '.avif', 'video/mp4': '.mp4', 'video/webm': '.webm', 'video/ogg': '.ogv' };
  return map[mime] || '';
};

function parseMultipart(buffer, boundary) {
  const marker = Buffer.from(`--${boundary}`);
  const parts = [];
  let cursor = buffer.indexOf(marker);
  while (cursor !== -1) {
    const next = buffer.indexOf(marker, cursor + marker.length);
    if (next === -1) break;
    const raw = buffer.slice(cursor + marker.length, next);
    const headerStart = raw.indexOf(Buffer.from('\r\n')) + 2;
    const headerEnd = raw.indexOf(Buffer.from('\r\n\r\n'));
    if (headerEnd > 0) {
      const headers = raw.slice(headerStart, headerEnd).toString('utf8');
      const body = raw.slice(headerEnd + 4);
      const disposition = headers.match(/Content-Disposition:\s*form-data;\s*name="([^"]+)"(?:;\s*filename="([^"]*)")?/i);
      const type = headers.match(/Content-Type:\s*([^\r\n]+)/i);
      if (disposition) {
        parts.push({
          name: disposition[1],
          filename: disposition[2] || '',
          type: type ? type[1].trim() : '',
          content: body
        });
      }
    }
    cursor = next;
  }
  return parts;
}

const server = http.createServer((req, res) => {
  if (req.method === 'OPTIONS') return send(res, 204, {});
  const url = new URL(req.url, 'http://localhost:8787');

  if (url.pathname === '/api/health' && req.method === 'GET') {
    return send(res, 200, { ok: true, service: 'SGGS Central Library content API' });
  }

  if (url.pathname === '/api/content' && req.method === 'GET') {
    return send(res, 200, JSON.parse(fs.readFileSync(dataFile, 'utf8')));
  }

  if (url.pathname === '/api/content' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
        send(res, 200, { ok: true, data });
      } catch {
        send(res, 400, { ok: false, error: 'Invalid JSON' });
      }
    });
    return;
  }

  if (url.pathname === '/api/upload' && req.method === 'POST') {
    const contentType = req.headers['content-type'] || '';
    const match = contentType.match(/multipart\/form-data;\s*boundary=(?:"([^"]+)"|([^;]+))/i);
    if (!match) return send(res, 400, { ok: false, error: 'Expected multipart/form-data' });
    const boundary = match[1] || match[2];
    const chunks = [];
    let total = 0;
    req.on('data', chunk => {
      total += chunk.length;
      if (total <= 80 * 1024 * 1024) chunks.push(chunk);
    });
    req.on('end', () => {
      if (total > 80 * 1024 * 1024) return send(res, 413, { ok: false, error: 'File exceeds 80 MB limit' });
      const file = parseMultipart(Buffer.concat(chunks), boundary).find(part => part.name === 'file');
      if (!file || !file.filename) return send(res, 400, { ok: false, error: 'No file selected' });
      const allowed = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'video/mp4', 'video/webm', 'video/ogg']);
      if (!allowed.has(file.type)) return send(res, 415, { ok: false, error: 'Unsupported media type' });
      const base = safeName(path.basename(file.filename, path.extname(file.filename))) || 'media';
      const ext = extensionFor(file.type, file.filename);
      const filename = `${base}-${crypto.randomBytes(5).toString('hex')}${ext}`;
      fs.writeFileSync(path.join(uploadDir, filename), file.content);
      return send(res, 201, { ok: true, url: `/uploads/${filename}`, filename, type: file.type, size: file.content.length });
    });
    return;
  }

  send(res, 404, { ok: false, error: 'Not found' });
});

server.listen(8787, () => console.log('SGGS Central Library API running at http://localhost:8787'));
