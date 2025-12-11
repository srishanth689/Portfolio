import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: String,
    techStack: [String],
    githubUrl: String,
    liveUrl: String,
    imageUrl: String,
    featured: {
      type: Boolean,
      default: false
    },
    order: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
