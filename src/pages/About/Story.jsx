import React, { useRef, useState, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeading } from "../../components/Gsap/SectionHeading";

gsap.registerPlugin(ScrollTrigger);

const storyData = [
  {
    number: "01",
    title: "Crafting Your Story",
    summary:
      "We craft compelling digital marketing strategies that enhance your brand, engage your audience, and drive business growth.",
    tags: ["Brand Strategy", "Content Systems", "Audience Engagement"],
  },
  {
    number: "02",
    title: "Building Trust & Authority",
    summary:
      "A digital presence establishes credibility and builds trust with potential customers. They know you’re a legitimate business invested in their needs.",
    tags: ["Credibility", "Brand Authority", "Trust Systems"],
  },
  {
    number: "03",
    title: "Driving Traffic & Leads",
    summary:
      "We don’t just build websites, we make them magnets for your ideal audience. Through targeted social media management and data-driven performance marketing, we attract the right people and convert them into loyal customers.",
    tags: ["Performance Marketing", "Social Media", "Lead Conversion"],
  },
  {
    number: "04",
    title: "Making You Visible",
    summary:
      "Whether it’s social media buzz or strategic search engine optimization (SEO), we get your brand seen by the people who matter most.",
    tags: ["Search Optimization", "SEO", "Brand Visibility"],
  },
];

 
const ORBIT_RADIUS = 260;
const ANGLE_STEP = 26;
const MAX_DELTA = 1.4;
const MOBILE_ORBIT_RADIUS = 190;
const MOBILE_ANGLE_STEP = 30;
const MOBILE_MAX_DELTA = 1.4;
const DESKTOP_MQ = "(min-width: 1024px)";

 
const KineticSculpture = ({ innerRef }) => (
  <div ref={innerRef} className="w-full h-full flex items-center justify-center will-change-transform">
    <svg viewBox="0 0 400 400" className="w-full h-full filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.06)]">
      <defs>
        <linearGradient id="storyLightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#E4E4E0" />
          <stop offset="100%" stopColor="#3EB8A2" />
        </linearGradient>
        <linearGradient id="storyShadeGrad" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#D2D2CC" />
          <stop offset="100%" stopColor="#3EB8A2" />
        </linearGradient>
      </defs>
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
        <g key={deg} transform={`rotate(${deg} 200 200)`}>
          <path
            d="M 200,200 C 240,110 320,130 350,200 C 320,270 240,290 200,200 Z"
            fill={deg % 60 === 0 ? "url(#storyLightGrad)" : "url(#storyShadeGrad)"}
            opacity="0.9"
          />
        </g>
      ))}
      <circle cx="200" cy="200" r="28" fill="#F7F6F3" stroke="#D1D1CD" strokeWidth="2" />
    </svg>
  </div>
);

