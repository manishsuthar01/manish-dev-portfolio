const mongoose = require("mongoose");
// techStack=["html","css"]
// links={github:"",live:""}
const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a project title"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please provide a description"],
    },
    slug: {
      type: String,
      unique: true,
      index: true,
      required: true,
      lowercase: true,
      trim: true,
    },
    techStack: [
      {
        type: String,
        trim: true,
        required: true,
      },
    ],
    imageUrl: {
      type: String,
      default: "default-project-image.jpeg",
    },
    links: {
      github: {
        type: String,
        required: true,
        trim: true,
      },
      live: {
        type: String,
        required: true,
        trim: true,
      },
    },
    status: {
      type: String,
      enum: ["draft", "published"], 
      default: "draft",
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
