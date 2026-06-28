# Architecture — Wali Productions v2

Technical reference for the codebase structure, conventions, and key decisions.
Updated through v0.7.

---

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v3 + CSS custom properties |
| Auth | iron-session v8 (sealed cookies) + bcryptjs v3 |
| Email | Nodemailer |
| Runtime | Node.js ≥ 18.18 on Hostinger |
| Deploy | GitHub → Hostinger auto-deploy |

---

## Platform Vision

This project is evolving from a marketing site into a full business platform serving:

- **Commercial clients** — project tracking, proposals, file exchange, invoicing
- **Enterprise clients** — account management, multi-user access, reporting
- **Government agencies** — capability statements, past performance, compliance
- **State and local governments** — same as federal with different contracting mechanisms

Every architectural decision should support this trajectory. Prefer configuration over hardcoded values, shared types over one-off shapes, and composition over repetition.

---

## Directory Map

```
src/
├── app/                      Next.js App Router pages
│   ├── (portal)/             Route group — client portal (noindex, isolated layout)
│   │   └── portal/
│   │       ├── layout.tsx    PortalShell wrapper for all module pages
│   │       ├── page.tsx      Redirect → /portal/dashboard
│   │       ├── dashboard/    Overview, metrics, module nav
│   │       ├── projects/     Project milestones and deliverables
│   │       ├── proposals/    Proposal review and signature
│   │       ├── files/        Secure document exchange
│   │       ├── invoices/     Billing and payment history
│   │       ├── messages/     Team communication
│   │       └── support/      Ticket submission and tracking
│   ├── admin/                Admin portal (protected by middleware.ts)
│   │   ├── operations/       Operations hub: tasks, proposals, clients, reports
│   │   ├── contracts/        Gov contracting: opportunities, proposals, past perf, certs, teaming
│   │   ├── government/       Public government page admin + 7 sub-pages
│   │   └── knowledge/        Knowledge base: SOPs, policies, standards, templates
│   ├── api/contact/          Contact form API route
│   ├── login/                Admin login (iron-session)
│   └── [public pages]/       /, about, services, government, portfolio, contact
├── components/
│   ├── ui/                   Shared UI primitives
│   │   ├── Section.tsx       Page section with consistent vertical rhythm
│   │   ├── PageHero.tsx      Gradient hero for inner pages
│   │   ├── GradientCTA.tsx   Full-width gradient CTA section
│   │   ├── NarrativeBlock.tsx Two-column editorial text section
│   │   ├── Button.tsx        Link/button with variant support
│   │   ├── Card.tsx          Card/CardHeader/CardBody/CardFooter
│   │   ├── Badge.tsx         Status badges (7 variants, optional dot)
│   │   ├── Alert.tsx         info/success/warning/error alerts
│   │   ├── EmptyState.tsx    Empty state with icon, description, actions
│   │   ├── Skeleton.tsx      Loading placeholders
│   │   ├── MetricCard.tsx    KPI card with trend indicator
│   │   ├── Timeline.tsx      Timeline/milestone display with status states
│   │   ├── Callout.tsx       Contextual callout blocks (info/tip/warning/note)
│   │   ├── ProgressBar.tsx   Accessible progress bar with variant colors
│   │   └── forms/
│   │       ├── Field.tsx     Label + error wrapper
│   │       ├── Input.tsx     Styled <input>
│   │       ├── Textarea.tsx  Styled <textarea>
│   │       ├── Select.tsx    Styled <select> with options prop
│   │       └── FormFeedback.tsx  Error/success/info banner
│   ├── portal/               Client portal layout components
│   │   ├── PortalShell.tsx   Fixed sidebar + scrollable content
│   │   └── PortalSidebar.tsx Nav with active-link detection
│   ├── home/                 Homepage section components (re-export ui/ primitives)
│   ├── services/             Services page components
│   ├── government/           Government page components
│   ├── portfolio/            Portfolio page components
│   ├── about/                About page components
│   ├── contact/              Contact page + ConsultationForm
│   ├── admin/                Admin UI component library (dark theme)
│   └── layout/               Navbar, Footer
├── config/                   All content and site data (single source of truth)
│   ├── site.ts               Nav, routes, base URL, identity
│   ├── home.ts               Homepage copy
│   ├── services.ts           Services content + ServiceCard type
│   ├── portfolio.ts          Portfolio content + PortfolioProject type
│   ├── government.ts         Government page content (public)
│   ├── government-center.ts  Extended gov data for admin (capabilities, NAICS, PSC)
│   ├── about.ts              About page content
│   └── contact.ts            Contact page content + service options
├── lib/
│   ├── utils.ts              Shared cn() class-merger
│   ├── auth/
│   │   ├── session.ts        iron-session config + getSession()
│   │   └── actions.ts        loginAction + logoutAction (server actions)
│   ├── admin/                Admin utilities (cn, formatDate, truncate, types)
│   └── seo.ts                buildMetadata, buildOrganizationJsonLd, OG_IMAGE
└── types/
    ├── index.ts              Re-exports all types + utility types
    ├── client.ts             Client, ClientContact, ClientStatus, ClientType
    ├── project.ts            Project, Milestone, Deliverable, TeamMember
    ├── proposal.ts           Proposal, ProposalSection, ProposalMilestone
    ├── government.ts         NaicsCode, PscCode, Certification, ContractVehicle,
    │                         PastPerformanceRecord, CapabilityStatementSnapshot
    ├── roles.ts              UserRole, Permission, SystemPermissions, ROLE_PERMISSIONS
    ├── operations.ts         Task, Notification, BusinessMetric, PipelineEntry
    ├── opportunity.ts        GovOpportunity, Solicitation, TeamingPartner, AgencyContact
    └── knowledge.ts          KnowledgeEntry, SopEntry, PolicyRecord, DocumentRecord

middleware.ts                 Admin route protection (/admin/:path*)
next.config.mjs               Security headers + image optimization
tailwind.config.ts            Custom tokens (gold, steel, gov-slate, shadow-card)
```

