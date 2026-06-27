# Batch 3 Implementation Manifest

## Scope

Production authentication and session management for the admin portal. All `/admin/*` routes are now protected by a `src/proxy.ts` proxy (Next.js 16 terminology for middleware). Login via a Server Action with bcryptjs password verification and iron-session sealed cookies. Logout via a Server Action. No API routes added. No public pages modified.

---

## Files

### New Files

| File | Purpose |
|------|---------|
| `src/lib/auth/session.ts` | `SessionData` interface (`username?`, `role?`, `isLoggedIn?`), `getSessionOptions()` (cookie config, SESSION_SECRET validation), `getSession()` helper (wraps `getIronSession` + `cookies()`), exported `SESSION_COOKIE_NAME`. |
| `src/lib/auth/actions.ts` | `"use server"`. `loginAction` — timing-safe username check, bcryptjs.compare, session.save, redirect. Constant-timing dummy hash for missing-config path. `logoutAction` — session.destroy, redirect to `/login`. |
| `src/lib/auth/permissions.ts` | `isAuthenticated()`, `hasRole()`, `requireAdmin()` — structured for future RBAC. `requireAdmin()` checks `isLoggedIn && username && role === "admin"`. |
| `src/proxy.ts` | Next.js 16 proxy (replaces deprecated `middleware.ts` convention). Matches `/admin/:path*`. Uses `unsealData` (iron-session read-only) to verify session cookie. Missing/invalid session → redirect to `/login?from=<path>`. No bcrypt, no business logic. |
| `src/app/login/layout.tsx` | Minimal layout override to prevent public Navbar/Footer from rendering on the login page. |
| `src/app/login/page.tsx` | Server component. Redirects authenticated users to `/admin`. Passes `from` param to `LoginForm`. |
| `src/app/login/LoginForm.tsx` | `"use client"`. `useActionState(loginAction, null)`. Username + password fields, error display, loading state, accessible labels. Amber-themed design consistent with admin portal. |

### Modified Files

| File | Change |
|------|--------|
| `src/app/admin/layout.tsx` | Made `async`. Calls `getSession()` → passes `username` prop to `AdminShell`. Wrapped in try/catch to gracefully handle missing SESSION_SECRET during development. |
| `src/components/admin/AdminShell.tsx` | Added `username?: string` prop, passed through to `AdminHeader`. |
| `src/components/admin/AdminHeader.tsx` | Added `username?: string` prop. Displays "Signed in as `<username>`" when present. Added `<form action={logoutAction}>` Sign out button. |
| `src/app/admin/settings/page.tsx` | Replaced `ADMIN_PASSWORD` with `ADMIN_PASSWORD_HASH` + `SESSION_SECRET` in the Authentication card. Updated auth-configured check to require all three: `ADMIN_USERNAME`, `ADMIN_PASSWORD_HASH`, `SESSION_SECRET`. Updated card description and status message. |
| `.env.example` | Added `ADMIN_USERNAME`, `ADMIN_PASSWORD_HASH` (with bcrypt hash generation note), `SESSION_SECRET` (with `openssl rand -base64 32` note). |
| `package.json` | Added `iron-session@^8.0.4`, `bcryptjs@^3.0.3` to `dependencies`; `@types/bcryptjs@^2.4.6` to `devDependencies`. |
| `MANIFEST.md` | This section. |
| `VERIFY.md` | Batch 3 checklist. |

### Removed Files

| File | Reason |
|------|--------|
| `src/proxy.ts` (old) | Dead code — HTTP Basic Auth implementation that was never activated. Referenced deprecated `ADMIN_PASSWORD` env var. Replaced by the new `src/proxy.ts` with correct iron-session implementation. |

---

## Security Properties

