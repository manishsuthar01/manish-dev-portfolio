import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const HeroSection = () => {
  const sectionRef = useRef(null);
  const imgRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    let mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 768px)",
        isMobile: "(max-width: 767px)",
      },
      (context) => {
        let { isMobile } = context.conditions;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.5,
            pin: true,
            pinSpacing: true,
          },
        });

        tl.to(imgRef.current, {
          x: isMobile ? "-45vw" : "-37vw",
          y: isMobile ? "-72vh" : "-69vh",
          scale: isMobile ? 0.2 : 0.2,
          rotation: 360,
          duration: 1,
          opacity: 0,
          ease: "power1.inOut",
        });
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-dvh grid-background overflow-hidden md:mb-0 z-50"
    >
      <div className="flex flex-col items-center md:justify-between md:gap-5 justify-center gap-20  h-full py-25 md:py-20">
        <div className="mx-auto max-w-6xl px-4 flex flex-col justify-center items-center ">
          <div className="max-w-4xl flex flex-col justify-center items-center">
            <h1 className="font-jakarta font-light text-4xl sm:text-6xl md:text-8xl tracking-tight text-foreground text-center leading-[1.1]">
              Design{" "}
              <span className="relative inline-block bg-primary px-2 md:px-3 py-1 font-medium">
                build
              </span>
              <br />
              with intention
            </h1>

            <p className="font-instrument font-normal mt-6 max-w-md md:max-w-xl text-base md:text-lg leading-relaxed text-muted-foreground text-center px-2">
              I’m Manish — a full-stack developer focused on clean systems,
              scalable architecture, and carefully considered user experiences.
            </p>
          </div>
        </div>

        <div
          ref={imgRef}
          className="img w-32 h-32 md:w-48 md:h-48 overflow-hidden rounded-full border-4 md:border-4 border-primary shadow-2xl z-500"
        >
          <img
            src="/hero.png"
            alt="Hero"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
