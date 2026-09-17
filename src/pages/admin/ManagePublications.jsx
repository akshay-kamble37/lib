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

  /* -----------------------------------------
     FORM UPDATE
  ----------------------------------------- */
  const updateForm = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  /* -----------------------------------------
     ADD PUBLICATION
  ----------------------------------------- */
  const add = async (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      setToast('Book title is required');
      return;
    }

    setSaving(true);

    try {
      const newPublication = {
        id: `pub${Date.now()}`,
        title: form.title.trim(),
        author: form.author.trim(),
        department: form.department.trim(),
        year: form.year,
        publisher: form.publisher.trim(),
        description: form.description.trim(),
        cover: form.cover.trim(),
      };

      const nextPublications = [
        newPublication,
        ...publications,
      ];

      /* Update screen immediately */
      setPublications(nextPublications);

      /* Save permanently to database */
      await saveContent({
        publications: nextPublications,
      });

      /* Clear only the title */
      setForm((current) => ({
        ...current,
        title: '',
      }));

      setToast('Publication added successfully');
    } catch (error) {
      console.error(
        'Publication add failed:',
        error
      );

      setToast(
        error?.message ||
          'Unable to add publication'
      );
    } finally {
      setSaving(false);
    }
  };

  /* -----------------------------------------
     DELETE PUBLICATION
  ----------------------------------------- */
  const removePublication = async (id) => {
    const publication = publications.find(
      (item) => item.id === id
    );

    if (!publication) return;

    const confirmed = window.confirm(
      `Remove "${publication.title}" from publications?`
    );

    if (!confirmed) return;

    setSaving(true);

    try {
      const nextPublications =
        publications.filter(
          (item) => item.id !== id
        );

      /* Update screen immediately */
      setPublications(nextPublications);

      /* Save permanently to database */
      await saveContent({
        publications: nextPublications,
      });

      setToast(
        'Publication removed successfully'
      );
    } catch (error) {
      console.error(
        'Publication removal failed:',
        error
      );

      setToast(
        error?.message ||
          'Unable to remove publication'
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminPage
      eyebrow="SGGS FACULTY"
      title="Manage publications"
    >

      {/* =====================================
          ADD PUBLICATION
      ===================================== */}
      <ManagerForm
        title="Add faculty publication"
        onSubmit={add}
      >

        <Field label="Book title">
          <input
            required
            value={form.title}
            onChange={(e) =>
              updateForm(
                'title',
                e.target.value
              )
            }
          />
        </Field>

        <Field label="Author">
          <input
            value={form.author}
            onChange={(e) =>
              updateForm(
                'author',
                e.target.value
              )
            }
          />
        </Field>

        <div className="form-two">

          <Field label="Department">
            <input
              value={form.department}
              onChange={(e) =>
                updateForm(
                  'department',
                  e.target.value
                )
              }
            />
          </Field>

          <Field label="Year">
            <input
              value={form.year}
              onChange={(e) =>
                updateForm(
                  'year',
                  e.target.value
                )
              }
            />
          </Field>

        </div>

        <Field label="Publisher">
          <input
            value={form.publisher}
            onChange={(e) =>
              updateForm(
                'publisher',
                e.target.value
              )
            }
          />
        </Field>

        <Field label="Cover image path">
          <input
            value={form.cover}
            onChange={(e) =>
              updateForm(
                'cover',
                e.target.value
              )
            }
          />
        </Field>

        <Field label="Description">
          <textarea
            rows="4"
            value={form.description}
            onChange={(e) =>
              updateForm(
                'description',
                e.target.value
              )
            }
          />
        </Field>

        <button
          type="submit"
          className="primary-btn full"
          disabled={
            saving ||
            contentSaving
          }
        >
          <BookMarked size={17} />

          {saving || contentSaving
            ? 'Saving…'
            : 'Add publication'}
        </button>

      </ManagerForm>


      {/* =====================================
          PUBLICATION LIST
      ===================================== */}
      <DataTable
        headers={[
          'Publication',
          'Department',
          'Year',
          'Action',
        ]}
        rows={publications.map((p) => (
          <React.Fragment key={p.id}>

            <td>
              <b>{p.title}</b>

              <small>
                {p.author}
              </small>
            </td>

            <td>
              {p.department}
            </td>

            <td>
              {p.year}
            </td>

            <td>
              <button
                type="button"
                className="danger"
                title={`Remove ${p.title}`}
                disabled={
                  saving ||
                  contentSaving
                }
                onClick={() =>
                  removePublication(
                    p.id
                  )
                }
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