import { useEffect, useState } from "react";

const BlogForm = ({ initialData = null, onSubmit, isSubmitting }) => {
  const isEdit = Boolean(initialData?._id);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    imageUrl: "",
    status: "draft",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || "",
        excerpt: initialData.excerpt || "",
        content: initialData.content || "",
        imageUrl: initialData.imageUrl || "",
        status: initialData.status || "draft",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const FromData = new FormData();
    FromData.append("title", form.title);
    FromData.append("content", form.content);
    FromData.append("excerpt", form.excerpt);
    FromData.append("image", form.image);
    FromData.append("status", form.status);
    onSubmit(FromData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-5xl mx-auto p-6 md:p-10 space-y-8 font-jakarta bg-background"
    >
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          {isEdit ? "Edit Blog Post" : "Create New Blog"}
        </h1>
        <p className="text-muted-foreground mt-2">
          {isEdit
            ? "Update your article content and metadata."
            : "Write and publish a new article."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="text-sm font-medium text-foreground">Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="mt-2 w-full rounded-md border border-border bg-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        <div className="md:col-span-2">
          <label className="text-sm font-medium text-foreground">
            Image URL
          </label>
          <input
            type="file"
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            className="mt-2 w-full rounded-md border border-border bg-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        <div className="md:col-span-2">
          <label className="text-sm font-medium text-foreground">Excerpt</label>
          <textarea
            name="excerpt"
            value={form.excerpt}
            onChange={handleChange}
            rows={3}
            className="mt-2 w-full rounded-md border border-border bg-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        <div className="md:col-span-2">
          <label className="text-sm font-medium text-foreground">Content</label>
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            rows={8}
            required
            className="mt-2 w-full rounded-md border border-border bg-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-foreground">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="mt-2 w-full rounded-md border border-border bg-background px-4 py-2"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
      </div>

      <div className="flex items-center justify-end gap-4 pt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-accent px-6 py-2 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60"
        >
          {isSubmitting ? "Saving..." : isEdit ? "Update Blog" : "Create Blog"}
        </button>
      </div>
    </form>
  );
};

export default BlogForm;
