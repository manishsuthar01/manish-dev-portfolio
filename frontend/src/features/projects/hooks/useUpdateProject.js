import React, { useState } from "react";
import toast from "react-hot-toast";

const useUpdateProject = () => {
  const [loading, setLoading] = useState(false);
  const updateProject = async ({ formData, projectID }) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/projects/${projectID}`, {
        method: "PATCH",
        body: formData,
      });
      if (res.ok) {
        toast.success("Project Updated Successfully!");
      } else throw new Error("Failed to Update Project");
    } catch (error) {
      toast.error(error.message || "Failed to Update the Project");
    }
  };

  return { updateProject, loading };
};

export default useUpdateProject;
