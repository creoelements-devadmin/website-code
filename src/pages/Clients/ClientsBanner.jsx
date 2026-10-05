import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { PageHeroBanner } from '../../components/Gsap/PageHeroBanner';

export const ClientsBanner = () => {
  const containerRef = useRef(null);
  const pillsRef = useRef([]);

 const info = [
  { name: "50+ Brands" },
  { name: "100+ Projects" },
   { name: "360° Solutions" },
  { name: "Multiple Sectors" },
  { name: "10+ Core Services" },
  { name: "Creative Ideas" },
  { name: "30+ Websites" },
];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered rise-in for pills
      gsap.fromTo(
        pillsRef.current,
        { y: 30, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.9, ease: 'power3.out', stagger: 0.15, delay: 0.4, }
      );

      // Gentle continuous pulse on the dots
      pillsRef.current.forEach((pill) => {
        const dot = pill?.querySelector('.pulse-dot');
        if (!dot) return;
        gsap.to(dot, {scale: 1.6,opacity: 0.4,duration: 1.2,ease: 'power1.inOut',repeat: -1,yoyo: true,});
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-auto bg-white  ">
      <PageHeroBanner
        title="Brands That Trust"
        highlightTitle="Creo Elements"
        description="We help brands build strong digital identities and grow online with creative, results-driven solutions."
      />

      <div className="flex w-full flex-wrap items-center max-w-4xl  justify-center gap-4 px-6 pb-16 lg:absolute lg:bottom-[0%] lg:left-1/2 lg:-translate-x-1/2 md:gap-6 md:pb-0">
        {info.map((item, index) => (
          <span
            key={index}
            ref={(el) => (pillsRef.current[index] = el)}
            className="flex items-center gap-3 rounded-full border border-gray-200 bg-white px-6 py-4 text-sm font-medium text-btnPrimary shadow-sm transition-shadow duration-300 hover:shadow-md md:text-base"
          >
            <span className="relative flex h-2 w-2 shrink-0 items-center justify-center">
              <span className="pulse-dot absolute h-2 w-2 rounded-full bg-primary" />
              <span className="h-2 w-2 rounded-full bg-primary" />
            </span>
            {item.name}
          </span>
        ))}
      </div>
    </div>
  );
};