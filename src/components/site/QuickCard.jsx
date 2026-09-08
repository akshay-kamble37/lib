import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export default function QuickCard({ to, icon: Icon, title, text }) {
  return (
    <Link to={to} className="quick-card">
      <div className="icon-box"><Icon size={20} strokeWidth={1.8} /></div>
      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
      <ArrowUpRight className="quick-arrow" size={18} />
    </Link>
  );
}
