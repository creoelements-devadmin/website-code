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
         {/* Page Title */}
      <title>
        About Creo Elements LLP | Digital Marketing Agency in Mumbai
      </title>

      {/* Meta Description */}
      <meta
        name="description"
        content="Learn about Creo Elements LLP, a Mumbai-based digital marketing agency offering SEO, performance marketing, web design, branding, and eCommerce solutions to scale growing businesses."
      />

      {/* Canonical URL */}
      <link
        rel="canonical"
        href="https://creo-elements.com/about"
      />

      {/* Open Graph Meta */}
      <meta property="og:type" content="website" />
      <meta
        property="og:title"
        content="About Creo Elements LLP | Digital Marketing Agency in Mumbai"
      />
      <meta
        property="og:description"
        content="Creo Elements LLP, a Mumbai-based digital marketing agency helping brands grow through SEO, performance marketing, web design, branding, and eCommerce solutions."
      />
      <meta
        property="og:image"
        content="https://creo-elements.com/images/about-banner.webp"
      />
      <meta
        property="og:url"
        content="https://creo-elements.com/about"
      />
      <meta property="og:site_name" content="Creo Elements LLP" />

      {/* Twitter Meta */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content="About Creo Elements LLP | Digital Marketing Agency in Mumbai"
      />
      <meta
        name="twitter:description"
        content="Discover the team and vision behind Creo Elements LLP, a Mumbai-based digital marketing agency driving measurable business growth."
      />
      <meta
        name="twitter:image"
        content="https://creo-elements.com/images/about-banner.webp"
      />


        {/* Structured Data (JSON-LD) */}
        <script type="application/ld+json">
{JSON.stringify({
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Creo Elements LLP",
  "url": "https://creo-elements.com",
  "logo": "https://creo-elements.com/images/logo.png",
  "image": "https://creo-elements.com/images/about-banner.webp",
  "description": "Creo Elements LLP is a Mumbai-based digital marketing agency specializing in SEO, performance marketing, web design, social media management, branding, and eCommerce solutions.",
  // "foundingDate": "2021-01-01",
  // "priceRange": "₹₹",
  "serviceType": [
    "Digital Marketing Services",
    "SEO Services",
    "Performance Marketing",
    "Web Design & Development",
    "Branding Services",
    "Social Media Management"
  ],
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
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Mumbai",
    "addressRegion": "MH",
    "addressCountry": "IN"
  },
  "areaServed": {
    "@type": "AdministrativeArea",
    "name": "Mumbai, Maharashtra, India"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "email": "creoelementsllp@gmail.com",
    "telephone": "+91-9892360639"
  },
  "sameAs": [
    "https://www.instagram.com/creoelements/",
    "https://www.linkedin.com/company/creo-elements-llp/"
  ]
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
