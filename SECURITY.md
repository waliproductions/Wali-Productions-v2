# SECURITY

## Purpose

This document defines security expectations for the Wali Productions LLC Digital Headquarters repository.

---

## Sensitive Information

Do not commit sensitive information to this public repository.

Sensitive information includes:

- Passwords and password hashes
- API keys and private tokens
- Session secrets and encryption keys
- UEI, CAGE Code, and other government identifiers
- Banking and tax information
- Private client information
- Internal government contracting documents
- Personal identification documents
- Confidential business records

Sensitive business information belongs in the private internal repository.

---

## Authentication

### Route Protection — `src/proxy.ts`

All `/admin/*` routes are protected by `src/proxy.ts`, the Next.js 16 proxy layer. Unauthenticated requests are redirected to `/login`. The proxy uses `unsealData` (iron-session read-only API) to verify the session cookie without needing write access to the cookie store.

The proxy is the first layer of defense. Server components and Server Actions perform a second independent check via `requireAdmin()` in `src/lib/auth/permissions.ts`.

### Session Management — iron-session v8

Admin sessions are sealed cookies using the [Iron protocol](https://hapi.dev/family/iron/) — AES-GCM encryption with HMAC integrity verification. No server-side session store (database, Redis, etc.) is required.

Session cookie properties:

| Property | Value |
|----------|-------|
| Name | `__admin_session` |
| HttpOnly | Yes — not readable from JavaScript |
| Secure | Yes in production (`NODE_ENV=production`) |
| SameSite | Lax |
| Path | `/` |
| TTL | 7 days |

### `SESSION_SECRET`

The `SESSION_SECRET` environment variable is the encryption key for iron-session. Requirements:

- Minimum 32 characters (enforced at startup)
- Must be random and unpredictable — do not use a human-readable password
- Changing this value invalidates all existing sessions immediately

Generate a secure value:

```bash
openssl rand -base64 32
```

### Password Hashing — bcryptjs v3

Admin passwords are stored as bcryptjs hashes only. The plaintext password is never stored or logged. The `ADMIN_PASSWORD_HASH` environment variable holds the bcryptjs hash at cost factor 12.

Generate a hash:

```bash
node -e "require('bcryptjs').hash('your-password', 12).then(h => console.log(h))"
```

The login Server Action always runs `bcryptjs.compare()` regardless of whether the username matches, to prevent timing-based username enumeration.

### `ADMIN_PASSWORD_HASH`

Holds the bcryptjs hash of the admin portal password. This is safe to store in environment variables because bcryptjs hashes are designed to be one-way — the plaintext cannot be recovered from the hash.

Do not commit this value to the repository. Configure it in the hosting environment's env var panel.

---

## Environment Variables

Use `.env.example` for sample variable names only. Never commit `.env.local` or any real credential file.

All authentication-sensitive variables:

| Variable | Purpose | Required |
|----------|---------|----------|
| `ADMIN_USERNAME` | Admin portal login username | Yes |
| `ADMIN_PASSWORD_HASH` | bcryptjs hash of admin password | Yes |
| `SESSION_SECRET` | iron-session AES-GCM encryption key (min 32 chars) | Yes |

The `/admin/settings` page shows which of these variables are configured (presence only — values are never displayed).

---

## Reporting Security Issues

Security concerns should be reported directly to the Founder.

Do not publicly disclose vulnerabilities before they are reviewed.

---

## Repository Security

All contributors are expected to protect repository access and avoid exposing credentials.

---

## AI Security

AI assistants must not invent, expose, or request sensitive business information unless explicitly directed by the Founder in an appropriate private context.
