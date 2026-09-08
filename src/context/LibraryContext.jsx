import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { defaultAnnouncements, defaultBooks, defaultPapers, defaultResources, defaultPublications, defaultSite, departments, years, semesters } from '../data/defaultData';

const Ctx = createContext(null);
const clone = value => JSON.parse(JSON.stringify(value));
function load(key, fallback) { try { const stored = localStorage.getItem(key); return stored ? JSON.parse(stored) : clone(fallback); } catch { return clone(fallback); } }

export function LibraryProvider({ children }) {
  const [books, setBooks] = useState(() => load('sggs_books', defaultBooks));
  const [departmentsData, setDepartmentsData] = useState(() => load('sggs_departments', departments));
  const [resources, setResources] = useState(() => load('sggs_resources', defaultResources));
  const [papers, setPapers] = useState(() => load('sggs_papers', defaultPapers));
  const [announcements, setAnnouncements] = useState(() => load('sggs_announcements', defaultAnnouncements));
  const [publications, setPublications] = useState(() => load('sggs_publications', defaultPublications));
  const [site, setSite] = useState(() => load('sggs_site', defaultSite));
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('sggs_theme') || 'light');
  const [toast, setToast] = useState('');

  useEffect(() => localStorage.setItem('sggs_books', JSON.stringify(books)), [books]);
  useEffect(() => localStorage.setItem('sggs_departments', JSON.stringify(departmentsData)), [departmentsData]);
  useEffect(() => localStorage.setItem('sggs_resources', JSON.stringify(resources)), [resources]);
  useEffect(() => localStorage.setItem('sggs_papers', JSON.stringify(papers)), [papers]);
  useEffect(() => localStorage.setItem('sggs_announcements', JSON.stringify(announcements)), [announcements]);
  useEffect(() => localStorage.setItem('sggs_publications', JSON.stringify(publications)), [publications]);
  useEffect(() => localStorage.setItem('sggs_site', JSON.stringify(site)), [site]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('sggs_theme', theme);
  }, [theme]);

  useEffect(() => {
    let active = true;
    fetch('/api/auth/session', { credentials: 'include' })
      .then(response => response.ok ? response.json() : { authenticated: false })
      .then(data => { if (active) setUser(data.user || null); })
      .catch(() => {
        if (active) setUser(null);
      })
      .finally(() => { if (active) setAuthReady(true); });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(() => setToast(''), 2800);
    return () => clearTimeout(timer);
  }, [toast]);

  const login = async (email, password) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || 'Invalid administrator credentials');
    setUser(data.user);
    return data.user;
  };

  const logout = async () => {
    try { await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' }); } catch { }
    setUser(null);
  };

  const resetDemo = () => {
    setBooks(clone(defaultBooks)); setDepartmentsData(clone(departments)); setResources(clone(defaultResources));
    setPapers(clone(defaultPapers)); setAnnouncements(clone(defaultAnnouncements)); setPublications(clone(defaultPublications)); setSite(clone(defaultSite));
    setToast('Demo content restored');
  };

  const value = useMemo(() => ({ books, setBooks, departments: departmentsData, setDepartments: setDepartmentsData, resources, setResources, papers, setPapers, announcements, setAnnouncements, publications, setPublications, site, setSite, user, authReady, login, logout, theme, setTheme, toast, setToast, resetDemo, years, semesters }), [books, departmentsData, resources, papers, announcements, publications, site, user, authReady, theme, toast]);
  return <Ctx.Provider value={value}>{children}{toast && <div className="toast">✓ {toast}</div>}</Ctx.Provider>;
}
export const useLibrary = () => useContext(Ctx);
