import React, { useRef, useState } from 'react';
import {
  BookMarked,
  Trash2,
  Edit3,
  ChevronUp,
  ChevronDown,
  Save,
  X,
  Plus,
  ImagePlus,
  Upload,
} from 'lucide-react';

import { useLibrary } from '../../context/LibraryContext';

import {
  ManagerForm,
  DataTable,
  Field,
  AdminPage,
} from '../../components/admin';

const DEFAULT_COVER = '/images/bookshelves.jpg';

const emptyForm = {
  title: '',
  author: 'SGGS Faculty',
  department: 'Computer Science & Engineering',
  year: 2026,
  publisher: '',
  description: '',
  cover: DEFAULT_COVER,
};

const MAX_IMAGE_SIZE = 4 * 1024 * 1024;

const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif',
];

export default function ManagePublications() {
  const {
    publications = [],
    setPublications,
    saveContent,
    contentSaving,
    setToast,
  } = useLibrary();

  const [form, setForm] = useState(
    emptyForm
  );

  const [editingId, setEditingId] =
    useState(null);

  const [saving, setSaving] =
    useState(false);

  const [imageUploading, setImageUploading] =
    useState(false);

  const fileInputRef = useRef(null);

  const isEditing =
    Boolean(editingId);

  const isSaving =
    saving ||
    contentSaving ||
    imageUploading;

  const updateField = (
    field,
    value
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  /*
   * Convert the selected image to a data URL.
   *
   * The resulting string is stored inside the
   * publication object and then persisted by
   * saveContent() into content.json.
   *
   * Therefore the image does not disappear after
   * a browser refresh.
   */
  const readImageAsDataUrl = (
    file
  ) =>
    new Promise((resolve, reject) => {
      const reader =
        new FileReader();

      reader.onload = () =>
        resolve(reader.result);

      reader.onerror = () =>
        reject(
          new Error(
            'Unable to read selected image'
          )
        );

      reader.readAsDataURL(file);
    });

  const handleImageSelect = async (
    event
  ) => {
    const file =
      event.target.files?.[0];

    /*
     * Allow selecting the same image again.
     */
    event.target.value = '';

    if (!file) return;

    if (
      !ALLOWED_IMAGE_TYPES.includes(
        file.type
      )
    ) {
      setToast(
        'Please select a JPG, PNG, WebP or AVIF image'
      );
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      setToast(
        'Image must be smaller than 4 MB'
      );
      return;
    }

    setImageUploading(true);

    try {
      const dataUrl =
        await readImageAsDataUrl(file);

      /*
       * Keep the image in the form until
       * the publication itself is saved.
       */
      updateField(
        'cover',
        dataUrl
      );

      setToast(
        'Image selected. Save the publication to keep it permanently.'
      );
    } catch (error) {
      console.error(
        'Image selection failed:',
        error
      );

      setToast(
        error?.message ||
          'Unable to select image'
      );
    } finally {
      setImageUploading(false);
    }
  };

  const resetForm = () => {
    setForm({
      ...emptyForm,
    });

    setEditingId(null);

    if (fileInputRef.current) {
      fileInputRef.current.value =
        '';
    }
  };

  /*
   * Central persistence function.
   *
   * Every operation:
   *   ADD
   *   EDIT
   *   DELETE
   *   MOVE UP
   *   MOVE DOWN
   *
   * goes through this function.
   */
  const persist = async (
    nextPublications,
    message
  ) => {
    setSaving(true);

    try {
      /*
       * Backend receives the complete publication
       * collection, including the image data URL.
       */
      await saveContent({
        publications:
          nextPublications,
      });

      /*
       * Update React state only after the
       * backend confirms the save.
       */
      setPublications(
        nextPublications
      );

      setToast(message);
    } catch (error) {
      console.error(
        'Publication save failed:',
        error
      );

      setToast(
        error?.message ||
          'Unable to save publication'
      );

      throw error;
    } finally {
      setSaving(false);
    }
  };

  const submit = async (
    event
  ) => {
    event.preventDefault();

    if (!form.title.trim()) {
      setToast(
        'Publication title is required'
      );
      return;
    }

    if (!form.author.trim()) {
      setToast(
        'Author name is required'
      );
      return;
    }

    /*
     * Preserve the selected image.
     *
     * If editing and no new image was selected,
     * the existing cover URL/data URL remains.
     */
    const publicationData = {
      title: form.title.trim(),

      author:
        form.author.trim(),

      department:
        form.department.trim(),

      year:
        Number(form.year) || 2026,

      publisher:
        form.publisher.trim(),

      description:
        form.description.trim(),

      cover:
        form.cover.trim() ||
        DEFAULT_COVER,
    };

    try {
      if (isEditing) {
        const nextPublications =
          publications.map(
            (publication) =>
              publication.id ===
              editingId
                ? {
                    ...publication,
                    ...publicationData,
                  }
                : publication
          );

        await persist(
          nextPublications,
          'Publication updated successfully'
        );
      } else {
        const newPublication = {
          id: `pub${Date.now()}`,
          ...publicationData,
        };

        await persist(
          [
            newPublication,
            ...publications,
          ],
          'Publication added successfully'
        );
      }

      resetForm();
    } catch {
      /*
       * persist() already displays the
       * error toast.
       */
    }
  };

  const editPublication = (
    publication
  ) => {
    setEditingId(
      publication.id
    );

    setForm({
      title:
        publication.title || '',

      author:
        publication.author ||
        'SGGS Faculty',

      department:
        publication.department ||
        'Computer Science & Engineering',

      year:
        publication.year ||
        2026,

      publisher:
        publication.publisher ||
        '',

      description:
        publication.description ||
        '',

      /*
       * IMPORTANT:
       *
       * This can be:
       * - /images/...
       * - https://...
       * - data:image/...
       *
       * We preserve all three.
       */
      cover:
        publication.cover ||
        DEFAULT_COVER,
    });

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const deletePublication =
    async (id) => {
      const publication =
        publications.find(
          (item) =>
            item.id === id
        );

      if (!publication) {
        return;
      }

      if (
        !window.confirm(
          `Remove "${publication.title}"?`
        )
      ) {
        return;
      }

      try {
        await persist(
          publications.filter(
            (item) =>
              item.id !== id
          ),
          'Publication removed successfully'
        );

        if (
          editingId === id
        ) {
          resetForm();
        }
      } catch {
        /*
         * persist() handles the error.
         */
      }
    };

  const movePublication =
    async (
      index,
      direction
    ) => {
      const targetIndex =
        direction === 'up'
          ? index - 1
          : index + 1;

      if (
        targetIndex < 0 ||
        targetIndex >=
          publications.length
      ) {
        return;
      }

      const nextPublications =
        [...publications];

      [
        nextPublications[index],
        nextPublications[
          targetIndex
        ],
      ] = [
        nextPublications[
          targetIndex
        ],
        nextPublications[index],
      ];

      try {
        await persist(
          nextPublications,
          'Publication order updated'
        );
      } catch {
        /*
         * persist() handles the error.
         */
      }
    };

  const removeSelectedImage =
    () => {
      updateField(
        'cover',
        DEFAULT_COVER
      );

      if (fileInputRef.current) {
        fileInputRef.current.value =
          '';
      }

      setToast(
        'Publication image reset'
      );
    };

  const hasCustomImage =
    form.cover &&
    form.cover !==
      DEFAULT_COVER;

  return (
    <AdminPage
      eyebrow="SGGS FACULTY"
      title="Manage publications"
      description="Add, edit, remove and reorder faculty publications."
    >
      <ManagerForm
        title={
          isEditing
            ? 'Edit faculty publication'
            : 'Add faculty publication'
        }
        onSubmit={submit}
      >
        <Field label="Book title">
          <input
            required
            value={form.title}
            onChange={(event) =>
              updateField(
                'title',
                event.target.value
              )
            }
            placeholder="Enter publication title"
          />
        </Field>

        <Field label="Author">
          <input
            value={form.author}
            onChange={(event) =>
              updateField(
                'author',
                event.target.value
              )
            }
            placeholder="SGGS Faculty"
          />
        </Field>

        <div className="form-two">
          <Field label="Department">
            <input
              value={
                form.department
              }
              onChange={(event) =>
                updateField(
                  'department',
                  event.target.value
                )
              }
              placeholder="Computer Science & Engineering"
            />
          </Field>

          <Field label="Year">
            <input
              type="number"
              min="1900"
              max="2100"
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
            value={
              form.publisher
            }
            onChange={(event) =>
              updateField(
                'publisher',
                event.target.value
              )
            }
            placeholder="Publisher name"
          />
        </Field>

        <Field label="Publication Cover Image">
          <div
            className="publication-image-manager"
            style={{
              display: 'grid',
              gap: '12px',
            }}
          >
            <div
              style={{
                width: '180px',
                height: '220px',
                borderRadius: '12px',
                overflow: 'hidden',
                border:
                  '1px solid rgba(0,0,0,.12)',
                background:
                  '#f5f5f5',
                display: 'flex',
                alignItems:
                  'center',
                justifyContent:
                  'center',
              }}
            >
              {form.cover ? (
                <img
                  src={form.cover}
                  alt="Publication cover preview"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit:
                      'cover',
                    display: 'block',
                  }}
                  onError={(
                    event
                  ) => {
                    event.currentTarget.src =
                      DEFAULT_COVER;
                  }}
                />
              ) : (
                <ImagePlus
                  size={36}
                  opacity={0.5}
                />
              )}
            </div>

            <div
              style={{
                display: 'flex',
                gap: '8px',
                flexWrap: 'wrap',
              }}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept={ALLOWED_IMAGE_TYPES.join(
                  ','
                )}
                onChange={
                  handleImageSelect
                }
                disabled={isSaving}
                style={{
                  display: 'none',
                }}
              />

              <button
                type="button"
                className="secondary-btn"
                disabled={isSaving}
                onClick={() =>
                  fileInputRef.current?.click()
                }
              >
                <Upload size={16} />

                {imageUploading
                  ? 'Reading image...'
                  : 'Choose image'}
              </button>

              {hasCustomImage && (
                <button
                  type="button"
                  className="secondary-btn"
                  disabled={isSaving}
                  onClick={
                    removeSelectedImage
                  }
                >
                  <X size={16} />
                  Remove image
                </button>
              )}
            </div>

            <input
              value={form.cover}
              onChange={(event) =>
                updateField(
                  'cover',
                  event.target.value
                )
              }
              placeholder="/images/publications/book-cover.webp or image URL"
              disabled={isSaving}
            />

            <small
              style={{
                display: 'block',
                opacity: 0.7,
                lineHeight: 1.5,
              }}
            >
              JPG, PNG, WebP or AVIF.
              Maximum size: 4 MB.
              The selected image is stored
              with the publication when you
              save it.
            </small>
          </div>
        </Field>

        <Field label="Description">
          <textarea
            rows="4"
            value={
              form.description
            }
            onChange={(event) =>
              updateField(
                'description',
                event.target.value
              )
            }
            placeholder="Publication description"
          />
        </Field>

        <div
          className="admin-form-actions"
          style={{
            display: 'flex',
            gap: '10px',
          }}
        >
          <button
            className="primary-btn full"
            type="submit"
            disabled={isSaving}
          >
            {isEditing ? (
              <Save size={16} />
            ) : (
              <Plus size={16} />
            )}

            {isSaving
              ? 'Saving...'
              : isEditing
                ? 'Update publication'
                : 'Add publication'}
          </button>

          {isEditing && (
            <button
              type="button"
              className="secondary-btn"
              onClick={resetForm}
              disabled={isSaving}
            >
              <X size={16} />
              Cancel
            </button>
          )}
        </div>
      </ManagerForm>

      <DataTable
        headers={[
          'Publication',
          'Department',
          'Year',
          'Action',
        ]}
        rows={publications.map(
          (
            publication,
            index
          ) => (
            <React.Fragment
              key={publication.id}
            >
              <td>
                <div
                  style={{
                    display: 'flex',
                    alignItems:
                      'center',
                    gap: '10px',
                  }}
                >
                  <div
                    style={{
                      width: '48px',
                      height: '60px',
                      flex:
                        '0 0 48px',
                      borderRadius:
                        '6px',
                      overflow:
                        'hidden',
                      background:
                        '#f2f2f2',
                      border:
                        '1px solid rgba(0,0,0,.1)',
                    }}
                  >
                    <img
                      src={
                        publication.cover ||
                        DEFAULT_COVER
                      }
                      alt=""
                      style={{
                        width:
                          '100%',
                        height:
                          '100%',
                        objectFit:
                          'cover',
                        display:
                          'block',
                      }}
                      onError={(
                        event
                      ) => {
                        event.currentTarget.src =
                          DEFAULT_COVER;
                      }}
                    />
                  </div>

                  <div>
                    <b>
                      {
                        publication.title
                      }
                    </b>

                    <small>
                      {
                        publication.author
                      }
                    </small>
                  </div>
                </div>
              </td>

              <td>
                {
                  publication.department
                }
              </td>

              <td>
                {
                  publication.year
                }
              </td>

              <td>
                <div className="admin-row-actions">
                  <button
                    type="button"
                    className="secondary-btn"
                    title="Move up"
                    disabled={
                      isSaving ||
                      index === 0
                    }
                    onClick={() =>
                      movePublication(
                        index,
                        'up'
                      )
                    }
                  >
                    <ChevronUp
                      size={14}
                    />
                  </button>

                  <button
                    type="button"
                    className="secondary-btn"
                    title="Move down"
                    disabled={
                      isSaving ||
                      index ===
                        publications.length -
                          1
                    }
                    onClick={() =>
                      movePublication(
                        index,
                        'down'
                      )
                    }
                  >
                    <ChevronDown
                      size={14}
                    />
                  </button>

                  <button
                    type="button"
                    className="secondary-btn"
                    title="Edit publication"
                    disabled={
                      isSaving
                    }
                    onClick={() =>
                      editPublication(
                        publication
                      )
                    }
                  >
                    <Edit3
                      size={14}
                    />
                  </button>

                  <button
                    type="button"
                    className="danger"
                    title="Delete publication"
                    disabled={
                      isSaving
                    }
                    onClick={() =>
                      deletePublication(
                        publication.id
                      )
                    }
                  >
                    <Trash2
                      size={14}
                    />
                  </button>
                </div>
              </td>
            </React.Fragment>
          )
        )}
      />
    </AdminPage>
  );
}
