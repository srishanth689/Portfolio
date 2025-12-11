import express from "express";
import Skill from "../models/Skill.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET all skills (public)
router.get("/", async (req, res) => {
  try {
    const skills = await Skill.find().sort({ order: 1, createdAt: -1 });
    res.json(skills);
  } catch (err) {
    res.status(500).json({ message: "Error fetching skills", error: err.message });
  }
});

// CREATE skill (admin only)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const skill = await Skill.create(req.body);
    res.status(201).json(skill);
  } catch (err) {
    res.status(500).json({ message: "Error creating skill", error: err.message });
  }
});

// UPDATE skill (admin only)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }
    res.json(skill);
  } catch (err) {
    res.status(500).json({ message: "Error updating skill", error: err.message });
  }
});

// DELETE skill (admin only)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }
    res.json({ message: "Skill deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting skill", error: err.message });
  }
});

export default router;
