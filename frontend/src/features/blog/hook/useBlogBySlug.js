import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useBlogBySlug = (slug) => {
  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState({});
  useEffect(() => {
    if (!slug) return;
    const getBlogBySlug = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/blogs/${slug}`);
        const data = await response.json();
        if (response.ok) {
          setBlog(data.data);
        } else {
          throw new Error(data.message || "Error fetching blog");
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getBlogBySlug();
  }, [slug]);

  return { blog, loading }; 
};

export default useBlogBySlug;
