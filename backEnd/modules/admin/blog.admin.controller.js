const createBlogSchema = require("../blog/blog.schema");
const { ZodError } = require("zod");
const uploadImage = require("../../utils/uploadCloudinary");
const mongoose = require("mongoose");
const { successResponse, errorResponse } = require("../../utils/response");
const {
  createNewBlog,
  fetchUpdateBlog,
  deleteBlogById,
  fetchAdminBlogs,
} = require("./blog.admin.service");

async function getAdminBlogs(req, res) {
  try {
    const { page = 1, limit = 10, status, search } = req.query;

    const blogs = await fetchAdminBlogs({
      page: Number(page),
      limit: Number(limit),
      status,
      search,
    });

    return successResponse(res, { data: blogs.data, meta: blogs.pagination });
  } catch (error) {
    console.error("getAdminBlogs Error :", error.message);
    return errorResponse(res, {});
  }
}

async function createBlog(req, res) {
  try {
    let imageUrl;
    if (req.file) {
      let uploadedImage = await uploadImage(req.file.buffer, "blogs");
      imageUrl = uploadedImage.secure_url;
    }
    const dataToValidate = { ...req.body, imageUrl: imageUrl };
    const validateData = createBlogSchema.parse(dataToValidate);
    const newBlog = await createNewBlog({
      ...validateData,
      authorId: req.user.userId,
    });

    return successResponse(res, {
      data: newBlog,
      message: "blog created successfully",
      statusCode: 201,
    });
  } catch (error) {
    console.error("admin createBlog Error :", error.message);

    if (error instanceof ZodError) {
      return errorResponse(res, {
        statusCode: 400,
        message: "Invalid request data",
        errors: error.flatten().fieldErrors,
      });
    }

    return errorResponse(res, {});
  }
}

async function updateBlog(req, res) {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id.trim())) {
      return errorResponse(res, {
        statusCode: 400,
        message: "invalid blog id",
      });
    }
    const validateBody = await createBlogSchema.partial().parse(req.body);
    const updatedBlog = await fetchUpdateBlog({
      blogId: id,
      updateData: validateBody,
      file: req.file,
    });

    return successResponse(res, {
      data: updateBlog,
      message: "blog updated successfully",
    });
  } catch (error) {
    console.error("admin updateBlog Error :", error.message);
    if (error instanceof ZodError) {
      return errorResponse(res, {
        message: "Invalid request data",
        errors: error.flatten().fieldErrors,
        statusCode: 400,
      });
    }
    if (error.message === "BLOG_NOT_FOUND") {
      return errorResponse(res, { message: "blog not found", statusCode: 404 });
    }

    return errorResponse(res, {});
  }
}

async function deleteBlog(req, res) {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id.trim())) {
      return errorResponse(res, {
        statusCode: 400,
        message: "invalid blog id",
      });
    }
    await deleteBlogById(id);
    return successResponse(res, { message: "blog deleted successfull" });
  } catch (error) {
    console.error("admin deleteBlog Error :", error.message);
    if (error.message === "BLOG_NOT_FOUND") {
      return errorResponse(res, { statusCode: 404, message: "blog not found" });
    }
    return errorResponse(res, {});
  }
}

module.exports = {
  createBlog,
  deleteBlog,
  updateBlog,
  getAdminBlogs,
};
