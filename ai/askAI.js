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

// SOPs
const drugItemTransfer = fs.readFileSync("./knowledge/drug-item-transfer.txt", "utf8");
const endophthalmitisSOP = fs.readFileSync("./knowledge/sop-endophthalmitis-injections.txt", "utf8");
const followUpScreeningSOP = fs.readFileSync("./knowledge/sop-follow-up-screening.txt", "utf8");
const injectionPreferencesSOP = fs.readFileSync("./knowledge/sop-injection-preferences-per-doctor.txt", "utf8");
const laserProcedureSOP = fs.readFileSync("./knowledge/sop-laser-procedure.txt", "utf8");
const lotusTrialSOP = fs.readFileSync("./knowledge/sop-lotus-trial.txt", "utf8");
const injectionScreeningSOP = fs.readFileSync("./knowledge/sop-injection-screening.txt", "utf8");
const octProcedureSOP = fs.readFileSync("./knowledge/sop-oct-procedure.txt", "utf8");
const ozurdexInjectionsSOP = fs.readFileSync("./knowledge/sop-ozurdex-injections.txt", "utf8");
const sterileBetadineSOP = fs.readFileSync("./knowledge/sop-sterile-betadine-preparation.txt", "utf8");
const postOpScreeningSOP = fs.readFileSync("./knowledge/sop-post-op-screening.txt", "utf8");
const sterileSubconjSOP = fs.readFileSync("./knowledge/sop-sterile-subconj-preparation.txt", "utf8");
const optosAdvanceEditMergeSOP = fs.readFileSync("./knowledge/sop-optos-advance-edit-and-merge.txt", "utf8");

// RetinaOS Training Guide
const retinaOSTrainingGuide = fs.readFileSync("./knowledge/retinaos-training-guide.txt", "utf8");

// SIS Inventory Upload Guide
const sisInventoryUploadGuide = fs.readFileSync("./knowledge/how-to-upload-new-items-sis.txt", "utf8");

// Rcopia Training Manual (NEW)
const rcopiaSPMTrainingManual = fs.readFileSync(
  "./knowledge/rcopia-4-spm-training-manual.txt",
  "utf8"
);

//DrFirst
const drfirstSyncGuide = fs.readFileSync("./knowledge/drfirst-download-sync-medications-to-icp.txt", "utf8");
const drfirstPrescriberAgentsGuide = fs.readFileSync("./knowledge/drfirst-managing-prescriber-agents.txt", "utf8");
const drfirstEpcsIdProofingGuide = fs.readFileSync("./knowledge/drfirst-epcs-provider-id-proofing-experian.txt", "utf8");
const providerPrepGuide = fs.readFileSync("./knowledge/provider-prep-10-22.txt", "utf8");
const drfirstEpcsAdminApproval = fs.readFileSync("./knowledge/drfirst-epcs-final-step-admin-approval-lac.txt", "utf8");
const drfirstPharmacyMessagesGuide = fs.readFileSync("./knowledge/drfirst-managing-pharmacy-messages.txt", "utf8");

//CustomerCentral Signup Support
const customerPortalSetupGuide = fs.readFileSync("./knowledge/customer-portal-setup-support.txt", "utf8");



// Debug verification
console.log("Loaded drug SOP length:", drugItemTransfer.length);
console.log("Loaded endophthalmitis SOP length:", endophthalmitisSOP.length);
console.log("Loaded follow-up SOP length:", followUpScreeningSOP.length);
console.log("Loaded injection preferences SOP length:", injectionPreferencesSOP.length);
console.log("Loaded injection screening SOP length:", injectionScreeningSOP.length);
console.log("Loaded laser SOP length:", laserProcedureSOP.length);
console.log("Loaded LOTUS Trial SOP length:", lotusTrialSOP.length);
console.log("Loaded OCT SOP length:", octProcedureSOP.length);
console.log("Loaded Ozurdex SOP length:", ozurdexInjectionsSOP.length);
console.log("Loaded Sterile Betadine SOP length:", sterileBetadineSOP.length);
console.log("Loaded Post-Op Screening SOP length:", postOpScreeningSOP.length);
console.log("Loaded Sterile Subconj SOP length:", sterileSubconjSOP.length);
console.log("Loaded Optos Advance Edit & Merge SOP length:", optosAdvanceEditMergeSOP.length);
console.log("Loaded RetinaOS Training Guide length:", retinaOSTrainingGuide.length);
console.log("Loaded SIS Inventory Upload Guide length:", sisInventoryUploadGuide.length);
console.log("Loaded Rcopia Training Manual length:", rcopiaSPMTrainingManual.length);


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
    endophthalmitisSOP + "\n\n" +

    "FOLLOW-UP SCREENING SOP:\n" +
    followUpScreeningSOP + "\n\n" +

    "INJECTION PREFERENCES SOP:\n" +
    injectionPreferencesSOP + "\n\n" +

    "LASER PROCEDURE SOP:\n" +
    laserProcedureSOP + "\n\n" +

    "INJECTION SCREENING SOP:\n" +
    injectionScreeningSOP + "\n\n" +

    "LOTUS TRIAL SOP:\n" +
    lotusTrialSOP + "\n\n" +

    "OCT PROCEDURE SOP:\n" +
    octProcedureSOP + "\n\n" +

    "OZURDEX INJECTIONS SOP:\n" +
    ozurdexInjectionsSOP + "\n\n" +

    "STERILE BETADINE PREPARATION SOP:\n" +
    sterileBetadineSOP + "\n\n" +

    "POST-OP SCREENING SOP:\n" +
    postOpScreeningSOP + "\n\n" +

    "STERILE SUBCONJUNCTIVAL INJECTION PREPARATION SOP:\n" +
    sterileSubconjSOP + "\n\n" +

    "OPTOS ADVANCE EDIT & MERGE PATIENTS SOP:\n" +
    optosAdvanceEditMergeSOP + "\n\n" +

    "RETINAOS TRAINING GUIDE:\n" +
    retinaOSTrainingGuide + "\n\n" +

    "SIS INVENTORY UPLOAD GUIDE:\n" +
    sisInventoryUploadGuide + "\n\n" +

    "RCOPIA 4 SPM TRAINING MANUAL:\n" +
    rcopiaSPMTrainingManual + "\n\n";

    "DRFIRST DOWNLOAD & SYNC MEDICATIONS GUIDE:\n" +
    drfirstSyncGuide + "\n\n" +

    "DRFIRST MANAGING PRESCRIBER AGENTS GUIDE:\n" +
    drfirstPrescriberAgentsGuide + "\n\n" +

    "PROVIDER PREP GO-LIVE GUIDE:\n" +
    providerPrepGuide + "\n\n" +

    "DRFIRST EPCS FINAL STEP ADMIN APPROVAL GUIDE:\n" +
    drfirstEpcsAdminApproval + "\n\n" +

    "DRFIRST PHARMACY MESSAGES GUIDE:\n" +
    drfirstPharmacyMessagesGuide + "\n\n" +

    "CUSTOMER PORTAL SETUP SUPPORT GUIDE:\n" +
    customerPortalSetupGuide + "\n\n" +



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
