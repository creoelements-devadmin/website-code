import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeading } from "../../components/Gsap/SectionHeading";
import Stack from "../../components/Gsap/StackCards";

gsap.registerPlugin(ScrollTrigger);

const stepsData = [
   {
    number: "01",
    phase: "Phase 01",
    title: "Discover",
    summary:
      "We understand your business, audience, challenges and ambitions.",
    deliverables: ["User Insights", "Market Research", "Technical Audit"],
  },
  {
    number: "02",
    phase: "Phase 02",
    title: "Define",
    summary:
      "We shape the strategy, structure and creative direction.",
    deliverables: ["Brand Positioning", "IA & UX Flows", "Growth Roadmap"],
  },
  {
    number: "03",
    phase: "Phase 03",
    title: "Create",
    summary: "We design, develop and refine every element with care.",
    deliverables: ["Visual Systems", "High-Fi UI/UX", "Prototypes"],
  },
  {
    number: "04",
    phase: "Phase 04",
    title: "Grow",
    summary: "We launch, measure and continuously improve what we build.",
    deliverables: [
    "Launch & Optimization",
    "Analytics & Insights",
    "Ongoing Growth"
  ], 

  },
   
];

export const Process = () => {
  const sectionRef = useRef(null);
   const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
       

      // 2. Staggered card reveals
      const cards = cardsRef.current.filter(Boolean);
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full      "
    >
      <div className="   ">
        {/* Editorial Section Header */}
        
       <SectionHeading
        tag="How We Work"
        title="Clear thinking"
        highlight=" Collaborative execution"
        text="  A focused end-to-end framework engineered to eliminate guesswork and
            transform your vision into high-performing digital realities."
         />


 
 

        <div className="mx-auto hidden h-90 w-[min(86vw,20rem)]  ">
          <Stack
            randomRotation={false}
            sensitivity={200}
            sendToBackOnClick={true}
            cards={stepsData.map((step) => (
              <article
                key={step.number}
                className="flex h-full w-full flex-col justify-between rounded-2xl border bg-primary border-gray-300  p-5 text-left shadow-md"
              >
                <div>
                  <div className="mb-4 flex items-center justify-between border-b  border-black/[0.06] pb-3">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400">
                      {step.phase}
                    </span>
                    <span className="font-Instrument text-2xl text-primary">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="mb-2 text-3xl text-btnPrimary">
                    {step.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-neutral-600">
                    {step.summary}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 border-t border-black/[0.06] pt-3">
                  {step.deliverables.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-black/[0.05] bg-[#F7F6F3] px-2 py-1 text-[10px] text-neutral-600"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}
            autoplay={false}
            pauseOnHover={false}
          />
        </div>

        {/* 3-Column Minimal Grid */}
        <div className="grid grid-cols-1    md:grid-cols-2 px-3  md:px-5 lg:px-10  lg:grid-cols-4 gap-2">
          {stepsData.map((step, idx) => (
            <article
              key={idx}
              ref={(el) => (cardsRef.current[idx] = el)}
              className="group relative rounded-3xl p-8 sm:p-9 bg-white border border-gray-300 hover:border-primary/50 transition-all duration-300 shadow-md flex flex-col justify-between"
            >
              <div>
                {/* Step Header with Phase and Number */}
                <div className="flex items-center justify-between pb-6 mb-6 border-b border-black/[0.06]">
                  <span className="text-[11px] font-Poppins uppercase tracking-widest text-neutral-400 font-semibold">
                    {step.phase}
                  </span>
                  <span className="font-Instrument text-3xl text-primary">
                    {step.number}
                  </span>
                </div>

                {/* Step Title */}
                <h3 className="font-Instrument group-hover:text-primary duration-500 ease-in-out text-3xl sm:text-4xl text-btnPrimary mb-4">
                  {step.title}
                </h3>

                {/* Step Summary */}
                <p className="font-Poppins text-sm text-neutral-600 font-light leading-relaxed mb-8">
                  {step.summary}
                </p>
              </div>

              {/* Deliverable Tags */}
              <div className="flex flex-wrap gap-2 pt-6 border-t border-black/[0.06]">
                {step.deliverables.map((item) => (
                  <span
                    key={item}
                    className="font-Poppins text-xs text-neutral-600 bg-[#F7F6F3] border border-black/[0.05] px-3.5 py-1.5 rounded-full group-hover:border-primary/30 transition-colors"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};