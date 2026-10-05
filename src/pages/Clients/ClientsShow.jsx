import React, { useState } from 'react';
import { ClientsLogo } from '../../data/ClientsData';

export const ClientsShow = () => {
  const [isActive, setisActive] = useState(null);
  const handleMobileToggle = (index) => {
    setisActive(isActive === index ? null : index)
  }

  return (
    <section className="w-full bg-white">
      <div className="max-w-6xl mx-auto px-6 sm:px-12 lg:px-20 pt-20 sm:pt-28 pb-10 sm:pb-14">
        <div className="flex items-baseline justify-between gap-4 font-Poppins">
          <span className="text-xs text-gray-500">Selected clients</span>
          <span className="text-xs text-gray-400">{ClientsLogo.length} brands we’ve partnered with</span>
        </div>
      </div>

      <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 border-t border-gray-200">
        {ClientsLogo.map((img, index) => {
          const isActiveImg = isActive === index;
          return (
            <div onClick={() => handleMobileToggle(index)} key={index}
              className="group relative w-full h-55 sm:h-65 border-r border-b border-gray-200 overflow-hidden">

              <img className={`w-full h-full object-contain p-10 lg:grayscale lg:opacity-60 duration-300 ease-out group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 ${isActiveImg ? 'grayscale-0 opacity-100 scale-105' : ""}`}
                src={img.url}
                loading="lazy"
                alt={img.name} />

              <div className={`absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out bg-primary ${isActiveImg ? "!translate-y-0 " : ''}`}>
                <span className="block text-center text-white text-xs md:text-base font-Poppins capitalize py-3">
                  {img.name}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}