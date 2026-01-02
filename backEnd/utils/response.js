function successResponse(
  res,
  { data = null, message = null, meta = null, statusCode = 200 }
) {
  return res.status(statusCode).json({
    success: true,
    data,
    message,
    meta,
  });
}

function errorResponse(
  res,
  { message = "Internal server error", statusCode = 500, errors = null }
) {
  return res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
}

module.exports = {
    successResponse,
    errorResponse,
};
