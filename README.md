# Staff-AI

Staff-AI is a Node.js application that provides an AI-powered internal assistant for Retina Associates staff.

It is designed to serve as a secure, policy-grounded knowledge system that answers questions using internal documentation such as employee policies, procedures, SOPs, and clinical workflows.

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

- `/knowledge` — Internal policy and SOP documents (txt files)
- `/prompts` — System behavior and compliance rules
- `askAI.js` — Core AI orchestration layer
- `.env` — Secure API configuration

---

## Security & Compliance

- AI responses are restricted to internal documentation
- No external or speculative information is permitted
- Designed for internal clinical and administrative use only
