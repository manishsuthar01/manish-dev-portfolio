const express = require("express");

const router = express.Router();

const { handleLogin, handleLogOut } = require("./auth.controller");
const { authLimiter } = require("../../middleware/rateLimiters.config");

router.post("/login", authLimiter, handleLogin);
router.post("/logout", handleLogOut);

module.exports = router;
