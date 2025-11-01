import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="hero-background">
        <div className="hero-overlay"></div>
      </div>
      
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Building God's House Together</h1>
            <p className="hero-subtitle">
              "Unless the Lord builds the house, those who build it labor in vain." 
              <span className="scripture-ref">- Psalm 127:1</span>
            </p>
            <p className="hero-description">
              Join us in this divine mission to construct our Provincial Headquarters Building. 
              Your generous support will help create a sacred space where generations will worship, 
              learn, and grow in faith.
            </p>
            
            <div className="hero-buttons">
              <a href="#support" className="btn btn-primary">
                Support the Project
              </a>
              <a href="#project" className="btn btn-secondary">
                Learn More
              </a>
            </div>
          </div>
          
          <div className="hero-stats">
            <div className="stat-item">
              <h3>₦200M</h3>
              <p>Project Goal</p>
            </div>
            <div className="stat-item">
              <h3>₦500K</h3>
              <p>Raised So Far</p>
            </div>
            <div className="stat-item">
              <h3>34%</h3>
              <p>Progress</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
