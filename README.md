# TenderPilot Enterprise Demo

A clickable frontend simulation of a private tender-intelligence and bid-management system for African companies.

This branch turns the original Shadcn dashboard starter into a sales demo that can be shown to construction, PPE, facilities-management, cleaning, security, engineering, logistics, and general-supply companies.

## What the demo shows

- Executive tender command centre
- Tender discovery across multiple African procurement sources
- AI opportunity matching and qualification scores
- Tender summaries, requirements, and missing-document detection
- Application preparation simulation
- Human approval before submission
- Bid pipeline and win-rate analytics
- Secure company document vault
- Compliance and document-expiry warnings
- Responsive light and dark interfaces

## Demo workflow

1. Open **Tender discovery**.
2. Filter opportunities by qualification status.
3. Open a tender to view its AI intelligence report.
4. Select **Prepare application with AI**.
5. Review the generated package and required actions.
6. Open **Applications** to see preparation, approval, submission, and award stages.
7. Open **Document vault** to review compliance readiness.

All displayed companies, tender notices, values, and outcomes are sample data for demonstration purposes.

## Business model represented

TenderPilot is designed here as a **private, one-time enterprise implementation**, not necessarily a public monthly SaaS product.

A client implementation can include:

- Custom branding and company profiles
- Selected countries and tender categories
- Official tender-source integrations
- Matching and eligibility rules
- Existing company documents and templates
- Internal approval roles
- Email, WhatsApp, or SMS notifications
- Deployment into infrastructure owned by the client
- Training, handover, and a limited defect-warranty period

Ongoing hosting, AI usage, messaging, portal changes, maintenance, and new features should be handled through client-owned accounts or separately priced support agreements.

## Technology

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- Recharts
- Lucide icons

## Run locally

```bash
npm install
npm run dev
```

Build the production bundle with:

```bash
npm run build
```

## Current scope

This version is a frontend sales prototype. It does not scrape procurement portals, store real customer documents, generate legally binding bids, or submit applications. Those capabilities require a secure backend, official integrations, client authorisation, audit logging, and country-specific implementation work.
