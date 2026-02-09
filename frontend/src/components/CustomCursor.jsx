import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const isInside = useRef(false);

  useEffect(() => {
    // 1. Check if the device has a mouse/fine pointer
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    
    // If it's a touch device, we stop here and don't add listeners
    if (isTouchDevice) return;

    const cursor = cursorRef.current;

    const moveCursor = (e) => {
      if (isInside.current) {
        gsap.to(cursor, {
          x: e.clientX,
          y: e.clientY,
          opacity: 1,
          duration: 0.4,
          ease: "power3.out",
        });
      }
    };

    const handleMouseLeave = () => {
      isInside.current = false;
      gsap.to(cursor, {
        opacity: 0,
        duration: 0.2,
        ease: "power2.out",
        overwrite: true,
      });
    };

    const handleMouseEnter = () => {
      isInside.current = true;
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  // Return null if we're on mobile to keep the DOM clean
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-3 h-3 bg-white rounded-full pointer-events-none z-9999 mix-blend-difference opacity-0"
      style={{ transform: "translate(-50%, -50%)" }}
    />
  );
};

export default CustomCursor;