import React, { useRef, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeading } from "../../components/Gsap/SectionHeading";
import { Button } from "../../components/Button";
import { servicesData as serviceRegistry } from "../../data/ServiceData";
 
gsap.registerPlugin(ScrollTrigger);

const servicesData = [
  {
    title: 'Website Design and Development',
    image: 'https://creo-elements.com/blogs/wp-content/uploads/2026/10/web.png',
    description:
      'Strategic, responsive websites that combine distinctive design, intuitive user experiences and reliable technology to help businesses grow.',
    tags: ['Web Development', 'UI/UX Web Design', 'Responsive Websites', 'Performance Optimization'],
    link: '/services/website-design-development',
  },
  {
    title: 'E-commerce Website Development',
    image: 'https://creo-elements.com/blogs/wp-content/uploads/2026/10/E-com.png',
    description:
      'Customer-focused online stores designed to make discovering products, building trust and completing purchases feel effortless.',
    tags: ['Online Store Design', 'Product UX', 'Checkout Experience', 'E-commerce Growth'],
    link: '/services/ecommerce-website-development',
  },
  {
    title: 'Search Engine Optimisation (SEO)',
    image: 'https://creo-elements.com/blogs/wp-content/uploads/2026/10/seo.png',
    description:
      'Sustainable SEO strategies that improve search visibility, attract relevant audiences and support long-term organic growth.',
    tags: ['Search Engine Optimization', 'Technical SEO', 'Keyword Strategy', 'Organic Rankings'],
    link: '/services/search-engine-optimisation',
  },
  {
    title: 'Social Media Management',
    image: 'https://creo-elements.com/blogs/wp-content/uploads/2026/10/socal.png',
    description:
      'Thoughtful strategies and consistent creative content that keep brands relevant, recognisable and connected to their audiences.',
    tags: ['Social Media Marketing', 'Content Strategy', 'Community Management', 'Social Growth'],
    link: '/services/social-media-management',
  },
  {
    title: 'Branding and Brand Identity',
    image: 'https://creo-elements.com/blogs/wp-content/uploads/2026/10/brand.png',
    description:
      'Distinctive brand identities shaped through thoughtful strategy, visual clarity and a language your audience can recognise.',
    tags: ['Brand Strategy', 'Logo Design', 'Visual Identity', 'Brand Positioning'],
    link: '/services/branding-brand-identity',
  },
  {
    title: 'Performance Marketing',
    image: 'https://creo-elements.com/blogs/wp-content/uploads/2026/10/markting.png',
    description:
      'Focused digital advertising campaigns designed to reach relevant audiences, generate meaningful actions and improve marketing efficiency.',
    tags: ['Google Ads', 'Meta Ads', 'Paid Media', 'Campaign Optimization'],
    link: '/services/performance-marketing',
  },
  {
    title: 'Product Photography and Creative Shoots',
    image: 'https://creo-elements.com/blogs/wp-content/uploads/2026/10/Photography.png',
    description:
      'Thoughtfully planned product imagery created for websites, marketplaces, catalogues, campaigns and social media.',
    tags: ['Commercial Photography', 'Product Shoots', 'E-commerce Photos', 'Editorial Visuals'],
    link: '/services/product-photography',
  },
  {
    title: 'Graphic Design',
    image: 'https://creo-elements.com/blogs/wp-content/uploads/2026/10/Graphica.png',
    description:
      'Clear, considered visual communication created for digital platforms, campaigns, presentations, packaging and print.',
    tags: ['Marketing Design', 'Brand Collateral', 'Campaign Creative', 'Visual Communication'],
    link: '/services/graphic-design',
  },
  {
    title: 'Corporate Gifting and Brand Merchandise',
    image: 'https://creo-elements.com/blogs/wp-content/uploads/2026/10/gift.png',
    description:
      'Considered corporate gifts and branded merchandise created for employees, clients, events and meaningful business occasions.',
    tags: ['Client Gifting', 'Executive Merchandise', 'Branded Gifts', 'Event Solutions'],
    link: '/services/corporate-gifting',
  },
];

