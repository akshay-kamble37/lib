import React from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowUpRight,
  ExternalLink,
  BookOpen,
  ShieldCheck
} from 'lucide-react';

import { useLibrary } from '../../context/LibraryContext';

export default function EResourceDetails() {
  const { id } = useParams();
  const { resources } = useLibrary();

  const resource = resources.find((item) => item.id === id);

  if (!resource) {
    return (
      <main className="resource-details-page">
        <section className="container section">
          <div className="resource-details-card resource-not-found">
            <span className="resource-details-icon">
              <BookOpen size={28} />
            </span>

            <span className="chip">
              E-RESOURCE
            </span>

            <h1>Resource Not Found</h1>

            <p>
              The requested e-resource could not be found in the library
              resource collection.
            </p>

            <Link to="/e-resources" className="resource-back-link">
              <ArrowLeft size={16} />
              Back to E-Resources
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="resource-details-page">
      <section className="container section">

        {/* Back Navigation */}
        <Link
          to="/e-resources"
          className="resource-back-link"
        >
          <ArrowLeft size={17} />
          Back to E-Resources
        </Link>

        {/* Main Resource Card */}
        <article className="resource-details-card">

          {/* Header */}
          <div className="resource-details-header">

            <div className="resource-details-brand">
              <div className="resource-details-icon">
                <BookOpen size={32} />
              </div>

              <div>
                <span className="chip">
                  {resource.category}
                </span>

                <h1>{resource.name}</h1>
              </div>
            </div>

            <div className="resource-details-external-icon">
              <ExternalLink size={22} />
            </div>

          </div>

          {/* Description */}
          <div className="resource-details-section">
            <span className="resource-section-label">
              ABOUT THIS RESOURCE
            </span>

            <p className="resource-details-description">
              {resource.description}
            </p>

            <p className="resource-details-description">
              This resource provides access to academic and research
              information through an external digital platform. Students,
              faculty members and researchers can use the resource to
              explore relevant scholarly content and learning material.
            </p>
          </div>

          {/* Resource Information */}
          <div className="resource-details-section">

            <span className="resource-section-label">
              RESOURCE INFORMATION
            </span>

            <div className="resource-info-grid">

              <div className="resource-info-item">
                <span>Resource Name</span>
                <strong>{resource.name}</strong>
              </div>

              <div className="resource-info-item">
                <span>Category</span>
                <strong>{resource.category}</strong>
              </div>

              <div className="resource-info-item">
                <span>Access</span>
                <strong>External Digital Resource</strong>
              </div>

              <div className="resource-info-item">
                <span>Library Portal</span>
                <strong>SGGS Central Library</strong>
              </div>

            </div>
          </div>

          {/* Access Section */}
          <div className="resource-access-box">

            <div className="resource-access-icon">
              <ShieldCheck size={23} />
            </div>

            <div className="resource-access-content">
              <h2>Access the Resource</h2>

              <p>
                Continue to the official resource website to browse its
                available journals, papers, books, databases or other
                academic content.
              </p>
            </div>

            <a
              href={resource.url}
              target="_blank"
              rel="noreferrer"
              className="resource-visit-button"
            >
              Visit Resource
              <ArrowUpRight size={18} />
            </a>

          </div>

        </article>
      </section>
    </main>
  );
}