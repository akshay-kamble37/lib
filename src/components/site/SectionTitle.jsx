import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export default function SectionTitle({ eyebrow, title, text, link }) {
  return (
    <div className="section-title">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        {text && <p>{text}</p>}
      </div>
      {link && (
        <Link className="text-link" to={link.to}>
          {link.label}<ArrowUpRight size={16} />
        </Link>
      )}
    </div>
  );
}
