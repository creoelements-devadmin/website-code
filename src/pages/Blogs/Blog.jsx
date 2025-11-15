import React from 'react';

import { Link } from 'react-router-dom'; // Import Link



export const Blog = () => {
  return (
    <div>Blog</div>
  );
}


export const Blogcard = ({ id, title, content }) => {
  return (
    <div className="blog-card">
      <Link to={`/blog/${id}`}> {/* Link to the individual blog post */}
        <h2>{title}</h2>
      </Link>
      <p>{content}</p>
    </div>
  );
};

