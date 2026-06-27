# Batch 3 Verification Checklist

## Build Verification

Run in order:

```bash
npm run typecheck
npm run build
```

Both must complete with zero errors. Expected: 32 routes + `ƒ Proxy (Middleware)` in build output. No deprecation warnings.

---

## Environment Setup

Before testing, ensure `.env.local` contains:

```bash
ADMIN_USERNAME=admin
# Generate hash:
# node -e "require('bcryptjs').hash('your-password', 12).then(h => console.log(h))"
ADMIN_PASSWORD_HASH=<bcrypt-hash>
# Generate secret:
# openssl rand -base64 32
SESSION_SECRET=<min-32-char-secret>
```

---

## Manual Verification Checklist

### Login Page (`/login`)

- [ ] `/login` renders without crashing even when env vars are absent
- [ ] Page shows "Wali Productions / Admin Portal" branding with amber "W" logo
- [ ] Username and password fields render with accessible labels
- [ ] Form is functional: submitting with wrong credentials shows "Invalid username or password."
- [ ] Form is functional: submitting with correct credentials redirects to `/admin`
- [ ] While submitting, button text changes to "Signing in…" and fields are disabled
- [ ] Error message has `role="alert"` and renders in red
- [ ] Already-authenticated users visiting `/login` are immediately redirected to `/admin`

### Admin Protection (`/admin` redirect)

- [ ] Visiting `/admin` without a session cookie redirects to `/login?from=/admin`
- [ ] Visiting `/admin/government` without a session redirects to `/login?from=/admin/government`
- [ ] After logging in from `/admin/government`, the `from` redirect returns to `/admin/government`
- [ ] All other `/admin/*` routes redirect to login when unauthenticated
- [ ] Public routes (`/`, `/contact`, `/government`, `/portfolio`) are accessible without auth

### Admin Header

- [ ] After login, "Signed in as `<username>`" appears in the header (hidden on mobile, visible sm+)
- [ ] "Sign out" button is visible in the header
- [ ] Clicking "Sign out" submits the logout form, destroys the session, and redirects to `/login`
- [ ] After signing out, visiting `/admin` redirects to `/login`

### Settings Page (`/admin/settings`)

- [ ] Authentication card shows 3 rows: `ADMIN_USERNAME`, `ADMIN_PASSWORD_HASH`, `SESSION_SECRET`
- [ ] Each row shows "Configured" (green) or "Not configured" (amber) based on env var presence
- [ ] Card description reads "iron-session credentials" (not "HTTP Basic Auth credentials")
- [ ] No values are displayed — only presence/absence badges
- [ ] Status line reads "all credentials present" when all 3 are set, otherwise "incomplete — /admin routes are inaccessible until configured"

### Security Properties

- [ ] Browser DevTools → Application → Cookies shows `__admin_session` cookie after login
- [ ] Cookie has `HttpOnly` flag (not readable from JavaScript)
- [ ] Cookie has `SameSite=Lax`
- [ ] Cookie has `Path=/`
- [ ] In production (`NODE_ENV=production`), cookie has `Secure` flag
- [ ] Deleting the cookie and refreshing `/admin` redirects to `/login`
- [ ] Tampered cookie value (edit one character) redirects to `/login`

---

## Regression Check

After verifying all Batch 3 behavior, confirm that all prior functionality still works:

- [ ] All Batch 2 government sub-pages load and render correctly after login
- [ ] All Batch 1 admin pages (portfolio, analytics, contact, audit, settings) load correctly
- [ ] Public pages (`/`, `/portfolio`, `/government`, `/contact`) load without auth and without redirect
- [ ] Contact form submission works end-to-end (public API route is not behind auth)
- [ ] `npm run typecheck` exits clean
- [ ] `npm run build` exits clean with 32 routes + Proxy

---

## Notes

- `src/proxy.ts` is the Next.js 16 convention for what was previously `src/middleware.ts`. The function is named `proxy` (not `middleware`).
- The proxy uses `unsealData` (iron-session read-only API) rather than `getIronSession`, avoiding the `RequestCookies` / `CookieStore` type incompatibility in the proxy runtime.
- `requireAdmin()` in `src/lib/auth/permissions.ts` provides a defense-in-depth second layer for server components that need to verify auth independently of the proxy.
- Generating a bcrypt hash: `node -e "require('bcryptjs').hash('your-password', 12).then(h => console.log(h))"`
- Generating a session secret: `openssl rand -base64 32`

