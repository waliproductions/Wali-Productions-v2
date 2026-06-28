# Security Assumptions — Wali Productions Platform

Documents the explicit security assumptions the platform relies on.
These must remain true for the security model to hold. Any change to
these conditions requires a security architecture review.

---

## Hosting & Infrastructure

1. **Hostinger provides TLS termination.** All production traffic is encrypted in
   transit. The platform does not implement its own TLS.

2. **The server runtime is trusted.** The Node.js process has exclusive access to
   environment variables. No multi-tenant environment where other processes could
   read env vars.

3. **The filesystem is writable by the application process** for contact form
   submission logging. Production deployment assumes the data directory persists
   between deploys.

4. **GitHub repository is private.** Source code, including configuration structure,
   is not publicly visible.

---

## Secrets & Credentials

5. **Environment variables are the only secrets store.** No secrets are hardcoded,
   committed to source control, or embedded in build artifacts.

6. **`SESSION_SECRET` is at least 32 characters** and is not reused across environments.
   Rotation requires coordinated session invalidation.

7. **`ADMIN_PASSWORD_HASH` is a bcryptjs hash**, never a plaintext password. The
   plaintext password is never stored anywhere in the system.

8. **SMTP credentials in `SMTP_*` env vars** have send-only permissions — they cannot
   read email, access other mailboxes, or perform administrative email operations.

---

## Authentication

9. **The `__admin_session` cookie is not accessible to JavaScript** (`HttpOnly` flag).
   XSS attacks cannot steal session cookies.

10. **Session tokens are cryptographically sealed** using iron-session (AES-GCM + HMAC
    via Web Crypto API). A stolen cookie cannot be decrypted without `SESSION_SECRET`.

11. **Session expiration is enforced server-side.** Expired sessions cannot be reused
    even if the cookie is retained by the browser.

12. **The login page at `/login` is never behind the admin session check.** There is
    no redirect loop possible.

13. **Server Actions run only on the server.** They are not exposed as public HTTP
    endpoints. Client-side code cannot call them directly without going through Next.js.

---

## Authorization

14. **The `founder` role is assigned exclusively to Wali Johnson.** It is not assignable
    through any automated flow — only through direct environment configuration or database
    update by a trusted operator.

15. **Admin portal routes are protected at the middleware layer**, not just at the page
    component layer. Bypassing a page component does not bypass authentication.

16. **The public site (`/`, `/government`, `/portfolio`, etc.) contains no server-side
    references to admin-only data.** No data leakage is possible through the public routes.

---

## Data Handling

17. **`PastPerformanceRecord.authorized` must be explicitly `true`** before any record
    is referenced in a proposal or public document. The pending pattern prevents
    accidental publication of unverified government data.

18. **`Client.internalNotes` is never rendered to the client portal.** Admin-only
    fields are never passed to client-facing components.

19. **Contact form submissions are stored on the local filesystem**, not in a remote
    database. This is appropriate for current scale but must be re-evaluated before
    processing more than a few hundred submissions per day or before handling PII
    under formal data processing agreements.

---

## Supply Chain

20. **Dependencies are pinned in `package.json`** with lockfile (`package-lock.json`)
    committed. Dependency updates require explicit action.

21. **`bcryptjs` is used instead of `bcrypt`** specifically to avoid native binary
    compilation (no C++ bindings). This eliminates a class of build-time supply chain
    risk on Hostinger shared hosting.

22. **No CDN-hosted scripts are used.** All JavaScript is bundled by Next.js from
    explicitly-installed packages. No external script tags from third parties.

---

## Assumptions That Will Change

The following assumptions are acceptable for the current scale but are expected
to change as the platform grows:

| Assumption | Expected change |
|------------|----------------|
| Single admin account | Multiple role-based accounts with RBAC enforcement |
| Filesystem contact log | Database-backed submission storage |
| No MFA | TOTP second factor required for founder + admin roles |
| No rate limiting | Login endpoint and API rate limiting via middleware |
| No audit database | Immutable audit records in persistent storage |
| Single server instance | Load-balanced instances with shared session store |
| No secret rotation | Automated rotation policy with admin notification |
| Environment-only secrets | Vault or cloud secret manager integration |
