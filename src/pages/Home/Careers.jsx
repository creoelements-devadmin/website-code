
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '../../components/Button';
import { DecorativeBallpit } from '../../components/DecorativeBallpit';

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
    <section className="relative w-full mt-10 px-3 sm:px-12 lg:px-20 lg:pt-24 lg:min-h-screen lg:flex lg:items-center">
      <div className="relative z-10 mx-auto w-full max-w-8xl">
        <div
          ref={cardRef}
          className="relative flex flex-col justify-center overflow-hidden rounded-4xl border border-white shadow-2xl lg:min-h-[calc(100vh-6rem)]"
        >
          {/* Decorative background */}
          <DecorativeBallpit
            className="pointer-events-none absolute inset-0 z-0"
            count={100}
            gravity={0.01}
            friction={0.9975}
            wallBounce={0.95}
            followCursor={false}
            colors={[4104354, 16777215, 4104354]}
          />

          {/* Soft glow */}
          <div
            className="pointer-events-none absolute -top-32 -right-32 h-[26rem] w-[26rem] rounded-full bg-white/10 blur-3xl"
            aria-hidden="true"
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center px-5 py-12 text-center sm:px-14 sm:py-16 lg:px-16 lg:py-20">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary px-3 py-3 font-Poppins text-xs text-white">
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
              Careers at Creo
            </span>

            <h2 className="mt-6 mb-5 text-4xl sm:text-6xl">
              Good work begins with
            </h2>

            <span className="mt-1 mb-5 rounded-full text-3xl italic text-primary backdrop-blur-xs sm:text-4xl md:text-5xl">
              Curious people.
            </span>

            <p className="mt-5 mx-auto max-w-xl rounded-full text-sm text-btnPrimary backdrop-blur-xs sm:text-base">
              We’re building a collaborative team of designers, developers,
              strategists and creators who care about ideas and details.
            </p>

            {/* CTA */}
            <div className="mt-10 flex w-full items-center justify-center">
              <Button
                name="Explore opportunities"
                target="/work-with-us"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};