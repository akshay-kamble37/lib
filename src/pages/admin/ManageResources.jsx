import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

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
  accessInfo: ''
};

export default function ManageResources() {
  const {
    resources,
    setResources,
    setToast
  } = useLibrary();

  const [form, setForm] = useState(emptyForm);

  const updateField = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value
    }));
  };

  const add = (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      return;
    }

    const newResource = {
      id: `r${Date.now()}`,
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
        'Visit the official resource website to access the available academic content.'
    };

    setResources((current) => [
      newResource,
      ...current
    ]);

    setForm(emptyForm);

    setToast('Resource added');
  };

  const removeResource = (id) => {
    setResources((current) =>
      current.filter((resource) => resource.id !== id)
    );

    setToast('Resource removed');
  };

  return (
    <AdminPage
      eyebrow="E-RESOURCES"
      title="Manage digital resources"
    >
      <ManagerForm
        title="Add resource"
        onSubmit={add}
      >
        <Field label="Name">
          <input
            required
            value={form.name}
            onChange={(e) =>
              updateField('name', e.target.value)
            }
            placeholder="e.g. IEEE Xplore"
          />
        </Field>

        <Field label="URL">
          <input
            value={form.url}
            onChange={(e) =>
              updateField('url', e.target.value)
            }
            placeholder="https://example.com"
          />
        </Field>

        <Field label="Category">
          <select
            value={form.category}
            onChange={(e) =>
              updateField('category', e.target.value)
            }
          >
            <option>Academic Database</option>
            <option>Engineering Database</option>
            <option>Discovery</option>
          </select>
        </Field>

        <Field label="Short Description">
          <textarea
            rows="3"
            value={form.description}
            onChange={(e) =>
              updateField('description', e.target.value)
            }
            placeholder="Short description shown on the resource card."
          />
        </Field>

        <Field label="Detailed Description">
          <textarea
            rows="5"
            value={form.detailedDescription}
            onChange={(e) =>
              updateField(
                'detailedDescription',
                e.target.value
              )
            }
            placeholder="Detailed information shown on the resource details page."
          />
        </Field>

        <Field label="Features">
          <textarea
            rows="5"
            value={form.features}
            onChange={(e) =>
              updateField('features', e.target.value)
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
              updateField('audience', e.target.value)
            }
            placeholder="e.g. Engineering students and researchers"
          />
        </Field>

        <Field label="Access Information">
          <textarea
            rows="4"
            value={form.accessInfo}
            onChange={(e) =>
              updateField('accessInfo', e.target.value)
            }
            placeholder="Explain how users should access the resource."
          />
        </Field>

        <button
          type="submit"
          className="primary-btn full"
        >
          <Plus />
          Add resource
        </button>
      </ManagerForm>

      <DataTable
        headers={[
          'Name',
          'Category',
          'URL',
          'Action'
        ]}
        rows={resources.map((resource) => (
          <React.Fragment key={resource.id}>
            <td>
              <b>{resource.name}</b>
              <small>{resource.description}</small>
            </td>

            <td>
              {resource.category}
            </td>

            <td>
              {resource.url}
            </td>

            <td>
              <button
                className="danger"
                onClick={() =>
                  removeResource(resource.id)
                }
                type="button"
                title="Remove resource"
              >
                <Trash2 size={14} />
              </button>
            </td>
          </React.Fragment>
        ))}
      />
    </AdminPage>
  );
}