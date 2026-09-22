import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

import { useLibrary } from '../../context/LibraryContext';
import { PageHero, Empty } from '../../components/site';

export default function PublicationDetails() {
  const { id } = useParams();
  const { publications } = useLibrary();

  const publication = publications.find(
    (item) => String(item.id) === String(id)
  );

  if (!publication) {
    return (
      <>
        <PageHero
          eyebrow="FACULTY PUBLICATIONS"
          title="Publication not found"
          text="The requested publication could not be found."
          image="/images/bookshelves.jpg"
        />

        <section className="container section">
          <Empty title="Publication not found" />

          <div className="publication-detail-actions">
            <Link
              to="/publications"
              className="outline-btn"
            >
              <ArrowLeft size={15} />
              Back to publications
            </Link>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero
        eyebrow="FACULTY PUBLICATION"
        title={publication.title}
        text={
          publication.description ||
          'Faculty publication from the SGGS Central Library collection.'
        }
        image="/images/bookshelves.jpg"
      />

      <section className="container section">

        <div className="detail-card">

          <div>
            <img
              className="publication-detail-cover"
              src={
                publication.cover ||
                '/images/bookshelves.jpg'
              }
              alt={publication.title}
            />
          </div>

          <div>

            <span className="chip">
              {publication.department}
            </span>

            <h2>
              {publication.title}
            </h2>

            <p className="lead">
              {publication.author
                ? `By ${publication.author}`
                : 'Author not specified'}
            </p>


            <div className="detail-grid">

              <div>
                <small>Author</small>
                <b>
                  {publication.author ||
                    'Not specified'}
                </b>
              </div>

              <div>
                <small>Department</small>
                <b>
                  {publication.department ||
                    'Not specified'}
                </b>
              </div>

              <div>
                <small>Publisher</small>
                <b>
                  {publication.publisher ||
                    'Not specified'}
                </b>
              </div>

              <div>
                <small>Publication Year</small>
                <b>
                  {publication.year ||
                    'Not specified'}
                </b>
              </div>

            </div>


            <div className="publication-full-description">

              <h3>
                About this publication
              </h3>

              <p>
                {publication.description ||
                  'No additional description is available for this publication.'}
              </p>

            </div>


            <div className="publication-detail-actions">

              <Link
                to="/publications"
                className="outline-btn"
              >
                <ArrowLeft size={15} />
                Back to publications
              </Link>

            </div>

          </div>

        </div>

      </section>
    </>
  );
}
