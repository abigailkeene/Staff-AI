import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import fs from "fs";
import { askAI } from "./ai/askAI.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors()); // <-- REQUIRED for frontend access
app.use(express.json());

// Health check
app.get("/health", (req, res) => {
  res.send("SERVER IS ALIVE");
});

// AI endpoint
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

// Document download route
app.get("/download/:file", (req, res) => {
  const fileMap = {
    "remote-work-timesheet": "Remote_Time_Log_2.pdf"
  };

  const fileKey = req.params.file;
  const filename = fileMap[fileKey];

  if (!filename) {
    return res.status(404).send("File not found");
  }

  const filePath = path.join(process.cwd(), "documents", filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).send("File missing on server");
  }

  res.download(filePath);
});

// Start server
const port = process.env.PORT || 5050;
app.listen(port, () => {
  console.log(`🚀 Staff AI API running on port ${port}`);
});
