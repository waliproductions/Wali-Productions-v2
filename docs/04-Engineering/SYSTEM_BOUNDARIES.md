# System Boundaries — Wali Productions v2

Defines the boundaries between platform sections, data ownership rules, and
what each part of the system is and is not responsible for.

Read alongside ARCHITECTURE.md and CODING_STANDARDS.md.

---

## Section Boundaries

### Public Site (`/`, `/about`, `/services`, `/government`, `/portfolio`, `/contact`)

**Purpose:** Marketing and lead generation.

**Owns:** Content rendered to unauthenticated visitors. SEO metadata, JSON-LD,
sitemap, robots.txt.

**Does not own:** Admin data, client records, proposal content, internal metrics.
Any public-facing claim must originate from `src/config/*.ts`.

**Key rule:** Never render `pending verified detail` strings to the public. All
pending values must stay inside the admin portal or be replaced before going live.

---

### Client Portal (`/portal/*`)

**Purpose:** Authenticated client-facing interface for project visibility, file
exchange, and communication.

**Owns:** Client-specific project data, proposal views, file exchange, invoices,
messaging, and support tickets — scoped to the authenticated client's account.

**Does not own:** Admin-only data, other clients' data, internal business metrics,
or government contracting workspace content.

**Key rule:** Portal is isolated via the `(portal)` route group. All portal routes
are `noindex`. Authentication enforcement will extend `middleware.ts` to cover
`/portal/*` when portal auth is implemented.

**Current state:** Scaffolded shell — nav and module pages exist but are not yet
data-connected or authenticated.

---

### Admin Portal — CRM (`/admin/crm/*`)

**Purpose:** Business-development relationship management — prospects, clients, pipeline.

**Owns:** `Organization` records (BD view), `CrmContact` records, `Meeting` records,
`CommunicationRecord` history, `SalesPipelineEntry` stages, and `CrmActivity` feed.

**Does not own:** Client delivery records (that is `Client` in types/client.ts),
project execution (that is `/admin/projects`), or contracted work tracking
(that is `/admin/contract-records`).

**Key linkage rule:** An `Organization` gains a `clientId` only when a proposal is
accepted or a contract is awarded. Before award, `clientId` is absent — the relationship
is a prospect, not a client.

**Sub-sections:**

| Route | Purpose |
|-------|---------|
| `/admin/crm/organizations` | Prospect and client organization registry |
| `/admin/crm/contacts` | Individual contact records with role typing |
| `/admin/crm/pipeline` | 7-stage sales pipeline with value tracking |
| `/admin/crm/meetings` | Meeting log with 8 meeting types |

---

### Admin Portal — Operations (`/admin/operations/*`)

**Purpose:** Internal operational hub for commercial work management.

**Owns:** Tasks, commercial proposal pipeline, client CRM (legacy — CRM moving to `/admin/crm`), and business metrics.

**Does not own:** Government contracting details (proposals with NAICS/PSC/set-aside),
knowledge base authoring, public page content.

**Boundary with Contracts:** The proposals page at `/admin/operations/proposals`
tracks commercial proposals. Government-specific proposals live at
`/admin/contracts/proposals`. They share `src/types/proposal.ts` but live in
separate sections with separate contexts.

---

### Admin Portal — Government Contracts (`/admin/contracts/*`)

**Purpose:** Internal workspace for government contracting operations.

**Owns:** Opportunity tracking, government-specific proposals, past performance
records (pending authorization), certification status, compliance obligations,
and teaming partner relationships.

**Does not own:** Public marketing copy for the `/government` page (that is
`/admin/government`). Client CRM (that is `/admin/operations/clients`).

**Safety rules:**
- `PastPerformanceRecord.authorized` must be `true` before a record is referenced
  in any proposal or public document.
- No UEI, CAGE, NAICS, PSC, or contract numbers are to be invented. Use the
  `pending()` pattern until official values are issued.
- SDVOSB / VOSB claims are not to be made publicly until certifications are issued.

**Separation from `/admin/government`:**

| `/admin/government` | `/admin/contracts` |
|--------------------|--------------------|
| Manages content of the public `/government` page | Internal contracting ops — never public |
| Capability statement, registration display, NAICS/PSC viewer | Opportunity pipeline, gov proposals, past perf, certs |
| Sources from `src/config/government.ts` | Sources from `src/types/opportunity.ts` etc. |
| Existed since v0.2 | Added in v0.7 |

---

### Admin Portal — Government (`/admin/government/*`)

**Purpose:** Admin view of public government marketing content. Manages what
visitors see on `/government`.

**Owns:** Capability statement preview, registration status display, NAICS/PSC
code viewer, competency browser, past performance display (public-safe only),
government source document browser.

**Does not own:** Active contracting operations, live opportunity tracking,
proposal development — those belong to `/admin/contracts`.

---

### Admin Portal — Projects (`/admin/projects/*`)

**Purpose:** Project delivery management — active execution, risks, deliverables, lessons.

**Owns:** `Project` records (delivery view), `Risk[]`, `ProjectIssue[]`, `ChangeRequest[]`,
`WBSNode[]`, `CustomerApproval[]`, `Deliverable[]` (project-level), and `LessonsLearnedRecord[]`.

