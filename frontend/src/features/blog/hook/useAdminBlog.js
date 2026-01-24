import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useAdminBlog = () => {
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState(null);
  useEffect(() => {
    const getBlog = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/admin/blogs`);
        const data = await response.json();
        if (response.ok) {
          setBlogs(data.data);
        } else {
          throw new Error(data.message || "error in fetching blogs");
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getBlog();
  }, []);

  return { blogs, loading, setBlogs };
};

export default useAdminBlog;
