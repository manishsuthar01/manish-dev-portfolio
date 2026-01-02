const express = require("express");
const router = express.Router();

const requireRole = require("../middleware/requireRole");
const requireAuth = require("../middleware/requireAuth");

const blogRoutes = require("../modules/blog/blog.routes");
const projectRoutes = require("../modules/project/project.routes");
const authRoutes = require("../modules/auth/auth.routes");
const adminRoutes = require("../modules/admin/admin.routes");

router.use("/blogs", blogRoutes);
router.use("/projects", projectRoutes);
router.use("/auth", authRoutes);
router.use("/admin", requireAuth, requireRole, adminRoutes);

module.exports = router;
