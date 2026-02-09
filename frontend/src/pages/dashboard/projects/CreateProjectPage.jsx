import ProjectForm from "@/features/projects/components/ProjectForm";
import useNewProject from "@/features/projects/hooks/useNewProject";
import React from "react";

const CreateProjectPage = () => {
  const { createNewProject, loading } = useNewProject();

  return (
    <ProjectForm
      onSubmit={createNewProject}
      isSubmitting={loading}
      initialData={null}
    />
  );
};

export default CreateProjectPage;
