const {
  fetchPublishedBlogs,
  fetchPublishedBlogBySlug,
} = require("./blog.service");

const { successResponse, errorResponse } = require("../../utils/response");

async function getAllBlogs(req, res) {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;

    const blogs = await fetchPublishedBlogs({
      page: Number(page),
      limit: Number(limit),
      search,
    });

    return successResponse(res, {
      data: blogs.data,
      meta: blogs.pagination,
    });
  } catch (error) {
    console.error(" getAllBlogs Error :", error.message);
    return errorResponse(res, {});
  }
}

async function getBlogBySlug(req, res) {
  try {
    const { slug } = req.params;
    const blog = await fetchPublishedBlogBySlug(slug);
    return successResponse(res, { data: blog });
  } catch (error) {
    console.error("getBlogsBySlug Error:", error.message);
    if (error.statusCode === 404 || error.message === "BLOG_NOT_FOUND") {
      return errorResponse(res, {
        statusCode: 404,
        message: "The requested blog could not be found.",
        errors: error,
      });
    }
    return errorResponse(res, {});
  }
}

module.exports = {
  getBlogBySlug,
  getAllBlogs,
};
 