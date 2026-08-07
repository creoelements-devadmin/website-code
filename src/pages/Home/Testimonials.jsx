import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectFade, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import './Testimonials.css';
import * as data from './Testimonials.json';

export const Testimonials = () => {
  const slidesData = data.slidesData;
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="testimonials-modern-container">
      <div className="testimonials-eyebrow">
        <span className="testimonials-eyebrow-dot" />
        Client Voices
      </div>
      <h2 className="testimonials-heading">What our clients are saying</h2>

      <div className="testimonials-stage">
        <Swiper
          modules={[Navigation, EffectFade, Autoplay]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          loop
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          navigation={{
            nextEl: '.testimonial-arrow-next',
            prevEl: '.testimonial-arrow-prev',
          }}
          className="testimonials-modern-swiper"
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        >
          {slidesData.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="testimonial-modern-card">
                <div className="testimonial-modern-visual">
                  <img src={slide.image} alt={slide.content.title} />
                </div>
                <div className="testimonial-modern-content">
                  <span className="testimonial-modern-badge">{slide.content.title}</span>
                  <div className="testimonial-modern-scroll">
                    <p className="testimonial-modern-text">{slide.content.text}</p>
                  </div>
                  <div className="testimonial-modern-author">
                    <div className="testimonial-modern-name">{slide.content.name}</div>
                    {slide.content.designation && (
                      <div className="testimonial-modern-role">{slide.content.designation}</div>
                    )}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}

          <div className="testimonial-arrow testimonial-arrow-prev">
            <svg width="20" height="20" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.5 21L11 14L17.5 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="testimonial-arrow testimonial-arrow-next">
            <svg width="20" height="20" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.5 7L17 14L10.5 21" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </Swiper>
      </div>

      <div className="testimonial-progress-track">
        <div key={activeIndex} className="testimonial-progress-fill" />
      </div>

      <div className="testimonial-counter">
        <span className="testimonial-counter-current">{String(activeIndex + 1).padStart(2, '0')}</span>
        <span className="testimonial-counter-sep"> / </span>
        <span className="testimonial-counter-total">{String(slidesData.length).padStart(2, '0')}</span>
      </div>
    </section>
  );
};