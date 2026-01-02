const createRateLimiter = require("./rateLimiter");

const authLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    message: "Too many requests from this IP address",
    retryAfter: "10 minutes",
  },
  skipSuccessfulRequests: false,
});

const adminLimiter = createRateLimiter({
  windowMs: 5 * 60 * 1000,
  max: 100,
  message: {
    message: "Too many requests from this IP address",
    retryAfter: "5 minutes",
  },
  skipSuccessfulRequests: true,
});

module.exports = {
  adminLimiter,
  authLimiter,
};
