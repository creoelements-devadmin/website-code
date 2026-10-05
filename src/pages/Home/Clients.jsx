import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ClientsLogo } from "../../data/ClientsData.js";
import { SectionHeading } from "../../components/Gsap/SectionHeading.jsx";

gsap.registerPlugin(ScrollTrigger);

export const Clients = () => {
  const containerRef = useRef(null);
  const rowTopRef = useRef(null);
  const rowMiddleRef = useRef(null);
  const rowBottomRef = useRef(null);

  // Split all clients evenly across 3 rows
  const chunkSize = Math.ceil(ClientsLogo.length / 3);
  const row1 = ClientsLogo.slice(0, chunkSize);
  const row2 = ClientsLogo.slice(chunkSize, chunkSize * 2);
  const row3 = ClientsLogo.slice(chunkSize * 2);

  // Duplicate items 4x to ensure uninterrupted looping
  const loop1 = [...row1, ...row1, ...row1, ...row1];
  const loop2 = [...row2, ...row2, ...row2, ...row2];
  const loop3 = [...row3, ...row3, ...row3, ...row3];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Row 1: Leftward
      const anim1 = gsap.to(rowTopRef.current, { xPercent: -50, repeat: -1, duration: 90, ease: "none", });

      // Row 2: Rightward
      gsap.set(rowMiddleRef.current, { xPercent: -50 });
      const anim2 = gsap.to(rowMiddleRef.current, { xPercent: 0, repeat: -1, duration: 95, ease: "none", });

      // Row 3: Leftward
      const anim3 = gsap.to(rowBottomRef.current, { xPercent: -50, repeat: -1, duration: 90, ease: "none", });

      // Mouseenter / Mouseleave pause handlers per row
      const setupHoverPause = (el, anim) => {
        if (!el) return;
        const enter = () => gsap.to(anim, { timeScale: 0, duration: 0.5 });
        const leave = () => gsap.to(anim, { timeScale: 1, duration: 0.5 });

        el.addEventListener("mouseenter", enter);
        el.addEventListener("mouseleave", leave);

        return () => {
          el.removeEventListener("mouseenter", enter);
          el.removeEventListener("mouseleave", leave);
        };
      };

      const cleanup1 = setupHoverPause(rowTopRef.current, anim1);
      const cleanup2 = setupHoverPause(rowMiddleRef.current, anim2);
      const cleanup3 = setupHoverPause(rowBottomRef.current, anim3);

      // Dynamic scroll velocity steering
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const velocity = self.getVelocity();
          const boost = Math.min(Math.max(Math.abs(velocity) / 100, 10), 1);

          const dir = self.direction === 1 ? 1 : -1;
          gsap.to([anim1, anim3], { timeScale: dir * boost, duration: 0.25, overwrite: "auto" });
          gsap.to(anim2, { timeScale: dir * boost, duration: 0.25, overwrite: "auto" });

          gsap.delayedCall(0.35, () => {
            gsap.to([anim1, anim3], { timeScale: 1, duration: 0.8 });
            gsap.to(anim2, { timeScale: 1, duration: 0.8 });
          });
        },
      });

      return () => {
        cleanup1 && cleanup1();
        cleanup2 && cleanup2();
        cleanup3 && cleanup3();
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full  py-20   overflow-hidden   " >
      <div className="">
      <SectionHeading
      tag=" Our Clients"
      title="Trusted across industries "
      highlight="Connected across borders."
      text="We empower ambitious brands across automotive, retail, and finance to build impactful digital experiences and drive sustainable growth."/>
 </div>
      

      {/* Marquee Wrapper with Left & Right Gradient Blur Overlays */}
      <div className="relative w-full px-3  md:px-5 lg:px-10 ">
        {/* Left Side Blur and right side / Mask */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 sm:w-20 z-20 bg-gradient-to-r from-[#F7F6F3] via-[#F7F6F3]/80 to-transparent backdrop-blur-[2px]" />
         <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 sm:w-20 z-20 bg-gradient-to-l from-[#F7F6F3] via-[#F7F6F3]/80 to-transparent backdrop-blur-[2px]" />

        {/* Row 1: Leftward */}
        <div className="relative w-full overflow-hidden   py-4">
          <div ref={rowTopRef} className="flex items-center gap-6 w-max will-change-transform cursor-pointer" >
            {loop1.map((client, index) => (
              <LogoCard key={`row1-${index}`} client={client} />
            ))}
          </div>
        </div>

        {/* Row 2: Rightward */}
        <div className="relative w-full overflow-hidden  py-4">
          <div ref={rowMiddleRef} className="flex items-center gap-6 w-max will-change-transform cursor-pointer" >
            {loop2.map((client, index) => (
              <LogoCard key={`row2-${index}`} client={client} />
            ))}
          </div>
        </div>

        {/* Row 3: Leftward */}
        <div className="relative w-full overflow-hidden   py-4">
          <div
            ref={rowBottomRef}
            className="flex items-center gap-6 w-max will-change-transform cursor-pointer"
          >
            {loop3.map((client, index) => (
              <LogoCard key={`row3-${index}`} client={client} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Reusable Logo Tile
const LogoCard = ({ client }) => {
  return (
    <div
      className="group relative flex items-center justify-center  w-44 h-24 sm:w-52 sm:h-32.5 shadow-md bg-white rounded-xl border border-black/4 transition-all duration-500 ease-out  hover:border-transparent hover:-translate-y-1" >
      <img src={client.url} alt={client.name} loading="lazy" className="max-h-full rounded-2xl    max-w-full object-cover  transition-all duration-500 p-2 "/>
      <span className="absolute w-full h-full backdrop-blur-2xl p-2 text-gray-600 text-center flex items-center justify-center rounded-2xl   left-1/2 -translate-x-1/2 text-xs sm:text-sm   font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {client.name}
      </span>
    </div>
  );
} 