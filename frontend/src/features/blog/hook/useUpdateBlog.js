import React, { useState } from "react";
import toast from "react-hot-toast";

const useUpdateBlog = () => {
  const [loading, setLoading] = useState(false);

  const updateBlog = async ({ FormData, blogID }) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/blogs/${blogID}`, {
        method: "PATCH",
        body: FormData,
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Blog update Successfully!");
      } else throw new Error(data.message || "Blog update failed!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {updateBlog, loading}
};

export default useUpdateBlog;
