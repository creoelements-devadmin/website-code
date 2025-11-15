import React from 'react';
import { Link } from 'react-router-dom';

export const Blogcard = ({ id, title, content, featuredImage }) => {
  // Function to limit the content to 100 characters
  const truncateContent = (text, limit) => {
    return text.length > limit ? text.substring(0, limit) + '...' : text;
  };

  return (
    <div className="blog-card">
      <Link to={`/blog/${id}`}>
        {featuredImage && <img src={featuredImage} alt={title} className="blog-featured-image" />} 
        <h2 dangerouslySetInnerHTML={{ __html: title }} />
      </Link>
      {/* Adjust the limit as needed */}
      <p dangerouslySetInnerHTML={{ __html: truncateContent(content, 100) }} />
    </div>
  );
};
