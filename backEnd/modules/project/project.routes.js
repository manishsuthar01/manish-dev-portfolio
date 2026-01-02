const express = require("express");
const router = express.Router();

const { getAllProjects, getProjectBySlug } = require("./project.controller");

router.get("/", getAllProjects);
router.get("/:slug", getProjectBySlug);

module.exports = router;
