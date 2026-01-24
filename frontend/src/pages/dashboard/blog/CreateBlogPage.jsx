import BlogForm from "@/features/blog/component/BlogForm";
import useNewBlog from "@/features/blog/hook/useNewBlog";
import React from "react";

const CreateBlogPage = () => {
  const { loading, createNewBlog } = useNewBlog();
  return <BlogForm onSubmit={createNewBlog} isSubmitting={loading} />;
};

export default CreateBlogPage;
