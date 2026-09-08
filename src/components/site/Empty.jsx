import React from 'react';
import {Link} from 'react-router-dom';
import {ArrowUpRight,BookOpen,CheckCircle2,MapPin} from 'lucide-react';
export default function Empty({title='Nothing here yet',text='Try another option.'}){return <div className="empty"><CheckCircle2/><h3>{title}</h3><p>{text}</p></div>}
