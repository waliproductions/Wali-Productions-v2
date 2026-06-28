# Architecture — Wali Productions v2

Technical reference for the codebase structure, conventions, and key decisions.

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

## Directory Map

```
src/
├── app/                      Next.js App Router pages
│   ├── (portal)/             Route group — future client portal (isolated)
│   ├── admin/                Admin portal (protected by middleware)
│   ├── api/contact/          Contact form API route
│   ├── login/                Admin login page
│   └── [public pages]/       about, services, government, portfolio, contact
├── components/
│   ├── ui/                   Shared primitives (Section, PageHero, GradientCTA,
│   │                         NarrativeBlock, Button)
│   ├── home/                 Homepage section components
│   ├── services/             Services page components
│   ├── government/           Government page components
│   ├── portfolio/            Portfolio page components
│   ├── about/                About page components
│   ├── contact/              Contact page components
│   ├── admin/                Admin UI component library
│   └── layout/               Navbar, Footer
├── config/                   All content and site data
│   ├── site.ts               Nav, routes, base URL
│   ├── home.ts               Homepage content
│   ├── services.ts           Services content + ServiceCard type
│   ├── portfolio.ts          Portfolio content + PortfolioProject type
│   ├── government.ts         Government page content (public)
│   ├── government-center.ts  Extended gov data for admin portal
│   ├── about.ts              About page content
│   └── contact.ts            Contact page content
├── lib/
│   ├── auth/                 Session helpers + server actions
│   │   ├── session.ts        iron-session config + getSession()
│   │   └── actions.ts        loginAction + logoutAction
│   ├── admin/                Admin utilities (cn, truncate, formatDate, types)
│   └── seo.ts                buildMetadata, buildOrganizationJsonLd, OG_IMAGE
├── types/
│   └── index.ts              Shared utility types (Cta, CodeEntry, etc.)
└── proxy.ts                  (legacy — removed; see middleware.ts)

middleware.ts                 Admin route protection (/admin/:path*)
next.config.mjs               Security headers + image optimization
```

---

## Design System

### Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--gov-slate` / `#0D1B2A` | Deep navy | Dark section base |
| `#1E3A5F` | Slate blue | Gradient mid + nav hover |
| `#2B4C7E` | Slate | Gradient end |
| `--steel` / `#4A7DB5` | Steel blue | Accent bars, links, glow |
| `--gold` / `#B8831A` | Warm gold | Eyebrow labels (brand identity only) |
| `#94A3B8` | Cool grey | Subhead text on dark |
| `#F8FAFC` | Off-white | Muted section backgrounds |
| `#F0F4F8` | Light blue-grey | Icon containers |

### Dark Section Pattern

All gradient dark sections (heroes, CTAs) use this consistent pattern:

```tsx
// Background gradient
<div className="absolute inset-0 bg-gradient-to-br from-[#0D1B2A] via-[#1E3A5F] to-[#2B4C7E]" />
// Dot texture
<div className="absolute inset-0" style={{ backgroundImage: DOT_BG }} />
// Steel glow orb
<div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#4A7DB5] opacity-10 blur-3xl" />
```

The `DOT_BG` constant is the inline SVG data URI for the 40×40 dot pattern.

### Typography

- Display: `Space Grotesk` → `--font-display` → `font-display`
- Body: `Inter` → `--font-sans` → `font-sans`

---

## Content Architecture

**All page copy lives in `src/config/*.ts` — never in components.**

Components receive data from config files and render it. No component should hardcode business copy. This enables a single file to serve as the source of truth for content changes.

### Adding or changing copy

1. Edit the relevant `src/config/*.ts` file
2. TypeScript will surface any shape mismatches
3. The component renders the change automatically

### Pending content placeholders

Config files use a `pending()` helper for unverified data:

```ts
const pending = (note: string, source: string) =>
  `[ pending verified detail: ${note} — source: ${source} ]`;
```

Admin components detect these with:

```ts
value.toLowerCase().includes("pending verified detail")
```

---

## Authentication

| Mechanism | Detail |
|-----------|--------|
| Route protection | `middleware.ts` — matches `/admin/:path*` |
| Session store | iron-session sealed cookie (`__admin_session`, 7-day TTL) |
| Login | Server Action (`loginAction`) + `useActionState` on client |
| Logout | Server Action (`logoutAction`) via HTML form |
| Password hashing | bcryptjs v3 (pure JS — no native bindings) |
| Secret | `SESSION_SECRET` env var ≥ 32 chars |

---

## SEO

- **JSON-LD**: Organization schema injected in root `<head>` via `buildOrganizationJsonLd()`
- **Metadata**: `buildMetadata()` in `src/lib/seo.ts` provides consistent OG/Twitter cards
- **Robots**: `/admin`, `/login`, `/api/` disallowed; public routes allowed
- **Sitemap**: Per-route priorities (`/` = 1.0, `/services` = 0.9, etc.)

---

## Security Headers

Applied globally via `next.config.mjs`:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()`
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`

---

## Component Conventions

### Shared UI Primitives (`src/components/ui/`)

| Component | Purpose |
|-----------|---------|
| `Section` | Page section wrapper with consistent vertical rhythm |
| `SectionEyebrow` | Small uppercase label above headings |
| `PageHero` | Gradient hero for all inner pages |
| `GradientCTA` | Full-width gradient call-to-action section |
| `NarrativeBlock` | Two-column editorial text section |
| `Button` | Link/button primitive with variant support |

Page-specific components (e.g. `ServicesHero`, `GovernmentCallToAction`) are thin
wrappers that pull from config and delegate rendering to these primitives.

### Route Groups

- `(portal)/` — Client portal. Isolated layout, `robots: noindex`. No auth yet.
- `admin/` — Admin portal. Protected by `middleware.ts`.

---

## Environment Variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Prod only | Canonical URL for SEO (sitemap, OpenGraph, JSON-LD) |
| `SESSION_SECRET` | Yes | iron-session encryption key (≥ 32 chars) |
| `ADMIN_USERNAME` | Yes | Admin login username |
| `ADMIN_PASSWORD_HASH` | Yes | bcryptjs hash of admin password |
| `SMTP_HOST` | Yes | Email delivery host |
| `SMTP_PORT` | Yes | Email delivery port |
| `SMTP_USER` | Yes | SMTP username |
| `SMTP_PASS` | Yes | SMTP password |
| `CONTACT_EMAIL_TO` | Yes | Destination email for contact form |
| `CONTACT_EMAIL_FROM` | Yes | Sender address for contact form |

Generate `SESSION_SECRET`: `openssl rand -base64 32`

Generate `ADMIN_PASSWORD_HASH`: `node -e "const b=require('bcryptjs');b.hash('yourpassword',12).then(console.log)"`
