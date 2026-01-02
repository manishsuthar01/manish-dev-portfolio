const jwt = require("jsonwebtoken");

async function generateTokenAndSetcookie(user, res) {
  const token = await jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_KEY,
    {
      expiresIn: "10d",
    }
  );
  res.cookie("jwt", token, {
    maxAge: 10 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
  });
}

module.exports = generateTokenAndSetcookie;
