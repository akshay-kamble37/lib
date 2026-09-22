import React, { useState } from 'react';
import {
  Plus,
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
  title: '',
  author: '',
  department: '',
  year: new Date().getFullYear(),
  isbn: '',
  copies: 1,
  available: 1,
  rack: 'NEW',
  shelf: '01',
  description: 'Catalogue record added by library administrator.',
};

export default function ManageBooks() {
  const {
    books = [],
    setBooks,
    departments = [],
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

  const persist = async (nextBooks, message) => {
    setSaving(true);
    try {
      await saveContent({ books: nextBooks });
      setBooks(nextBooks);
      setToast(message);
    } catch (error) {
      console.error('Book save failed:', error);
      setToast(error?.message || 'Unable to save book');
    } finally {
      setSaving(false);
    }
  };

  const submit = async (event) => {
    event.preventDefault();
    if (!form.title.trim()) {
      setToast('Book title is required');
      return;
    }

    const copies = Math.max(0, Number(form.copies) || 0);
    const available = Math.min(copies, Math.max(0, Number(form.available) || 0));
    const bookData = {
      title: form.title.trim(),
      author: form.author.trim(),
      department: form.department,
      year: Number(form.year) || new Date().getFullYear(),
      isbn: form.isbn.trim(),
      copies,
      available,
      rack: form.rack.trim(),
      shelf: form.shelf.trim(),
      description: form.description.trim(),
    };

    if (isEditing) {
      await persist(books.map((book) => book.id === editingId ? { ...book, ...bookData } : book), 'Book updated successfully');
    } else {
      await persist([{ id: `b${Date.now()}`, ...bookData }, ...books], 'Catalogue record added');
    }
    resetForm();
  };

  const editBook = (book) => {
    setEditingId(book.id);
    setForm({
      title: book.title || '',
      author: book.author || '',
      department: book.department || firstDepartment,
      year: book.year || new Date().getFullYear(),
      isbn: book.isbn || '',
      copies: book.copies ?? 1,
      available: book.available ?? 1,
      rack: book.rack || '',
      shelf: book.shelf || '',
      description: book.description || '',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const removeBook = async (id) => {
    const book = books.find((item) => item.id === id);
    if (!book) return;
    if (!window.confirm(`Remove "${book.title}"?`)) return;
    await persist(books.filter((item) => item.id !== id), 'Book removed successfully');
    if (editingId === id) resetForm();
  };

  const moveBook = async (index, direction) => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= books.length) return;
    const nextBooks = [...books];
    [nextBooks[index], nextBooks[targetIndex]] = [nextBooks[targetIndex], nextBooks[index]];
    await persist(nextBooks, 'Book order updated');
  };

  return (
    <AdminPage eyebrow="CATALOGUE" title="Manage books" description="Add, edit, remove and reorder catalogue records.">
      <ManagerForm title={isEditing ? 'Edit catalogue record' : 'Add catalogue record'} onSubmit={submit}>
        <Field label="Title"><input required value={form.title} onChange={(e) => update('title', e.target.value)} /></Field>
        <Field label="Author"><input value={form.author} onChange={(e) => update('author', e.target.value)} /></Field>
        <div className="form-two">
          <Field label="Department">
            <select value={form.department} onChange={(e) => update('department', e.target.value)}>
              {departments.map((department) => <option key={department.slug || department.name} value={department.name}>{department.name}</option>)}
            </select>
          </Field>
          <Field label="Year"><input type="number" value={form.year} onChange={(e) => update('year', e.target.value)} /></Field>
        </div>
        <div className="form-two">
          <Field label="ISBN"><input value={form.isbn} onChange={(e) => update('isbn', e.target.value)} /></Field>
          <Field label="Copies"><input type="number" min="0" value={form.copies} onChange={(e) => update('copies', e.target.value)} /></Field>
        </div>
        <div className="form-two">
          <Field label="Available"><input type="number" min="0" value={form.available} onChange={(e) => update('available', e.target.value)} /></Field>
          <Field label="Rack"><input value={form.rack} onChange={(e) => update('rack', e.target.value)} /></Field>
        </div>
        <Field label="Shelf"><input value={form.shelf} onChange={(e) => update('shelf', e.target.value)} /></Field>
        <Field label="Description"><textarea rows="4" value={form.description} onChange={(e) => update('description', e.target.value)} /></Field>
        <div className="admin-form-actions">
          <button className="primary-btn full" type="submit" disabled={isSaving}>
            {isEditing ? <Save size={16} /> : <Plus size={16} />}
            {isSaving ? 'Saving...' : isEditing ? 'Update book' : 'Add book'}
          </button>
          {isEditing && <button type="button" className="secondary-btn" onClick={resetForm} disabled={isSaving}><X size={16} /> Cancel</button>}
        </div>
      </ManagerForm>

      <DataTable headers={['Book', 'Department', 'Availability', 'Action']} rows={books.map((book, index) => (
        <React.Fragment key={book.id}>
          <td><b>{book.title}</b><small>{book.author}</small></td>
          <td>{book.department}</td>
          <td>{book.available}/{book.copies}</td>
          <td>
            <div className="admin-row-actions">
              <button type="button" className="secondary-btn" title="Move up" disabled={isSaving || index === 0} onClick={() => moveBook(index, 'up')}><ChevronUp size={14} /></button>
              <button type="button" className="secondary-btn" title="Move down" disabled={isSaving || index === books.length - 1} onClick={() => moveBook(index, 'down')}><ChevronDown size={14} /></button>
              <button type="button" className="secondary-btn" title="Edit book" disabled={isSaving} onClick={() => editBook(book)}><Edit3 size={14} /></button>
              <button type="button" className="danger" title="Delete book" disabled={isSaving} onClick={() => removeBook(book.id)}><Trash2 size={14} /></button>
            </div>
          </td>
        </React.Fragment>
      ))} />
    </AdminPage>
  );
}
