import React from 'react'

const MapBox = ({ className }) => {
  return (
    <>
         
     <div className={`h-75 mt-5 rounded-4xl overflow-hidden w-full ${className}`}>
        <iframe
            title="Creo Elements office location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2426.244420302669!2d72.83156759773648!3d18.947068128711894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ce217d544c37%3A0x42b38f7b17b54443!2sMulchand%20Mansion%2C%20Dr%20Viegas%20St%2C%20Chippi%20Chawl%2C%20Kalbadevi%2C%20Mumbai%2C%20Maharashtra%20400002!5e1!3m2!1sen!2sin!4v1789125426017!5m2!1sen!2sin"
            width="100%"
            height="100%"
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
        ></iframe>
    </div>
 
       
    </>
  )
}

export default MapBox
