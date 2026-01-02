const {
  fetchPublishedProjects,
  fetchPublishedProjectBySlug,
} = require("./project.service");
const { successResponse, errorResponse } = require("../../utils/response");

async function getAllProjects(req, res) {
  try {
    const projects = await fetchPublishedProjects();
    return successResponse(res, { data: projects });
  } catch (error) {
    console.error("getAllProjects Error ", error.message);
    return errorResponse(res, {});
  }
}

async function getProjectBySlug(req, res) {
  try {
    const { slug } = req.params;
    const project = await fetchPublishedProjectBySlug(slug);
    return successResponse(res, { data: project });
  } catch (error) {
    console.error("getProjetcBySlug Error : ", error.message);
    if (error.message === "PROJECT_NOT_FOUND")
      return errorResponse(res, {
        message: "PROJECT_NOT_FOUND",
        statusCode: 404,
      });
    return errorResponse(res, {});
  }
}

module.exports = {
  getProjectBySlug,
  getAllProjects,
};
