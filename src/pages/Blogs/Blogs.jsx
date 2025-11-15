import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import WavyText from '../../components/elements/WavyText';
import { Grids } from '../../components/Grids';
import './Blogs.css';
import { Blogcard } from './Blogcard';
import { Helmet } from 'react-helmet-async';

export const Blogs = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://backend.creo-elements.com/reactblog/');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);



  const [isMobile, setIsMobile] = useState(window.innerWidth < 825);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 825);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);


  if (loading) {
    return (
      <div className='blogs-page'>
        <Helmet>
          <title>Blogs | Creo Elements LLP</title>
          <meta
            name="description"
            content="Explore the latest blog posts from Creo Elements LLP on digital marketing, SEO, web design, branding, and more. Get insights and tips to help grow your business in the digital space."
          />
          <meta property="og:title" content="Blogs | Creo Elements LLP" />
          <meta
            property="og:description"
            content="Explore the latest blog posts from Creo Elements LLP on digital marketing, SEO, web design, branding, and more. Get insights and tips to help grow your business in the digital space."
          />
          <meta property="og:image" content="https://creo-elements.com/images/blogs-banner.webp" />
          <meta property="og:url" content="https://creo-elements.com/blogs" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Blogs | Creo Elements LLP" />
          <meta
            name="twitter:description"
            content="Explore the latest blog posts from Creo Elements LLP on digital marketing, SEO, web design, branding, and more. Get insights and tips to help grow your business in the digital space."
          />
          <meta name="twitter:image" content="https://creo-elements.com/images/blogs-banner.webp" />
          <link rel="canonical" href="https://creo-elements.com/blogs" />

          {/* Structured Data (JSON-LD) */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Blog",
              "name": "Blogs | Creo Elements LLP",
              "url": "https://creo-elements.com/blogs",
              "logo": "https://creo-elements.com/images/logo.png",
              "description": "Explore the latest blog posts from Creo Elements LLP on digital marketing, SEO, web design, branding, and more. Get insights and tips to help grow your business in the digital space.",
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "https://creo-elements.com/blogs"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Creo Elements LLP",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://creo-elements.com/images/logo.png"
                }
              }
            })}
          </script>
        </Helmet>
        <Grids className='grid-1' />
        <div className='blogs-page-wrapper z-2'>
          {isMobile ? <WavyText fontSize="4rem">Blogs</WavyText> : <WavyText fontSize="8rem">Blogs</WavyText>}

          <div className="blog-grid">
            Loading...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='blogs-page'>
      <Helmet>
        <title>Blogs | Creo Elements LLP</title>
        <meta
          name="description"
          content="Explore the latest blog posts from Creo Elements LLP on digital marketing, SEO, web design, branding, and more. Get insights and tips to help grow your business in the digital space."
        />
        <meta property="og:title" content="Blogs | Creo Elements LLP" />
        <meta
          property="og:description"
          content="Explore the latest blog posts from Creo Elements LLP on digital marketing, SEO, web design, branding, and more. Get insights and tips to help grow your business in the digital space."
        />
        <meta property="og:image" content="https://creo-elements.com/images/blogs-banner.webp" />
        <meta property="og:url" content="https://creo-elements.com/blogs" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Blogs | Creo Elements LLP" />
        <meta
          name="twitter:description"
          content="Explore the latest blog posts from Creo Elements LLP on digital marketing, SEO, web design, branding, and more. Get insights and tips to help grow your business in the digital space."
        />
        <meta name="twitter:image" content="https://creo-elements.com/images/blogs-banner.webp" />
        <link rel="canonical" href="https://creo-elements.com/blogs" />

        {/* Structured Data (JSON-LD) */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Blogs | Creo Elements LLP",
            "url": "https://creo-elements.com/blogs",
            "logo": "https://creo-elements.com/images/logo.png",
            "description": "Explore the latest blog posts from Creo Elements LLP on digital marketing, SEO, web design, branding, and more. Get insights and tips to help grow your business in the digital space.",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://creo-elements.com/blogs"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Creo Elements LLP",
              "logo": {
                "@type": "ImageObject",
                "url": "https://creo-elements.com/images/logo.png"
              }
            }
          })}
        </script>
      </Helmet>

      <Grids className='grid-1' />
      <div className='blogs-page-wrapper z-2'>
        <div className="blogs-heading">
          {isMobile ? <WavyText fontSize="4rem">Blogs</WavyText> : <WavyText fontSize="8rem">Blogs</WavyText>}
        </div>
        <div className="blog-grid">
          {posts.map((post) => (
            <Blogcard
              key={post.id}
              id={post.id}
              title={post.title} // Adjusted to match your JSON
              content={post.acf_fields.blog_content} // Using ACF field
              featuredImage={post.acf_fields.featured_image} // Adjusted to your ACF featured image URL
            />
          ))}
        </div>
      </div>
    </div>
  );
};
