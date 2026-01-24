import BlogCard from "./blogCard";

const BlogList = ({ blogs }) => {
  return (
    <section className="w-full px-6 md:px-12">
      <div className="min-h-[40vh] md:min-h-[60vh] flex items-end pb-8 md:pb-12">
        <h2 className="font-jakarta text-[14vw] leading-[0.8] font-light uppercase tracking-tighter">
          Insights
        </h2>
      </div>

      <div className="flex flex-col border-t border-border/50">
        {blogs?.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </section>
  );
};

export default BlogList;
