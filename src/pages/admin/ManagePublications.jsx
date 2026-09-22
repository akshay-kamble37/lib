import React, { useState } from 'react';
import {
  BookMarked,
  Trash2,
  Edit3,
  ChevronUp,
  ChevronDown,
  Save,
  X,
  Plus,
} from 'lucide-react';
import { useLibrary } from '../../context/LibraryContext';
import { ManagerForm, DataTable, Field, AdminPage } from '../../components/admin';

const emptyForm = {
  title: '',
  author: 'SGGS Faculty',
  department: 'Computer Science & Engineering',
  year: 2026,
  publisher: '',
  description: '',
  cover: '/images/bookshelves.jpg',
};

export default function ManagePublications() {
  const {
    publications = [],
    setPublications,
    saveContent,
    contentSaving,
    setToast,
  } = useLibrary();

  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  const isEditing = Boolean(editingId);
  const isSaving = saving || contentSaving;

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const persist = async (nextPublications, message) => {
    setSaving(true);
    try {
      await saveContent({ publications: nextPublications });
      setPublications(nextPublications);
      setToast(message);
    } catch (error) {
      console.error('Publication save failed:', error);
      setToast(error?.message || 'Unable to save publication');
    } finally {
      setSaving(false);
    }
  };

  const submit = async (event) => {
    event.preventDefault();
    if (!form.title.trim()) {
      setToast('Publication title is required');
      return;
    }

    const publicationData = {
      title: form.title.trim(),
      author: form.author.trim(),
      department: form.department.trim(),
      year: Number(form.year) || 2026,
      publisher: form.publisher.trim(),
      description: form.description.trim(),
      cover: form.cover.trim() || '/images/bookshelves.jpg',
    };

    if (isEditing) {
      const nextPublications = publications.map((publication) =>
        publication.id === editingId
          ? { ...publication, ...publicationData }
          : publication
      );
      await persist(nextPublications, 'Publication updated successfully');
    } else {
      await persist(
        [{ id: `pub${Date.now()}`, ...publicationData }, ...publications],
        'Publication added successfully'
      );
    }

    resetForm();
  };

  const editPublication = (publication) => {
    setEditingId(publication.id);
    setForm({
      title: publication.title || '',
      author: publication.author || 'SGGS Faculty',
      department: publication.department || 'Computer Science & Engineering',
      year: publication.year || 2026,
      publisher: publication.publisher || '',
      description: publication.description || '',
      cover: publication.cover || '/images/bookshelves.jpg',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const deletePublication = async (id) => {
    const publication = publications.find((item) => item.id === id);
    if (!publication) return;
    if (!window.confirm(`Remove "${publication.title}"?`)) return;

    await persist(
      publications.filter((item) => item.id !== id),
      'Publication removed successfully'
    );
    if (editingId === id) resetForm();
  };

  const movePublication = async (index, direction) => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= publications.length) return;

    const nextPublications = [...publications];
    [nextPublications[index], nextPublications[targetIndex]] = [
      nextPublications[targetIndex],
      nextPublications[index],
    ];
    await persist(nextPublications, 'Publication order updated');
  };

  return (
    <AdminPage eyebrow="SGGS FACULTY" title="Manage publications" description="Add, edit, remove and reorder faculty publications.">
      <ManagerForm title={isEditing ? 'Edit faculty publication' : 'Add faculty publication'} onSubmit={submit}>
        <Field label="Book title">
          <input required value={form.title} onChange={(event) => updateField('title', event.target.value)} />
        </Field>
        <Field label="Author">
          <input value={form.author} onChange={(event) => updateField('author', event.target.value)} />
        </Field>
        <div className="form-two">
          <Field label="Department">
            <input value={form.department} onChange={(event) => updateField('department', event.target.value)} />
          </Field>
          <Field label="Year">
            <input type="number" value={form.year} onChange={(event) => updateField('year', event.target.value)} />
          </Field>
        </div>
        <Field label="Publisher">
          <input value={form.publisher} onChange={(event) => updateField('publisher', event.target.value)} />
        </Field>
        <Field label="Cover image path">
          <input value={form.cover} onChange={(event) => updateField('cover', event.target.value)} />
        </Field>
        <Field label="Description">
          <textarea rows="4" value={form.description} onChange={(event) => updateField('description', event.target.value)} />
        </Field>
        <div className="admin-form-actions">
          <button className="primary-btn full" type="submit" disabled={isSaving}>
            {isEditing ? <Save size={16} /> : <Plus size={16} />}
            {isSaving ? 'Saving...' : isEditing ? 'Update publication' : 'Add publication'}
          </button>
          {isEditing && (
            <button type="button" className="secondary-btn" onClick={resetForm} disabled={isSaving}>
              <X size={16} /> Cancel
            </button>
          )}
        </div>
      </ManagerForm>

      <DataTable
        headers={['Publication', 'Department', 'Year', 'Action']}
        rows={publications.map((publication, index) => (
          <React.Fragment key={publication.id}>
            <td><b>{publication.title}</b><small>{publication.author}</small></td>
            <td>{publication.department}</td>
            <td>{publication.year}</td>
            <td>
              <div className="admin-row-actions">
                <button type="button" className="secondary-btn" title="Move up" disabled={isSaving || index === 0} onClick={() => movePublication(index, 'up')}><ChevronUp size={14} /></button>
                <button type="button" className="secondary-btn" title="Move down" disabled={isSaving || index === publications.length - 1} onClick={() => movePublication(index, 'down')}><ChevronDown size={14} /></button>
                <button type="button" className="secondary-btn" title="Edit" disabled={isSaving} onClick={() => editPublication(publication)}><Edit3 size={14} /></button>
                <button type="button" className="danger" title="Delete" disabled={isSaving} onClick={() => deletePublication(publication.id)}><Trash2 size={14} /></button>
              </div>
            </td>
          </React.Fragment>
        ))}
      />
    </AdminPage>
  );
}
