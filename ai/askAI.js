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
const coreValuesPolicy = fs.readFileSync("./knowledge/core-values-and-employment.txt", "utf8");
const conductPolicy = fs.readFileSync("./knowledge/workplace-conduct-and-confidentiality.txt", "utf8");
const compensationPolicy = fs.readFileSync("./knowledge/compensation-and-benefits.txt", "utf8");
const leavePolicy = fs.readFileSync("./knowledge/additional-leave-policies.txt", "utf8");
const operationsPolicy = fs.readFileSync("./knowledge/workplace-operations-and-discipline.txt", "utf8");
const safetyPolicy = fs.readFileSync("./knowledge/workplace-safety-and-drug-policy.txt", "utf8");

// athenaOne guide
const athenaOneGuide = fs.readFileSync("./knowledge/athenaOne-homepage.txt", "utf8");

// Internal FAQ
const internalFAQ = fs.readFileSync("./knowledge/internal-faq.txt", "utf8");

// Drug inventory SOP
const drugItemTransfer = fs.readFileSync("./knowledge/drug-item-transfer.txt", "utf8");

// Endophthalmitis Injection SOP
const endophthalmitisSOP = fs.readFileSync("./knowledge/sop-endophthalmitis-injections.txt", "utf8");

// Debug verification
console.log("Loaded drug SOP length:", drugItemTransfer.length);
console.log("Loaded endophthalmitis SOP length:", endophthalmitisSOP.length);

export async function askAI(question) {
  const url = `${endpoint}openai/deployments/${deployment}/chat/completions?api-version=${apiVersion}`;

  const handbookContent =
    "INTERNAL DOCUMENTATION:\n\n" +

    attendancePolicy + "\n\n" +
    bereavementPolicy + "\n\n" +
    contactsInfo + "\n\n" +
    dressCodePolicy + "\n\n" +
    holidaysPolicy + "\n\n" +
    hoursPolicy + "\n\n" +
    juryDutyPolicy + "\n\n" +
    militaryLeavePolicy + "\n\n" +
    ptoPolicy + "\n\n" +

    coreValuesPolicy + "\n\n" +
    conductPolicy + "\n\n" +
    compensationPolicy + "\n\n" +
    leavePolicy + "\n\n" +
    operationsPolicy + "\n\n" +
    safetyPolicy + "\n\n" +

    "ATHENAONE GUIDE:\n" +
    athenaOneGuide + "\n\n" +

    "INTERNAL FAQ:\n" +
    internalFAQ + "\n\n" +

    "DRUG ITEM TRANSFER SOP:\n" +
    drugItemTransfer + "\n\n" +

    "ENDOPHTHALMITIS INJECTION SOP:\n" +
    endophthalmitisSOP;

  console.log("Knowledge payload size:", handbookContent.length);

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
