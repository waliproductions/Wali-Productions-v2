import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeVariant =
  | "default"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "pending"
  | "muted"
  | "navy";

type BadgeSize = "sm" | "md";

type BadgeProps = {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  /** Show a colored status dot before the label. */
  dot?: boolean;
  className?: string;
};

const variantClasses: Record<BadgeVariant, string> = {
  default:  "bg-neutral-100 text-neutral-800 ring-neutral-200",
  success:  "bg-emerald-50  text-emerald-800  ring-emerald-200",
  warning:  "bg-amber-50    text-amber-800    ring-amber-200",
  error:    "bg-red-50      text-red-800      ring-red-200",
  info:     "bg-[#F0F4F8]   text-[#1E3A5F]   ring-[#1E3A5F]/20",
  pending:  "bg-amber-50    text-amber-700    ring-amber-200",
  muted:    "bg-neutral-100 text-neutral-500  ring-neutral-200",
  navy:     "bg-[#0D1B2A]   text-white        ring-[#0D1B2A]",
};

const dotClasses: Record<BadgeVariant, string> = {
  default: "bg-neutral-500",
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  error:   "bg-red-500",
  info:    "bg-[#4A7DB5]",
  pending: "bg-amber-500",
  muted:   "bg-neutral-400",
  navy:    "bg-white",
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-0.5 text-xs",
};

export function Badge({
  children,
  variant = "default",
  size = "md",
  dot = false,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-medium ring-1 ring-inset",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {dot && (
        <span
          className={cn("h-1.5 w-1.5 rounded-full shrink-0", dotClasses[variant])}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}
