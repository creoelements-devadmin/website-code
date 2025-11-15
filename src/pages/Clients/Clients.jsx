import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import '../Home/Home.css';
import { logos1, logos2 } from '../Home/Clients';
import { Grids } from '../../components/Grids';
import './Clients.css';
import WavyText from '../../components/elements/WavyText';

export const ClientPage = () => {
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 825);
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 825);

  // Get the first half and second half of logos1 and logos2
  const halfIndex1 = Math.ceil(logos1.length / 2);
  const halfIndex2 = Math.ceil(logos2.length / 2);

  const firstHalfLogos = [...logos1.slice(0, halfIndex1), ...logos2.slice(0, halfIndex2)];
  const secondHalfLogos = [...logos1.slice(halfIndex1), ...logos2.slice(halfIndex2)];

  // Combine them in the desired order
  const combinedLogos = [...firstHalfLogos, ...secondHalfLogos];

  return (
    <div className="clients-page">
      {/* SEO meta tags using Helmet */}
      <Helmet>
        <title>Our Clients | Creo Elements LLP</title>
        <meta name="description" content="Explore the diverse range of clients we've worked with, showcasing various industries and innovative solutions." />
        <meta name="keywords" content="clients, portfolio, partnerships, logos, industries" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Our Clients | Creo Elements LLP" />
        <meta property="og:description" content="Explore the diverse range of clients we've worked with, showcasing various industries and innovative solutions." />
        <meta property="og:image" content="path-to-an-image" />
        <meta property="og:url" content="https://creo-elements.com/clients" />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Our Clients | Creo Elements LLP" />
        <meta name="twitter:description" content="Explore the diverse range of clients we've worked with, showcasing various industries and innovative solutions." />
        <meta name="twitter:image" content="path-to-an-image" />
        
        {/* Canonical Link */}
        <link rel="canonical" href="https://creo-elements.com/clients" />
      </Helmet>

      <Grids className='grid-1' />
      <div className='clients-wrapper'>
        <div className="client-banner z-2">
          {isMobile ? (
            <WavyText fontSize={'3rem'}>Our Clients</WavyText>
          ) : (
            <WavyText fontSize={'8rem'}>Our Clients</WavyText>
          )}
        </div>

        {/* Render combined logos */}
        <div className="logos-wrapper z-2">
          {combinedLogos.map((logo, index) => (
            <img key={index} src={logo.url} alt={logo.name} className="client-logo" />
          ))}
        </div>
      </div>
    </div>
  );
};
