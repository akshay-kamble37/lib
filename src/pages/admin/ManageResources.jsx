import React, { useState } from 'react';
import {
  Plus,
  Trash2,
  Pencil,
  X
} from 'lucide-react';

import { useLibrary } from '../../context/LibraryContext';

import {
  ManagerForm,
  DataTable,
  Field,
  AdminPage
} from '../../components/admin';

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

const buildResource = (form, id) => ({
  id,
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
});

export default function ManageResources() {
  const {
    resources = [],
    setResources,
    setToast,
    saveContent
  } = useLibrary();

  const [form, setForm] = useState({
    ...emptyForm
  });

  const [editingId, setEditingId] = useState(null);

  const updateField = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value
    }));
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({
      ...emptyForm
    });
  };

  const persistResources = async (
    nextResources,
    message
  ) => {
    setResources(nextResources);

    try {
      await saveContent({
        resources: nextResources
      });

      setToast(message);
    } catch (error) {
      console.error(
        'RESOURCE_SAVE_ERROR',
        error
      );
    }
  };

  const add = async (event) => {
    event.preventDefault();

    if (!form.name.trim()) {
      setToast('Resource name is required');
      return;
    }

    const newResource = buildResource(
      form,
      `r${Date.now()}`
    );

    const nextResources = [
      newResource,
      ...resources
    ];

    await persistResources(
      nextResources,
      'Resource added'
    );

    resetForm();
  };

  const startEdit = (resource) => {
    setEditingId(resource.id);

    setForm({
      name: resource.name || '',
      url: resource.url || '',
      category:
        resource.category ||
        'Academic Database',

      description:
        resource.description || '',

      detailedDescription:
        resource.detailedDescription || '',

      features: Array.isArray(resource.features)
        ? resource.features.join('\n')
        : '',

      audience:
        resource.audience || '',

      accessInfo:
        resource.accessInfo || '',

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
    resetForm();
  };

  const updateResource = async (event) => {
    event.preventDefault();

    if (!editingId || !form.name.trim()) {
      return;
    }

    const updatedResources =
      resources.map((resource) => {
        if (resource.id !== editingId) {
          return resource;
        }

        return buildResource(
          form,
          resource.id
        );
      });

    await persistResources(
      updatedResources,
      'Resource updated'
    );

    resetForm();
  };

  const removeResource = async (id) => {
    const resource = resources.find(
      (item) => item.id === id
    );

    if (!resource) {
      return;
    }

    const confirmed = window.confirm(
      `Remove "${resource.name}"?`
    );

    if (!confirmed) {
      return;
    }

    const updatedResources =
      resources.filter(
        (item) => item.id !== id
      );

    await persistResources(
      updatedResources,
      'Resource removed'
    );

    if (editingId === id) {
      resetForm();
    }
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
            onChange={(event) =>
              updateField(
                'name',
                event.target.value
              )
            }
            placeholder="e.g. IEEE Xplore"
          />
        </Field>

        <Field label="URL">
          <input
            value={form.url}
            onChange={(event) =>
              updateField(
                'url',
                event.target.value
              )
            }
            placeholder="https://example.com"
          />
        </Field>

        <Field label="Category">
          <select
            value={form.category}
            onChange={(event) =>
              updateField(
                'category',
                event.target.value
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
            onChange={(event) =>
              updateField(
                'itemCount',
                event.target.value
              )
            }
            placeholder="e.g. 464"
          />
        </Field>

        <Field label="Count Label">
          <input
            value={form.itemLabel}
            onChange={(event) =>
              updateField(
                'itemLabel',
                event.target.value
              )
            }
            placeholder="e.g. E-Journals"
          />
        </Field>

        <Field label="Short Description">
          <textarea
            rows="3"
            value={form.description}
            onChange={(event) =>
              updateField(
                'description',
                event.target.value
              )
            }
            placeholder="Short description shown on the resource card."
          />
        </Field>

        <Field label="Detailed Description">
          <textarea
            rows="5"
            value={form.detailedDescription}
            onChange={(event) =>
              updateField(
                'detailedDescription',
                event.target.value
              )
            }
            placeholder="Detailed information shown on the resource details page."
          />
        </Field>

        <Field label="Features">
          <textarea
            rows="5"
            value={form.features}
            onChange={(event) =>
              updateField(
                'features',
                event.target.value
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
            onChange={(event) =>
              updateField(
                'audience',
                event.target.value
              )
            }
            placeholder="e.g. Engineering students and researchers"
          />
        </Field>

        <Field label="Access Information">
          <textarea
            rows="4"
            value={form.accessInfo}
            onChange={(event) =>
              updateField(
                'accessInfo',
                event.target.value
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
                  type="button"
                  className="danger"
                  onClick={() =>
                    removeResource(
                      resource.id
                    )
                  }
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