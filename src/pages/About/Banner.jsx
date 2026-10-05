import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { PageHeroBanner } from '../../components/Gsap/PageHeroBanner';

export const Banner = () => {
  const marqueeRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
       gsap.to(marqueeRef.current, {
        xPercent: -50,
        repeat: -1,
        duration: 28,
        ease: 'none',
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative w-full lg-h-screen  overflow-hidden flex flex-col justify-center items-center select-none">
      
      
       <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 overflow-hidden pointer-events-none opacity-[0.045] whitespace-nowrap z-0">
        <div
          ref={marqueeRef}
          className="inline-block    text-[14vw] font-bold uppercase tracking-widest text-btnPrimary will-change-transform"
        >
          Creo Elements — Digital Architecture — Creative Engineering — Creo Elements — Digital Architecture — Creative Engineering —{' '}
        </div>
      </div>

       <div className="relative z-10 w-full">
        <PageHeroBanner
          title="We Craft Digital"
          highlightTitle="Experiences"
          description="Founded in 2021, we turn ideas into impactful digital work through design, strategy, and creative thinking."
        />
      </div>
    </div>
  );
};