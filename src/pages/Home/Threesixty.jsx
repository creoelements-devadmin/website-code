import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Threesixty.css';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export const Threesixty = () => {
  const threesixtyRef = useRef(null);

  useEffect(() => {
    // GSAP timeline for container animation
    gsap.to(threesixtyRef.current, {
      opacity: 1,
      height: '130vh',
      width: '150vw',
      borderRadius: '0px',
      duration: 2,
      transform: 'rotate(0deg)',
    //   ease: 'power2.inOut',
      scrollTrigger: {
        trigger: '.threesixty',
        scroller: 'body',
        start: 'top 50%',
        end: 'top 0%',
        scrub: 1,
        pin: true,
        // markers: true, // Show markers for debugging
        pinSpacing: false, // Prevent pin spacing

      }
    });

    // GSAP animation for text font size
    gsap.fromTo(
      '.threesixty-text',
      { fontSize: '0rem' },
      {
        fontSize: '25rem',
        duration: 1,
        scrollTrigger: {
          trigger: '.threesixty',
          scroller: 'body',
          start: 'top 50%',
          end: 'top -50%',
          scrub: 1,
        //   markers: true, // Show markers for debugging
        pinSpacing: false, // Prevent pin spacing

        }
      }
    );

    // GSAP animation for text translateX
    gsap.fromTo(
      '.threesixty-text',
      { transform: 'translateX(0vw)' },
      {
        transform: 'translateX(calc(25rem * -7.5))',
        duration: 2,
        delay: '500ms',
        scrollTrigger: {
          trigger: '.threesixty',
          scroller: 'body',
          start: 'top -20%',
          end: 'top -200%',
          scrub: 1,
          pin: true,
        //   markers: true, // Show markers for debugging
        pinSpacing: false, // Prevent pin spacing

        }
      }
    );

    // Cleanup on unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <>
    <div className="threesixty">
      <div ref={threesixtyRef} className="threesixty-container">
        <h2 aria-label="360 degree Marketing" className="threesixty-text">360&#xb0; Marketing</h2>
      </div>
    </div>
    <div className="threesixtySupport"
    style={{
        height: 'calc(230vh - 1px)',
    }}
    ></div>
    </>
  );
};
