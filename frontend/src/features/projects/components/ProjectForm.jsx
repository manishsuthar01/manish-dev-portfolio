import { useEffect, useState } from "react";

const ProjectForm = ({ initialData = null, onSubmit, isSubmitting }) => {
  const isEdit = Boolean(initialData?._id);

  const [form, setForm] = useState({
    title: "",
    description: "",
    techStack: "", 
    imageUrl: "",
    github: "",
    live: "",
    status: "draft",
    isFeatured: false,
  });

  useEffect(() => {
    if (initialData) {
        console.log("Initial Data:", initialData); 
      setForm({
        title: initialData.title || "",
        description: initialData.description || "",
        // Joining array back to string for the input field
        techStack: initialData.techStack?.join(", ") || "",
        imageUrl: initialData.imageUrl || "",
        github: initialData.links?.github || "",
        live: initialData.links?.live || "",
        status: initialData.status || "draft",
        isFeatured: initialData.isFeatured || false,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, files, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === "file" ? files[0] : type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("status", form.status);
    formData.append("isFeatured", form.isFeatured);

    const techArray = form.techStack.split(",").map((item) => item.trim());
    formData.append("techStack", JSON.stringify(techArray));

    const links = {
      github: form.github,
      live: form.live,
    };
    formData.append("links", JSON.stringify(links));

    if (form.imageUrl instanceof File) {
      formData.append("image", form.imageUrl);
    }

    onSubmit({ formData, projectID: initialData?._id });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-5xl mx-auto p-6 md:p-10 space-y-8 font-jakarta bg-background"
    >
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          {isEdit ? "Edit Project" : "Add New Project"}
        </h1>
        <p className="text-muted-foreground mt-2">
          {isEdit
            ? "Update project details and links."
            : "Showcase a new piece of work."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Title */}
        <div className="md:col-span-1">
          <label className="text-sm font-medium text-foreground">
            Project Title
          </label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            placeholder="e.g. E-commerce Dashboard"
            className="mt-2 w-full rounded-md border border-border bg-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        {/* Tech Stack */}
        <div className="md:col-span-1">
          <label className="text-sm font-medium text-foreground">
            Tech Stack (comma separated)
          </label>
          <input
            name="techStack"
            value={form.techStack}
            onChange={handleChange}
            placeholder="React, Node.js, Tailwind"
            className="mt-2 w-full rounded-md border border-border bg-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        {/* Image */}
        <div className="md:col-span-2">
          <label className="text-sm font-medium text-foreground">
            Project Cover Image
          </label>
          <input
            type="file"
            name="imageUrl"
            onChange={handleChange}
            className="mt-2 w-full rounded-md border border-border bg-background px-4 py-2"
          />
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="text-sm font-medium text-foreground">
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            required
            className="mt-2 w-full rounded-md border border-border bg-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        {/* Links */}
        <div>
          <label className="text-sm font-medium text-foreground">
            GitHub URL
          </label>
          <input
            name="github"
            value={form.github}
            onChange={handleChange}
            required
            className="mt-2 w-full rounded-md border border-border bg-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-foreground">
            Live Demo URL
          </label>
          <input
            name="live"
            value={form.live}
            onChange={handleChange}
            required
            className="mt-2 w-full rounded-md border border-border bg-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        {/* Status & Featured */}
        <div className="flex items-center gap-8">
          <div className="flex-1">
            <label className="text-sm font-medium text-foreground">
              Status
            </label>
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
          <div className="flex items-center gap-2 mt-6">
            <input
              type="checkbox"
              name="isFeatured"
              id="isFeatured"
              checked={form.isFeatured}
              onChange={handleChange}
              className="h-4 w-4 rounded border-border text-accent focus:ring-accent"
            />
            <label
              htmlFor="isFeatured"
              className="text-sm font-medium text-foreground"
            >
              Featured Project
            </label>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-4 pt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-accent px-6 py-2 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60"
        >
          {isSubmitting
            ? "Saving..."
            : isEdit
              ? "Update Project"
              : "Create Project"}
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;
