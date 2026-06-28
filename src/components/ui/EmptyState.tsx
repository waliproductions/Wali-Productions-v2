import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type EmptyStateAction = {
  label: string;
  href?: string;
  onClick?: () => void;
};

type EmptyStateProps = {
  /** Optional icon or illustration rendered above the title. */
  icon?: ReactNode;
  title: string;
  description?: string;
  /** Primary CTA — can be a link or a button. */
  action?: EmptyStateAction;
  /** Secondary CTA (link only). */
  secondaryAction?: EmptyStateAction;
  variant?: "default" | "muted";
  className?: string;
};

const DEFAULT_ICON = (
  <svg
    className="h-12 w-12 text-neutral-300"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth={1}
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H6.911a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z"
    />
  </svg>
);

export function EmptyState({
  icon,
  title,
  description,
  action,
  secondaryAction,
  variant = "default",
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center px-6 py-16 text-center",
        variant === "muted" && "rounded-xl bg-[#F8FAFC] border border-black/10",
        className
      )}
    >
      <div className="mb-4">{icon ?? DEFAULT_ICON}</div>
      <h3 className="font-display text-base font-semibold tracking-tight text-neutral-900">
        {title}
      </h3>
      {description && (
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-neutral-500">{description}</p>
      )}
      {(action || secondaryAction) && (
        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          {action &&
            (action.href ? (
              <Link
                href={action.href}
                className="inline-flex items-center rounded-lg bg-[#0D1B2A] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1E3A5F]"
              >
                {action.label}
              </Link>
            ) : (
              <button
                type="button"
                onClick={action.onClick}
                className="inline-flex items-center rounded-lg bg-[#0D1B2A] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1E3A5F]"
              >
                {action.label}
              </button>
            ))}
          {secondaryAction &&
            (secondaryAction.href ? (
              <Link
                href={secondaryAction.href}
                className="text-sm font-medium text-[#4A7DB5] underline-offset-4 hover:underline"
              >
                {secondaryAction.label}
              </Link>
            ) : (
              <button
                type="button"
                onClick={secondaryAction.onClick}
                className="text-sm font-medium text-[#4A7DB5] underline-offset-4 hover:underline"
              >
                {secondaryAction.label}
              </button>
            ))}
        </div>
      )}
    </div>
  );
}
