import express from "express";
import Experience from "../models/Experience.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET all experiences (public)
router.get("/", async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ order: 1, createdAt: -1 });
    res.json(experiences);
  } catch (err) {
    res.status(500).json({ message: "Error fetching experiences", error: err.message });
  }
});

// CREATE experience (admin only)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const experience = await Experience.create(req.body);
    res.status(201).json(experience);
  } catch (err) {
    res.status(500).json({ message: "Error creating experience", error: err.message });
  }
});

// UPDATE experience (admin only)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const experience = await Experience.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }
    res.json(experience);
  } catch (err) {
    res.status(500).json({ message: "Error updating experience", error: err.message });
  }
});

// DELETE experience (admin only)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const experience = await Experience.findByIdAndDelete(req.params.id);
    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }
    res.json({ message: "Experience deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting experience", error: err.message });
  }
});

export default router;
