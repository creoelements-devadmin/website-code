import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeading } from "../../components/Gsap/SectionHeading";

gsap.registerPlugin(ScrollTrigger);

export const Partners = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  const partnersData = [
    {
      name: "Hostinger",
      badge: "Hosting & Cloud",
      image: "https://creo-elements.com/blogs/wp-content/uploads/2025/05/hostinger.png",
      description:
        "Delivering high-performance web hosting solutions with exceptional support, ultra-low latency, and reliable servers.",
    },
    {
      name: "WooCommerce",
      badge: "Commerce Engine",
      image: "https://creo-elements.com/blogs/wp-content/uploads/2025/05/woocommerce.png",
      description:
        "Empowering your online presence with an adaptable open-source platform for running custom e-commerce stores smoothly.",
    },
    {
      name: "GoDaddy",
      badge: "Domains & DNS",
      image: "https://creo-elements.com/blogs/wp-content/uploads/2025/05/godaddy.png",
      description:
        "Industry-standard domain management, reliable DNS control, and foundational digital infrastructure.",
    },
    {
      name: "Airpay",
      badge: "Omnichannel Pay",
      image: "https://creo-elements.com/blogs/wp-content/uploads/2026/09/airpay.png",
      description:
        "Simplifying digital and in-person transactions with seamless multi-currency processing and instant settlement.",
    },
    {
      name: "Razorpay",
      badge: "Payment Gateway",
      image: "https://creo-elements.com/blogs/wp-content/uploads/2026/01/Razorpay-Logo-removebg-preview.png",
      description:
        "A secure payment gateway that helps modern businesses accept, process, and disburse payments effortlessly.",
    },
    {
      name: "Shopify",
      badge: "Global Retail",
      image: "https://creo-elements.com/blogs/wp-content/uploads/2025/05/shopify.png",
      description:
        "Powering global retail operations with optimized checkout paths and scalable storefront ecosystems.",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // Staggered bento cards upward reveal
      const validCards = cardsRef.current.filter(Boolean);
      gsap.fromTo(
        validCards,
        {
          opacity: 0,
          y: 50,
          scale: 0.96,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          stagger: {
            amount: 0.35,
            from: "start",
          },
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className=" w-full "
    >
      <div className="  relative z-10">
        {/* Section Header */}

        <SectionHeading
         tag="  Integration Network"
        title="Affiliates "
        highlight="Partners"
        text=" The tools and platforms we build on top of — trusted by our team and
            wired into every project we ship."
     
         />
         

        {/* Bento Grid Layout */}
        <div className=" grid md:grid-cols-3 gap-4 px-3  md:px-5 lg:px-10  md:p-10 w-full">
          {partnersData.map((partner, index) => (
            <article
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="group w-full relative rounded-3xl p-8  flex flex-col justify-between  bg-white border border-black/8 hover:border-primary/60  transition-all duration-300 hover:-translate-y-1.5 shadow-md" >
              {/* Top Row: Logo Stage & Category Tag */}
              <div>
                <div className="flex items-center justify-between gap-4 mb-7 ">
                  <div className="w-32 h-16  py-2    flex items-center justify-center">
                    <img
                      src={partner.image}
                      alt={partner.name}
                      loading="lazy"
                      className="max-h-10 max-w-full object-contain  "
                    />
                  </div>

                  <span className="text-[11px]  tracking-wider uppercase font-medium text-neutral-500 bg-neutral-100/80 border border-black/4 px-3.5 py-1 rounded-full group-hover:border-primary/30 group-hover:text-primary transition-colors">
                    {partner.badge}
                  </span>
                </div>

                {/* Name */}
                <h3 className=" text-xl font-semibold text-btnPrimary mb-3 tracking-tight">
                  {partner.name}
                </h3>

                {/* Description */}
                <p className=" text-neutral-500 text-xs leading-relaxed font-light">
                  {partner.description}
                </p>
              </div>

              {/* Bottom Row: Verification Marker & Icon */}
              <div className="mt-8 pt-5 border-t border-black/6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary group-hover:scale-125 transition-transform" />
                  <span className="text-[11px]  font-medium text-neutral-400 uppercase tracking-widest">
                    Verified Integration
                  </span>
                </div>

                 
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};