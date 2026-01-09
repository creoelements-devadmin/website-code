import React from 'react';
import './Partners.css';

const partnersData = [
  {
    name: 'Hostinger',
    image: 'https://creo-elements.com/blogs/wp-content/uploads/2025/05/hostinger.png',
    description: 'Delivering high-performance web hosting solutions with exceptional support and reliability.',
  },
  {
    name: 'WooCommerce',
    image: 'https://creo-elements.com/blogs/wp-content/uploads/2025/05/woocommerce.png',
    description: 'Empowering your online presence with a versatile and customizable platform for building websites and running e-commerce stores seamlessly.',
  },
  {
    name: 'GoDaddy',
    image: 'https://creo-elements.com/blogs/wp-content/uploads/2025/05/godaddy.png',
    description: 'Your go-to provider for domain registration, web hosting, and online marketing tools.',
  },
  {
    name: 'Airpay',
    image: 'https://creo-elements.com/blogs/wp-content/uploads/2025/05/airpay-1.png',
    description: 'Simplifying transactions with secure and seamless payment processing services.',
  },
  {
    name: 'Razorpay',
    image: 'https://creo-elements.com/blogs/wp-content/uploads/2026/01/Razorpay-Logo-removebg-preview.png',
    description: 'A secure and seamless payment gateway that helps businesses accept, process, and manage online payments with ease.',
  },
  {
    name: 'Shopify',
    image: 'https://creo-elements.com/blogs/wp-content/uploads/2025/05/shopify.png',
    description: 'Powering your e-commerce success with robust and easy-to-use online store solutions.',
  }
  
];

export const Partners = () => {
  return (
    <div className="partners-container full-width">
      <div className="partners-container-inner">
        <h2 className="partner-header">Affiliates & Partners</h2>
        <div className="partner-body">
          {partnersData.map((partner, index) => (
            <div className="partner" key={index}>
              <img src={partner.image} className="partner-image" alt={`${partner.name} Logo`} />
              <div className="partner-name">{partner.name}</div>
              <div className="partner-description">{partner.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
