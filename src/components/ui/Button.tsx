import Link from "next/link";
import type { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[#0D1B2A] text-white shadow-sm hover:bg-[#1E3A5F] dark:bg-[#1E3A5F] dark:hover:bg-[#2B4C7E]",
  secondary:
    "border border-[#0D1B2A]/20 bg-transparent text-[#0D1B2A] hover:border-[#4A7DB5]/40 hover:bg-[#EEF3FA] dark:border-white/20 dark:text-white dark:hover:border-[#4A7DB5]/40 dark:hover:bg-white/8",
  ghost:
    "bg-transparent text-[#1E3A5F] hover:bg-[#EEF3FA] dark:text-[#94A3B8] dark:hover:bg-white/5",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-base",
};

type ButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  className = "",
  type = "button",
  disabled,
  onClick,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A7DB5] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  const classes = `${base} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`.trim();

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} disabled={disabled} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
