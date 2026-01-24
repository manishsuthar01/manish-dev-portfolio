import React, { useState } from "react";
import toast from "react-hot-toast";

const useDeleteBlog = () => {
  const [loading, setLoading] = useState(false);
  const deleteBlog = async (id) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/blogs/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Blog deleted successfully!");
      } else throw new Error(data.message || "blog deletion Failed!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, deleteBlog };
};

export default useDeleteBlog;
