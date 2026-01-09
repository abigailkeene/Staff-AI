# Staff-AI

Staff-AI is a Node.js application that provides an AI-powered internal assistant for Retina Associates staff.

It is designed to serve as a secure, policy-grounded clinical and operational knowledge system that answers questions using internal documentation such as employee policies, procedures, SOPs, clinical workflows, prescribing systems, imaging platforms, inventory systems, and administrative processes.

The system ensures staff receive accurate, consistent, and compliant answers based only on approved internal documents.

---

## Features

- AI-powered internal staff assistant
- Answers grounded only in internal documentation
- Supports:
  - Employee handbook policies
  - PTO, holidays, attendance, and contacts
  - Clinical SOPs (screening, injections, laser, trials, drug handling)
  - Internal FAQs
  - athenaOne operational guidance
  - RetinaOS training and imaging workflows
  - Optos imaging, diagnostics, and customer portal support
  - SIS inventory upload and management
  - Rcopia prescribing workflows and SPM training
  - DrFirst pharmacy message management
  - DrFirst prescriber agent administration
  - DrFirst EPCS onboarding, identity proofing, and compliance
  - Provider onboarding and credentialing
  - Customer portal, device support, and training systems

- Enforces compliance rules and internal-only knowledge
- Secure API key handling via environment variables
- Modular Node.js architecture

---

## Tech Stack

- Node.js
- JavaScript
- Azure OpenAI API
- dotenv for environment variables

---

## Architecture

- `/knowledge` — Internal policy, SOP, clinical, and operational documentation (txt files)
- `/prompts` — System behavior and compliance rules
- `askAI.js` — Core AI orchestration layer
- `.env` — Secure API configuration

---

## Security & Compliance

- AI responses are restricted to internal documentation
- No external or speculative information is permitted
- Designed for internal clinical, administrative, and operational use only
- Supports DEA, EPCS, and prescribing compliance workflows
