const { createProjectSchema } = require("../project/project.schema");
const { ZodError } = require("zod");
const uploadImage = require("../../utils/uploadCloudinary");
const mongoose = require("mongoose");

const {
  createNewProject,
  deleteProjectById,
  UpdateProjectById,
  fetchAdminProjects,
} = require("./project.admin.service");
const { errorResponse, successResponse } = require("../../utils/response");

async function getAdminProjects() {
  try {
    const projects = await fetchAdminProjects();
    return successResponse(res, { data: projects });
  } catch (error) {
    console.error("admin getAdminProjects Error :", error.message);
    return errorResponse(res, {});
  }
}

async function createProject(req, res) {
  try {
    let imageUrl;
    if (req.file) {
      const uploadedImage = await uploadImage(req.file.buffer, "projects");
      imageUrl = uploadedImage.secure_url;
    }
    const dataToValidate = {
      ...req.body,
      imageUrl: imageUrl,
    };
    const validateBody = await createProjectSchema.parse(dataToValidate);
    const newProjetc = await createNewProject({
      ...validateBody,
      authorId: req.user.userId,
    });

    return successResponse(res, {
      data: newProjetc,
      message: "project created successfully",
      statusCode: 201,
    });
  } catch (error) {
    console.error("admin createProjectError : ", error.message);
    if (error instanceof ZodError) {
      return errorResponse(res, {
        statusCode: 404,
        message: "Invalid request data",
        errors: error.flatten().fieldErrors,
      });
    }

    return errorResponse(res, {});
  }
}

async function updateProject(req, res) {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return errorResponse(res, {
        statusCode: 400,
        message: "invalid project id",
      });
    }

    const validateBody = await createProjectSchema.partial().parse(req.body);
    const updatedProject = await UpdateProjectById({
      projectId: id,
      updateData: validateBody,
      file: req.file,
    });
    return successResponse(res, {
      data: updateProject,
      message: "project updated successfully ",
    });
  } catch (error) {
    console.error("admin updateProject Error :", error.message);
    if (error instanceof ZodError) {
      return errorResponse(res, {
        statusCode: 400,
        message: "Invalid request data",
        errors: error.flatten().fieldErrors,
      });
    }
    if (error.message === "PROJECT_NOT_FOUND") {
      return errorResponse(res, {
        statusCode: 404,
        message: "project not found",
      });
    }

    return errorResponse(res, {});
  }
}

async function deleteProject(req, res) {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return errorResponse(res, {
        statusCode: 400,
        message: "invalid project id",
      });
    }
    await deleteProjectById(id);

    return successResponse(res, { message: "project deleted successfull" });
  } catch (error) {
    console.error("admin deleteProject Error :", error.message);
    if (error.message === "PROJECT_NOT_FOUND") {
      return errorResponse(res, {
        statusCode: 404,
        message: "project not found",
      });
    }
    return errorResponse(res, {});
  }
}

module.exports = {
  createProject,
  deleteProject,
  updateProject,
  getAdminProjects,
};
