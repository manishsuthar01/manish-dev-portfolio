const { z } = require("zod");

const authSchema = z.object({
  userName: z.string(),
  password: z.string().min(6),
});

module.exports = authSchema;
