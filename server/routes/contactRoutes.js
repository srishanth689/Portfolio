import express from "express";
import ContactMessage from "../models/ContactMessage.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// POST contact message (public)
router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "Name, email, and message are required" });
    }

    const contactMsg = await ContactMessage.create({
      name,
      email,
      subject,
      message
    });

    res.status(201).json({
      message: "Message sent successfully",
      contactMsg
    });
  } catch (err) {
    res.status(500).json({ message: "Error sending message", error: err.message });
  }
});

// GET all contact messages (admin only)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Error fetching messages", error: err.message });
  }
});

// MARK message as read (admin only)
router.put("/:id/read", authMiddleware, async (req, res) => {
  try {
    const message = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }
    res.json(message);
  } catch (err) {
    res.status(500).json({ message: "Error updating message", error: err.message });
  }
});

// DELETE contact message (admin only)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const message = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }
    res.json({ message: "Message deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting message", error: err.message });
  }
});

export default router;
