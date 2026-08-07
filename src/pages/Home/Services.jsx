// import React, { useRef, useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import './Service.css';


// const servicesData = [
//   {
//     title: "Social Media Management",
//     image: "/images/social-media.webp",
//     description: "Enhance brand engagement with expert social media strategies. We manage your presence across platforms, ensuring optimal audience reach.",
//     link: "/services/social-media",
//   },
//   {
//     title: "Web Design & Development",
//     image: "/images/web-design.webp",
//     description: "Your website is your brand's digital storefront. We build user-friendly, fast, and SEO-optimized websites that align with your business goals.",
//     link: "/services/web-development",
//   },
//   {
//     title: "SEO & Search Visibility",
//     image: "/images/seo.webp",
//     description: "Boost organic traffic with cutting-edge SEO techniques. Our strategies improve search rankings and ensure long-term visibility for your brand.",
//     link: "/services/seo",
//   },
//   {
//     title: "Digital Marketing Solutions",
//     image: "/images/digital-marketing.webp",
//     description: "Drive conversions with data-driven digital marketing campaigns. We focus on ROI-driven strategies to maximize your online impact.",
//     link: "/services/digital-marketing",
//   },
//   {
//     title: "Brand Identity & Positioning",
//     image: "/images/branding.webp",
//     description: "Strengthen your brand presence with compelling storytelling and strategic positioning. We craft unique brand identities that stand out.",
//     link: "/services/branding",
//   },
//   {
//     title: "Performance Marketing",
//     image: "/images/target-marketing.webp",
//     description: "Maximize returns with performance-driven marketing strategies. We focus on measurable growth and targeted campaign execution.",
//     link: "/services/performance-marketing",
//   },
//   {
//     title: "Creative Packaging Design",
//     image: "/images/packaging.webp",
//     description: "Transform packaging into an effective marketing tool. Our innovative packaging solutions enhance brand perception and consumer appeal.",
//     link: "/services/packaging",
//   },
//   {
//     title: "Corporate Gifting Solutions",
//     image: "/images/gifting-solutions.webp",
//     description: "Simplify corporate gifting with tailored solutions. We curate, customize, and deliver premium gifts that strengthen client relationships.",
//     link: "/services/gifting-solutions",
//   },
//   {
//     title: "Premium Print Solutions",
//     image: "/images/print-solutions.webp",
//     description: "Ensure high-quality prints with our end-to-end printing services. From brochures to business cards, we offer seamless print solutions.",
//     link: "/services/print-solutions",
//   },
//   {
//     title: "Professional Photography",
//     image: "/images/photography.webp",
//     description: "Capture stunning visuals that define your brand. Our professional photography services enhance brand storytelling and engagement.",
//     link: "/services/photography",
//   },
//   {
//     title: "Public Relations & Media",
//     image: "/images/pr.webp",
//     description: "Shape public perception with strategic PR campaigns. We craft compelling narratives that build trust and enhance brand reputation.",
//     link: "/services/pr",
//   },
// ];

// export const Services = () => {
//   const sectionRef = useRef(null);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const cardsRef = useRef([]);

//   useEffect(() => {
//     // Responsive perspective for mobile
//     const isMobile = window.matchMedia('(max-width: 900px)').matches;
//     cardsRef.current.forEach((card, index) => {
//       gsap.to(card, {
//         scrollTrigger: {
//           trigger: card,
//           start: "top 150%",
//           end: "top 75%",
//           scrub: true,
//           markers: false, // set to true for debugging
//           onUpdate: (self) => {
//             // Update active index based on scroll position
//             if (self.progress > 0.5) {
//               setActiveIndex(index);
//             }
//           }
//         },
//         opacity: 1,
//         y: 0,
//         rotationX: isMobile ? 0 : 0,
//         transformOrigin: "top center",
//         transformPerspective: isMobile ? 1200 : 800,
//         ease: "none"
//       });

//       // Set initial state
//       gsap.set(card, {
//         opacity: 1,
//         y: 100,
//         rotationX: isMobile ? 0 : 90,
//         transformPerspective: isMobile ? 1200 : 800
//       });
//     });

//     // Clean up ScrollTrigger instances on unmount
//     return () => {
//       ScrollTrigger.getAll().forEach(trigger => trigger.kill());
//     };
//   }, []);

