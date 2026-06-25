import type { ReactNode } from "react";

type SectionProps = {
  /** Anchor id for in-page navigation. */
  id?: string;
  /** id of the section heading, wired to aria-labelledby. */
  labelledById?: string;
  /** Optional extra classes for background/spacing overrides. */
  className?: string;
  children: ReactNode;
};

/**
 * Consistent homepage section wrapper: centered content column, shared vertical
 * rhythm, and an accessible <section> landmark. Keeps every section aligned with
 * the Navbar/Footer container width (max-w-content).
 */
export function Section({ id, labelledById, className = "", children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledById}
      className={`scroll-mt-20 py-16 sm:py-20 lg:py-24 ${className}`.trim()}
    >
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

type SectionEyebrowProps = { children: ReactNode };

export function SectionEyebrow({ children }: SectionEyebrowProps) {
  return (
    <p className="text-sm font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
      {children}
    </p>
  );
}
