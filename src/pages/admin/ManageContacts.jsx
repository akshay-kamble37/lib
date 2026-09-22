import React, { useEffect, useState } from 'react';
import {
  Save,
  RotateCcw,
  Phone,
  Mail,
  MapPin,
  Clock,
} from 'lucide-react';

import { useLibrary } from '../../context/LibraryContext';

import {
  ManagerForm,
  Field,
  AdminPage,
} from '../../components/admin';

const emptyForm = {
  contactPhone: '',
  contactEmail: '',
  address: '',
  officeHours: '',
};

export default function ManageContacts() {
  const {
    site,
    setSite,
    saveContent,
    contentSaving,
    setToast,
  } = useLibrary();

  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const isSaving =
    saving || contentSaving;

  /*
   * Load the current contact information
   * whenever the site content becomes available.
   */
  useEffect(() => {
    setForm({
      contactPhone:
        site?.contactPhone || '',

      contactEmail:
        site?.contactEmail || '',

      address:
        site?.address || '',

      /*
       * officeHours is optional because it may not
       * exist in the original defaultSite object.
       */
      officeHours:
        site?.officeHours || '',
    });
  }, [
    site?.contactPhone,
    site?.contactEmail,
    site?.address,
    site?.officeHours,
  ]);

  const updateField = (
    field,
    value
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const saveContacts = async (
    event
  ) => {
    event.preventDefault();

    const nextSite = {
      ...(site || {}),

      contactPhone:
        form.contactPhone.trim(),

      contactEmail:
        form.contactEmail.trim(),

      address:
        form.address.trim(),

      /*
       * Only add officeHours when the field
       * has actually been entered.
       */
      ...(form.officeHours.trim()
        ? {
            officeHours:
              form.officeHours.trim(),
          }
        : {}),
    };

    setSaving(true);

    try {
      /*
       * Save to backend first.
       * React state is changed only after the
       * backend confirms the save.
       */
      await saveContent({
        site: nextSite,
      });

      setSite(nextSite);

      setToast(
        'Contact information saved successfully'
      );
    } catch (error) {
      console.error(
        'Failed to save contact information:',
        error
      );

      setToast(
        error?.message ||
          'Contact information could not be saved'
      );
    } finally {
      setSaving(false);
    }
  };

  const resetForm = () => {
    setForm({
      contactPhone:
        site?.contactPhone || '',

      contactEmail:
        site?.contactEmail || '',

      address:
        site?.address || '',

      officeHours:
        site?.officeHours || '',
    });

    setToast(
      'Contact form restored'
    );
  };

  return (
    <AdminPage
      eyebrow="LIBRARY INFORMATION"
      title="Manage Contacts"
      description="Update the Central Library contact details displayed across the public website."
    >
      <ManagerForm
        title="Library contact information"
        onSubmit={saveContacts}
      >
        <div className="form-two">
          <Field label="Contact Phone">
            <div
              style={{
                position: 'relative',
              }}
            >
              <Phone
                size={16}
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform:
                    'translateY(-50%)',
                  opacity: 0.6,
                  pointerEvents: 'none',
                }}
              />

              <input
                type="tel"
                value={
                  form.contactPhone
                }
                onChange={(event) =>
                  updateField(
                    'contactPhone',
                    event.target.value
                  )
                }
                placeholder="02462 269234"
                style={{
                  paddingLeft: '38px',
                }}
              />
            </div>
          </Field>

          <Field label="Contact Email">
            <div
              style={{
                position: 'relative',
              }}
            >
              <Mail
                size={16}
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform:
                    'translateY(-50%)',
                  opacity: 0.6,
                  pointerEvents: 'none',
                }}
              />

              <input
                type="email"
                value={
                  form.contactEmail
                }
                onChange={(event) =>
                  updateField(
                    'contactEmail',
                    event.target.value
                  )
                }
                placeholder="library@sggs.ac.in"
                style={{
                  paddingLeft: '38px',
                }}
              />
            </div>
          </Field>
        </div>

        <Field label="Library Address">
          <div
            style={{
              position: 'relative',
            }}
          >
            <MapPin
              size={16}
              style={{
                position: 'absolute',
                left: '12px',
                top: '16px',
                opacity: 0.6,
                pointerEvents: 'none',
              }}
            />

            <textarea
              rows="4"
              value={
                form.address
              }
              onChange={(event) =>
                updateField(
                  'address',
                  event.target.value
                )
              }
              placeholder="Shri Guru Gobind Singhji Institute of Engineering & Technology, Vishnupuri, Nanded, Maharashtra 431606"
              style={{
                paddingLeft: '38px',
              }}
            />
          </div>
        </Field>

        <Field label="Library Office Hours">
          <div
            style={{
              position: 'relative',
            }}
          >
            <Clock
              size={16}
              style={{
                position: 'absolute',
                left: '12px',
                top: '16px',
                opacity: 0.6,
                pointerEvents: 'none',
              }}
            />

            <textarea
              rows="3"
              value={
                form.officeHours
              }
              onChange={(event) =>
                updateField(
                  'officeHours',
                  event.target.value
                )
              }
              placeholder="Monday - Friday: 9:00 AM - 5:00 PM"
              style={{
                paddingLeft: '38px',
              }}
            />
          </div>
        </Field>

        <div
          style={{
            display: 'flex',
            gap: '10px',
          }}
        >
          <button
            type="submit"
            className="primary-btn full"
            disabled={isSaving}
          >
            <Save size={17} />

            {isSaving
              ? 'Saving contact information...'
              : 'Save Contact Information'}
          </button>

          <button
            type="button"
            className="secondary-btn"
            disabled={isSaving}
            onClick={resetForm}
          >
            <RotateCcw size={16} />
            Reset
          </button>
        </div>
      </ManagerForm>

      <section
        className="portal-panel"
        style={{
          marginTop: '24px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
          }}
        >
          <MapPin size={20} />

          <div>
            <h3>
              Current contact details
            </h3>

            <p>
              These values are stored inside
              the site's content and are used
              by the public library pages.
            </p>

            <div
              style={{
                display: 'grid',
                gap: '8px',
                marginTop: '14px',
              }}
            >
              <div>
                <strong>
                  Phone:
                </strong>{' '}
                {site?.contactPhone ||
                  'Not configured'}
              </div>

              <div>
                <strong>
                  Email:
                </strong>{' '}
                {site?.contactEmail ||
                  'Not configured'}
              </div>

              <div>
                <strong>
                  Address:
                </strong>{' '}
                {site?.address ||
                  'Not configured'}
              </div>

              {site?.officeHours && (
                <div>
                  <strong>
                    Office Hours:
                  </strong>{' '}
                  {site.officeHours}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </AdminPage>
  );
}
