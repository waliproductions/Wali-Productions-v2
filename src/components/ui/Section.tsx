import type { ReactNode } from "react";

type SectionProps = {
  id?: string;
  labelledById?: string;
  className?: string;
  children: ReactNode;
};

export function Section({ id, labelledById, className = "", children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledById}
      className={`scroll-mt-20 py-20 sm:py-24 lg:py-28 ${className}`.trim()}
    >
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

type SectionEyebrowProps = {
  children: ReactNode;
  variant?: "default" | "gold" | "light";
};

export function SectionEyebrow({ children, variant = "default" }: SectionEyebrowProps) {
  const colorClass =
    variant === "gold"
      ? "text-gold"
      : variant === "light"
      ? "text-neutral-400"
      : "text-neutral-500 dark:text-neutral-400";

  return (
    <p className={`text-xs font-semibold uppercase tracking-[0.14em] ${colorClass}`}>
      {children}
    </p>
  );
}