---

## Business Data Models

All business types live in `src/types/`. Config-specific types (ServiceCard,
PortfolioProject, etc.) remain co-located with their config file.

### Client

Supports commercial, enterprise, and government clients. Government-specific
fields (UEI, CAGE) are present but only populated for government accounts.
`ClientContact` supports multiple contacts per account with role typing.

### Project

Tracks engagements from proposal through delivery. Supports milestones,
deliverables, team assignments, documents, and budget visibility.
`govPerformanceEligible` flags projects that can be cited as past performance.

### Proposal

Covers the full lifecycle from draft through acceptance. Supports revision
history, line items, milestone billing, and government-specific fields
(NAICS, PSC, set-aside category). `authorized` fields prevent accidental
publication of unverified data.

### Government

Types for the full contracting data lifecycle: `NaicsCode`, `PscCode`,
`Certification`, `ContractVehicle`, `PastPerformanceRecord`,
`TeamQualification`, and `CapabilityStatementSnapshot`.

**Safety rule:** `PastPerformanceRecord.authorized` must be explicitly `true`
before any record appears in a proposal or public document.

### Roles (v0.7)

`UserRole` defines 6 access tiers: `founder`, `admin`, `operations`, `contracts`,
`knowledge`, `viewer`. `ROLE_PERMISSIONS` maps each role to its allowed `Permission`
set. These are type definitions only — no auth enforcement is wired yet.

### Operations (v0.7)

`Task` covers the full work-item lifecycle with priority, status, and category.
`Notification` handles in-app and email alert records. `BusinessMetric` captures
KPIs with trend data. `PipelineEntry` tracks commercial proposal pipeline stages.

### Opportunity (v0.7)

`GovOpportunity` tracks contracting opportunities from identification through award.
`Solicitation` captures RFP/RFQ details and amendments. `TeamingPartner` manages
subcontractor and prime relationships. `AgencyContact` tracks government POCs.

