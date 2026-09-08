import React,{useMemo,useState} from 'react';
import {Link,useParams,useSearchParams} from 'react-router-dom';
import {ArrowRight,ArrowUpRight,BookOpen,Building2,FileText,GraduationCap,LibraryBig,MapPin,PlayCircle,Search,ShieldCheck,Star,BookMarked,Download,ExternalLink,ChevronRight} from 'lucide-react';
import {useLibrary} from '../../context/LibraryContext';
import {PageHero,SectionTitle,QuickCard,BookCard,Empty,ResourceCard} from '../../components/site';
export default function Announcements(){const {announcements}=useLibrary();return <><PageHero eyebrow="LIBRARY UPDATES" title="What's New" text="Announcements, notices and new academic-resource updates from the Central Library." image="/images/library-reading.jpg"/><section className="container section"><div className="news-grid full">{announcements.map(a=><article className="news-card" key={a.id}>{a.image&&<img src={a.image} alt=""/>}<div className="news-body"><div className="news-top"><span className="chip">{a.tag}</span><small>{a.date}</small></div><h3>{a.title}</h3><p>{a.text}</p></div></article>)}</div></section></>}
