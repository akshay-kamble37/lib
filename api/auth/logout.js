export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      ok: false,
      error: 'Method not allowed'
    });
  }

  res.setHeader(
    'Set-Cookie',
    'sggs_admin_session=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax; Secure'
  );

  return res.status(200).json({
    ok: true
  });
}