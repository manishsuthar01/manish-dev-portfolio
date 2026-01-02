const Blog = require("../../db/blog.model");
const slugify = require("../../utils/slugify");
const deleteImage = require("../../utils/deleteCloudinary");
const uploadImage = require("../../utils/uploadCloudinary");

async function generateUniqueSlug(title) {
  const baseSlug = slugify(title);
  let slug = baseSlug;
  let count = 1;

  while (await Blog.exists({ slug })) {
    slug = `${baseSlug}-${count}`;
    count++;
  }
  return slug;
}

async function fetchAdminBlogs({ page, limit, status, search }) {
  const query = {};

  if (status) {
    query.status = status; 
  }

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { excerpt: { $regex: search, $options: "i" } },
    ];
  }

  const blogs = await Blog.find(query)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  const total = await Blog.countDocuments(query);

  return {
    data: blogs,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
}

async function createNewBlog({
  title,
  content,
  excerpt,
  status,
  authorId,
  imageUrl,
}) {
  const slug = await generateUniqueSlug(title);
  const newblog = await Blog.create({
    title,
    slug,
    content,
    excerpt,
    status,
    imageUrl,
    author: authorId,
    publishedAt: status == "draft" ? null : new Date(),
  });
  return newblog;
}

async function fetchUpdateBlog({ blogId, updateData, file }) {
  let oldBlog = await Blog.findById(blogId);
  if (!oldBlog) {
    throw new Error("BLOG_NOT_FOUND");
  }
  if (file && oldBlog.imageUrl) {
    await deleteImage(oldBlog.imageUrl);
  }
  if (file) {
    const uploadedImage = await uploadImage(file.buffer, "blogs");
    updateData.imageUrl = uploadedImage.secure_url;
  }
  await Blog.findByIdAndUpdate(blogId, { $set: updateData }, { new: true });
  return await Blog.findById(blogId);
}

async function deleteBlogById(id) {
  const blog = await Blog.findById(id);
  if (!blog) {
    throw new Error("BLOG_NOT_FOUND");
  }
  if (blog.imageUrl) {
    try {
      await deleteImage(blog.imageUrl);
    } catch (cloudinaryErr) {
      console.error(
        "Cloudinary delete failed, continuing with DB delete:",
        cloudinaryErr
      );
    }
  }

  await Blog.findByIdAndDelete(id.trim());
}

module.exports = {
  fetchUpdateBlog,
  deleteBlogById, 
  createNewBlog, 
  fetchAdminBlogs
};