### Knowledge (v0.7)

`KnowledgeEntry` is the base type for all knowledge base entries. `SopEntry`
extends it with step-by-step procedures and role assignments. `PolicyRecord` adds
enforcement level and effective dates. `DocumentRecord` handles file-based documents
with versioning and retention rules.

---

## Admin Portal Sections

The admin portal uses grouped sidebar navigation organized by functional domain.
All sections share the dark-theme admin UI component library (`src/components/admin/`).

| Section | Route | Purpose |
|---------|-------|---------|
| Dashboard | `/admin` | Platform overview and quick metrics |
| Operations | `/admin/operations` | Tasks, proposals pipeline, clients CRM, reports |
| Gov Contracts | `/admin/contracts` | Internal contracting workspace (opportunities, proposals, past perf, certs, teaming) |
| Portfolio | `/admin/portfolio` | Portfolio entry management |
| Government | `/admin/government` | Public `/government` page admin + capability center |
| Knowledge Base | `/admin/knowledge` | SOPs, policies, standards, templates |
| Analytics | `/admin/analytics` | Traffic and engagement metrics |
| Contact Inquiries | `/admin/contact` | Incoming form submissions |
| Audit Log | `/admin/audit` | Admin action history |
| Settings | `/admin/settings` | System configuration |

**Key distinction — Government vs. Contracts:**
`/admin/government` manages public-facing marketing content (the `/government` page).
`/admin/contracts` is an internal workspace for actual contracting operations and is
never exposed publicly. They share `src/types/government.ts` types but serve completely
different purposes.

---

## Design System

### Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--gov-slate` / `#0D1B2A` | Deep navy | Dark section base, headings |
| `#1E3A5F` | Slate blue | Gradient mid, hover states |
| `#2B4C7E` | Slate | Gradient end |
| `--steel` / `#4A7DB5` | Steel blue | Accent bars, links, icons, glow |
| `--gold` / `#B8831A` | Warm gold | Eyebrow labels (identity only) |
| `#94A3B8` | Cool grey | Subhead text on dark sections |
| `#F8FAFC` | Off-white | Muted section backgrounds |
| `#F0F4F8` | Light blue-grey | Icon containers, badge backgrounds |

### Dark Section Pattern

All gradient dark sections (heroes, CTAs) use:

```tsx
<div className="absolute inset-0 bg-gradient-to-br from-[#0D1B2A] via-[#1E3A5F] to-[#2B4C7E]" />
<div className="absolute inset-0" style={{ backgroundImage: DOT_BG }} />
<div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#4A7DB5] opacity-10 blur-3xl" />
```

`DOT_BG` is the inline SVG data URI for the 40×40 dot texture.

### Typography

- Display: `Space Grotesk` → `--font-display` → `font-display`
- Body: `Inter` → `--font-sans` → `font-sans`

### Tailwind Tokens

```ts
boxShadow: {
  card:       "0 1px 4px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
  card-hover: "0 4px 16px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)",
}
maxWidth: { content: "72rem" }
```

---

## Content Architecture

**All page copy lives in `src/config/*.ts` — never in components.**

Components receive data from config files and render it. This enables a single
file to serve as the source of truth for content changes.

### Pending content pattern

```ts
const pending = (note: string, source: string) =>
  `[ pending verified detail: ${note} — source: ${source} ]`;
```

Admin components detect pending values with:
```ts
value.toLowerCase().includes("pending verified detail")
```

---

## Authentication

| Mechanism | Detail |
|-----------|--------|
| Route protection | `middleware.ts` — matches `/admin/:path*` |
| Session store | iron-session sealed cookie (`__admin_session`, 7-day TTL) |
| Login | Server Action (`loginAction`) + `useActionState` |
| Logout | Server Action (`logoutAction`) via HTML form |
| Password hashing | bcryptjs v3 (pure JS — no native bindings) |
| Secret | `SESSION_SECRET` env var ≥ 32 chars |

