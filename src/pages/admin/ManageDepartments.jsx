import React, { useState } from 'react';
import { Plus, Trash2, Image } from 'lucide-react';
import { useLibrary } from '../../context/LibraryContext';
import { ManagerForm, Field, AdminPage } from '../../components/admin';

export default function ManageDepartments() {
  const { departments, setDepartments, setToast } = useLibrary();
  const [form, setForm] = useState({ name:'', short:'', description:'', image:'/images/campus.webp' });
  const update = (field, value) => setForm(current => ({ ...current, [field]: value }));
  const reset = () => setForm({ name:'', short:'', description:'', image:'/images/campus.webp' });
  const add = event => {
    event.preventDefault();
    if (!form.name.trim()) { setToast('Department name is required'); return; }
    const slug = form.name.toLowerCase().trim().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
    if (departments.some(d => d.slug === slug)) { setToast('Department already exists'); return; }
    setDepartments(current => [...current, { ...form, name:form.name.trim(), short:form.short.trim(), description:form.description.trim(), image:form.image.trim(), slug }]);
    reset(); setToast('Department added successfully');
  };
  const remove = slug => { setDepartments(current => current.filter(d => d.slug !== slug)); setToast('Department removed'); };
  return <AdminPage eyebrow="ACADEMIC DIRECTORY" title="Department Directory">
    <ManagerForm title="Add Department" onSubmit={add}>
      <div className="form-two"><Field label="Department Name"><input required value={form.name} placeholder="Computer Science and Engineering" onChange={e => update('name',e.target.value)}/></Field><Field label="Short Code"><input value={form.short} placeholder="CSE" onChange={e => update('short',e.target.value)}/></Field></div>
      <Field label="Description"><textarea rows="4" value={form.description} placeholder="Enter department description..." onChange={e => update('description',e.target.value)}/></Field>
      <Field label="Department Image Path"><input value={form.image} placeholder="/images/departments/cse.webp" onChange={e => update('image',e.target.value)}/></Field>
      <button type="submit" className="primary-btn full"><Plus size={18}/> Add Department</button>
    </ManagerForm>
    <section className="admin-directory">{departments.length === 0 ? <div className="portal-panel empty-state"><h3>No departments found</h3><p>Add your first academic department using the form above.</p></div> : departments.map(d => <div className="department-admin-row" key={d.slug}><div className="dept-icon">{(d.short || d.name).slice(0,2).toUpperCase()}</div><div className="department-admin-info"><b>{d.name}</b><span>{d.short || 'No code'}{d.description ? ` • ${d.description}` : ''}</span></div><button type="button" className="danger" title={`Remove ${d.name}`} onClick={() => remove(d.slug)}><Trash2 size={15}/></button></div>)}</section>
    <div className="portal-panel note"><Image size={20}/><div><h3>Department Media</h3><p>Keep department images inside <code>public/images/departments/</code> and save their public paths in the department content.</p></div></div>
  </AdminPage>;
}
