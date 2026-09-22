import React, { useState } from 'react';
import {
  Plus,
  Trash2,
  Pencil,
  X
} from 'lucide-react';

import { useLibrary } from '../../context/LibraryContext';
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
  itemCount: '',
  itemLabel: 'E-Journals'
};

export default function ManageResources() {
  const {
    resources = [],
    setResources,
    setToast,
    saveContent
  } = useLibrary();

  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const updateField = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value
    }));
  };

  const add = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      setToast('Resource name is required');
      return;
    }

    const resourceData = {
      name: form.name.trim(),
      url: form.url.trim(),
      category: form.category,
      description:
        form.description.trim() ||
        'Academic resource maintained by SGGS Central Library.',
      detailedDescription:
        form.detailedDescription.trim() ||
        form.description.trim() ||
        'Academic resource maintained by SGGS Central Library.',
      features: form.features
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean),
      audience:
        form.audience.trim() ||
        'Students, faculty members and researchers',
      accessInfo:
        form.accessInfo.trim() ||
        'Visit the official resource website to access the available academic content.',
      itemCount:
        form.itemCount === ''
          ? 0
          : Number(form.itemCount),
      itemLabel:
        form.itemLabel.trim() || 'Resources'
    };

    const nextResources = [
      newResource,
      ...resources
    ];

    setResources(nextResources);

    await saveContent({
      resources: nextResources
    });

  const removeResource = async (id) => {
    const resource = resources.find((item) => item.id === id);
    if (!resource) return;
    if (!window.confirm(`Remove "${resource.name}"?`)) return;

    await persist(resources.filter((item) => item.id !== id), 'Resource removed successfully');
    if (editingId === id) resetForm();
  };

  const startEdit = (resource) => {
    setEditingId(resource.id);

    setForm({
      name: resource.name || '',
      url: resource.url || '',
      category: resource.category || 'Academic Database',
      description: resource.description || '',
      detailedDescription:
        resource.detailedDescription || '',
      features: Array.isArray(resource.features)
        ? resource.features.join('\n')
        : '',
      audience: resource.audience || '',
      accessInfo: resource.accessInfo || '',
      itemCount:
        resource.itemCount !== undefined &&
        resource.itemCount !== null
          ? String(resource.itemCount)
          : '',
      itemLabel:
        resource.itemLabel || 'Resources'
    });

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  const updateResource = async (e) => {
    e.preventDefault();

    if (!editingId || !form.name.trim()) {
      return;
    }

    const updatedResources = resources.map(
      (resource) => {
        if (resource.id !== editingId) {
          return resource;
        }

        return {
          ...resource,
          name: form.name.trim(),
          url: form.url.trim(),
          category: form.category,
          description:
            form.description.trim() ||
            'Academic resource maintained by SGGS Central Library.',
          detailedDescription:
            form.detailedDescription.trim() ||
            form.description.trim() ||
            'Academic resource maintained by SGGS Central Library.',
          features: form.features
            .split('\n')
            .map((item) => item.trim())
            .filter(Boolean),
          audience:
            form.audience.trim() ||
            'Students, faculty members and researchers',
          accessInfo:
            form.accessInfo.trim() ||
            'Visit the official resource website to access the available academic content.',
          itemCount:
            form.itemCount === ''
              ? 0
              : Number(form.itemCount),
          itemLabel:
            form.itemLabel.trim() || 'Resources'
        };
      }
    );

    setResources(updatedResources);

    await saveContent({
      resources: updatedResources
    });

    setEditingId(null);
    setForm(emptyForm);

    setToast('Resource updated');
  };

  const removeResource = async (id) => {
    const updatedResources = resources.filter(
      (resource) => resource.id !== id
    );

    setResources(updatedResources);

    await saveContent({
      resources: updatedResources
    });

    if (editingId === id) {
      setEditingId(null);
      setForm(emptyForm);
    }

    setToast('Resource removed');
  };

  return (
    <AdminPage
      eyebrow="E-RESOURCES"
      title="Manage digital resources"
    >
      <ManagerForm
        title={
          editingId
            ? 'Edit resource'
            : 'Add resource'
        }
        onSubmit={
          editingId
            ? updateResource
            : add
        }
      >
        <Field label="Name">
          <input
            required
            value={form.name}
            onChange={(e) =>
              updateField(
                'name',
                e.target.value
              )
            }
            placeholder="e.g. IEEE Xplore"
          />
        </Field>
        <Field label="URL">
          <input
            value={form.url}
            onChange={(e) =>
              updateField(
                'url',
                e.target.value
              )
            }
            placeholder="https://example.com"
          />
        </Field>
        <Field label="Category">
          <select
            value={form.category}
            onChange={(e) =>
              updateField(
                'category',
                e.target.value
              )
            }
          >
            <option>
              Academic Database
            </option>
            <option>
              Engineering Database
            </option>
            <option>
              Discovery
            </option>
          </select>
        </Field>

        <Field label="Resource Count">
          <input
            type="number"
            min="0"
            value={form.itemCount}
            onChange={(e) =>
              updateField(
                'itemCount',
                e.target.value
              )
            }
            placeholder="e.g. 464"
          />
        </Field>

        <Field label="Count Label">
          <input
            value={form.itemLabel}
            onChange={(e) =>
              updateField(
                'itemLabel',
                e.target.value
              )
            }
            placeholder="e.g. E-Journals"
          />
        </Field>

        <Field label="Short Description">
          <textarea
            rows="3"
            value={form.description}
            onChange={(e) =>
              updateField(
                'description',
                e.target.value
              )
            }
            placeholder="Short description shown on the resource card."
          />
        </Field>
        <Field label="Detailed Description">
          <textarea rows="5" value={form.detailedDescription} onChange={(e) => updateField('detailedDescription', e.target.value)} />
        </Field>
        <Field label="Features">
          <textarea
            rows="5"
            value={form.features}
            onChange={(e) =>
              updateField(
                'features',
                e.target.value
              )
            }
            placeholder={
              'Enter one feature per line.\nIEEE journals\nConference papers\nTechnical standards'
            }
          />
        </Field>
        <Field label="Suitable For">
          <input
            value={form.audience}
            onChange={(e) =>
              updateField(
                'audience',
                e.target.value
              )
            }
            placeholder="e.g. Engineering students and researchers"
          />
        </Field>
        <Field label="Access Information">
          <textarea
            rows="4"
            value={form.accessInfo}
            onChange={(e) =>
              updateField(
                'accessInfo',
                e.target.value
              )
            }
            placeholder="Explain how users should access the resource."
          />
        </Field>

        <div
          style={{
            display: 'flex',
            gap: '10px'
          }}
        >
          <button
            type="submit"
            className="primary-btn full"
          >
            {editingId ? (
              <Pencil />
            ) : (
              <Plus />
            )}

            {editingId
              ? 'Update resource'
              : 'Add resource'}
          </button>

          {editingId && (
            <button
              type="button"
              className="danger"
              onClick={cancelEdit}
              title="Cancel editing"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </ManagerForm>

      <DataTable
        headers={[
          'Name',
          'Category',
          'URL',
          'Count',
          'Action'
        ]}
        rows={resources.map((resource) => (
          <React.Fragment
            key={resource.id}
          >
            <td>
              <b>{resource.name}</b>

              <small>
                {resource.description}
              </small>
            </td>

            <td>
              {resource.category}
            </td>

            <td>
              {resource.url}
            </td>

            <td>
              <b>
                {resource.itemCount ?? 0}
              </b>

              <small>
                {resource.itemLabel ||
                  'Resources'}
              </small>
            </td>

            <td>
              <div
                style={{
                  display: 'flex',
                  gap: '8px'
                }}
              >
                <button
                  type="button"
                  className="primary-btn"
                  onClick={() =>
                    startEdit(resource)
                  }
                  title="Edit resource"
                >
                  <Pencil size={14} />
                </button>

                <button
                  className="danger"
                  onClick={() =>
                    removeResource(
                      resource.id
                    )
                  }
                  type="button"
                  title="Remove resource"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </td>
          </React.Fragment>
        ))}
      />
    </AdminPage>
  );
}
