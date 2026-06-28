# Developer Onboarding — Wali Productions Platform

Welcome to the Wali Productions LLC platform codebase. This guide helps you
get oriented, set up your development environment, and understand the key
architectural decisions before writing your first line of code.

Read this alongside `ARCHITECTURE.md` and `docs/04-Engineering/CODING_STANDARDS.md`.

---

## Company Context

Wali Productions LLC is a professional technology consulting company and government
contractor. The platform you're working on is the operating backbone of the business —
not just a marketing site. It handles:

- Internal operations and project management
- Government contracting workflows
- Client relationship management
- Business development and proposal tracking
- Enterprise document management

Every decision you make should support long-term growth, reliability, and the
company's credibility with enterprise and government clients.

---

## Quick Start

### Prerequisites

- Node.js 20+ (check: `node --version`)
- npm 10+ (check: `npm --version`)
- Git configured with your name and email

### Setup

```bash
# Clone the repository
git clone <repo-url>
cd Wali-Productions-v2-dev

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Edit .env.local — fill in all required variables (see below)
# Then start the dev server
npm run dev
```

Open `http://localhost:3000` for the public site.
Open `http://localhost:3000/admin` to test the admin portal (requires login).

### Required environment variables

Fill in `.env.local` before starting the server:

```env
ADMIN_USERNAME=your_username
ADMIN_PASSWORD_HASH=<bcryptjs hash — see .env.example for generation command>
SESSION_SECRET=<32+ char random string — see .env.example for generation command>
SMTP_HOST=smtp.your-provider.com
SMTP_PORT=587
SMTP_USER=your@email.com
SMTP_PASS=your_smtp_password
SMTP_FROM=Wali Productions <noreply@waliproductions.com>
CONTACT_RECIPIENT=waliproductionsllc@gmail.com
```

The app will throw a descriptive error on startup if required variables are missing.

---

## Repository Layout

```
src/
├── app/                    # Next.js App Router — all routes
│   ├── (public)/           # Public-facing pages (home, about, etc.)
│   ├── admin/              # Admin portal — protected by middleware
│   ├── portal/             # Client portal — scaffolded, not yet authenticated
│   ├── api/                # API routes (currently: /api/contact)
│   └── login/              # Authentication pages
├── components/
│   ├── admin/              # Admin UI component library (dark theme)
│   ├── portal/             # Client portal components
│   └── ui/                 # Public/shared UI components
├── config/                 # All marketing and page content (config-driven)
├── lib/
│   ├── admin/              # Admin utilities, types, contact management
│   ├── auth/               # Authentication: session config, server actions
│   ├── contact/            # Contact form schema, logging, email dispatch
│   └── services/           # Service layer: interfaces for all business domains
└── types/                  # Business domain TypeScript types
docs/                       # All documentation by category
public/                     # Static assets
ARCHITECTURE.md             # Technical architecture overview
CLAUDE.md                   # AI collaboration instructions
```

---

## Key Architectural Concepts

### 1. Server Components by Default

All React components are Server Components unless they use browser APIs or React
state. Only add `"use client"` when required (event handlers, hooks, browser APIs).

```tsx
// Default — server component, no directive needed
export default function AdminCard({ title }) { ... }

// Client component — only when needed
"use client";
export function SearchForm() { ... }
```

### 2. Config-Driven Content

All public-facing copy lives in `src/config/*.ts`. Never hardcode marketing
content in page components.

```tsx
// Correct
import { homeContent } from "@/config/home";
return <h1>{homeContent.hero.headline}</h1>;

// Wrong — never hardcode copy in components
return <h1>Wali Productions — Technology That Serves</h1>;
```

### 3. Type-First Development

All business data shapes live in `src/types/`. Service interfaces live in
`src/lib/services/`. These are defined before implementation — they describe
the contract that implementations must satisfy.

### 4. ServiceResult Pattern

All service methods return `ServiceResult<T>`:

```typescript
type ServiceResult<T> = { ok: true; data: T } | { ok: false; error: string; code?: string };
```

Never throw exceptions across service boundaries. Use `ok()` and `err()` helpers:

```typescript
return ok(myData);       // success
return err("Not found", "NOT_FOUND");  // failure
```

### 5. Admin Component Library

