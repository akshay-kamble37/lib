import React from 'react';
import {Link} from 'react-router-dom';
import {ArrowUpRight,BookOpen,CheckCircle2,MapPin} from 'lucide-react';
export default function PageHero({eyebrow,title,text,image}){return <section className="page-hero">{image&&<img src={image} alt=""/>}<div className="container page-hero-inner"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1>{text&&<p>{text}</p>}</div></section>}
