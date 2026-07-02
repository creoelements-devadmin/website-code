import React, { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import './Clients.css';
import { FreeMode, Pagination, Autoplay } from 'swiper/modules';

export const logos1 = [
  {
    name: 'Atul Kasbekar',
    url: 'https://creo-elements.com/blogs/wp-content/uploads/2025/05/Atul_Kasbekar.png'
  },
  {
    name: "Eesha Amiin",
    url: 'https://creo-elements.com/blogs/wp-content/uploads/2025/07/eshaa-amiin-logo.webp'
  }, //Eesha Amiin
  {
    name: "Preeti McConkey",
    url: 'https://creo-elements.com/blogs/wp-content/uploads/2025/05/Preeti_McConkey.jpeg'
  },
  {
    name: "IVCCI - Indo-Vietnam Chamber of Commerce and Industry",
    url: 'https://creo-elements.com/blogs/wp-content/uploads/2025/05/IVCCI_-_Indo-Vietnam_Chamber_of_Commerce_and_Industry-scaled-e1779259709469.png'
  }, //IVCCI
  {
    name: "The Ke Concept",
    url: 'https://creo-elements.com/blogs/wp-content/uploads/2025/05/The_Ke_Concept.jpg'
  },
  {
    name: "Experience Jaisalmer",
    url: 'https://creo-elements.com/blogs/wp-content/uploads/2025/05/Experience_Jaisalmer-e1779259824382.png'
  },
  {
    name: "Puri Developers",
    url: 'https://creo-elements.com/blogs/wp-content/uploads/2025/05/PuriDevelopers.png'
  }, //Puri
  {
    name: "NYPeas",
    url: 'https://creo-elements.com/blogs/wp-content/uploads/2025/05/NYPeas-e1779260170501.png'
  },
  {
    name: "Sila",
    url: 'https://creo-elements.com/blogs/wp-content/uploads/2025/05/Sila-e1779260244788.jpg'
  }, //Sila
  {
    name: "Radhika Dhawan",
    url: 'https://creo-elements.com/blogs/wp-content/uploads/2025/06/Radhika-Logo.png'
  }, //Radhika
  {
    name: "Inara by Sana Pathella",
    url: 'https://creo-elements.com/blogs/wp-content/uploads/2025/06/Inara-by-sana.png'
  }, 
  {
    name: "DBSmashers (Hong Kong)",
    url: 'https://creo-elements.com/blogs/wp-content/uploads/2025/05/DBSmashers_Hong_Kong.png'
  },
  {
    name: "United Surgical Traders",
    url: 'https://creo-elements.com/blogs/wp-content/uploads/2025/05/United_Surgical_Traders.png'
  },
  {
    name: "Little Things Cute",
    url: 'https://creo-elements.com/blogs/wp-content/uploads/2025/05/Little_Things_Cute.webp'
  },
  {
    name: "Cute Style Pick (Kalbadevi)",
    url: 'https://creo-elements.com/blogs/wp-content/uploads/2025/05/Cute_Style_Pick_Kalbadevi.webp'
  },
  {
    name: "EtherWire",
    url: 'https://creo-elements.com/blogs/wp-content/uploads/2025/05/EtherWire-e1779263462133.jpeg'
  }, //EtherWire
  {
    name: "Zircon Limited",
    url: 'https://creo-elements.com/blogs/wp-content/uploads/2025/05/Zircon_Limited-e1779259418106.png'
  },
  // {
  //   name: "Project Co.",
  //   url: 'https://creo-elements.com/blogs/wp-content/uploads/2025/05/Project_Co.jpg'
  // }, //Project Co.
  {
    name: "Kids And Bag Store",
    url: 'https://creo-elements.com/blogs/wp-content/uploads/2025/05/Kids_And_Bag_Store-scaled-e1779260439737.png'
  },
  // {
  //   name: "Doodlz",
  //   url: 'https://creo-elements.com/blogs/wp-content/uploads/2025/05/Doodlz.jpg'
  // }, //Doodlz
  {
    name: "HSBC",
    url: 'https://creo-elements.com/blogs/wp-content/uploads/2025/05/HSBC-e1779263715618.jpg'
  }, //HSBC
  {
    name: "Trupsel",
    url: 'https://creo-elements.com/blogs/wp-content/uploads/2025/05/Trupsel.png'
  }, //Trupsel
  {
    name: "MMBharwada",
    url: 'https://creo-elements.com/blogs/wp-content/uploads/2025/05/MMBharwada-e1779260735444.png'
  },
];

export const logos2 = [
  {
    name: "Allestate",
    url: 'https://creo-elements.com/blogs/wp-content/uploads/2026/05/ChatGPT-Image-May-20-2026-01_02_28-AM-e1779264376706.png'
  },
  {
    name: "SSSCPA",
    url: 'https://creo-elements.com/blogs/wp-content/uploads/2025/07/SSSCPALOGO-scaled.png'
  },
  {
    name: "Irah Lifespace",
    url: 'https://creo-elements.com/blogs/wp-content/uploads/2025/05/Irah_Lifespace.png'
  },
  {
    name: "RAY",
    url: 'https://creo-elements.com/blogs/wp-content/uploads/2025/05/RAY.png'
  },
  {
    name: "House Of EEKKTA",
    url: 'https://creo-elements.com/blogs/wp-content/uploads/2025/05/House_Of_EEKKTA.png'
  },
  {
    name: "Here Comes The Bride",
    url: 'https://creo-elements.com/blogs/wp-content/uploads/2025/06/HCTB-logo-with-tagline.png'
  },
  {
    name: "Sleepy Tots Nightwear",
    url: 'https://creo-elements.com/blogs/wp-content/uploads/2025/05/Sleepy_Tots_Nightwear-scaled-e1779261284427.png'
  },
  {
    name: "Dorii",
    url: 'https://creo-elements.com/blogs/wp-content/uploads/2025/05/Dorii-e1779263581409.png'
  },
  {
    name: "Atelier Shibani",
    url: 'https://creo-elements.com/blogs/wp-content/uploads/2025/05/Atelier_Shibani.png'
  }, //AtelierShibani
  {
    name: "MTBA - Maharashtra Tenpin Bowling Association",
    url: 'https://creo-elements.com/blogs/wp-content/uploads/2025/05/MTBA_-_Maharashtra_Tenpin_Bowling_Association-e1779260620268.png'
  },
  {
    name: "Meher Roshani Foundation",
    url: 'https://creo-elements.com/blogs/wp-content/uploads/2025/05/Meher_Roshani_Foundation.webp'
  },
  {
    name: "Parinie",
    url: 'https://creo-elements.com/blogs/wp-content/uploads/2025/05/Parinie.png'
  },
  {
    name: "Natasha The Dentist",
    url: 'https://creo-elements.com/blogs/wp-content/uploads/2025/05/Natasha_The_Dentist-e1779261196809.jpg'
  },
  {
    name: "Social Toast",
    url: 'https://creo-elements.com/blogs/wp-content/uploads/2025/05/Social_Toast-scaled-e1779261499929.png'
  },
  {
    name: "Artangle90",
    url: 'https://creo-elements.com/blogs/wp-content/uploads/2026/05/ChatGPT-Image-May-20-2026-12_35_05-AM.png'
  },
  //Artangle
  {
    name: "The Inner Shift",
    url: 'https://creo-elements.com/blogs/wp-content/uploads/2025/05/The_Inner_Shift-e1779261586382.jpg'
  }, //The Inner Shift
  // {
  //   name: "CoolLab Project",
  //   url: 'https://creo-elements.com/blogs/wp-content/uploads/2025/05/CoolLab_Project.jpg'
  // }, //CoolLab Project
  // {
  //   name: "Be Desi",
  //   url: 'https://creo-elements.com/blogs/wp-content/uploads/2025/05/Be_Desi.jpg'
  // }, //Be Desi
  // {
  //   name: "FNQ",
  //   url: 'https://creo-elements.com/blogs/wp-content/uploads/2025/05/FNQ.jpg'
  // }, //FnQ
  {
    name: "360South",
    url: 'https://creo-elements.com/blogs/wp-content/uploads/2025/05/360South-e1779260849443.png'
  }, //360South
  {
    name: "Roshanishenazz",
    url: "https://creo-elements.com/blogs/wp-content/uploads/2026/01/roshani-logo.png"
  },
  {
    name: "Roshanishenazz",
    url: "https://creo-elements.com/blogs/wp-content/uploads/2026/01/RS-Signature.png"
  },
  {
    name: "CooperSilicotex",
    url: "https://creo-elements.com/blogs/wp-content/uploads/2026/01/coopersilicotex-logo-cropped.webp"
  },
  {
    name: "Akira Jewels",
    url: "https://creo-elements.com/blogs/wp-content/uploads/2026/01/AkiraJewels.png"
  },
  {
    name: "Tpc",
    url: "https://creo-elements.com/blogs/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-14-at-5.20.20-PM.jpeg"
  },
  {
    name: "Sajeda A Lehary ",
    url: "https://creo-elements.com/blogs/wp-content/uploads/2026/04/Sajeda-A-Lehry-Logo.png"
  },
  {
    name: "Treatfully Yours ",
    url: "https://creo-elements.com/blogs/wp-content/uploads/2026/05/TreatfullYoursLogo-e1779263213574.jpeg"
  },
  {
    name: "ODE the futra ",
    url: "https://creo-elements.com/blogs/wp-content/uploads/2026/07/ODE_logo_transparent.png"
  },
  {
    name: "Storeeva ",
    url: "https://creo-elements.com/blogs/wp-content/uploads/2026/05/ChatGPT-Image-May-20-2026-02_20_30-AM.png"
  },
  {
    name: "manishadesign ",
    url: "https://creo-elements.com/blogs/wp-content/uploads/2026/07/ChatGPT-Image-Jul-2-2026-03_39_37-AM.png"
  }
];

export const Clients = () => {
  const firstSwiperRef = useRef(null);
  const secondSwiperRef = useRef(null);

  const handleVisibility = (entries, swiperRef) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        swiperRef.current?.swiper?.autoplay.start();
      } else {
        swiperRef.current?.swiper?.autoplay.stop();
      }
    });
  };

  useEffect(() => {
    const firstObserver = new IntersectionObserver(
      (entries) => handleVisibility(entries, firstSwiperRef),
      { threshold: 0.5 }
    );

    const secondObserver = new IntersectionObserver(
      (entries) => handleVisibility(entries, secondSwiperRef),
      { threshold: 0.5 }
    );

    if (firstSwiperRef.current) {
      firstObserver.observe(firstSwiperRef.current);
    }
    if (secondSwiperRef.current) {
      secondObserver.observe(secondSwiperRef.current);
    }

    return () => {
      if (firstSwiperRef.current) {
        firstObserver.unobserve(firstSwiperRef.current);
      }
      if (secondSwiperRef.current) {
        secondObserver.unobserve(secondSwiperRef.current);
      }
    };
  }, []);

  return (
    <section className="clients-container full-width" id="clients-section">
      <div className='clients-container-wrapper'>
        <h2>Our Clients</h2>
        <p style={{ textAlign: 'center' }}>We are proud to work with a diverse range of trusted clients and partners.</p>

        <div className='clients-swiper-wrapper'>
          <div className='clients-overlay'></div>
          <div className='firstswiper-wrapper' ref={firstSwiperRef}>
            <Swiper
              slidesPerView={5}
              spaceBetween={30}
              freeMode={true}
              loop={true}
              autoplay={{
                delay: 0,
                disableOnInteraction: false,
              }}
              speed={6000}
              modules={[FreeMode, Pagination, Autoplay]}
              className="mySwiper"
            >
              {logos1.map((logo, index) => (
                <SwiperSlide key={index}>
                  <img src={logo.url} alt={logo.name} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className='secondswiper-wrapper' ref={secondSwiperRef}>
            <Swiper
              slidesPerView={5}
              spaceBetween={30}
              freeMode={true}
              loop={true}
              autoplay={{
                delay: 0,
                disableOnInteraction: false,
                reverseDirection: true,
              }}
              speed={6000}
              modules={[FreeMode, Pagination, Autoplay]}
              className="mySwiper reverseSwiper"
            >
              {logos2.map((logo, index) => (
                <SwiperSlide key={index}>
                  <img src={logo.url} alt={logo.name} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};
