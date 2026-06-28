#!/usr/bin/env node
"use strict";

/**
 * Seed script — populates app-data with initial business records.
 * Run: node scripts/seed-data.cjs
 * Safe to re-run: skips collections that already have data.
 */

const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");

const DATA_ROOT = path.join(process.cwd(), "app-data");
const SEQ_DIR = path.join(DATA_ROOT, "sequence");
const SEQ_FILE = path.join(SEQ_DIR, "counters.json");

const NOW = new Date().toISOString();

function makeId(prefix, n) {
  return `${prefix}-${String(n).padStart(6, "0")}`;
}

function base(id) {
  return {
    id,
    createdAt: NOW,
    updatedAt: NOW,
    createdBy: "seed",
    updatedBy: "seed",
    version: 1,
    archived: false,
    deleted: false,
  };
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function writeJson(filePath, data) {
  const dir = path.dirname(filePath);
  await ensureDir(dir);
  const tmp = `${filePath}.${crypto.randomBytes(4).toString("hex")}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(data, null, 2), "utf8");
  await fs.rename(tmp, filePath);
}

async function collectionHasData(collection) {
  const dir = path.join(DATA_ROOT, collection);
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    return entries.some((e) => e.isFile() && e.name.endsWith(".json"));
  } catch {
    return false;
  }
}

async function seedCollection(collection, records) {
  if (await collectionHasData(collection)) {
    console.log(`  ↳ skipped ${collection} (already has data)`);
    return;
  }
  const dir = path.join(DATA_ROOT, collection);
  await ensureDir(dir);
  for (const record of records) {
    await writeJson(path.join(dir, `${record.id}.json`), record);
  }
  console.log(`  ✓ seeded ${records.length} record(s) → ${collection}`);
}

// ─── Organizations ────────────────────────────────────────────────────────────

const organizations = [
  {
    ...base(makeId("ORG", 1)),
    name: "Defense Innovation Unit",
    legalName: "Defense Innovation Unit",
    status: "prospect",
    sector: "defense",
    size: "large",
    website: "https://www.diu.mil",
    hqCity: "Mountain View",
    hqState: "CA",
    hqCountry: "US",
    description: "DoD unit accelerating adoption of commercial technology for national security.",
    internalNotes: "Excellent fit for AI and software development capabilities. Active solicitations on beta.SAM.gov.",
    tags: ["dod", "ai", "high-priority"],
    relationshipScore: 45,
    lastActivityAt: NOW,
  },
  {
    ...base(makeId("ORG", 2)),
    name: "Department of Veterans Affairs",
    legalName: "U.S. Department of Veterans Affairs",
    status: "prospect",
    sector: "federal-government",
    size: "large",
    website: "https://www.va.gov",
    hqCity: "Washington",
    hqState: "DC",
    hqCountry: "US",
    description: "Federal agency serving veterans with healthcare, benefits, and services.",
    internalNotes: "SDVOSB set-asides available. IT modernization is a major initiative.",
    tags: ["va", "sdvosb", "it-modernization"],
    relationshipScore: 30,
    lastActivityAt: NOW,
  },
  {
    ...base(makeId("ORG", 3)),
    name: "Nexus Media Group",
    legalName: "Nexus Media Group LLC",
    status: "qualified",
    sector: "media",
    size: "mid-market",
    hqCity: "Atlanta",
    hqState: "GA",
    hqCountry: "US",
    description: "Regional media production company seeking digital transformation.",
    internalNotes: "Warm intro from network contact. Need full website rebuild + streaming infrastructure.",
    tags: ["media", "streaming", "website"],
    relationshipScore: 70,
    lastActivityAt: NOW,
  },
  {
    ...base(makeId("ORG", 4)),
    name: "Covenant Community Church",
    legalName: "Covenant Community Church Inc.",
    status: "active-client",
    sector: "nonprofit",
    size: "small",
    hqCity: "Nashville",
    hqState: "TN",
    hqCountry: "US",
    description: "Growing faith community requiring digital presence and audio/media support.",
    internalNotes: "Long-term relationship. Website and audio production retainer.",
    tags: ["nonprofit", "faith", "audio", "retainer"],
    relationshipScore: 90,
    clientId: undefined,
    lastActivityAt: NOW,
  },
  {
    ...base(makeId("ORG", 5)),
    name: "TechForce Solutions",
    legalName: "TechForce Solutions Inc.",
    status: "partner",
    sector: "technology",
    size: "small",
    hqCity: "Dallas",
    hqState: "TX",
    hqCountry: "US",
    description: "IT staffing and solutions partner for teaming on federal contracts.",
    internalNotes: "Potential teaming partner on DoD opportunities. Has TS/SCI cleared staff.",
    tags: ["teaming", "cleared", "staffing"],
    relationshipScore: 65,
    lastActivityAt: NOW,
  },
];

// ─── Contacts ─────────────────────────────────────────────────────────────────

const contacts = [
  {
    ...base(makeId("CNT", 1)),
    organizationId: makeId("ORG", 1),
    firstName: "Marcus",
    lastName: "Webb",
    title: "Director of Commercial Technology",
    email: "m.webb@diu.mil",
    role: "contracting-officer",
    decisionAuthority: true,
    isPrimary: true,
    notes: "Met at AFCEA symposium. Interested in AI-assisted workflow tools.",
    lastContactedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    ...base(makeId("CNT", 2)),
    organizationId: makeId("ORG", 3),
    firstName: "Angela",
    lastName: "Torres",
    title: "Chief Executive Officer",
    email: "angela@nexusmediagroup.com",
    phone: "404-555-0192",
    role: "executive",
    decisionAuthority: true,
    isPrimary: true,
    notes: "Primary decision maker. Wants to modernize all digital operations.",
    lastContactedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    ...base(makeId("CNT", 3)),
    organizationId: makeId("ORG", 4),
    firstName: "Pastor David",
    lastName: "Freeman",
    title: "Senior Pastor",
    email: "pastor@covenantcc.org",
    phone: "615-555-0147",
    role: "decision-maker",
    decisionAuthority: true,
    isPrimary: true,
    notes: "Primary contact and champion. Has full authority on technology decisions.",
    lastContactedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    ...base(makeId("CNT", 4)),
    organizationId: makeId("ORG", 5),
    firstName: "Jordan",
    lastName: "Lee",
    title: "Business Development Director",
    email: "jlee@techforcesolutions.com",
    role: "champion",
    decisionAuthority: false,
    isPrimary: true,
    notes: "Teaming contact. Has introduced us to two federal procurement officers.",
    lastContactedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// ─── Meetings ─────────────────────────────────────────────────────────────────

const meetings = [
  {
    ...base(makeId("MTG", 1)),
    title: "Nexus Media — Discovery Call",
    type: "discovery",
    status: "completed",
    organizationId: makeId("ORG", 3),
    contactIds: [makeId("CNT", 2)],
    scheduledAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    durationMinutes: 60,
    location: "Zoom",
    notes: "Discussed full digital transformation: website, streaming platform, social media management. Budget range $25k–$50k.",
    actionItems: ["Send capability statement", "Draft preliminary proposal", "Follow up with streaming platform demo"],
    followUpDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
  },
  {
    ...base(makeId("MTG", 2)),
    title: "Covenant Church — Monthly Check-in",
    type: "check-in",
    status: "completed",
    organizationId: makeId("ORG", 4),
    contactIds: [makeId("CNT", 3)],
    scheduledAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    durationMinutes: 30,
    notes: "Website performing well. Discussed adding online giving integration. Audio equipment upgrade planned for Q3.",
    actionItems: ["Research online giving integrations", "Quote audio equipment package"],
  },
  {
    ...base(makeId("MTG", 3)),
    title: "TechForce — Teaming Alignment",
    type: "networking",
    status: "scheduled",
    organizationId: makeId("ORG", 5),
    contactIds: [makeId("CNT", 4)],
    scheduledAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    durationMinutes: 45,
    videoUrl: "https://zoom.us/j/example",
    agenda: "Review joint teaming agreement. Discuss VA IT modernization RFP due next month.",
  },
];

// ─── Opportunities ────────────────────────────────────────────────────────────

const opportunities = [
  {
    ...base(makeId("OPP", 1)),
    title: "DIU Commercial Technology Accelerator — AI Workflow Tools",
    agency: "Defense Innovation Unit",
    track: "government-federal",
    stage: "qualified",
    status: "pursuing",
    organizationId: makeId("ORG", 1),
    contactIds: [makeId("CNT", 1)],
    naicsCode: "541511",
    estimatedValue: 250000,
    currency: "USD",
    winProbability: 35,
    responseDeadline: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    description: "SBIR-like solicitation for AI-powered workflow automation in defense operations.",
    notes: "SDVOSB set-aside. Strong fit for our AI capabilities. Need to finalize capability statement and past performance.",
    tags: ["ai", "dod", "sdvosb"],
  },
  {
    ...base(makeId("OPP", 2)),
    title: "Nexus Media Group — Digital Transformation Engagement",
    agency: "",
    track: "commercial",
    stage: "proposal",
    status: "pursuing",
    organizationId: makeId("ORG", 3),
    contactIds: [makeId("CNT", 2)],
    estimatedValue: 38500,
    currency: "USD",
    winProbability: 75,
    expectedCloseDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    description: "Full digital transformation: website redesign, streaming platform, social media management.",
    notes: "Strong discovery session. Angela is ready to move forward pending proposal review.",
    tags: ["media", "website", "streaming"],
  },
  {
    ...base(makeId("OPP", 3)),
    title: "VA IT Modernization — Veteran Portal Enhancement",
    agency: "Department of Veterans Affairs",
    track: "government-federal",
    stage: "lead",
    status: "tracking",
    organizationId: makeId("ORG", 2),
    estimatedValue: 500000,
    currency: "USD",
    winProbability: 15,
    responseDeadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    solicitationNumber: "VA-2026-IT-0047",
    description: "VA seeking vendors to modernize the veteran-facing portal. Multiple task areas.",
    notes: "Pre-RFP phase. Attending industry day next month. Need SAM.gov registration first.",
    tags: ["va", "portal", "it-modernization"],
  },
  {
    ...base(makeId("OPP", 4)),
    title: "Covenant Church — Audio Equipment Upgrade Package",
    agency: "",
    track: "commercial",
    stage: "lead",
    status: "identified",
    organizationId: makeId("ORG", 4),
    contactIds: [makeId("CNT", 3)],
    estimatedValue: 8000,
    currency: "USD",
    winProbability: 85,
    expectedCloseDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    description: "Audio system upgrade for main sanctuary. Mixers, mics, monitors, and installation.",
    notes: "Active client — near certain close. Pricing research underway.",
    tags: ["audio", "church", "existing-client"],
  },
];

// ─── Projects ─────────────────────────────────────────────────────────────────

const projects = [
  {
    ...base(makeId("PROJ", 1)),
    title: "Covenant Community Church — Website & Audio Support",
    description: "Ongoing retainer engagement covering website maintenance, content updates, and audio production support.",
    status: "active",
    health: "on-track",
    servicesPerformed: ["Website Design", "Audio Engineering", "Content Management"],
    technologies: ["Next.js", "Tailwind CSS"],
    startDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    targetDate: new Date(Date.now() + 275 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    estimatedBudget: 12000,
    actualSpend: 3200,
    currency: "USD",
    milestones: [
      {
        id: "MLS-001",
        title: "Website launch",
        status: "completed",
        completedDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
        paymentPercentage: 50,
      },
      {
        id: "MLS-002",
        title: "Q3 audio upgrade",
        status: "pending",
        dueDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
        paymentPercentage: 25,
      },
    ],
    risks: [],
    govPerformanceEligible: false,
    tags: ["retainer", "active"],
  },
  {
    ...base(makeId("PROJ", 2)),
    title: "Wali Productions — Enterprise Platform v2 (Internal)",
    description: "Internal development of the enterprise admin platform, public website, and government contracting workspace.",
    status: "active",
    health: "on-track",
    servicesPerformed: ["Software Development", "Systems Administration"],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "iron-session", "bcryptjs"],
    startDate: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    milestones: [
      {
        id: "MLS-003",
        title: "v1.0 — Production launch",
        status: "completed",
        completedDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
      },
      {
        id: "MLS-004",
        title: "v1.1 — Enterprise platform",
        status: "in-progress",
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
      },
    ],
    risks: [
      {
        id: "RSK-001",
        title: "No database — file-based storage constraints",
        probability: "medium",
        impact: "medium",
        status: "open",
        mitigationPlan: "Repository pattern abstracts storage. Postgres migration is a single implementation swap.",
        identifiedAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ],
    govPerformanceEligible: false,
    tags: ["internal", "platform"],
  },
];

// ─── Knowledge entries ────────────────────────────────────────────────────────

const knowledge = [
  {
    ...base(makeId("DOC", 1)),
    title: "Client Onboarding SOP",
    category: "sop",
    status: "approved",
    description: "Standard process for onboarding new commercial and government clients.",
    ownerRole: "Founder",
    reviewCycleMonths: 6,
    lastReviewedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    nextReviewAt: new Date(Date.now() + 150 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    tags: ["onboarding", "client", "operations"],
    versions: [{ version: "1.0", summary: "Initial approved version", createdAt: NOW }],
  },
  {
    ...base(makeId("DOC", 2)),
    title: "Government Contracting Readiness Policy",
    category: "policy",
    status: "approved",
    description: "Policy governing how Wali Productions pursues and manages federal contracts.",
    ownerRole: "Founder",
    reviewCycleMonths: 12,
    lastReviewedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    nextReviewAt: new Date(Date.now() + 355 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    tags: ["government", "policy", "contracting"],
    versions: [{ version: "1.0", summary: "Initial version", createdAt: NOW }],
  },
  {
    ...base(makeId("DOC", 3)),
    title: "Project Delivery Standard",
    category: "standard",
    status: "draft",
    description: "Defines quality gates, milestone criteria, and delivery standards for all engagements.",
    ownerRole: "Founder",
    reviewCycleMonths: 6,
    tags: ["delivery", "quality", "standards"],
    versions: [],
  },
  {
    ...base(makeId("DOC", 4)),
    title: "Proposal Template — Commercial",
    category: "template",
    status: "approved",
    description: "Standard commercial proposal template with pricing, scope, and terms sections.",
    ownerRole: "Founder",
    reviewCycleMonths: 12,
    lastReviewedAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    nextReviewAt: new Date(Date.now() + 305 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    tags: ["proposal", "template", "commercial"],
    versions: [{ version: "1.0", summary: "Initial version", createdAt: NOW }],
  },
];

// ─── Counters ─────────────────────────────────────────────────────────────────

const counters = {
  organization: organizations.length,
  contact: contacts.length,
  meeting: meetings.length,
  opportunity: opportunities.length,
  proposal: 0,
  contract: 0,
  project: projects.length,
  knowledge: knowledge.length,
  notification: 0,
  pastPerformance: 0,
  teamingPartner: 0,
  attachment: 0,
  task: 0,
};

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log("\nSeeding Wali Productions enterprise data...\n");

  await seedCollection("crm/organizations", organizations);
  await seedCollection("crm/contacts", contacts);
  await seedCollection("crm/meetings", meetings);
  await seedCollection("opportunities", opportunities);
  await seedCollection("projects", projects);
  await seedCollection("knowledge", knowledge);

  // Write counters
  await ensureDir(SEQ_DIR);
  const existing = await fs.readFile(SEQ_FILE, "utf8").then(JSON.parse).catch(() => ({}));
  const merged = { ...existing };
  for (const [k, v] of Object.entries(counters)) {
    merged[k] = Math.max(merged[k] ?? 0, v);
  }
  await writeJson(SEQ_FILE, merged);
  console.log("  ✓ counters updated");

  console.log("\nSeed complete.\n");
}

main().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
