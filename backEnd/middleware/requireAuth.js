const jwt = require("jsonwebtoken");

function requireAuth(req, res, next) {
  try {
    const token = req.cookies?.jwt;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized-No token found" });
    }
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded; // decoded={userID,role}
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized-token invalid" });
  }
}

module.exports = requireAuth;
