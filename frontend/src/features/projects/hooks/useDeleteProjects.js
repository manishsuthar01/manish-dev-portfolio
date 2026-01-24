import React, { useState } from "react";
import toast from "react-hot-toast";

const useDeleteProject = () => {
  const [loading, setLoading] = useState(false);
  const deleteProject = async (id) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/projects/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Project deleted successfully!");
      } else throw new Error(data.message || "Project deletion Failed!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, deleteProject };
};

export default useDeleteProject;
