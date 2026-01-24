import BlogTable from "@/features/blog/component/admin/BlogTable";
import useAdminBlog from "@/features/blog/hook/useAdminBlog";
import useBlog from "@/features/blog/hook/useBlog";
import useDeleteBlog from "@/features/blog/hook/useDeleteBlog";
import React from "react";

const AdminBlogPage = () => {
  const { blogs, loading, setBlogs } = useAdminBlog();
  const { deleteBlog } = useDeleteBlog();
  if (loading)
    return (
      <div className="flex min-h-100 items-center justify-center font-jakarta text-muted-foreground italic">
        Fetching articles...
      </div>
    );

  return (
    <div className="w-full h-full">
      <BlogTable blogs={blogs} setBlogs={setBlogs} deleteBlog={deleteBlog} />
    </div>
  );
};

export default AdminBlogPage;
