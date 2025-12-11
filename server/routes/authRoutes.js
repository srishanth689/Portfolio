import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const router = express.Router();

// Initialize admin (one-time setup)
router.post("/init-admin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hash });

    res.status(201).json({
      message: "Admin user created successfully",
      userId: user._id
    });
  } catch (err) {
    res.status(500).json({ message: "Error creating admin", error: err.message });
  }
});

// Admin Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });

    res.json({ token, message: "Login successful" });
  } catch (err) {
    res.status(500).json({ message: "Error logging in", error: err.message });
  }
});

// Verify token
router.post("/verify", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ valid: true, userId: decoded.userId });
  } catch (err) {
    res.status(401).json({ valid: false, message: "Invalid token" });
  }
});

export default router;