---

## Route Groups

### `admin/` — Internal admin portal (dark theme)
Protected by `middleware.ts`. Server components only (except `AdminShell`,
`LoginForm`). Uses `src/components/admin/` component library.

### `(portal)/` — Client portal (light theme, noindex)
Not yet authenticated. Isolated from admin and public layout. Uses
`src/components/portal/` and `src/components/ui/` primitives. Future auth
will be implemented via middleware extending the current `admin/:path*` matcher.

### Public routes
`/`, `/about`, `/services`, `/government`, `/portfolio`, `/contact`

---

## SEO

- **JSON-LD**: Organization schema in root `<head>` via `buildOrganizationJsonLd()`
- **Metadata**: `buildMetadata()` handles OG/Twitter cards per page
- **Robots**: `/admin`, `/login`, `/api/` disallowed; portal noindex via metadata
- **Sitemap**: Per-route priorities (home=1.0, services/gov=0.9, contact=0.85, etc.)

---

## Security

Headers applied globally in `next.config.mjs`:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()`
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`

---

## Component Conventions

### Shared UI Primitives (`src/components/ui/`)

These are the public/portal side component library. Use these instead of
writing one-off inline styles.

**Layout:** `Section`, `SectionEyebrow`, `PageHero`, `GradientCTA`, `NarrativeBlock`

**Content:** `Card` (+ `CardHeader`, `CardBody`, `CardFooter`), `MetricCard`, `EmptyState`, `Skeleton` (+ `SkeletonCard`, `SkeletonRows`)

**Feedback:** `Alert`, `Badge`, `FormFeedback`

**Interactive:** `Button`, `forms/Field`, `forms/Input`, `forms/Textarea`, `forms/Select`

### Admin UI Library (`src/components/admin/`)

Dark-themed components for the admin portal only.
`AdminCard`, `AdminTable`, `AdminBadge`, `AdminButton`, `AdminEmptyState`, `AdminPageHeader`

### Page-specific components

Components under `home/`, `services/`, `government/`, etc. are thin wrappers
that pull data from config and delegate rendering to `ui/` primitives.

---

## Environment Variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Prod only | Canonical URL for SEO |
| `SESSION_SECRET` | Yes | iron-session encryption key (≥ 32 chars) |
| `ADMIN_USERNAME` | Yes | Admin login username |
| `ADMIN_PASSWORD_HASH` | Yes | bcryptjs hash of admin password |
| `SMTP_HOST` | Yes | Email delivery host |
| `SMTP_PORT` | Yes | Email delivery port |
| `SMTP_USER` | Yes | SMTP username |
| `SMTP_PASS` | Yes | SMTP password |
| `CONTACT_EMAIL_TO` | Yes | Destination for contact form |
| `CONTACT_EMAIL_FROM` | Yes | Sender address for contact form |

Generate `SESSION_SECRET`:
```bash
openssl rand -base64 32
```

Generate `ADMIN_PASSWORD_HASH`:
```bash
node -e "const b=require('bcryptjs');b.hash('yourpassword',12).then(console.log)"
```

---

## Extension Points

### Adding a portal module

1. Create `src/app/(portal)/portal/<module>/page.tsx`
2. Add a nav entry to `src/components/portal/PortalSidebar.tsx` `NAV_ITEMS`
3. Use `Card`, `EmptyState`, `MetricCard`, and `Badge` from `src/components/ui/`
4. Export metadata with `title: "<Module Name>"`

### Adding a service or portfolio entry

Edit `src/config/services.ts` or `src/config/portfolio.ts`. All optional
fields on `ServiceCard` and `PortfolioProject` are safe to omit.

### Adding a public page

1. Create `src/app/<route>/page.tsx`
2. Export metadata via `buildMetadata()` from `src/lib/seo.ts`
3. Add the route to `siteConfig.routes` in `src/config/site.ts`
4. Add to `NAV_ITEMS` in `siteConfig.nav` if it should appear in the header
