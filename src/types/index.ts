/**
 * Shared TypeScript types used across config files and components.
 * Config-specific types (ServiceCard, PortfolioProject, etc.) remain
 * co-located with their config file for cohesion.
 */

/** Generic labeled link used for CTAs and navigation entries. */
export type Cta = {
  label: string;
  href: string;
};

/** Named identifier pair for code/title lookups (NAICS, PSC, etc.). */
export type CodeEntry = {
  code: string;
  title: string;
  description?: string;
  primary?: boolean;
};

/** Minimal status representation for items that may be pending or confirmed. */
export type VerificationStatus = "verified" | "pending" | "in-preparation";

/** A simple key–value pair used in description lists and detail views. */
export type LabeledValue = {
  label: string;
  value: string;
};
