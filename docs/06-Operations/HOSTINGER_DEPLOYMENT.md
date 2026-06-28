# Hostinger Deployment Guide — Wali Productions Platform

Step-by-step guide for deploying the Wali Productions LLC platform on Hostinger's
Node.js hosting. Covers initial setup, environment configuration, and ongoing
deployment procedures.

---

## Prerequisites

- Hostinger hosting plan with Node.js support (Business or higher)
- GitHub repository with `main` as the production branch
- Domain configured in Hostinger's DNS manager

---

## Initial Setup

### 1. Connect the GitHub Repository

1. Log into Hostinger hPanel.
2. Navigate to **Websites → Manage → Git**.
3. Connect your GitHub account if not already linked.
4. Select the repository and set the branch to `main`.
5. Enable **Auto-deploy on push** — this triggers a new build whenever code is pushed to `main`.

### 2. Configure Node.js

In **hPanel → Advanced → Node.js**:

1. Set Node.js version to **20.x** or higher.
2. Set the **Application root** to the repository root directory.
3. Set the **Application startup file** to `server.js` (Hostinger will call `npm start` via this entry point).
4. Set **Application URL** to your primary domain.

### 3. Set Environment Variables

In **hPanel → Advanced → Node.js → Environment Variables**, add:

| Variable | Required | Value |
|----------|----------|-------|
| `ADMIN_USERNAME` | Yes | Your admin login username |
| `ADMIN_PASSWORD_HASH` | Yes | bcryptjs hash — see generation below |
| `SESSION_SECRET` | Yes | 32+ char random string — see generation below |
| `SMTP_HOST` | Yes | `smtp.hostinger.com` (or your SMTP provider) |
| `SMTP_PORT` | Yes | `587` (or `465` for SSL) |
| `SMTP_USER` | Yes | Your sending email address |
| `SMTP_PASS` | Yes | Your email password |
| `CONTACT_TO_EMAIL` | Yes | Where contact form submissions go |
| `CONTACT_FROM_EMAIL` | Yes | The From address on outgoing emails |
| `NEXT_PUBLIC_SITE_URL` | Recommended | `https://waliproductions.com` |

**Generating ADMIN_PASSWORD_HASH:**
```bash
node -e "require('bcryptjs').hash('yourpassword', 12).then(console.log)"
```

**Generating SESSION_SECRET:**
```bash
openssl rand -base64 32
```

### 4. First Deployment

1. Push the current `main` branch to GitHub.
2. Hostinger will automatically run `npm install && npm run build`.
3. On success, the Node.js process starts with `npm start`.
4. Visit your domain to verify the public site loads.
5. Visit `/admin` — it should redirect to `/login`.
6. Log in with your configured credentials.

---

## How the Middleware Works (Hostinger Specifics)

Standard Next.js uses `src/middleware.ts` for route protection. Hostinger's
Node.js hosting **does not support** Next.js middleware in the traditional sense.

This project uses `src/proxy.ts` with an exported `proxy()` function instead.
This is the Hostinger-compatible convention — Hostinger's runtime calls `proxy()`
as a request interceptor before routing to Next.js pages.

The proxy unseals the session cookie and checks authentication on every request
to `/admin/:path*`. No changes to standard routing behavior are required.

> If you ever migrate to Vercel or another platform, rename `src/proxy.ts` to
> `src/middleware.ts` and rename `export async function proxy` to
> `export async function middleware`. Everything else stays the same.

---

## Ongoing Deployment

### Standard Push (Most Common)

```bash
# Verify before pushing
npm run typecheck && npm run build

# Push to main
git push origin main
```

Hostinger detects the push and automatically runs the build. Monitor the build
in **hPanel → Git → Deployment Log**.

### Environment Variable Changes

Environment variable changes require a redeploy to take effect:

1. Update the variable in hPanel → Node.js → Environment Variables.
2. In the Git panel, trigger a manual redeploy, OR push a commit to main.
3. Verify the change by visiting `/admin/health` after the redeploy.

### Checking Deployment Status

