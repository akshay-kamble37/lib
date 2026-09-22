import React, { useState } from 'react';
import { Info, Save, Plus, Trash2 } from 'lucide-react';
import { useLibrary } from '../../context/LibraryContext';

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
  });

  const [stats, setStats] = useState(currentAbout.stats?.length ? currentAbout.stats : initialStats);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedAboutData = {
      ...formData,
      stats,
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
            <h3 style={{ margin: 0, fontSize: '1.15rem' }}>Library Key Statistics</h3>
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
                cursor: 'pointer'
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