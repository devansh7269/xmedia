import express from "express";
const router = express.Router();

// In-memory posts (temporary, will reset when server restarts)
let posts = [];

// Create a new post
router.post("/", (req, res) => {
  try {
    const { username, content } = req.body;
    if (!username || !content) {
      return res.status(400).json({ error: "Username and content required" });
    }

    const newPost = { id: Date.now(), username, content };
    posts.unshift(newPost); // add new post at top

    res.json(newPost);
  } catch (error) {
    console.error("❌ Error creating post:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Get all posts
router.get("/", (req, res) => {
  try {
    res.json(posts);
  } catch (error) {
    console.error("❌ Error fetching posts:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
