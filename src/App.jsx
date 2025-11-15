import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Home from './pages/Home/Home';
import About from './pages/About/About';
import { Header } from './components/Header';
import { HeaderMobile } from './components/HeaderMobile';
import Footer from './components/Footer';
import './App.css';
import Cursor from './components/Cursor';
import { Service } from './pages/Services/Service';
import { CreoLogo } from './components/elements/CreoLogo';
import { WorkWithUS } from './pages/Work With Us/WorkWithUS';
import { ContactUS } from '/src/pages/Contact Us/ContactUs.jsx';
import { Blogs } from './pages/Blogs/Blogs'
import { BlogDetail } from './pages/Blogs/BlogDetail';
import { BlogList } from './pages/Blogs/BlogList';
import { Member } from './pages/Team/Member'
import { ClientPage } from './pages/Clients/Clients'
import NotFound from "./pages/NotFound/NotFound";
import Experiment from './components/Experiment';
import ExperimentHeader from './components/ExperimentHeader';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faFontAwesome, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'

import Lenis from '@studio-freight/lenis';  // << NEW import

library.add(fas, faTwitter, faFontAwesome, faInstagram, faLinkedinIn)

function App() {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 825);

  // Setup smooth scroll (Lenis)
  useEffect(() => {
    const lenis = new Lenis({
      smooth: true,
      smoothTouch: false, // if you want mobile to be default browser scroll
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Scroll to hash links (already good)
  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const elementId = hash.replace("#", "");
      const scrollToHashElement = () => {
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        } else {
          setTimeout(scrollToHashElement, 100);
        }
      };
      scrollToHashElement();
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 825);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      {isMobile ? '' : <Cursor />}
      {isMobile ? '' : <CreoLogo />}

      <a href="https://www.instagram.com/creoelements/" className='instagram-icon clickable' target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon="fa-brands fa-instagram" />
      </a>
      <a href="http://linkedin.com/company/creoelementsllp" className='instagram-icon linkedin-icon clickable' target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon="fa-brands fa-linkedin-in" />
      </a>

      {isMobile ? <HeaderMobile /> : <Header />}

      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/work-with-us" element={<WorkWithUS />} />
        <Route path="/contact-us" element={<ContactUS />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/clients" element={<ClientPage />} />
        <Route path="/blog/:blogId" element={<BlogDetail />} />
        <Route path="/services/:serviceSlug" element={<Service />} />
        <Route path="/team/:memberSlug" element={<Member />} />
        <Route path="/experiment" element={<ExperimentHeader />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
