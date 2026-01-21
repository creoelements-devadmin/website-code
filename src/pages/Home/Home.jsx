import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';  // import Helmet
import './Home.css';
import { Banner } from './Banner';
import { BannerMobile } from './BannerMobile';
import { Threesixty } from './Threesixty';
import { About } from './About';
import { Services } from './Services';
import { Testimonials } from './Testimonials';
import { Clients } from './Clients';
import { Partners } from './Partners';

function Home({ updaters }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 825);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 825);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className='homepage'>
      <Helmet>
      {/* This is For SEO Head Tag Content */}


        {/* On Page SEO */}
        <title>Creo Elements LLP - Digital Marketing Agency | SEO, Branding & Growth</title>
        <meta name="description" content="Creo Elements LLP is a full-service digital marketing agency offering SEO, branding, performance marketing, social media management, and website development for growing businesses." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://creo-elements.com" />
        <meta property="og:title" content="Creo Elements LLP – Digital Marketing & Branding Agency" />
        <meta property="og:description" content="Full-service digital marketing agency specializing in SEO, branding, performance marketing, social media management, and web development." />
        <meta property="og:image" content="/images/logo.png" />
        
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://creo-elements.com" />
        <meta name="twitter:title" content="Creo Elements LLP – Digital Marketing Agency" />
        <meta name="twitter:description" content="SEO, branding, performance marketing, social media management, and website development by Creo Elements LLP." />
        <meta property="twitter:logo" content="/images/logo.png" />



        {/* Technical SEO */}
        <link rel="canonical" href="https://creo-elements.com" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Creo Elements LLP",
              "url": "https://creo-elements.com",
              "logo": "https://creo-elements.com/images/logo.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1234567890",
                "contactType": "customer service"
              },
              "sameAs": [
                "https://www.instagram.com/creoelements/"
              ]
            }
          `}
        </script>


      </Helmet>
      {isMobile ? <BannerMobile /> : <Banner updaters={updaters} />}
      <Threesixty />
      <About />
      <Services />
      <Testimonials />
      <Clients />
      <Partners />
    </div>
  );
}

export default Home;
