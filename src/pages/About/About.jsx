import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import './About.css';
import { Grids } from '../../components/Grids';
import { Banner } from './Banner';
import { Story } from './Story';
import { StoryMobile } from './StoryMobile.jsx';
import { Ourteam } from './Ourteam';

function About() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      {/* Helmet for SEO */}
      <Helmet>
        <title>About Us | Creo Elements LLP</title>
        <meta 
          name="description" 
          content="Creo Elements offers expert digital marketing services including web design, SEO, social media management, and branding solutions. Our team of experienced professionals crafts impactful strategies to build your brand, drive traffic, and achieve measurable results. Partner with us for digital success." 
        />
        <meta property="og:title" content="About Us | Creo Elements LLP" />
        <meta 
          property="og:description" 
          content="Creo Elements offers expert digital marketing services including web design, SEO, social media management, and branding solutions. Our team of experienced professionals crafts impactful strategies to build your brand, drive traffic, and achieve measurable results. Partner with us for digital success." 
        />
        <meta property="og:image" content="https://creo-elements.com/images/about-banner.webp" />
        <meta property="og:url" content="https://creo-elements.com/about" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Us | Creo Elements LLP" />
        <meta 
          name="twitter:description" 
          content="Creo Elements offers expert digital marketing services including web design, SEO, social media management, and branding solutions. Our team of experienced professionals crafts impactful strategies to build your brand, drive traffic, and achieve measurable results. Partner with us for digital success." 
        />
        <meta name="twitter:image" content="https://creo-elements.com/images/about-banner.webp" />
        <link rel="canonical" href="https://creo-elements.com/about" />

        {/* Structured Data (JSON-LD) */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Creo Elements LLP",
            "url": "https://creo-elements.com",
            "logo": "https://creo-elements.com/images/logo.png",
            "description": "Creo Elements offers expert digital marketing services including web design, SEO, social media management, and branding solutions. Our team of experienced professionals crafts impactful strategies to build your brand, drive traffic, and achieve measurable results. Partner with us for digital success.",
            // "foundingDate": "YYYY-MM-DD",
            "founders": [
              {
                "@type": "Person",
                "name": "Naeem Merchant"
              },
              {
                "@type": "Person",
                "name": "Hiral Doctor"
              }
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "email": "creoelementsllp@gmail.com",
              "contactType": "customer service"
            }
          })}
        </script>
      </Helmet>

      <div className="about-page">
        <Grids className="grid-1" />
        <Banner />
        {isMobile ? <StoryMobile /> : <Story />}
        <Ourteam />
      </div>
    </div>
  );
}

export default About;