The admin portal uses a shared dark-theme component library in `src/components/admin/`.
Never reinvent the wheel — check this library first:

| Component | Use for |
|-----------|---------|
| `AdminCard` | Content sections |
| `AdminStatCard` | KPI metric tiles |
| `AdminPageHeader` | Page titles with action buttons |
| `AdminTable` | Data tables |
| `AdminBadge` | Status indicators |
| `AdminButton` | Actions and navigation |
| `AdminEmptyState` | Zero-data states |
| `AdminWidget` | Dashboard metric widgets |

### 6. Route Protection

Admin routes are protected by `src/middleware.ts`. If you add a new `/admin/*` route,
it is automatically protected — no additional code needed.

Public routes are never behind authentication. The middleware matcher covers
only `/admin/:path*`.

---

## Development Commands

```bash
npm run dev          # Start development server (http://localhost:3000)
npm run build        # Production build — must pass before any push to main
npm run typecheck    # TypeScript type check — must pass with zero errors
npm run lint         # ESLint — must pass before push
```

**Minimum bar before pushing:**
```bash
npm run typecheck && npm run build
```

---

## Commit Standards

This project uses Conventional Commits:

```
feat(scope): short present-tense description
fix(scope): description of what was broken and fixed
refactor(scope): description of what changed
docs(scope): what documentation was added or updated
chore(scope): dependency updates, tooling, no user-facing change
```

**Scope examples:** `admin`, `platform`, `auth`, `contact`, `crm`, `contracts`, `docs`

**Never include** in commit messages or source files:
- AI attribution ("Generated with Claude", "Co-Authored-By: Claude")
- References to the current task or issue number
- Explanatory comments that describe what the code does (the code should speak)

---

## Security Rules

Read `docs/04-Engineering/SECURITY_ARCHITECTURE.md` and
`docs/04-Engineering/SECURITY_ASSUMPTIONS.md` before touching auth, session,
or any code that handles user data.

Core rules for every developer:
1. Never store passwords in plaintext anywhere.
2. Never commit environment variables or secrets to source control.
3. Validate all user input at the system boundary (`/api/*`, Server Actions).
4. Never render `pending verified detail` strings to the public site.
5. Check `src/types/roles.ts` before adding any admin-visible functionality.

---

## Data Isolation Rules

The platform has strict boundaries between data domains. Read
`docs/04-Engineering/SYSTEM_BOUNDARIES.md` for the full rules.

Quick reference:
- `/admin/government` — public-facing gov content only. Never internal ops data.
- `/admin/contracts` — pre-award contracting workspace only.
- `/admin/contract-records` — post-award performance management.
- `/admin/crm` — business development. No client delivery data.
- `/admin/projects` — delivery execution. No contract terms or financial records.
- `/portal/*` — client-facing only. Never admin-only data.

---

## Adding a New Admin Section

1. Create `src/app/admin/your-section/page.tsx`.
2. Use `AdminPageHeader`, `AdminCard`, `AdminStatCard`, `AdminEmptyState` from
   the admin component library.
3. Add navigation in `src/components/admin/AdminSidebar.tsx` — add to the
   appropriate `ADMIN_NAV_SECTIONS` group.
4. If you need a new icon, add it alongside the existing icon definitions in `AdminSidebar.tsx`.
5. Run `npm run typecheck && npm run build` to verify.

---

## Adding a New Type

1. Create `src/types/your-domain.ts` with JSDoc comment explaining the domain.
2. Export all types from `src/types/index.ts`.
3. If the domain needs a service interface, create `src/lib/services/your-domain.service.ts`.
4. Use `ServiceResult<T>` for all service method return types.
5. Import types only from `@/types` (the barrel export) in application code.

---

## Getting Help

- `ARCHITECTURE.md` — technical architecture and data models
- `docs/04-Engineering/CODING_STANDARDS.md` — code style and conventions
- `docs/04-Engineering/SYSTEM_BOUNDARIES.md` — data ownership and section boundaries
- `docs/04-Engineering/SECURITY_ARCHITECTURE.md` — authentication and security design
- `docs/04-Engineering/TESTING_STRATEGY.md` — testing approach and quality gates
- `docs/06-Operations/DEPLOYMENT_STANDARDS.md` — deployment process and environment config
