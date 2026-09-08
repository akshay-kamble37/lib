import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  Atom,
  BookMarked,
  BookOpen,
  Building2,
  CircuitBoard,
  Cpu,
  FileText,
  FlaskConical,
  Gauge,
  LibraryBig,
  MapPin,
  PlayCircle,
  Search,
  Settings2,
  Shirt,
  Zap
} from 'lucide-react';
import { useLibrary } from '../../context/LibraryContext';
import { SectionTitle, QuickCard, Empty, Reveal } from '../../components/site';

const deptIcons = {
  electronics: CircuitBoard,
  textile: Shirt,
  civil: Building2,
  electrical: Zap,
  instrumentation: Gauge,
  production: Settings2,
  chemical: FlaskConical,
  mechanical: Settings2,
  'information-technology': Cpu,
  'computer-science': Atom
};

export default function Home() {
  const { site, books, announcements, departments, papers } = useLibrary();
  const [query, setQuery] = useState('');

  const search = () => {
    if (query.trim()) window.location.href = `/catalogue?q=${encodeURIComponent(query)}`;
  };

  return (
    <div className="home-page">
      <section className="hero">
        <img src={site?.heroImage || '/images/library-hero.webp'} alt="Central Library, Shri Guru Gobind Singhji Institute of Engineering & Technology, Nanded" />
        <div className="hero-overlay" />
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />
        <div className="container hero-inner">
          <div className="hero-copy hero-animate">
            <span className="eyebrow light">SHRI GURU GOBIND SINGHJI INSTITUTE OF ENGINEERING &amp; TECHNOLOGY · NANDED</span>
            <h1>{site?.heroTitle || 'Knowledge. Discovery. Innovation.'}</h1>
            <p>{site?.heroSubtitle || 'A modern academic gateway to books, digital resources, examination archives and faculty publications.'}</p>

            <div className="hero-search">
              <Search />
              <input
                value={query}
                onChange={event => setQuery(event.target.value)}
                onKeyDown={event => event.key === 'Enter' && search()}
                placeholder="Search books, question papers, publications..."
              />
              <button onClick={search}>Search</button>
            </div>

            <div className="hero-actions">
              <Link className="primary-btn" to="/catalogue">Explore Library <ArrowRight size={17} /></Link>
              <Link className="ghost-btn" to="/question-papers">Browse Question Papers</Link>
            </div>
          </div>

          <div className="hero-card hero-card-animate">
            <span className="eyebrow light">CENTRAL LIBRARY</span>
            <strong>{books.length > 0 ? '23,438+' : '0'}</strong>
            <p>catalogue titles</p>
            <div className="hero-mini">
              <div><b>10</b><span>Departments</span></div>
              <div><b>8</b><span>Semesters</span></div>
              <div><b>{papers.length}</b><span>Papers</span></div>
            </div>
            <span className="hero-location"><MapPin size={14} /> Vishnupuri, Nanded, Maharashtra</span>
          </div>
        </div>
      </section>

      <Reveal className="container stat-band-wrap">
        <section className="stat-band">
          <div><b>10</b><span>Academic Departments</span></div>
          <div><b>8</b><span>Semesters</span></div>
          <div><b>4</b><span>Academic Years</span></div>
          <div><b>B.Tech + M.Tech</b><span>Question Paper Archive</span></div>
          <div><b>Faculty</b><span>Publications</span></div>
        </section>
      </Reveal>

      <Reveal>
        <section className="container section">
          <SectionTitle
            eyebrow="START HERE"
            title="Everything you need, in one place"
            text="A focused digital gateway for discovery, learning and institutional knowledge."
          />
          <div className="quick-grid stagger-grid">
            <QuickCard to="/catalogue" icon={BookOpen} title="Library Catalogue" text="Discover books and catalogue records." />
            <QuickCard to="/e-resources" icon={LibraryBig} title="E-Resources" text="Access digital learning and research resources." />
            <QuickCard to="/question-papers" icon={FileText} title="Question Papers" text="Browse B.Tech and M.Tech papers." />
            <QuickCard to="/departments" icon={Building2} title="Departments" text="Explore resources by department." />
            <QuickCard to="/publications" icon={BookMarked} title="Faculty Publications" text="Discover books and scholarly works published by institute faculty." />
          </div>
        </section>
      </Reveal>

      <section className="soft-section">
        <Reveal>
          <div className="container section">
            <SectionTitle
              eyebrow="ACADEMIC DIRECTORY"
              title="Explore by department"
              text="Jump directly into your department's academic resources."
              link={{ to: '/departments', label: 'View all departments' }}
            />
            <div className="dept-grid stagger-grid">
              {departments.slice(0, 10).map(department => {
                const Icon = deptIcons[department.slug] || Building2;
                return (
                  <Link className="dept-card" to={`/departments/${department.slug}`} key={department.slug}>
                    <div className="dept-icon"><Icon size={22} strokeWidth={1.7} /></div>
                    <span>{department.short}</span>
                    <h3>{department.name}</h3>
                    <p>{department.description}</p>
                    <ArrowUpRight />
                  </Link>
                );
              })}
            </div>
          </div>
        </Reveal>
      </section>

      <Reveal>
        <section className="container section">
          <div className="video-section">
            <div className="video-copy">
              <span className="eyebrow">INSIDE THE LIBRARY</span>
              <h2>Discover the Central Library learning environment.</h2>
              <p>Take a closer look at the spaces where students read, learn, collaborate and access knowledge.</p>
              <Link className="text-link" to="/about">About the library <ArrowUpRight size={16} /></Link>
            </div>
            <div className="video-wrap">
              <video controls poster={site?.heroImage || '/images/library-hero.webp'} src={site?.video || '/library-tour.mp4'} />
              <div className="video-label"><PlayCircle /> Library Tour</div>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="container section">
          <SectionTitle
            eyebrow="WHAT'S NEW"
            title="Latest from the library"
            text="Important updates, notices and academic resource announcements."
            link={{ to: '/announcements', label: 'View all updates' }}
          />
          {announcements.length ? (
            <div className="news-grid stagger-grid">
              {announcements.slice(0, 3).map(announcement => (
                <article className="news-card" key={announcement.id}>
                  {announcement.image && <img src={announcement.image} alt="" />}
                  <div className="news-body">
                    <div className="news-top"><span className="chip">{announcement.tag}</span><small>{announcement.date}</small></div>
                    <h3>{announcement.title}</h3>
                    <p>{announcement.text}</p>
                    <Link to="/announcements">Read update <ArrowUpRight size={15} /></Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <Empty title="No announcements yet" text="New library updates will appear here." />
          )}
        </section>
      </Reveal>

      <Reveal>
        <section className="accent-section">
          <div className="container split-callout">
            <div>
              <span className="eyebrow">FACULTY PUBLICATIONS</span>
              <h2>Books and scholarly works published by institute faculty.</h2>
              <p>Explore a growing collection of institutional publications and faculty-authored books.</p>
            </div>
            <Link className="primary-btn" to="/publications">Explore publications <ArrowRight size={17} /></Link>
          </div>
        </section>
      </Reveal>
    </div>
  );
}
