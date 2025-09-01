import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import postRoutes from "./routes/postRoutes.js";  // ✅ import at the top

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: "https://xmedia7.netlify.app",  // ✅ your Netlify frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));
app.use(express.json());

// MongoDB Connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/dashboardDB";

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB error:", err));

// Routes
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/posts", postRoutes);  // ✅ must come before app.listen

// Server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
