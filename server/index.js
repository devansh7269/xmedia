// index.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import postRoutes from "./routes/postRoutes.js";

dotenv.config();

const app = express();

// ✅ Allow both local and Netlify frontend
app.use(
  cors({
    origin: [
      "http://localhost:5173",       // Local dev
      "https://xmedia7.netlify.app", // Your Netlify frontend
    ],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());

// ✅ MongoDB connection (optional for now since you're using in-memory posts)
const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/dashboardDB";

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// ✅ Base route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ✅ Posts API
app.use("/api/posts", postRoutes);

// ✅ Start server
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
