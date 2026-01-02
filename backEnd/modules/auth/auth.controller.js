const authSchema = require("./auth.schema");
const { loginUser } = require("./auth.service");
const generateTokenAndSetcookie = require("../../utils/getJwtToken");

const { ZodError } = require("zod");
const { successResponse, errorResponse } = require("../../utils/response");

async function handleLogin(req, res) {
  try {
    const validate = authSchema.parse(req.body);
    const user = await loginUser(validate);
    await generateTokenAndSetcookie(user, res);

    return successResponse(res, {
      data: user,
      message: "logged in successfully!",
    });
  } catch (error) {
    console.log("handleLogin Error :", error.message);
    if (error instanceof ZodError) {
      return errorResponse(res, {
        statusCode: 400,
        message: "Invalid request data",
        errors: error.flatten().fieldErrors,
      });
    }
  
    if (error.message === "Invalid credentials")
      return errorResponse(res, {
        message: "Invalid credentials",
        statusCode: 401,
      });
    return errorResponse(res, {});
  }
}

async function handleLogOut(req, res) {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    return successResponse(res, { message: "logged out successfully!" });
  } catch (error) {
    console.log("handleLogOut Error :".error.message);
    return errorResponse(res, {});
  }
}

module.exports = {
  handleLogin,
  handleLogOut,
};
 