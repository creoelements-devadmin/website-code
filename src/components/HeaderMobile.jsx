import React, { useState, useEffect } from 'react';
import './HeaderMobile.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faFontAwesome } from '@fortawesome/free-brands-svg-icons';

library.add(fas, faTwitter, faFontAwesome);

export const HeaderMobile = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const header = document.querySelector('.mobile-header');
    if (menuOpen) {
      header.style.width = '80vw';
      header.style.padding = '0px 15px 0px 15px';
    } else {
      header.style.width = '0px';
      header.style.padding = '0px'
    }
  }, [menuOpen]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <header className='mobile-header'>
        <ul className="mobile-mobile-main-menu">
          <li className="mobile-mobile-menu-items">
            <Link to="/" className="clickable" onClick={toggleMenu}>Home</Link>
          </li>
          <li className="mobile-mobile-menu-items has-sub-menu">
            What We Do
            <ul className="mobile-mobile-sub-menu">
              <li className="mobile-mobile-sub-menu-items"><Link to="services/social-media" className="clickable" onClick={toggleMenu}>Social Media</Link></li>
              <li className="mobile-mobile-sub-menu-items"><Link to="services/web-development" className="clickable" onClick={toggleMenu}>Web Design / Development</Link></li>
              <li className="mobile-mobile-sub-menu-items"><Link to="services/seo" className="clickable" onClick={toggleMenu}>SEO</Link></li>
              <li className="mobile-mobile-sub-menu-items"><Link to="services/digital-marketing" className="clickable" onClick={toggleMenu}>Digital Marketing</Link></li>
              <li className="mobile-mobile-sub-menu-items"><Link to="services/branding" className="clickable" onClick={toggleMenu}>Branding</Link></li>
              <li className="mobile-mobile-sub-menu-items"><Link to="services/performance-marketing" className="clickable" onClick={toggleMenu}>Performance Marketing</Link></li>
              <li className="mobile-mobile-sub-menu-items"><Link to="services/packaging" className="clickable" onClick={toggleMenu}>Packaging</Link></li>
              <li className="mobile-sub-menu-items"><Link to="services/gifting-solutions" className="clickable" onClick={toggleMenu}>Gifting Solutions</Link></li>
              <li className="mobile-sub-menu-items"><Link to="services/print-solutions" className="clickable" onClick={toggleMenu}>Print Solutions</Link></li>
              <li className="mobile-sub-menu-items"><Link to="services/photography" className="clickable" onClick={toggleMenu}>Photography</Link></li>
              <li className="mobile-sub-menu-items"><Link to="services/pr" className="clickable" onClick={toggleMenu}>Public Relations (PR)</Link></li>
            </ul>
          </li>
          <li className="mobile-menu-items">
            <Link to="/about" className="clickable" onClick={toggleMenu}>About Us</Link>
          </li>
          <li className="mobile-menu-items">
            <Link to="/work-with-us" className="clickable" onClick={toggleMenu}>Work With Us</Link>
          </li>
          <li className="mobile-menu-items">
            <Link to="/clients" className="clickable" onClick={toggleMenu}>Our Clients</Link>
          </li>
          <li className="mobile-menu-items">
            <Link to="contact-us" className="clickable" onClick={toggleMenu}>Contact Us</Link>
          </li>
          <li className="mobile-menu-items">
            <Link to="/blog" className="clickable" onClick={toggleMenu}>Blog</Link>
          </li>
        </ul>
      </header>

      <div className="mobile-hamburger" onClick={toggleMenu}>
        <FontAwesomeIcon icon="fa-solid fa-bars" />
      </div>
    </>
  );
};
