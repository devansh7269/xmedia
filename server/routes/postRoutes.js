import express from "express";
import mongoose from "mongoose";

const router = express.Router();

// Define schema
const postSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

// Create model
const Post = mongoose.model("Post", postSchema);

// ✅ Create a new post
router.post("/", async (req, res) => {
  try {
    const { username, content } = req.body;

    if (!username || !content) {
      return res.status(400).json({ error: "Username and content required" });
    }

    const newPost = new Post({ username, content });
    await newPost.save();

    res.json(newPost);
  } catch (err) {
    console.error("❌ Error creating post:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }); // latest first
    res.json(posts);
  } catch (err) {
    console.error("❌ Error fetching posts:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
