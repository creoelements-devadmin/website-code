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
        <title>Creo Elements LLP - 360° Digital Marketing</title>
        <meta name="description" content="We offer a wide range of services, including website design & development, social media management, performance marketing, SEO, and branding solutions." />
        <meta property="og:type" content="agency.digital markeing" />
        <meta property="og:url" content="https://creo-elements.com" />
        <meta property="og:title" content="Creo Elements LLP - 360 Digital Marketing" />
        <meta property="og:image" content="/images/logo.png" />
        <meta property="og:description" content="We offer a wide range of services, including website design & development, social media management, performance marketing, SEO, and branding solutions." />
        
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://creo-elements.com" />
        <meta property="twitter:logo" content="/images/logo.png" />
        <meta property="twitter:title" content="Creo Elements LLP - 360 Digital Marketing" />



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
