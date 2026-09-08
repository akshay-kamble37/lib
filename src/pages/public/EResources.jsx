import React,{useMemo,useState} from 'react';
import {Link,useParams,useSearchParams} from 'react-router-dom';
import {ArrowRight,ArrowUpRight,BookOpen,Building2,FileText,GraduationCap,LibraryBig,MapPin,PlayCircle,Search,ShieldCheck,Star,BookMarked,Download,ExternalLink,ChevronRight} from 'lucide-react';
import {useLibrary} from '../../context/LibraryContext';
import {PageHero,SectionTitle,QuickCard,BookCard,Empty,ResourceCard} from '../../components/site';
export default function EResources(){const {resources}=useLibrary();return <><PageHero eyebrow="E-RESOURCES" title="Digital knowledge, connected" text="Curated academic databases and discovery platforms for the SGGS community." image="/images/library-room.jpg"/><section className="container section"><div className="resource-grid">{resources.map(r=><ResourceCard key={r.id} resource={r}/>)}</div></section></>}
