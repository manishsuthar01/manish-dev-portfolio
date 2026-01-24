import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const ProjectHeroSection = ({ project }) => {
  useGSAP(() => {
    gsap.from(".hero-title-text", {
      y: "100%",
      skewY: 7,
      duration: 1.5,
      ease: "power4.out",
    });
  }, [project]);

  return (
    <section className="relative h-svh w-full overflow-hidden bg-black">
      <img
        src={project?.imageUrl}
        className="h-full w-full object-cover opacity-80"
        alt={project?.title}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

      <div className="absolute inset-0 flex items-end px-10 md:px-12 pb-16 md:pb-24">
        <div className="overflow-hidden w-full">
          <h1 className="hero-title-text font-jakarta font-light text-5xl sm:text-7xl md:text-[10vw] lg:text-[12vw] text-white uppercase leading-[0.85] tracking-tighter">
            {project?.title}
          </h1>
        </div>
      </div>
    </section>
  );
};

export default ProjectHeroSection;