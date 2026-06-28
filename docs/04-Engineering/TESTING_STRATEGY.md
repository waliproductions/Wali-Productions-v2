# Testing Strategy — Wali Productions Platform

Defines the recommended testing approach across all layers of the platform.
This is a strategy document — test implementations will be added incrementally
as data layers and service implementations are introduced.

---

## Testing Philosophy

- **Test behavior, not implementation.** Tests should verify what the code does,
  not how it does it. Internals can change without breaking tests.
- **Mock at boundaries, not at the core.** Mock external services (SMTP, AI APIs,
  SAM.gov). Never mock your own business logic.
- **Tests as documentation.** A passing test suite should describe what the system
  does. Test names should read like specifications.
- **Fail fast, fail clearly.** Tests should catch real regressions, not generate
  noise. A test that can never fail is not a test.

---

## Test Pyramid

```
              [E2E Tests]
           Cross-browser, full flows
              (smallest count)

          [Integration Tests]
       Service layer + API routes
        (moderate count, high value)

            [Unit Tests]
      Pure functions, validators, types
           (largest count, fast)
```

---

## 1. Unit Tests

**Target:** Pure functions with no I/O or side effects.

**Priority targets:**

| Module | Tests |
|--------|-------|
| `src/lib/contact/schema.ts` — `validateContactSubmission()` | Valid/invalid inputs, boundary conditions |
| `src/lib/auth/actions.ts` — `loginAction()` | Mock bcrypt.compare, session flow |
| `src/lib/admin/utils.ts` — `cn()`, `formatDate()`, `truncate()`, `isPending()` | All edge cases |
| `src/types/roles.ts` — `ROLE_PERMISSIONS` | Permission coverage completeness |
| Future service implementations | Every public method with ServiceResult<T> |

**Framework:** Jest + `@testing-library/react` for component tests.

**Run command (planned):** `npm run test:unit`

---

## 2. Integration Tests

**Target:** Service layer methods connecting to a real data store or external system.

**Key principles:**
- Use a real test database, not mocks. (Mocked tests passed; production migrations failed.)
- Seed minimal fixture data per test, clean up after each run.
- Each test is isolated — no shared state between tests.

**Priority targets when service implementations are added:**

| Service | Integration tests |
|---------|------------------|
| `ICrmService` | Organization CRUD, pipeline stage transitions, contact linkage |
| `IContractService` | Contract status transitions, task order creation, invoice lifecycle |
| `IProposalService` | Proposal volume assembly, compliance matrix, approval workflow |
| `IIdentityService` | Account creation, password verification, session lifecycle |
| Contact form API | `/api/contact` — valid submission, validation errors, SMTP failure handling |

**Framework:** Jest with a real SQLite or Postgres test instance.

**Run command (planned):** `npm run test:integration`

---

## 3. End-to-End Tests

**Target:** Critical user flows across the full browser stack.

**Priority flows:**

| Flow | Critical path |
|------|--------------|
| Admin login | Navigate to /admin → redirect to /login → enter credentials → land on dashboard |
| Admin logout | Click sign out → session destroyed → redirect to /login |
| Contact form submission | Fill form → submit → success state → email delivered |
| Admin contact review | Log in → navigate to /admin/contact → view submission detail |
| Portfolio admin | Add project → verify public /portfolio shows new entry |
| Session expiry | Let session expire → attempt admin page → redirect to /login |

**Framework:** Playwright (browser-native, supports Chromium/Firefox/WebKit).

**Run command (planned):** `npm run test:e2e`

**CI gate:** E2E tests run on every push to `main` against a staging environment.

---

## 4. Accessibility Testing

**Target:** All public-facing pages and admin portal pages.

**Manual standards:**
- WCAG 2.1 AA compliance.
- All interactive elements keyboard-accessible.
- Focus management tested for modals, drawers, and dialogs.
- Screen reader testing with NVDA (Windows) and VoiceOver (Mac).

**Automated:**
- `axe-core` integration via Playwright (`@axe-core/playwright`) — run on all pages.
- `eslint-plugin-jsx-a11y` in CI linting pipeline.
- Landmark regions, heading hierarchy, and ARIA labels on all pages.

**Run command (planned):** `npm run test:a11y`

---

## 5. Performance Testing

**Target:** Core Web Vitals on public-facing pages.

**Metrics and targets:**

| Metric | Target |
|--------|--------|
| LCP (Largest Contentful Paint) | < 2.5s |
| CLS (Cumulative Layout Shift) | < 0.1 |
| FID / INP (Interaction to Next Paint) | < 200ms |
| TTFB (Time to First Byte) | < 600ms |
| Lighthouse Performance score | > 90 |

**Tools:**
- Lighthouse CI in GitHub Actions on every PR.
- Web Vitals monitoring via `web-vitals` library (planned).

**Run command (planned):** `npm run test:perf`

---

## 6. Security Testing

**Target:** Authentication, authorization, and input validation.

**Automated checks:**
- `npm audit` — dependency vulnerability scan on every CI run.
- OWASP ZAP baseline scan against staging on release candidates.
- Semgrep rules for common injection patterns on every PR.

**Manual security reviews before releases:**
- Session cookie flags (HttpOnly, Secure, SameSite).
- No secrets in source code or build artifacts.
- All admin routes behind middleware session check.
- Input validation coverage on all public-facing forms.
- Pending values never rendered to the public site.

**Penetration testing:** Planned before first government contract submission.

---

## 7. TypeScript as Testing Infrastructure

TypeScript's strict mode (`"strict": true` in `tsconfig.json`) catches an entire
class of bugs at compile time:

- Type mismatches between API responses and expected shapes.
- Missing required properties on new type members.
- Incorrect return types in service interfaces.
- Undefined access on nullable fields.

**`npm run typecheck`** must pass with zero errors before any commit.

---

## 8. CI/CD Test Pipeline (Target State)

```
On PR:
  1. npm run typecheck      (zero errors required)
  2. npm run lint           (zero errors required)
  3. npm run test:unit      (all pass required)
  4. npm audit --audit-level=high  (no high/critical vulns)
  5. npm run build          (clean production build required)

On main merge:
  6. npm run test:integration  (all pass required)
  7. npm run test:e2e          (critical flows pass required)
  8. npm run test:a11y         (no WCAG AA violations)
  9. Lighthouse CI             (performance budgets met)
 10. Deploy to staging
 11. OWASP ZAP baseline scan

On release:
 12. Full regression suite
 13. Manual security review
 14. Deploy to production
```

---

## 9. Test Fixture Strategy

When the service layer has concrete implementations:

- Fixtures are defined in `tests/fixtures/` as typed factory functions.
- No shared global state between tests.
- Database is seeded and torn down per test file, not per test case.
- Government-sensitive fixture data uses obviously fake values (no real UEIs, CAGE codes, etc.).
- Contact form fixtures do not use real email addresses.

---

## Current Testing Coverage

| Layer | Status |
|-------|--------|
| TypeScript type checking | Active — `npm run typecheck` |
| Production build check | Active — `npm run build` |
| Unit tests | Not yet implemented |
| Integration tests | Not yet implemented |
| E2E tests | Not yet implemented |
| Accessibility tests | Not yet implemented |
| Performance tests | Not yet implemented |
| Security scans | Not yet implemented |

Testing infrastructure will be added in a future sprint once the first
service implementation (ICrmService or IIdentityService) is built.
