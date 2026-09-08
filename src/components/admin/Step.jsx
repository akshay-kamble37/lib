import React from 'react';

export default function Step({ n, t, description }) {
  return (
    <div className="workflow-step">
      <span>{n}</span>
      <div>
        <b>{t}</b>
        {description && <small>{description}</small>}
      </div>
    </div>
  );
}
