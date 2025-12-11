import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
  {
    jobTitle: {
      type: String,
      required: true
    },
    company: {
      type: String,
      required: true
    },
    duration: String,
    startDate: Date,
    endDate: Date,
    description: String,
    order: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

export default mongoose.model("Experience", experienceSchema);
