import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { askAI } from "./ai/askAI.js";

dotenv.config();

const app = express();

// Enable CORS for GitHub Pages frontend
app.use(cors({
  origin: "https://abigailkeene.github.io"
}));

app.use(express.json());

app.get("/health", (req, res) => {
  res.send("SERVER IS ALIVE");
});

app.post("/ask", async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: "Question is required" });
  }

  console.log("📩 Question received:", question);

  try {
    const answer = await askAI(question);
    res.json({ answer });
  } catch (error) {
    console.error("❌ AI error:", error.message);
    res.status(500).json({ error: "Internal AI error" });
  }
});

const port = process.env.PORT || 5050;
app.listen(port, () => {
  console.log(`🚀 Staff AI API running on port ${port}`);
});
