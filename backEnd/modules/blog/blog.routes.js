const express = require("express");

const router = express.Router();

const {
  getAllBlogs,
  getBlogBySlug,

} = require("./blog.controller");

router.get("/", getAllBlogs);
router.get("/:slug", getBlogBySlug);


module.exports = router;
