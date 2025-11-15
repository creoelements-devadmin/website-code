import React, { useEffect } from 'react'
import './Story.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'

export const Story = () => {
    useEffect(() => {
        // Register plugins
        gsap.registerPlugin(ScrollTrigger);

            

        // GSAP timeline for the accordion animations
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.accordions',
                pin: true,
                start: 'top 150',
                end: 'bottom 150',
                scrub: 1,
                ease: 'linear',
                // markers: true
            }
        });

        // Animation for the accordion content
        tl.to('.accordion .text', {
            height: 0,
            paddingBottom: 0,
            opacity: 0,
            stagger: 0.5,
        });

        tl.to('.accordion', {
            marginBottom: -15,
            stagger: 0.5,
        }, '<');

        // Clean up ScrollTrigger and GSAP instances on component unmount
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <div className='storyline z-2'>
            <div className="story-head">
                <h2>Here's how we empower your digital success:</h2>
            </div>
            <div className='story-content'>
                <div id="wrapper">
                    <div id="content">
                        {/* <div className="spacer"></div> */}
                        <div className="accordions">
                            <div className="accordion">
                                <div className="title">Crafting Your Story:</div>
                                <div className="text">
                                We craft compelling digital marketing strategies that enhances  your brand, engage your audience, and drive business growth.
                                </div>
                            </div>
                            <div className="accordion">
                                <div className="title">Building Trust & Authority:</div>
                                <div className="text">
                                A digital presence establishes credibility and builds trust with potential customers. They know you’re a legitimate business invested in their needs.
                                </div>
                            </div>
                            <div className="accordion">
                                <div className="title">Driving Traffic & Leads:</div>
                                <div className="text">
                                We don’t just build websites, we make them magnets for your ideal audience. Through targeted social media management and data-driven performance marketing, we attract the right people and convert them into loyal customers.
                                </div>
                            </div>
                            <div className="accordion">
                                <div className="title">Making You Visible:</div>
                                <div className="text">
                                Whether it’s social media buzz or strategic search engine optimization (SEO), we get your brand seen by the people who matter most.
                                </div>
                            </div>
                        </div>
                        {/* <div className="spacer"></div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}
