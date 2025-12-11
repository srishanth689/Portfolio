import express from "express";
import BlogPost from "../models/BlogPost.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET all published blog posts (public)
router.get("/", async (req, res) => {
  try {
    const posts = await BlogPost.find({ published: true }).sort({ publishedDate: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching blog posts", error: err.message });
  }
});

// GET single blog post (public)
router.get("/:slug", async (req, res) => {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug });
    if (!post) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: "Error fetching blog post", error: err.message });
  }
});

// CREATE blog post (admin only)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const post = await BlogPost.create(req.body);
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: "Error creating blog post", error: err.message });
  }
});

// UPDATE blog post (admin only)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!post) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: "Error updating blog post", error: err.message });
  }
});

// DELETE blog post (admin only)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    res.json({ message: "Blog post deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting blog post", error: err.message });
  }
});

export default router;
