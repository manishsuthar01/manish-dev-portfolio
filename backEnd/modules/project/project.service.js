const Project = require("../../db/project.model");

async function fetchPublishedProjects() {
  const projects = await Project.find({ status: "published" });
  return projects; 
}

async function fetchPublishedProjectBySlug(slug) {
  const project = await Project.findOne({ slug, status: "published" });
  if (!project) throw new Error("PROJECT_NOT_FOUND");
  return project;
}

module.exports = {
  fetchPublishedProjectBySlug,
  fetchPublishedProjects,
};
 