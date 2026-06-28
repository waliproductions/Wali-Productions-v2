# Design Conventions — Wali Productions v2

Visual and UX conventions that produce a consistent, premium appearance.
Read alongside CODING_STANDARDS.md and ARCHITECTURE.md.

---

## Design Vocabulary

The platform uses a professional enterprise aesthetic — navy authority,
steel blue accents, white space, and restrained gold identity touches.

It should feel like the digital presence of a disciplined, trustworthy firm —
not a startup landing page or a government procurement portal clone.

---

## Spacing System

All vertical rhythm uses Tailwind's `py-20 sm:py-24 lg:py-28` pattern for
major sections. Use the `Section` component from `src/components/ui/Section.tsx`
to enforce this automatically.

Horizontal padding: `px-4 sm:px-6 lg:px-8` inside a `max-w-content` container.

Card internal padding: `p-6` or `px-6 py-5`.

---

## Page Structure

### Public pages

```
<PageHero />           — gradient dark section with h1
<Section />            — NarrativeBlock (two-column text)
<Section />            — Feature grid or category cards
<Section />            — Additional content (light or muted bg)
<GradientCTA />        — Full-width gradient with white CTA button
```

### Portal module pages

```
<div> heading + badge
<Alert />              — if relevant context needed
<MetricCard grid />    — optional metrics row
<Card>                 — main content or EmptyState
<Card variant="muted"> — supporting info ("what this includes")
```

---

## Color Usage Rules

### Gold (`text-gold`, `#B8831A`)

- Eyebrow labels only ("Our Services", "Government Contracting")
- Never used for interactive elements, buttons, or body text
- The gold is the brand identity accent — use it sparingly

### Steel blue (`#4A7DB5`)

- Accent bars under headings
- Icon fills in muted containers
- Active nav states
- Badge variants
- Glow orbs on dark sections (10% opacity)
- Link hover states

### Navy gradient (`from-[#0D1B2A] via-[#1E3A5F] to-[#2B4C7E]`)

- All hero sections
- All CTA sections
- Never used for section backgrounds between content sections

### `#F8FAFC`

- Alternating section background (muted tone)
- Card `variant="muted"`
- Portal page background

### `#F0F4F8`

- Icon containers (48×48 or 56×56)
- Info badge backgrounds
- MetricCard icon slot

---

## Typography

### Headings

- H1 (hero): `font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight`
- H2 (section): `font-display text-3xl sm:text-4xl font-bold tracking-tight`
- H3 (card): `font-display text-lg font-semibold tracking-tight`
- Portal module H1: `font-display text-2xl font-bold tracking-tight text-[#0D1B2A]`

Always use `font-display` for headings. Reserve `font-sans` (Inter) for body text.

### Body text

- Large body: `text-lg leading-relaxed text-neutral-600`
- Standard body: `text-base leading-relaxed text-neutral-600 dark:text-neutral-400`
- Small / metadata: `text-sm text-neutral-500`
- Eyebrow: `text-xs font-semibold uppercase tracking-[0.14em]` or `tracking-[0.18em]`

### On dark backgrounds

- Headline: `text-white`
- Body: `text-[#94A3B8]`
- Eyebrow gold: `text-gold`
- Eyebrow neutral: `text-[#94A3B8]`

---

## Card Patterns

### Standard content card

```tsx
<div className="rounded-xl border border-black/10 bg-white p-6 shadow-card transition-all hover:shadow-card-hover hover:border-[#4A7DB5]/25 dark:border-white/10 dark:bg-white/[0.03]">
  <div className="mb-4 h-0.5 w-8 bg-[#4A7DB5]" /> {/* accent bar */}
  <h3 className="font-display text-lg font-semibold tracking-tight">Title</h3>
  <p className="mt-2.5 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">…</p>
</div>
```

### Icon card (service categories)

```tsx
<div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#F0F4F8] text-[#1E3A5F]">
  {icon}  {/* 24×24 SVG */}
</div>
```

---

## Dark Section Markup Template

All gradient sections follow this exact pattern for visual consistency:

```tsx
const DOT_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='1' cy='1' r='1' fill='white' fill-opacity='0.07'/%3E%3C/svg%3E")`;

<section aria-labelledby="…" className="relative overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-br from-[#0D1B2A] via-[#1E3A5F] to-[#2B4C7E]" aria-hidden="true" />
  <div className="absolute inset-0" aria-hidden="true" style={{ backgroundImage: DOT_BG }} />
  <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#4A7DB5] opacity-10 blur-3xl" aria-hidden="true" />
  <div className="relative mx-auto max-w-content px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
    {/* content */}
  </div>
</section>
```

Use `PageHero` and `GradientCTA` primitives to avoid duplicating this pattern.

---

## CTA Buttons

### On dark sections (gradient backgrounds)

```tsx
<Link href="…" className="inline-flex items-center rounded-lg bg-white px-7 py-3.5 text-base font-semibold text-[#0D1B2A] shadow-sm transition-colors hover:bg-[#F0F4F8]">
  Button text
</Link>
```

### On light sections

```tsx
<Link href="…" className="inline-flex items-center rounded-lg bg-[#0D1B2A] px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-[#1E3A5F]">
  Button text
</Link>
```

Or use the `Button` primitive from `src/components/ui/Button.tsx`.

---

## Accessibility Rules

- Every `<section>` needs either `aria-labelledby` pointing to its heading or `aria-label`
- SVG icons that are decorative: `aria-hidden="true"`
- SVG icons that carry meaning: `role="img"` + `aria-label`
- Form fields: `<label htmlFor="…">` + matching `id` on the input
- Error messages: `role="alert"` for dynamic errors
- Skip nav link: always the first focusable element in the layout
- Focus ring: `focus-visible:ring-2 focus-visible:ring-[#1E3A5F] focus-visible:ring-offset-1`

---

## Semantic HTML

- Use `<section aria-labelledby="…">` for major page regions
- Use `<article>` for self-contained content blocks (portfolio cards, project items)
- Use `<nav aria-label="…">` for navigation regions
- Use `<dl>`/`<dt>`/`<dd>` for labeled data (registration status, contact info)
- Use `<ul role="list">` for navigation lists to restore list semantics in Safari

---

## What to Avoid

- Dark backgrounds for content sections between light sections — maintain a clear light/dark rhythm
- More than two gradient sections per page
- Gold as a background color
- Font sizes below `text-xs` for UI text (accessibility)
- Click targets smaller than 44×44px (WCAG 2.5.5)
- `cursor-pointer` on elements that are already `<button>` or `<a>` — the browser handles this
- Placeholder text as the only label for a form field (always include a `<label>`)
