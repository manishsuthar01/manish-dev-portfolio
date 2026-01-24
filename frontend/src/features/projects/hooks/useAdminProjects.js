import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useAdminProject = () => {
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState(null);
  useEffect(() => {
    const getBlog = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/admin/projects`);
        const data = await response.json();
        if (response.ok) {
          setProjects(data.data);
        } else {
          throw new Error(data.message || "error in fetching Projects");
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getBlog();
  }, []);

  return { projects, loading, setProjects };
};

export default useAdminProject;
