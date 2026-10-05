import { lazy, Suspense, useLayoutEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Home from './pages/Home/Home';
import SmoothScroll from './components/SmoothScroll';
import { Header } from './components/Header';
import { CTA } from './components/Cta.jsx';
import { CustomCursor } from './components/CustomCursor.jsx';

const About = lazy(() => import('./pages/About/About.jsx').then(({ About }) => ({ default: About })));
const WorkWithUS = lazy(() => import('./pages/Work With Us/WorkWithUS.jsx').then(({ WorkWithUS }) => ({ default: WorkWithUS })));
const BlogList = lazy(() => import('./pages/Blogs/BlogList.jsx').then(({ BlogList }) => ({ default: BlogList })));
const ClientPage = lazy(() => import('./pages/Clients/Clients.jsx').then(({ ClientPage }) => ({ default: ClientPage })));
const Service = lazy(() => import('./pages/Services/Service.jsx').then(({ Service }) => ({ default: Service })));
const ContactUs = lazy(() => import('./pages/Contact Us/ContactUs.jsx'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound.jsx'));

function App() {
  const location = useLocation();
  const {pathname, search} = location;

    useLayoutEffect(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [ pathname, search ])
  


  const hideCTA = location.pathname === "/work-with-us" || location.pathname === "/contact-us";

  return (
    <div className="max-w-[1920px] mx-auto relative overflow-x-clip">
       <CustomCursor />
      <Header />
      <SmoothScroll />
      <Suspense fallback={null}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/work-with-us" element={<WorkWithUS />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/clients" element={<ClientPage />} />
          <Route path="/services/:serviceSlug" element={<Service />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      {/* <Footer /> */}
     {!hideCTA && <CTA />}
    </div>
  );
}

export default App;


