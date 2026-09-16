import React from 'react';
import { MapPin, Phone, Mail, UserCheck, Clock } from 'lucide-react';
import { useLibrary } from '../../context/LibraryContext';
import { PageHero } from '../../components/site';

export default function Contact() {
  const { site } = useLibrary();

  // Primary general contact channels
  const generalContacts = [
    {
      icon: <MapPin className="contact-icon" />,
      title: 'Visit Us',
      content: site?.address || 'Central Library, SGGSIE&T Campus, Vishnupuri, Nanded – 431606',
    },
    {
      icon: <Phone className="contact-icon" />,
      title: 'Call Desk',
      link: `tel:${site?.contactPhone || '02462269141'}`,
      displayText: site?.contactPhone || '02462-269141',
    },
    {
      icon: <Mail className="contact-icon" />,
      title: 'Official Email',
      link: `mailto:${site?.contactEmail || 'librarian@sggs.ac.in'}`,
      displayText: site?.contactEmail || 'librarian@sggs.ac.in',
    },
  ];

  // Specific key personnel & desks
  const keyPersonnel = [
   {
  role: 'Faculty In-charge (Library)',
  name: site?.facultyInchargeName || 'Dr. A. B. Gonde',
  designation:
    site?.facultyInchargeDesignation ||
    'Professor & Dean R&D / Library In-charge',
  phones: [
    {
      label: site?.facultyInchargePhone1 || '02462-269219',
      href: `tel:${site?.facultyInchargePhone1 || '02462269219'}`,
    },
    {
      label: site?.facultyInchargePhone2 || '02462-269335',
      href: `tel:${site?.facultyInchargePhone2 || '02462269335'}`,
    },
  ],
  email: site?.contactEmail || 'dean.rd@sggs.ac.in',
},
    {
      role: 'In-charge Librarian',
      name: 'Shri G. M. Narlawar',
      designation: 'Central Library Administration',
      phones: [
        { label: '+91 91562 08601', href: 'tel:+919156208601' },
      ],
      email: 'librarian@sggs.ac.in',
    },
    {
      role: 'Circulation & Reference Desk',
      name: 'Library Help Desk',
      designation: 'Book Issue, Return & Digital ID Queries',
      phones: [
        { label: '02462-269141 (Ext. 141)', href: 'tel:02462269141' },
      ],
      email: 'librarian@sggs.ac.in',
    },
    {
      role: 'Working Hours',
      name: 'Reading Hall & Stack Section',
      designation: 'Monday – Saturday: 08:00 AM – 11:00 PM (Exam periods extended)',
      icon: <Clock size={20} />,
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
        {/* Quick Contact Cards */}
        <div className="contact-grid">
          {generalContacts.map((item, idx) => (
            <div className="contact-card" key={idx}>
              {item.icon}
              <h3>{item.title}</h3>
              {item.link ? (
                <p>
                  <a href={item.link}>{item.displayText}</a>
                </p>
              ) : (
                <p>{item.content}</p>
              )}
            </div>
          ))}
        </div>

        {/* Key Administration & Department Desks */}
        <div style={{ marginTop: '48px' }}>
          <h2 style={{ marginBottom: '24px', fontSize: '1.5rem', fontWeight: 600 }}>
            Key Contacts & Desks
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px',
            }}
          >
            {keyPersonnel.map((person, idx) => (
              <div className="contact-card" key={idx} style={{ textAlign: 'left' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  {person.icon || <UserCheck size={20} />}
                  <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#666' }}>
                    {person.role}
                  </span>
                </div>

                <h3 style={{ margin: '0 0 4px 0' }}>{person.name}</h3>
                <p style={{ margin: '0 0 12px 0', fontSize: '0.9rem', color: '#555' }}>
                  {person.designation}
                </p>

                {person.phones && (
                  <div style={{ marginBottom: '8px' }}>
                    {person.phones.map((phone, pIdx) => (
                      <div key={pIdx}>
                        <a href={phone.href} style={{ textDecoration: 'none', color: '#0056b3' }}>
                          📞 {phone.label}
                        </a>
                      </div>
                    ))}
                  </div>
                )}

                {person.email && (
                  <div>
                    <a href={`mailto:${person.email}`} style={{ textDecoration: 'none', color: '#0056b3' }}>
                      ✉️ {person.email}
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}