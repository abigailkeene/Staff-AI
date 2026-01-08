import fetch from "node-fetch";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const endpoint = process.env.AZURE_OPENAI_ENDPOINT.trim();
const apiKey = process.env.AZURE_OPENAI_API_KEY;
const deployment = process.env.AZURE_OPENAI_DEPLOYMENT_NAME;
const apiVersion = process.env.AZURE_OPENAI_API_VERSION;

console.log("DEBUG endpoint:", endpoint);
console.log("DEBUG deployment:", deployment);
console.log("DEBUG apiVersion:", apiVersion);

// Load system prompt
const systemPrompt = fs.readFileSync("./prompts/systemPrompt.txt", "utf8");

// Load handbook knowledge
const attendancePolicy = fs.readFileSync("./knowledge/attendance.txt", "utf8");
const bereavementPolicy = fs.readFileSync("./knowledge/bereavement-leave.txt", "utf8");
const contactsInfo = fs.readFileSync("./knowledge/contacts.txt", "utf8");
const dressCodePolicy = fs.readFileSync("./knowledge/dress-code.txt", "utf8");
const holidaysPolicy = fs.readFileSync("./knowledge/holidays.txt", "utf8");
const hoursPolicy = fs.readFileSync("./knowledge/hours-of-operation.txt", "utf8");
const juryDutyPolicy = fs.readFileSync("./knowledge/jury-duty.txt", "utf8");
const militaryLeavePolicy = fs.readFileSync("./knowledge/military-leave.txt", "utf8");
const ptoPolicy = fs.readFileSync("./knowledge/pto.txt", "utf8");

// Load athenaOne guide knowledge
const athenaOneGuide = fs.readFileSync("./knowledge/athenaOne-homepage.txt", "utf8");

export async function askAI(question) {
  const url = `${endpoint}openai/deployments/${deployment}/chat/completions?api-version=${apiVersion}`;

  const handbookContent =
    "EMPLOYEE HANDBOOK AND INTERNAL GUIDANCE:\n\n" +
    "ATTENDANCE POLICY:\n" + attendancePolicy + "\n\n" +
    "BEREAVEMENT LEAVE POLICY:\n" + bereavementPolicy + "\n\n" +
    "CONTACTS:\n" + contactsInfo + "\n\n" +
    "DRESS CODE POLICY:\n" + dressCodePolicy + "\n\n" +
    "HOLIDAYS POLICY:\n" + holidaysPolicy + "\n\n" +
    "HOURS OF OPERATION:\n" + hoursPolicy + "\n\n" +
    "JURY DUTY POLICY:\n" + juryDutyPolicy + "\n\n" +
    "MILITARY LEAVE POLICY:\n" + militaryLeavePolicy + "\n\n" +
    "PTO POLICY:\n" + ptoPolicy + "\n\n" +

    "ATHENAONE HOME PAGE GUIDE:\n" + athenaOneGuide;

  const messages = [
    { role: "system", content: systemPrompt },
    { role: "system", content: handbookContent },
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
