import useBlogBySlug from "@/features/blog/hook/useBlogBySlug";
import BlogHeroSection from "@/features/blog/sections/BlogHeroSection";
import BlogNavigationSection from "@/features/blog/sections/BlogNavigationSection";
import BlogOverviewSection from "@/features/blog/sections/BlogOverviewSection";
import { useParams } from "react-router-dom";

const BlogDetailPage = () => {
  const { slug } = useParams();
  const { blog, loading } = useBlogBySlug(slug);
  // compiledContent is currently not being used in the BlogOverviewSection, you can pass it as a prop and use it to render the MDX content if needed.

  if (loading)
    return (
      <div className="h-screen bg-white flex items-center justify-center font-mono">
        LOADING...
      </div>
    );
  if (!blog)
    return (
      <div className="h-screen flex items-center justify-center">
        Article not found
      </div>
    );
  return (
    <main>
      <BlogHeroSection blog={blog} />
      <BlogOverviewSection blog={blog} />
      <BlogNavigationSection />
    </main>
  );
};

export default BlogDetailPage;
