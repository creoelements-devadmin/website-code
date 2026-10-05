import React, { useEffect, useRef, useState } from 'react'
import { SectionHeading } from '../../components/Gsap/SectionHeading';
import membersData from '../../data/membersData';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plus, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger)

export const Ourteam = () => {
  const imageRef = useRef([]);
  const textref = useRef([]);
  const containerRef = useRef(null);
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      imageRef.current.forEach((img, i) => {
        const text = textref.current[i];
        const target = [img, text].filter(Boolean);

        if (!target.length) return;

        gsap.fromTo(
          target,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: img,
              start: "top bottom",
              end: "top 65%",
              scrub: 1.2,
            },
          }
        );

        const innerImage = img.querySelector('.parallax-inner');
        if (innerImage) {
          gsap.to(innerImage, {
            yPercent: -18,
            ease: "none",
            scrollTrigger: {
              trigger: img,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Lock body scroll while popup is open, allow Escape to close
  useEffect(() => {
    document.body.style.overflow = selectedMember ? "hidden" : "";
    const handleKey = (e) => {
      if (e.key === "Escape") setSelectedMember(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [selectedMember]);

  return (
    <section className="w-full py-20 overflow-hidden relative" ref={containerRef}>
      <SectionHeading
        tag="Our team"
        title="The Minds Behind the"
        highlight="Creative Momentum"
        text="Meet the strategists, designers, and storytellers powering Creo Elements. We blend commercial insight with digital craftsmanship to scale ambitious brands."
      />

      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2  lg:gap-6 lg:p-4 px-6 lg:px-12">
        {membersData.map((member, index) => (
          <div className="group relative" key={member.slug || index}>
            <div

              ref={(el) => (imageRef.current[index] = el)}
              className="w-full h-125 border-white bg-[#aaa9a9] border-2 overflow-hidden rounded-4xl relative"
            >
              <div className="parallax-inner absolute inset-0 h-[130%] top-[-10%]">
                <div 
                 
                 className="block relative w-full h-full ">
                  <img
                    className="w-full  cursor-pointer mt-20 h-full object-cover object-bottom transition-transform duration-500 group-hover:scale-105"
                    src={member.image}
                    alt={member.name}
                  />

                  {/* Hover overlay — unchanged, still shows on hover */}
                  <div className="absolute inset-0 h-full w-full backdrop-blur-2xl top-0 flex items-center group-hover:scale-105 p-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <p className="px-5">
                      {member.meta_description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Name + designation — always visible, unaffected by the icon */}
              <div
                ref={(el) => (textref.current[index] = el)}
                className="absolute bottom-0 left-0 right-0 z-10 flex items-end justify-between gap-3 p-4 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
              >
                <div className="pointer-events-none transition-opacity duration-300 group-hover:opacity-0">
                  <h3 className="Instrument  text-white text-xl font-medium">
                    {member.name}
                  </h3>
                  <h4 className="font-Poppins text-white/80 text-xs italic uppercase tracking-wide">
                    {member.designation}
                  </h4>
                </div>

                {/* Click-to-open icon, bottom-right, always visible */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedMember(member);
                  }}
                  className="shrink-0 w-10 h-10 rounded-full bg-white/90 cursor-pointer hover:bg-primary flex items-center justify-center transition-colors z-20"
                  aria-label={`View details for ${member.name}`}
                >
                  <Plus className="w-4 h-4 text-btnPrimary" strokeWidth={2} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Click-triggered popup / modal */}
      {selectedMember && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
          onClick={() => setSelectedMember(null)}
        >
          <div className="absolute inset-0 bg-white/70 backdrop-blur-md" />

          <div
            className="relative bg-white rounded-3xl overflow-hidden max-w-4xl w-full h-[90vh] md:max-h-[85vh] grid grid-cols-1 lg:grid-cols-2 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedMember(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-primary hover:bg-primary/60 cursor-pointer flex items-center justify-center transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4 text-white" strokeWidth={2} />
            </button>

            <div className="relative h-full sm:h-full bg-[#aaa9a9]">
              <img
                src={selectedMember.image}
                alt={selectedMember.name}
                className="w-full h-full object-cover object-top"
              />
            </div>

            <div className="p-8 sm:p-10 flex flex-col justify-start items-start overflow-y-auto">
              <span className="inline-block text-[11px] font-Poppins tracking-[0.25em] uppercase text-primary font-semibold mb-3">
                {selectedMember.designation || "Team Member"}
              </span>

              <h3 className="Instrument text-3xl sm:text-4xl text-btnPrimary leading-tight mb-4">
                {selectedMember.name}
              </h3>

              <p className="font-Poppins text-neutral-600 text-sm sm:text-base leading-relaxed">
                {selectedMember.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}