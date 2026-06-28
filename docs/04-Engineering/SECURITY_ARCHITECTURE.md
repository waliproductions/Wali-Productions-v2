# Security Architecture — Wali Productions Platform

Defines the security design, layer responsibilities, and implementation roadmap
for the platform. All security decisions are made with enterprise production
deployment in mind, including future government contract work.

---

## Security Layers

The platform uses a defense-in-depth model with distinct security responsibilities
at each layer.

```
Browser
  └── HTTPS / TLS (hosting layer)
        └── Secure Headers (middleware)
              └── Authentication (session check)
                    └── Authorization (RBAC + permission groups)
                          └── Input Validation (boundary validation)
                                └── Audit Trail (immutable logging)
```

---

## 1. Transport Security

**Current:**
- Hostinger Node.js hosting provides TLS termination.
- All production traffic is HTTPS.
- HTTP → HTTPS redirect is handled at the hosting layer.

**Planned:**
- HSTS header with `max-age=31536000; includeSubDomains; preload`
- Certificate pinning consideration for government-facing environments.

---

## 2. Authentication

**Current implementation (`src/middleware.ts`, `src/lib/auth/`):**

| Component | Implementation |
|-----------|---------------|
| Session storage | iron-session sealed cookie (`AES-GCM + HMAC via Web Crypto API`) |
| Cookie name | `__admin_session` |
| Cookie flags | `HttpOnly, Secure, SameSite=lax, Path=/` |
| Session TTL | 7 days (`ttl: 604800`) |
| Password hashing | bcryptjs with salt factor 10 |
| Secret key | `SESSION_SECRET` env var (minimum 32 characters) |
| Route protection | Middleware on `/admin/:path*` — missing session → redirect to `/login` |
| Login | Server Action (`loginAction`) — bcrypt.compare → session.save → redirect |
| Logout | Server Action (`logoutAction`) — session.destroy → redirect |

**Credential configuration:**

| Variable | Purpose |
|----------|---------|
| `ADMIN_USERNAME` | Admin login username (plain string) |
| `ADMIN_PASSWORD_HASH` | bcryptjs hash of password (never store plaintext) |
| `SESSION_SECRET` | iron-session encryption key (≥32 chars, generate with `openssl rand -base64 32`) |

**Planned authentication enhancements:**

- OAuth 2.0 / OIDC (Microsoft 365, Google Workspace)
- SAML 2.0 for enterprise SSO
- TOTP-based MFA (Authenticator apps)
- SMS/Email second factor
- Account lockout after configurable failed attempts
- Password reset workflow (token-based, time-limited)
- Session persistence in database with IP and user-agent recording

---

## 3. Authorization

**Current implementation (`src/types/roles.ts`):**

Authorization is type-defined only — enforcement is not yet wired to the auth layer.

| Role | Primary scope |
|------|--------------|
| `founder` | Full access to all platform resources |
| `admin` | Full access except system settings:write |
| `operations` | Clients, projects, proposals, analytics |
| `contracts` | Gov contracting, proposals, analytics |
| `knowledge` | Knowledge base read/write |
| `viewer` | Admin read + analytics read |

**Permission model:**

Permissions follow the pattern `resource:action` (e.g., `proposals:write`, `contracts:read`).
`ROLE_PERMISSIONS` maps each role to its allowed permission set. When RBAC is wired
to the session, `requireAuth(permission)` helpers will check the session role against
this map before executing any sensitive operation.

**Planned authorization enhancements (v0.9 types defined in `src/types/identity.ts`):**

- `PermissionGroup` — named groups of permissions assignable to users
- `UserPermissionAssignment` — time-limited group membership with expiration
- Fine-grained resource policies (row-level security preparation)
- `requireAdmin()` and `requirePermission()` middleware helpers
- API route permission checking

---

## 4. Input Validation

**Current:**
- `validateContactSubmission()` in `src/lib/contact/schema.ts` validates the public
  contact form at the system boundary. Never trusts client-supplied data.
- All admin pages are server components — no client-submitted mutations yet.

**Planned (`src/types/security.ts` — `ValidationSchema`):**

