# CHANGELOG

All notable changes to the Wali Productions LLC Digital Headquarters are documented in this file.

The format follows the principles of [Keep a Changelog](https://keepachangelog.com/) and [Semantic Versioning](https://semver.org/).

---

## [v0.3.0] — 2026-06-27

### Admin Portal — Production Authentication

- iron-session v8 sealed cookie sessions (AES-GCM, Iron protocol)
- bcryptjs v3 password hashing — pure JS, no native bindings
- Login page (`/login`) with React 19 `useActionState` Server Action form
- Logout via Server Action — no API route required
- Proxy route protection at `src/proxy.ts` — all `/admin/*` routes redirect to `/login` when unauthenticated
- Timing-safe login — bcrypt comparison runs unconditionally to prevent timing attacks
- Username displayed in admin header via server-side prop threading
- Role field (`role?: "admin"`) reserved in session type for future RBAC
- `src/lib/auth/session.ts` — single source of truth for session config and `SessionData` type
- `src/lib/auth/actions.ts` — `loginAction` and `logoutAction` Server Actions
- `src/lib/auth/permissions.ts` — `isAuthenticated()`, `hasRole()`, `requireAdmin()`
- **Env var change:** `ADMIN_PASSWORD` (plaintext) removed; `ADMIN_PASSWORD_HASH` (bcrypt hash) and `SESSION_SECRET` (min 32 chars) now required

### Admin Portal — Government Operations Center

- Hub dashboard (`/admin/government`) with internal readiness estimate, navigation cards, and registration overview
- Capability Statement page — proposal-ready preview of competencies, differentiators, and capability paragraphs
- Registration Tracker — all six registration items with Pending/Verified status badges
- Technical Capabilities — 8 current domains (36 skills) and 10 future domains sourced from `BUSINESS_CAPABILITIES.md`
- NAICS Codes — pending state with policy guidance and document reference
- PSC Codes — pending state with policy guidance
- Past Performance — 8 performance categories; pending state with authorization policy
- Government Document Browser — server-reads `docs/02-Government/*.md` with URL-param document selection
- New config `src/config/government-center.ts` — capability domains, past performance categories, document registry
- `src/config/government.ts` unchanged — no structural modifications

### Admin Portal — Foundation

- Portfolio management (`/admin/portfolio`) — filterable table, project detail pages, config-driven entries
- Analytics dashboard (`/admin/analytics`) — contact volume, pipeline state, service breakdown; filesystem-derived
- Contact submission dashboard (`/admin/contact`) — inbox view, search/filter, submission detail, CSV export
- Audit log viewer (`/admin/audit`) — searchable event feed with expandable detail
- Settings page (`/admin/settings`) — env var presence diagnostics, storage health, pipeline health, system info
- Admin component library — `AdminCard`, `AdminStatCard`, `AdminTable`, `AdminBadge`, `AdminButton`, `AdminPageHeader`, `AdminEmptyState`, `AdminShell`, `AdminHeader`, `AdminSidebar`

---

## Pre-release History

Earlier development phases were tracked using an internal milestone numbering scheme that does not correspond to git release tags. The entries below are preserved for historical reference.

### Phase 3 — Homepage Implementation

- Homepage with Hero, Mission, Services, Government overview, Why Choose Us, and CTA sections
- Homepage component architecture and configuration module
- `COMPANY_STORY.md`, `PROJECT_ROADMAP.md`, `TECHNICAL_DEBT.md` documentation

### Phase 2 — Shared Application Layout

- Responsive navigation bar
- Responsive footer
- Global styling improvements
- Layout component architecture and navigation configuration

### Phase 1 — Foundation

- Repository initialization
- Documentation framework (`docs/` structure across 9 directories)
- Business, government, brand, engineering, marketing, operations documentation
- Next.js bootstrap with Tailwind CSS and TypeScript configuration

---

## Upcoming

### Post-v0.3.0 — Public Website Redesign

- Modernized visual design and branding consistency
- High-quality imagery and graphics
- Improved typography and color palette
- Enhanced service presentation
- Increased visitor engagement and conversion
- All existing functionality preserved

### Future — Admin Enhancements (post-redesign)

- Government document management with editing and versioning
- Editable capability statement with live preview
- Past performance entry management and authorization workflow
- NAICS and PSC code management
- Rich text document editor
- File upload support
- Internal admin notes
- Reporting dashboard with exportable snapshots
- Enhanced audit history and admin activity logging
- RBAC and multi-user admin support
