import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const SectionHeading = ({ tag, title, highlight, text }) => {
  const containerRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const targets = [badgeRef.current, titleRef.current, textRef.current].filter(Boolean);
      if (!targets.length) return;
 
      gsap.fromTo(
        targets,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [tag, title, highlight, text]);

  return (
    <div className="w-full px-6  sm:px-10 lg:px-12">
      <div ref={containerRef} className="mb-10 w-full">
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 mb-6" >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse shrink-0" />
          <span className="text-[11px] font-Poppins tracking-[0.25em] uppercase text-primary font-semibold whitespace-nowrap">
            {tag}
          </span>
        </div>

        <div className="flex w-full flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-10">
          <h2 ref={titleRef}
            className="font-Instrument w-full lg:w-[62%] xl:w-[58%] text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-btnPrimary font-normal leading-[1.1] tracking-tight" >
            {title}{" "}
            <span className="italic text-primary block sm:inline">{highlight}</span>
          </h2>

          <p ref={textRef}
            className="font-Poppins w-full lg:w-[34%] xl:w-[30%] text-sm sm:text-base text-neutral-600 font-light leading-relaxed" >
            {text}
          </p>
        </div>
      </div>
    </div>
  );
};