import React from 'react';
import {useLibrary} from '../../context/LibraryContext';
export default function Stat({value,label}){return <div className="portal-stat"><b>{value}</b><span>{label}</span></div>}
