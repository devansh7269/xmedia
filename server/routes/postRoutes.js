import express from "express";

const router = express.Router();

// In-memory posts (replace with MongoDB later)
let posts = [];

// Create a new post
router.post("/", (req, res) => {
    const { username, content } = req.body;
    if (!username || !content) {
        return res.status(400).json({ error: "Username and content required" });
    }
    const newPost = { id: Date.now(), username, content };
    posts.unshift(newPost); // Add at top
    res.json(newPost);
});

// Get all posts
router.get("/", (req, res) => {
    res.json(posts);
});

export default router;
