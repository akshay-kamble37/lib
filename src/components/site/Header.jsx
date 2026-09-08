import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { BookOpen, Menu, X, Moon, Sun, Search } from 'lucide-react';
import { useLibrary } from '../../context/LibraryContext';

const navItems = [
  ['/', 'Home'],
  ['/catalogue', 'Catalogue'],
  ['/e-resources', 'E-Resources'],
  ['/question-papers', 'Question Papers'],
  ['/departments', 'Departments'],
  ['/publications', 'Publications'],
  ['/announcements', "What's New"]
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { theme, setTheme, site } = useLibrary();

  return (
    <>
      <div className="top-strip">
        <div className="container top-strip-inner">
          <span>Shri Guru Gobind Singhji Institute of Engineering &amp; Technology, Nanded</span>
          <span>Central Library • Vishnupuri, Nanded, Maharashtra</span>
        </div>
      </div>

      <header className="site-header">
        <div className="container nav-shell">
          <Link to="/" className="brand" onClick={() => setOpen(false)}>
            <img src={site?.logo || '/images/sggs-logo.jpeg'} alt="SGGS Institute logo" />
            <span>
              <strong>Shri Guru Gobind Singhji</strong>
              <small>Institute of Engineering &amp; Technology · Nanded</small>
            </span>
          </Link>

          <button className="mobile-toggle" onClick={() => setOpen(value => !value)} aria-label="Toggle navigation">
            {open ? <X /> : <Menu />}
          </button>

          <nav className={open ? 'main-nav open' : 'main-nav'}>
            {navItems.map(([to, label]) => (
              <NavLink key={to} to={to} end={to === '/'} onClick={() => setOpen(false)}>
                {label}
              </NavLink>
            ))}
            <div className="nav-actions">
              <Link className="icon-btn" title="Search catalogue" to="/catalogue" onClick={() => setOpen(false)}><Search /></Link>
              <button className="icon-btn" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} title="Toggle theme">
                {theme === 'dark' ? <Sun /> : <Moon />}
              </button>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
