const express = require("express");
const router = express.Router();
const upload = require("../../middleware/uploads");

const {
  createProject,
  deleteProject,
  updateProject,
  getAdminProjects,
} = require("./project.admin.controller");

const {
  createBlog,
  deleteBlog,
  updateBlog,
  getAdminBlogs,
} = require("./blog.admin.controller");
const { getDashboardAnalytics } = require("./admin.controller");

const { adminLimiter } = require("../../middleware/rateLimiters.config");

router.use(adminLimiter);

router.get("/analytics", getDashboardAnalytics);

router.get("/blogs", getAdminBlogs);
router.post("/blogs", upload.single("image"), createBlog);
router.patch("/blogs/:id", upload.single("image"), updateBlog);
router.delete("/blogs/:id", deleteBlog);

router.get("/projects", getAdminProjects);
router.post("/projects", upload.single("image"), createProject);
router.patch("/projects/:id", upload.single("image"), updateProject);
router.delete("/projects/:id", deleteProject);

module.exports = router; 
