import React from 'react';
export default function DataTable({headers,rows}){return <div className="admin-table-wrap"><table><thead><tr>{headers.map(h=><th key={h}>{h}</th>)}</tr></thead><tbody>{rows.map((r,i)=><tr key={i}>{r}</tr>)}</tbody></table></div>}
