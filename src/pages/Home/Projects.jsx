import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionHeading } from '../../components/Gsap/SectionHeading';

gsap.registerPlugin(ScrollTrigger);

 

const Projects = () => {
  const containerRef = useRef(null);
  const textRef = useRef([]);
  const cardRef = useRef([]);

  useEffect(() => {
    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      // Detect touch/mobile once, tune values accordingly
      mm.add(
        {
          isMobile: '(max-width: 767px)',
          isDesktop: '(min-width: 768px)',
        },
        (context) => {
          const { isMobile } = context.conditions;

          cardRef.current.forEach((card, i) => {
            const text = textRef.current[i];
            const target = [card, text].filter(Boolean);
            if (!target.length) return;

            

             const innerImage = card.querySelector('.parallax-inner');
            if (innerImage) {
              gsap.set(innerImage, { force3D: true, willChange: 'transform' });

              gsap.to(innerImage, {
                yPercent: isMobile ? -15 : -25,  ease: 'none',                      force3D: true, overwrite: 'auto',
                scrollTrigger: {
                  trigger: card,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: isMobile ? 0.3 : 1,
                  invalidateOnRefresh: true,
                },
              });
            }
          });

          // cleanup for this matchMedia context
          return () => {};
        }
      );
    }, containerRef);

    return () => {
      ctx.revert();
      mm.revert();
    };
  }, []);

  const projectData = [
    { 
      id: '01', name: 'Little Things Cute',
       url: 'https://littlethingscute.com/', 
       image: 'https://creo-elements.com/blogs/wp-content/uploads/2026/10/ltc.png', 
       category: 'E-commerce' },
    { 
      id: '02', name: 'Atul Kasbekar',
       url: 'https://atulkasbekar.com/', 
       image: 'https://creo-elements.com/blogs/wp-content/uploads/2026/10/atul.png', 
       category: 'Photographer' },
    { 
      id: '03', name: 'DBS Cricket',
       url: 'https://dbscricket.org/', 
       image: 'https://creo-elements.com/blogs/wp-content/uploads/2026/10/db.png', 
       category: 'Cricket' },
    { 
      id: '04', name: 'IVCCI',
       url: 'https://ivcci.org.in/', 
       image: 'https://creo-elements.com/blogs/wp-content/uploads/2026/10/ivcci.png', 
       category: 'Organization' },
    { 
      id: '05', name: 'Artangle90',
       url: 'https://artangle90.com/', 
       image: 'https://creo-elements.com/blogs/wp-content/uploads/2026/10/art90.png', 
       category: 'E-commerce' },
    { 
      id: '06', name: 'House of eekkta',
       url: 'https://www.houseofeekkta.com/', 
       image: 'https://creo-elements.com/blogs/wp-content/uploads/2026/10/ekta.png', 
       category: 'Fashion Services' },
  ];

  return (
    <section ref={containerRef} id="work" className="w-full md:py-24">
      <div className="w-full">
        <SectionHeading
          tag="Our Work"
          title="Projects"
          highlight="That Perform"
          text="A selection of digital experiences we’ve designed and developed for brands, creators, organizations, and growing businesses."
        />
      </div>

      <div className="mt-16 grid grid-cols-1 gap-5 px-3 md:px-5 lg:px-10 md:grid-cols-2 xl:grid-cols-3">
        {projectData.map((item, index) => (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            ref={(el) => (cardRef.current[index] = el)}
            className="group relative flex flex-col     overflow-hidden rounded-4xl border-2 border-gray-200 bg-white backdrop-blur-sm transition-all duration-500 hover:-translate-y-5 hover:shadow-xl"
           >
            <div className="relative h-80 2xl:h-96 w-full  overflow-hidden">
              <img
                className="parallax-inner project-img absolute inset-0 h-[130%] w-full object-cover"
                src={item.image}
                alt={item.name}
                loading="lazy"
                style={{ willChange: 'transform', backfaceVisibility: 'hidden' }}
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/0 to-black/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <span className="absolute bottom-5 right-5 font-display text-4xl text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                {item.id}
              </span>
            </div>

            <div
              ref={(el) => (textRef.current[index] = el)}
              className="flex items-center justify-between px-7 py-3"
            >
              <div>
                <h3 className="text-xl font-medium tracking-tight text-btnPrimary transition-colors duration-300 group-hover:text-primary">
                  {item.name}
                </h3>
                <span className="rounded-full py-1 text-xs font-medium uppercase italic tracking-wide text-primary">
                  {item.category}
                </span>
              </div>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-300 text-btnPrimary transition-all duration-500 group-hover:rotate-45 group-hover:border-primary group-hover:text-primary">
                ↗
              </span>
            </div>

          </a>
        ))}
      </div>
    </section>
  );
};

export default Projects;