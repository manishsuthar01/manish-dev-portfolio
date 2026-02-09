import React, { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";

const HomeProjectSection = ({ projects }) => {
  const sectionRef = useRef(null);
  const rightColumnRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  const ProjectArray = projects?.data || [];

  useLayoutEffect(() => {
    if (!ProjectArray.length) return;
    gsap.registerPlugin(ScrollTrigger);

    let mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 768px)",
        isMobile: "(max-width: 767px)",
      },
      (context) => {
        let { isDesktop, isMobile } = context.conditions;

        if (isDesktop) {
          // Desktop Pinning Logic
          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            pin: rightColumnRef.current,
            pinSpacing: false,
            invalidateOnRefresh: true,
          });

          const boxes = gsap.utils.toArray(".image-box");
          boxes.forEach((box, i) => {
            ScrollTrigger.create({
              trigger: box,
              start: "top center",
              end: "bottom center",
              onToggle: (self) => {
                if (self.isActive) {
                  setActiveIndex(i);
                  gsap.killTweensOf(".project-content");
                  gsap.fromTo(
                    ".project-content",
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
                  );
                }
              },
            });
          });
        }

        if (isMobile) {
          // Mobile Entrance Animations
          const mobileBoxes = gsap.utils.toArray(".image-box");
          mobileBoxes.forEach((box) => {
            gsap.fromTo(
              box,
              { opacity: 0.8, y: 40, scale: 0.95 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: box,
                  start: "top 85%",
                  end: "top 50%",
                  scrub: true,
                },
              }
            );
          });
        }
      }
    );

    return () => mm.revert();
  }, [ProjectArray]);

  if (!ProjectArray.length) return null;

  return (
    <section className="mx-auto md:px-5 px-4 py-16 md:py-24 flex flex-col items-center w-full overflow-hidden">
      {/* Header */}
      <div className="mb-12 md:mb-30 max-w-2xl text-center px-4">
        <h2 className="font-jakarta font-light tracking-tight text-4xl md:text-7xl text-foreground leading-tight">
          Projects that reflect how I think and build.
        </h2>
      </div>

      <div
        ref={sectionRef}
        className="relative flex flex-col md:flex-row justify-center gap-0 w-full"
      >
        {/* Left Column (Images on Desktop, Main List on Mobile) */}
        <div className="w-full md:w-1/2 flex flex-col md:gap-[10vh] gap-8">
          {ProjectArray.map((project, i) => (
            <div
              key={i}
              onClick={() => navigate(`/work/${project.slug}`)}
              className="image-box group relative w-full h-[60vh] md:h-[80vh] rounded-2xl overflow-hidden shadow-xl bg-gray-200 cursor-pointer"
            >
              <img
                src={project.imageUrl || "https://framerusercontent.com/images/I2DGsvE6BPFKwR3seUVB72UVU.png"}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt={project.title}
              />

              {/* Mobile Info Overlay (Only visible on mobile) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6 md:hidden">
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/70 mb-1">
                  Featured Project
                </span>
                <h3 className="text-white font-jakarta text-2xl font-light mb-3">
                  {project.title}
                </h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack?.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="px-2 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-md text-[9px] text-white uppercase tracking-widest"
                    >
                      {t}
                    </span>
                  ))}
                </div>
               
              </div>
            </div>
          ))}
        </div>

        {/* Right Column (Fixed Desktop Content) */}
        <div
          ref={rightColumnRef}
          className="hidden md:flex w-full md:w-1/2 h-screen items-center justify-start sticky md:-top-10 px-10"
        >
          <div className="project-content w-full">
            <span className="font-jakarta text-muted-foreground font-light uppercase tracking-wide text-sm">
              Featured Project
            </span>
            <h3 className="text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.1] font-jakarta font-light mb-6">
              {ProjectArray[activeIndex]?.title}
            </h3>
            <p className="text-[clamp(1rem,1.5vw,1.25rem)] font-instrument leading-relaxed text-muted-foreground max-w-[90%]">
              {ProjectArray[activeIndex]?.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-8">
              {ProjectArray[activeIndex]?.techStack?.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 bg-background border border-black/10 rounded-lg text-xs font-instrument uppercase tracking-widest shadow-sm"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-12 flex flex-row items-center gap-10">
              <button className="text-sm uppercase tracking-[0.2em] font-medium border-b border-transparent hover:border-foreground transition-all pb-1">
                Live Demo
              </button>
              <button className="text-sm uppercase tracking-[0.2em] font-medium border-b border-transparent hover:border-foreground transition-all pb-1">
                GitHub
              </button>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => navigate("/work")}
        className="mt-16 md:mt-20 rounded-full px-8 py-3 bg-[#F7F780] text-foreground text-[12px] uppercase tracking-widest hover:bg-foreground hover:text-background transition-all shadow-lg"
      >
        View all projects
      </button>
    </section>
  );
};

export default HomeProjectSection;