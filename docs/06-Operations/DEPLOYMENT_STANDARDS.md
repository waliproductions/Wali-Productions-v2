# Deployment Standards — Wali Productions Platform

Defines deployment procedures, environment configuration, and release standards
for all platform environments. Read alongside `DEPLOYMENT.md` (quick reference)
and `DISASTER_RECOVERY.md` (incident response).

---

## Environments

| Environment | URL | Branch | Purpose |
|-------------|-----|--------|---------|
| Development | `localhost:3000` | Feature branches | Local development and testing |
| Staging | TBD | `staging` branch | Pre-release integration testing |
| Production | `waliproductions.com` | `main` branch | Live customer-facing platform |

**Current state:** Only Development and Production environments exist. Staging
is planned before the first government contract submission.

---

## Deployment Pipeline

**Current (GitHub → Hostinger auto-deploy):**

```
git push origin main
  → GitHub receives commit
  → Hostinger detects push (GitHub Actions webhook or Hostinger Git integration)
  → Hostinger runs: npm install && npm run build
  → Build artifacts replace the running server
  → Node.js server restarts with new code
```

**Planned (with CI gate):**

```
git push origin main
  → GitHub CI runs: typecheck → lint → unit tests → build
  → If all pass: Hostinger deployment proceeds
  → If any fail: deployment blocked, developer notified
```

---

## Pre-Deploy Checklist

Before pushing to `main`, verify:

**Code quality:**
- [ ] `npm run typecheck` passes with zero errors
- [ ] `npm run build` produces a clean production build
- [ ] No `console.log` calls left in production code
- [ ] No debug or test data committed

**Security:**
- [ ] No secrets in committed files
- [ ] `.env.local` is not committed (verify `.gitignore`)
- [ ] `npm audit` shows no high or critical vulnerabilities
- [ ] All new API endpoints validate input at the system boundary

**Functionality:**
- [ ] Login and logout flow tested
- [ ] Contact form submission tested
- [ ] Public pages accessible without authentication
- [ ] Admin pages redirect to login when session is absent

---

## Environment Variables

**Required for all environments:**

| Variable | Required | Description |
|----------|----------|-------------|
| `ADMIN_USERNAME` | Yes | Admin login username |
| `ADMIN_PASSWORD_HASH` | Yes | bcryptjs hash of admin password |
| `SESSION_SECRET` | Yes | iron-session encryption key (≥32 chars) |
| `SMTP_HOST` | Yes | Email server hostname |
| `SMTP_PORT` | Yes | Email server port (typically 587 or 465) |
| `SMTP_USER` | Yes | SMTP authentication username |
| `SMTP_PASS` | Yes | SMTP authentication password |
| `SMTP_FROM` | Yes | From address for outgoing emails |
| `CONTACT_RECIPIENT` | Yes | Destination address for contact form submissions |
| `NODE_ENV` | Auto | Set by hosting environment (`production` in prod) |

**How to generate `SESSION_SECRET`:**
```bash
openssl rand -base64 32
```

**How to generate `ADMIN_PASSWORD_HASH`:**
```bash
node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('YOUR_PASSWORD', 10).then(h => console.log(h))"
```

**Never store these values in:**
- Source code files
- `.env` (committed to git)
- Code comments
- Documentation files

---

## Dependency Updates

**Process:**
1. Run `npm outdated` to identify available updates.
2. Update one dependency at a time for major versions.
3. Run `npm run typecheck && npm run build` after each update.
4. Review the dependency's CHANGELOG for breaking changes.
5. Run `npm audit` to check for newly introduced vulnerabilities.
6. Commit with `chore(deps): update <package> to vX.Y.Z`.

**Automated update policy:**
- Patch updates: apply promptly.
- Minor updates: review and apply within 2 weeks.
- Major updates: planned upgrade with testing period.
- Security patches: apply within 24 hours of disclosure.

---

## Rollback Procedure

**If a deployment causes a production issue:**

1. Identify the last known good commit with `git log --oneline`.
2. Create a hotfix branch from the last good commit.
3. Deploy the hotfix branch by force-pushing to a `hotfix` trigger branch.
4. If Hostinger does not support selective branch deployment, revert the broken
   commit with `git revert <commit-hash>` and push to `main`.
5. Document the incident in `docs/06-Operations/` or an incident log.

**Never use `git reset --hard` on `main` to roll back** — this rewrites public
history and can cause data loss if others have pulled the broken commit.

---

## Build Performance Standards

**Current build metrics (approximate):**

| Metric | Target | Current |
|--------|--------|---------|
| Build time | < 60s | ~5-10s (Turbopack) |
| Route count | Tracked | 82 routes (v0.9) |
| TypeScript check | Zero errors | Zero errors |
| Bundle size (public home) | < 200kB | Under review |

**Bundle optimization checklist:**
- [ ] Dynamic imports for large components used only on specific pages.
- [ ] No `import *` from large packages — use named imports only.
- [ ] Images use `next/image` with explicit `width` and `height`.
- [ ] Fonts use `next/font` with `display: 'swap'`.
- [ ] Server Components used by default — `"use client"` only when needed.

---

## Post-Deploy Verification

After every production deployment:

1. Open `https://waliproductions.com` — home page loads without error.
2. Open `https://waliproductions.com/contact` — contact form renders.
3. Open `https://waliproductions.com/admin` — redirects to `/login`.
4. Log in at `/login` — lands on admin dashboard.
5. Verify admin nav renders and all top-level sections are accessible.
6. Submit a test contact form with a real email — verify delivery.
7. Log out — verify session is destroyed and redirect to `/login`.

---

## Data Backup Strategy

**Current:**
- Contact form submissions are stored on the Hostinger filesystem.
- No automatic backup of submission data.

**Planned:**
- Daily export of contact submissions to a secure remote location.
- Database backups (when a database is added) on a defined schedule.
- Backup retention: 90 days minimum, 7 years for contract-related data.

---

## Monitoring & Alerting

**Current:**
- Hostinger provides uptime monitoring via hosting dashboard.
- No application-level monitoring.

**Planned:**
- Uptime monitoring with alerting (e.g., UptimeRobot or Hostinger's built-in).
- Error tracking (e.g., Sentry) for server-side exceptions.
- Performance monitoring via Web Vitals analytics.
- Security event alerting for high/critical security events.
- Notification channel: email → in-app → Slack (in priority order).
