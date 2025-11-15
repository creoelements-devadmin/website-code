import React, { useState, useEffect } from 'react'
import { Grids } from '../../components/Grids'
import './Banner.css'
import WavyText from '../../components/elements/WavyText'

export const Banner = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <div className='banner z-2'>
      <div className='about-wrapper'>
        <h1> 
        
        {isMobile ? <WavyText fontSize="3rem">About Us</WavyText> : <WavyText fontSize="8rem">About Us</WavyText>}
        </h1>
        <div className='about-us'>
          Creo Elements is your one-stop shop for all things digital marketing. We help businesses of all sizes to achieve success in the ever-evolving online world. Our comprehensive suite of services helps you build a strong brand presence and drive results.
          <br />
          We offer a wide range of services, including website design & development, social media management, performance marketing, SEO, and branding solutions. We take a collaborative approach, working closely with you to understand your specific needs and develop a strategy that gets noticed.
          <br />
          Let’s make an impact together.
          <br />
          With Creo Elements as your partner, you can be confident that your brand is reaching the right audience and achieving tangible results
        </div>
      </div>
    </div>
  )
}
