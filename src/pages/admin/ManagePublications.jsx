import React, { useState } from 'react';
import {
  BookMarked,
  Trash2,
} from 'lucide-react';

import { useLibrary } from '../../context/LibraryContext';

import {
  ManagerForm,
  DataTable,
  Field,
  AdminPage,
} from '../../components/admin';

export default function ManagePublications() {
  const {
    publications,
    setPublications,
    saveContent,
    contentSaving,
    setToast,
  } = useLibrary();

  const [form, setForm] = useState({
    title: '',
    author: 'SGGS Faculty',
    department: 'Computer Science & Engineering',
    year: 2026,
    publisher: '',
    description: '',
    cover: '/images/bookshelves.jpg',
  });

  const [saving, setSaving] = useState(false);

  const updateField = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const addPublication = async (event) => {
    event.preventDefault();

    if (!form.title.trim()) {
      setToast('Publication title is required');
      return;
    }

    const newPublication = {
      id: `pub${Date.now()}`,
      title: form.title.trim(),
      author: form.author.trim(),
      department: form.department.trim(),
      year: form.year,
      publisher: form.publisher.trim(),
      description: form.description.trim(),
      cover: form.cover.trim() || '/images/bookshelves.jpg',
    };

    const nextPublications = [
      newPublication,
      ...publications,
    ];

    try {
      setSaving(true);

      /*
       * Save to the backend first.
       * The React state is updated only after the backend
       * confirms that the complete publication list was saved.
       */
      await saveContent({
        publications: nextPublications,
      });

      setPublications(nextPublications);

      setForm({
        title: '',
        author: 'SGGS Faculty',
        department: 'Computer Science & Engineering',
        year: 2026,
        publisher: '',
        description: '',
        cover: '/images/bookshelves.jpg',
      });

      setToast('Publication added and saved successfully');
    } catch (error) {
      console.error('Failed to add publication:', error);
      setToast(
        error?.message ||
          'Publication could not be saved'
      );
    } finally {
      setSaving(false);
    }
  };

  const deletePublication = async (publicationId) => {
    const nextPublications = publications.filter(
      (publication) => publication.id !== publicationId
    );

    try {
      setSaving(true);

      /*
       * Save the updated list first.
       * If the backend save fails, the existing React list
       * remains untouched.
       */
      await saveContent({
        publications: nextPublications,
      });

      setPublications(nextPublications);

      setToast('Publication removed and saved successfully');
    } catch (error) {
      console.error('Failed to delete publication:', error);
      setToast(
        error?.message ||
          'Publication could not be removed'
      );
    } finally {
      setSaving(false);
    }
  };

  const isSaving = saving || contentSaving;

  return (
    <AdminPage
      eyebrow="SGGS FACULTY"
      title="Manage publications"
    >

      <ManagerForm
        title="Add faculty publication"
        onSubmit={addPublication}
      >

        <Field label="Book title">
          <input
            required
            value={form.title}
            onChange={(event) =>
              updateField('title', event.target.value)
            }
          />
        </Field>

        <Field label="Author">
          <input
            value={form.author}
            onChange={(event) =>
              updateField('author', event.target.value)
            }
          />
        </Field>

        <div className="form-two">

          <Field label="Department">
            <input
              value={form.department}
              onChange={(event) =>
                updateField(
                  'department',
                  event.target.value
                )
              }
            />
          </Field>

          <Field label="Year">
            <input
              type="number"
              value={form.year}
              onChange={(event) =>
                updateField(
                  'year',
                  event.target.value
                )
              }
            />
          </Field>

        </div>

        <Field label="Publisher">
          <input
            value={form.publisher}
            onChange={(event) =>
              updateField(
                'publisher',
                event.target.value
              )
            }
          />
        </Field>

        <Field label="Cover image path">
          <input
            value={form.cover}
            onChange={(event) =>
              updateField(
                'cover',
                event.target.value
              )
            }
          />
        </Field>

        <Field label="Description">
          <textarea
            rows="4"
            value={form.description}
            onChange={(event) =>
              updateField(
                'description',
                event.target.value
              )
            }
          />
        </Field>

        <button
          className="primary-btn full"
          type="submit"
          disabled={isSaving}
        >
          <BookMarked size={16} />

          {isSaving
            ? 'Saving publication...'
            : 'Add publication'}
        </button>

      </ManagerForm>


      <DataTable
        headers={[
          'Publication',
          'Department',
          'Year',
          'Action',
        ]}
        rows={publications.map((publication) => (
          <React.Fragment key={publication.id}>

            <td>
              <b>{publication.title}</b>
              <small>{publication.author}</small>
            </td>

            <td>
              {publication.department}
            </td>

            <td>
              {publication.year}
            </td>

            <td>
              <button
                className="danger"
                type="button"
                disabled={isSaving}
                onClick={() =>
                  deletePublication(publication.id)
                }
                aria-label={`Delete ${publication.title}`}
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
