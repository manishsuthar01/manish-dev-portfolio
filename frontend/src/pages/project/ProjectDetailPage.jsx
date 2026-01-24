import useProjectBySlug from "@/features/projects/hooks/useProjectBySlug";
import ProjectHeroSection from "@/features/projects/sections/detail/ProjectHeroSection";
import ProjectMetaSection from "@/features/projects/sections/detail/ProjectMetaSection";
import ProjectNavigationSection from "@/features/projects/sections/detail/ProjectNavigationSection";
import ProjectOverviewSection from "@/features/projects/sections/detail/ProjectOverviewSection";
import { useParams } from "react-router-dom";

const ProjectDetails = () => {
  const { slug } = useParams();
  const { project, loading } = useProjectBySlug(slug);

  if (loading) {
    return (
      <div className="h-screen bg-white flex items-center justify-center font-mono">
        LOADING...
      </div>
    );
  }

  if (!project || !project.data) {
    return (
      <div className="h-screen bg-white flex items-center justify-center"></div>
    );
  }

  const projectData = project.data;

  return (
    <main>
      <ProjectHeroSection project={projectData} />
      <ProjectOverviewSection project={projectData} />
      <ProjectMetaSection project={projectData} />
      <ProjectNavigationSection project={projectData} />
    </main>
  );
};

export default ProjectDetails;
