import React from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import membersData from '../../data/membersData';
import WavyText from '../../components/elements/WavyText'
import { Grids } from '../../components/Grids'
import './Member.css'

export const Member = () => {
  const { memberSlug } = useParams();
  const member = membersData.find(m => m.slug === memberSlug);

  if (!member) {
    return <h2>Member not found</h2>;
  }

  return (
    <div className="member-page">
      {/* SEO Meta Tags using Helmet */}
      <Helmet>
        <title>{member.name} | Creo Elements LLP</title>
        <meta name="description" content={member.meta_description} />
        <meta name="keywords" content={`${member.name}, Creo Elements LLP, team, co-founder, team member, ${member.designation}`} />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={`${member.name} | Creo Elements LLP`} />
        <meta property="og:description" content={member.meta_description} />
        <meta property="og:image" content={member.image} />
        <meta property="og:url" content={`https://creo-elements.com/team/${member.slug}`} />
        <meta property="og:type" content="profile" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${member.name} | Creo Elements LLP`} />
        <meta name="twitter:description" content={member.meta_description} />
        <meta name="twitter:image" content={member.image} />
        
        {/* Canonical Link */}
        <link rel="canonical" href={`https://creo-elements.com/team/${member.slug}`} />
      </Helmet>

      <Grids className='grid-1' />
      <div className="member-wrapper z-2">
        <div className="member-image">
          <img src={member.image} alt={member.name} />
        </div>
        <div className="member-content">
          <h1>{member.name}</h1>
          <p>{member.description}</p>
        </div>
      </div>
    </div>
  );
};
