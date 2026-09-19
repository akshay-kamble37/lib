import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export default function ResourceCard({ resource }) {
  return (
    <Link
      className="resource-card"
      to={`/e-resources/${resource.id}`}
    >
      <span className="resource-icon">↗</span>

      <span className="chip">
        {resource.category}
      </span>

      <h3>{resource.name}</h3>

      <p>{resource.description}</p>

      <strong>
        View details <ArrowUpRight size={15} />
      </strong>
    </Link>
  );
}