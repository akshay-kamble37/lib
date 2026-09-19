import React from 'react';
import { Link } from 'react-router-dom';
import { useLibrary } from '../../context/LibraryContext';

export default function Footer() {
  const { site } = useLibrary();
  return (
    <footer>
      <div className="container footer-grid">
        <div className="footer-main">
          <div className="footer-brand">
            <img
              src="/images/image.webp"
              alt="Shri Guru Gobind Singhji Institute of Engineering & Technology"
            />
            <div>
              <strong>
                Shri Guru Gobind Singhji Institute of Engineering & Technology Central Library
              </strong>
              <span>Knowledge • Discovery • Innovation</span>
            </div>
          </div>

          <p>
            {site?.about ||
              'The Shri Guru Gobind Singhji Institute of Engineering & Technology Central Library supports teaching, learning and research by connecting the SGGS community with curated print and digital knowledge resources.'}
          </p>

        </div>

        <div className="footer-column">
          <h4>Explore</h4>
          <Link to="/catalogue">Catalogue</Link>
          <Link to="/question-papers">Question Papers</Link>
          <Link to="/departments">Departments</Link>
          <Link to="/publications">Publications</Link>
        </div>

        <div className="footer-column">
          <h4>Library</h4>
          <Link to="/e-resources">E-Resources</Link>
          <Link to="/announcements">What's New</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="footer-column footer-contact">
          <h4>Contact</h4>
          <p>
            {site?.address ||
              'Shri Guru Gobind Singhji Institute of Engineering & Technology, Vishnupuri, Nanded, Maharashtra 431606'}
          </p>
          <p>
            {site?.contactPhone || ''}
            <br />
            {site?.contactEmail || ''}
          </p>
        </div>
      </div>

      <div className="copyright">
        <div className="container">
          © 2026 Shri Guru Gobind Singhji Institute of Engineering & Technology Central Library • Digital Knowledge Portal
        </div>
      </div>
    </footer>
  );
}
