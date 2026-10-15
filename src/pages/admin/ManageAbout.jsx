// import React, { useState } from 'react';
// import { Info, Save, Plus, Trash2 } from 'lucide-react';
// import { useLibrary } from '../../context/LibraryContext';

// const initialStats = [
//   { label: 'Total Volumes', value: '75,770' },
//   { label: 'Unique Titles', value: '23,438' },
//   { label: 'Bound Journal Volumes', value: '3,959' },
//   { label: 'Reading Hall Capacity', value: '250 Seats' },
// ];

// export default function ManageAbout() {
//   const { site, setSite, saveContent, contentSaving } = useLibrary();

//   const currentAbout = site?.aboutData || {};

//   const [formData, setFormData] = useState({
//     title: currentAbout.title || site?.aboutTitle || 'Knowledge Center of SGGSIE&T',
//     description:
//       currentAbout.description ||
//       site?.aboutDescription ||
//       site?.about ||
//       'Established in 1981, the Central Library supports engineering discovery, research innovation, and academic scholarship across Nanded.',
//     heritageHeading: currentAbout.heritageHeading || 'Serving Engineers & Researchers Since 1981',
//     heritageText:
//       currentAbout.heritageText ||
//       'Situated in an independent, spacious two-storied building encompassing 1,126.66 sq. m., the Central Library serves over 3,300 registered students, faculty, and research scholars. The reading hall accommodates up to 250 students with quiet study zones and extended access during examinations.',
//     vision:
//       currentAbout.vision ||
//       site?.aboutVision ||
//       'To facilitate the creation of new knowledge through the acquisition, organization, and dissemination of knowledge resources and providing value-added services.',
//     mission: currentAbout.mission || site?.aboutMission || '',
//     circulationHours: currentAbout.circulationHours || '09:30 AM – 06:00 PM',
//     readingHallHours: currentAbout.readingHallHours || '09:30 AM – 10:00 PM',
//     volumeCardText: currentAbout.volumeCardText || 'Massive repository of technical textbooks, handbooks, and references.',
//   });

//   const [stats, setStats] = useState(currentAbout.stats?.length ? currentAbout.stats : initialStats);

//   const handleStatChange = (index, field, value) => {
//     const updated = [...stats];
//     updated[index][field] = value;
//     setStats(updated);
//   };

//   const addStat = () => {
//     setStats([...stats, { label: 'New Metric', value: '0' }]);
//   };

//   const removeStat = (index) => {
//     setStats(stats.filter((_, i) => i !== index));
//   };

//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const updatedAboutData = {
//       ...formData,
//       stats,
//     };

//     const updatedSite = {
//       ...site,
//       aboutTitle: formData.title,
//       aboutDescription: formData.description,
//       aboutVision: formData.vision,
//       aboutMission: formData.mission,
//       aboutData: updatedAboutData,
//     };

//     setSite(updatedSite);
//     await saveContent({ site: updatedSite });
//   };

//   return (
//     <div style={{ padding: '24px', maxWidth: '1000px' }}>
//       <div style={{ marginBottom: '24px' }}>
//         <h1 style={{ fontSize: '1.75rem', fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
//           <Info size={26} /> Manage About Us
//         </h1>
//         <p style={{ color: '#666', marginTop: '6px' }}>
//           Update general library history, statistics, timings, vision, and mission.
//         </p>
//       </div>

//       <form onSubmit={handleSubmit}>
//         {/* Main Hero & Description */}
//         <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px', marginBottom: '24px' }}>
//           <h3 style={{ margin: '0 0 16px 0', fontSize: '1.15rem' }}>Hero Banner & Overview</h3>
//           <div style={{ display: 'grid', gap: '14px' }}>
//             <div>
//               <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '4px' }}>Banner Title</label>
//               <input
//                 type="text"
//                 name="title"
//                 value={formData.title}
//                 onChange={handleChange}
//                 style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: '4px' }}
//                 required
//               />
//             </div>
//             <div>
//               <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '4px' }}>Subtitle / Summary</label>
//               <textarea
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 rows={2}
//                 style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: '4px' }}
//                 required
//               />
//             </div>
//           </div>
//         </div>

