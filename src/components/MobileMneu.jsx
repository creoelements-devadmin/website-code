import React from 'react'
import { TransitionLink } from './PageTransition';
import { faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { servicesLinks, mobileLinks } from '../data/HeaderLink';

const MobileMneu = ({
  isOpen,
  closeMenu,
  overlayRef,
  menuRef,
  servicesOpen,
  setServicesOpen,
  circleClosed,
}) => {
 
  return (
    <>
       <div
        id="mobile-menu"
        ref={overlayRef}
        aria-hidden={!isOpen}
        inert={!isOpen ? '' : undefined}
        style={{ clipPath: circleClosed, height: '100dvh' }}
        className={`fixed inset-0 z-40 flex flex-col bg-[#F5F3EF] lg:hidden ${
          isOpen ? '' : 'pointer-events-none'
        }`}
      >
        {/* Scrollable links */}
        <div
          ref={menuRef}
          data-lenis-prevent
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          style={{ touchAction: 'pan-y', WebkitOverflowScrolling: 'touch' }}
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 pt-24 pb-10"
        >
          <p className="menu-item text-sm text-black/40 mb-2">Menu</p>

          <nav aria-label="Mobile">
            {mobileLinks.map((item) => (
              <TransitionLink
                key={item.to}
                to={item.to}
                onClick={closeMenu}
                className="menu-item group flex items-center justify-between border-b border-black/10 py-4"
              >
                <span className="text-4xl font-semibold tracking-tight text-[#17181C] transition-colors group-active:text-primary">
                  {item.label}
                </span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-black/15 text-[#17181C] transition-colors group-active:bg-primary group-active:border-primary group-active:text-white">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </TransitionLink>
            ))}

            {/* Services accordion */}
            <div className="menu-item border-b border-black/10">
              <button
                type="button"
                onClick={(e) => {
                  const btn = e.currentTarget;
                  const willOpen = !servicesOpen;
                  setServicesOpen(willOpen);
                  if (willOpen) {
                    setTimeout(
                      () => btn.scrollIntoView({ behavior: 'smooth', block: 'start' }),
                      320
                    );
                  }
                }}
                aria-expanded={servicesOpen}
                aria-controls="mobile-services"
                className="flex w-full items-center justify-between py-4 text-left"
              >
                <span
                  className={`text-4xl font-semibold tracking-tight transition-colors ${
                    servicesOpen ? 'text-primary' : 'text-[#17181C]'
                  }`}
                >
                  Services
                </span>
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300 ${
                    servicesOpen
                      ? 'rotate-45 border-primary bg-primary text-white'
                      : 'border-black/15 text-[#17181C]'
                  }`}
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                  </svg>
                </span>
              </button>

              <div
                id="mobile-services"
                className={`grid transition-all duration-300 ease-out ${
                  servicesOpen ? 'grid-rows-[1fr] opacity-100 pb-5' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="flex flex-wrap gap-2">
                    {servicesLinks.map((item) => (
                      <TransitionLink
                        key={item.to}
                        to={item.to}
                        onClick={closeMenu}
                        tabIndex={servicesOpen ? 0 : -1}
                        className="rounded-full border border-black/15 px-4 py-2 text-sm text-[#33343A] active:border-primary active:text-primary"
                      >
                        {item.label}
                      </TransitionLink>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>

        {/* Footer: contact + social */}
        <div className="menu-item shrink-0 border-t border-black/10 px-6 pt-5 pb-6">
          <TransitionLink
            to="/contact-us"
            onClick={closeMenu}
            className="flex w-full items-center justify-center rounded-full bg-primary py-4 text-sm text-white"
          >
            Start a project
          </TransitionLink>

          <div className="mt-5 flex items-center justify-between text-[#17181C]">
            <a href="mailto:creoelementsllp@gmail.com" className="text-sm text-black/60 underline underline-offset-4">
              creoelementsllp@gmail.com
            </a>
            <div className="flex gap-5 text-lg">
              <a href="#" aria-label="Twitter" target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="#" aria-label="Instagram" target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MobileMneu
