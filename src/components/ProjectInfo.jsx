import React from 'react';
import './ProjectInfo.css';

const ProjectInfo = () => {
  return (
    <section id="project" className="project-info">
      <div className="container">
        <div className="section-header">
          <h2>Our Sacred Mission</h2>
          <p className="section-subtitle">
            "For where two or three gather in my name, there am I with them."
            <span className="scripture-ref">- Matthew 18:20</span>
          </p>
        </div>

        <div className="project-grid">
          <div className="project-card">
            <div className="card-icon">🏗️</div>
            <h3>Project Overview</h3>
            <p>
              Our Provincial Headquarters building will be a modern, 
              state-of-the-art gallery designed to serve our growing congregation 
              and community. The building will feature a main sanctuary, 
              and administrative offices.
            </p>
          </div>

          <div className="project-card">
            <div className="card-icon">🎯</div>
            <h3>Our Vision</h3>
            <p>
              To create a spiritual haven where believers can worship, learn, 
              and grow together. This building will serve as a beacon of hope 
              and faith in our community, welcoming all who seek God's love and grace.
            </p>
          </div>

          <div className="project-card">
            <div className="card-icon">🤝</div>
            <h3>Community Impact</h3>
            <p>
              Beyond worship, our facility will host community events, 
              educational programs, and outreach initiatives. We're building 
              not just a church, but a center for community transformation and spiritual growth.
            </p>
          </div>
        </div>

        <div className="progress-section">
          <h3>Project Progress</h3>
          <div className="progress-bar">
            <div className="progress-fill" style={{width: '34%'}}></div>
          </div>
          <div className="progress-stats">
            <div className="progress-item">
              <span className="progress-label">Funds Raised</span>
              <span className="progress-value">₦500,000</span>
            </div>
            <div className="progress-item">
              <span className="progress-label">Target Goal</span>
              <span className="progress-value">₦200,000,000</span>
            </div>
            <div className="progress-item">
              <span className="progress-label">Remaining</span>
              <span className="progress-value">₦199,500,000</span>
            </div>
          </div>
        </div>

        <div className="scripture-highlight">
          <blockquote>
            "Each of you should give what you have decided in your heart to give, 
            not reluctantly or under compulsion, for God loves a cheerful giver."
            <cite>- 2 Corinthians 9:7</cite>
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default ProjectInfo;
