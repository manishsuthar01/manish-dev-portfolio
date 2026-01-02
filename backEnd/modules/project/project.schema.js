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

const createProjectSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(1),
  techStack: jsonString(z.array(z.string())),
  links: jsonString(
    z.object({
      github: z.string().url().optional(),
      live: z.string().url().optional(),
    })
  ),
  isFeatured: booleanString.optional(),
  imageUrl: z.string().url().optional(),
  status: z.enum(["draft", "published"]),
});

module.exports = {
  createProjectSchema,
  jsonString,
};
