import React from 'react';
import {
  MapPin,
  Phone,
  Mail,
  UserCheck,
  Clock,
} from 'lucide-react';
import { useLibrary } from '../../context/LibraryContext';
import { PageHero } from '../../components/site';

export default function Contact() {
  const { site } = useLibrary();

  const contacts = Array.isArray(site?.contacts)
    ? site.contacts
    : [];

  const generalContacts = [
    {
      icon: <MapPin className="contact-icon" />,
      title: 'Visit Us',
      content:
        site?.address ||
        'Address not available',
    },
    {
      icon: <Phone className="contact-icon" />,
      title: 'Call Desk',
      link: site?.contactPhone
        ? `tel:${site.contactPhone.replace(
            /[^\d+]/g,
            ''
          )}`
        : null,
      displayText:
        site?.contactPhone ||
        'Phone number not available',
    },
    {
      icon: <Mail className="contact-icon" />,
      title: 'Official Email',
      link: site?.contactEmail
        ? `mailto:${site.contactEmail}`
        : null,
      displayText:
        site?.contactEmail ||
        'Email not available',
    },
  ];

  return (
    <>
      <PageHero
        eyebrow="CONTACT"
        title="Connect with the Central Library"
        text="Reach the library team for book reservations, e-resource access, and general inquiries."
        image="/images/circulation.jpg"
      />

      <section className="container section">

        {/* =========================
            GENERAL CONTACT
        ========================== */}

        <div className="contact-grid">
          {generalContacts.map((item, index) => (
            <div
              className="contact-card"
              key={index}
            >
              {item.icon}

              <h3>{item.title}</h3>

              {item.link ? (
                <p>
                  <a href={item.link}>
                    {item.displayText}
                  </a>
                </p>
              ) : (
                <p>{item.displayText}</p>
              )}
            </div>
          ))}
        </div>


        {/* =========================
            CONTACT PERSONS
        ========================== */}

        <div style={{ marginTop: '48px' }}>
          <h2
            style={{
              marginBottom: '24px',
              fontSize: '1.5rem',
              fontWeight: 600,
            }}
          >
            Key Contacts & Desks
          </h2>

          {contacts.length > 0 ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns:
                  'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '20px',
              }}
            >
              {contacts.map(contact => (
                <div
                  className="contact-card"
                  key={contact.id}
                  style={{
                    textAlign: 'left',
                  }}
                >
                  {/* Role */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '12px',
                    }}
                  >
                    <UserCheck size={20} />

                    <span
                      style={{
                        fontSize: '0.85rem',
                        textTransform:
                          'uppercase',
                        letterSpacing:
                          '0.05em',
                        color: '#666',
                      }}
                    >
                      {contact.role}
                    </span>
                  </div>

                  {/* Name */}
                  <h3
                    style={{
                      margin:
                        '0 0 4px 0',
                    }}
                  >
                    {contact.name}
                  </h3>

                  {/* Designation */}
                  {contact.designation && (
                    <p
                      style={{
                        margin:
                          '0 0 12px 0',
                        fontSize:
                          '0.9rem',
                        color: '#555',
                      }}
                    >
                      {contact.designation}
                    </p>
                  )}

                  {/* Phone numbers */}
                  {(contact.phone1 ||
                    contact.phone2) && (
                    <div
                      style={{
                        marginBottom: '8px',
                      }}
                    >
                      {contact.phone1 && (
                        <div>
                          <a
                            href={`tel:${contact.phone1.replace(
                              /[^\d+]/g,
                              ''
                            )}`}
                            style={{
                              textDecoration:
                                'none',
                              color:
                                '#0056b3',
                            }}
                          >
                            📞{' '}
                            {contact.phone1}
                          </a>
                        </div>
                      )}

                      {contact.phone2 && (
                        <div>
                          <a
                            href={`tel:${contact.phone2.replace(
                              /[^\d+]/g,
                              ''
                            )}`}
                            style={{
                              textDecoration:
                                'none',
                              color:
                                '#0056b3',
                            }}
                          >
                            📞{' '}
                            {contact.phone2}
                          </a>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Email */}
                  {contact.email && (
                    <div>
                      <a
                        href={`mailto:${contact.email}`}
                        style={{
                          textDecoration:
                            'none',
                          color:
                            '#0056b3',
                        }}
                      >
                        ✉️{' '}
                        {contact.email}
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div
              className="contact-card"
              style={{
                textAlign: 'center',
                padding: '40px 25px',
              }}
            >
              <UserCheck
                size={32}
                style={{
                  marginBottom: '10px',
                }}
              />

              <h3>
                Library contact information
              </h3>

              <p>
                Contact persons will be listed
                here once they are added by the
                library administrator.
              </p>
            </div>
          )}
        </div>


        {/* =========================
            WORKING HOURS
        ========================== */}

        <div
          className="contact-card"
          style={{
            marginTop: '48px',
            textAlign: 'left',
            padding: '24px 32px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent:
              'space-between',
            alignItems: 'center',
            gap: '24px',
          }}
        >
          <div>
            <h3
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                margin: 0,
              }}
            >
              <Clock size={22} />

              Working Hours & Desk Timings
            </h3>

            <p
              style={{
                margin:
                  '6px 0 0 0',
                color: '#555',
                fontSize: '0.95rem',
              }}
            >
              Standard operational schedule
              during regular teaching semesters.
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              gap: '32px',
              flexWrap: 'wrap',
            }}
          >
            <div>
              <span
                style={{
                  fontSize: '0.85rem',
                  textTransform:
                    'uppercase',
                  color: '#666',
                  fontWeight: 600,
                }}
              >
                Circulation Desk
              </span>

              <p
                style={{
                  margin:
                    '4px 0 0 0',
                  fontWeight: 600,
                }}
              >
                09:30 AM – 06:00 PM
              </p>
            </div>

            <div>
              <span
                style={{
                  fontSize: '0.85rem',
                  textTransform:
                    'uppercase',
                  color: '#666',
                  fontWeight: 600,
                }}
              >
                Reading Hall
              </span>

              <p
                style={{
                  margin:
                    '4px 0 0 0',
                  fontWeight: 600,
                }}
              >
                09:30 AM – 10:00 PM
              </p>
            </div>
          </div>
        </div>

      </section>
    </>
  );
}