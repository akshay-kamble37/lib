import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve('public/question-paper');
const OUT = path.resolve('public/question-paper-index.json');

const departmentNames = {
  CHEMICAL: 'Chemical Engineering',
  CIVIL: 'Civil Engineering',
  CSE: 'Computer Science & Engineering',
  ELECTRICAL: 'Electrical Engineering',
  EXTC: 'Electronics & Telecommunication Engineering',
  INSTRU: 'Instrumentation Engineering',
  IT: 'Information Technology',
  MECH: 'Mechanical Engineering',
  PROD: 'Production Engineering',
  TEXTILE: 'Textile Engineering',
  'MATH SY AND TY BSHM': 'Mathematics / Basic Sciences & Humanities',
  'FIRST YEAR ALL': 'All Departments',
  'FIRST YEAR': 'All Departments',
};

const romanToNumber = { I:1, II:2, III:3, IV:4, V:5, VI:6, VII:7, VIII:8 };

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    return entry.isFile() && entry.name.toLowerCase().endsWith('.pdf') ? [full] : [];
  });
}

function normalize(value) {
  return value.toLowerCase().replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim();
}

function detectYear(parts) {
  const text = normalize(parts.join(' '));
  if (/\b(final year|final)\b/.test(text)) return { value: 'Final', label: 'Final Year' };
  if (/\b(ty|third year|third)\b/.test(text)) return { value: 'Third', label: 'Third Year' };
  if (/\b(sy|second year|second)\b/.test(text)) return { value: 'Second', label: 'Second Year' };
  if (/\b(first year|first)\b/.test(text)) return { value: 'First', label: 'First Year' };
  return { value: 'Unknown', label: 'Year Not Specified' };
}

function detectSemester(parts) {
  const text = normalize(parts.join(' '));
  const patterns = [
    /(?:semester|sem|term)\s*[-_. ]*([1-8]|i{1,3}|iv|v|vi|vii|viii)\b/i,
    /\b([1-8]|i{1,3}|iv|v|vi|vii|viii)\s*(?:st|nd|rd|th)?\s*(?:semester|sem)\b/i,
  ];
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) {
      const raw = match[1].toUpperCase();
      const n = Number(raw) || romanToNumber[raw];
      if (n) return String(n);
    }
  }
  return 'Unknown';
}

function yearAllowedSemesters(year) {
  return ({ First:['I','II'], Second:['III','IV'], Third:['V','VI'], Final:['VII','VIII'] })[year] || [];
}

function cleanSubject(filename) {
  return filename.replace(/\.pdf$/i, '').replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim();
}

function inferProgramme(relativeParts) {
  return relativeParts.some((p) => /^m\.?\s*tech$/i.test(p) || /^mtech$/i.test(p)) ? 'M.Tech' : 'B.Tech';
}

function inferDepartment(relativeParts, programme) {
  if (programme === 'M.Tech') {
    const idx = relativeParts.findIndex((p) => /^m\.?\s*tech$/i.test(p) || /^mtech$/i.test(p));
    const candidate = idx >= 0 ? relativeParts[idx + 1] : null;
    return candidate ? candidate.replace(/[_-]+/g, ' ') : 'M.Tech';
  }
  const first = relativeParts[0] || '';
  const key = first.toUpperCase();
  return departmentNames[key] || first.replace(/[_-]+/g, ' ') || 'All Departments';
}

const files = walk(ROOT);
const papers = files.map((absolutePath, index) => {
  const relative = path.relative(ROOT, absolutePath).split(path.sep);
  const programme = inferProgramme(relative);
  const department = inferDepartment(relative, programme);
  const year = detectYear(relative);
  const semester = detectSemester(relative);
  const relativeUrl = relative.map(encodeURIComponent).join('/');
  const semesterLabel = semester === 'Unknown' ? 'Not specified' : semester;
  return {
    id: `file-${index + 1}`,
    programme,
    department,
    subject: cleanSubject(relative.at(-1)),
    year: year.value,
    yearLabel: year.label,
    semester,
    semesterLabel,
    exam: /summer/i.test(relative.at(-1)) ? 'Summer' : /winter/i.test(relative.at(-1)) ? 'Winter' : 'Question Paper',
    pdf: `/question-paper/${relativeUrl}`,
    filename: relative.at(-1),
    path: relative.join('/'),
    allowedSemesters: yearAllowedSemesters(year.value),
  };
}).sort((a,b) => a.path.localeCompare(b.path));

const payload = {
  generatedAt: new Date().toISOString(),
  source: 'public/question-paper',
  total: papers.length,
  papers,
};

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(payload, null, 2));
console.log(`Question paper index generated: ${papers.length} PDF(s)`);
