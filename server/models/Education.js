import mongoose from "mongoose";

const educationSchema = new mongoose.Schema(
  {
    degree: {
      type: String,
      required: true
    },
    institution: {
      type: String,
      required: true
    },
    field: String,
    graduationDate: Date,
    description: String,
    order: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

export default mongoose.model("Education", educationSchema);
