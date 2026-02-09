import React, { useState } from "react";
import toast from "react-hot-toast";

const useNewProject = () => {
  const [loading, setLoading] = useState(false);

  const createNewProject = async ({formData}) => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/projects", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (res.ok) {
        toast.success("Project Created successfully!");
      } else throw new Error(data.message || "Blog Creation failed!");
    } catch (error) {
      toast.error(error.message);
    } finally { 
      setLoading(false);
    }
  };

  return { createNewProject, loading };
};

export default useNewProject;
