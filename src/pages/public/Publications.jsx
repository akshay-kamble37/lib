import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

import { useLibrary } from '../../context/LibraryContext';
import { PageHero } from '../../components/site';

export default function Publications() {
  const { publications } = useLibrary();

  return (
    <>
      <PageHero
        eyebrow="FACULTY PUBLICATIONS"
        title="Faculty Publications"
        text="Books and scholarly works published by Shri Guru Gobind Singhji Institute faculty members."
        image="/images/bookshelves.jpg"
      />

      <section className="container section">

        <div className="publication-grid">

          {publications.map((publication) => (
            <article
              className="publication-card"
              key={publication.id}
            >

              <img
                src={
                  publication.cover ||
                  '/images/bookshelves.jpg'
                }
                alt={publication.title}
              />

              <div>

                <span className="chip">
                  {publication.department}
                </span>

                <h3>
                  {publication.title}
                </h3>

                <p>
                  {publication.description}
                </p>

                <div className="pub-meta">

                  <span>
                    {publication.author}
                  </span>

                  <span>
                    {publication.publisher} • {publication.year}
                  </span>

                </div>

                <Link
                  className="outline-btn"
                  to={`/publications/${publication.id}`}
                >
                  View publication
                  <ArrowUpRight size={15} />
                </Link>

              </div>

            </article>
          ))}

        </div>

      </section>
    </>
  );
}
