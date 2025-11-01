import React from 'react';
import './Footer.css';
import logo from '../assets/logo.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="logo">
              <div className="flex align-center justify-center">
                <img src={logo} alt="R.C.C.G Logo" width={50} height={50} />
                <h3> R.C.C.G LP91 Headquarters</h3>
              </div>
            </div>
            <p>Building God's House Together</p>
            <p className="footer-description">
              Join us in this divine mission to construct our Provincial Headquarters building. 
              Your support helps create a sacred space for worship, fellowship, and community growth.
            </p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#project">Project Overview</a></li>
              <li><a href="#building">Building Design</a></li>
              <li><a href="#support">Support Us</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact Information</h4>
            <div>
              <p>📞  +234 803 439-0941</p>
              <p>📧  info@provincialheadquarters.org</p>
              <p>📍   Beside Ascension college, Imeke, Badagry, Lagos</p>
            </div>
          </div>

          <div className="footer-section">
            <h4>Support the Project</h4>
            <div className="support-info">
              <p>💝 Make a donation to help build God's house</p>
              <p>🤝 Join our monthly giving program</p>
              <p>📞 Contact us for more information</p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; 2025 R.C.C.G LP91 Headquarters Building Project. All rights reserved.</p>
            <div className="footer-scripture">
              <p>"Unless the Lord builds the house, those who build it labor in vain." - Psalm 127:1</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