---

# Batch 2 Verification Checklist

## Build Verification

Run in order:

```bash
npm run typecheck
npm run build
```

Both must complete with zero errors. Expected route count: 30 routes.

---

## Manual Verification Checklist

### Government Dashboard (`/admin/government`)

- [ ] Page loads without error
- [ ] 4 stat cards render: Registration items, Core competencies, Differentiators, Past performance
- [ ] Internal Readiness Estimate progress bar renders with a percentage (e.g., 17% for 1 of 6 confirmed)
- [ ] "Not an official government metric" label is visible beneath the bar
- [ ] Government Center section heading renders above 7 navigation stat cards
- [ ] All 7 nav cards are present: Capability Statement, Registration Tracker, Technical Capabilities, NAICS Codes, PSC Codes, Past Performance, Documents
- [ ] Each nav card is a clickable link navigating to its sub-page
- [ ] Readiness narrative card renders with "Positioned and preparing..." heading
- [ ] "Capability statement" quick action button links to /admin/government/capability-statement
- [ ] Registration overview card renders all 6 items with Pending/Verified badges
- [ ] "View tracker" quick action button links to /admin/government/registration
- [ ] Competencies grid, differentiators grid, capability statement paragraphs, and past performance grid are NOT present on this page (moved to sub-pages)

### Capability Statement (`/admin/government/capability-statement`)

- [ ] Page loads without error
- [ ] Company Overview card renders with identity and positioning
- [ ] Capability Statement card renders the 2 paragraphs from `governmentContent.capabilityStatement`
- [ ] Core Competencies card renders all 6 competency tiles
- [ ] Differentiators card renders all 6 differentiator tiles
- [ ] Registration Status card shows total/confirmed/pending counts
- [ ] "View full tracker" button links to /admin/government/registration
- [ ] Source Reference card links to /admin/government/documents?doc=capability-statement
- [ ] "Back to government" button returns to /admin/government
- [ ] "View public page" button opens /government in new tab

### Registration Tracker (`/admin/government/registration`)

- [ ] Page loads without error
- [ ] 3 stat cards: Total items (6), Confirmed, Pending
- [ ] AdminTable renders with 3 columns: Identifier, Status / Value, Status
- [ ] UEI and CAGE rows show "Pending verified detail" in italic and a warning badge
- [ ] SAM.gov, Certifications rows show warning badge (in preparation text)
- [ ] Business Type row shows "Veteran-Owned Limited Liability Company (LLC)" and a success badge
- [ ] Update Guidance card renders with 3 numbered steps
- [ ] "View certifications policy" button links to /admin/government/documents?doc=certifications
- [ ] "Back to government" button returns to /admin/government

### Technical Capabilities (`/admin/government/capabilities`)

- [ ] Page loads without error
- [ ] 3 stat cards: Current domains (8), Current skills (36), Future domains (10)
- [ ] "Government Page Competencies" card renders all 6 public competencies with "Public" badges
- [ ] Each competency includes title and description
- [ ] Technical Capability Inventory card renders all 8 current domains
- [ ] Each domain shows its skill tags (Software Engineering: 4 skills, Website Development: 5, etc.)
- [ ] "Current" badge appears next to each domain
- [ ] Future Capabilities card renders 10 domains as muted tags
- [ ] "Capability statement" button in header links to /admin/government/capability-statement
- [ ] "Back to government" button returns to /admin/government

### NAICS Codes (`/admin/government/naics`)

- [ ] Page loads without error
- [ ] 3 stat cards render: Confirmed codes (0), Pending confirmation (—), Policy document (1)
- [ ] AdminEmptyState renders: "No NAICS codes confirmed"
- [ ] Policy card renders with 3 bullet points
- [ ] "View NAICS policy document" button links to /admin/government/documents?doc=naics-codes
- [ ] "View registration tracker" button links to /admin/government/registration
- [ ] "Back to government" button returns to /admin/government

### PSC Codes (`/admin/government/psc`)

