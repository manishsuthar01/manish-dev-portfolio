import { useLoading } from "@/context/LoadingContext";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useBlog = () => {
  const { setIsPageLoading } = useLoading();
  const [blogs, setBlogs] = useState(null);
  useEffect(() => {
    const getBlog = async () => {
      setIsPageLoading(true);
      try {
        const response = await fetch(`/api/blogs`);
        const data = await response.json();
        if (response.ok) {
          setBlogs(data.data);
        } else {
          throw new Error(data.message || "error in fetching blogs");
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsPageLoading(false);
      }
    };
    getBlog();
  }, []);

  return { blogs };
};

export default useBlog;
