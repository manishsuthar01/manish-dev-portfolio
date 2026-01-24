import React, { memo, useLayoutEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import Particles from "../../components/ui/Particles";

const FinalCTA = memo(() => {
  const circleRef = useRef(null);
  const textRef = useRef(null);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    gsap.to(textRef.current, {
      rotate: 360,
      duration: 12,
      repeat: -1,
      ease: "none",
    });

    const handleMouseMove = (e) => {
      if (!circleRef.current) return;
      const { clientX, clientY } = e;
      const { left, top, width, height } = circleRef.current.getBoundingClientRect();

      const centerX = left + width / 2;
      const centerY = top + height / 2;

      const dx = clientX - centerX;
      const dy = clientY - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 160) {
        gsap.to(circleRef.current, {
          x: dx * 0.25,
          y: dy * 0.25,
          duration: 0.4,
          ease: "power3.out",
        });
      } else {
        gsap.to(circleRef.current, {
          x: 0,
          y: 0,
          duration: 0.4,
          ease: "power3.out",
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="mx-auto max-w-7xl relative mt-20 md:mt-40 py-24 md:py-24 md:px-10 flex flex-col items-center justify-center text-center overflow-hidden bg-foreground text-background rounded-[2rem] md:rounded-[3rem]">
      <div className="absolute inset-0 w-full h-[40vh] pointer-events-none opacity-50">
        <Particles
          particleColors={["#ffffff", "#ffffff"]}
          particleCount={150}
          particleSpread={15}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={true}
          disableRotation={false}
        />
      </div>

      <div className="z-10 px-6">
        <h1 className="font-jakarta font-normal text-3xl sm:text-4xl md:text-5xl lg:text-7xl leading-[1.1] uppercase max-w-5xl">
          from concept to <span className="font-bol">creation</span>
          <br />
          let’s make it <span className="font-bold ">happen!</span>
        </h1>

        <h3 className="mt-12 font-jakarta font-light text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto text-white">
          I'm available for full-time roles & freelance projects.
        </h3>

        <button
          onClick={() => navigate("/contact")}
          className="group z-50 px-8 py-3 mt-10 inline-flex items-center gap-4 rounded-full bg-[#222] border border-white/10 font-jakarta text-xs uppercase tracking-[0.2em] hover:bg-primary hover:text-black transition-all"
        >
          Get In Touch
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center group-hover:bg-black transition-colors">
             <span className="text-black group-hover:text-white text-lg transition-colors">→</span>
          </div>
        </button>
      </div>

      <div
        ref={circleRef}
        className="absolute right-10 top-1/2 -translate-y-1/2 hidden xl:block cursor-pointer z-20"
        onClick={() => navigate("/contact")}
      >
        <div className="relative w-40 h-40">
          <svg ref={textRef} viewBox="0 0 100 100" className="w-full h-full">
            <path
              id="circlePath"
              d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
              fill="none"
            />
            <text className="fill-white/40 font-jakarta text-[7px] uppercase tracking-[4px]">
              <textPath xlinkHref="#circlePath">
                • open to work • open to work •
              </textPath>
            </text>
          </svg>

          <div className="absolute inset-0 m-auto w-14 h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center shadow-2xl">
             <span className="text-white text-xl">✦</span>
          </div>
        </div>
      </div>
    </section>
  );
});

export default FinalCTA;