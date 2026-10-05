import { lazy, Suspense, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '../../components/Button';

const Ballpit = lazy(() => import('./Ballpit'));

gsap.registerPlugin(ScrollTrigger);

export const Careers = () => {
  const cardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );
    }, cardRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative w-full md:pt-24 mt-10    px-3 sm:px-12 lg:px-20 ">
      <div className="max-w-6xl mx-auto relative z-10  ">
        <div
          ref={cardRef}
          className="relative rounded-4xl   overflow-hidden shadow-2xl border border-white"
        >
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
          {/* soft glow, the one accent this section spends its boldness on */}
          <div
            className="pointer-events-none absolute -top-32 -right-32 w-[26rem] h-[26rem] rounded-full bg-white/10 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative  ">
            {/* Copy */}
            <div className=" w-full text-center p-8 sm:p-14 lg:p-16">
              <span className="inline-flex items-center gap-2 text-xs font-Poppins text-white  bg-primary rounded-full py-3 px-3">
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                Careers at Creo
              </span>

              <h2 className="  text-5xl sm:text-6xl    mt-6 mb-5">
                Good work begins with  
              </h2>
                <span className="italic text-primary backdrop-blur-xs  rounded-full mt-6  mb-5 text-4xl md:text-5xl">Curious people.</span>


              <p className="  text-sm sm:text-base text-btnPrimary  mt-5  backdrop-blur-xs rounded-full max-w-xl m-auto">
                We’re building a collaborative team of designers, developers, strategists and creators who care about ideas and details.
              </p>
            </div>

            {/* CTA */}
            <div className="w-full h-full flex justify-center items-center pb-10">

            <Button name="Explore opportunities" target="/work-with-us" ></Button>
            </div>
           
            
          </div> 
        </div>
      </div>
    </div>
  );
};