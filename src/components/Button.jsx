import { useRef } from "react";
import gsap from "gsap";
import { GoArrowUpRight } from "react-icons/go";
import { TransitionLink } from "./PageTransition";

export const Button = ({ name, target }) => {
  const btnRef = useRef(null);
  const fillRef = useRef(null);
  const labelRef = useRef(null);
  const labelHoverRef = useRef(null);
  const isExternal = /^(https?:|mailto:|tel:)/.test(target);
  const LinkComponent = isExternal ? "a" : TransitionLink;

  const relativePos = (e) => {
    const rect = btnRef.current.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const handleEnter = (e) => {
    if (!btnRef.current) return;
    const { x, y } = relativePos(e);

     gsap.killTweensOf([fillRef.current, labelRef.current, labelHoverRef.current]);

  
    gsap.set(fillRef.current, { x, y, xPercent: -50, yPercent: -50, scale: 0 });
    gsap.to(fillRef.current, { scale: 4, duration: 0.6, ease: "power3.out" });
    gsap.to(labelRef.current, { y: "-150%", duration: 0.5, ease: "power3.out" });
    gsap.to(labelHoverRef.current, {
      y: "0%",
      duration: 0.5,
      ease: "power3.out",
      delay: 0.05,
    });
  };

  const handleLeave = (e) => {
    if (!btnRef.current) return;
    const { x, y } = relativePos(e);

    gsap.killTweensOf([fillRef.current, labelRef.current, labelHoverRef.current]);

    gsap.set(fillRef.current, { x, y, xPercent: -50, yPercent: -50 });
    gsap.to(fillRef.current, { scale: 0, duration: 0.4, ease: "power2.inOut" });
    gsap.to(labelRef.current, { y: "0%", duration: 0.4, ease: "power3.out" });
    gsap.to(labelHoverRef.current, { y: "130%", duration: 0.4, ease: "power3.out" });
  };

  return (
    <LinkComponent
      ref={btnRef}
      {...(isExternal ? { href: target } : { to: target })}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="group relative flex h-11 z-20 hover:scale-105   w-fit px-4 items-center justify-center overflow-hidden rounded-full bg-btnPrimary shadow text-white transition-all duration-500 ease-in-out"
    >
      <span
        ref={fillRef}
        className="pointer-events-none absolute left-0 top-0 h-28 w-28 scale-0 rounded-full bg-primary"
      />

      <span ref={labelRef} className="relative flex items-center gap-2 z-10 text-sm">
        {name} <GoArrowUpRight />
      </span>

      <span
        ref={labelHoverRef}
        className="absolute inset-0 z-10 flex translate-y-[132%] items-center justify-center gap-2 text-sm"
      >
        {name} <GoArrowUpRight />
      </span>
    </LinkComponent>
  );
};