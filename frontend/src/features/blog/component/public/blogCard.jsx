import React from "react";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();

  const date = new Date(blog.createdAt).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  return (
    <div
      onClick={() => navigate(`/blog/${blog.slug}`)}
      className="group relative w-full border-b border-border/50 py-8 md:py-12 cursor-pointer overflow-hidden transition-all duration-500"
    >
      <div className="absolute inset-0 bg-foreground/2 -z-10 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.76,0,0.24,1]" />

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 md:gap-10">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-jakarta text-[10px] uppercase tracking-[0.3em] text-muted-foreground/80">
              {date}
            </span>
            <span className="h-px w-6 bg-border" />
            <span className="font-jakarta text-[10px] uppercase tracking-[0.3em] text-muted-foreground/80">
              {blog.readingTime || "Article"}
            </span>
          </div>

          <h3 className="font-jakarta text-xl sm:text-2xl md:text-4xl lg:text-5xl font-light uppercase tracking-tight leading-[1.1] md:leading-none group-hover:translate-x-2 transition-transform duration-500 text-foreground">
            {blog.title}
          </h3>
        </div>

        <div className="flex items-center justify-between lg:justify-end gap-6 md:gap-10">
          <p className="hidden xl:block max-w-[240px] text-xs text-muted-foreground/80 font-light leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            {blog.excerpt}
          </p>

          <div className="relative h-16 w-24 md:h-24 md:w-40 overflow-hidden rounded-xl grayscale group-hover:grayscale-0 transition-all duration-700 border border-border/50">
            <img
              src={blog.imageUrl}
              alt={blog.title}
              className="h-full w-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700"
            />
          </div>

          <div className="flex items-center justify-center h-10 w-10 md:h-12 md:w-12 border border-border rounded-full transition-all duration-500 group-hover:bg-foreground group-hover:text-background">
            <span className="text-xl group-hover:-rotate-45 transition-transform duration-300">
              →
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