- Passwords stored as bcryptjs hashes only (`ADMIN_PASSWORD_HASH`). No plaintext passwords in env vars.
- Session sealed with AES-GCM + HMAC via iron-session (Iron protocol). `SESSION_SECRET` min 32 chars enforced.
- Proxy reads session with `unsealData` (read-only, no `CookieStore` write access needed in proxy).
- Login action always runs `bcryptjs.compare()` regardless of username match — prevents timing attacks.
- Missing-config code path also runs a full bcryptjs dummy comparison to maintain consistent timing.
- Failed logins return generic "Invalid username or password." — no username/password enumeration.
- Session cookie: HttpOnly, Secure (production), SameSite=Lax, Path=/, 7-day TTL.
- `from` redirect parameter validated: must start with `/admin`, must not start with `//`.
- Credentials never exposed to client components (prop threading: server layout → AdminShell → AdminHeader).

## Next.js 16 Proxy Note

Next.js 16 renamed the middleware convention from `middleware.ts` → `proxy.ts` with function export name `proxy` (not `middleware`). The proxy matcher config (`export const config = { matcher: [...] }`) is unchanged.

---

# Batch 2 Implementation Manifest

## Scope

Government Operations Center expansion. All Batch 2 pages are read-only operational views. No public pages modified. No contact pipeline modified. No authentication changed. `src/config/government.ts` not modified.

---

## Files

### New Files

| File | Purpose |
|------|---------|
| `src/config/government-center.ts` | New config for Batch 2. Defines `CapabilityDomain`, `CapabilitySkill`, `PastPerformanceCategory`, `GovDocument`, and `GovernmentCenterContent` types. Provides the capability inventory (8 current domains, 10 future domains) sourced from `docs/01-Business/BUSINESS_CAPABILITIES.md`, past performance categories from `docs/02-Government/PAST_PERFORMANCE.md`, and the document registry for the document browser. Does not modify or re-export anything from `government.ts`. |
| `src/app/admin/government/capability-statement/page.tsx` | Read-only preview of the capability statement, core competencies, and differentiators from `governmentContent`. Includes a registration status summary and source reference card. |
| `src/app/admin/government/registration/page.tsx` | Registration tracker. AdminTable showing all registration items with pending/confirmed status badges. Includes update guidance card with links to policy documents. |
| `src/app/admin/government/naics/page.tsx` | NAICS code viewer. Shows AdminEmptyState (no confirmed codes) with policy card and link to NAICS_CODES.md. |
| `src/app/admin/government/psc/page.tsx` | PSC code viewer. Shows AdminEmptyState (no confirmed codes) with policy card and link to government contracting document. |
| `src/app/admin/government/capabilities/page.tsx` | Technical capability browser. Shows the 6 public competencies cross-referenced with the full 8-domain capability inventory from `government-center.ts`. Includes future capabilities section. |
| `src/app/admin/government/past-performance/page.tsx` | Past performance viewer. Shows AdminEmptyState (all entries pending), performance categories from `government-center.ts`, and policy card. |
| `src/app/admin/government/documents/page.tsx` | Government document browser. Server-reads `docs/02-Government/*.md` with `node:fs`. URL param `?doc=<id>` selects the active document. Rendered as preformatted text. `dynamic = "force-dynamic"`. |

### Modified

| File | Change |
|------|--------|
| `src/app/admin/government/page.tsx` | Transformed into Government Operations Center hub. Retains stat cards, readiness narrative, and registration overview. Adds: Internal Readiness Estimate progress bar, 7 navigation stat cards linking to all sub-pages, quick action buttons on existing cards. Removes: inline competencies, differentiators, capability statement, and past performance grids (now on dedicated sub-pages). Imports `governmentCenterContent` for domain/document counts. |

### Reused Without Modification

| File | Used by |
|------|---------|
| `src/config/government.ts` | All Batch 2 pages — `governmentContent`, `RegistrationItem`, `Capability` types |
| `src/components/admin/AdminCard.tsx` + `AdminStatCard` | All Batch 2 pages |
| `src/components/admin/AdminTable.tsx` | Registration page |
| `src/components/admin/AdminButton.tsx` | All Batch 2 pages |
| `src/components/admin/AdminBadge.tsx` | Hub, capability statement, registration, past performance pages |
| `src/components/admin/AdminPageHeader.tsx` | All Batch 2 pages |
| `src/components/admin/AdminEmptyState.tsx` | NAICS, PSC, past performance, documents pages |
| `src/lib/admin/types.ts` | Registration page (`AdminTableColumn`) |

