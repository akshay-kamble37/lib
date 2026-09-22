import React, { useState } from 'react';
import {
  Megaphone,
  Trash2,
  Edit3,
  ChevronUp,
  ChevronDown,
  Save,
  X,
} from 'lucide-react';
import { useLibrary } from '../../context/LibraryContext';
import { ManagerForm, DataTable, Field, AdminPage, MediaPicker } from '../../components/admin';

const emptyForm = {
  title: '',
  text: '',
  tag: 'Notice',
  image: '/images/library-reading.jpg',
  pinned: false,
};

export default function ManageAnnouncements() {
  const {
    announcements = [],
    setAnnouncements,
    saveContent,
    contentSaving,
    setToast,
  } = useLibrary();

  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  const isEditing = Boolean(editingId);
  const isSaving = saving || contentSaving;

  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  const resetForm = () => { setForm(emptyForm); setEditingId(null); };

  const persist = async (nextAnnouncements, message) => {
    setSaving(true);
    try {
      await saveContent({ announcements: nextAnnouncements });
      setAnnouncements(nextAnnouncements);
      setToast(message);
    } catch (error) {
      console.error('Announcement save failed:', error);
      setToast(error?.message || 'Unable to save announcement');
    } finally {
      setSaving(false);
    }
  };

  const submit = async (event) => {
    event.preventDefault();
    if (!form.title.trim()) {
      setToast('Announcement title is required');
      return;
    }

    const announcementData = {
      title: form.title.trim(),
      text: form.text.trim(),
      tag: form.tag,
      image: form.image.trim() || '/images/library-reading.jpg',
      pinned: Boolean(form.pinned),
    };

    if (isEditing) {
      await persist(
        announcements.map((announcement) =>
          announcement.id === editingId
            ? { ...announcement, ...announcementData }
            : announcement
        ),
        'Announcement updated successfully'
      );
    } else {
      const newAnnouncement = {
        id: `a${Date.now()}`,
        ...announcementData,
        date: new Date().toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }),
      };
      await persist([newAnnouncement, ...announcements], 'Announcement published');
    }

    resetForm();
  };

  const editAnnouncement = (announcement) => {
    setEditingId(announcement.id);
    setForm({
      title: announcement.title || '',
      text: announcement.text || '',
      tag: announcement.tag || 'Notice',
      image: announcement.image || '/images/library-reading.jpg',
      pinned: Boolean(announcement.pinned),
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const removeAnnouncement = async (id) => {
    const announcement = announcements.find((item) => item.id === id);
    if (!announcement) return;
    if (!window.confirm(`Remove "${announcement.title}"?`)) return;

    await persist(
      announcements.filter((item) => item.id !== id),
      'Announcement removed successfully'
    );
    if (editingId === id) resetForm();
  };

  const moveAnnouncement = async (index, direction) => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= announcements.length) return;

    const nextAnnouncements = [...announcements];
    [nextAnnouncements[index], nextAnnouncements[targetIndex]] = [
      nextAnnouncements[targetIndex],
      nextAnnouncements[index],
    ];
    await persist(nextAnnouncements, 'Announcement order updated');
  };

  return (
    <AdminPage eyebrow="COMMUNICATION" title="Manage what's new" description="Publish notices and updates that appear on the public homepage and announcements page.">
      <ManagerForm title={isEditing ? 'Edit announcement' : 'Publish announcement'} onSubmit={submit}>
        <Field label="Title" required>
          <input required value={form.title} onChange={(e) => update('title', e.target.value)} />
        </Field>
        <Field label="Message">
          <textarea rows="5" value={form.text} onChange={(e) => update('text', e.target.value)} />
        </Field>
        <div className="form-two">
          <Field label="Category">
            <select value={form.tag} onChange={(e) => update('tag', e.target.value)}>
              <option>Notice</option>
              <option>Academic</option>
              <option>Library</option>
              <option>Publication</option>
            </select>
          </Field>
          <Field label="Pinned">
            <select value={form.pinned ? 'true' : 'false'} onChange={(e) => update('pinned', e.target.value === 'true')}>
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </Field>
        </div>
        <MediaPicker label="Announcement image" value={form.image} onChange={(value) => update('image', value)} accept="image/png,image/jpeg,image/webp,image/avif" type="image" />
        <div className="admin-form-actions">
          <button className="primary-btn full" type="submit" disabled={isSaving}>
            {isEditing ? <Save size={16} /> : <Megaphone size={16} />}
            {isSaving ? 'Saving...' : isEditing ? 'Update announcement' : 'Publish'}
          </button>
          {isEditing && (
            <button type="button" className="secondary-btn" onClick={resetForm} disabled={isSaving}><X size={16} /> Cancel</button>
          )}
        </div>
      </ManagerForm>

      <DataTable
        headers={['Announcement', 'Category', 'Date', 'Action']}
        rows={announcements.map((announcement, index) => (
          <React.Fragment key={announcement.id}>
            <td><b>{announcement.title}</b><small>{announcement.text}</small></td>
            <td>{announcement.tag}</td>
            <td>{announcement.date}</td>
            <td>
              <div className="admin-row-actions">
                <button type="button" className="secondary-btn" title="Move up" disabled={isSaving || index === 0} onClick={() => moveAnnouncement(index, 'up')}><ChevronUp size={14} /></button>
                <button type="button" className="secondary-btn" title="Move down" disabled={isSaving || index === announcements.length - 1} onClick={() => moveAnnouncement(index, 'down')}><ChevronDown size={14} /></button>
                <button type="button" className="secondary-btn" title="Edit announcement" disabled={isSaving} onClick={() => editAnnouncement(announcement)}><Edit3 size={14} /></button>
                <button type="button" className="danger" title="Delete announcement" disabled={isSaving} onClick={() => removeAnnouncement(announcement.id)}><Trash2 size={14} /></button>
              </div>
            </td>
          </React.Fragment>
        ))}
      />
    </AdminPage>
  );
}
