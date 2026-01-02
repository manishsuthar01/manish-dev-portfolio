const Blog = require("../../db/blog.model");
const Project = require("../../db/project.model");

async function fetchDashboardAnalytics() {
  const [
    totalBlogs,
    publishedBlogs,
    draftBlogs,
    totalProjects,
    publishedProjects,
    draftProjects,
  ] = await Promise.all([
    Blog.countDocuments(),
    Blog.countDocuments({ status: "published" }),
    Blog.countDocuments({ status: "draft" }),
    Project.countDocuments(),
    Project.countDocuments({ status: "published" }),
    Project.countDocuments({ status: "draft" }),
  ]);

  return {
    blogs: {
      total: totalBlogs,
      published: publishedBlogs,
      drafts: draftBlogs,
    },
    projects: {
      total: totalProjects,
      published: publishedProjects,
      drafts: draftProjects,
    },
  }; 
}

module.exports = {
  fetchDashboardAnalytics,
};
