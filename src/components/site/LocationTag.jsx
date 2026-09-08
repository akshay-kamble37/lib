import React from 'react';
import {Link} from 'react-router-dom';
import {ArrowUpRight,BookOpen,CheckCircle2,MapPin} from 'lucide-react';
export default function LocationTag({children}){return <span className="location-tag"><MapPin size={14}/>{children}</span>}