- [ ] Page loads without error
- [ ] 2 stat cards render: Confirmed codes (0), Status (Pending)
- [ ] AdminEmptyState renders: "No PSC codes documented"
- [ ] Policy card renders with 3 bullet points
- [ ] "View government contracting document" button links to /admin/government/documents?doc=government-contracting
- [ ] "Back to government" button returns to /admin/government

### Past Performance (`/admin/government/past-performance`)

- [ ] Page loads without error
- [ ] 3 stat cards: Total entries (2), Documented (0), Pending (2)
- [ ] Past Performance card renders with policy note text
- [ ] AdminEmptyState renders: "No documented entries"
- [ ] "2 entries pending documentation and authorization" message visible
- [ ] Performance Categories card renders all 8 category tiles
- [ ] Policy card renders with "View past performance policy" button
- [ ] Button links to /admin/government/documents?doc=past-performance
- [ ] "Back to government" button returns to /admin/government

### Government Documents (`/admin/government/documents`)

- [ ] Page loads without error (default: Capability Statement selected)
- [ ] Left sidebar lists all 5 documents: Capability Statement, Certifications, Government Contracting, NAICS Codes, Past Performance
- [ ] Active document is highlighted with amber left border
- [ ] Capability Statement document content renders as preformatted text
- [ ] Clicking "Certifications" in the sidebar loads CERTIFICATIONS.md content
- [ ] Clicking "NAICS Codes" in sidebar loads NAICS_CODES.md content
- [ ] All 5 documents render their content (none return "Document not available")
- [ ] URL param ?doc=certifications selects the Certifications document directly
- [ ] No markdown library used (check browser network tab)
- [ ] "Back to government" button returns to /admin/government

---

## Regression Check

After verifying all Batch 2 pages, confirm that all Batch 1 pages still function:

- [ ] `/admin` — dashboard stat cards load correctly
- [ ] `/admin/portfolio` — table, filters, and detail page work
- [ ] `/admin/analytics` — metrics and audit events table render
- [ ] `/admin/settings` — all cards render; no secret values displayed
- [ ] `/admin/contact` — submission table and filters work
- [ ] `/admin/audit` — audit events and search work
- [ ] Public pages (`/`, `/portfolio`, `/government`, `/contact`) load correctly
- [ ] Contact form submission still works end-to-end
- [ ] `npm run typecheck` exits clean
- [ ] `npm run build` exits clean with 30 routes

---

## Notes

- All Batch 2 pages are read-only. No editing interfaces, forms, or write operations exist.
- `src/config/government.ts` was not modified. All new types and data live in `src/config/government-center.ts`.
- NAICS and PSC pages intentionally show empty states — no codes have been confirmed.
- Past performance intentionally shows empty state — no entries are authorized for publication.
- The Internal Readiness Estimate is labeled explicitly as not an official government metric.
- The document browser renders markdown as preformatted text (no markdown library installed).

---

# Batch 1 Verification Checklist

## Build Verification

Run in order:

```bash
npm run typecheck
npm run build
```

Both must complete with zero errors before manual testing.

---

## Manual Verification Checklist

### Admin Dashboard (`/admin`)

- [ ] Page loads and renders the stat cards (Contact inquiries, Processed, Failed, Archived)
- [ ] Counts are live (reflect actual filesystem state)
- [ ] Navigation sidebar shows all 7 items: Dashboard, Contact Inquiries, Audit Log, Portfolio, Government, Analytics, Settings
- [ ] "View site" link in header navigates to the public site
- [ ] Mobile sidebar drawer opens and closes correctly

### Portfolio (`/admin/portfolio`)

- [ ] Page renders stat cards: Published, Drafts, Pending, Featured
- [ ] Published count shows 1 (the Wali Productions LLC website entry)
- [ ] Filter form renders: search input, status select, category select, Apply button
- [ ] Projects table renders with columns: Project, Category, Status, Featured, Technologies, Year
- [ ] The Wali Productions LLC entry shows a "Published" success badge
- [ ] Technologies column shows "Next.js", "React", "TypeScript" and "+2" overflow badge
- [ ] Clicking the project title navigates to the detail page
- [ ] Filter by status "published" shows 1 result; "draft" shows 0; "pending" shows 0
- [ ] Filter by category "Business Websites" shows 1 result
- [ ] Search by "tailwind" shows 1 result
- [ ] Search by "xyz-does-not-exist" shows empty state with "Clear filters" button
- [ ] Clear button resets filters

