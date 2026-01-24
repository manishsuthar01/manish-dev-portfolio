import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const leftSkills = [
  { name: "Node.js", icon: "nodejs" },
  { name: "MongoDB", icon: "mongodb" },
  { name: "JavaScript", icon: "js" },
  { name: "TypeScript", icon: "ts" },
  { name: "React", icon: "react" },
  { name: "Tailwind CSS", icon: "tailwind" },
  { name: "Next.js", icon: "nextjs" },
  { name: "Prisma", icon: "prisma" },
  { name: "PostgreSQL", icon: "postgres" },
  { name: "Docker", icon: "docker" },
  { name: "Git", icon: "git" },
  { name: "Figma", icon: "figma" },
];
const rightSkills = [
  { name: "Node.js", icon: "nodejs" },
  { name: "MongoDB", icon: "mongodb" },
  { name: "JavaScript", icon: "js" },
  { name: "TypeScript", icon: "ts" },
  { name: "React", icon: "react" },
  { name: "Tailwind CSS", icon: "tailwind" },
  { name: "Next.js", icon: "nextjs" },
  { name: "Prisma", icon: "prisma" },
  { name: "PostgreSQL", icon: "postgres" },
  { name: "Docker", icon: "docker" },
  { name: "Git", icon: "git" },
  { name: "Figma", icon: "figma" },
];

const SkillsSection = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let ctx = gsap.context(() => {
      let t1 = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "top  10%",
          toggleActions: "play none none reverse",
          invalidateOnRefresh: true,
          refreshPriority: -1,
          scrub: true,
        },
      });
      t1.from(".left-skill-icon", {
        x: -500,
        opacity: 0,
        scale: 0,
        rotate: () => Math.random() * 360,
        duration: 0.7,
        stagger: {
          each: 0.05,
          from: "center",
          grid: "auto",
        },
      });

      t1.from(
        ".right-skill-icon",
        {
          x: 500,
          opacity: 0,
          scale: 0,
          rotate: () => Math.random() * 360,
          duration: 0.7,
          stagger: {
            each: 0.05,
            from: "center",
            grid: "auto",
          },
        },
        "<",
      );
    }, sectionRef);

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="mt-10 py-5 md:py-20 overflow-hidden ">
      <div className="mx-auto text-center flex justify-center flex-col items-center ">
        <div className="mb-20 md:mb-30 max-w-2xl text-center bg-background">
          <p className="font-mono text-foreground uppercase tracking-widest text-sm ">
            My Skills
          </p>
          <h2 className="font-jakarta font-light tracking-tight  text-5xl md:text-7xl text-foreground ">
            The Secret Sauce
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-4 md:gap-8 max-w-6xl mx-auto"></div>
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-5xl mx-auto mt-10 md:px-6 px-0">
          {leftSkills.map((skill, i) => (
            <div
              key={i}
              className="left-skill-icon group p-5 rounded-xl flex items-center justify-center  hover:border hover:border-border transition-all cursor-pointer shadow-lg bg-background"
            >
              <img
                src={`https://skillicons.dev/icons?i=${skill.icon}`}
                alt={skill.name}
                className="md:w-10 md:h-10 w-5 h-5 grayscale group-hover:grayscale-0 transition-all group-hover:scale-110"
              />
            </div>
          ))}
          {rightSkills.map((skill, i) => (
            <div
              key={i}
              className="right-skill-icon group p-4 border border-white/10 rounded-2xl flex items-center justify-center hover:border-border transition-all cursor-pointer shadow-lg"
            >
              <img
                src={`https://skillicons.dev/icons?i=${skill.icon}`}
                alt={skill.name}
                className="md:w-10 md:h-10 w-5 h-5 grayscale group-hover:grayscale-0 transition-all group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
