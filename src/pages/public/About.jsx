import React from 'react';
import { 
  Building2, 
  BookOpen, 
  LibraryBig, 
  Clock, 
  GraduationCap, 
  Users, 
  Layers, 
  Globe2, 
  Award, 
  CheckCircle2, 
  ExternalLink 
} from 'lucide-react';
import { useLibrary } from '../../context/LibraryContext';
import { PageHero, SectionTitle } from '../../components/site';

export default function About() {
  const { site } = useLibrary();

  // Official collection stats from SGGS Central Library
  const libraryStats = [
    { label: 'Total Volumes', value: '75,770' },
    { label: 'Unique Titles', value: '23,438' },
    { label: 'Bound Journal Volumes', value: '3,959' },
    { label: 'Reading Hall Capacity', value: '250 Seats' },
  ];

  // Specific features & student initiatives
  const features = [
    {
      icon: <Building2 size={24} />,
      title: 'Independent 2-Story Block',
      text: 'Housed in a standalone 1,126.66 sq. m. two-storied building surrounded by green lawns, dedicated entirely to study and research.',
    },
    {
      icon: <Globe2 size={24} />,
      title: 'KOHA & Web OPAC Automation',
      text: 'Fully computerized operations with KOHA Integrated Library System, barcode-driven circulation, and campus-wide intranet OPAC lookup.',
    },
    {
      icon: <Layers size={24} />,
      title: 'SC / ST Book Bank Scheme',
      text: 'Specialized book bank facilities allocating full semester textbook bundles to eligible students for uninterrupted home study.',
    },
    {
      icon: <Award size={24} />,
      title: 'Competitive Exam Cell',
      text: 'Special section equipped with standard reference guides for GATE, UPSC, MPSC, CAT, GRE, and PSU entrance tests.',
    },
    {
      icon: <Users size={24} />,
      title: 'Earn & Learn Scheme',
      text: 'Encourages student self-reliance by offering paid library support duties to students from economically weaker backgrounds.',
    },
    {
      icon: <BookOpen size={24} />,
      title: 'Literature & Wellness Wing',
      text: 'Extensive enrichment section featuring classic and contemporary Marathi literature, personal development, and sports/yoga treatises.',
    },
  ];

  // Major e-journal & e-book consortium packages
  const eResourcePackages = [
    { name: 'IEEE IEL Online', count: '464 E-Journals' },
    { name: 'Springer Link', count: '586 Journals + 2,080 E-Books' },
    { name: 'ScienceDirect (Elsevier)', count: '252 Core Subscriptions' },
    { name: 'IEEE Wiley E-Books', count: '550 Titles' },
    { name: 'DELNET & N-LIST', count: 'National Consortium Interlending' },
    { name: 'ASCE & ASME', count: '52 Specialized Civil/Mech Journals' },
  ];

  return (
    <>
   <PageHero
        eyebrow="ABOUT THE LIBRARY"
        title={
          site?.aboutTitle ||
          'Knowledge Center of SGGSIE&T'
        }
        text={
          site?.aboutDescription ||
          site?.about ||
          'Established in 1981, the Central Library supports engineering discovery, research innovation, and academic scholarship across Nanded.'
        }
        image="/images/library-building.webp"
      />

      <section className="container section">
        {/* Key Official Statistics */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            marginBottom: '48px',
          }}
        >
          {libraryStats.map((stat, idx) => (
            <div key={idx} className="contact-card" style={{ textAlign: 'center', padding: '24px 16px' }}>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: '#0056b3' }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '0.9rem', color: '#555', marginTop: '4px' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Purpose, History & Mission */}
        <div className="about-grid" style={{ marginBottom: '56px' }}>
          <div>
            <span className="eyebrow">OUR HERITAGE</span>
            <h2>Serving Engineers & Researchers Since 1981</h2>
            <p style={{ marginTop: '12px', lineHeight: 1.7, color: '#444' }}>
              Situated in an independent, spacious two-storied building encompassing <strong>1,126.66 sq. m.</strong>, 
              the Central Library serves over 3,300 registered students, faculty, and research scholars. 
              The reading hall accommodates up to 250 students with quiet study zones and extended access during examinations.
            </p>
              <blockquote
                style={{
                  marginTop: '16px',
                  padding: '12px 16px',
                  borderLeft: '4px solid #0056b3',
                  background: '#f8fafc',
                  color: '#333',
                  fontStyle: 'italic',
                }}
              >
                {site?.aboutVision ||
                  'To facilitate the creation of new knowledge through the acquisition, organization, and dissemination of knowledge resources and providing value-added services.'}
              </blockquote>
              {site?.aboutMission && (
  <div style={{ marginTop: '20px' }}>
    <span className="eyebrow">OUR MISSION</span>

    <p
      style={{
        marginTop: '10px',
        lineHeight: 1.7,
        color: '#444'
      }}
    >
      {site.aboutMission}
    </p>
  </div>
)}
          </div>

          <div className="about-cards">
            <div>
              <BookOpen />
              <b>75,770+ Volumes</b>
              <span>Massive repository of technical textbooks, handbooks, and references.</span>
            </div>
            <div>
              <GraduationCap />
              <b>Academic Schemes</b>
              <span>Book banks, competitive test archives, and Earn & Learn opportunities.</span>
            </div>
            <div>
              <LibraryBig />
              <b>Digital Network</b>
              <span>Direct consortium access to IEEE, Elsevier, Springer, and DELNET.</span>
            </div>
          </div>
        </div>

        {/* Timings Card */}
        <div 
          className="contact-card" 
          style={{ 
            textAlign: 'left', 
            marginBottom: '56px', 
            padding: '24px 32px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '24px'
          }}
        >
          <div>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
              <Clock size={22} color="#0056b3" /> Working Hours & Desk Timings
            </h3>
            <p style={{ margin: '6px 0 0 0', color: '#555', fontSize: '0.95rem' }}>
              Standard operational schedule during regular teaching semesters
            </p>
          </div>
          <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
            <div>
              <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: '#666', fontWeight: 600 }}>
                Circulation Desk
              </span>
              <p style={{ margin: '4px 0 0 0', fontWeight: 600 }}>09:30 AM – 06:00 PM</p>
            </div>
            <div>
              <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: '#666', fontWeight: 600 }}>
                Reading Hall
              </span>
              <p style={{ margin: '4px 0 0 0', fontWeight: 600 }}>09:30 AM – 10:00 PM</p>
            </div>
          </div>
        </div>

        {/* Core Facilities & Schemes */}
        <SectionTitle
          eyebrow="FACILITIES & SERVICES"
          title="Designed for Student Success"
          text="Explore specialized departments, student welfare funds, and round-the-clock learning facilities."
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
            margin: '32px 0 56px 0',
          }}
        >
          {features.map((item, idx) => (
            <div key={idx} className="contact-card" style={{ textAlign: 'left' }}>
              <div style={{ color: '#0056b3', marginBottom: '12px' }}>{item.icon}</div>
              <h3 style={{ fontSize: '1.15rem', margin: '0 0 8px 0' }}>{item.title}</h3>
              <p style={{ fontSize: '0.9rem', color: '#555', lineHeight: 1.6, margin: 0 }}>
                {item.text}
              </p>
            </div>
          ))}
        </div>

        {/* Subscribed E-Resources */}
        <div className="contact-card" style={{ textAlign: 'left', padding: '32px', marginBottom: '40px' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>
            Major Subscribed Consortiums & E-Databases
          </h3>
          <p style={{ color: '#555', fontSize: '0.95rem', marginBottom: '20px' }}>
            IP-authenticated across the campus network and accessible via institutional logins.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '14px',
            }}
          >
            {eResourcePackages.map((pkg, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: '#f8fafc',
                  padding: '12px 16px',
                  borderRadius: '6px',
                  border: '1px solid #e2e8f0',
                }}
              >
                <CheckCircle2 size={18} color="#0056b3" style={{ flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{pkg.name}</div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>{pkg.count}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}