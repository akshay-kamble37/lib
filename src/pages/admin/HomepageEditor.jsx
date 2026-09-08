import React, { useEffect, useState } from 'react';
import { Save } from 'lucide-react';
import { useLibrary } from '../../context/LibraryContext';
import { AdminPage, Field, MediaPicker } from '../../components/admin';

export default function HomepageEditor() {
  const { site, setSite, setToast } = useLibrary();
  const [draft, setDraft] = useState(site);

  useEffect(() => setDraft(site), [site]);

  const update = (field, value) => setDraft(current => ({ ...current, [field]: value }));
  const save = event => {
    event.preventDefault();
    setSite(draft);
    setToast('Homepage updated successfully');
  };

  return (
    <AdminPage
      eyebrow="HOMEPAGE EDITOR"
      title="Manage homepage"
      description="Update the public library homepage without changing source code."
    >
      <form className="editor-form" onSubmit={save}>
        <div className="form-section-heading">
          <span>01</span>
          <div><h3>Hero content</h3><p>Keep the first screen clear, institutional and welcoming.</p></div>
        </div>
        <Field label="Hero title" required>
          <input value={draft.heroTitle || ''} onChange={e => update('heroTitle', e.target.value)} />
        </Field>
        <Field label="Hero description">
          <textarea rows="4" value={draft.heroSubtitle || ''} onChange={e => update('heroSubtitle', e.target.value)} />
        </Field>

        <div className="form-section-heading">
          <span>02</span>
          <div><h3>Homepage media</h3><p>Select files directly from your computer. The media API stores them in <code>public/uploads</code>.</p></div>
        </div>
        <div className="media-grid">
          <MediaPicker label="Hero image" value={draft.heroImage} onChange={value => update('heroImage', value)} accept="image/png,image/jpeg,image/webp,image/avif" type="image" />
          <MediaPicker label="Library logo" value={draft.logo} onChange={value => update('logo', value)} accept="image/png,image/jpeg,image/webp,image/avif" type="image" />
          <MediaPicker label="Library tour video" value={draft.video} onChange={value => update('video', value)} accept="video/mp4,video/webm,video/ogg" type="video" />
        </div>

        <div className="form-section-heading">
          <span>03</span>
          <div><h3>Library information</h3><p>These details are shown on the public website and footer.</p></div>
        </div>
        <div className="form-two">
          <Field label="Phone"><input value={draft.contactPhone || ''} onChange={e => update('contactPhone', e.target.value)} /></Field>
          <Field label="Email"><input value={draft.contactEmail || ''} onChange={e => update('contactEmail', e.target.value)} /></Field>
        </div>
        <Field label="Address"><textarea rows="3" value={draft.address || ''} onChange={e => update('address', e.target.value)} /></Field>
        <Field label="About library"><textarea rows="4" value={draft.about || ''} onChange={e => update('about', e.target.value)} /></Field>

        <button type="submit" className="primary-btn"><Save size={16} /> Save homepage</button>
      </form>
    </AdminPage>
  );
}
