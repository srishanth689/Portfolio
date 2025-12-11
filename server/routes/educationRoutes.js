import express from "express";
import Education from "../models/Education.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET all education (public)
router.get("/", async (req, res) => {
  try {
    const education = await Education.find().sort({ order: 1, createdAt: -1 });
    res.json(education);
  } catch (err) {
    res.status(500).json({ message: "Error fetching education", error: err.message });
  }
});

// CREATE education (admin only)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const education = await Education.create(req.body);
    res.status(201).json(education);
  } catch (err) {
    res.status(500).json({ message: "Error creating education", error: err.message });
  }
});

// UPDATE education (admin only)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const education = await Education.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!education) {
      return res.status(404).json({ message: "Education not found" });
    }
    res.json(education);
  } catch (err) {
    res.status(500).json({ message: "Error updating education", error: err.message });
  }
});

// DELETE education (admin only)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const education = await Education.findByIdAndDelete(req.params.id);
    if (!education) {
      return res.status(404).json({ message: "Education not found" });
    }
    res.json({ message: "Education deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting education", error: err.message });
  }
});

export default router;
