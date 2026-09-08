import React from 'react';
import {Link} from 'react-router-dom';
import {ArrowUpRight,BookOpen,CheckCircle2,MapPin} from 'lucide-react';
export default function BookCard({book}){return <article className="book-card"><div className="book-cover"><BookOpen size={30}/><span>CENTRAL<br/>LIBRARY</span></div><div className="book-info"><span className="chip">{book.department}</span><h3>{book.title}</h3><p>by {book.author}</p><div className="book-meta"><span>{book.year}</span><span className={book.available?'available':'unavailable'}>{book.available?`${book.available} available`:'Currently issued'}</span></div><Link className="outline-btn" to={`/catalogue/book/${book.id}`}>View details</Link></div></article>}
