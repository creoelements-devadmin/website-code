import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const PageHeroBanner = ({
   title = " ",
  highlightTitle = " ",
  description = "",
  fullHeight = true,
  className = "",
}) => {
  const containerRef = useRef(null);
   const headlineRef = useRef(null);
  const descRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
           toggleActions: "play none none reverse",
           
        },
      });

      // 1. Initial fade-in of background aura and stage
      tl.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: "power2.out" }
      );

      // 2. Coordinated staggered reveal for typography elements
      tl.fromTo(
        [  headlineRef.current, descRef.current],
        {
          opacity: 0,
          y: 36,
        },
        {
          opacity: 1,
          y: 0,
          delay:1,
          duration: 0.85,
          stagger: 0.12,
          ease: "power3.out",
        },
        "-=0.3"
      );
    }, containerRef);

    return () => ctx.revert();
  }, [  title, highlightTitle, description]);

  return (
    <section
      ref={containerRef}
      className={`relative w-full h-auto py-32 md:mt-0 lg:h-screen  text-btnPrimary overflow-hidden  flex items-center justify-center px-6 sm:px-12 lg:px-20 ${className}`}
    >
  
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center justify-center text-center">
       

        {/* Main Headline */}
        <h1
          ref={headlineRef}
          className="  text-5xl sm:text-[8vw]   font-normal leading-[1.02] tracking-tight mb-8 will-change-transform"
        >
          {title} {highlightTitle && <br />}
          {highlightTitle && (
            <span className=" italic text-primary font-primary  ">{highlightTitle}</span>
          )}
        </h1>

        {/* Description */}
        {description && (
          <div ref={descRef} className="max-w-xl mx-auto ">
            <p className="font-Poppins text-base sm:text-lg   ">
              {description}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};