//         {/* Statistics Editor */}
//         <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px', marginBottom: '24px' }}>
//           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
//             <div>
//               <h3 style={{ margin: 0, fontSize: '1.15rem' }}>Library Key Statistics</h3>
//               <small style={{ color: '#64748b' }}>The "Total Volumes" value will automatically sync to the About highlight card.</small>
//             </div>
//             <button
//               type="button"
//               onClick={addStat}
//               style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '4px',
//                 padding: '6px 12px',
//                 background: '#f1f5f9',
//                 border: '1px solid #cbd5e1',
//                 borderRadius: '4px',
//                 cursor: 'pointer',
//               }}
//             >
//               <Plus size={16} /> Add Stat
//             </button>
//           </div>

//           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
//             {stats.map((stat, idx) => (
//               <div key={idx} style={{ border: '1px solid #e2e8f0', padding: '12px', borderRadius: '6px', background: '#f8fafc' }}>
//                 <input
//                   type="text"
//                   placeholder="Metric Value (e.g. 75,770)"
//                   value={stat.value}
//                   onChange={(e) => handleStatChange(idx, 'value', e.target.value)}
//                   style={{ width: '100%', padding: '6px 8px', marginBottom: '8px', border: '1px solid #ccc', borderRadius: '4px', fontWeight: 700 }}
//                   required
//                 />
//                 <input
//                   type="text"
//                   placeholder="Label (e.g. Total Volumes)"
//                   value={stat.label}
//                   onChange={(e) => handleStatChange(idx, 'label', e.target.value)}
//                   style={{ width: '100%', padding: '6px 8px', marginBottom: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={() => removeStat(idx)}
//                   style={{ background: '#fee2e2', color: '#dc2626', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}
//                 >
//                   <Trash2 size={12} /> Remove
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Heritage & Mission */}
//         <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px', marginBottom: '24px' }}>
//           <h3 style={{ margin: '0 0 16px 0', fontSize: '1.15rem' }}>Heritage, Vision & Mission</h3>
//           <div style={{ display: 'grid', gap: '14px' }}>
//             <div>
//               <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '4px' }}>Heritage Section Heading</label>
//               <input
//                 type="text"
//                 name="heritageHeading"
//                 value={formData.heritageHeading}
//                 onChange={handleChange}
//                 style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: '4px' }}
//               />
//             </div>
//             <div>
//               <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '4px' }}>Heritage Details</label>
//               <textarea
//                 name="heritageText"
//                 value={formData.heritageText}
//                 onChange={handleChange}
//                 rows={3}
//                 style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: '4px' }}
//               />
//             </div>
//             <div>
//               <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '4px' }}>Vision Statement</label>
//               <textarea
//                 name="vision"
//                 value={formData.vision}
//                 onChange={handleChange}
//                 rows={2}
//                 style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: '4px' }}
//               />
//             </div>
//             <div>
//               <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '4px' }}>Mission Statement</label>
//               <textarea
//                 name="mission"
//                 value={formData.mission}
//                 onChange={handleChange}
//                 rows={2}
//                 style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: '4px' }}
//               />
//             </div>
//             <div>
//               <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '4px' }}>Volume Card Description (Side Panel)</label>
//               <input
//                 type="text"
//                 name="volumeCardText"
//                 value={formData.volumeCardText}
//                 onChange={handleChange}
//                 style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: '4px' }}
//               />
//             </div>
//           </div>
//         </div>

//         {/* Timings */}
//         <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px', marginBottom: '24px' }}>
//           <h3 style={{ margin: '0 0 16px 0', fontSize: '1.15rem' }}>Working Hours</h3>
//           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '14px' }}>
//             <div>
//               <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '4px' }}>Circulation Desk Hours</label>
//               <input
//                 type="text"
//                 name="circulationHours"
//                 value={formData.circulationHours}
//                 onChange={handleChange}
//                 style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: '4px' }}
//               />
//             </div>
//             <div>
//               <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '4px' }}>Reading Hall Hours</label>
//               <input
//                 type="text"
//                 name="readingHallHours"
//                 value={formData.readingHallHours}
//                 onChange={handleChange}
//                 style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: '4px' }}
//               />
//             </div>
//           </div>
//         </div>

//         <button
//           type="submit"
//           disabled={contentSaving}
//           style={{
//             padding: '10px 20px',
//             backgroundColor: '#0056b3',
//             color: '#fff',
//             border: 'none',
//             borderRadius: '6px',
//             fontSize: '1rem',
//             fontWeight: 600,
//             cursor: 'pointer',
//             display: 'inline-flex',
//             alignItems: 'center',
//             gap: '8px',
//           }}
//         >
//           <Save size={18} /> {contentSaving ? 'Saving…' : 'Save Changes'}
//         </button>
//       </form>
//     </div>
//   );
// }


