# Roadmap — v0.4.0 and Beyond

**Status:** Planning
**Last updated:** 2026-06-27

---

## Overview

v0.4.0 will focus on redesigning the public-facing Wali Productions website. The current public site is functional but was built as a foundation — v0.4.0 will elevate it into a polished, high-quality digital presence that accurately represents the brand and effectively communicates value to prospective clients, partners, and government contracting officers.

Administrative enhancements (content editing, CRUD tools, RBAC) are planned for a subsequent milestone after the public redesign is complete.

---

## v0.4.0 — Public Website Redesign

### Goals

- Modernize the visual design to reflect a professional, veteran-owned technology firm
- Establish strong branding consistency across all public pages
- Improve typography, color palette, and spacing for readability and impact
- Introduce high-quality imagery and graphics to support the brand narrative
- Enhance the presentation of services, capabilities, and differentiators
- Increase visitor engagement and conversion (contact form submissions, consultation requests)
- Preserve all existing functionality: contact form, portfolio, government page, SMTP pipeline

### Scope

#### Design Modernization

- Comprehensive visual refresh of all public pages (`/`, `/government`, `/portfolio`, `/contact`)
- Updated color palette aligned with brand identity
- Typography system: heading hierarchy, body copy, callouts
- Improved spacing, layout rhythm, and visual hierarchy
- Consistent section structure across all pages

#### Imagery and Graphics

- Professional hero imagery or abstract graphic treatment
- Section illustrations or iconography to support service descriptions
- Portfolio project thumbnails or visual context cards
- Founder or brand photography integration (if approved)

#### Service Presentation

- Redesigned services section with stronger visual differentiation
- Clear articulation of each service category with outcomes and target clients
- Improved "Why Choose Us" section with specific, credible differentiators
- Stronger government contracting narrative with trust signals

#### Conversion Optimization

- Clear primary and secondary CTAs on each page
- Contact form improvements (clarity, accessibility, confirmation feedback)
- Reduced friction between landing and inquiry submission

#### Technical Requirements

- All redesign work stays within the existing Next.js 16 App Router architecture
- Config-driven content: copy changes go in `src/config/`, not components
- No new dependencies without explicit review
- All existing routes and API behavior preserved
- `npm run typecheck` and `npm run build` must pass at completion
- Mobile-first, accessible, and performant (Core Web Vitals maintained)

### Architecture Considerations

- Design tokens (colors, typography, spacing) should be centralized in `tailwind.config.ts` and referenced consistently — avoid one-off inline values
- New section components follow the existing pattern: component file in `src/components/<section>/`, data in `src/config/`
- Shared UI primitives (buttons, cards, badges) can be introduced in `src/components/ui/` if the redesign reveals a clear reuse pattern — do not pre-abstract
- Images: use Next.js `<Image>` with explicit `width` and `height` for all above-the-fold assets; lazy-load below-the-fold assets

### Risks

| Risk | Likelihood | Mitigation |
|------|-----------|-----------|
| Scope creep into new features during redesign | Medium | Freeze feature additions; redesign only changes visual presentation and copy |
| Brand asset dependencies (photography, custom graphics) block completion | Medium | Use high-quality stock imagery as a placeholder; swap when assets are ready |
| Config changes break public page rendering | Low | TypeScript config types catch structural mismatches at build time |
| Government page copy conflicts with legal/compliance requirements | Low | Government page copy changes require founder review before deployment |
| Redesign regresses contact form or SMTP pipeline | Low | Regression checklist: submit a test contact form and verify delivery end-to-end |

### Milestones

| # | Milestone | Description |
|---|-----------|-------------|
| 1 | Design direction | Define color palette, typography system, and layout principles |
| 2 | Component audit | Identify which existing public components to refactor vs. replace |
| 3 | Home page redesign | Hero, mission, services, differentiators, CTA |
| 4 | Government page redesign | Readiness narrative, competencies, registration, CTA |
| 5 | Portfolio page redesign | Project grid or cards, filters, detail pages |
| 6 | Contact page redesign | Form layout, confirmation state, accessibility |
| 7 | Shared layout update | Navbar, footer, global spacing and typography tokens |
| 8 | Cross-page review | Consistency audit, mobile review, Core Web Vitals check |
| 9 | Build and verification | `npm run typecheck`, `npm run build`, manual smoke test all pages |

