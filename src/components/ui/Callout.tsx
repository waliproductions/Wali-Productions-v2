import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export type CalloutVariant = "info" | "success" | "warning" | "tip" | "note";

type CalloutProps = {
  variant?: CalloutVariant;
  title?: string;
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
};

const variantStyles: Record<
  CalloutVariant,
  { wrapper: string; iconWrapper: string; title: string; body: string; defaultIcon: ReactNode }
> = {
  info: {
    wrapper: "border-[#4A7DB5]/30 bg-[#F0F4F8]",
    iconWrapper: "text-[#1E3A5F]",
    title: "text-[#1E3A5F]",
    body: "text-[#1E3A5F]/80",
    defaultIcon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4M12 8h.01" />
      </svg>
    ),
  },
  success: {
    wrapper: "border-emerald-200 bg-emerald-50",
    iconWrapper: "text-emerald-600",
    title: "text-emerald-800",
    body: "text-emerald-700",
    defaultIcon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <path d="M22 4 12 14.01l-3-3" />
      </svg>
    ),
  },
  warning: {
    wrapper: "border-amber-200 bg-amber-50",
    iconWrapper: "text-amber-600",
    title: "text-amber-800",
    body: "text-amber-700",
    defaultIcon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
        <path d="M12 9v4M12 17h.01" />
      </svg>
    ),
  },
  tip: {
    wrapper: "border-violet-200 bg-violet-50",
    iconWrapper: "text-violet-600",
    title: "text-violet-800",
    body: "text-violet-700",
    defaultIcon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7Z" />
        <path d="M9 21h6" />
        <path d="M9 17v1h6v-1" />
      </svg>
    ),
  },
  note: {
    wrapper: "border-neutral-200 bg-neutral-50",
    iconWrapper: "text-neutral-500",
    title: "text-neutral-700",
    body: "text-neutral-600",
    defaultIcon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="5" y="3" width="14" height="18" rx="2" />
        <path d="M9 7h6M9 11h6M9 15h4" />
      </svg>
    ),
  },
};

export function Callout({
  variant = "note",
  title,
  children,
  icon,
  className,
}: CalloutProps) {
  const styles = variantStyles[variant];
  const renderedIcon = icon ?? styles.defaultIcon;

  return (
    <div
      className={cn(
        "flex gap-3 rounded-xl border px-4 py-4",
        styles.wrapper,
        className
      )}
      role="note"
    >
      <div className={cn("mt-0.5 h-5 w-5 shrink-0", styles.iconWrapper)}>
        {renderedIcon}
      </div>
      <div className="min-w-0">
        {title ? (
          <p className={cn("mb-1 text-sm font-semibold", styles.title)}>{title}</p>
        ) : null}
        <div className={cn("text-sm leading-relaxed", styles.body)}>{children}</div>
      </div>
    </div>
  );
}