const ORBIT_RADIUS = 480;
const ANGLE_STEP = 11;
const MAX_DELTA = 3;
const MOBILE_ORBIT_RADIUS = 320;
const MOBILE_ANGLE_STEP = 16;
const MOBILE_MAX_DELTA = 2.4;
const DESKTOP_MQ = "(min-width: 1024px)";
const serviceCategories = Object.fromEntries(
  serviceRegistry.map((service) => [service.name, service.category])
);

export const Services = () => {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const ringRef = useRef(null);
  const progressCircleRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);
  const dialItemsRef = useRef([]);
  const continuousRef = useRef(0);

  const [activeIndex, setActiveIndex] = useState(0);
  const total = servicesData.length;
  const activeService = servicesData[activeIndex];

  // Updates number dial: left-side orbit on desktop, top arc on mobile
  const updateDial = useCallback(
    (continuous) => {
      const isDesktop = window.matchMedia(DESKTOP_MQ).matches;
      const radius = isDesktop ? ORBIT_RADIUS : MOBILE_ORBIT_RADIUS;
      const angleStep = isDesktop ? ANGLE_STEP : MOBILE_ANGLE_STEP;
      const maxDelta = isDesktop ? MAX_DELTA : MOBILE_MAX_DELTA;

      for (let i = 0; i < total; i++) {
        const el = dialItemsRef.current[i];
        if (!el) continue;

        const delta = i - continuous;
        const absDelta = Math.abs(delta);

        if (absDelta > maxDelta + 0.5) {
          gsap.set(el, { autoAlpha: 0 });
          continue;
        }

        const angleRad = ((delta * angleStep) * Math.PI) / 180;
        const x = isDesktop ? -radius * (1 - Math.cos(angleRad)) : radius * Math.sin(angleRad);
        const y = isDesktop ? radius * Math.sin(angleRad) : -radius * (1 - Math.cos(angleRad));

        const progress = Math.max(0, 1 - absDelta / (maxDelta + 0.2));
        const opacity = Math.pow(progress, 1.6);
        const scale = 0.8 + 0.2 * Math.max(0, 1 - absDelta / 1.6);

        gsap.set(el, {
          x,
          y,
          scale,
          autoAlpha: opacity,
        });
      }
    },
    [total]
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      updateDial(0);

      // SVG progress stroke total length calculation
      const circleLength = 2 * Math.PI * 460;
      if (progressCircleRef.current) {
        gsap.set(progressCircleRef.current, {
          strokeDasharray: circleLength,
          strokeDashoffset: circleLength,
        });
      }

      ScrollTrigger.create({
        trigger: stageRef.current,
        start: "top top",
        end: () => `+=${(total - 1) * window.innerHeight * 0.9}`,
        pin: true,
        pinSpacing: true,
        scrub: 0.6,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const continuous = self.progress * (total - 1);
          continuousRef.current = continuous;
          updateDial(continuous);

          const isDesktop = window.matchMedia(DESKTOP_MQ).matches;
          const angleStep = isDesktop ? ANGLE_STEP : MOBILE_ANGLE_STEP;

          if (ringRef.current) {
            gsap.set(ringRef.current, {
              rotate: -continuous * angleStep,
              transformOrigin: "center center",
            });
          }

          // Progressively fill the border stroke with primary color
          if (progressCircleRef.current) {
            const offset = circleLength - self.progress * (circleLength * 0.35);
            gsap.set(progressCircleRef.current, { strokeDashoffset: offset });
          }

          const idx = Math.min(total - 1, Math.max(0, Math.round(continuous)));
          setActiveIndex((prev) => (prev === idx ? prev : idx));
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [total, updateDial]);

  // Smooth text & image transition on index change
  useEffect(() => {
    if (!contentRef.current) return;

    gsap.fromTo(
      contentRef.current.children,
      { opacity: 0, y: 24, filter: "blur(6px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.5, stagger: 0.05, ease: "power2.out",
      }
    );

    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0.4, scale: 0.94 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" }
      );
    }
  }, [activeIndex]);

  return (
    <section ref={sectionRef} className="relative w-full py-20     ">
       <SectionHeading
        tag="What we do"
        title="Everything your brand needs"
        highlight="to show up stronger."
        text="Strategy, creativity and execution brought together through one collaborative team."
      />
        
      <div
        ref={stageRef}
        className="relative h-screen w-full flex flex-col lg:flex-row items-center justify-between px-5 sm:px-12 lg:px-20 pt-16 pb-6 lg:py-0 overflow-hidden"
      >
        {/* ================= Dial & rotating orbit (top arc on mobile, left on desktop) ================= */}
        <div className="relative w-full lg:w-72 h-28 sm:h-36 lg:h-145 flex items-end lg:items-center justify-center lg:justify-start shrink-0">
          <div
            ref={ringRef}
            className="absolute left-1/2 -translate-x-1/2 bottom-7 w-160 h-160 lg:top-1/2 lg:bottom-auto  lg:-left-190 lg:translate-x-0 lg:-translate-y-1/2 lg:w-230 lg:h-230 pointer-events-none"
          >
            <svg className="w-full h-full -rotate-90" viewBox="0 0 920 920">
              <circle cx="460" cy="460" r="458" fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="1.5" />
              <circle ref={progressCircleRef} cx="460" cy="460" r="458" fill="none" stroke="#3EB8A2" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>

          <div className="relative w-full h-full">
            {servicesData.map((_, idx) => {
              const isActive = idx === activeIndex;
              return (
                <div
                  key={idx}
                  ref={(el) => (dialItemsRef.current[idx] = el)}
                  className="absolute left-1/2 bottom-0 -translate-x-1/2 lg:left-38 lg:top-1/2 lg:bottom-auto lg:translate-x-0 -translate-y-1/2 flex flex-col-reverse lg:flex-row items-center gap-1.5 lg:gap-3 will-change-transform"
                >
                  <span
                    className={`w-2 h-2 lg:w-2.5 lg:h-2.5 rounded-full bg-primary transition-all duration-300 ${
                      isActive ? "scale-100 opacity-100 shadow-[0_0_12px_#3EB8A2]" : "scale-0 opacity-0"
                    }`}
                  />
                  <span
                    className={` transition-all  duration-300 ease-in-out ${ isActive ? "text-primary font-medium text-4xl sm:text-5xl " : "text-btnPrimary/50 italic text-2xl sm:text-3xl " }`} >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= Editorial copy ================= */}
        <div
          ref={contentRef}
          className="w-full max-w-xl text-center lg:text-start mx-auto flex flex-col items-center lg:items-start justify-center px-1 lg:px-4 z-10 flex-1 lg:flex-none"
        >
          <h2 className=" text-[1.85rem] font-display sm:text-5xl lg:text-6xl text-btnPrimary font-normal leading-[1.08] tracking-tight mb-3 sm:mb-5">
            {activeService.title}
          </h2>

          <p className="mb-3 text-[10px] uppercase tracking-[0.18em] text-primary">
            {serviceCategories[activeService.title]}
          </p>

          <p className="text-neutral-600 text-[13px] sm:text-sm lg:text-base font-light leading-relaxed max-w-md lg:max-w-lg mb-5 sm:mb-8">
            {activeService.description}
          </p>

          <div className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-2.5 mb-5 sm:mb-8">
            {activeService.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] sm:text-xs font-normal text-neutral-600 bg-white border border-black/8 px-3.5 sm:px-4 py-3 rounded-full shadow-sm"
              >
                {tag}
              </span>
            ))}
          </div>


         <Button  target={activeService.link} name=" Explore service " />
        
        </div>

        {/* ================= 3D artwork — visible on mobile, right column on desktop ================= */}
        <div className="flex relative w-full lg:w-96 md:w-[80vw] h-[40vh] pb-10 lg:pb-0 min-h-45 max-h-96 lg:h-115 md:h-full lg:max-h-none lg:min-h-0 items-center justify-center shrink-0">
          <div
            ref={imageRef}
            className="w-full h-full   flex items-center justify-center will-change-transform"
          >
            <img
              src={activeService.image}
              alt={activeService.title}
              className="max-h-full w-full object-contain lg:object-cover drop-shadow-[0_20px_35px_rgba(0,0,0,0.06)] pointer-events-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
};