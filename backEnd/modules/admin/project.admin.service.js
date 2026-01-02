const slugify = require("../../utils/slugify");
const deleteImage = require("../../utils/deleteCloudinary");
const uploadImage = require("../../utils/uploadCloudinary");
const Project = require("../../db/project.model");

async function generateUniqueSlug(title) {
  const baseSlug = slugify(title);
  let slug = baseSlug;
  let count = 1;

  while (await Project.exists({ slug })) {
    slug = `${baseSlug}-${count}`;
    count++;
  }
  return slug;
}

async function fetchAdminProjects() {
  return await Project.find();
}

async function createNewProject({
  title,
  description,
  techStack,
  links,
  authorId,
  status,
  isFeatured,
  imageUrl,
}) {
  const slug = await generateUniqueSlug(title);
  const newProjetc = await Project.create({
    title,
    description,
    slug,
    techStack,
    links,
    author: authorId,
    status: "published",
    isFeatured: true,
    imageUrl: imageUrl,
  });

  return newProjetc;
}

async function deleteProjectById(id) {
  const project = await Project.findById(id.trim());

  if (!project) {
    throw new Error("PROJECT_NOT_FOUND");
  }

  if (project.imageUrl) {
    try {
      await deleteImage(project.imageUrl);
    } catch (cloudinaryErr) {
      console.error(
        "Cloudinary delete failed, continuing with DB delete:",
        cloudinaryErr
      );
    }
  }

  await Project.findByIdAndDelete(id.trim());
}

async function UpdateProjectById({ projectId, updateData, file }) {
  const oldproject = await Project.findById(projectId);
  if (!oldproject) {
    throw new Error("PROJECT_NOT_FOUND");
  }
  if (file && oldproject.imageUrl) {
    await deleteImage(oldproject.imageUrl);
  }
  if (file) {
    const uploadedImage = await uploadImage(file.buffer, "projects");
    updateData.imageUrl = uploadedImage.secure_url;
  }
  await Project.findByIdAndUpdate(
    projectId,
    { $set: updateData },
    { new: true }
  );
  return await Project.findById(projectId);
}

module.exports = {
  createNewProject,
  UpdateProjectById,
  deleteProjectById,
  fetchAdminProjects,
};
