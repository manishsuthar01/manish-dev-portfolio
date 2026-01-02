const { z } = require("zod");

const jsonString = (schema) =>
  z.preprocess((val) => {
    if (typeof val !== "string") return val;
    try {
      return JSON.parse(val);
    } catch {
      return val;
    }
  }, schema);

const booleanString = z.preprocess((val) => {
  if (val === "true") return true;
  if (val === "false") return false;
  return val;
}, z.boolean());

const createBlogSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
  excerpt: z.string().min(10).max(300),
  status: z.enum(["draft", "published"]).optional(),
  imageUrl: z.string().url().optional(),
});

module.exports = createBlogSchema;
