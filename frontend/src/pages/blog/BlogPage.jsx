import BlogList from "@/features/blog/component/public/blogList";
import useBlog from "@/features/blog/hook/useBlog";
import React from "react";

const BlogPage = () => {
  const { blogs } = useBlog();
  if (!blogs) {
    return <div className="w-full h-full bg-background"></div>;
  }
  return (
    <>
      <BlogList blogs={blogs} />
    </>
  );
};

export default BlogPage;
