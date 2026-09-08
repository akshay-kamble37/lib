import React from 'react';
import { RotateCcw, Settings2 } from 'lucide-react';
import { useLibrary } from '../../context/LibraryContext';
import { AdminPage, Stat, Step } from '../../components/admin';

export default function AdminOverview() {
  const { books, resources, papers, announcements, publications, departments, resetDemo } = useLibrary();
  return <AdminPage eyebrow="ADMINISTRATION" title="Library content dashboard" action={<button className="outline-btn" onClick={resetDemo}><RotateCcw size={15}/> Restore demo content</button>}>
    <div className="stat-grid">
      <Stat value={books.length} label="Catalogue records"/><Stat value={resources.length} label="Digital resources"/><Stat value={papers.length} label="Question papers"/><Stat value={publications.length} label="Publications"/><Stat value={announcements.length} label="Announcements"/><Stat value={departments.length} label="Departments"/>
    </div>
    <div className="admin-overview-grid">
      <div className="portal-panel"><span className="eyebrow">CONTENT WORKFLOW</span><h2>Everything important is editable.</h2><div className="workflow"><Step n="01" t="Homepage messaging & media"/><Step n="02" t="Academic directory"/><Step n="03" t="Question paper archive"/><Step n="04" t="Faculty publications"/><Step n="05" t="Announcements"/></div></div>
      <div className="portal-panel accent-panel"><Settings2 size={24}/><span className="eyebrow">SECURE CONTENT MANAGEMENT</span><h2>Manage the public library portal from one place.</h2><p>Use the admin console to update homepage content, academic resources and announcements. Administrator access is protected by a secure session.</p></div>
    </div>
  </AdminPage>;
}
