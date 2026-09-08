import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, LockKeyhole, Mail, ShieldCheck, AlertCircle } from 'lucide-react';
import { useLibrary } from '../context/LibraryContext';

export default function Auth() {
  const [email,setEmail]=useState('library@sggs.ac.in');
  const [password,setPassword]=useState('');
  const [error,setError]=useState('');
  const [busy,setBusy]=useState(false);
  const {login}=useLibrary(); const navigate=useNavigate(); const location=useLocation();
  const submit=async e=>{e.preventDefault();setError('');setBusy(true);try{await login(email.trim(),password);navigate(location.state?.from?.pathname||'/admin',{replace:true});}catch(err){setError(err.message)}finally{setBusy(false)}};
  return <section className="auth-page"><div className="auth-card"><div className="auth-icon"><ShieldCheck/></div><span className="eyebrow">RESTRICTED ACCESS</span><h1>Library Admin Console</h1><p>Sign in to manage the Central Library website, academic resources and announcements.</p><form onSubmit={submit}><label><span><Mail size={16}/> Administrator email</span><input type="email" autoComplete="username" value={email} onChange={e=>setEmail(e.target.value)} required/></label><label><span><LockKeyhole size={16}/> Password</span><input type="password" autoComplete="current-password" value={password} onChange={e=>setPassword(e.target.value)} required/></label>{error&&<div className="auth-error"><AlertCircle size={17}/>{error}</div>}<button className="primary-btn full" type="submit" disabled={busy}>{busy?'Signing in…':'Sign in to Admin'}{!busy&&<ArrowRight size={17}/>}</button></form><small className="auth-note">Authorized library administration only.</small></div></section>;
}
