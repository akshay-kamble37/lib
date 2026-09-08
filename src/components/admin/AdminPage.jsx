import React from 'react';

export default function AdminPage({ eyebrow, title, description, children, action }) {
  return (
    <div className="portal-content">
      <div className="portal-heading">
        <div>
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h1>{title}</h1>
          {description && <p className="page-description">{description}</p>}
        </div>
        {action && <div className="portal-heading-action">{action}</div>}
      </div>
      <div className="admin-page-body">{children}</div>
    </div>
  );
}
