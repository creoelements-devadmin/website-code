import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

import './About.css'


export const About = () => {

    


    const aboutframeRef = useRef(null);

    useEffect(() => {
        // GSAP timeline for container animation
        gsap.to(aboutframeRef.current, {
            scale: 10,
            // duration: 2,
            ease: 'power2.inOut',
            scrollTrigger: {
                trigger: '.about_section',
                scroller: 'body',
                start: 'top 0%',
                end: 'top -100%',
                scrub: 1,
                pin: true,
                // markers: true, // Show markers for debugging
                pinSpacer: false,
            }
        });


        gsap.to('.about_us_content', {
            scale: 1,
            duration: 2,
            scrollTrigger: {
                trigger: '.about_section',
                scroller: 'body',
                start: '-5% 0%',
                end: 'bottom 0%',
                // pin: true,
                scrub: 1,
                // markers: true, // Show markers for debugging
                pinSpacer: false,
            }
        });



    }





    )









    return (
        <div className="about_section">

            <div className='frame'>
                <img ref={aboutframeRef} src="/images/frame.webp" className="about_frame" alt="your road to endless possibilities"/>
            </div>
            <div className="background">
                <div className="background-image">
                    <div className='about_us_container'>
                        <div className="about_us_content">
                            <h2>About Us</h2>
                            <p>
                            Creo Elements is your one-stop shop for all things digital marketing. We help businesses of all sizes to
                            achieve success in the ever-evolving online world. Our comprehensive suite of services helps you build a
                            strong brand presence and drive results.
                            <br /><br />
                            We offer a wide range of services, including website design &amp; development, social media management,
                            performance marketing, SEO, and branding solutions. We take a collaborative approach, working closely with
                            you to understand your specific needs and develop a strategy that gets noticed.
                            <br />
                            Let's make an impact together...
                            <br /><br />
                            </p>
                            <Link to="/about" ><u className="clickable">Read More about Creo Elements</u></Link>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}
