import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import './Banner.css'; // Import your CSS separately


export const Banner = ({ updaters }) => {
  const wavesRef = useRef(null);
  const circleRef = useRef(null);
  const pupilRef = useRef(null);
  const tl = useRef();
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    // Load font before starting animation
    const loadFont = async () => {
      try {
        const font = new FontFace("Sukar", "url(/fonts/sukar.woff)");
        await font.load();
        document.fonts.add(font);
        console.log("Font loaded successfully", font);
      } catch (error) {
        console.error("Font loading failed:", error);
      }
    };
    

    loadFont();
  }, []);

  const [scrolled, setScrolled] = useState(false);  

  useEffect(() => {


    if (!fontLoaded) return; // Wait until font is loaded


    
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
        gsap.to('header', {
          transform: 'translateY(0px)',
          duration: 0.5,
          delay: 0.5,
        })
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // GSAP Timeline
    tl.current = gsap.timeline({
      onComplete: () => {
        // After the timeline completes, run the other JavaScript logic
        runMouseMovement();
      },
    })
      .to(
        '.creo_animated_logo_circle', {
        scale: '3',
        ease: "elastic.inOut(1.5,1)",
        duration: 0.5,
      }
      )
      .to('div#creo_animated_logo_pupil', {

        transform: 'translateY(-10px) translateX(20px)',
      })
      .to(
        '.creo_animated_logo_circle', {
        height: '160px',
        ease: "elastic.inOut(1.5,1)",
        duration: 0.5,
      }
      )
      .to(
        '.creo_animated_logo_circle', {
        height: '0px',
        ease: "back.inOut(1)",

        duration: 0.15,
      }
      )
      .to(
        '.creo_animated_logo_circle', {
        height: '160px',
        ease: "elastic.inOut(1.5,1)",
        duration: 0.5,
      }
      )
      .to(
        '.creo_animated_logo_circle', {
        height: '0px',
        ease: "back.inOut(1)",

        duration: 0.15,
      }
      )
      .to(
        '.creo_animated_logo_circle', {
        height: '160px',
        ease: "elastic.inOut(1.5,1)",
        duration: 0.5,
      }
      )
      .to('.creo_animated_logo_circle', {
        transform: 'translateY(50vh)',
        duration: 0.75,
        // duration:0.5,
        ease: "elastic.in(2,1)",
        marginTop: '0px',
        marginLeft: '-100px',
      })
      .to('.creo_animated_logo_circle', {
        transform: 'translateY(-100vh)',
        duration: 1,
        stagger: 0.2,
        ease: "elastic.out(2,1)",
        marginLeft: '0px'
      })

      .to('.creo_animated_logo_circle', {
        marginLeft: '0px',
        duration : 0,
      })

        // .to('header', {
        //   transform: 'translateY(0px)',
        //   duration: 0.5,
        //   // delay: 0.5,
        // })
      .to('.creo_animated_logo_container .char', {
        transform: 'translateY(0px)',
        duration: 0.25,
        // delay: 0.1,
        stagger: 0.2,
      })
      .to('.elements_underline', {
        width: '100%',
        duration: 0.25,
        // delay: 0.1,
        stagger: 0.2,
      })
      .to('.creo_animated_logo_elements_text .char', {
        transform: 'translateY(0px)',
        duration: 0.25,
        // delay: 0.1,
        stagger: 0.1,
      })
      .to('.creo_animated_logo_circle', {
        position: 'static',
        transform: 'translateY(-30px)',
        ease: 'bounce.out',
        duration: 1,
        delay: 0.5,
        marginLeft: '0px'
      })
      // .to('.creo_animated_logo_wrapper', {
      //   alignItems: 'center',
      //   duration: 0.25,
      // })
      // .to(
      //   '.creo_animated_logo_container .toberemoved', {
      //     display: 'none',
      //     duration: 0,
      //   }
      // )
      .to(wavesRef.current, {
        transform: 'translateY(0px)',
        duration: 1.5,
      })
      .to('#scrolltoexplore', {
        opacity: 1,
        duration: 1,
        delay: 0.5,
      });

    // Mouse movement logic
    const runMouseMovement = () => {
      const circle = circleRef.current;
      const pupil = pupilRef.current;
      const xMedia = window.matchMedia('(max-width: 600px)');

      function handleMouseMove(e) {
        const rect = circle.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
        const maxRadius = circle.offsetWidth / 2 - pupil.offsetWidth / 2;
        const x = centerX + Math.cos(angle) * maxRadius;
        const y = centerY + Math.sin(angle) * maxRadius;

        if (xMedia.matches) {
          pupil.style.left = `${x - rect.left - pupil.offsetWidth / 2}px`;
          pupil.style.top = `${y - rect.top - pupil.offsetHeight / 2}px`;
        } else {
          pupil.style.left = `${x - rect.left - pupil.offsetWidth / 2}px`;
          pupil.style.top = `${y - rect.top - pupil.offsetHeight / 2 - 75}px`;
        }
      }

      function setInitialPosition() {
        const rect = circle.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        if (xMedia.matches) {
          pupil.style.left = `${centerX - rect.left - pupil.offsetWidth / 2}px`;
          pupil.style.top = `${centerY - rect.top - pupil.offsetHeight / 2 + 150}px`;
        } else {
          pupil.style.left = `${centerX - rect.left - pupil.offsetWidth / 2}px`;
          pupil.style.top = `${centerY - rect.top - pupil.offsetHeight / 2 - 115}px`;
        }
      }

      function myFunction() {
        if (xMedia.matches) {
          setInitialPosition();
          window.addEventListener('scroll', setInitialPosition);
        } else {
          document.addEventListener('mousemove', handleMouseMove);
          setInitialPosition();
          window.addEventListener('scroll', handleMouseMove);
        }
      }

      myFunction();
      xMedia.addEventListener('change', myFunction);

      // Cleanup event listeners
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('scroll', handleMouseMove);
        xMedia.removeEventListener('change', myFunction);
      };
    };
  }, []);
















  return (
    <div id="section1">
      <div className="banner_space"></div>
      <div className="header">
        <span className="inner-header">
          <span className="creo_animated_logo_wrapper">
            <h1 aria-label="CREO ELEMENTS">
            <span className="creo_animated_logo_container">
              <span className="char">C</span>
              <span className="char">R</span>
              <span className="char">E</span>
              <span
                className="creo_animated_logo_circle"
                id="creo_animated_logo_circle"
                ref={circleRef}
              >
                <div
                  className="creo_animated_logo_pupil char"
                  id="creo_animated_logo_pupil"
                  ref={pupilRef}
                >
                  O
                </div>
              </span>
            </span>
            <span className="creo_animated_logo_elements_text">
              <span className='char'>E</span>
              <span className='char'>L</span>
              <span className='char'>E</span>
              <span className='char'>M</span>
              <span className='char'>E</span>
              <span className='char'>N</span>
              <span className='char'>T</span>
              <span className='char'>S</span>
            </span>
            </h1>
            <span className='elements_underline'></span>
          </span>
        </span>
        <div id="scrolltoexplore">
          Scroll to Explore<br />
          <div className="arrowdown">&darr;</div>
        </div>
        <svg
          ref={wavesRef}
          className="waves"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
          shapeRendering="auto"
        >
          <defs>
            <path
              id="gentle-wave"
              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
            />
          </defs>
          <g className="parallax">
            <use
              xlinkHref="#gentle-wave"
              className="wave1"
              x="48"
              y="0"
              fill="rgba(62,184,162,0.5)"
            />
            <use
              xlinkHref="#gentle-wave"
              className="wave2"
              x="48"
              y="5"
              fill="rgba(62,184,162,0.3)"
            />
            <use
              xlinkHref="#gentle-wave"
              className="wave3"
              x="48"
              y="7"
              fill="rgba(62,184,162,0.1)"
            />
            <use
              xlinkHref="#gentle-wave"
              className="wave4"
              x="48"
              y="8"
              fill="#3eb8a2"
            />
          </g>
        </svg>
      </div>
    </div>
  );
};
