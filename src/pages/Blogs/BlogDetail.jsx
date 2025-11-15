import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import WavyText from '../../components/elements/WavyText';
import { Grids } from '../../components/Grids';
import './Blogs.css';

export const BlogDetail = () => {
  const { blogId } = useParams();
  const [blogPost, setBlogPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 825);
  let formattedTitle = '';

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 825);
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const response = await fetch(`https://backend.creo-elements.com/reactblog/`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        
        // Find the specific post using the blogId
        const post = data.find(item => item.id === parseInt(blogId));
        setBlogPost(post);
      } catch (error) {
        console.error('Error fetching blog post:', error);
      } finally {
        setLoading(false);
      }
    };

    if (blogId) {
      fetchPostDetail();
    }
  }, [blogId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!blogPost) {
    return <div>Blog post not found!</div>;
  }

  // Extracting data from the blogPost object
  const { title, acf_fields, yoast_meta, link } = blogPost;
  console.log(blogPost)
  // Adjust title with manual line breaks
  const addManualBreaks = (text, charsPerLine = 15) => {
    const words = text.split(' ');
    let line = '';
    let result = '';
    words.forEach(word => {
      if ((line + word).length > charsPerLine) {
        result += line.trim() + '<br>';
        line = word + ' ';
      } else {
        line += word + ' ';
      }
    });
    return result + line.trim();
  };

  // Set formattedTitle based on screen size
  formattedTitle = isMobile ? addManualBreaks(title, 16) : addManualBreaks(title, 30);

  // Determine meta description, prioritizing `yoast_meta.seo_description`
  let metaDescription = '';
  if (yoast_meta?.seo_description && yoast_meta?.seo_description !== "") {
    metaDescription = yoast_meta.seo_description;
  } else {
    metaDescription = 'Default description if nothing is available';  // Fallback to default
  }

  // Set the title in the Helmet based on `yoast_meta.seo_title`
  return (
    <div className="blog-detail">
      {/* Helmet component to manage SEO */}
      <Helmet>
        <title>{yoast_meta?.seo_title || title}</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={yoast_meta?.focus_keyword || ''} />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={yoast_meta?.seo_title || title} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={acf_fields?.featured_image || 'default-image-url'} />
        <meta property="og:url" content={link} />
        <meta property="og:type" content="article" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={yoast_meta?.seo_title || title} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={acf_fields?.featured_image || 'default-image-url'} />
        
        {/* Canonical Link */}
        <link rel="canonical" href={link} />
        
        {/* Structured Data (JSON-LD) for SEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": title,
            "description": metaDescription,
            "image": acf_fields?.featured_image || 'default-image-url',
            "url": link,
            "author": {
              "@type": "Person",
              "name": "Creo Elements"  // Replace with actual author if available
            },
            "publisher": {
              "@type": "Organization",
              "name": "Creo Elements LLP",
              "logo": "https://creo-elements.com/images/logo.png"
            },
            "datePublished": acf_fields?.publish_date || new Date().toISOString(),
            "dateModified": acf_fields?.modified_date || new Date().toISOString()
          })}
        </script>
      </Helmet>

      <Grids className='grid-1' />
      <div className='z-2 blog-page-wrapper'>
        {/* Use dangerouslySetInnerHTML within WavyText */}
        <div className="title-wrapper">
          {isMobile ? (
            <WavyText fontSize="2rem">{formattedTitle}</WavyText>
          ) : (
            <WavyText fontSize="4rem">{formattedTitle}</WavyText>
          )}
        </div>

        {acf_fields?.featured_image && (
          <img src={acf_fields?.featured_image} alt={title} />
        )}

        <div dangerouslySetInnerHTML={{ __html: acf_fields?.blog_content }} />
      </div>
    </div>
  );
};
