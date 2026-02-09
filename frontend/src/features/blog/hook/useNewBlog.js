import { useState } from "react";
import toast from "react-hot-toast";

const useNewBlog = () => {
  const [loading, setLoading] = useState(false);

  const createNewBlog = async ({ FormData }) => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/blogs", {
        method: "POST",
        body: FormData,
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Blog created Successfully!");
      } else throw new Error(data.message || "Blog Creation failed!");
    } catch (error) { 
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, createNewBlog };
};

export default useNewBlog;
