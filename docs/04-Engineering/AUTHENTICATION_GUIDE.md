# Authentication Guide — Wali Productions Platform

The admin portal uses a single-admin iron-session authentication system with
bcryptjs password hashing. This guide covers how it works, how to configure it,
and how to maintain it.

---

## Overview

The authentication stack consists of four layers:

| Layer | Technology | File |
|-------|-----------|------|
| Route protection | Next.js 16 proxy function | `src/proxy.ts` |
| Login action | Server Action + bcryptjs | `src/lib/auth/actions.ts` |
| Session management | iron-session v8 | `src/lib/auth/session.ts` |
| Role enforcement | requireAdmin() | `src/lib/auth/permissions.ts` |

---

## How Authentication Works

### Login Flow

1. User submits credentials at `/login` via the React form.
2. `loginAction` (Server Action) is called with the form data.
3. Timing-safe username comparison runs first.
4. `bcryptjs.compare()` runs against `ADMIN_PASSWORD_HASH` — always runs even when env vars are not set (using `TIMING_DUMMY_HASH`) to prevent timing oracle attacks.
5. On success: session is created with `{ isLoggedIn: true, role: "admin", username }` and saved to an encrypted cookie.
6. On failure: a generic "Invalid credentials" error is returned after the same constant-time delay.

### Request Protection

Every request to `/admin/:path*` passes through `src/proxy.ts`:

1. Reads the `__admin_session` cookie from the request.
2. Unseals the cookie using the `SESSION_SECRET` environment variable.
3. Checks `session.isLoggedIn === true` AND `session.role === "admin"`.
4. If either check fails, redirects to `/login?from=<original-path>`.
5. On success: passes the request through with `NextResponse.next()`.

> **Why both checks?** `isLoggedIn` verifies a valid session exists.
> `role === "admin"` defends against session fixation or future role expansion
> where a non-admin session could be forged or reused.

### Logout Flow

1. `logoutAction` (Server Action) is called via a `<form action={logoutAction}>` submit.
2. Session is destroyed: `session.destroy()`.
3. User is redirected to `/login`.

---

## Environment Variables

### SESSION_SECRET

The encryption key for iron-session sealed cookies.

- **Minimum length:** 32 characters
- **Character set:** Any — base64 output is recommended for portability
- **Generation:** `openssl rand -base64 32`
- **When to rotate:** Immediately after a security incident. Rotating invalidates all active sessions.

### ADMIN_USERNAME

The admin login username.

- Stored and compared as plaintext.
- Comparison uses `timingSafeCompare()` from `src/lib/auth/actions.ts` to prevent timing attacks.

### ADMIN_PASSWORD_HASH

A bcryptjs hash of the admin password. Never stored in plaintext.

- **Algorithm:** bcrypt with cost factor 10–14 (12 recommended)
- **Generation:**
  ```bash
  node -e "require('bcryptjs').hash('yourpassword', 12).then(console.log)"
  ```
- **Validation:** The hash must start with `$2a$`, `$2b$`, or `$2y$`.
- **When to rotate:** Whenever the password changes, or after any suspected compromise.

---

## Session Configuration

Configured in `src/lib/auth/session.ts`:

| Setting | Value |
|---------|-------|
| Cookie name | `__admin_session` |
| Duration | 7 days (`ttl: 604800`) |
| HttpOnly | Yes — not accessible to client JavaScript |
| Secure | Yes in production, No in development |
| SameSite | `lax` |
| Path | `/` |

The session cookie is sealed with AES-GCM + HMAC via the Iron protocol (Web Crypto API). The cookie value is opaque — no session data is readable without the `SESSION_SECRET`.

---

## Security Properties

### Timing Attack Prevention

The login action always performs `bcryptjs.compare()`, even when credentials are missing or incorrect, using a pre-computed `TIMING_DUMMY_HASH`. This ensures every login attempt takes approximately the same amount of time, preventing attackers from inferring whether a username is valid based on response latency.

### Role Check in Proxy

The proxy checks `session.role === "admin"` in addition to `session.isLoggedIn`. This means:
- A valid session with `isLoggedIn: true` but without `role: "admin"` will be rejected.
- Future multi-role expansion won't inadvertently expose admin routes to non-admin sessions.

### Redirect Safety

The `sanitizeRedirect()` function in `src/lib/auth/actions.ts` validates any `from` query parameter:
- Must start with `/admin`.
- Must not start with `//` (open redirect prevention).
- Falls back to `/admin` if invalid.

---

## Rotating Credentials

### Changing the Password

1. Generate a new hash:
   ```bash
   node -e "require('bcryptjs').hash('yournewpassword', 12).then(console.log)"
   ```
2. Update `ADMIN_PASSWORD_HASH` in Hostinger's environment variable settings.
3. Redeploy the application.
4. Log in with the new password to verify.

### Rotating SESSION_SECRET

1. Generate a new secret:
   ```bash
   openssl rand -base64 32
   ```
2. Update `SESSION_SECRET` in Hostinger's environment variable settings.
3. Redeploy the application.
4. **Note:** All active sessions are immediately invalidated. Any logged-in user will be logged out and redirected to `/login`.

---

## Troubleshooting

### Admin Redirect Loop

**Symptom:** Navigating to `/admin` immediately redirects back to `/login` even after a successful login.

**Possible causes:**
1. `SESSION_SECRET` is missing or less than 32 characters — cookie cannot be sealed.
2. `SESSION_SECRET` was changed after the session was created — cookie cannot be unsealed.
3. Cookie is blocked by browser settings (Private mode with aggressive tracking protection).

**Resolution:** Verify `SESSION_SECRET` is set in Hostinger's environment variables and matches the value used to create existing sessions. Redeploy after any change.

### Login Always Fails

**Symptom:** Login form shows "Invalid username or password" even with correct credentials.

**Possible causes:**
1. `ADMIN_USERNAME` is not set or does not match the entered username.
2. `ADMIN_PASSWORD_HASH` is not set or is not a valid bcryptjs hash.
3. The hash was generated with a different plaintext than what's being entered.

**Resolution:** Regenerate `ADMIN_PASSWORD_HASH` using the generation command above. Verify `ADMIN_USERNAME` matches exactly (case-sensitive).

### 500 Error on /login Page

**Symptom:** The login page itself returns a 500 error.

**Possible cause:** `SESSION_SECRET` is missing and the error is not caught gracefully.

**Resolution:** The login page wraps `getSession()` in a try/catch and renders the form regardless. If the 500 persists, check the server-side logs for `[auth] SESSION_SECRET must be set` errors.

---

## Related Files

| File | Purpose |
|------|---------|
| `src/proxy.ts` | Route protection (Next.js 16 / Hostinger convention) |
| `src/lib/auth/session.ts` | Session configuration and `getSession()` helper |
| `src/lib/auth/actions.ts` | `loginAction` and `logoutAction` Server Actions |
| `src/lib/auth/permissions.ts` | `requireAdmin()` for page-level checks |
| `src/app/login/page.tsx` | Login page (Server Component) |
| `src/app/login/LoginForm.tsx` | Login form (Client Component) |
| `src/app/admin/health/page.tsx` | System health dashboard (shows auth config status) |
