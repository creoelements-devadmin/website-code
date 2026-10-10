import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "./Button";
import { useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
gsap.registerPlugin(ScrollTrigger);



export const CTA = () => {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const brandTextRef = useRef(null);
  const sweepTweenRef = useRef(null);
  const location = useLocation();

  const hideBtn = location.pathname === '/about' ;

  const SocialLinks = [
    {
      name: "Instagram",
      url: "https://www.instagram.com/creoelements/",
      icon: <FaInstagram className="text-base text-white" />,
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/company/creoelementsllp",
      icon: <FaLinkedinIn className="text-base text-white" />,
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. CTA Card reveal on scroll
      if (cardRef.current) {
        gsap.fromTo(cardRef.current, { autoAlpha: 1, y: 45, scale: 0.98, },
          {
            autoAlpha: 1, y: 0, scale: 1, duration: 1, ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 88%",
              once: true,
            },
          }
        );
      }

      // 2. Large Brand Text Entrance
      if (brandTextRef.current) {
        gsap.fromTo(brandTextRef.current, { autoAlpha: 0, y: 50 },
          {
            autoAlpha: 1, y: 0, duration: 1.2, ease: "power3.out",
            scrollTrigger: {
              trigger: brandTextRef.current,
              start: "top 90%",
              once: true,
            },
          }
        );

        // 3. Automatic Left-to-Right sweeping light effect
        const sweepObj = { xPercent: -20 };
        sweepTweenRef.current = gsap.to(sweepObj, {
          xPercent: 120,
          duration: 4.5,
          repeat: -1,
          ease: "sine.inOut",
          yoyo: true,
          onUpdate: () => {
            if (brandTextRef.current) {
              brandTextRef.current.style.setProperty(
                "--light-x",
                `${sweepObj.xPercent}%`
              );
            }
          },
        });
      }
    }, containerRef);



    return () => {

      ctx.revert();
    };
  }, []);





  return (
    <>
      <div className="max-w-8xl mx-auto relative z-10">
        <div ref={containerRef}
        className="relative w-full mt-10 sm:pt-32 pb-8 px-2 sm:px-6 lg:px-20 overflow-hidden select-none  ">
        {/* ================= TOP: Main Dark Editorial Card ================= */}
        <div className="  relative z-10 mb-20 sm:mb-28">
          <div ref={cardRef}
            className="relative rounded-4xl bg-btnPrimary text-white p-8 sm:p-14 lg:p-16 overflow-hidden shadow-2xl border-2 border-white" >

            {/* Ambient Lighting Orbs */}
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-primary/15 rounded-full blur-3xl pointer-events-none" />

            {/* Content & Contact Dual Stage */}
            <div className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 lg:gap-14">
              <div className="w-full lg:w-8/12">
                <div className="md:max-w-2xl mb-10">
                  <h2 className="font-Instrument text-4xl sm:text-6xl   font-normal leading-[1.02] tracking-tight mb-6">
                    Have a project in mind? <br />
                    <span className="italic text-primary">Let’s create what comes next.</span>
                  </h2>

                  <p className="font-Poppins text-sm font-thin  "> Whether you need end-to-end bespoke development, brand positioning, or performance-driven marketing, we turn ambitious concepts into industry-leading digital realities. </p>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  <div className=" flex items-center flex-wrap gap-2">

                    <Button name="Let us Build Your Website" target="/contact-us" />
                    {!hideBtn && ( <Button name="Discover Creo" target="/about" />)}
                  </div>

                  <a href="mailto:creoelementsllp@gmail.com"
                    className="font-Poppins text-xs   hover:scale-110 tracking-widest  hover:text-white transition-all hover:text-black duration-300  rounded-full bg-primary border  p-4 hover:border-white" >
                    Creoelementsllp@gmail.com
                  </a>
                </div>
              </div>

              <div className="w-full lg:w-4/12 flex flex-col gap-6 pt-6 lg:pt-0 lg:pl-10 border-t lg:border-t-0 lg:border-l border-white/10 text-xs font-Poppins ">
                <div>
                  <p className="uppercase tracking-widest text-neutral-500 text-[10px] mb-1"> Office Location </p>
                  <p className="text-white"> Office no 10, Mulchand Mansion, Dhirubhai Parekh Marg, Dawa Bazar, Kalbadevi, Mumbai, Maharashtra, 400002 </p>
                </div>

                <div>
                  <p className="uppercase tracking-widest text-neutral-500 text-[10px] mb-1"> Direct Line </p>
                  <p className="text-white ">+91 9892360639</p>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="text-sm ">Social Links</h3>

                  <div className="flex   gap-2">
                    {SocialLinks.map((link) => (
                      <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer"
                        className="group flex w-fit items-center gap-3 rounded-full px-3 py-2 transition-all duration-300 hover:bg-primary hover:text-white" >
                        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-current transition-all duration-300 group-hover:border-white group-hover:bg-primary">
                          {link.icon}
                        </span>
                        <span className="text-sm">{link.name}</span>
                      </a>
                    ))}



                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= BOTTOM: Auto Left-to-Right Shimmer Banner ================= */}
        <div className="w-full   flex flex-col items-center justify-center">
          <div ref={brandTextRef} className="brand-text">
            <h1 className="brand-title"> Creo Elements </h1>
          </div>

          {/* Sub-Footer Rail */}
          <div className="w-full pt-8 mt-2 border-t text-center border-black/8 flex flex-col sm:flex-row items-center justify-center gap-4 text-[11px] sm:text-xs font-Poppins ">
            <p>© {new Date().getFullYear()} Creo Elements LLP. All rights reserved.</p>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};