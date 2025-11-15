import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Service.css';


const servicesData = [
  {
    title: "Social Media Management",
    image: "/images/social-media.webp",
    description: "Enhance brand engagement with expert social media strategies. We manage your presence across platforms, ensuring optimal audience reach.",
    link: "/services/social-media",
  },
  {
    title: "Web Design & Development",
    image: "/images/web-design.webp",
    description: "Your website is your brand's digital storefront. We build user-friendly, fast, and SEO-optimized websites that align with your business goals.",
    link: "/services/web-development",
  },
  {
    title: "SEO & Search Visibility",
    image: "/images/seo.webp",
    description: "Boost organic traffic with cutting-edge SEO techniques. Our strategies improve search rankings and ensure long-term visibility for your brand.",
    link: "/services/seo",
  },
  {
    title: "Digital Marketing Solutions",
    image: "/images/digital-marketing.webp",
    description: "Drive conversions with data-driven digital marketing campaigns. We focus on ROI-driven strategies to maximize your online impact.",
    link: "/services/digital-marketing",
  },
  {
    title: "Brand Identity & Positioning",
    image: "/images/branding.webp",
    description: "Strengthen your brand presence with compelling storytelling and strategic positioning. We craft unique brand identities that stand out.",
    link: "/services/branding",
  },
  {
    title: "Performance Marketing",
    image: "/images/target-marketing.webp",
    description: "Maximize returns with performance-driven marketing strategies. We focus on measurable growth and targeted campaign execution.",
    link: "/services/performance-marketing",
  },
  {
    title: "Creative Packaging Design",
    image: "/images/packaging.webp",
    description: "Transform packaging into an effective marketing tool. Our innovative packaging solutions enhance brand perception and consumer appeal.",
    link: "/services/packaging",
  },
  {
    title: "Corporate Gifting Solutions",
    image: "/images/gifting-solutions.webp",
    description: "Simplify corporate gifting with tailored solutions. We curate, customize, and deliver premium gifts that strengthen client relationships.",
    link: "/services/gifting-solutions",
  },
  {
    title: "Premium Print Solutions",
    image: "/images/print-solutions.webp",
    description: "Ensure high-quality prints with our end-to-end printing services. From brochures to business cards, we offer seamless print solutions.",
    link: "/services/print-solutions",
  },
  {
    title: "Professional Photography",
    image: "/images/photography.webp",
    description: "Capture stunning visuals that define your brand. Our professional photography services enhance brand storytelling and engagement.",
    link: "/services/photography",
  },
  {
    title: "Public Relations & Media",
    image: "/images/pr.webp",
    description: "Shape public perception with strategic PR campaigns. We craft compelling narratives that build trust and enhance brand reputation.",
    link: "/services/pr",
  },
];

export const Services = () => {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const cardsRef = useRef([]);

  useEffect(() => {
    // Responsive perspective for mobile
    const isMobile = window.matchMedia('(max-width: 900px)').matches;
    cardsRef.current.forEach((card, index) => {
      gsap.to(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 150%",
          end: "top 75%",
          scrub: true,
          markers: false, // set to true for debugging
          onUpdate: (self) => {
            // Update active index based on scroll position
            if (self.progress > 0.5) {
              setActiveIndex(index);
            }
          }
        },
        opacity: 1,
        y: 0,
        rotationX: isMobile ? 0 : 0,
        transformOrigin: "top center",
        transformPerspective: isMobile ? 1200 : 800,
        ease: "none"
      });

      // Set initial state
      gsap.set(card, {
        opacity: 1,
        y: 100,
        rotationX: isMobile ? 0 : 90,
        transformPerspective: isMobile ? 1200 : 800
      });
    });

    // Clean up ScrollTrigger instances on unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section className="services-section" ref={sectionRef}>
      <div className="services-header">
        <h2 className="services-heading">Our Expertise</h2>
        <p className="services-subtext">
          Discover our range of professional services designed to elevate your brand.
        </p>
      </div>
      <div className="services-container">
        <div className="service-cards-wrapper">
          {servicesData.map((service, index) => (
            <div
              ref={el => cardsRef.current[index] = el}
              
              className={`service-card-link clickable ${index === activeIndex ? 'active' : ''}`}
              key={index}
              style={{
                '--card-index': index,
                position: 'sticky',
                top: `calc(6rem + 60px + (${index} * 15px))`
              }}
            >
              <div className="service-card horizontal-card">
                <div className="service-card-image large-left-image">
                  <img src={service.image} alt={service.title} loading="lazy" />
                </div>
                <div className="service-card-content right-content">
                  <h3 className="service-card-title">{service.title}</h3>
                  <p className="service-card-description">{service.description}</p>
                  <Link to={service.link} className="service-card-link-button">
                    Learn More 
                   
                  </Link>
                </div>
              </div>
            </div>
          ))}
          <div className='service-cards-wrapper-overlay'></div>
        </div>
      </div>
    </section>
  );
};