import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import skillRoutes from "./routes/skillRoutes.js";
import experienceRoutes from "./routes/experienceRoutes.js";
import educationRoutes from "./routes/educationRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/education", educationRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/contact", contactRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "Server is running" });
});

// DB + Server
const PORT = process.env.PORT || 5000;

// Add timeout to force fallback if MongoDB takes too long
const mongoTimeout = setTimeout(() => {
  console.log("⚠️  MongoDB connection timeout - starting in demo mode...");
  startServer();
}, 5000);

// Try to connect to MongoDB
if (process.env.MONGO_URI && process.env.MONGO_URI !== 'mongodb://localhost:27017/mern-portfolio') {
  mongoose
    .connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 3000 })
    .then(() => {
      clearTimeout(mongoTimeout);
      console.log("✓ MongoDB connected");
      app.listen(PORT, () => {
        console.log(`✓ Server running on port ${PORT}`);
      });
    })
    .catch((err) => {
      clearTimeout(mongoTimeout);
      console.error("✗ MongoDB connection error:", err.message);
      console.log("⚠️  Starting server in demo mode (no database)...");
      startServer();
    });
} else {
  // No valid MongoDB URI - start in demo mode
  setTimeout(() => {
    clearTimeout(mongoTimeout);
    console.log("⚠️  MongoDB not configured. Starting in demo mode...");
    startServer();
  }, 500);
}

function startServer() {
  app.listen(PORT, () => {
    console.log(`✓ Server running on port ${PORT}`);
    console.log("⚠️  Running in demo mode - add MONGO_URI to .env for persistence");
  });
}
