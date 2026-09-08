import React from 'react';
export default function ManagerForm({title,onSubmit,children}){return <form className="manager-form" onSubmit={onSubmit}><h3>{title}</h3>{children}</form>}
