// CustomCursor.jsx
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { GoArrowUpRight } from "react-icons/go";

const HOVER_SELECTOR = 'a, button, [role="button"], [data-cursor]';

export const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);
  const iconRef = useRef(null);

  const dotPos = useRef({ x: 0, y: 0 });
  const quickDot = useRef({ x: null, y: null });
  const quickRing = useRef({ x: null, y: null });

  const [isTouch, setIsTouch] = useState(false);
  const [hoverState, setHoverState] = useState(null); // null | "link" | "text" | "drag"

  // Detect touch/coarse-pointer devices — no custom cursor there
  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    setIsTouch(mq.matches);
    const handler = (e) => setIsTouch(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (isTouch) return;

    document.body.classList.add("custom-cursor-active");

    quickDot.current = {
      x: gsap.quickTo(dotRef.current, "x", { duration: 0.12, ease: "power3.out" }),
      y: gsap.quickTo(dotRef.current, "y", { duration: 0.12, ease: "power3.out" }),
    };
    quickRing.current = {
      x: gsap.quickTo(ringRef.current, "x", { duration: 0.35, ease: "power3.out" }),
      y: gsap.quickTo(ringRef.current, "y", { duration: 0.35, ease: "power3.out" }),
    };

    const handleMove = (e) => {
      dotPos.current = { x: e.clientX, y: e.clientY };
      quickDot.current.x(e.clientX);
      quickDot.current.y(e.clientY);
      quickRing.current.x(e.clientX);
      quickRing.current.y(e.clientY);
    };

    const handleDown = () => {
      gsap.to(ringRef.current, { scale: hoverState ? 1 : 0.7, duration: 0.25, ease: "power3.out" });
    };
    const handleUp = () => {
      gsap.to(ringRef.current, { scale: 1, duration: 0.3, ease: "back.out(2)" });
    };

    const handleEnter = () => {
      gsap.to([dotRef.current, ringRef.current], { opacity: 1, duration: 0.25 });
    };
    const handleLeave = () => {
      gsap.to([dotRef.current, ringRef.current], { opacity: 0, duration: 0.25 });
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);
    document.addEventListener("mouseenter", handleEnter);
    document.addEventListener("mouseleave", handleLeave);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
      document.removeEventListener("mouseenter", handleEnter);
      document.removeEventListener("mouseleave", handleLeave);
    };
  }, [isTouch, hoverState]);

  
  useEffect(() => {
    if (isTouch) return;

    const handleOver = (e) => {
      const target = e.target.closest(HOVER_SELECTOR);
      if (!target) return;

      const cursorType = target.getAttribute("data-cursor") || "link";
      const cursorText = target.getAttribute("data-cursor-text") || "";

      setHoverState(cursorType);

      if (labelRef.current) labelRef.current.textContent = cursorText;

      gsap.to(ringRef.current, {
        scale: cursorType === "text" ? 2.1 : 1.1,
        duration: 0.4,
        ease: "power3.out",
      });
      gsap.to(dotRef.current, { scale: 0, duration: 0.2 });
      if (cursorText) {
        gsap.to(labelRef.current, { opacity: 1, duration: 0.25, delay: 0.05 });
      } else if (iconRef.current) {
        gsap.to(iconRef.current, { opacity: 1, scale: 1, duration: 0.3, delay: 0.05, ease: "back.out(2)" });
      }
    };

    const handleOut = (e) => {
      const target = e.target.closest(HOVER_SELECTOR);
      if (!target) return;
      const related = e.relatedTarget;
      if (related && target.contains(related)) return;

      setHoverState(null);
      gsap.to(ringRef.current, { scale: 1, duration: 0.35, ease: "power3.out" });
      gsap.to(dotRef.current, { scale: 1, duration: 0.25 });
      gsap.to(labelRef.current, { opacity: 0, duration: 0.15 });
      gsap.to(iconRef.current, { opacity: 0, scale: 0.6, duration: 0.15 });
    };

    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);

    return () => {
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <>
      {/* Precision dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary opacity-0 mix-blend-normal"
        style={{ willChange: "transform" }}
      />

      {/* Trailing ring / expandable label bubble */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-btnPrimary/70 bg-primary/0 opacity-0 backdrop-blur-[1px] transition-colors duration-300"
        style={{ willChange: "transform" }}
      >
        <span
          ref={labelRef}
          className="pointer-events-none absolute whitespace-nowrap font-Poppins text-[11px] uppercase tracking-widest text-btnPrimary opacity-0"
        />
        <GoArrowUpRight
          ref={iconRef}
          className="pointer-events-none absolute scale-50 text-sm text-btnPrimary opacity-0"
        />
      </div>
    </>
  );
};