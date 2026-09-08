import crypto from 'node:crypto';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const SESSION_SECRET =
  process.env.ADMIN_SESSION_SECRET || 'sggs-library-development-secret';

function createToken(email) {
  const payload = Buffer.from(
    JSON.stringify({
      email,
      role: 'admin',
      exp: Date.now() + 24 * 60 * 60 * 1000
    })
  ).toString('base64url');

  const signature = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(payload)
    .digest('base64url');

  return `${payload}.${signature}`;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      ok: false,
      error: 'Method not allowed'
    });
  }

  try {
    const { email, password } = req.body || {};

    if (
      email !== ADMIN_EMAIL ||
      password !== ADMIN_PASSWORD
    ) {
      return res.status(401).json({
        ok: false,
        error: 'Invalid administrator credentials'
      });
    }

    const token = createToken(email);

    res.setHeader(
      'Set-Cookie',
      `sggs_admin_session=${token}; HttpOnly; Path=/; Max-Age=86400; SameSite=Lax; Secure`
    );

    return res.status(200).json({
      ok: true,
      user: {
        email: ADMIN_EMAIL,
        role: 'admin'
      }
    });
  } catch {
    return res.status(500).json({
      ok: false,
      error: 'Authentication service error'
    });
  }
}