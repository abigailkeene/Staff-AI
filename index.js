
import express from "express";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { askAI } from "./ai/askAI.js";

dotenv.config();

const app = express();
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

// Document download route
app.get("/download/:file", (req, res) => {
  const fileMap = {
    "remote-work-timesheet": "Remote_Work_Timesheet.pdf",
    "pto-request-form": "PTO_Request_Form.pdf",
    "expense-reimbursement": "Expense_Reimbursement_Form.pdf"
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

app.listen(port, () => {
  console.log(`🚀 Staff AI API running on port ${port}`);
});
