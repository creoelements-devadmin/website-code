import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import './Testimonials.css';
import * as data from './Testimonials.json';

export const Testimonials = () => {
  const slidesData = data.slidesData;
  const swiperRef = useRef(null);

  return (
    <section className="testimonials-modern-container">
      <Swiper
        modules={[Navigation, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        navigation={{
          nextEl: '.testimonial-arrow-next',
          prevEl: '.testimonial-arrow-prev',
        }}
        loop
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className="testimonials-modern-swiper"
        onSwiper={swiper => (swiperRef.current = swiper)}
      >
        {slidesData.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="testimonial-modern-card">
              <div className="testimonial-modern-content">
                <div className="testimonials-title">{slide.content.title}</div>
                <p className="testimonial-modern-text">{slide.content.text}</p>
                <div className="testimonial-modern-author">
                  <div className="testimonial-modern-name">- {slide.content.name}</div>
                  <div className="testimonial-modern-role">{slide.content.designation}</div>
                </div>
              </div>
              <div className="testimonial-modern-image">
                <img src={slide.image} alt={slide.content.name} />
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="testimonial-arrow testimonial-arrow-prev">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="14" cy="14" r="14" fill="#1e6f5c"/>
            <path d="M17.5 21L11 14L17.5 7" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="testimonial-arrow testimonial-arrow-next">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="14" cy="14" r="14" fill="#1e6f5c"/>
            <path d="M10.5 7L17 14L10.5 21" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </Swiper>
    </section>
  );
};
