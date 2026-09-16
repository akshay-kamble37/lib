import React, { useState } from 'react';
import { Plus, Trash2, UserCheck } from 'lucide-react';
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

  const contacts = Array.isArray(site?.contacts)
    ? site.contacts
    : [];

  const update = (field, value) => {
    setForm(current => ({
      ...current,
      [field]: value,
    }));
  };

  const resetForm = () => {
    setForm(emptyForm);
  };

  const saveContacts = async nextContacts => {
    const nextSite = {
      ...site,
      contacts: nextContacts,
    };

    setSite(nextSite);

    await saveContent({
      site: nextSite,
    });
  };

  const addContact = async event => {
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

      const nextContacts = [
        ...contacts,
        newContact,
      ];

      await saveContacts(nextContacts);

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

  const removeContact = async id => {
    const contact = contacts.find(
      item => item.id === id
    );

    if (!contact) return;

    const confirmed = window.confirm(
      `Remove "${contact.name}" from the Contact Us page?`
    );

    if (!confirmed) return;

    setSaving(true);

    try {
      const nextContacts = contacts.filter(
        item => item.id !== id
      );

      await saveContacts(nextContacts);

      setToast('Contact removed successfully');
    } catch (error) {
      console.error('Contact removal failed:', error);

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
      title="Manage Contact Persons"
      description="Add or remove the people and desks displayed on the public Contact Us page."
    >
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
              onChange={e =>
                update('name', e.target.value)
              }
            />
          </Field>

          <Field label="Role" required>
            <input
              required
              value={form.role}
              placeholder="Faculty In-charge / Librarian / Help Desk"
              onChange={e =>
                update('role', e.target.value)
              }
            />
          </Field>
        </div>

        <Field label="Designation">
          <input
            value={form.designation}
            placeholder="Professor / Librarian / Library Assistant"
            onChange={e =>
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
              onChange={e =>
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
              onChange={e =>
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
            onChange={e =>
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
          disabled={saving || contentSaving}
        >
          <Plus size={17} />

          {saving || contentSaving
            ? 'Saving…'
            : 'Add Contact'}
        </button>
      </ManagerForm>

      <DataTable
        headers={[
          'Contact Person',
          'Role',
          'Phone',
          'Email',
          'Action',
        ]}
        rows={contacts.map(contact => (
          <>
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
                disabled={saving || contentSaving}
                onClick={() =>
                  removeContact(contact.id)
                }
              >
                <Trash2 size={14} />
              </button>
            </td>
          </>
        ))}
      />

      {contacts.length === 0 && (
        <div
          className="portal-panel"
          style={{ marginTop: '20px' }}
        >
          <UserCheck size={22} />

          <h3>No contact persons added</h3>

          <p>
            Add the first contact person using
            the form above. The person will
            automatically appear on the public
            Contact Us page.
          </p>
        </div>
      )}
    </AdminPage>
  );
}