import { lazy, Suspense, useEffect, useRef } from "react";
import { Button } from "../../components/Button";
import { Link } from "react-router-dom";
import { GoArrowUpRight } from "react-icons/go";
const Ballpit = lazy(() => import("./Ballpit"));
 import gsap from "gsap";
import SplitText from "../../components/Gsap/Splittext";
 
export const Banner = () => {
  const bannerRef = useRef(null);
  const contentRef = useRef(null);
  const bottomContentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      timeline
        .fromTo(
          bannerRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.8 }
        )
        .fromTo(
          contentRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.35"
        )
        .fromTo(
          bottomContentRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.55"
        );
    }, bannerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={bannerRef} className="w-full md:min-h-screen">
      <div className="relative w-full min-h-screen overflow-hidden flex flex-col justify-center items-center text-center border border-gray-200 rounded-3xl">
        <Suspense fallback={null}>
          <Ballpit
            className="absolute inset-0 z-0 pointer-events-none"
            count={100}
            gravity={0.01}
            friction={0.9975}
            wallBounce={0.95}
            followCursor={false}
            colors={[4104354, 16777215, 4104354]}
          />
        </Suspense>

        <div ref={contentRef} className="relative z-10 w-full flex flex-col items-center">
          {/* Heading */}
          <SplitText
            tag="h1"
            className="md:text-[6vw] text-[10vw]  px-1   leading-[1.10] z-10 max-w-7xl mt-10"
            splitType="words"
            from={{ opacity: 0, y: 60, rotateX: -40 }}
            to={{ opacity: 1, y: 0, rotateX: 0 }}
            duration={1.1}
            ease="power4.out"
            delay={70}
            threshold={0.2}
            rootMargin="-50px"
            text={
                <> 
                 We create{"" }
                <span
                  className=" relative inline-flex items-center overflow-hidden rounded-full px-5 py-2 italic  md:text-[4vw] text-[8vw] text-primar bg-white/10 backdrop-blur-2xl backdrop-saturate-20 border border-white/5 shadow-[inset_0_1px_2px_rgba(255,255,255,0.9),inset_0_-2px_4px_rgba(255,255,255,0.15),0_10px_35px_rgba(0,0,0,0.10)] "
                >
                  {/* Liquid glow */}
                  <span
                    className=" absolute -top-6 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-white/40 blur-2xl pointer-events-none " />

                  {/* Glass reflection */}
                  <span
                    className=" absolute inset-x-2   top-0 h-px  bg-white/80 pointer-events-none " />

                  <span className="relative text-primary z-10">
                  {"" } digital
                  </span>
                </span>

               experiences built  to  move businesses forward.
              </>
             
            }
          />

          {/* Bottom Content */}
          <div
            ref={bottomContentRef}
            className="w-full z-10 mt-12 px-10 flex flex-col lg:flex-row items-center justify-between gap-8"
          >

            {/* Buttons */}
            <div className="flex items-center gap-4 md:px-12">
              <Button
                name="Start a project"
                target="/contact-us"
                bg="bg-btnPrimary"
              />

              {/* <Link
                className="flex flex-nowrap items-center gap-3 group"
                to="#work"
              >
                View our work

                <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">
                  <GoArrowUpRight />
                </span>
              </Link> */}
            </div>

            {/* Description */}
            <div className="max-w-md text-left backdrop-blur-[5px] p-5 rounded-2xl border border-gray-300">
              <p className="md:text-[16px] text-base leading-relaxed mix-blend-difference">
                Creo Elements helps ambitious businesses in India and across
                the world build distinctive websites, brands and digital
                experiences.
              </p>
            </div>
          </div>

        </div>
      </div>

       
    </div>
  );
};