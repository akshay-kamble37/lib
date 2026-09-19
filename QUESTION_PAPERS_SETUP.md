# Question Paper Archive Setup

## What changed

The Question Papers page no longer reads the five demo records from `defaultData.js`. It reads `public/question-paper-index.json`, which is generated automatically from every PDF under `public/question-paper/`.

This means you do **not** need to create one database/admin record per PDF. Copy the complete document collection once.

## Where to put the documents

Put your existing folder contents here:

```text
Library-Website/
└── public/
    └── question-paper/
        ├── CHEMICAL/
        ├── CIVIL/
        ├── CSE/
        ├── ELECTRICAL/
        ├── EXTC/
        ├── First Year All/
        ├── INSTRU/
        ├── IT/
        ├── M.Tech/
        ├── PLM/
        ├── MECH/
        ├── PROD/
        └── TEXTILE/
```

The folder name must be exactly `question-paper`. Existing PDF filenames can remain unchanged.

## How automatic indexing works

`npm run dev` first runs `scripts/generate-question-paper-index.mjs`. `npm run build` does the same before the Vite production build. The script recursively scans `public/question-paper/**/*.pdf` and writes `public/question-paper-index.json`.

The website fetches that JSON and never falls back to the old demo question papers. If the folder is missing or contains no PDFs, the page says the archive is unavailable/empty instead of showing demo data.

## Year and semester filtering

The UI uses:

- First Year → I, II
- Second Year (SY) → III, IV
- Third Year (TY) → V, VI
- Final Year → VII, VIII

Changing Year immediately limits the Semester dropdown to only those semesters. Changing Programme clears Department because the available departments depend on the programme.

## Important: no guessing of semester

The source collection uses folders such as SY, TY and Final Year. A PDF is assigned a semester only when the folder path or filename explicitly contains a semester such as `Semester V`, `Sem-5`, `V Semester`, etc. If the source filename only says `SY`, `TY`, `ISE-1`, `Summer`, etc., the index leaves the semester as `Not specified` rather than incorrectly guessing. Such a paper still appears under Programme/Department/Year and under All filters.

If you want exact Semester III vs IV (or V vs VI) filtering for every PDF, the source folders/files must contain enough information to distinguish the semester. The generator is intentionally conservative.

## PDF links

Each row opens the actual PDF from the same relative path under `public/question-paper/`. Spaces and special characters in filenames are URL encoded automatically.

## Local run

From the folder containing `package.json`:

```powershell
npm install
npm run dev
```

Then open the Vite URL, normally `http://localhost:5173`.

## Vercel

`npm run build` automatically generates the index before `vite build`, so the same document archive works after deployment as long as `public/question-paper/` is included in the project.