//   return (
//     <section className="services-section" ref={sectionRef}>
//       <div className="services-header">
//         <h2 className="services-heading">Our Expertise</h2>
//         <p className="services-subtext">
//           Discover our range of professional services designed to elevate your brand.
//         </p>
//       </div>
//       <div className="services-container">
//         <div className="service-cards-wrapper">
//           {servicesData.map((service, index) => (
//             <div
//               ref={el => cardsRef.current[index] = el}
              
//               className={`service-card-link clickable ${index === activeIndex ? 'active' : ''}`}
//               key={index}
//               style={{
//                 '--card-index': index,
//                 position: 'sticky',
//                 top: `calc(6rem + 60px + (${index} * 15px))`
//               }}
//             >
//               <div className="service-card horizontal-card">
//                 <div className="service-card-image large-left-image">
//                   <img src={service.image} alt={service.title} loading="lazy" />
//                 </div>
//                 <div className="service-card-content right-content">
//                   <h3 className="service-card-title">{service.title}</h3>
//                   <p className="service-card-description">{service.description}</p>
//                   <Link to={service.link} className="service-card-link-button">
//                     Learn More 
                   
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           ))}
//           <div className='service-cards-wrapper-overlay'></div>
//         </div>
//       </div>
//     </section>
//   );
// };


import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Service.css';

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
    {
    title: "Professional Photography",
    image: "/images/photography.webp",
    description: "Capture stunning visuals that define your brand. Our professional photography services enhance brand storytelling and engagement.",
    link: "/services/photography",
  },
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
    title: "Public Relations & Media",
    image: "/images/pr.webp",
    description: "Shape public perception with strategic PR campaigns. We craft compelling narratives that build trust and enhance brand reputation.",
    link: "/services/pr",
  },
];

const DIAL_RADIUS = 25;
const DIAL_CIRCUMFERENCE = 2 * Math.PI * DIAL_RADIUS;

