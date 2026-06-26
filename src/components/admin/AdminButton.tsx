import Link from "next/link";
import type { MouseEventHandler, ReactNode } from "react";

import type { AdminButtonSize, AdminButtonVariant } from "@/lib/admin/types";
import { cn } from "@/lib/admin/utils";

const BASE_CLASSES =
  "inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors " +
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 " +
  "disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50";

const VARIANT_CLASSES: Record<AdminButtonVariant, string> = {
  primary:
    "bg-amber-500 text-zinc-950 shadow-sm hover:bg-amber-400 focus-visible:outline-amber-400",
  secondary:
    "border border-zinc-700 bg-zinc-800 text-zinc-100 hover:bg-zinc-700 focus-visible:outline-zinc-500",
  outline:
    "border border-zinc-700 text-zinc-200 hover:bg-zinc-800/60 focus-visible:outline-zinc-500",
  ghost:
    "text-zinc-300 hover:bg-zinc-800/60 hover:text-zinc-100 focus-visible:outline-zinc-600",
  danger:
    "bg-red-600 text-white shadow-sm hover:bg-red-500 focus-visible:outline-red-400",
};

const SIZE_CLASSES: Record<AdminButtonSize, string> = {
  sm: "h-8 gap-1.5 rounded-md px-3 text-xs",
  md: "h-10 gap-2 rounded-lg px-4 text-sm",
  lg: "h-12 gap-2.5 rounded-lg px-6 text-base",
};

export type AdminButtonProps = {
  children?: ReactNode;
  variant?: AdminButtonVariant;
  size?: AdminButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
  href?: string;
  external?: boolean;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLElement>;
  name?: string;
  value?: string;
  form?: string;
  formAction?: string;
  title?: string;
  id?: string;
  tabIndex?: number;
  target?: string;
  rel?: string;
  "aria-label"?: string;
};

function Spinner() {
  return (
    <svg
      className="h-4 w-4 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-90"
        fill="currentColor"
        d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z"
      />
    </svg>
  );
}

export function AdminButton(props: AdminButtonProps) {
  const {
    children,
    variant = "primary",
    size = "md",
    loading = false,
    fullWidth = false,
    leftIcon,
    rightIcon,
    className,
    href,
    external,
    type = "button",
    disabled = false,
    onClick,
    name,
    value,
    form,
    formAction,
    title,
    id,
    tabIndex,
    target,
    rel,
    "aria-label": ariaLabel,
  } = props;

  const classes = cn(
    BASE_CLASSES,
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    fullWidth && "w-full",
    className
  );

  const content = (
    <>
      {loading ? (
        <Spinner />
      ) : leftIcon ? (
        <span className="shrink-0">{leftIcon}</span>
      ) : null}

      {children !== undefined && children !== null ? (
        <span>{children}</span>
      ) : null}

      {!loading && rightIcon ? (
        <span className="shrink-0">{rightIcon}</span>
      ) : null}
    </>
  );

  if (href !== undefined) {
    const sharedAnchorProps = {
      className: classes,
      onClick,
      title,
      id,
      tabIndex,
      "aria-label": ariaLabel,
      "aria-disabled": disabled || loading || undefined,
    };

    if (external) {
      return (
        <a
          href={href}
          target={target ?? "_blank"}
          rel={rel ?? "noopener noreferrer"}
          {...sharedAnchorProps}
        >
          {content}
        </a>
      );
    }

    return (
      <Link href={href} target={target} rel={rel} {...sharedAnchorProps}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      onClick={onClick}
      name={name}
      value={value}
      form={form}
      formAction={formAction}
      title={title}
      id={id}
      tabIndex={tabIndex}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
}
