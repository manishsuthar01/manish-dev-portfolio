import { useNavigate } from "react-router-dom";

const BlogTable = ({ deleteBlog, blogs, setBlogs }) => {
  const navigate = useNavigate();

  const blogDeleteHandler = (id) => {
    if (!confirm("Delete this blog permanently?")) return;
    deleteBlog(id);
    setBlogs((prev) => prev.filter((b) => b._id !== id));
  };

  return (
    <div className="flex-1 w-full  mx-auto p-4 md:p-10 font-jakarta bg-background ">
      <div className="mb-18 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-weight-semibold tracking-tight text-foreground">
            Blog Posts
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage your thoughts and technical guides.
          </p>
        </div>
        <div>
          <button
            onClick={() => navigate("/dashboard/blog/new")}
            className="group z-50  inline-flex items-center gap-3 rounded-full border border-border px-8 py-3 text-1xl  bg-primary text-foreground hover:bg-foreground hover:text-background transition-colors cursor-pointer"
          >
            Create New Blog
            <span className="text-lg">→</span>
          </button>
        </div>
      </div>
 
      <div className="w-full overflow-hidden rounded-lg border border-border bg-background shadow-sm">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-foreground text-card-foreground border-b border-border">
              <th className="px-6 py-4 text-left font-weight-semibold uppercase tracking-wider text-xs">
                Article
              </th>
              <th className="px-6 py-4 text-left font-weight-semibold uppercase tracking-wider text-xs">
                Status
              </th>
              <th className="px-6 py-4 text-left font-weight-semibold uppercase tracking-wider text-xs">
                Published
              </th>
              <th className="px-6 py-4 text-right font-weight-semibold uppercase tracking-wider text-xs">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {blogs?.map((blog) => (
              <tr key={blog.slug} className="group transition-colors ">
                <td className="px-6 py-5">
                  <div className="flex flex-col">
                    <span
                      className="text-base font-weight-semibold text-foreground group-hover:text-accent transition-colors italic cursor-pointer "
                      onClick={() => navigate(`/blog/${blog.slug}`)}
                    >
                      {blog.title}
                    </span>
                    <span className="text-[11px] font-instrument text-muted-foreground/70 uppercase tracking-widest mt-1">
                      {blog.slug}
                    </span>
                  </div>
                </td>

                <td className="px-6 py-5">
                  <div className="flex items-center gap-2">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        blog.status === "published"
                          ? "bg-accent shadow-[0_0_8px_var(--color-accent)]"
                          : "bg-muted-foreground"
                      }`}
                    />
                    <span className="text-sm font-medium capitalize text-foreground">
                      {blog.status}
                    </span>
                  </div>
                </td>

                <td className="px-6 py-5 text-sm text-muted-foreground">
                  {new Date(blog.publishedAt).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>

                <td className="px-6 py-5 text-right">
                  <div className="flex justify-end items-center gap-4">
                    <button
                      onClick={() => navigate(`/dashboard/blog/${blog.slug}/edit`)}
                      className="text-sm font-weight-semibold text-foreground hover:text-accent transition-colors underline underline-offset-4 decoration-border hover:decoration-accent">
                      Edit
                    </button>
                    <button
                      onClick={() => blogDeleteHandler(blog._id)}
                      className="text-sm font-weight-semibold text-destructive hover:opacity-80 transition-opacity hover:cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlogTable;
