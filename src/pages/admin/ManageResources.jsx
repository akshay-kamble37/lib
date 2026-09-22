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
  name: '',
  url: '',
  category: 'Academic Database',
  description: '',
  detailedDescription: '',
  features: '',
  audience: '',
  accessInfo: '',
};

export default function ManageResources() {
  const {
    resources = [],
    setResources,
    saveContent,
    contentSaving,
    setToast,
  } = useLibrary();

  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  const isEditing = Boolean(editingId);
  const isSaving = saving || contentSaving;

  const updateField = (field, value) => setForm((current) => ({ ...current, [field]: value }));
  const resetForm = () => { setForm(emptyForm); setEditingId(null); };

  const persist = async (nextResources, message) => {
    setSaving(true);
    try {
      await saveContent({ resources: nextResources });
      setResources(nextResources);
      setToast(message);
    } catch (error) {
      console.error('Resource save failed:', error);
      setToast(error?.message || 'Unable to save resource');
    } finally {
      setSaving(false);
    }
  };

  const submit = async (event) => {
    event.preventDefault();
    if (!form.name.trim()) {
      setToast('Resource name is required');
      return;
    }

    const resourceData = {
      name: form.name.trim(),
      url: form.url.trim(),
      category: form.category || 'Academic Database',
      description: form.description.trim() || 'Academic resource maintained by SGGS Central Library.',
      detailedDescription: form.detailedDescription.trim() || form.description.trim() || 'Academic resource maintained by SGGS Central Library.',
      features: form.features.split('\n').map((item) => item.trim()).filter(Boolean),
      audience: form.audience.trim() || 'Students, faculty members and researchers',
      accessInfo: form.accessInfo.trim() || 'Visit the official resource website to access the available academic content.',
    };

    if (isEditing) {
      await persist(
        resources.map((resource) => resource.id === editingId ? { ...resource, ...resourceData } : resource),
        'Resource updated successfully'
      );
    } else {
      await persist([{ id: `r${Date.now()}`, ...resourceData }, ...resources], 'Resource added successfully');
    }

    resetForm();
  };

  const editResource = (resource) => {
    setEditingId(resource.id);
    setForm({
      name: resource.name || '',
      url: resource.url || '',
      category: resource.category || 'Academic Database',
      description: resource.description || '',
      detailedDescription: resource.detailedDescription || '',
      features: Array.isArray(resource.features) ? resource.features.join('\n') : '',
      audience: resource.audience || '',
      accessInfo: resource.accessInfo || '',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const removeResource = async (id) => {
    const resource = resources.find((item) => item.id === id);
    if (!resource) return;
    if (!window.confirm(`Remove "${resource.name}"?`)) return;

    await persist(resources.filter((item) => item.id !== id), 'Resource removed successfully');
    if (editingId === id) resetForm();
  };

  const moveResource = async (index, direction) => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= resources.length) return;

    const nextResources = [...resources];
    [nextResources[index], nextResources[targetIndex]] = [nextResources[targetIndex], nextResources[index]];
    await persist(nextResources, 'Resource order updated');
  };

  return (
    <AdminPage eyebrow="E-RESOURCES" title="Manage digital resources" description="Add, edit, remove and reorder digital resources.">
      <ManagerForm title={isEditing ? 'Edit resource' : 'Add resource'} onSubmit={submit}>
        <Field label="Name">
          <input required value={form.name} onChange={(e) => updateField('name', e.target.value)} placeholder="e.g. IEEE Xplore" />
        </Field>
        <Field label="URL">
          <input value={form.url} onChange={(e) => updateField('url', e.target.value)} placeholder="https://example.com" />
        </Field>
        <Field label="Category">
          <select value={form.category} onChange={(e) => updateField('category', e.target.value)}>
            <option>Academic Database</option>
            <option>Engineering Database</option>
            <option>Discovery</option>
            <option>Computing Database</option>
            <option>E-Books</option>
          </select>
        </Field>
        <Field label="Short Description">
          <textarea rows="3" value={form.description} onChange={(e) => updateField('description', e.target.value)} />
        </Field>
        <Field label="Detailed Description">
          <textarea rows="5" value={form.detailedDescription} onChange={(e) => updateField('detailedDescription', e.target.value)} />
        </Field>
        <Field label="Features">
          <textarea rows="5" value={form.features} onChange={(e) => updateField('features', e.target.value)} placeholder={'Enter one feature per line.\nIEEE journals\nConference papers\nTechnical standards'} />
        </Field>
        <Field label="Suitable For">
          <input value={form.audience} onChange={(e) => updateField('audience', e.target.value)} />
        </Field>
        <Field label="Access Information">
          <textarea rows="4" value={form.accessInfo} onChange={(e) => updateField('accessInfo', e.target.value)} />
        </Field>
        <div className="admin-form-actions">
          <button type="submit" className="primary-btn full" disabled={isSaving}>
            {isEditing ? <Save size={17} /> : <Plus size={17} />}
            {isSaving ? 'Saving...' : isEditing ? 'Update resource' : 'Add resource'}
          </button>
          {isEditing && (
            <button type="button" className="secondary-btn" onClick={resetForm} disabled={isSaving}><X size={17} /> Cancel</button>
          )}
        </div>
      </ManagerForm>

      <DataTable
        headers={['Name', 'Category', 'URL', 'Action']}
        rows={resources.map((resource, index) => (
          <React.Fragment key={resource.id}>
            <td><b>{resource.name}</b><small>{resource.description}</small></td>
            <td>{resource.category}</td>
            <td>{resource.url || '—'}</td>
            <td>
              <div className="admin-row-actions">
                <button type="button" className="secondary-btn" title="Move up" disabled={isSaving || index === 0} onClick={() => moveResource(index, 'up')}><ChevronUp size={14} /></button>
                <button type="button" className="secondary-btn" title="Move down" disabled={isSaving || index === resources.length - 1} onClick={() => moveResource(index, 'down')}><ChevronDown size={14} /></button>
                <button type="button" className="secondary-btn" title="Edit resource" disabled={isSaving} onClick={() => editResource(resource)}><Edit3 size={14} /></button>
                <button type="button" className="danger" title="Remove resource" disabled={isSaving} onClick={() => removeResource(resource.id)}><Trash2 size={14} /></button>
              </div>
            </td>
          </React.Fragment>
        ))}
      />
    </AdminPage>
  );
}
