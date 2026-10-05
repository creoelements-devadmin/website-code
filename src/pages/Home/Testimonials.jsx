import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { slidesData } from "../../data/TestimonialData";

gsap.registerPlugin(ScrollTrigger);

export const Testimonials = () => {
  const sectionRef = useRef(null);
  const pinWrapperRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current.filter(Boolean);
    if (!cards.length) return;

    const ctx = gsap.context(() => {
      // 1. Initial State: First card flat, others placed off-screen below
      cards.forEach((card, index) => {
        if (index > 0) {
          gsap.set(card, {
            yPercent: 110,
            scale: 0.94,
            opacity: 0,
            force3D: true,
          });
        }
      });

      // 2. Main Scrub Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${cards.length * 90}%`,
          pin: true,
          scrub: 0.8, // Snappy response with zero lag
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // 3. Sequential Card Entry and Recede
      cards.forEach((card, index) => {
        if (index === 0) return;

        // Animate incoming card upward
        tl.to(
          card,
          {
            yPercent: 0,
            scale: 1,
            opacity: 1,
            ease: "power1.out",
            duration: 1,
            force3D: true,
          },
          `card-${index}`
        );

        // Previous cards scale down and softly fade out without turning black
        for (let j = 0; j < index; j++) {
          const depth = index - j;
          tl.to(
            cards[j],
            {
              scale: Math.max(0.88, 1 - depth * 0.04),
              yPercent: -depth * 3.5,
              opacity: Math.max(0.4, 1 - depth * 0.25), // Clean fade, NO brightness/black darkening
              ease: "power1.out",
              duration: 1,
              force3D: true,
            },
            `card-${index}`
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen   text-btnPrimary overflow-hidden flex items-center justify-center  "
    >
      {/* Editorial floating aura */}
 
      {/* Main Container */}
      <div
        ref={pinWrapperRef}
        className="w-full  px-3 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center h-full max-h-187.5"
      >
        {/* Left Column: Fixed Narrative Header */}
        <div className="lg:col-span-5 flex flex-col justify-between py-6 h-full max-h-120">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-[11px] tracking-[0.2em] uppercase text-primary font-semibold">
                Client Voices
              </span>
            </div>
 
            <h2 className="  text-4xl sm:text-6xl xl:text-7xl font-normal leading-[1.05] tracking-tight">
              Crafted  
              with care, <br />
              <span className="italic text-primary">felt by all.</span>
            </h2>
          </div>

          <div className="md:border-t  border-black/10 pt-3 md:pt-6">
            <p className=" text-xs text-neutral-500 uppercase tracking-widest leading-relaxed">
              Scroll down to reveal genuine feedback and experiences from our partners.
            </p>
          </div>
        </div>
        

        {/* Right Column: Layered Card Stage */}
        <div className="lg:col-span-7 relative md:h-120 h-[60vh]  w-full flex items-center justify-center">
          {slidesData.map((slide, index) => (
            <article
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="absolute inset-0 w-full h-full rounded-4xl p-6  flex flex-col justify-between bg-white border border-black/8 shadow-md will-change-transform  "
              style={{
                zIndex: index + 1,
              }}
            >
              {/* Card Header: Index & Quotation Mark */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold tracking-widest text-primary uppercase">
                  ( 0{index + 1} / 0{slidesData.length} )
                </span>
                
              </div>

              {/* Card Quote Body */}
              <p className=" text-xs sm:text-lg text-neutral-700 leading-relaxed font-light tracking-wide">
                “{slide.content.text}”
              </p>

              {/* Card Footer: Author Info */}
              <div className="flex items-center gap-4 pt-6 border-t border-black/5">
                <div className="relative p-0.5 rounded-full ring-2 ring-primary/30 bg-white">
                  <img
                    src={slide.image}
                    alt={slide.content.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </div>

                <div>
                  <h3 className=" text-base font-semibold text-btnPrimary">
                    {slide.content.name}
                  </h3>
                  <p className="text-xs uppercase tracking-wider text-neutral-400 font-medium">
                    {slide.content.designation}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};