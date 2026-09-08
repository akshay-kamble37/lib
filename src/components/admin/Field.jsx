import React from 'react';

export default function Field({ label, children, hint, required = false }) {
  return (
    <label className="field">
      <span>{label}{required && <em aria-hidden="true">*</em>}</span>
      {children}
      {hint && <small>{hint}</small>}
    </label>
  );
}
