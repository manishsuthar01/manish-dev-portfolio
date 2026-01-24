import { useLoading } from "@/context/LoadingContext";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useProjects = () => {
  const { setIsPageLoading } = useLoading();
  const [projects, setprojects] = useState({});
  useEffect(() => {
    const getProjects = async () => {
      setIsPageLoading(true);
      try {
        const response = await fetch("/api/projects");
        const data = await response.json();
        if (response.ok) {
          setprojects(data);
        } else {
          throw new Error(data.message || "Failed to fetch projects");
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsPageLoading(false);
      }
    };
    getProjects();
  }, [setIsPageLoading]);

  return { projects };
};

export default useProjects;