### Not Modified (Protected)

`src/config/government.ts`, contact pipeline, contact API route, SMTP logic, audit logging, CSV export, JSON download, runtime contact storage, existing analytics/portfolio/settings pages, `next.config.mjs`, `tsconfig.json`, `tailwind.config.ts`, `package.json`, `package-lock.json`, environment files.

---

## No New Dependencies

Zero new packages installed. All Batch 2 code uses only existing project dependencies, Node.js built-ins (`node:fs`, `node:path`), and the existing admin component library.


---


# Batch 1 Implementation Manifest

## Scope

Admin Portal expansion. No public pages redesigned. No contact pipeline modified. No authentication changed.

---

## Files

### Modified

| File | Change |
|------|--------|
| `src/config/portfolio.ts` | Added `PortfolioProjectStatus`, `PortfolioProject` types and `projects: PortfolioProject[]` field to `PortfolioContent`. Added initial entry for the Wali Productions LLC business website. All existing types and content untouched. |
| `src/app/admin/portfolio/page.tsx` | Replaced placeholder with real management interface: stat cards (published/draft/pending/featured counts), URL-based filter form (search, status, category), and AdminTable with per-project links to detail page. |
| `src/app/admin/analytics/page.tsx` | Replaced placeholder with real analytics derived from `getContactDashboardSubmissions()` and `getContactAuditEvents()`. Includes volume stats (all-time, 30d, 7d, today), pipeline state stats, service breakdown bar chart (Tailwind only), pipeline summary bar chart, and recent audit events table. |
| `src/app/admin/settings/page.tsx` | Replaced static env-var documentation with system diagnostics dashboard. Includes company info, env var presence checks (no values displayed), storage directory health, pipeline health counts, government readiness summary, and system info (Node.js version, platform, arch). |

### New Files

| File | Purpose |
|------|---------|
| `src/app/admin/portfolio/[projectId]/page.tsx` | Portfolio project detail page. Reads from `portfolioContent.projects` by `id`. Shows description, category, year, client, status badge, featured indicator, technology tags, and config note. Calls `notFound()` for unknown IDs. |
| `MANIFEST.md` | This file. |
| `VERIFY.md` | Build and manual verification checklist. |

### Reused Without Modification

| File | Used by |
|------|---------|
| `src/components/admin/AdminShell.tsx` | All admin pages via layout |
| `src/components/admin/AdminSidebar.tsx` | All admin pages via layout |
| `src/components/admin/AdminHeader.tsx` | All admin pages via layout |
| `src/components/admin/AdminCard.tsx` + `AdminStatCard` | All Batch 1 pages |
| `src/components/admin/AdminTable.tsx` | Portfolio page, analytics page |
| `src/components/admin/AdminButton.tsx` | All Batch 1 pages |
| `src/components/admin/AdminBadge.tsx` | Portfolio pages, analytics page, settings page |
| `src/components/admin/AdminPageHeader.tsx` | All Batch 1 pages |
| `src/components/admin/AdminEmptyState.tsx` | Portfolio page, analytics page |
| `src/lib/admin/utils.ts` | Analytics page (formatDateTime, humanizeSegment, cn) |
| `src/lib/admin/types.ts` | Portfolio and analytics pages (AdminTableColumn) |
| `src/lib/admin/contact-dashboard.ts` | Analytics page, settings page |
| `src/lib/seo.ts` | Unchanged; all pages use metadata export |
| `src/config/government.ts` | Settings page (government readiness summary) |
| `src/config/site.ts` | Settings page (company information) |

### Not Modified (Protected)

Contact pipeline, contact API route, SMTP logic, audit logging, CSV export, JSON download, runtime contact storage, existing dashboard, governmentContent schema, next.config.mjs, tsconfig.json, tailwind.config.ts, package.json, package-lock.json, src/proxy.ts (no proxy existed at Batch 1; added in Batch 3), environment files.

---

## No New Dependencies

Zero new packages installed. Zero new utility libraries created. All new code uses only existing project dependencies and admin components.
