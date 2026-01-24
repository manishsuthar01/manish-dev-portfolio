import React, { useLayoutEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

const NotFoundPange = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".digit", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power4.out",
      });

      gsap.to(".float-content", {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-background px-6"
    >
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div 
          className="h-full w-full" 
          style={{
            backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="float-content relative z-10 text-center">
        <div className="flex justify-center overflow-hidden">
          <h1 className="digit font-jakarta text-[20vw] font-light leading-none tracking-tighter text-foreground/5">
            404
          </h1>
        </div>

        <div className="mt-[-4vw] space-y-6">
          <h2 className="font-jakarta text-3xl md:text-5xl font-light tracking-tight">
            Lost in the <span className="italic font-instrument text-muted-foreground/50">system</span>.
          </h2>
          <p className="mx-auto max-w-sm font-instrument text-base md:text-lg font-light text-muted-foreground/70">
            The page you are looking for has been moved, deleted, or never existed in the first place.
          </p>
        </div>

        <div className="mt-12">
          <button
            onClick={() => navigate("/")}
            className="group relative inline-flex items-center gap-4 rounded-full border border-border px-8 py-3 font-instrument text-xs uppercase tracking-[0.3em] transition-all hover:bg-foreground hover:text-background"
          >
            <span className="relative z-10 transition-colors group-hover:text-background">
              Return Home
            </span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </button>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 overflow-hidden">
        <p className="font-instrument text-[10px] uppercase tracking-[0.5em] text-muted-foreground/30">
          Error Code: 0x000404
        </p>
      </div>
    </section>
  );
};

export default NotFoundPange;