import React, { useState } from 'react';
import { Info, Save, Plus, Trash2 } from 'lucide-react';
import { useLibrary } from '../../context/LibraryContext';

const initialFeatures = [
  { icon: 'Building2', title: 'Independent 2-Story Block', text: 'Housed in a standalone 1,126.66 sq. m. two-storied building surrounded by green lawns, dedicated entirely to study and research.' },
  { icon: 'Globe2', title: 'KOHA & Web OPAC Automation', text: 'Fully computerized operations with KOHA Integrated Library System, barcode-driven circulation, and campus-wide intranet OPAC lookup.' },
  { icon: 'Layers', title: 'SC / ST Book Bank Scheme', text: 'Specialized book bank facilities allocating full semester textbook bundles to eligible students for uninterrupted home study.' },
  { icon: 'Award', title: 'Competitive Exam Cell', text: 'Special section equipped with standard reference guides for GATE, UPSC, MPSC, CAT, GRE, and PSU entrance tests.' },
  { icon: 'Users', title: 'Earn & Learn Scheme', text: 'Encourages student self-reliance by offering paid library support duties to students from economically weaker backgrounds.' },
  { icon: 'BookOpen', title: 'Literature & Wellness Wing', text: 'Extensive enrichment section featuring classic and contemporary Marathi literature, personal development, and sports/yoga treatises.' },
];

const initialEResources = [
  { name: 'IEEE IEL Online', count: '464 E-Journals' },
  { name: 'Springer Link', count: '586 Journals + 2,080 E-Books' },
  { name: 'ScienceDirect (Elsevier)', count: '252 Core Subscriptions' },
  { name: 'IEEE Wiley E-Books', count: '550 Titles' },
  { name: 'DELNET & N-LIST', count: 'National Consortium Interlending' },
  { name: 'ASCE & ASME', count: '52 Specialized Civil/Mech Journals' },
];

const initialStats = [
  { label: 'Total Volumes', value: '75,770' },
  { label: 'Unique Titles', value: '23,438' },
  { label: 'Bound Journal Volumes', value: '3,959' },
  { label: 'Reading Hall Capacity', value: '250 Seats' },
];

