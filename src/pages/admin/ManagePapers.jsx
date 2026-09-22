import React, { useState } from 'react';
import {
  Upload,
  Trash2,
  Edit3,
  ChevronUp,
  ChevronDown,
  Save,
  X,
} from 'lucide-react';
import { useLibrary } from '../../context/LibraryContext';
import { ManagerForm, DataTable, Field, AdminPage } from '../../components/admin';

const emptyForm = {
  programme: 'B.Tech',
  subject: '',
  department: '',
  academicYear: '2025-26',
  year: 'First',
  semester: 'I',
  exam: 'End Semester',
  pdf: '/question-papers/',
};

export default function ManagePapers() {
  const {
    papers = [],
    setPapers,
    departments = [],
    years = [],
    semesters = [],
    saveContent,
    contentSaving,
    setToast,
  } = useLibrary();

  const firstDepartment = departments[0]?.name || 'Computer Science & Engineering';
  const [form, setForm] = useState({ ...emptyForm, department: firstDepartment });
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  const isEditing = Boolean(editingId);
  const isSaving = saving || contentSaving;

  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }));
  const resetForm = () => {
    setForm({ ...emptyForm, department: departments[0]?.name || 'Computer Science & Engineering' });
    setEditingId(null);
  };

  const persist = async (nextPapers, message) => {
    setSaving(true);
    try {
      await saveContent({ papers: nextPapers });
      setPapers(nextPapers);
      setToast(message);
    } catch (error) {
      console.error('Question paper save failed:', error);
      setToast(error?.message || 'Unable to save question paper');
    } finally {
      setSaving(false);
    }
  };

  const submit = async (event) => {
    event.preventDefault();
    if (!form.subject.trim()) {
      setToast('Subject is required');
      return;
    }

    const paperData = {
      programme: form.programme,
      subject: form.subject.trim(),
      department: form.department,
      academicYear: form.academicYear.trim(),
      year: form.year,
      semester: form.semester,
      exam: form.exam.trim(),
      pdf: form.pdf.trim(),
    };

    if (isEditing) {
      await persist(papers.map((paper) => paper.id === editingId ? { ...paper, ...paperData } : paper), 'Question paper updated successfully');
    } else {
      await persist([{ id: `p${Date.now()}`, ...paperData }, ...papers], 'Question paper added');
    }
    resetForm();
  };

  const editPaper = (paper) => {
    setEditingId(paper.id);
    setForm({
      programme: paper.programme || 'B.Tech',
      subject: paper.subject || '',
      department: paper.department || firstDepartment,
      academicYear: paper.academicYear || '2025-26',
      year: paper.year || 'First',
      semester: paper.semester || 'I',
      exam: paper.exam || 'End Semester',
      pdf: paper.pdf || '/question-papers/',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const removePaper = async (id) => {
    const paper = papers.find((item) => item.id === id);
    if (!paper) return;
    if (!window.confirm(`Remove "${paper.subject}"?`)) return;
    await persist(papers.filter((item) => item.id !== id), 'Question paper removed successfully');
    if (editingId === id) resetForm();
  };

  const movePaper = async (index, direction) => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= papers.length) return;
    const nextPapers = [...papers];
    [nextPapers[index], nextPapers[targetIndex]] = [nextPapers[targetIndex], nextPapers[index]];
    await persist(nextPapers, 'Question paper order updated');
  };

  return (
    <AdminPage eyebrow="ACADEMIC ARCHIVE" title="Manage question papers" description="Add, edit, remove and reorder question papers.">
      <ManagerForm title={isEditing ? 'Edit question paper' : 'Add question paper'} onSubmit={submit}>
        <div className="form-two">
          <Field label="Programme"><select value={form.programme} onChange={(e) => update('programme', e.target.value)}><option>B.Tech</option><option>M.Tech</option></select></Field>
          <Field label="Academic year"><input value={form.academicYear} onChange={(e) => update('academicYear', e.target.value)} /></Field>
        </div>
        <Field label="Subject"><input required value={form.subject} onChange={(e) => update('subject', e.target.value)} /></Field>
        <Field label="Department"><select value={form.department} onChange={(e) => update('department', e.target.value)}>{departments.map((department) => <option key={department.slug || department.name} value={department.name}>{department.name}</option>)}</select></Field>
        <div className="form-two">
          <Field label="Year"><select value={form.year} onChange={(e) => update('year', e.target.value)}>{years.map((year) => <option key={year}>{year}</option>)}</select></Field>
          <Field label="Semester"><select value={form.semester} onChange={(e) => update('semester', e.target.value)}>{semesters.map((semester) => <option key={semester}>{semester}</option>)}</select></Field>
        </div>
        <Field label="Exam"><input value={form.exam} onChange={(e) => update('exam', e.target.value)} /></Field>
        <Field label="PDF path in public/"><input value={form.pdf} onChange={(e) => update('pdf', e.target.value)} /></Field>
        <div className="admin-form-actions">
          <button className="primary-btn full" type="submit" disabled={isSaving}>
            {isEditing ? <Save size={16} /> : <Upload size={16} />}
            {isSaving ? 'Saving...' : isEditing ? 'Update paper' : 'Publish paper'}
          </button>
          {isEditing && <button type="button" className="secondary-btn" onClick={resetForm} disabled={isSaving}><X size={16} /> Cancel</button>}
        </div>
      </ManagerForm>

      <DataTable headers={['Subject', 'Programme', 'Department', 'Year / Sem.', 'Action']} rows={papers.map((paper, index) => (
        <React.Fragment key={paper.id}>
          <td><b>{paper.subject}</b><small>{paper.exam}</small></td>
          <td>{paper.programme}</td>
          <td>{paper.department}</td>
          <td>{paper.year} • {paper.semester}</td>
          <td>
            <div className="admin-row-actions">
              <button type="button" className="secondary-btn" title="Move up" disabled={isSaving || index === 0} onClick={() => movePaper(index, 'up')}><ChevronUp size={14} /></button>
              <button type="button" className="secondary-btn" title="Move down" disabled={isSaving || index === papers.length - 1} onClick={() => movePaper(index, 'down')}><ChevronDown size={14} /></button>
              <button type="button" className="secondary-btn" title="Edit paper" disabled={isSaving} onClick={() => editPaper(paper)}><Edit3 size={14} /></button>
              <button type="button" className="danger" title="Delete paper" disabled={isSaving} onClick={() => removePaper(paper.id)}><Trash2 size={14} /></button>
            </div>
          </td>
        </React.Fragment>
      ))} />
    </AdminPage>
  );
}
