import crypto from 'node:crypto'
const secret =
  process.env.ADMIN_SESSION_SECRET || 'change-this-secret-before-production'
export const adminEmail = process.env.ADMIN_EMAIL || 'library@sggs.ac.in'
export const adminPassword = process.env.ADMIN_PASSWORD || 'library123'
export const sign = v =>
  crypto.createHmac('sha256', secret).update(v).digest('hex')
export const makeToken = () => {
  const p = Buffer.from(
    JSON.stringify({
      email: adminEmail,
      role: 'admin',
      exp: Date.now() + 28800000
    })
  ).toString('base64url')
  return `${p}.${sign(p)}`
}
export const getCookie = (req, n) => {
  const c = req.headers.cookie || ''
  const x = c
    .split(';')
    .map(v => v.trim())
    .find(v => v.startsWith(n + '='))
  return x ? decodeURIComponent(x.slice(n.length + 1)) : ''
}
export const verifyToken = t => {
  try {
    const [p, s] = t.split('.')
    if (!p || !s || s !== sign(p)) return null
    const d = JSON.parse(Buffer.from(p, 'base64url'))
    return d.exp > Date.now() ? d : null
  } catch {
    return null
  }
}
export const json = (res, status, data, headers = {}) => {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json')
  for (const [k, v] of Object.entries(headers)) res.setHeader(k, v)
  res.end(JSON.stringify(data))
}
export const readJson = req =>
  new Promise((resolve, reject) => {
    let b = ''
    req.on('data', c => (b += c))
    req.on('end', () => {
      try {
        resolve(JSON.parse(b || '{}'))
      } catch (e) {
        reject(e)
      }
    })
    req.on('error', reject)
  })
