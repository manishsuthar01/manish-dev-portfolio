import BlogForm from "@/features/blog/component/BlogForm";
import useBlogBySlug from "@/features/blog/hook/useBlogBySlug";
import useUpdateBlog from "@/features/blog/hook/useUpdateBlog";
import React from "react";
import { useParams } from "react-router-dom";

const EditBlogPage = () => {
  const { loading, updateBlog } = useUpdateBlog();
  const { slug } = useParams();
  const { blog } = useBlogBySlug(slug);
  return (
    <BlogForm onSubmit={updateBlog} isSubmitting={loading} initialData={blog} />
  );
};

export default EditBlogPage;
