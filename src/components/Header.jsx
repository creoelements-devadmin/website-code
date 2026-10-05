import { useEffect, useRef, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import gsap from 'gsap';
import { useLocation } from 'react-router-dom';
import { Button } from './Button';
import { TransitionLink } from './PageTransition';
import MobileMenu from './MobileMneu';
import { primaryLinks, servicesLinks,  formatNumber } from '../data/HeaderLink';


// Where the circle reveal starts: the hamburger button (top right)
const CIRCLE_ORIGIN = 'calc(100% - 44px) 36px';
const CIRCLE_CLOSED = `circle(0px at ${CIRCLE_ORIGIN})`;
const CIRCLE_OPEN = `circle(150% at ${CIRCLE_ORIGIN})`;

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const bgRef = useRef(null);
  const overlayRef = useRef(null);
  const menuRef = useRef(null);
  const linesRef = useRef([]);
  const tlRef = useRef(null);
  const location = useLocation();

  const closeMenu = () => setIsOpen(false);
 const hideBtn = location.pathname === '/contact-us';
  // Header background on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    gsap.to(bgRef.current, {
      opacity: scrolled ? 1 : 0,
      duration: 0.5,
      ease: 'power2.out',
    });
  }, [scrolled]);

 

  // Mobile menu open / close animation
  useEffect(() => {
    const overlay = overlayRef.current;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const t = (n) => (reduce ? 0 : n);

    tlRef.current?.kill();

    if (isOpen) {
      document.body.style.overflow = 'hidden';

      gsap.to(linesRef.current[0], { rotate: 45, y: 6, duration: t(0.35) });
      gsap.to(linesRef.current[1], { opacity: 0, duration: t(0.2) });
      gsap.to(linesRef.current[2], { rotate: -48, y: -8, duration: t(0.35) });

      const items = menuRef.current.querySelectorAll('.menu-item');

      tlRef.current = gsap
        .timeline()
        .fromTo( overlay,
          { clipPath: CIRCLE_CLOSED },
          { clipPath: CIRCLE_OPEN, duration: t(0.8), ease: 'power3.inOut' }
        )
        .fromTo( items,
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, duration: t(0.5), stagger: t(0.06), ease: 'power3.out' },
          '-=0.4'
        );
    } else {
      document.body.style.overflow = '';
      setServicesOpen(false);

      gsap.to(linesRef.current, { rotate: 0, y: 0, opacity: 1, duration: t(0.3) });

      tlRef.current = gsap.to(overlay, {
        clipPath: CIRCLE_CLOSED,
        duration: t(0.55),
        ease: 'power3.inOut',
      });
    } return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 z-50 w-full">
        <div ref={bgRef} className="absolute inset-0 opacity-0 backdrop-blur-lg transition-opacity duration-500" />

        <div className="relative flex items-center justify-between px-5 py-2 md:px-8">
          {/* Logo */}
          <TransitionLink to="/" className="relative z-50" onClick={isOpen ? closeMenu : undefined}>
            <img
              src="/images/CreoLogo.png"
              loading="lazy"
              alt="Creo Elements LLP"
              className="w-20 md:w-24"
            />
          </TransitionLink>

          {/* Desktop navigation (unchanged) */}
          <nav className="hidden items-center gap-9 text-sm text-[#17181C] lg:flex">
            <div className="group relative">
              <div className="flex cursor-pointer items-center gap-1">
                <span>Services</span>
                <FaChevronDown className="text-xs transition-transform duration-300 group-hover:rotate-180" />
              </div>

              <div className="pointer-events-none absolute left-1/2 top-full -translate-x-1/2 translate-y-1 scale-[0.97] pt-3 opacity-0 transition-all duration-300 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100">
                <div className="w-[420px] rounded-md border border-black/[0.08] bg-[#F5F3EF] p-2 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)]">
                  {servicesLinks.map((item, index) => (
                    <TransitionLink
                      key={item.to}
                      to={item.to}
                      className="group/link flex items-center justify-between border-black/[0.05] px-4 py-2.5 text-sm text-[#33343A] transition-colors last:border-0 hover:text-primary"
                    >
                      <span>{item.label}</span>
                      <span className="text-xs text-black/30">{formatNumber(index)}</span>
                    </TransitionLink>
                  ))}
                </div>
              </div>
            </div>

            {primaryLinks.map((item) => (
              <TransitionLink key={item.to} to={item.to} className="group relative py-2">
                {item.label}
                <span className="absolute bottom-0 left-0 h-[1.5px] w-full origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />
              </TransitionLink>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-5">
            <div className="hidden lg:block">
              {!hideBtn && ( <Button name="Contact" target="/contact-us" />)}
            </div>

            <button
              type="button"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              onClick={() => setIsOpen((open) => !open)}
              className={`relative z-50 flex h-12 w-12 flex-col items-center justify-center gap-1.5 shadow rounded-full lg:hidden ${
                isOpen ? 'bg-primary' : 'bg-btnPrimary text-white'
              }`}
            >
              {[0, 1, 2].map((index) => (
                <span
                  key={index}
                  ref={(el) => (linesRef.current[index] = el)}
                  className="block h-[1.5px] w-7 bg-white"
                />
              ))}
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={isOpen}
        closeMenu={closeMenu}
        overlayRef={overlayRef}
        menuRef={menuRef}
        servicesOpen={servicesOpen}
        setServicesOpen={setServicesOpen}
        circleClosed={CIRCLE_CLOSED}
      />


      {/* ---------- Mobile menu ---------- */}
      
    </>
  );
};