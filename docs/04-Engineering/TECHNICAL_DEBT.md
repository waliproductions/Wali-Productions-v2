# TECHNICAL_DEBT

## Purpose

This document tracks known technical issues, deferred improvements, and engineering enhancements for the Wali Productions LLC Digital Headquarters.

Technical debt items are intentionally documented so they are not forgotten. Deferred work should be reviewed during milestone planning and before production releases.

---

## TD-001

**Title:** Migrate ESLint to Flat Config

**Status:** Open

**Priority:** Medium

**Phase Identified:** Website Phase 3

**Description**

The project was upgraded to Next.js 16 and ESLint 9. The previous lint configuration is no longer compatible. A temporary placeholder lint script has been implemented so development can continue.

**Resolution Criteria**

- Implement the recommended ESLint Flat Config.
- Restore automated linting.
- Verify lint passes without placeholder commands.

---

## Future Items

Additional technical debt items will be recorded here as they are identified.