export const Services = () => {
  const sectionRef = useRef(null);
  const trackRefs = useRef([]);
  const indicatorRef = useRef(null);
  const stageRef = useRef(null);
  const imageMaskRef = useRef(null);
  const dialRef = useRef(null);
  const headerRef = useRef(null);
  const mobileCardsRef = useRef([]);

  const [activeIndex, setActiveIndex] = useState(0);
  const total = servicesData.length;
  const active = servicesData[activeIndex];

  // Entrance + scroll-linked index tracking
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mm = gsap.matchMedia();

    if (reduceMotion) {
      gsap.set(headerRef.current, { opacity: 1, y: 0 });
    } else {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 85%' },
        }
      );
    }

    mm.add('(min-width: 901px)', () => {
      const triggers = trackRefs.current.map((item, i) => {
        if (!item) return null;
        return ScrollTrigger.create({
          trigger: item,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => setActiveIndex(i),
          onEnterBack: () => setActiveIndex(i),
        });
      });
      return () => triggers.forEach((t) => t && t.kill());
    });

    mm.add('(max-width: 900px)', () => {
      if (reduceMotion) {
        mobileCardsRef.current.forEach((card) => card && gsap.set(card, { opacity: 1, y: 0 }));
        return;
      }
      mobileCardsRef.current.forEach((card) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: { trigger: card, start: 'top 88%' },
          }
        );
      });
    });

    return () => mm.revert();
  }, []);

  // Slide the rail indicator + sweep the progress dial to match the active row
  useEffect(() => {
    const el = trackRefs.current[activeIndex];
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (el && indicatorRef.current) {
      const vars = { y: el.offsetTop, height: el.offsetHeight };
      reduceMotion
        ? gsap.set(indicatorRef.current, vars)
        : gsap.to(indicatorRef.current, { ...vars, duration: 0.45, ease: 'power3.out' });
    }

    if (dialRef.current) {
      const progress = total > 1 ? activeIndex / (total - 1) : 1;
      const offset = DIAL_CIRCUMFERENCE * (1 - progress);
      reduceMotion
        ? gsap.set(dialRef.current, { strokeDashoffset: offset })
        : gsap.to(dialRef.current, { strokeDashoffset: offset, duration: 0.6, ease: 'power3.out' });
    }
  }, [activeIndex, total]);

  // Mask-wipe the stage image and stagger the copy in on change
  useEffect(() => {
    if (!stageRef.current) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lines = stageRef.current.querySelectorAll('.reveal-line');

    if (reduceMotion) {
      gsap.set(imageMaskRef.current, { clipPath: 'inset(0 0% 0 0)' });
      gsap.set(lines, { opacity: 1, y: 0 });
      return;
    }

    const tl = gsap.timeline();
    tl.fromTo(
      imageMaskRef.current,
      { clipPath: 'inset(0 100% 0 0)' },
      { clipPath: 'inset(0 0% 0 0)', duration: 0.6, ease: 'power3.inOut' }
    ).fromTo(
      lines,
      { y: 18, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.45, stagger: 0.06, ease: 'power2.out' },
      '-=0.3'
    );
  }, [activeIndex]);

  const goTo = (index) => {
    trackRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <section className="services-section" ref={sectionRef}>
      <div className="services-header" ref={headerRef}>
        <span className="services-eyebrow">What we do</span>
        <h2 className="services-heading">Our Expertise</h2>
        <p className="services-subtext">
          Discover our range of professional services designed to elevate your brand.
        </p>
      </div>

      {/* Ticker strip — signature texture element */}
      <div className="services-ticker" aria-hidden="true">
        <div className="ticker-track">
          {[...servicesData, ...servicesData].map((s, i) => (
            <span className="ticker-item" key={`${s.title}-${i}`}>
              {s.title}
              <span className="ticker-dot">•</span>
            </span>
          ))}
        </div>
      </div>

      {/* Desktop / tablet: scroll-linked index + sticky docket */}
      <div className="services-stage-wrapper">
        <div className="services-track">
          <div className="track-indicator" ref={indicatorRef}></div>
          {servicesData.map((service, index) => (
            <div
              key={service.title}
              ref={(el) => (trackRefs.current[index] = el)}
              className={`track-item ${index === activeIndex ? 'active' : ''}`}
              onClick={() => goTo(index)}
            >
              <span className="track-index">{String(index + 1).padStart(2, '0')}</span>
              <span className="track-title">{service.title}</span>
              <span className="track-arrow" aria-hidden="true">→</span>
            </div>
          ))}
        </div>

        <div className="services-stage">
          <div className="stage-inner" ref={stageRef}>
            <div className="stage-image-wrap">
              <div className="stage-image-mask" ref={imageMaskRef}>
                <img src={active.image} alt={active.title} loading="lazy" />
              </div>
              <div className="stage-scrim" aria-hidden="true"></div>

              <svg className="stage-dial" viewBox="0 0 60 60" aria-hidden="true">
                <circle className="dial-track" cx="30" cy="30" r={DIAL_RADIUS} />
                <circle
                  className="dial-progress"
                  ref={dialRef}
                  cx="30"
                  cy="30"
                  r={DIAL_RADIUS}
                  style={{ strokeDasharray: DIAL_CIRCUMFERENCE }}
                />
                <text x="30" y="34" textAnchor="middle" className="dial-label">
                  {String(activeIndex + 1).padStart(2, '0')}
                </text>
              </svg>
            </div>

            <div className="stage-body">
              <span className="stage-count reveal-line">
                {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </span>
              <h3 className="stage-title reveal-line">{active.title}</h3>
              <p className="stage-description reveal-line">{active.description}</p>
              <Link to={active.link} className="stage-cta reveal-line">
                <span>Learn More</span>
                <span className="stage-cta-arrow" aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          <div className="stage-nav" aria-hidden="true">
            <button
              type="button"
              className="stage-nav-btn"
              disabled={activeIndex === 0}
              onClick={() => goTo(Math.max(0, activeIndex - 1))}
              aria-label="Previous service"
            >
              ↑
            </button>
            <button
              type="button"
              className="stage-nav-btn"
              disabled={activeIndex === total - 1}
              onClick={() => goTo(Math.min(total - 1, activeIndex + 1))}
              aria-label="Next service"
            >
              ↓
            </button>
          </div>
        </div>
      </div>

      {/* Mobile: reveal cards */}
      <div className="services-mobile-list">
        {servicesData.map((service, index) => (
          <div
            key={service.title}
            ref={(el) => (mobileCardsRef.current[index] = el)}
            className="mobile-service-card"
          >
            <div className="mobile-service-image">
              <img src={service.image} alt={service.title} loading="lazy" />
              <span className="mobile-service-index">{String(index + 1).padStart(2, '0')}</span>
            </div>
            <div className="mobile-service-body">
              <h3 className="mobile-service-title">{service.title}</h3>
              <p className="mobile-service-description">{service.description}</p>
              <Link to={service.link} className="mobile-service-cta">
                <span>Learn More</span>
                <span className="stage-cta-arrow" aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};