**Does not own:** Contract terms and financial records (that is `/admin/contract-records`),
pre-award proposal content (that is `/admin/contracts`), or business-development pipeline
(that is `/admin/crm`).

**Key linkages:**
- `Project.contractId` → links to a `Contract` in contract-records when work is under a formal contract
- `Project.proposalId` → links back to the accepted proposal that created this project
- `Project.govPerformanceEligible` → flags for future past-performance citation

**Sub-sections:**

| Route | Purpose |
|-------|---------|
| `/admin/projects/active` | Full project register by status |
| `/admin/projects/deliverables` | Cross-project deliverable tracker |
| `/admin/projects/risks` | Risk register + issue log with impact matrix |
| `/admin/projects/lessons` | Lessons learned library by category |

---

### Admin Portal — Contract Records (`/admin/contract-records/*`)

**Purpose:** Post-award contract performance management.

**Owns:** `Contract` records, `TaskOrder[]`, `ContractDeliverable[]`,
`InvoiceRecord[]`, `ContractModification[]`, and `PerformanceReport[]`.

**Does not own:** Pre-award contracting operations (that is `/admin/contracts`),
project delivery execution (that is `/admin/projects`), or business-development
pipeline (that is `/admin/crm`).

**Key distinction — pre-award vs. post-award:**

| `/admin/contracts` (pre-award) | `/admin/contract-records` (post-award) |
|-------------------------------|----------------------------------------|
| Opportunity tracking, capture | Active contract performance |
| Proposal development | Task order and delivery management |
| Certifications, teaming | Invoice and payment tracking |
| Compliance planning | Modifications and option years |

**Sub-sections:**

| Route | Purpose |
|-------|---------|
| `/admin/contract-records/active` | Active contract register by type and status |
| `/admin/contract-records/task-orders` | IDIQ task order management |
| `/admin/contract-records/deliverables` | CDRL and deliverable tracking |
| `/admin/contract-records/invoices` | Invoice lifecycle management |

---

### Admin Portal — Knowledge Base (`/admin/knowledge/*`)

**Purpose:** Institutional memory — SOPs, policies, standards, and templates.

**Owns:** Knowledge entries, their lifecycle (draft → review → approved), version
history, and review schedules.

**Does not own:** Project delivery execution (that is Operations), government
compliance tracking (that is Contracts), or public content.

**Source of truth for:**
- How Wali Productions executes work (SOPs)
- What Wali Productions requires internally and from clients (Policies)
- How Wali Productions builds software (Standards → `docs/04-Engineering/`)
- Starting points for proposals and client communications (Templates)

---

## Data Ownership Rules

### Types vs. Config

| Source | Owns |
|--------|------|
| `src/types/*.ts` | Cross-cutting business domain shapes |
| `src/config/*.ts` | All page copy and marketing content |
| `src/lib/admin/types.ts` | Admin UI component shapes |

Never put marketing copy in type files. Never put business domain shapes in config.

### Client Data

- Client information is never published without explicit client authorization.
- `Client.internalNotes` is never rendered to the client portal.
- Government client fields (UEI, CAGE, NAICS) are only shown inside the admin portal.

### Government Identifiers

No UEI, CAGE code, NAICS code, PSC code, solicitation number, or certification
reference number is invented or displayed as fact until officially issued.
Use the `pending()` pattern everywhere:

```ts
const pending = (note: string, source: string) =>
  `[ pending verified detail: ${note} — source: ${source} ]`;
```

Detection: `value.toLowerCase().includes("pending verified detail")`

---

## Permission Boundaries

Defined in `src/types/roles.ts`. These are type definitions — enforcement is not
yet wired to the auth layer. When RBAC is implemented, these types define the
intended access control model.

| Role | Primary scope |
|------|--------------|
| `founder` | Full access everywhere |
| `admin` | Full access except system settings:write |
| `operations` | Clients, projects, proposals, analytics |
| `contracts` | Gov contracting, proposals, analytics |
| `knowledge` | Knowledge base read/write |
| `viewer` | Admin read + analytics read |

---

## What Lives Where — Decision Guide

| Content type | Goes in |
|-------------|---------|
| Marketing copy, page headings, feature lists | `src/config/*.ts` |
| Business domain data shapes | `src/types/*.ts` |
| Reusable UI with no business logic | `src/components/ui/` |
| Admin UI components (dark theme) | `src/components/admin/` |
| Portal UI components | `src/components/portal/` |
| Page-specific display logic | `src/components/<page>/` |
| Government public page admin | `/admin/government/*` |
| Government contracting operations (pre-award) | `/admin/contracts/*` |
| Post-award contract performance | `/admin/contract-records/*` |
| Business-development relationships | `/admin/crm/*` |
| Commercial proposals and tasks | `/admin/operations/*` |
| Project delivery and risks | `/admin/projects/*` |
| Institutional knowledge and playbooks | `/admin/knowledge/*` |
| Business intelligence and reporting | `/admin/reports/*` |
| Client-visible project data | `/portal/*` |
