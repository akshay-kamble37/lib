import React, { useEffect, useState } from 'react';
import { Plus, Trash2, UserCheck, Save, MapPin, Phone, Mail } from 'lucide-react';
import { useLibrary } from '../../context/LibraryContext';
import {
  ManagerForm,
  DataTable,
  Field,
  AdminPage,
} from '../../components/admin';

const emptyForm = {
  name: '',
  role: '',
  designation: '',
  phone1: '',
  phone2: '',
  email: '',
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

  const [contactInfo, setContactInfo] = useState({
    address: '',
    contactPhone: '',
    contactEmail: '',
  });

  const [savingContactInfo, setSavingContactInfo] = useState(false);

  const contacts = Array.isArray(site?.contacts)
    ? site.contacts
    : [];

  /* --------------------------------
     Load Contact Information
  -------------------------------- */
  useEffect(() => {
    setContactInfo({
      address: site?.address || '',
      contactPhone: site?.contactPhone || '',
      contactEmail: site?.contactEmail || '',
    });
  }, [site?.address, site?.contactPhone, site?.contactEmail]);

  /* --------------------------------
     Contact Person Form
  -------------------------------- */
  const update = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const resetForm = () => {
    setForm(emptyForm);
  };

  /* --------------------------------
     General Contact Information
  -------------------------------- */
  const updateContactInfo = (field, value) => {
    setContactInfo((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const saveContactInformation = async (event) => {
    event.preventDefault();

    if (!contactInfo.address.trim()) {
      setToast('Address is required');
      return;
    }

    if (!contactInfo.contactPhone.trim()) {
      setToast('Contact phone number is required');
      return;
    }

    if (!contactInfo.contactEmail.trim()) {
      setToast('Official email is required');
      return;
    }

    setSavingContactInfo(true);

    try {
      const nextSite = {
        ...site,
        address: contactInfo.address.trim(),
        contactPhone: contactInfo.contactPhone.trim(),
        contactEmail: contactInfo.contactEmail.trim(),
      };

      setSite(nextSite);

      await saveContent({
        site: nextSite,
      });

      setToast('Contact information updated successfully');
    } catch (error) {
      console.error('Contact information save failed:', error);

      setToast(
        error?.message ||
          'Unable to update contact information'
      );
    } finally {
      setSavingContactInfo(false);
    }
  };

  /* --------------------------------
     Add Contact Person
  -------------------------------- */
  const saveContacts = async (nextContacts) => {
    const nextSite = {
      ...site,
      contacts: nextContacts,
    };

    setSite(nextSite);

    await saveContent({
      site: nextSite,
    });
  };

  const addContact = async (event) => {
    event.preventDefault();

    if (!form.name.trim()) {
      setToast('Contact name is required');
      return;
    }

    if (!form.role.trim()) {
      setToast('Contact role is required');
      return;
    }

    setSaving(true);

    try {
      const newContact = {
        id: `contact-${Date.now()}`,
        name: form.name.trim(),
        role: form.role.trim(),
        designation: form.designation.trim(),
        phone1: form.phone1.trim(),
        phone2: form.phone2.trim(),
        email: form.email.trim(),
      };

      await saveContacts([
        ...contacts,
        newContact,
      ]);

      resetForm();

      setToast('Contact added successfully');
    } catch (error) {
      console.error('Contact save failed:', error);

      setToast(
        error?.message ||
          'Unable to save contact'
      );
    } finally {
      setSaving(false);
    }
  };

  /* --------------------------------
     Delete Contact Person
  -------------------------------- */
  const removeContact = async (id) => {
    const contact = contacts.find(
      (item) => item.id === id
    );

    if (!contact) return;

    const confirmed = window.confirm(
      `Remove "${contact.name}" from the Contact Us page?`
    );

    if (!confirmed) return;

    setSaving(true);

    try {
      await saveContacts(
        contacts.filter(
          (item) => item.id !== id
        )
      );

      setToast('Contact removed successfully');
    } catch (error) {
      console.error(
        'Contact removal failed:',
        error
      );

      setToast(
        error?.message ||
          'Unable to remove contact'
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminPage
      eyebrow="CONTACT MANAGEMENT"
      title="Manage Contact Us"
    >

      {/* =========================================
          GENERAL CONTACT INFORMATION
      ========================================= */}
      <ManagerForm
        title="General Contact Information"
        onSubmit={saveContactInformation}
      >

        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
            marginBottom: '20px',
          }}
        >

          {/* Address */}
          <Field label="Address" required>
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
              }}
            >
              <MapPin
                size={18}
                style={{
                  marginTop: '10px',
                  flexShrink: 0,
                }}
              />

              <textarea
                required
                rows={4}
                value={contactInfo.address}
                placeholder="Enter library address"
                onChange={(e) =>
                  updateContactInfo(
                    'address',
                    e.target.value
                  )
                }
                style={{
                  width: '100%',
                  resize: 'vertical',
                }}
              />
            </div>
          </Field>

          {/* Phone */}
          <Field
            label="Contact Phone Number"
            required
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <Phone
                size={18}
                style={{ flexShrink: 0 }}
              />

              <input
                type="tel"
                required
                value={contactInfo.contactPhone}
                placeholder="Enter contact phone number"
                onChange={(e) =>
                  updateContactInfo(
                    'contactPhone',
                    e.target.value
                  )
                }
              />
            </div>
          </Field>

          {/* Email */}
          <Field
            label="Official Email"
            required
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <Mail
                size={18}
                style={{ flexShrink: 0 }}
              />

              <input
                type="email"
                required
                value={contactInfo.contactEmail}
                placeholder="example@sggs.ac.in"
                onChange={(e) =>
                  updateContactInfo(
                    'contactEmail',
                    e.target.value
                  )
                }
              />
            </div>
          </Field>

        </div>

        <button
          type="submit"
          className="primary-btn full"
          disabled={
            savingContactInfo ||
            contentSaving
          }
        >
          <Save size={17} />

          {savingContactInfo ||
          contentSaving
            ? 'Saving…'
            : 'Save Contact Information'}
        </button>

      </ManagerForm>


      {/* =========================================
          ADD CONTACT PERSON
      ========================================= */}
      <ManagerForm
        title="Add Contact Person"
        onSubmit={addContact}
      >

        <div className="form-two">

          <Field label="Name" required>
            <input
              required
              value={form.name}
              placeholder="Enter contact person's name"
              onChange={(e) =>
                update(
                  'name',
                  e.target.value
                )
              }
            />
          </Field>

          <Field label="Role" required>
            <input
              required
              value={form.role}
              placeholder="Faculty In-charge / Librarian / Help Desk"
              onChange={(e) =>
                update(
                  'role',
                  e.target.value
                )
              }
            />
          </Field>

        </div>

        <Field label="Designation">
          <input
            value={form.designation}
            placeholder="Professor / Librarian / Library Assistant"
            onChange={(e) =>
              update(
                'designation',
                e.target.value
              )
            }
          />
        </Field>

        <div className="form-two">

          <Field label="Phone Number 1">
            <input
              type="tel"
              value={form.phone1}
              placeholder="Enter phone number"
              onChange={(e) =>
                update(
                  'phone1',
                  e.target.value
                )
              }
            />
          </Field>

          <Field label="Phone Number 2">
            <input
              type="tel"
              value={form.phone2}
              placeholder="Optional second number"
              onChange={(e) =>
                update(
                  'phone2',
                  e.target.value
                )
              }
            />
          </Field>

        </div>

        <Field label="Email">
          <input
            type="email"
            value={form.email}
            placeholder="example@sggs.ac.in"
            onChange={(e) =>
              update(
                'email',
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
          <Plus size={17} />

          {saving ||
          contentSaving
            ? 'Saving…'
            : 'Add Contact'}
        </button>

      </ManagerForm>


      {/* =========================================
          CONTACT PERSON LIST
      ========================================= */}
      <DataTable
        headers={[
          'Contact Person',
          'Role',
          'Phone',
          'Email',
          'Action',
        ]}
        rows={contacts.map((contact) => (
          <React.Fragment key={contact.id}>

            <td>
              <b>{contact.name}</b>

              {contact.designation && (
                <small>
                  {contact.designation}
                </small>
              )}
            </td>

            <td>
              {contact.role || '—'}
            </td>

            <td>
              <div>
                {contact.phone1 || '—'}
              </div>

              {contact.phone2 && (
                <small>
                  {contact.phone2}
                </small>
              )}
            </td>

            <td>
              {contact.email || '—'}
            </td>

            <td>
              <button
                type="button"
                className="danger"
                title={`Remove ${contact.name}`}
                disabled={
                  saving ||
                  contentSaving
                }
                onClick={() =>
                  removeContact(contact.id)
                }
              >
                <Trash2 size={14} />
              </button>
            </td>

          </React.Fragment>
        ))}
      />

      {contacts.length === 0 && (
        <div
          className="portal-panel"
          style={{ marginTop: '20px' }}
        >
          <UserCheck size={22} />

          <h3>
            No contact persons added
          </h3>

          <p>
            Add the first contact person
            using the form above. The person
            will automatically appear on the
            public Contact Us page.
          </p>
        </div>
      )}

    </AdminPage>
  );
}