1. In hPanel → Git → Deployment Log, verify the latest deployment shows Success.
2. Check the Node.js process status in hPanel → Advanced → Node.js.
3. Visit the site and `/admin` to confirm everything is working.

---

## Post-Deploy Verification Checklist

Run through this list after every production deployment:

**Public site:**
- [ ] Home page (`/`) loads and renders correctly
- [ ] Contact page (`/contact`) renders the form
- [ ] Portfolio page (`/portfolio`) renders

**Authentication:**
- [ ] `/admin` redirects to `/login` without a session
- [ ] Login with correct credentials lands on the admin dashboard
- [ ] Login with wrong credentials returns "Invalid credentials" error
- [ ] Logout destroys the session and redirects to `/login`

**Admin portal:**
- [ ] Admin dashboard loads and displays correctly
- [ ] Navigation sidebar renders all sections
- [ ] `/admin/health` shows system health status

**Contact form:**
- [ ] Submit a test contact form
- [ ] Verify the submission appears in `/admin/contact`
- [ ] Verify email delivery to `CONTACT_TO_EMAIL`

---

## Troubleshooting

### Build Fails on Hostinger

**Symptom:** Deployment log shows a build error.

**Steps:**
1. Run `npm run build` locally first — it should succeed before any push.
2. Check if the error is a TypeScript error: run `npm run typecheck` locally.
3. Check if node_modules is cached incorrectly — clear the Hostinger build cache via hPanel.
4. Verify `package.json` specifies the correct Node.js engine (`"engines": {"node": ">=18.18.0"}`).

### Site Shows 502 / Application Not Responding

**Symptom:** Site returns a 502 error after a successful build.

**Steps:**
1. In hPanel → Advanced → Node.js, check if the Node.js process is running.
2. Restart the process if it shows as stopped or errored.
3. Check application logs for startup errors — often a missing environment variable.
4. Verify `SESSION_SECRET` is set — the app throws a descriptive error at startup if it's missing or short.

### Authentication Stops Working After Redeploy

**Symptom:** Login fails or sessions are invalidated after deployment.

**Cause:** If `SESSION_SECRET` changed (or was set for the first time), all existing sessions are invalidated — this is expected behavior. Log in again.

**If login itself fails:** Verify `ADMIN_USERNAME` and `ADMIN_PASSWORD_HASH` are correctly set in Hostinger's environment variables. Regenerate the hash if needed.

### Contact Form Emails Not Delivering

**Symptom:** Contact form submits but no email is received.

**Steps:**
1. Check `/admin/contact` — if submissions appear, data is saved correctly. The issue is SMTP-only.
2. Verify SMTP credentials in environment variables.
3. Check spam folder at `CONTACT_TO_EMAIL`.
4. Test SMTP credentials using a standalone SMTP tool.
5. For Hostinger SMTP: verify the email account exists in hPanel → Emails.

---

## Rollback

If a deployment causes a production issue:

1. Identify the last good commit: `git log --oneline`.
2. Revert the breaking commit:
   ```bash
   git revert <commit-hash> --no-edit
   git push origin main
   ```
3. The revert triggers a new build on Hostinger.
4. Monitor the deployment log to confirm the revert resolves the issue.

Never use `git reset --hard` on `main` — it rewrites public history.

---

## Data Persistence

Contact form submissions are stored on the Hostinger filesystem in a `data/`
directory at the application root. This directory persists across deployments
(it is not cleared by `npm run build`).

**Important:** If you delete and re-create the hosting application in Hostinger,
the `data/` directory is lost. Export submissions from `/admin/contact` regularly.

The `data/` directory is listed in `.gitignore` — it is not committed to the
repository and must not be.

---

## Domain Configuration

In **hPanel → Domains → Manage → DNS Zone**, the following records should be configured:

| Type | Name | Value |
|------|------|-------|
| A | @ | Hostinger's IP (shown in hPanel) |
| A | www | Hostinger's IP |
| CNAME | mail | Your Hostinger mail server |
| MX | @ | Your Hostinger mail server |

Enable SSL in **hPanel → SSL** — Let's Encrypt certificates are automatically issued
and renewed. The platform's Strict-Transport-Security header requires HTTPS.
