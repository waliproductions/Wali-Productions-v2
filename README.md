# Wali Productions v2

The official digital headquarters of Wali Productions LLC — Christian Veteran-Owned Technology & Digital Solutions.

---

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4
- **Auth:** iron-session v8 + bcryptjs v3
- **Email:** Nodemailer
- **Runtime:** Node.js ≥ 18.18

---

## Prerequisites

- Node.js ≥ 18.18
- npm ≥ 9

---

## Getting Started

```bash
# Install dependencies
npm install

# Copy and configure environment variables
cp .env.example .env.local
# Edit .env.local — see Environment Variables below

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the public site.
The admin portal is at [http://localhost:3000/admin](http://localhost:3000/admin).

---

## Environment Variables

All required environment variables are documented in `.env.example`.

| Variable | Required | Purpose |
|----------|----------|---------|
| `ADMIN_USERNAME` | Yes | Admin portal login username |
| `ADMIN_PASSWORD_HASH` | Yes | bcryptjs hash of admin password |
| `SESSION_SECRET` | Yes | iron-session encryption key (min 32 chars) |
| `SMTP_HOST` | For email | SMTP server hostname |
| `SMTP_PORT` | For email | SMTP server port |
| `SMTP_USER` | For email | SMTP authentication username |
| `SMTP_PASS` | For email | SMTP authentication password |
| `SMTP_FROM` | For email | Sender address for contact emails |
| `CONTACT_EMAIL` | For email | Recipient address for contact form submissions |

### Generating credentials

```bash
# Generate ADMIN_PASSWORD_HASH
node -e "require('bcryptjs').hash('your-password', 12).then(h => console.log(h))"

# Generate SESSION_SECRET
openssl rand -base64 32
```

---

## Project Structure

```
src/
  app/                  # Next.js App Router pages and layouts
    (public)/           # Public-facing pages (home, portfolio, government, contact)
    admin/              # Admin portal pages (protected by proxy)
    login/              # Login page (public)
    api/                # API routes (contact form)
  components/
    admin/              # Admin UI component library
    government/         # Public government page components
    home/               # Public home page components
    shared/             # Shared UI (Navbar, Footer, etc.)
  config/               # All site content and data (config-driven architecture)
  lib/
    admin/              # Admin utilities (contact dashboard, types, utils)
    auth/               # Authentication (session, actions, permissions)
    seo.ts              # Metadata helpers
  proxy.ts              # Next.js 16 route protection proxy
docs/                   # Project documentation
app-data/               # Runtime contact submissions and audit log (gitignored)
```

---

## Architecture

### Config-Driven Content

All site content lives in `src/config/`. Pages import config objects — no hardcoded copy in components.

- `src/config/site.ts` — company identity and site metadata
- `src/config/government.ts` — government contracting content (read-only)
- `src/config/government-center.ts` — government admin data (capability domains, documents)
- `src/config/portfolio.ts` — portfolio projects
- `src/config/about.ts`, `contact.ts`, `home.ts`, etc.

### Authentication

Admin routes are protected by `src/proxy.ts` (Next.js 16 proxy). Unauthenticated requests to `/admin/*` redirect to `/login`. Sessions use iron-session sealed cookies — no database or session store required.

### Contact Pipeline

The contact form (`/contact`) posts to `/api/contact`. Submissions are written to `app-data/contact-submissions/queue/` as JSON files and an audit event is appended to `app-data/contact-submissions/logs/events.jsonl`. Email delivery via Nodemailer is attempted immediately; failures are logged but do not affect submission storage.

---

## Scripts

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run start        # Start production server
npm run typecheck    # Run TypeScript type checking
npm run lint         # Run ESLint
```

---

## Admin Portal

The admin portal (`/admin`) requires authentication. After setting up credentials:

1. Visit `/login`
2. Sign in with your `ADMIN_USERNAME` and the password used to generate `ADMIN_PASSWORD_HASH`
3. The `/admin/settings` page shows which environment variables are configured

The admin portal is read-only. All content changes require editing the config files in `src/config/` and redeploying.

---

## Documentation

Extended documentation is in the `docs/` directory:

| Directory | Contents |
|-----------|---------|
| `docs/01-Business/` | Business capabilities, information, model |
| `docs/02-Government/` | Government contracting documents (capability statement, certifications, NAICS policy, etc.) |
| `docs/03-Brand/` | Brand guidelines and identity |
| `docs/04-Engineering/` | Engineering standards and architecture |
| `docs/09-Release/` | Release checklists and deployment guides |
| `docs/releases/` | Per-version release notes |
