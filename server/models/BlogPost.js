import mongoose from "mongoose";

const blogPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      unique: true,
      required: true
    },
    excerpt: String,
    content: String,
    tags: [String],
    imageUrl: String,
    published: {
      type: Boolean,
      default: false
    },
    publishedDate: Date,
    order: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

export default mongoose.model("BlogPost", blogPostSchema);
