import ProjectForm from "@/features/projects/components/ProjectForm";
import useProjectBySlug from "@/features/projects/hooks/useProjectBySlug";
import useUpdateProject from "@/features/projects/hooks/useUpdateProject";
import React from "react";
import { useParams } from "react-router-dom";

const EditProjectPage = () => {
  const { slug } = useParams();
  const { project } = useProjectBySlug(slug);
  const { updateProject, loading } = useUpdateProject(slug);
  const data = project?.data;
  return (
    <ProjectForm
      onSubmit={updateProject}
      isSubmitting={loading}
      initialData={data}
    />
  );
};

export default EditProjectPage;
