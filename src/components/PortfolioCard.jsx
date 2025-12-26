import { useState } from "react";

export default function PortfolioCard({ project }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { title, description, details, tags, images, link } = project;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="portfolio-card">
      <div
        className="portfolio-header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div>
          <h3>{title}</h3>
          <p className="portfolio-description">{description}</p>
        </div>
        <button className="expand-btn">{isExpanded ? "−" : "+"}</button>
      </div>

      {isExpanded && (
        <div className="portfolio-content">
          {images && images.length > 0 && (
            <div className="portfolio-gallery">
              <div className="gallery-main">
                <img
                  src={images[currentImageIndex]}
                  alt={`${title} - Image ${currentImageIndex + 1}`}
                  className="gallery-image"
                />
                {images.length > 1 && (
                  <>
                    <button
                      className="gallery-nav gallery-nav-left"
                      onClick={prevImage}
                      aria-label="Previous image"
                    >
                      ‹
                    </button>
                    <button
                      className="gallery-nav gallery-nav-right"
                      onClick={nextImage}
                      aria-label="Next image"
                    >
                      ›
                    </button>
                  </>
                )}
              </div>

              {images.length > 1 && (
                <div className="gallery-thumbnails">
                  {images.map((img, idx) => (
                    <div
                      key={idx}
                      className={`thumbnail ${
                        idx === currentImageIndex ? "thumbnail-active" : ""
                      }`}
                      onClick={() => setCurrentImageIndex(idx)}
                      style={{ backgroundImage: `url(${img})` }}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {details && (
            <div className="portfolio-details">
              {details.challenge && (
                <div className="detail-section">
                  <h4>Challenge</h4>
                  <p>{details.challenge}</p>
                </div>
              )}

              {details.solution && (
                <div className="detail-section">
                  <h4>Solution</h4>
                  <p>{details.solution}</p>
                </div>
              )}

              {details.results && (
                <div className="detail-section">
                  <h4>Results</h4>
                  <ul>
                    {details.results.map((result, idx) => (
                      <li key={idx}>{result}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {tags && tags.length > 0 && (
            <div className="portfolio-tags">
              {tags.map((tag, idx) => (
                <span key={idx} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="portfolio-link"
            >
              View Project →
            </a>
          )}
        </div>
      )}
    </div>
  );
}
