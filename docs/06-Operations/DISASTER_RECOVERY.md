# Disaster Recovery — Wali Productions Platform

Defines incident response procedures and recovery plans for operational disruptions.
This document is reviewed and updated before each major release.

---

## Incident Severity Levels

| Level | Description | Response Time | Example |
|-------|-------------|--------------|---------|
| P0 — Critical | Complete production outage | 30 min | Site unreachable, all requests failing |
| P1 — High | Major feature broken for all users | 2 hours | Admin login broken, contact form fails |
| P2 — Medium | Feature broken for some users or non-critical feature | 4 hours | Analytics page errors, portfolio image missing |
| P3 — Low | Minor cosmetic or non-blocking issue | Next business day | Alignment issue, missing icon |

---

## Recovery Scenarios

### Scenario 1 — Production Site Unreachable (P0)

**Indicators:** Site returns 5xx errors or DNS/TCP timeout.

**Steps:**
1. Check Hostinger status page for known infrastructure incidents.
2. SSH to Hostinger server (if available) and check Node.js process: `pm2 status`.
3. Check application logs for startup errors.
4. If the Node.js process crashed, restart it: `pm2 restart all`.
5. If the issue is a bad deployment, identify the last good commit and initiate rollback
   (see `DEPLOYMENT_STANDARDS.md — Rollback Procedure`).
6. If the hosting infrastructure is down, escalate to Hostinger support.
7. Communicate status to known clients via email.

**Resolution:** Site accessible and returning 200 responses on key routes.

---

### Scenario 2 — Admin Authentication Broken (P1)

**Indicators:** `/admin` redirect loops or login form returns errors after correct credentials.

**Possible causes:**
- `SESSION_SECRET` environment variable missing or changed.
- `ADMIN_PASSWORD_HASH` environment variable incorrect.
- `ADMIN_USERNAME` environment variable missing.
- iron-session library update with breaking change.

**Steps:**
1. Verify environment variables are set in Hostinger's environment config.
2. Verify `ADMIN_PASSWORD_HASH` is a valid bcryptjs hash (starts with `$2a$10$` or `$2b$10$`).
3. If `SESSION_SECRET` was rotated, all active sessions are invalidated — this is expected.
4. Generate a new hash if needed: `node -e "const b = require('bcryptjs'); b.hash('password', 10).then(console.log)"`
5. Redeploy if environment changes do not take effect immediately.

---

### Scenario 3 — Contact Form Not Delivering Emails (P1)

**Indicators:** Contact form submits successfully (data saved) but no email received.

**Possible causes:**
- SMTP credentials changed or expired.
- SMTP server blocked the sending IP.
- `CONTACT_RECIPIENT` email is bouncing.

**Steps:**
1. Check the admin contact page at `/admin/contact` — if submissions appear there, data is being saved.
2. Review audit events — look for failed delivery status in the submission lifecycle.
3. Test SMTP credentials with a standalone SMTP test tool.
4. Verify sending domain DNS (SPF, DKIM, DMARC records).
5. Check spam folder at the recipient address.
6. If SMTP credentials have changed, update the `SMTP_PASS` environment variable and redeploy.

---

### Scenario 4 — Bad Deployment Breaks the Build (P1/P2)

**Indicators:** Deployment succeeds but the site returns errors on some or all routes.

**Steps:**
1. Identify the breaking commit: `git log --oneline -10`.
2. Revert the commit: `git revert <commit-hash> --no-edit`.
3. Push the revert to `main`: `git push origin main`.
4. Monitor the new deployment to confirm the revert resolves the issue.
5. Investigate the root cause on a feature branch before re-attempting.

**Prevention:**
- Run `npm run typecheck && npm run build` locally before every push to `main`.
- Never push directly to `main` without verifying a clean build.

---

### Scenario 5 — Data Loss in Contact Submissions (P1)

**Indicators:** Admin contact page shows fewer submissions than expected.

**Possible causes:**
- Hostinger deployment cleared the data directory.
- Filesystem permissions changed preventing writes.
- Manual deletion.

**Steps:**
1. Check the Hostinger file manager for the `data/` directory.
2. Verify the application write path in `src/lib/contact/logger.ts`.
3. Contact Hostinger support about filesystem persistence during deployments.
4. If data is irrecoverable, notify affected clients by email.

**Prevention:**
- Implement periodic backup of `data/` directory to a remote location.
- Migration to database storage will eliminate this risk entirely.

---

### Scenario 6 — Security Incident (Unauthorized Access) (P0)

**Indicators:** Unknown sessions in the audit log, admin actions not performed by the founder,
unexpected content changes.

**Immediate steps:**
1. Rotate `SESSION_SECRET` immediately — this invalidates all active sessions.
2. Rotate `ADMIN_PASSWORD_HASH` immediately — change the admin password.
3. Revoke any suspicious sessions in the session management panel.
4. Review the security event log at `/admin/security/events`.
5. Preserve logs before any system changes.

**Investigation:**
6. Review git log for unauthorized commits.
7. Check Hostinger access logs for unusual IP patterns.
8. Review email headers of any suspicious contact form submissions.

**Recovery:**
9. Once the attack vector is identified and closed, restore from the last known
   good state if content was modified.
10. Document the incident and implement controls to prevent recurrence.
11. If government contract data was potentially accessed, consult legal counsel
    and notify relevant contracting officers per contractual obligations.

---

## Communication Templates

### Client Communication — Site Outage

> Subject: Wali Productions — Service Interruption
>
> Dear [Client Name],
>
> We are aware of a service interruption affecting our platform. Our team is
> actively working to restore full service.
>
> Current status: [brief description]
> Estimated resolution: [time or "Under investigation"]
>
> We will provide an update within [timeframe]. We apologize for the inconvenience.
>
> — Wali Johnson, Wali Productions LLC

---

## Recovery Objectives

**Current state (without SLA commitments):**

| Objective | Target |
|-----------|--------|
| Recovery Time Objective (RTO) | 4 hours for P0, 24 hours for P1 |
| Recovery Point Objective (RPO) | Data loss window = last filesystem write (no database) |

**Planned (with database and backup infrastructure):**

| Objective | Target |
|-----------|--------|
| RTO | 1 hour for P0 |
| RPO | Maximum 24 hours data loss (daily backups) |

---

## Contacts

| Role | Contact |
|------|---------|
| Platform Owner | Wali Johnson — waliproductionsllc@gmail.com |
| Hosting Support | Hostinger support portal |
| Domain Registrar | Per domain registration records |

---

## Review Schedule

This document is reviewed and updated:
- Before every major release (v0.X.0)
- After every P0 or P1 incident
- Annually as a general operational review