export const Story = () => {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const ringRef = useRef(null);
  const progressCircleRef = useRef(null);
  const contentRef = useRef(null);
  const sculptureRef = useRef(null);
  const dialItemsRef = useRef([]);

  const [activeIndex, setActiveIndex] = useState(0);
  const total = storyData.length;
  const activeStory = storyData[activeIndex];

   
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
        const x = isDesktop
          ? -radius * (1 - Math.cos(angleRad))
          : radius * Math.sin(angleRad);
        const y = isDesktop
          ? radius * Math.sin(angleRad)
          : -radius * (1 - Math.cos(angleRad));

        const progress = Math.max(0, 1 - absDelta / (maxDelta + 0.2));
        const opacity = Math.pow(progress, 1.6);
        const scale = 0.8 + 0.2 * Math.max(0, 1 - absDelta / 1.6);

        gsap.set(el, { x, y, scale, autoAlpha: opacity });
      }
    },
    [total]
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      updateDial(0);

      // SVG progress stroke total length — ring radius is 230 (see viewBox below)
      const circleLength = 2 * Math.PI * 230;
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
          updateDial(continuous);

          const isDesktop = window.matchMedia(DESKTOP_MQ).matches;
          const angleStep = isDesktop ? ANGLE_STEP : MOBILE_ANGLE_STEP;

          if (ringRef.current) {
            gsap.set(ringRef.current, {
              rotate: -continuous * angleStep,
              transformOrigin: "center center",
            });
          }

          // Sculpture spins continuously with scroll instead of swapping per step
          if (sculptureRef.current) {
            gsap.set(sculptureRef.current, { rotation: continuous * 90 });
          }

          // Progressively fill the ring stroke with primary color
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

  // Blur/stagger text transition + a soft sculpture pulse on step change —
  // mirrors Services' contentRef + imageRef fromTo on activeIndex change.
  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current.children,
        { opacity: 0, y: 24, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.5,
          stagger: 0.05,
          ease: "power2.out",
        }
      );
    }

    if (sculptureRef.current) {
      gsap.fromTo(
        sculptureRef.current,
        { scale: 0.94 },
        { scale: 1, duration: 0.6, ease: "power2.out" }
      );
    }
  }, [activeIndex]);

  return (
    <section ref={sectionRef} className="relative w-full py-20">
      <SectionHeading
        tag="Strategic Pillars"
        title="Here’s How We Empower"
        highlight="Your Digital Success"
        text="A cohesive ecosystem engineered to amplify your reach, reinforce brand authority, and turn qualified traffic into sustainable revenue."
      />

      <div
        ref={stageRef}
        className="relative h-screen w-full flex flex-col lg:flex-row items-center justify-between px-5 sm:px-12 lg:px-20 pt-16 pb-6 lg:py-0 overflow-hidden"
      >
        {/* ================= Dial & progress ring (top arc on mobile, left on desktop) ================= */}
       <div className="relative w-full lg:w-72 h-28 sm:h-36 lg:h-145 flex items-end lg:items-center justify-center lg:justify-start shrink-0">
          <div
            ref={ringRef}
            className="absolute left-1/2 -translate-x-1/2 bottom-7 w-160 h-160 lg:top-1/2 lg:bottom-auto  lg:-left-190 lg:translate-x-0 lg:-translate-y-1/2 lg:w-230 lg:h-230 pointer-events-none" >
            <svg className="w-full h-full -rotate-90" viewBox="0 0 920 920">
              <circle cx="460" cy="460" r="458" fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="1.5" />
              <circle ref={progressCircleRef} cx="460" cy="460" r="458" fill="none" stroke="#3EB8A2" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>

          <div className="relative w-full h-full">
            {storyData.map((_, idx) => {
              const isActive = idx === activeIndex;
              return (
                <div
                  key={idx}
                  ref={(el) => (dialItemsRef.current[idx] = el)}
                  className="absolute left-1/2 bottom-0 -translate-x-1/2 lg:left-38 lg:top-1/2 lg:bottom-auto lg:translate-x-0 -translate-y-1/2 flex flex-col-reverse lg:flex-row items-center gap-1.5 lg:gap-3 will-change-transform"
                >
                  <span className={`w-2 h-2 lg:w-2.5 lg:h-2.5 rounded-full bg-primary transition-all duration-300 ${
                      isActive ? "scale-100 opacity-100 shadow-[0_0_12px_#3EB8A2]" : "scale-0 opacity-0"
                    }`} />
                    
                  <span className={`   transition-all duration-300 ease-in-out ${
                      isActive ? "text-primary font-medium text-4xl sm:text-5xl" : "text-btnPrimary/50 italic text-2xl sm:text-3xl" }`} >

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
          <span className="font-Poppins text-[11px] uppercase tracking-[0.2em] text-primary font-semibold mb-3">
            Phase {activeStory.number}
          </span>

          <h2 className="text-[1.85rem] sm:text-5xl lg:text-6xl text-btnPrimary font-normal leading-[1.08] tracking-tight mb-3 sm:mb-5">
            {activeStory.title}
          </h2>

          <p className="text-neutral-600 text-[13px] sm:text-sm lg:text-base font-light leading-relaxed max-w-md lg:max-w-lg mb-5 sm:mb-8">
            {activeStory.summary}
          </p>

          <div className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-2.5">
            {activeStory.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] sm:text-xs font-normal text-neutral-600 bg-white border border-black/8 px-3.5 sm:px-4 py-2 rounded-full shadow-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* ================= Kinetic sculpture — visible on mobile, right column on desktop ================= */}
        <div className="flex relative w-full lg:w-96 h-[34vh] min-h-45 max-h-70 lg:h-115 lg:max-h-none lg:min-h-0 items-center justify-center shrink-0">
          <KineticSculpture innerRef={sculptureRef} />
        </div>
      </div>
    </section>
  );
};