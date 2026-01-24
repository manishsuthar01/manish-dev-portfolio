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
        let { isDesktop } = context.conditions;

        if (isDesktop) {
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
                    { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
                  );
                }
              },
            });
          });
        }
      },
    );

    return () => mm.revert();
  }, [ProjectArray]);

  if (!ProjectArray.length) return null;

  return (
    <section className="mx-auto md:px-5  px-0 py-24 flex flex-col items-center w-full">
      <div className="mb-20 md:mb-30 max-w-xl text-center">
        <h2 className="font-jakarta font-light tracking-tight text-4xl md:text-7xl text-foreground">
          Projects that reflect how I think and build.
        </h2>
      </div>

      <div
        ref={sectionRef}
        className="relative flex flex-col md:flex-row justify-center gap-0 w-full"
      >
        <div className="w-full md:w-1/2 flex flex-col md:gap-[10vh] gap-5 p-4 md:p-7">
          {ProjectArray.map((project, i) => (
            <div
              key={i}
              onClick={() => navigate(`/work/${project.slug}`)}
              className="image-box group relative w-full h-[70vh] md:h-[80vh] rounded-2xl overflow-hidden shadow-2xl bg-gray-200 cursor-pointer hover:rounded-3xl"
            >
              <img
                src={
                  project.imageUrl
                   || "https://framerusercontent.com/images/I2DGsvE6BPFKwR3seUVB72UVU.png"
                }
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                alt={project.title}
              />

              <div className="absolute inset-0 bg-linear-to-t from-foreground via-black/20 to-transparent flex flex-col justify-end p-6 md:hidden">
                <h3 className="text-white font-jakarta text-2xl font-light mb-2">
                  {project.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack?.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="px-2 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded text-[10px] text-white uppercase tracking-widest"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          ref={rightColumnRef}
          className="hidden md:flex w-full md:w-1/2 h-screen items-center justify-start sticky md:-top-10  px-10"
        >
          <div className="project-content w-full ">
            <span className="font-jakarta text-muted-foreground font-light uppercase tracking-wide text-sm">
              Featured Project
            </span>
            <h3 className="text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.1] font-jakarta font-light  mb-6">
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
        className="mt-20 rounded-full px-8 py-3 bg-[#F7F780] text-foreground text-[12px] uppercase tracking-widest hover:bg-foreground hover:text-background transition-all"
      >
        View all projects
      </button>
    </section>
  );
};

export default HomeProjectSection;
