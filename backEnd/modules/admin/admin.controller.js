const { fetchDashboardAnalytics } = require("./admin.service");
const { successResponse, errorResponse } = require("../../utils/response");

async function getDashboardAnalytics(req, res) {
  try {
    const stats = await fetchDashboardAnalytics();
    return successResponse(res, { data: stats });
  } catch (error) {
    console.log("admin controller Error :", error.message);
    return errorResponse(res, {});
  }
}

module.exports = {
  getDashboardAnalytics,
};
  