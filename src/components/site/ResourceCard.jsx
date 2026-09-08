import React from 'react';
import {Link} from 'react-router-dom';
import {ArrowUpRight,BookOpen,CheckCircle2,MapPin} from 'lucide-react';
export default function ResourceCard({resource}){return <a className="resource-card" href={resource.url} target="_blank" rel="noreferrer"><span className="resource-icon">↗</span><span className="chip">{resource.category}</span><h3>{resource.name}</h3><p>{resource.description}</p><strong>Open resource <ArrowUpRight size={15}/></strong></a>}