### Implementation Order

Recommended sequence:
1. Establish design tokens in `tailwind.config.ts` first — all subsequent work references them
2. Update shared layout (Navbar, Footer) so all pages inherit the new foundation
3. Redesign home page — highest visibility, establishes the design language
4. Government page — second priority for government contracting credibility
5. Portfolio and contact pages — follow the established pattern

---

## Post-v0.4.0 — Admin Enhancements

After the public website redesign is complete, the following administrative capabilities are planned. These are documented here for planning purposes and will be scoped into a formal milestone (v0.5.0 or later) once the redesign ships.

### Government Content Management

**Objective:** Allow the admin portal to edit and version government-facing content without requiring code deploys.

- **Editable capability statement** — form-based editor with live preview; writes changes back to config or a managed data layer
- **Government document management** — create, edit, and archive capability statements, policy documents, and government responses
- **NAICS and PSC code management** — add and confirm codes with an approval step before they become visible on the public government page
- **Registration item management** — update UEI, CAGE, SAM.gov status as official identifiers are issued
- **Past performance entry management** — create entries with an authorization workflow (draft → founder review → published); supports attaching supporting documentation

### Admin CRUD Tools

- **Structured form editors** for government data, portfolio projects, and service descriptions
- **Rich text / document editor** for long-form government documents and capability narratives
- **File upload support** for past performance supporting documentation and certifications
- **Internal admin notes** — private annotations on contacts, submissions, and government entries; not visible publicly

### Reporting and Audit

- **Reporting dashboard** — exportable snapshots of government readiness, contact pipeline health, and portfolio status
- **Enhanced audit history** — full admin activity log covering all write operations with diff tracking
- **Admin activity logging** — per-user audit trail for all content changes

### Access Control

- **RBAC (role-based access control)** — admin, editor, and viewer roles with enforced permission checks at the server action level; builds on the `role?: "admin"` field already in `SessionData`
- **User management** — create and manage admin portal users; password reset flow
- **Session management** — view and revoke active sessions

### Architecture Considerations for Admin Enhancements

- Content editing requires a decision on the persistence layer: file-based (write back to `src/config/` + redeploy), database (PostgreSQL or SQLite), or a headless CMS. The choice depends on deployment constraints (Hostinger shared hosting limits database access and long-running processes).
- File-based editing avoids infrastructure dependencies but requires a deploy on every content change. A managed data layer removes that constraint but introduces a database dependency.
- RBAC builds on the `role` field in `SessionData`. The permissions module (`src/lib/auth/permissions.ts`) is already structured to support role checks — no session schema changes required.
- File uploads require storage: local filesystem (Hostinger), Cloudflare R2, or AWS S3. Network storage is preferred to avoid upload size limits on shared hosting.

### Dependencies

| Feature | Dependency |
|---------|-----------|
| Rich text editor | `@tiptap/react` or `lexical` (review when scoped) |
| File uploads | Storage provider decision required (local vs. cloud) |
| Database (if chosen) | Deployment environment must support persistent connections |
| RBAC | No new dependencies — extends existing session and permissions modules |

---

## Future Expansion (v0.6.0+)

Topics that are out of scope for the near-term roadmap but worth tracking:

- **Client portal** — authenticated access for contract clients to view project status and deliverables
- **Proposal generator** — assemble government proposals from stored capability statement components
- **CRM integration** — sync contact submissions with an external CRM (HubSpot, Notion)
- **Analytics integration** — optional third-party analytics (Plausible, Fathom) as a privacy-respecting alternative to the current filesystem-based analytics
- **Multi-site support** — separate admin sections for distinct business units or service lines
