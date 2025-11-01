import React, { useState } from 'react';
import './Header.css';
import logo from '../assets/logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <div className="flex">
                <img src={logo} alt="R.C.C.G Logo" width={60} height={60} />
                <div> 
                  <h2> R.C.C.G LP91 Headquarters</h2>
                  <span>Building God's House Together</span>
                </div>
            </div>
          </div>
          
          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <a href="#home" onClick={() => setIsMenuOpen(false)}>Home</a>
            <a href="#project" onClick={() => setIsMenuOpen(false)}>Project</a>
            <a href="#building" onClick={() => setIsMenuOpen(false)}>Building Design</a>
            <a href="#support" onClick={() => setIsMenuOpen(false)}>Support</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a>
          </nav>

          <button className="menu-toggle" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
