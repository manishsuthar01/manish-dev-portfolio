import { useRef } from "react";
import ProjectCard from "../components/ProjectCard";
import { useNavigate } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const WorkProjectSection = ({ projects }) => {
  const container = useRef();
  const projectArray = projects?.data || [];
  const navigate = useNavigate();

  useGSAP(
    () => {
      const projectWrappers = gsap.utils.toArray(".project-wrapper");

      projectWrappers.forEach((wrapper) => {
        const row = wrapper.querySelector(".project-row");

        gsap.to(row, {
          height: window.innerWidth < 768 ? "60vh" : "90vh",
          ease: "none",
          scrollTrigger: {
            trigger: wrapper,
            start: "top 85%",
            end: "top 15%",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      });
    },
    { scope: container, dependencies: [projectArray] }
  );

  return (
    <section ref={container} className="w-full px-6 md:px-12">
      <div className="min-h-[40vh] md:min-h-[60vh] flex items-end pb-8 md:pb-12">
        <h2 className="font-jakarta text-[14vw] leading-[0.8] font-light uppercase tracking-tighter">
          Projects
        </h2>
      </div>

      <div className="gap-1 md:gap-2 mb-[10vh] md:mb-[10vh] flex flex-col">
        {projectArray?.map((project, idx) => (
          <div
            key={idx}
            className="project-wrapper w-full h-[65vh] md:h-[95vh]"
            onClick={() => navigate(`/work/${project.slug}`)}
          >
            <div className="project-row w-full h-[30vh] overflow-hidden origin-top cursor-pointer group relative rounded-2xl md:rounded-3xl shadow-xl">
              
              <ProjectCard image={project.imageUrl} />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 md:p-12 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500">
                <p className="font-jakarta text-[10px] md:text-xs uppercase tracking-[0.3em] text-white/60 mb-2 md:mb-4">
                  Selected Work
                </p>
                <h3 className="font-jakarta text-2xl md:text-5xl lg:text-6xl font-light text-white uppercase tracking-tight">
                  {project.title || "View Project"}
                </h3>
                
                <div className="mt-4 md:hidden flex items-center gap-2 text-white/80 text-[10px] uppercase tracking-widest font-bold">
                   View Project <span className="text-lg">→</span>
                </div>
              </div>
              
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorkProjectSection;