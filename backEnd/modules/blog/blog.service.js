const { error } = require("node:console");
const Blog = require("../../db/blog.model");

async function fetchPublishedBlogs({ page, limit, search }) {
  const query = { status: "published" };

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { excerpt: { $regex: search, $options: "i" } },
    ];
  }

  const blogs = await Blog.find(query)
    .sort({ publishedAt: -1 })
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

async function fetchPublishedBlogBySlug(slug) {
  const blog = await Blog.findOne({ slug, status: "published" });
  if (!blog) {
    const error = new Error("Blog not found");
    error.statusCode = 404; 
    throw error;
  }
  return blog;
}

module.exports = {
  fetchPublishedBlogBySlug,
  fetchPublishedBlogs,
};
