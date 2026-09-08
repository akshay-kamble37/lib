import React,{useMemo,useState} from 'react';
import {Link,useParams,useSearchParams} from 'react-router-dom';
import {ArrowRight,ArrowUpRight,BookOpen,Building2,FileText,GraduationCap,LibraryBig,MapPin,PlayCircle,Search,ShieldCheck,Star,BookMarked,Download,ExternalLink,ChevronRight} from 'lucide-react';
import {useLibrary} from '../../context/LibraryContext';
import {PageHero,SectionTitle,QuickCard,BookCard,Empty,ResourceCard} from '../../components/site';
export default function Contact(){const {site}=useLibrary();return <><PageHero eyebrow="CONTACT" title="Connect with the Central Library" text="Reach the library team for support, resource access and general enquiries." image="/images/circulation.jpg"/><section className="container section"><div className="contact-grid"><div className="contact-card"><MapPin/><h3>Visit</h3><p>{site.address}</p></div><div className="contact-card"><GraduationCap/><h3>Call</h3><p>{site.contactPhone}</p></div><div className="contact-card"><BookOpen/><h3>Email</h3><p>{site.contactEmail}</p></div></div></section></>}
