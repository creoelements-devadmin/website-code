import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css"; // Optional, for styling

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for doesn't exist or has been moved.</p>
      <Link to="/">Go Back Home</Link>
    </div>
  );
};

export default NotFound;
