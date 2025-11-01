import React, { useMemo, useState } from 'react';
import './BuildingDesign.css';
import ImageCarousel from './ImageCarousel';
import './ImageCarousel.css';
import GalleryModal from './GalleryModal';
import './GalleryModal.css';

const BuildingDesign = () => {
  return (
    <section id="building" className="building-design">
      <div className="container">
        <div className="section-header">
          <h2>The Vision Unveiled</h2>
          <p className="section-subtitle">
            "And let them make me a sanctuary, that I may dwell in their midst."
            <span className="scripture-ref">- Exodus 25:8</span>
          </p>
        </div>

        <div className="building-content">
          <div className="design-showcase">
            <div className="main-image">
              {
                /* Carousel for church images */
              }
              <CarouselSection />
            </div>
            
            <div className="design-features">
              <h3>🏗️ Building Features</h3>
              <div className="features-grid">
                <div className="feature-item">
                  <div className="feature-icon">⛪</div>
                  <h4>Main Sanctuary</h4>
                  <p>Seating capacity for 1,500 worshippers with modern audio-visual systems</p>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">🤝</div>
                  <h4>Fellowship Hall</h4>
                  <p>Large gathering space for community events and celebrations</p>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">🏢</div>
                  <h4>Administrative Offices</h4>
                  <p>Modern office spaces for church administration and pastoral care</p>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">🚗</div>
                  <h4>Parking Facility</h4>
                  <p>Ample parking space for 300+ vehicles with accessibility features</p>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">🌱</div>
                  <h4>Landscaping</h4>
                  <p>Beautiful gardens and outdoor spaces for meditation and fellowship</p>
                </div>
              </div>
            </div>
          </div>

          <div className="timeline-section">
            <h3>📅 Project Timeline</h3>
            <div className="timeline">
              <div className="timeline-item completed">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h4>Phase 1: Planning & Design</h4>
                  <p>Architectural planning and design approval</p>
                  <span className="timeline-date">Completed - Q4 2025</span>
                </div>
              </div>
              <div className="timeline-item current">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h4>Phase 2: Fundraising Launch</h4>
                  <p>Community outreach and fundraising campaign</p>
                  <span className="timeline-date">Completed - Q1 2026</span>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h4>Phase 3: Foundation Work</h4>
                  <p>Site preparation and foundation construction</p>
                  <span className="timeline-date">In Progress - Q2 2026</span>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h4>Phase 4: Main Construction</h4>
                  <p>Building structure and interior work</p>
                  <span className="timeline-date">Planned - Q3-Q4 2026</span>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h4>Phase 5: Completion</h4>
                  <p>Final touches and dedication ceremony</p>
                  <span className="timeline-date">Target - Q1 2026</span>
                </div>
              </div>
            </div>
          </div>

          <div className="scripture-highlight">
            <blockquote>
              "The house of the Lord was built with stone prepared at the quarry, 
              and no hammer, chisel or any other iron tool was heard at the temple site 
              while it was being built."
              <cite>- 1 Kings 6:7</cite>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuildingDesign;

// Local section composed here to keep file cohesive
const CarouselSection = () => {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [showPlans, setShowPlans] = useState(false);

  // Public assets path assumption: place images under public/images/
  const churchImages = useMemo(() => [
    '/images/church_1.jpg',
    '/images/church_2.jpg',
    '/images/church_3.jpg',
  ], []);

  const planImages = useMemo(() => [
    '/images/plan1.jpg',
    '/images/plan2.jpg',
    '/images/plan3.jpg',
    '/images/plan4.jpg',
    '/images/plan5.jpg',
    '/images/plan6.jpg',
  ], []);

  const allImages = useMemo(() => [...churchImages, ...planImages], [churchImages, planImages]);

  return (
    <div>
      <ImageCarousel images={churchImages} />

      <div className="view-more-row">
        <button
          className="btn btn-secondary"
          onClick={() => setShowPlans(prev => !prev)}
        >
          View More
        </button>
      </div>

      <GalleryModal
        isOpen={isGalleryOpen}
        images={allImages}
        startIndex={startIndex}
        onClose={() => setIsGalleryOpen(false)}
      />

      {showPlans && (
        <div className="plans-grid">
          {planImages.map((src, i) => (
            <button
              key={i}
              className="plan-thumb"
              onClick={() => { setStartIndex(churchImages.length + i); setIsGalleryOpen(true); }}
              aria-label={`Open plan ${i + 1}`}
            >
              <img src={src} alt={`Architectural plan ${i + 1}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