- Centralized `ValidationSchema` definitions for all entity types
- `ValidationRule` set with 13 rule types (`required`, `min-length`, `pattern`, `no-html`, `enum`, etc.)
- `stripUnknownFields: true` by default on all schemas
- No HTML injection allowed in any user-supplied field

---

## 5. Secure Headers

**Planned (next hardening cycle):**

```
Content-Security-Policy: default-src 'self'; script-src 'self'; ...
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Resource-Policy: same-origin
```

Implementation target: `src/middleware.ts` — applied to all responses before routing.

---

## 6. CSRF Protection

**Current:**
- Server Actions and `POST` API routes are the only mutation entry points.
- Next.js App Router Server Actions include built-in origin checking (same-host only).
- The `/api/contact` route validates request shape via `validateContactSubmission()`.

**Planned:**
- Double-submit cookie strategy for external API clients.
- Explicit `Origin` header checking on all mutation endpoints.

---

## 7. Rate Limiting

**Planned:**

- Login endpoint: max 5 attempts per 15-minute window per IP.
- Contact form: max 3 submissions per hour per IP.
- API endpoints: configurable per-route via `RateLimitPolicy` (`src/types/security.ts`).
- Implementation target: `src/middleware.ts` edge function or edge-compatible KV store.

---

## 8. Audit Trail

**Current:**
- Contact form submissions are logged to the filesystem with lifecycle status tracking.
- `getContactAuditEvents()` provides contact pipeline audit history.

**Planned (`src/types/security.ts` — `AuditRecord`):**

- Immutable audit records for all sensitive operations.
- Fields: `userId`, `action`, `entityType`, `entityId`, `before`, `after`, `ipAddress`, `requestId`.
- Retention: minimum 7 years for government contract-adjacent operations.
- Storage: future database implementation — never filesystem for production audit data.
- Covered operations: all CRUD on proposals, contracts, projects, user accounts, and permissions.

---

## 9. Secret Management

**Current:**
- All secrets in environment variables (`.env.local` for dev, hosting dashboard for production).
- `.env.example` documents all required variables with generation instructions.
- No secrets committed to source control.

**Planned (`src/types/security.ts` — `SecretRotationPolicy`):**

- Configurable rotation schedule per secret.
- Admin notification N days before rotation is due.
- `SESSION_SECRET` rotation: requires coordinated session invalidation.
- Future: Vault / AWS Secrets Manager / Azure Key Vault integration.

---

## 10. Security Events & Monitoring

**Planned (`src/types/security.ts` — `SecurityEvent`, `SecurityAlert`):**

- 24 event types recorded across the full authentication and authorization lifecycle.
- Severity levels: info, low, medium, high, critical.
- `SecurityAlert` wraps one or more events into an actionable item with status tracking.
- Admin UI: `/admin/security/events`, `/admin/security/sessions`.
- Future: real-time alerting via notification provider when severity is `high` or `critical`.

---

## Security Assumptions

See `docs/04-Engineering/SECURITY_ASSUMPTIONS.md` for the full baseline assumption list.

---

## Threat Model Summary

| Threat | Mitigation |
|--------|-----------|
| Credential theft | bcrypt hashing, no plaintext storage |
| Session hijacking | iron-session AES-GCM, HttpOnly, Secure flags |
| Unauthorized admin access | Middleware session check on all `/admin/*` routes |
| XSS | Server Components (no innerHTML), planned CSP |
| CSRF | Server Actions with origin checking, planned double-submit |
| Brute force | Planned rate limiting + account lockout |
| Injection | Input validation at system boundary, parameterized queries (when DB added) |
| Secrets exposure | Env vars only, never source control, planned rotation policy |
| Audit evasion | Planned immutable audit records with before/after state |
| Privilege escalation | RBAC type model, planned enforcement middleware |

---

## Government Contract Security Considerations

For federal government contract work, the following additional controls are
tracked separately and documented in `docs/02-Government/`:

- Clearance level tracking for employees (`EmployeeAccount.clearanceLevel`)
- Information handling controls for CUI (Controlled Unclassified Information)
- Future: NIST SP 800-171 compliance checklist
- Future: FedRAMP considerations for cloud-hosted components
- AI provider selection for government: Azure OpenAI (FedRAMP eligible) over commercial APIs
