import React from 'react'
import { Helmet } from 'react-helmet-async';
import { PageHeroBanner } from '../../components/Gsap/PageHeroBanner';
import { ClientsBanner } from './ClientsBanner';
import { ClientsShow } from './ClientsShow';

export const ClientPage = () => {
  return (
    <>
     <div className="">
      <Helmet>
        <title>Our Clients | Creo Elements LLP</title>
        <meta name="description" content="Explore the diverse range of clients we've worked with, showcasing various industries and innovative solutions." />
        <meta name="keywords" content="clients, portfolio, partnerships, logos, industries" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Our Clients | Creo Elements LLP" />
        <meta property="og:description" content="Explore the diverse range of clients we've worked with, showcasing various industries and innovative solutions." />
        <meta property="og:image" content="https://creo-elements.com/images/CreoLogo.png" />
        <meta property="og:url" content="https://creo-elements.com/clients" />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Our Clients | Creo Elements LLP" />
        <meta name="twitter:description" content="Explore the diverse range of clients we've worked with, showcasing various industries and innovative solutions." />
        <meta name="twitter:image" content="https://creo-elements.com/images/CreoLogo.png" />
        
        {/* Canonical Link */}
        <link rel="canonical" href="https://creo-elements.com/clients" />
      </Helmet>

     <ClientsBanner />
     <ClientsShow /> 
      <div className="md:px-10 pt-10 px-5 ">
          <p className="text-[10px]"><strong className="text-primary">Client Logo & Trademark Disclaimer : </strong>

All brand names, logos, and trademarks displayed on this website belong to their respective owners and are the property of their respective companies.

These logos are displayed solely for the purpose of showcasing our past and present client relationships, projects, collaborations, and professional work undertaken by Creo Elements LLP.

All trademarks and intellectual property rights remain with their respective owners. The display of these logos does not imply any additional endorsement, sponsorship, or affiliation beyond the professional engagement or work undertaken.

If any brand owner or authorised representative has concerns regarding the display of their logo, they may contact us for clarification or resolution.</p>
        </div>
     </div>
    </>
  )
}
