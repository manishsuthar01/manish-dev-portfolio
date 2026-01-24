import ProjectTable from "@/features/projects/components/admin/projectTable";
import useAdminProject from "@/features/projects/hooks/useAdminProjects";
import useDeleteProject from "@/features/projects/hooks/useDeleteProjects";
import React from "react";

const AdminProjectPage = () => {
  const { projects, loading, setProjects } = useAdminProject();
  const { deleteProject } = useDeleteProject();
  if (loading)
    return (
      <div className="flex min-h-100 items-center justify-center font-jakarta text-muted-foreground italic">
        Fetching Projects...
      </div>
    );
  return (
    <ProjectTable
      deleteProject={deleteProject}
      projects={projects}
      setProjects={setProjects}
    />
  );
};

export default AdminProjectPage;
