import { useNavigate } from "react-router-dom";

const ProjectNavigationSection = ({ project }) => {
  const navigate = useNavigate();

  return (
    <section
      className="group relative h-[40vh] md:h-[50vh] w-full flex flex-col items-center justify-center cursor-pointer overflow-hidden bg-background border-t border-border/50"
      onClick={() => navigate("/work")}
    >
      <div className="absolute inset-0 bg-foreground translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.76,0,0.24,1]" />

      <p className="relative z-10 font-jakarta text-[10px] md:text-xs uppercase tracking-[0.45em] mb-6 text-muted-foreground/60 group-hover:text-background/40 transition-colors duration-500">
        Next Project
      </p>

      <h2 className="relative z-10 font-jakarta font-light text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-tighter text-foreground group-hover:text-background transition-colors duration-500">
        Back to Work
      </h2>

      <div className="relative z-10 mt-10 h-14 w-14 border border-border group-hover:border-background/20 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110">
        <span className="text-2xl text-foreground group-hover:text-background group-hover:-rotate-45 transition-transform duration-500">
          →
        </span>
      </div>
    </section>
  );
};

export default ProjectNavigationSection;
