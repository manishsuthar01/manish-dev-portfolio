import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useProjectBySlug = (slug) => {
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState(null);

  useEffect(() => {
    if (!slug) return;

    const getProjectBySlug = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/projects/${slug}`);
        const data = await response.json();

        if (response.ok) {
          setProject(data);
        } else {
          throw new Error(data.message || "Failed to fetch project");
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getProjectBySlug();
  }, [slug]);

  return { project, loading };
};

export default useProjectBySlug;