export default function ManageAbout() {
  const { site, setSite, saveContent, contentSaving } = useLibrary();

  const currentAbout = site?.aboutData || {};

  const [formData, setFormData] = useState({
    title: currentAbout.title || site?.aboutTitle || 'Knowledge Center of SGGSIE&T',
    description:
      currentAbout.description ||
      site?.aboutDescription ||
      site?.about ||
      'Established in 1981, the Central Library supports engineering discovery, research innovation, and academic scholarship across Nanded.',
    heritageHeading: currentAbout.heritageHeading || 'Serving Engineers & Researchers Since 1981',
    heritageText:
      currentAbout.heritageText ||
      'Situated in an independent, spacious two-storied building encompassing 1,126.66 sq. m., the Central Library serves over 3,300 registered students, faculty, and research scholars. The reading hall accommodates up to 250 students with quiet study zones and extended access during examinations.',
    vision:
      currentAbout.vision ||
      site?.aboutVision ||
      'To facilitate the creation of new knowledge through the acquisition, organization, and dissemination of knowledge resources and providing value-added services.',
    mission: currentAbout.mission || site?.aboutMission || '',
    circulationHours: currentAbout.circulationHours || '09:30 AM – 06:00 PM',
    readingHallHours: currentAbout.readingHallHours || '09:30 AM – 10:00 PM',
    volumeCardText: currentAbout.volumeCardText || 'Massive repository of technical textbooks, handbooks, and references.',
  });

  const [stats, setStats] = useState(currentAbout.stats?.length ? currentAbout.stats : initialStats);
  const [features, setFeatures] = useState(
    Array.isArray(currentAbout.features) && currentAbout.features.length ? currentAbout.features : initialFeatures
  );
  const [eResources, setEResources] = useState(
    Array.isArray(currentAbout.eResources) && currentAbout.eResources.length ? currentAbout.eResources : initialEResources
  );
  const [sectionData, setSectionData] = useState({
    facilitiesHeading: currentAbout.facilitiesHeading || 'Designed for Student Success',
    facilitiesDescription: currentAbout.facilitiesDescription || 'Explore specialized departments, student welfare funds, and round-the-clock learning facilities.',
    eResourcesHeading: currentAbout.eResourcesHeading || 'Major Subscribed Consortiums & E-Databases',
    eResourcesDescription: currentAbout.eResourcesDescription || 'IP-authenticated across the campus network and accessible via institutional logins.',
  });

  const handleStatChange = (index, field, value) => {
    const updated = [...stats];
    updated[index][field] = value;
    setStats(updated);
  };

  const addStat = () => {
    setStats([...stats, { label: 'New Metric', value: '0' }]);
  };

  const removeStat = (index) => {
    setStats(stats.filter((_, i) => i !== index));
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const updateItem = (setter, items, index, field, value) => {
    setter(items.map((item, i) => i === index ? { ...item, [field]: value } : item));
  };

  const fieldStyle = { width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' };
  const cardStyle = { background: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px', marginBottom: '24px' };
  const labelStyle = { display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '4px' };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedAboutData = {
      ...formData,
      stats,
      features,
      eResources,
      ...sectionData,
    };

    const updatedSite = {
      ...site,
      aboutTitle: formData.title,
      aboutDescription: formData.description,
      aboutVision: formData.vision,
      aboutMission: formData.mission,
      aboutData: updatedAboutData,
    };

    setSite(updatedSite);
    await saveContent({ site: updatedSite });
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1000px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Info size={26} /> Manage About Us
        </h1>
        <p style={{ color: '#666', marginTop: '6px' }}>
          Update general library history, statistics, timings, vision, and mission.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Main Hero & Description */}
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px', marginBottom: '24px' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '1.15rem' }}>Hero Banner & Overview</h3>
          <div style={{ display: 'grid', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '4px' }}>Banner Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: '4px' }}
                required
              />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '4px' }}>Subtitle / Summary</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={2}
                style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: '4px' }}
                required
              />
            </div>
          </div>
        </div>

        {/* Statistics Editor */}
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.15rem' }}>Library Key Statistics</h3>
              <small style={{ color: '#64748b' }}>The "Total Volumes" value will automatically sync to the About highlight card.</small>
            </div>
            <button
              type="button"
              onClick={addStat}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '6px 12px',
                background: '#f1f5f9',
                border: '1px solid #cbd5e1',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              <Plus size={16} /> Add Stat
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
            {stats.map((stat, idx) => (
              <div key={idx} style={{ border: '1px solid #e2e8f0', padding: '12px', borderRadius: '6px', background: '#f8fafc' }}>
                <input
                  type="text"
                  placeholder="Metric Value (e.g. 75,770)"
                  value={stat.value}
                  onChange={(e) => handleStatChange(idx, 'value', e.target.value)}
                  style={{ width: '100%', padding: '6px 8px', marginBottom: '8px', border: '1px solid #ccc', borderRadius: '4px', fontWeight: 700 }}
                  required
                />
                <input
                  type="text"
                  placeholder="Label (e.g. Total Volumes)"
                  value={stat.label}
                  onChange={(e) => handleStatChange(idx, 'label', e.target.value)}
                  style={{ width: '100%', padding: '6px 8px', marginBottom: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                  required
                />
                <button
                  type="button"
                  onClick={() => removeStat(idx)}
                  style={{ background: '#fee2e2', color: '#dc2626', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <Trash2 size={12} /> Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Heritage & Mission */}
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px', marginBottom: '24px' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '1.15rem' }}>Heritage, Vision & Mission</h3>
          <div style={{ display: 'grid', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '4px' }}>Heritage Section Heading</label>
              <input
                type="text"
                name="heritageHeading"
                value={formData.heritageHeading}
                onChange={handleChange}
                style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: '4px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '4px' }}>Heritage Details</label>
              <textarea
                name="heritageText"
                value={formData.heritageText}
                onChange={handleChange}
                rows={3}
                style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: '4px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '4px' }}>Vision Statement</label>
              <textarea
                name="vision"
                value={formData.vision}
                onChange={handleChange}
                rows={2}
                style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: '4px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '4px' }}>Mission Statement</label>
              <textarea
                name="mission"
                value={formData.mission}
                onChange={handleChange}
                rows={2}
                style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: '4px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '4px' }}>Volume Card Description (Side Panel)</label>
              <input
                type="text"
                name="volumeCardText"
                value={formData.volumeCardText}
                onChange={handleChange}
                style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: '4px' }}
              />
            </div>
          </div>
        </div>

        {/* Timings */}
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px', marginBottom: '24px' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '1.15rem' }}>Working Hours</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '4px' }}>Circulation Desk Hours</label>
              <input
                type="text"
                name="circulationHours"
                value={formData.circulationHours}
                onChange={handleChange}
                style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: '4px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '4px' }}>Reading Hall Hours</label>
              <input
                type="text"
                name="readingHallHours"
                value={formData.readingHallHours}
                onChange={handleChange}
                style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: '4px' }}
              />
            </div>
          </div>
        </div>


        {/* Facilities & Services editor */}
        <section style={cardStyle}>
          <h3>Facilities &amp; Services</h3>
          <label style={labelStyle}>Section heading</label>
          <input style={fieldStyle} value={sectionData.facilitiesHeading} onChange={e => setSectionData(v => ({ ...v, facilitiesHeading: e.target.value }))} required />
          <label style={{ ...labelStyle, marginTop: 12 }}>Section description</label>
          <textarea style={fieldStyle} rows={2} value={sectionData.facilitiesDescription} onChange={e => setSectionData(v => ({ ...v, facilitiesDescription: e.target.value }))} required />
          {features.map((item, index) => (
            <div key={`feature-${index}`} style={{ border: '1px solid #e2e8f0', borderRadius: 6, padding: 12, marginTop: 14, display: 'grid', gap: 8 }}>
              <strong>Facility {index + 1}</strong>
              <label style={labelStyle}>Icon</label>
              <select style={fieldStyle} value={item.icon || 'Building2'} onChange={e => updateItem(setFeatures, features, index, 'icon', e.target.value)}>
                <option value="Building2">Building</option><option value="Globe2">Globe</option><option value="Layers">Layers</option><option value="Award">Award</option><option value="Users">Users</option><option value="BookOpen">Book</option>
              </select>
              <label style={labelStyle}>Title</label>
              <input style={fieldStyle} value={item.title || ''} onChange={e => updateItem(setFeatures, features, index, 'title', e.target.value)} required />
              <label style={labelStyle}>Description</label>
              <textarea style={fieldStyle} rows={3} value={item.text || ''} onChange={e => updateItem(setFeatures, features, index, 'text', e.target.value)} required />
              <button type="button" onClick={() => setFeatures(v => v.filter((_, i) => i !== index))} style={{ justifySelf: 'start', background: '#fee2e2', color: '#dc2626', border: 0, borderRadius: 4, padding: '6px 10px', cursor: 'pointer' }}><Trash2 size={14} /> Remove facility</button>
            </div>
          ))}
          <button type="button" onClick={() => setFeatures(v => [...v, { icon: 'Building2', title: '', text: '' }])} style={{ marginTop: 12, padding: '8px 12px', cursor: 'pointer' }}><Plus size={15} /> Add facility</button>
        </section>

        {/* E-Resources editor */}
        <section style={cardStyle}>
          <h3>Subscribed Consortia &amp; E-Databases</h3>
          <label style={labelStyle}>Section heading</label>
          <input style={fieldStyle} value={sectionData.eResourcesHeading} onChange={e => setSectionData(v => ({ ...v, eResourcesHeading: e.target.value }))} required />
          <label style={{ ...labelStyle, marginTop: 12 }}>Section description</label>
          <textarea style={fieldStyle} rows={2} value={sectionData.eResourcesDescription} onChange={e => setSectionData(v => ({ ...v, eResourcesDescription: e.target.value }))} required />
          {eResources.map((item, index) => (
            <div key={`eresource-${index}`} style={{ border: '1px solid #e2e8f0', borderRadius: 6, padding: 12, marginTop: 14, display: 'grid', gap: 8 }}>
              <strong>Database {index + 1}</strong>
              <label style={labelStyle}>Name</label>
              <input style={fieldStyle} value={item.name || ''} onChange={e => updateItem(setEResources, eResources, index, 'name', e.target.value)} required />
              <label style={labelStyle}>Subscription details</label>
              <input style={fieldStyle} value={item.count || ''} onChange={e => updateItem(setEResources, eResources, index, 'count', e.target.value)} required />
              <button type="button" onClick={() => setEResources(v => v.filter((_, i) => i !== index))} style={{ justifySelf: 'start', background: '#fee2e2', color: '#dc2626', border: 0, borderRadius: 4, padding: '6px 10px', cursor: 'pointer' }}><Trash2 size={14} /> Remove database</button>
            </div>
          ))}
          <button type="button" onClick={() => setEResources(v => [...v, { name: '', count: '' }])} style={{ marginTop: 12, padding: '8px 12px', cursor: 'pointer' }}><Plus size={15} /> Add database</button>
        </section>

        <button
          type="submit"
          disabled={contentSaving}
          style={{
            padding: '10px 20px',
            backgroundColor: '#0056b3',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            fontSize: '1rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <Save size={18} /> {contentSaving ? 'Saving…' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}