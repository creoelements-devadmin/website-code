import React, { useState, useEffect } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { CreoLogo } from './elements/CreoLogo';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faFontAwesome, faInstagram } from '@fortawesome/free-brands-svg-icons'
library.add(fas, faTwitter, faFontAwesome, faInstagram)

export const Header = () => {

  // Use vanilla JS to toggle the menu
  useEffect(() => {
    const hamburger = document.querySelector('.hamburger');
    const mainMenu = document.querySelector('.main-menu');

    const toggleMenu = () => {
      mainMenu.classList.toggle('open');
    };

    const closeMenuOnClickOutside = (event) => {
      if (mainMenu && hamburger && !mainMenu.contains(event.target) && !hamburger.contains(event.target)) {
        mainMenu.classList.remove('open');
      }
    };

    hamburger.addEventListener('click', toggleMenu);
    document.addEventListener('click', closeMenuOnClickOutside);

    // Cleanup listeners on component unmount
    return () => {
      hamburger.removeEventListener('click', toggleMenu);
      document.removeEventListener('click', closeMenuOnClickOutside);
    };
  }, []);

  return (
    <header>
      <button className="hamburger" aria-label="Open Menu">
        <FontAwesomeIcon icon="fa-solid fa-bars" />
      </button>
      <nav aria-label="Main Navigation">
        <ul className="main-menu">
          <li className="menu-items">
            <Link to="/" className="clickable">Home</Link>
          </li>
          <li className="menu-items has-sub-menu">
            <span>What We Do</span>
            <div className="sub-menu-container">
            <ul className="sub-menu">
              <li className="sub-menu-items"><Link to="/services/social-media" className="clickable">Social Media</Link></li>
              <li className="sub-menu-items"><Link to="/services/web-development" className="clickable">Web Design / Development</Link></li>
              <li className="sub-menu-items"><Link to="/services/seo" className="clickable">SEO</Link></li>
              <li className="sub-menu-items"><Link to="/services/digital-marketing" className="clickable">Digital Marketing</Link></li>
              <li className="sub-menu-items"><Link to="/services/branding" className="clickable">Branding</Link></li>
              <li className="sub-menu-items"><Link to="/services/performance-marketing" className="clickable">Performance Marketing</Link></li>
              <li className="sub-menu-items"><Link to="/services/packaging" className="clickable">Packaging</Link></li>
              <li className="sub-menu-items"><Link to="/services/gifting-solutions" className="clickable">Gifting Solutions</Link></li>
              <li className="sub-menu-items"><Link to="/services/print-solutions" className="clickable">Print Solutions</Link></li>
              <li className="sub-menu-items"><Link to="/services/photography" className="clickable">Photography</Link></li>
              <li className="sub-menu-items"><Link to="/services/pr" className="clickable">Public Relations (PR)</Link></li>
            </ul>
            </div>
          </li>
          <li className="menu-items">
            <Link to="/about" className="clickable">About Us</Link>
          </li>
          <li className="menu-items">
            <Link to="/work-with-us" className="clickable">Work With Us</Link>
          </li>
          <li className="menu-items">
            <Link to="/clients" className="clickable">Our Clients</Link>
          </li>
          <li className="menu-items">
            <Link to="/contact-us" className="clickable">Contact Us</Link>
          </li>
          <li className="menu-items">
            <Link to="/blog" className="clickable">Blogs</Link>
          </li>
        </ul>
      </nav>
    </header>

  );
};