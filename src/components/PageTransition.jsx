// PageTransition.jsx
import {
  createContext,
  useContext,
  useLayoutEffect,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import gsap from "gsap";
import { forwardRef } from "react";
import { servicesData } from "../data/ServiceData";

const pageLabels = {
  "/": "Home",
  "/about": "About Us",
  "/work-with-us": "Work With Us",
  "/clients": "Clients",
  "/blog": "Blog",
};

const formatFallbackLabel = (pathname) => {
  const clean = pathname.replace(/^\/|\/$/g, "");
  if (!clean) return "Home";
  return clean
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
};

const cleanServiceName = (name) =>
  name.replace(/<br\s*\/?\s*>/gi, " ").replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();

const getLabel = (pathname) => {
  if (pathname.startsWith("/services/")) {
    const serviceSlug = pathname.split("/")[2];
    const service = servicesData.find((item) => item.slug === serviceSlug);

    return service ? cleanServiceName(service.name) : formatFallbackLabel(serviceSlug);
  }

  return pageLabels[pathname] || formatFallbackLabel(pathname);
};

const PageTransitionCtx = createContext(null);

// Shared easing so the "close" and "open" halves of the animation feel like
// one continuous motion instead of two separately-tuned pieces.
const EASE_MAIN = "power4.inOut";
const EASE_TEXT_IN = "power3.out";
const EASE_TEXT_OUT = "power2.in";

export const PageTransitionProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // top panel comes DOWN, bottom panel comes UP — they meet in the middle
  const topRef = useRef(null);
  const bottomRef = useRef(null);
  const textRef = useRef(null);
  const timelineRef = useRef(null);
  const isTransitioningRef = useRef(false);
  const pendingPathRef = useRef(null);
  const scrollYRef = useRef(0);

  const [label, setLabel] = useState(getLabel(location.pathname));

  // Resting state on mount — both panels tucked away off-screen
  useLayoutEffect(() => {
    gsap.set(topRef.current, {
      yPercent: -100,
      pointerEvents: "none",
    });
    gsap.set(bottomRef.current, {
      yPercent: 100,
      pointerEvents: "none",
    });
    gsap.set(textRef.current, { yPercent: 30, opacity: 0, scale: 0.96 });
  }, []);

  // Safety net: never leave the page scroll-locked if something unmounts mid-transition
  useEffect(() => {
    return () => {
      if (timelineRef.current) timelineRef.current.kill();
      document.body.style.overflow = "";
    };
  }, []);

  // Reveal once the NEW route has actually mounted
  useLayoutEffect(() => {
    if (!isTransitioningRef.current) return;
    if (pendingPathRef.current !== location.pathname) return;

    isTransitioningRef.current = false;
    pendingPathRef.current = null;

    // new page is mounted underneath the closed box right now — safe to scroll + reveal
    window.scrollTo(0, 0);

    if (timelineRef.current) timelineRef.current.kill();

    const tl = gsap.timeline({
      defaults: { ease: EASE_MAIN },
      onComplete: () => {
        document.body.style.overflow = "";
        gsap.set([topRef.current, bottomRef.current], { pointerEvents: "none" });
      },
    });
    timelineRef.current = tl;

    tl.to({}, { duration: 0.22 }) // brief hold on the fully-closed box so it reads as a beat, not a glitch
      .to(textRef.current, {
        opacity: 0,
        yPercent: -25,
        scale: 0.97,
        duration: 0.35,
        ease: EASE_TEXT_OUT,
      })
      // top panel exits upward, bottom panel exits downward — box "opens" from the center seam
      .to(
        topRef.current,
        { yPercent: -100, duration: 1, ease: EASE_MAIN },
        "-=0.1"
      )
      .to(
        bottomRef.current,
        { yPercent: 100, duration: 1, ease: EASE_MAIN },
        "<" // perfectly in sync with the top panel
      );
  }, [location.pathname]);

  const goTo = useCallback(
    (to) => {
      if (isTransitioningRef.current) return; // ignore spam clicks mid-transition
      if (to === location.pathname) return; // already there

      if (timelineRef.current) timelineRef.current.kill();

      isTransitioningRef.current = true;
      pendingPathRef.current = to;
      scrollYRef.current = window.scrollY;

      document.body.style.overflow = "hidden";
      setLabel(getLabel(to));

      const tl = gsap.timeline({ defaults: { ease: EASE_MAIN } });
      timelineRef.current = tl;

      tl.set(topRef.current, { yPercent: -100, pointerEvents: "auto" })
        .set(bottomRef.current, { yPercent: 100, pointerEvents: "auto" })
        .set(textRef.current, { yPercent: 30, opacity: 0, scale: 0.96 })
        // bottom panel rises up to center, top panel drops down to center — box "closes" as one motion
        .to(bottomRef.current, { yPercent: 0, duration: 1 }, 0)
        .to(topRef.current, { yPercent: 0, duration: 1 }, 0)
        .to(
          textRef.current,
          {
            yPercent: 0,
            opacity: 1,
            scale: 1,
            duration: 0.55,
            ease: EASE_TEXT_IN,
          },
          "-=0.4" // text eases in just before the box fully seals, so it doesn't feel like a separate step
        )
        // screen is now fully covered — safe to actually change route
        .call(() => {
          window.setTimeout(() => {
            navigate(to);
          }, 40);
        });
    },
    [location.pathname, navigate]
  );

  return (
    <PageTransitionCtx.Provider value={goTo}>
      {children}

      {/* Top half of the box */}
      <div
        ref={topRef}
        className="fixed left-0 right-0 top-0 z-[999] h-1/2 overflow-hidden bg-primary pointer-events-none will-change-transform"
        aria-hidden="true"
      />

      {/* Bottom half of the box */}
      <div
        ref={bottomRef}
        className="fixed left-0 right-0 bottom-0 z-[999] h-1/2 overflow-hidden bg-primary pointer-events-none will-change-transform"
        aria-hidden="true"
      />

      {/* Full-screen flex wrapper keeps the label perfectly centered
          regardless of text length or line-wrapping */}
      <div
        className="fixed inset-0 z-[1000] flex items-center justify-center pointer-events-none px-4"
        aria-hidden="true"
      >
        <span
          ref={textRef}
          className="text-[10vw] font-bold leading-none tracking-tight text-center capitalize text-white md:text-[5vw] will-change-transform"
        >
          {label}
        </span>
      </div>
    </PageTransitionCtx.Provider>
  );
};

// Hook for programmatic navigation (e.g. inside a custom Button component)
export const useTransitionNavigate = () => {
  const goTo = useContext(PageTransitionCtx);
  if (!goTo) {
    throw new Error("useTransitionNavigate must be used inside PageTransitionProvider");
  }
  return goTo;
};

export const TransitionLink = forwardRef(({ to, onClick, children, ...rest }, ref) => {
  const goTo = useTransitionNavigate();

  const handleClick = (e) => {
    onClick?.(e);
    if (
      e.defaultPrevented ||
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey ||
      rest.target === "_blank"
    ) {
      return;
    }
    e.preventDefault();
    requestAnimationFrame(() => {
      goTo(to);
    });
  };

  return (
    <Link ref={ref} to={to} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
});

TransitionLink.displayName = "TransitionLink";