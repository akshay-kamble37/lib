import crypto from 'node:crypto';

const SESSION_SECRET =
  process.env.ADMIN_SESSION_SECRET || 'sggs-library-development-secret';

function verifyToken(token) {
  if (!token) return null;

  const parts = token.split('.');
  if (parts.length !== 2) return null;

  const [payload, signature] = parts;

  const expected = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(payload)
    .digest('base64url');

  if (signature !== expected) return null;

  try {
    const data = JSON.parse(
      Buffer.from(payload, 'base64url').toString('utf8')
    );

    if (!data.exp || data.exp < Date.now()) {
      return null;
    }

    return data;
  } catch {
    return null;
  }
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      authenticated: false,
      error: 'Method not allowed'
    });
  }

  const cookies = req.headers.cookie || '';

  const match = cookies.match(
    /(?:^|;\s*)sggs_admin_session=([^;]+)/
  );

  const session = verifyToken(match?.[1]);

  if (!session) {
    return res.status(200).json({
      authenticated: false,
      user: null
    });
  }

  return res.status(200).json({
    authenticated: true,
    user: {
      email: session.email,
      role: session.role
    }
  });
}