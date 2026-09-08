import React, { useState } from 'react';
import { Megaphone, Trash2 } from 'lucide-react';
import { useLibrary } from '../../context/LibraryContext';
import { ManagerForm, DataTable, Field, AdminPage, MediaPicker } from '../../components/admin';

const emptyForm = { title: '', text: '', tag: 'Notice', image: '/images/library-reading.jpg' };

export default function ManageAnnouncements() {
  const { announcements, setAnnouncements, setToast } = useLibrary();
  const [form, setForm] = useState(emptyForm);
  const update = (key, value) => setForm(current => ({ ...current, [key]: value }));

  const add = event => {
    event.preventDefault();
    if (!form.title.trim()) return;
    setAnnouncements(current => [{
      id: `a${Date.now()}`,
      ...form,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      pinned: false
    }, ...current]);
    setForm(emptyForm);
    setToast('Announcement published');
  };

  return (
    <AdminPage eyebrow="COMMUNICATION" title="Manage what's new" description="Publish notices and updates that appear on the public homepage and announcements page.">
      <ManagerForm title="Publish announcement" onSubmit={add}>
        <Field label="Title" required><input required value={form.title} onChange={e => update('title', e.target.value)} /></Field>
        <Field label="Message"><textarea rows="5" value={form.text} onChange={e => update('text', e.target.value)} /></Field>
        <div className="form-two">
          <Field label="Category"><select value={form.tag} onChange={e => update('tag', e.target.value)}><option>Notice</option><option>Academic</option><option>Library</option><option>Publication</option></select></Field>
        </div>
        <MediaPicker label="Announcement image" value={form.image} onChange={value => update('image', value)} accept="image/png,image/jpeg,image/webp,image/avif" type="image" />
        <button className="primary-btn full"><Megaphone size={16} /> Publish</button>
      </ManagerForm>

      <DataTable headers={['Announcement', 'Category', 'Date', 'Action']} rows={announcements.map(announcement => <>
        <td><b>{announcement.title}</b><small>{announcement.text}</small></td>
        <td>{announcement.tag}</td>
        <td>{announcement.date}</td>
        <td><button className="danger" onClick={() => { setAnnouncements(current => current.filter(item => item.id !== announcement.id)); setToast('Announcement removed'); }}><Trash2 size={14} /></button></td>
      </>)} />
    </AdminPage>
  );
}
