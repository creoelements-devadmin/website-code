import React, { useEffect } from 'react'
import './StoryMobile.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'

export const StoryMobile = () => {
    useEffect(() => {
        // Register plugins
        gsap.registerPlugin(ScrollTrigger);

            

        // GSAP timeline for the accordion animations
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.mobile-accordions',
                pin: true,
                start: '0 150',
                end: 'bottom 150',
                scrub: 1,
                ease: 'linear',
                // markers: true
            }
        });

        // Animation for the accordion content
        tl.to('.mobile-accordion .mobile-text', {
            height: 0,
            paddingBottom: 0,
            opacity: 0,
            stagger: 0.5,
        });

        tl.to('.mobile-accordion', {
            marginBottom: -15,
            stagger: 0.5,
        }, '<');

        // Clean up ScrollTrigger and GSAP instances on component unmount
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <div className='mobile-storyline z-2'>
            <div className="mobile-story-head">
                <h2>Here's how we empower your digital success:</h2>
            </div>
            <div className='mobile-story-content'>
                <div id="wrapper">
                    <div id="content">
                        {/* <div className="mobile-spacer"></div> */}
                        <div className="mobile-accordions">
                            <div className="mobile-accordion">
                                <div className="mobile-title">Crafting Your Story:</div>
                                <div className="mobile-text">
                                We build websites that showcase your brand, your values, and what makes you unique. It’s your online storefront, telling the world who you are and why they should choose you.
                                </div>
                            </div>
                            <div className="mobile-accordion">
                                <div className="mobile-title">Building Trust & Authority:</div>
                                <div className="mobile-text">
                                A professional website establishes credibility and builds trust with potential customers. They know you’re a legitimate business invested in their needs.
                                </div>
                            </div>
                            <div className="mobile-accordion">
                                <div className="mobile-title">Driving Traffic & Leads:</div>
                                <div className="mobile-text">
                                We don’t just build websites, we make them magnets for your ideal audience. Through targeted social media management and data-driven performance marketing, we attract the right people and convert them into loyal customers.
                                </div>
                            </div>
                            <div className="mobile-accordion">
                                <div className="mobile-title">Making You Visible:</div>
                                <div className="mobile-text">
                                Whether it’s social media buzz or strategic search engine optimization (SEO), we get your brand seen by the people who matter most.
                                </div>
                            </div>
                        </div>
                        {/* <div className="mobile-spacer"></div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}
