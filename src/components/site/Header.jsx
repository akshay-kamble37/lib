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
  ['/about', 'About Us'],
  ['/contact', 'Contact Us']
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { theme, setTheme, site } = useLibrary();

  return (
    <>
      <div className="top-strip">
        <div className="container top-strip-inner">
          <span>
            Shri Guru Gobind Singhji Institute of Engineering &amp; Technology, Nanded
          </span>

          <span>
            Central Library • Vishnupuri, Nanded, Maharashtra
          </span>
        </div>
      </div>

      <header className="site-header">
        <div className="container nav-shell">

          <Link
            to="/"
            className="brand"
            onClick={() => setOpen(false)}
          >
            <img
              src="/images/image.webp"
              alt="Shri Guru Gobind Singhji Institute of Engineering and Technology, Nanded"
            />
          </Link>

          <button
            className="mobile-toggle"
            onClick={() => setOpen(value => !value)}
            aria-label="Toggle navigation"
            aria-expanded={open}
          >
            {open ? <X /> : <Menu />}
          </button>

          <nav
            className={open ? 'main-nav open' : 'main-nav'}
          >
            {navItems.map(([to, label]) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                onClick={() => setOpen(false)}
              >
                {label}
              </NavLink>
            ))}

            <div className="nav-actions">
              <Link
                className="icon-btn"
                title="Search catalogue"
                to="/catalogue"
                onClick={() => setOpen(false)}
                aria-label="Search catalogue"
              >
                <Search />
              </Link>

              <button
                className="icon-btn"
                onClick={() =>
                  setTheme(theme === 'dark' ? 'light' : 'dark')
                }
                title="Toggle theme"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun /> : <Moon />}
              </button>
            </div>
          </nav>

        </div>
      </header>
    </>
  );
}