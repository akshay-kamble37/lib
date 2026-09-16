COPY YOUR EXISTING QUESTION-PAPER FOLDER CONTENT HERE.

Keep your existing branch/year structure. Examples:
question-paper/CSE/SY/*.pdf
question-paper/CSE/TY/*.pdf
question-paper/CSE/Final year/*.pdf
question-paper/M.Tech/*.pdf
question-paper/PLM/*.pdf
question-paper/First Year All/*.pdf

The project automatically scans every PDF before `npm run dev` and `npm run build`.
It creates public/question-paper-index.json, so you do NOT need to add PDFs one by one.
