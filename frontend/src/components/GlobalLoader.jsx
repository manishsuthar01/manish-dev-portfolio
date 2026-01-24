import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export const GlobalLoader = ({ isVisible }) => {
  const loaderRef = useRef(null);

  useEffect(() => {
    if (!isVisible) {
      gsap.to(loaderRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: "power4.inOut",
        display: "none",
      });
    } else {
      gsap.set(loaderRef.current, { display: "flex", yPercent: 0 });
    }
  }, [isVisible]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-100 bg-primary  flex items-center justify-center text-black"
    >
      <div className="flex flex-col items-center">
        <span className="text-sm uppercase tracking-widest animate-pulse">
        </span>
      </div>
    </div>
  );
};