### Portfolio Detail (`/admin/portfolio/wali-productions-website`)

- [ ] Page renders with project title as the heading
- [ ] Description, category, year, client all display correctly
- [ ] "Published" badge appears in the Status card
- [ ] "Not featured" appears in the Featured field
- [ ] Project ID shows "wali-productions-website"
- [ ] "View site" button links to https://waliproductions.com (external, opens in new tab)
- [ ] Technologies card shows all 5 tech tags: Next.js, React, TypeScript, Tailwind CSS, Nodemailer
- [ ] Configuration note card explains editing via config file
- [ ] "Back to portfolio" button returns to /admin/portfolio
- [ ] Navigating to `/admin/portfolio/does-not-exist` returns a 404

### Analytics (`/admin/analytics`)

- [ ] Page renders with 8 stat cards across two rows
- [ ] All-time inquiries, Last 30 days, Last 7 days, Today: show 0 or real counts (not "Awaiting data source")
- [ ] Email success rate shows "—" when no deliveries attempted, or a percentage when data exists
- [ ] Failed count links to /admin/contact?status=failed when count > 0
- [ ] Service Breakdown card: shows empty state when no submissions, or horizontal bars when data exists
- [ ] Pipeline Summary card: shows empty state when no submissions, or proportional bars when data exists
- [ ] Recent Audit Events table: shows empty state when no events, or last 10 events when data exists
- [ ] Event badges: email_sent → success (green), email_failed → danger (red), received → info (blue)
- [ ] "View all events" button links to /admin/audit
- [ ] No chart library loaded (check browser network tab)

### Settings (`/admin/settings`)

- [ ] Page renders all cards: Company Information, Authentication, Email/SMTP, Runtime Storage, Contact Pipeline Health, Government Readiness, System Information
- [ ] Company Information shows correct name ("Wali Productions"), legal name, identity, and site URL
- [ ] Authentication card shows ADMIN_USERNAME and ADMIN_PASSWORD rows — each shows configured/not configured badge, NO values
- [ ] Email card shows all 6 env vars — each shows configured/not configured badge, NO values
- [ ] SMTP delivery status line reflects actual env var presence
- [ ] Runtime Storage card shows 5 health checks (queue, processed, failed, archive, events.jsonl)
- [ ] Overall storage status reflects filesystem reality
- [ ] Contact Pipeline Health shows correct queue and failed counts
- [ ] Government Readiness shows registration item counts and links to /admin/government
- [ ] System Information shows Node.js version, platform, architecture, NODE_ENV — all real values
- [ ] No secret values appear anywhere on the page

### Government Dashboard (`/admin/government`)

- [ ] Page still loads correctly (unchanged)
- [ ] Registration badges still show Pending/Verified correctly
- [ ] Competencies and differentiators grids render correctly
- [ ] Stat cards show correct counts

### Contact Dashboard (`/admin/contact`)

- [ ] Page still loads and renders the submission table (unchanged)
- [ ] Search and filter still work
- [ ] Individual submission pages still load
- [ ] Export CSV link still works
- [ ] JSON download on individual submissions still works

### Audit Viewer (`/admin/audit`)

- [ ] Page still loads and renders audit events (unchanged)
- [ ] Search and event type filter still work
- [ ] Expandable event details still function

---

## Regression Check

After verifying all pages above, confirm that:

- [ ] Public home page (`/`) loads correctly
- [ ] Public portfolio page (`/portfolio`) loads correctly and shows existing content
- [ ] Public contact page (`/contact`) loads and the form submits successfully
- [ ] Contact form submission creates a file in `app-data/contact-submissions/queue/`
- [ ] Audit log file at `app-data/contact-submissions/logs/events.jsonl` updates on submission
- [ ] No TypeScript errors: `npm run typecheck` exits clean
- [ ] No build errors: `npm run build` exits clean

---

## Notes

- The portfolio projects array is config-based. Adding projects requires editing `src/config/portfolio.ts` and redeploying.
- Analytics derives all metrics from the local filesystem. Zero external analytics services are used.
- Settings checks only whether env vars are present — it never reads or displays their values.
- The `/admin` routes have no HTTP authentication enforced yet (future batch).
