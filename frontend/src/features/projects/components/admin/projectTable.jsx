import { useNavigate } from "react-router-dom";

const ProjectTable = ({ deleteProject, projects, setProjects }) => {
  const navigate = useNavigate();

  const projectDeleteHandler = (id) => {
    if (!confirm("Delete this project permanently?")) return;
    deleteProject(id);
    setProjects((prev) => prev.filter((p) => p._id !== id));
  };

  return (
    <div className="flex-1 w-full mx-auto p-4 md:p-10 font-jakarta bg-background">
      <div className="mb-18 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-weight-semibold tracking-tight text-foreground">
            Projects
          </h1>
          <p className="text-muted-foreground mt-2">
            Showcase your technical work and applications.
          </p>
        </div>
        <div>
          <button
            onClick={() => navigate("/dashboard/projects/new")}
            className="group z-50 inline-flex items-center gap-3 rounded-full border border-border px-8 py-3 text-1xl bg-primary text-foreground hover:bg-foreground hover:text-background transition-colors cursor-pointer"
          >
            Add New Project
            <span className="text-lg">→</span>
          </button>
        </div>
      </div>

      <div className="w-full overflow-hidden rounded-lg border border-border bg-background shadow-sm">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-foreground text-card-foreground border-b border-border">
              <th className="px-6 py-4 text-left font-weight-semibold uppercase tracking-wider text-xs">
                Project Details
              </th>
              <th className="px-6 py-4 text-left font-weight-semibold uppercase tracking-wider text-xs">
                Tech Stack
              </th>
              <th className="px-6 py-4 text-left font-weight-semibold uppercase tracking-wider text-xs">
                Links
              </th>
              <th className="px-6 py-4 text-left font-weight-semibold uppercase tracking-wider text-xs">
                Status
              </th>
              <th className="px-6 py-4 text-right font-weight-semibold uppercase tracking-wider text-xs">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {projects?.map((project) => (
              <tr key={project._id} className="group transition-colors">
                {/* Project Info & Featured Badge */}
                <td className="px-6 py-5">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-weight-semibold text-foreground group-hover:text-accent transition-colors cursor-pointer"
                      onClick={()=>navigate(`/work/${project.slug}`)}>
                        {project.title}
                      </span>
                      {project.isFeatured && (
                        <span className="bg-accent/10 text-accent text-[10px] px-2 py-0.5 rounded-full border border-accent/20 font-bold uppercase">
                          Featured
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] font-instrument text-muted-foreground/70 uppercase tracking-widest mt-1">
                      {project.slug}
                    </span>
                  </div>
                </td>

                {/* Tech Stack Tags */}
                <td className="px-6 py-5">
                  <div className="flex flex-wrap gap-1 max-w-50">
                    {project.techStack?.map((tech, index) => (
                      <span
                        key={index}
                        className="text-[10px]  px-2 py-0.5 rounded border border-border text-muted-foreground uppercase"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </td>

                {/* Quick Links */}
                <td className="px-6 py-5">
                  <div className="flex gap-3">
                    {project.links?.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-muted-foreground hover:text-foreground underline"
                      >
                        GitHub
                      </a>
                    )}
                    {project.links?.live && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-muted-foreground hover:text-foreground underline"
                      >
                        Live
                      </a>
                    )}
                  </div>
                </td>

                {/* Status Indicator */}
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        project.status === "published"
                          ? "bg-accent shadow-[0_0_8px_var(--color-accent)]"
                          : "bg-muted-foreground"
                      }`}
                    />
                    <span className="text-sm font-medium capitalize text-foreground">
                      {project.status}
                    </span>
                  </div>
                </td>

                {/* Actions */}
                <td className="px-6 py-5 text-right">
                  <div className="flex justify-end items-center gap-4">
                    <button
                      onClick={() =>
                        navigate(`/dashboard/projects/edit/${project._id}`)
                      }
                      className="text-sm font-weight-semibold text-foreground hover:text-accent transition-colors underline underline-offset-4 decoration-border hover:decoration-accent"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => projectDeleteHandler(project._id)}
                      className="text-sm font-weight-semibold text-destructive hover:opacity-80 transition-opacity hover:cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectTable;
