import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useLibrary } from '../../context/LibraryContext';
import { PageHero } from '../../components/site';

const deptIcons = {
  electronics: '◈',
  textile: '▧',
  civil: '⌂',
  electrical: 'ϟ',
  instrumentation: '◉',
  production: '⚙',
  chemical: '⚗',
  mechanical: '⚙',
  'information-technology': '⌘',
  'computer-science-engineering': '</>'
};

export default function Departments() {
  const { departments } = useLibrary();

  return (
    <>
      <PageHero eyebrow="ACADEMIC DIRECTORY" title="Explore by department" text="A structured gateway to resources across all 10 academic departments." image="/images/campus.webp" />
      <section className="container section">
        <div className="dept-grid full">
          {departments.map(department => (
            <Link className="dept-card" to={`/departments/${department.slug}`} key={department.slug}>
              <div className="dept-icon">{deptIcons[department.slug] || '▣'}</div>
              <span>{department.short}</span>
              <h3>{department.name}</h3>
              <p>{department.description}</p>
              <ArrowUpRight />
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
