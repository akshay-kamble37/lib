import React, { useState } from 'react';
import {
  Plus,
  Trash2,
  Edit3,
  ChevronUp,
  ChevronDown,
  Save,
  X,
  Image,
} from 'lucide-react';
import { useLibrary } from '../../context/LibraryContext';
import { ManagerForm, Field, AdminPage } from '../../components/admin';

const emptyForm = {
  name: '',
  short: '',
  description: '',
  image: '/images/campus.webp',
};

export default function ManageDepartments() {
  const {
    departments = [],
    setDepartments,
    saveContent,
    contentSaving,
    setToast,
  } = useLibrary();

  const [form, setForm] = useState(emptyForm);
  const [editingSlug, setEditingSlug] = useState(null);
  const [saving, setSaving] = useState(false);

  const isEditing = Boolean(editingSlug);
  const isSaving = saving || contentSaving;

  const update = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingSlug(null);
  };

  const persist = async (nextDepartments, message) => {
    setSaving(true);
    try {
      await saveContent({ departments: nextDepartments });
      setDepartments(nextDepartments);
      setToast(message);
    } catch (error) {
      console.error('Department save failed:', error);
      setToast(error?.message || 'Unable to save department changes');
    } finally {
      setSaving(false);
    }
  };

  const submit = async (event) => {
    event.preventDefault();

    const name = form.name.trim();
    if (!name) {
      setToast('Department name is required');
      return;
    }

    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    if (!slug) {
      setToast('Enter a valid department name');
      return;
    }

    if (isEditing) {
      if (departments.some((item) => item.slug === slug && item.slug !== editingSlug)) {
        setToast('Another department already uses this name');
        return;
      }

      const nextDepartments = departments.map((item) =>
        item.slug === editingSlug
          ? {
              ...item,
              slug,
              name,
              short: form.short.trim(),
              description: form.description.trim(),
              image: form.image.trim() || '/images/campus.webp',
            }
          : item
      );

      await persist(nextDepartments, 'Department updated successfully');
    } else {
      if (departments.some((item) => item.slug === slug)) {
        setToast('Department already exists');
        return;
      }

      const nextDepartments = [
        ...departments,
        {
          slug,
          name,
          short: form.short.trim(),
          description: form.description.trim(),
          image: form.image.trim() || '/images/campus.webp',
        },
      ];

      await persist(nextDepartments, 'Department added successfully');
    }

    resetForm();
  };

  const editDepartment = (department) => {
    setEditingSlug(department.slug);
    setForm({
      name: department.name || '',
      short: department.short || '',
      description: department.description || '',
      image: department.image || '/images/campus.webp',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const removeDepartment = async (slug) => {
    const department = departments.find((item) => item.slug === slug);
    if (!department) return;

    if (!window.confirm(`Remove "${department.name}"?`)) return;

    const nextDepartments = departments.filter((item) => item.slug !== slug);
    await persist(nextDepartments, 'Department removed successfully');

    if (editingSlug === slug) resetForm();
  };

  const moveDepartment = async (index, direction) => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= departments.length) return;

    const nextDepartments = [...departments];
    [nextDepartments[index], nextDepartments[targetIndex]] = [
      nextDepartments[targetIndex],
      nextDepartments[index],
    ];

    await persist(nextDepartments, 'Department order updated');
  };

  return (
    <AdminPage
      eyebrow="ACADEMIC DIRECTORY"
      title="Department Directory"
      description="Add, edit, remove and reorder academic departments."
    >
      <ManagerForm
        title={isEditing ? 'Edit Department' : 'Add Department'}
        onSubmit={submit}
      >
        <div className="form-two">
          <Field label="Department Name">
            <input
              required
              value={form.name}
              placeholder="Computer Science and Engineering"
              onChange={(e) => update('name', e.target.value)}
            />
          </Field>

          <Field label="Short Code">
            <input
              value={form.short}
              placeholder="CSE"
              onChange={(e) => update('short', e.target.value)}
            />
          </Field>
        </div>

        <Field label="Description">
          <textarea
            rows="4"
            value={form.description}
            placeholder="Enter department description..."
            onChange={(e) => update('description', e.target.value)}
          />
        </Field>

        <Field label="Department Image Path">
          <input
            value={form.image}
            placeholder="/images/departments/cse.webp"
            onChange={(e) => update('image', e.target.value)}
          />
        </Field>

        <div className="admin-form-actions">
          <button type="submit" className="primary-btn full" disabled={isSaving}>
            {isEditing ? <Save size={18} /> : <Plus size={18} />}
            {isSaving ? 'Saving...' : isEditing ? 'Update Department' : 'Add Department'}
          </button>

          {isEditing && (
            <button type="button" className="secondary-btn" onClick={resetForm} disabled={isSaving}>
              <X size={18} />
              Cancel
            </button>
          )}
        </div>
      </ManagerForm>

      <section className="admin-directory">
        {departments.length === 0 ? (
          <div className="portal-panel empty-state">
            <h3>No departments found</h3>
            <p>Add your first academic department using the form above.</p>
          </div>
        ) : (
          departments.map((department, index) => (
            <div className="department-admin-row" key={department.slug || department.name}>
              <div className="dept-icon">
                {(department.short || department.name).slice(0, 2).toUpperCase()}
              </div>

              <div className="department-admin-info">
                <b>{department.name}</b>
                <span>
                  {department.short || 'No code'}
                  {department.description ? ` • ${department.description}` : ''}
                </span>
              </div>

              <div className="admin-row-actions">
                <button
                  type="button"
                  className="secondary-btn"
                  title="Move up"
                  disabled={isSaving || index === 0}
                  onClick={() => moveDepartment(index, 'up')}
                >
                  <ChevronUp size={15} />
                </button>
                <button
                  type="button"
                  className="secondary-btn"
                  title="Move down"
                  disabled={isSaving || index === departments.length - 1}
                  onClick={() => moveDepartment(index, 'down')}
                >
                  <ChevronDown size={15} />
                </button>
                <button
                  type="button"
                  className="secondary-btn"
                  title={`Edit ${department.name}`}
                  disabled={isSaving}
                  onClick={() => editDepartment(department)}
                >
                  <Edit3 size={15} />
                </button>
                <button
                  type="button"
                  className="danger"
                  title={`Remove ${department.name}`}
                  disabled={isSaving}
                  onClick={() => removeDepartment(department.slug)}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))
        )}
      </section>

      <div className="portal-panel note">
        <Image size={20} />
        <div>
          <h3>Department Media</h3>
          <p>
            Keep department images inside <code>public/images/departments/</code> and save their public paths in the department content.
          </p>
        </div>
      </div>
    </AdminPage>
  );
}
