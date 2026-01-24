import { Github, ExternalLink } from "lucide-react"; // Or use your own SVG icons

const ProjectMetaSection = ({ project }) => {
  const projectYear = project?.createdAt
    ? new Date(project.createdAt).getFullYear()
    : "2024";

  const details = [
    { label: "Year", value: projectYear },
    { label: "Role", value: "Full Stack Development" },
    { label: "Status", value: project?.status || "Live" },
  ];

  return (
    <section className="px-10 md:px-12 py-12 md:py-16 ">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-16">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {details.map((item, i) => (
              <div key={i} className="flex flex-col gap-2">
                <p className="font-jakarta text-[10px] md:text-xs uppercase tracking-[0.3em] text-foreground/70">
                  {item.label}
                </p>
                <p className="font-jakarta text-sm md:text-base font-light uppercase tracking-tight text-foreground">
                  {String(item.value)}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-6">
            <p className="font-jakarta text-[10px] md:text-xs uppercase tracking-[0.3em] text-foreground/70">
              Technologies
            </p>
            <div className="flex flex-wrap gap-3">
              {project?.techStack?.map((tech) => (
                <div
                  key={tech}
                  className="flex items-center gap-2 px-4 py-2 bg-foreground/5 border border-border/40 rounded-full shadow-sm"
                >
                  <div className="w-4 h-4 rounded-sm bg-foreground/10 flex items-center justify-center text-[8px]">
                    {tech[0]}
                  </div>
                  <span className="text-[11px] font-jakarta font-medium uppercase tracking-wider text-foreground/80">
                    {tech}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <a
              href={project?.links?.github || "#"}
              target="_blank"
              className="group flex items-center gap-3 px-6 py-3 bg-background border border-foreground/20 rounded-full hover:bg-foreground hover:text-background transition-all duration-300"
            >
              <Github className="w-4 h-4" />
              <span className="font-jakarta text-xs font-semibold uppercase tracking-widest">
                Star on GitHub
              </span>
            </a>

            <a
              href={project?.links?.live || "#"}
              target="_blank"
              className="group flex items-center gap-3 px-6 py-3 bg-foreground text-background rounded-full hover:opacity-90 transition-all duration-300"
            >
              <span className="font-jakarta text-xs font-semibold uppercase tracking-widest">
                Check it out
              </span>
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-background/20 group-hover:rotate-45 transition-transform">
                <ExternalLink className="w-3 h-3" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectMetaSection;
