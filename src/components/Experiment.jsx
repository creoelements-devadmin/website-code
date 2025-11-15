// import React from 'react';
import './Experiment.css';

import React, { useRef, useState } from 'react';
import './Experiment.css';

const Experiment = () => {
  const triggerRef = useRef(null);
  const [submenuStyle, setSubmenuStyle] = useState({ display: 'none' });

  const handleMouseEnter = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setSubmenuStyle({
        display: 'flex',
        position: 'fixed',
        left: rect.left + rect.width / 2,
        top: rect.top,
        transform: 'translate(-50%, -100%)',
        zIndex: 1000
      });
    }
  };
  const handleMouseLeave = () => {
    setSubmenuStyle({ display: 'none' });
  };

  return (
    <div className="experiment-container">
      <div className="container">
        <div className="glass-container">
          <div className="glass-filter"></div>
          <div className="glass-overlay"></div>
          <div className="glass-specular"></div>
          <div className="glass-content">
            <ul className="main-menu" style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', gap: '1.5rem' }}>
              <li className="menu-items">
                <a href="/" className="clickable">Home</a>
              </li>
              <li
                className="menu-items has-sub-menu"
                id="experiment-whatwedo-trigger"
                ref={triggerRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <span>What We Do</span>
              </li>
              <li className="menu-items">
                <a href="/about" className="clickable">About Us</a>
              </li>
              <li className="menu-items">
                <a href="/work-with-us" className="clickable">Work With Us</a>
              </li>
              <li className="menu-items">
                <a href="/clients" className="clickable">Our Clients</a>
              </li>
              <li className="menu-items">
                <a href="/contact-us" className="clickable">Contact Us</a>
              </li>
              <li className="menu-items">
                <a href="/blog" className="clickable">Blogs</a>
              </li>
            </ul>
            {/* Sub-menu rendered outside main-menu for fixed positioning */}
            <ul
              className="experiment-fixed-sub-menu sub-menu"
              id="experiment-whatwedo-submenu"
              style={submenuStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <li className="sub-menu-items"><a href="/services/social-media" className="clickable">Social Media</a></li>
              <li className="sub-menu-items"><a href="/services/web-development" className="clickable">Web Design / Development</a></li>
              <li className="sub-menu-items"><a href="/services/seo" className="clickable">SEO</a></li>
              <li className="sub-menu-items"><a href="/services/digital-marketing" className="clickable">Digital Marketing</a></li>
              <li className="sub-menu-items"><a href="/services/branding" className="clickable">Branding</a></li>
              <li className="sub-menu-items"><a href="/services/performance-marketing" className="clickable">Performance Marketing</a></li>
              <li className="sub-menu-items"><a href="/services/packaging" className="clickable">Packaging</a></li>
              <li className="sub-menu-items"><a href="/services/gifting-solutions" className="clickable">Gifting Solutions</a></li>
              <li className="sub-menu-items"><a href="/services/print-solutions" className="clickable">Print Solutions</a></li>
              <li className="sub-menu-items"><a href="/services/photography" className="clickable">Photography</a></li>
              <li className="sub-menu-items"><a href="/services/pr" className="clickable">Public Relations (PR)</a></li>
            </ul>
          </div>

          {/* SVG FILTER DEFINITION */}
          <svg style={{ display: 'none' }}>
            <filter id="lg-dist" x="0%" y="0%" width="100%" height="100%">
              <feTurbulence type="fractalNoise" baseFrequency="0.008 0.008" numOctaves="2" seed="92" result="noise" />
              <feGaussianBlur in="noise" stdDeviation="2" result="blurred" />
              <feDisplacementMap in="SourceGraphic" in2="blurred" scale="70" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Experiment;
