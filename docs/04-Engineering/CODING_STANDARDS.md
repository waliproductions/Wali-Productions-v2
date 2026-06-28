# Coding Standards — Wali Productions v2

Standards for all code contributed to this project. Consistency here reduces
cognitive load and makes the codebase easier to audit, extend, and hand off.

---

## TypeScript

### Be explicit at boundaries

Type all function parameters and return values at module boundaries. Rely on
inference only for local variables where the type is obvious.

```ts
// Good — explicit at the boundary
export function buildMetadata(args: BuildMetadataArgs): Metadata { ... }

// Fine — inference is clear
const items = servicesContent.categories.flatMap((c) => c.services);
```

### Prefer `type` over `interface`

Use `type` for all shape declarations. Reserve `interface` only when a third-party
API requires it (e.g. `extends` for a library type).

### All optional fields must be truly optional

If a field is absent in any valid real-world record, make it optional. Do not
use sentinel values (`""`, `null`, `-1`) to indicate absence.

### No `any`. No suppressed errors.

`any` defeats the purpose of TypeScript. Use `unknown` for genuinely unknown
types and narrow with guards. Never use `// @ts-ignore` or `// @ts-expect-error`
without a co-located explanation of *why* the suppression is needed.

---

## React & Next.js

### Server Components by default

Every component is a Server Component unless it requires browser APIs or
interactivity. Do not add `"use client"` speculatively.

When a component needs client-side state, extract the interactive part into a
small `"use client"` leaf component and keep the parent as a Server Component.

### One component per file

Each file exports one primary named export. Closely related sub-components
(e.g. `Card`, `CardHeader`, `CardBody`) may coexist in one file when they
are always used together.

### No default exports from component files

Named exports make imports traceable and refactoring safe. Exception: Next.js
requires default exports from `page.tsx`, `layout.tsx`, and `route.ts` files.

### Props interface at the top of the file

Define prop types immediately before the component they describe.

---

## Styling

### Tailwind over inline styles

Use Tailwind utility classes. Inline `style` props are permitted only for
values that cannot be expressed as utilities (e.g. dynamic SVG data URI
backgrounds, CSS custom properties).

### Design tokens over arbitrary values

Prefer `bg-[#F8FAFC]` only when no semantic token exists. Add tokens to
`tailwind.config.ts` when a value is reused across three or more components.

### Dark mode

Use Tailwind's `dark:` prefix. Never use `prefers-color-scheme` media queries
in JS. The root CSS variables in `globals.css` handle dark-mode color switches.

### No magic numbers

Spacing values should be Tailwind scale values (e.g. `gap-4`, not `gap-[14px]`).
For values that must be exact, document *why* with a comment.

---

## Content

### Config files are the single source of truth

No business copy, product names, pricing, or marketing language belongs in
a component file. Everything goes in `src/config/*.ts`.

### Pending content pattern

Data that is not yet verified uses the `pending()` helper:

```ts
const pending = (note: string, source: string) =>
  `[ pending verified detail: ${note} — source: ${source} ]`;
```

Admin views detect this with:
```ts
value.toLowerCase().includes("pending verified detail")
```

Never display pending strings as factual information to users.

---

## Data Safety

### Authorization before publication

`PastPerformanceRecord.authorized` must be `true` before a record appears in
any proposal or public-facing content.

Client names, project details, and private information are never published
without explicit authorization from the client.

### No invented identifiers

Do not fabricate UEI, CAGE code, NAICS code, PSC code, contract numbers, or
certification reference numbers. Use the `pending()` pattern until official
values are issued.

---

## Files and Naming

| Pattern | Example |
|---------|---------|
| React components | `PascalCase.tsx` |
| Utility functions | `camelCase.ts` |
| Config files | `kebab-case.ts` |
| Type files | `kebab-case.ts` |
| Next.js pages | `page.tsx`, `layout.tsx`, `route.ts` (lowercase, framework-required) |

### Directory policy

- `src/components/ui/` — reusable primitives with no business logic
- `src/components/portal/` — portal shell and navigation
- `src/components/admin/` — admin portal components (dark theme)
- `src/components/<page>/` — page-specific components (thin wrappers)
- `src/config/` — all content and site data
- `src/types/` — cross-cutting business domain types
- `src/lib/` — utilities, auth, SEO helpers

---

## Comments

Write no comments by default. Add a comment only when the *why* is non-obvious
and would not be clear to a reader unfamiliar with this codebase:

- A hidden constraint or invariant
- A workaround for a specific external bug
- A pending state that will change when data becomes available

Do not explain what the code does (well-named identifiers do that).
Do not reference ticket numbers or PR descriptions in source files.

---

## Commits

Use Conventional Commits (`feat`, `fix`, `refactor`, `docs`, `chore`).

Commit message format:
```
<type>(<scope>): <short imperative description>

<optional body — explain WHY, not WHAT>
```

- One logical change per commit
- TypeScript must pass before committing
- Build must pass before pushing
- Never include `Co-Authored-By` AI attribution in commits
