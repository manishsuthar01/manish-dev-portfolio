import { useState } from "react";

const useNewBlog = () => {
  const [loading, setLoading] = useState(false);

  const createNewBlog = async (formDataInstance) => {
    setLoading(true);
    console.log(formDataInstance);
    try {
      const res = await fetch("/api/admin/blogs", {
        method: "POST",
        body: formDataInstance,
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
