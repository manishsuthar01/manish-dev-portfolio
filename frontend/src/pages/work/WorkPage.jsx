import React from "react";
import WorkProjectSection from "../../features/projects/sections/WorkProjectSection";
import useProjects from "@/features/projects/hooks/useProjects";

const WorkPage = () => {
  const { projects } = useProjects();
  if (!projects) {
    return <div className="w-full h-full bg-background"></div>;
  }
  return (
    <>
      <WorkProjectSection projects={projects} />
    </>
  );
};

export default WorkPage;
