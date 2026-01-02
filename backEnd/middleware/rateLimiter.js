const rateLimit = require("express-rate-limit");

function createRateLimiter({ windowMs, max, message, skipSuccessfulRequests }) {
  return rateLimit({
    windowMs,
    max,
    message,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      message: message.message || "Too many requests, please try again later",
      retryAfter: message.retryAfter,
    },
    skipSuccessfulRequests: skipSuccessfulRequests,
  });
}

module.exports = createRateLimiter;
