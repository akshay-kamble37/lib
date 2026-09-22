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

  /* =========================================
     GENERAL CONTACT INFORMATION
  ========================================= */
  const generalContacts = [
    {
      icon: <MapPin className="contact-icon" />,
      title: 'Visit Us',
      content:
        site?.address ||
        'Central Library, SGGSIE&T Campus, Vishnupuri, Nanded – 431606',
    },

    {
      icon: <Phone className="contact-icon" />,
      title: 'Call Desk',
      link: `tel:${site?.contactPhone || '02462269141'}`,
      displayText:
        site?.contactPhone ||
        '02462-269141',
    },

    {
      icon: <Mail className="contact-icon" />,
      title: 'Official Email',
      link: `mailto:${site?.contactEmail || 'librarian@sggs.ac.in'}`,
      displayText:
        site?.contactEmail ||
        'librarian@sggs.ac.in',
    },
  ];

  /* =========================================
     DYNAMIC CONTACT PERSONS
  ========================================= */
  const keyPersonnel = Array.isArray(
    site?.contacts
  )
    ? site.contacts
    : [];

  return (
    <>
      <PageHero
        eyebrow="CONTACT"
        title="Connect with the Central Library"
        text="Reach the library team for book reservations, e-resource access, and general inquiries."
        image="/images/circulation.jpg"
      />

      <section className="container section">

        {/* =====================================
            GENERAL CONTACT CARDS
        ===================================== */}
        <div className="contact-grid">

          {generalContacts.map(
            (item, idx) => (
              <div
                className="contact-card"
                key={idx}
              >
                {item.icon}

                <h3>
                  {item.title}
                </h3>

                {item.link ? (
                  <p>
                    <a href={item.link}>
                      {item.displayText}
                    </a>
                  </p>
                ) : (
                  <p>
                    {item.content}
                  </p>
                )}
              </div>
            )
          )}

        </div>


        {/* =====================================
            KEY CONTACTS & DESKS
        ===================================== */}
        <div
          style={{
            marginTop: '48px',
          }}
        >

          <h2
            style={{
              marginBottom: '24px',
              fontSize: '1.5rem',
              fontWeight: 600,
            }}
          >
            Key Contacts & Desks
          </h2>

          {keyPersonnel.length > 0 ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns:
                  'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '20px',
              }}
            >

              {keyPersonnel.map(
                (person) => (
                  <div
                    className="contact-card"
                    key={person.id}
                    style={{
                      textAlign: 'left',
                    }}
                  >

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
                          fontSize:
                            '0.85rem',
                          textTransform:
                            'uppercase',
                          letterSpacing:
                            '0.05em',
                          color: '#666',
                        }}
                      >
                        {person.role}
                      </span>

                    </div>

                    <h3
                      style={{
                        margin:
                          '0 0 4px 0',
                      }}
                    >
                      {person.name}
                    </h3>

                    {person.designation && (
                      <p
                        style={{
                          margin:
                            '0 0 12px 0',
                          fontSize:
                            '0.9rem',
                          color: '#555',
                        }}
                      >
                        {person.designation}
                      </p>
                    )}

                    {(person.phone1 ||
                      person.phone2) && (
                      <div
                        style={{
                          marginBottom:
                            '8px',
                        }}
                      >

                        {person.phone1 && (
                          <div>
                            <a
                              href={`tel:${person.phone1}`}
                              style={{
                                textDecoration:
                                  'none',
                                color:
                                  '#0056b3',
                              }}
                            >
                              📞{' '}
                              {person.phone1}
                            </a>
                          </div>
                        )}

                        {person.phone2 && (
                          <div>
                            <a
                              href={`tel:${person.phone2}`}
                              style={{
                                textDecoration:
                                  'none',
                                color:
                                  '#0056b3',
                              }}
                            >
                              📞{' '}
                              {person.phone2}
                            </a>
                          </div>
                        )}

                      </div>
                    )}

                    {person.email && (
                      <div>
                        <a
                          href={`mailto:${person.email}`}
                          style={{
                            textDecoration:
                              'none',
                            color:
                              '#0056b3',
                          }}
                        >
                          ✉️{' '}
                          {person.email}
                        </a>
                      </div>
                    )}

                  </div>
                )
              )}

            </div>
          ) : (
            <div
              className="contact-card"
              style={{
                textAlign: 'center',
              }}
            >
              <UserCheck
                size={28}
              />

              <h3>
                Contact information
                will be available here.
              </h3>

              <p>
                Library contact persons
                can be added by the
                administrator.
              </p>
            </div>
          )}

        </div>

      </section>
    </>
  );
}