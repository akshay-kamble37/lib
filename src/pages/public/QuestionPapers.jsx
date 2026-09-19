import React, { useEffect, useMemo, useState } from 'react';
import { FileText, Search, RotateCcw } from 'lucide-react';
import { PageHero, Empty } from '../../components/site';

const YEAR_OPTIONS = [
  { value: 'First', label: 'First Year', semesters: ['I', 'II'] },
  { value: 'Second', label: 'Second Year (SY)', semesters: ['III', 'IV'] },
  { value: 'Third', label: 'Third Year (TY)', semesters: ['V', 'VI'] },
  { value: 'Final', label: 'Final Year', semesters: ['VII', 'VIII'] },
];

const PROGRAMMES = ['B.Tech', 'M.Tech'];

function normalise(value = '') {
  return value.toLowerCase().replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim();
}

export default function QuestionPapers() {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [filters, setFilters] = useState({
    programme: 'All',
    department: 'All',
    year: 'All',
    semester: 'All',
    q: '',
  });

  useEffect(() => {
    let active = true;
    fetch('/question-paper-index.json', { cache: 'no-store' })
      .then(async (response) => {
        if (!response.ok) throw new Error(`Question-paper index returned ${response.status}`);
        return response.json();
      })
      .then((data) => {
        if (!active) return;
        setPapers(Array.isArray(data.papers) ? data.papers : []);
        setLoadError('');
      })
      .catch((error) => {
        console.error('QUESTION_PAPER_INDEX_ERROR', error);
        if (active) {
          setPapers([]);
          setLoadError('Question papers could not be loaded. Make sure the question-paper folder is inside public/.');
        }
      })
      .finally(() => active && setLoading(false));

    return () => { active = false; };
  }, []);

  const departments = useMemo(() => {
    const source = filters.programme === 'All' ? papers : papers.filter((paper) => paper.programme === filters.programme);
    const values = new Set(source.map((paper) => paper.department).filter(Boolean));
    return [...values].sort((a, b) => a.localeCompare(b));
  }, [papers]);

  const availableSemesters = useMemo(() => {
    if (filters.year === 'All') return ['I','II','III','IV','V','VI','VII','VIII'];
    return YEAR_OPTIONS.find((year) => year.value === filters.year)?.semesters || [];
  }, [filters.year]);

  const filtered = useMemo(() => {
    const query = normalise(filters.q);
    return papers.filter((paper) => {
      const matchesProgramme = filters.programme === 'All' || paper.programme === filters.programme;
      const matchesDepartment = filters.department === 'All' || paper.department === filters.department;
      const matchesYear = filters.year === 'All' || paper.year === filters.year;
      const matchesSemester = filters.semester === 'All' || paper.semester === filters.semester;
      const haystack = normalise(`${paper.subject} ${paper.filename} ${paper.exam}`);
      return matchesProgramme && matchesDepartment && matchesYear && matchesSemester && (!query || haystack.includes(query));
    });
  }, [papers, filters]);

  const updateFilter = (key, value) => {
    setFilters((current) => {
      const next = { ...current, [key]: value };
      if (key === 'programme') next.department = 'All';
      if (key === 'year') next.semester = 'All';
      return next;
    });
  };

  const reset = () => setFilters({ programme: 'All', department: 'All', year: 'All', semester: 'All', q: '' });

  return (
    <>
      <PageHero
        eyebrow="ACADEMIC ARCHIVE"
        title="B.Tech & M.Tech Question Papers"
        text="Find examination papers directly from the question-paper document archive using programme, department, year and semester filters."
        image="/images/study-space.jpg"
      />

      <section className="container section">
        <div className="archive-filter">
          <div>
            <label>Programme
              <select value={filters.programme} onChange={(e) => updateFilter('programme', e.target.value)}>
                <option value="All">All</option>
                {PROGRAMMES.map((value) => <option key={value} value={value}>{value}</option>)}
              </select>
            </label>

            <label>Department
              <select value={filters.department} onChange={(e) => updateFilter('department', e.target.value)}>
                <option value="All">All</option>
                {departments.map((value) => <option key={value} value={value}>{value}</option>)}
              </select>
            </label>

            <label>Year
              <select value={filters.year} onChange={(e) => updateFilter('year', e.target.value)}>
                <option value="All">All</option>
                {YEAR_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
              </select>
            </label>

            <label>Semester
              <select value={filters.semester} onChange={(e) => updateFilter('semester', e.target.value)}>
                <option value="All">All</option>
                {availableSemesters.map((value) => <option key={value} value={value}>Semester {value}</option>)}
              </select>
            </label>
          </div>

          <div className="filter-search">
            <Search />
            <input value={filters.q} onChange={(e) => updateFilter('q', e.target.value)} placeholder="Search subject or paper..." />
            <button type="button" className="small-btn" onClick={reset}><RotateCcw size={14} /> Reset</button>
          </div>
        </div>

        {loading ? (
          <Empty title="Loading question papers" text="Reading the question-paper archive..." />
        ) : loadError ? (
          <Empty title="Question-paper archive not found" text={loadError} />
        ) : filtered.length ? (
          <>
            <div className="section-kicker" style={{ margin: '20px 0 10px' }}>
              Showing {filtered.length} of {papers.length} document{papers.length === 1 ? '' : 's'}
            </div>
            <div className="paper-table">
              <table>
                <thead>
                  <tr><th>Subject / Document</th><th>Programme</th><th>Department</th><th>Year</th><th>Sem.</th><th>Exam</th><th></th></tr>
                </thead>
                <tbody>
                  {filtered.map((paper) => (
                    <tr key={paper.id}>
                      <td><b>{paper.subject}</b></td>
                      <td>{paper.programme}</td>
                      <td>{paper.department}</td>
                      <td>{paper.yearLabel}</td>
                      <td>{paper.semesterLabel}</td>
                      <td>{paper.exam}</td>
                      <td>
                        <a className="small-btn" href={paper.pdf} target="_blank" rel="noreferrer">
                          <FileText size={14} /> PDF
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <Empty title="No papers found" text="No question paper matches the selected filters. If you selected a semester, that semester must be explicitly identifiable from the folder or filename." />
        )}
      </section>
    </>
  );
}
