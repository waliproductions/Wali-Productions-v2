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
