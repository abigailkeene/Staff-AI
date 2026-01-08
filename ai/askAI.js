import fetch from "node-fetch";
import fs from "fs";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const endpoint = process.env.AZURE_OPENAI_ENDPOINT.trim();
const apiKey = process.env.AZURE_OPENAI_API_KEY;
const deployment = process.env.AZURE_OPENAI_DEPLOYMENT_NAME;
const apiVersion = process.env.AZURE_OPENAI_API_VERSION;

if (!apiKey) {
  throw new Error("Missing AZURE_OPENAI_API_KEY");
}

const systemPrompt = fs.readFileSync(path.join(__dirname, "../prompts/systemPrompt.txt"), "utf8");
const ptoPolicy = fs.readFileSync(path.join(__dirname, "../knowledge/pto.txt"), "utf8");
const attendancePolicy = fs.readFileSync(path.join(__dirname, "../knowledge/attendance.txt"), "utf8");
const holidaysPolicy = fs.readFileSync(path.join(__dirname, "../knowledge/holidays.txt"), "utf8");
const contactsInfo = fs.readFileSync(path.join(__dirname, "../knowledge/contacts.txt"), "utf8");

export async function askAI(question) {
  const url = `${endpoint}openai/deployments/${deployment}/chat/completions?api-version=${apiVersion}`;

  const messages = [
    { role: "system", content: systemPrompt },
    {
      role: "system",
      content:
        "EMPLOYEE HANDBOOK AND INTERNAL GUIDANCE:\n\n" +
        ptoPolicy + "\n\n" +
        attendancePolicy + "\n\n" +
        holidaysPolicy + "\n\n" +
        contactsInfo
    },
    { role: "user", content: question }
  ];

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": apiKey
    },
    body: JSON.stringify({
      messages,
      temperature: 0.2
    })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Azure OpenAI error: ${JSON.stringify(data)}`);
  }

  return data.choices[0].message.content;
}
