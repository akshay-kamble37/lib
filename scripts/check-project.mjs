import fs from 'node:fs'
import path from 'node:path'
const root = path.resolve('.'),
  errors = []
const walk = d => {
  for (const n of fs.readdirSync(d)) {
    if (['node_modules', '.git', 'dist'].includes(n)) continue
    const p = path.join(d, n)
    fs.statSync(p).isDirectory() ? walk(p) : files.push(p)
  }
}
const files = []
walk(path.join(root, 'src'))
for (const f of files.filter(x => x.endsWith('.jsx') || x.endsWith('.js'))) {
  const s = fs.readFileSync(f, 'utf8')
  if ((s.match(/export\s+default/g) || []).length > 1)
    errors.push('multiple default exports: ' + path.relative(root, f))
  if (/^\s*export\s*$/m.test(s))
    errors.push('bare export: ' + path.relative(root, f))
}
if (!fs.existsSync('public/library-tour.mp4')) errors.push('missing video')
if (errors.length) {
  console.error(errors.join('\n'))
  process.exit(1)
}
console.log('Project check passed.')
