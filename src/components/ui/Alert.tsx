"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type AlertVariant = "info" | "success" | "warning" | "error";

type AlertProps = {
  children: ReactNode;
  variant?: AlertVariant;
  title?: string;
  /** Whether the user can dismiss this alert. */
  dismissible?: boolean;
  className?: string;
};

const variantConfig: Record<
  AlertVariant,
  { container: string; icon: string; title: string; body: string }
> = {
  info: {
    container: "bg-[#F0F4F8] border-[#4A7DB5]/30",
    icon: "text-[#4A7DB5]",
    title: "text-[#1E3A5F]",
    body: "text-[#2B4C7E]",
  },
  success: {
    container: "bg-emerald-50 border-emerald-200",
    icon: "text-emerald-600",
    title: "text-emerald-900",
    body: "text-emerald-800",
  },
  warning: {
    container: "bg-amber-50 border-amber-200",
    icon: "text-amber-600",
    title: "text-amber-900",
    body: "text-amber-800",
  },
  error: {
    container: "bg-red-50 border-red-200",
    icon: "text-red-600",
    title: "text-red-900",
    body: "text-red-800",
  },
};

const ICONS: Record<AlertVariant, ReactNode> = {
  info: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
    </svg>
  ),
  success: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
    </svg>
  ),
  warning: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
      <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
    </svg>
  ),
  error: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
    </svg>
  ),
};

export function Alert({ children, variant = "info", title, dismissible = false, className }: AlertProps) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  const cfg = variantConfig[variant];

  return (
    <div
      role="alert"
      className={cn(
        "flex gap-3 rounded-xl border p-4",
        cfg.container,
        className
      )}
    >
      <div className={cn("mt-0.5 shrink-0", cfg.icon)}>{ICONS[variant]}</div>
      <div className="flex-1 min-w-0">
        {title && (
          <p className={cn("text-sm font-semibold", cfg.title)}>{title}</p>
        )}
        <div className={cn("text-sm leading-relaxed", title ? "mt-1" : "", cfg.body)}>
          {children}
        </div>
      </div>
      {dismissible && (
        <button
          type="button"
          aria-label="Dismiss"
          onClick={() => setDismissed(true)}
          className={cn("shrink-0 rounded p-0.5 hover:opacity-70 transition-opacity", cfg.icon)}
        >
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </button>
      )}
    </div>
  );
}
