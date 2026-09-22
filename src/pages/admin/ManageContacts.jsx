import React, { useState } from 'react';
import { Trash2, Plus, PhoneCall } from 'lucide-react';
import { useLibrary } from '../../context/LibraryContext';

const initialDefaultContacts = [
  {
    id: 'c-1',
    role: 'Faculty In-charge (Library)',
    name: 'Dr. A. B. Gonde',
    designation: 'Professor & Dean R&D / Library In-charge',
    phone: '02462-269219 / 02462-269335',
    email: 'dean.rd@sggs.ac.in',
  },
  {
    id: 'c-2',
    role: 'In-charge Librarian',
    name: 'Shri G. M. Narlawar',
    designation: 'Central Library Administration',
    phone: '+91 91562 08601',
    email: 'librarian@sggs.ac.in',
  },
  {
    id: 'c-3',
    role: 'Circulation & Reference Desk',
    name: 'Library Help Desk',
    designation: 'Book Issue, Return & Digital ID Queries',
    phone: '02462-269141 (Ext. 141)',
    email: 'librarian@sggs.ac.in',
  },
];

export default function ManageContacts() {
  const { site, setSite, saveContent, contentSaving } = useLibrary();

  const contacts = site?.contacts?.length ? site.contacts : initialDefaultContacts;

  const [form, setForm] = useState({
    role: '',
    name: '',
    designation: '',
    phone: '',
    email: '',
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.role.trim()) return;

    const newContact = {
      ...form,
      id: `contact-${Date.now()}`,
    };

    const updatedSite = {
      ...site,
      contacts: [...contacts, newContact],
    };

    setSite(updatedSite);
    await saveContent({ site: updatedSite });
    setForm({ role: '', name: '', designation: '', phone: '', email: '' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to remove this contact?')) return;

    const updatedContacts = contacts.filter((c) => c.id !== id);
    const updatedSite = {
      ...site,
      contacts: updatedContacts,
    };

    setSite(updatedSite);
    await saveContent({ site: updatedSite });
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1000px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <PhoneCall size={26} /> Manage Key Contacts & Desks
        </h1>
        <p style={{ color: '#666', marginTop: '6px' }}>
          Add or remove contact cards displayed on the public Contact Us page.
        </p>
      </div>

      {/* Add Contact Card */}
      <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px', marginBottom: '32px' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '1.15rem' }}>Add New Contact</h3>
        <form onSubmit={handleAdd} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
          <input
            type="text"
            name="role"
            placeholder="Role / Title (e.g. In-charge Librarian)"
            value={form.role}
            onChange={handleChange}
            required
            style={{ padding: '8px 12px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          <input
            type="text"
            name="name"
            placeholder="Name (e.g. Dr. John Doe)"
            value={form.name}
            onChange={handleChange}
            required
            style={{ padding: '8px 12px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          <input
            type="text"
            name="designation"
            placeholder="Department / Designation"
            value={form.designation}
            onChange={handleChange}
            style={{ padding: '8px 12px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone / Extension"
            value={form.phone}
            onChange={handleChange}
            style={{ padding: '8px 12px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          <input
            type="email"
            name="email"
            placeholder="Official Email"
            value={form.email}
            onChange={handleChange}
            style={{ padding: '8px 12px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          <button
            type="submit"
            disabled={contentSaving}
            style={{
              padding: '8px 16px',
              backgroundColor: '#0056b3',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
            }}
          >
            <Plus size={16} /> {contentSaving ? 'Saving…' : 'Add Contact'}
          </button>
        </form>
      </div>

      {/* Current Contacts Table */}
      <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '1.15rem' }}>Active Contacts ({contacts.length})</h3>
        {contacts.length === 0 ? (
          <p style={{ color: '#888' }}>No contacts found. Add one above.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                <th style={{ padding: '10px' }}>Role</th>
                <th style={{ padding: '10px' }}>Name</th>
                <th style={{ padding: '10px' }}>Designation</th>
                <th style={{ padding: '10px' }}>Phone</th>
                <th style={{ padding: '10px' }}>Email</th>
                <th style={{ padding: '10px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '10px', fontWeight: 600 }}>{contact.role}</td>
                  <td style={{ padding: '10px' }}>{contact.name}</td>
                  <td style={{ padding: '10px', color: '#555' }}>{contact.designation || '—'}</td>
                  <td style={{ padding: '10px' }}>{contact.phone || '—'}</td>
                  <td style={{ padding: '10px' }}>{contact.email || '—'}</td>
                  <td style={{ padding: '10px', textAlign: 'right' }}>
                    <button
                      type="button"
                      onClick={() => handleDelete(contact.id)}
                      disabled={contentSaving}
                      style={{
                        background: '#fee2e2',
                        color: '#dc2626',
                        border: 'none',
                        padding: '6px 10px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <Trash2 size={14} /> Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}