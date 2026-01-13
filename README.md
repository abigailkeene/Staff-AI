# Staff-AI

Staff-AI is a Node.js application that provides an AI-powered internal assistant for Retina Associates staff.

It is designed to serve as a secure, policy-grounded clinical and operational knowledge system that answers staff questions using approved internal documentation only, including employee policies, procedures, SOPs, clinical workflows, imaging systems, prescribing platforms, inventory systems, and administrative processes.

The system ensures staff receive accurate, consistent, and compliant answers based strictly on internal source documents.

---

## Features

- AI-powered internal staff assistant  
- Answers grounded only in internal documentation  
- Compliance-bound clinical and administrative knowledge engine  

Supports documentation for:

### Clinical & Imaging Systems
- Heidelberg Heyex imaging workflows  
- Optos Advance & OptosCloud imaging systems  
- RetinaOS training and workflows  
- OCT, laser, injection, and trial SOPs  
- Imaging QC and diagnostic review  

### EHR & Practice Management
- AthenaOne operational guidance  
- Nextech IntelleChart (MDI) workflows  
- AdvancedMD (legacy support)  

### Prescribing & Pharmacy
- DrFirst pharmacy message management  
- DrFirst prescriber agent administration  
- DrFirst EPCS onboarding and identity proofing  
- Rcopia prescribing workflows and SPM training  
- DEA & EPCS compliance documentation  

### Inventory & Supply Chain
- SIS inventory upload and management  
- McKesson RetinaOS inventory  
- Envi inventory platform  

### Administrative & Operations
- Employee handbook policies  
- PTO, holidays, attendance, dress code, and HR policies  
- Internal FAQs  
- Provider onboarding and credentialing  
- PX Technology prior authorization workflows  
- QGenda scheduling  
- Waystar revenue cycle workflows  

### IT & Infrastructure
- Retina Associates IT infrastructure documentation  
- Network, firewall, VPN, and device standards  
- Microsoft 365, Outlook, Teams, SharePoint  
- Microsoft Entra ID  
- Datto, Autotask, IT Glue  
- iMonnit temperature sensors  
- GoTo phone system  
- Citrix remote access  

### Internal Tools
- EyeHub internal documentation platform  
- EyeHubPA prior authorization tracking  
- Credentialing databases  
- Internal eligibility and insurance tools  

---

## Core Design Principles

- Internal documentation is the single source of truth  
- No external or speculative information is permitted  
- No medical advice outside approved SOPs  
- Role-based, HIPAA-aware access logic  
- Clinical-first operational design  
- Audit-friendly and compliance-ready  

---

## Tech Stack

- Node.js  
- JavaScript  
- Azure OpenAI API  
- dotenv for environment variables  

---

## Architecture

/knowledge → Internal policy, SOP, clinical, and operational documentation (TXT files)
/prompts → System behavior, formatting, and compliance rules
askAI.js → Core AI orchestration layer
.env → Secure API configuration

yaml
Copy code

---

## Security & Compliance

- AI responses are restricted to internal documentation only  
- No external, speculative, or public data sources  
- Designed for internal clinical, administrative, and operational use  
- Supports:
  - HIPAA compliance  
  - DEA prescribing requirements  
  - EPCS identity proofing  
  - Audit-ready documentation workflows  

---

## Purpose

Staff-AI exists to:

- Reduce training time  
- Improve documentation access  
- Standardize workflows  
- Reduce support burden  
- Improve clinic efficiency  
- Improve patient safety  
- Support compliance and audit readiness  

It functions as a real-time internal knowledge system for Retina Associates.

---

## Summary

Staff-AI is a clinical-first internal AI platform designed to support Retina Associates staff with accurate, secure, and compliant operational guidance using only approved internal documentation.
