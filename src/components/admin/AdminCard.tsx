import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/admin/utils";

type AdminCardProps = {
  title?: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
  padded?: boolean;
  id?: string;
};

export function AdminCard({
  title,
  description,
  actions,
  footer,
  children,
  className,
  headerClassName,
  bodyClassName,
  footerClassName,
  padded = true,
  id,
}: AdminCardProps) {
  const hasHeader = Boolean(title || description || actions);

  return (
    <section
      id={id}
      className={cn(
        "overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/60 shadow-sm",
        className
      )}
    >
      {hasHeader ? (
        <header
          className={cn(
            "flex flex-col gap-3 border-b border-zinc-800 px-5 py-4 sm:flex-row sm:items-center sm:justify-between",
            headerClassName
          )}
        >
          <div className="min-w-0">
            {title ? (
              <h2 className="truncate text-sm font-semibold text-zinc-100">
                {title}
              </h2>
            ) : null}
            {description ? (
              <p className="mt-0.5 text-sm text-zinc-500">{description}</p>
            ) : null}
          </div>

          {actions ? (
            <div className="flex shrink-0 items-center gap-2">{actions}</div>
          ) : null}
        </header>
      ) : null}

      <div className={cn(padded && "px-5 py-5", bodyClassName)}>
        {children}
      </div>

      {footer ? (
        <footer
          className={cn("border-t border-zinc-800 px-5 py-3", footerClassName)}
        >
          {footer}
        </footer>
      ) : null}
    </section>
  );
}

type AdminStatCardProps = {
  label: ReactNode;
  value: ReactNode;
  hint?: ReactNode;
  icon?: ReactNode;
  trend?: { value: string; direction: "up" | "down" | "neutral" };
  href?: string;
  className?: string;
};

const TREND_CLASSES: Record<"up" | "down" | "neutral", string> = {
  up: "text-emerald-400",
  down: "text-red-400",
  neutral: "text-zinc-400",
};

export function AdminStatCard({
  label,
  value,
  hint,
  icon,
  trend,
  href,
  className,
}: AdminStatCardProps) {
  const body = (
    <>
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
          {label}
        </p>
        {icon ? <span className="text-zinc-500">{icon}</span> : null}
      </div>

      <p className="mt-3 text-2xl font-semibold text-zinc-50">{value}</p>

      {trend || hint ? (
        <p className="mt-1 flex items-center gap-2 text-xs text-zinc-500">
          {trend ? (
            <span className={cn("font-medium", TREND_CLASSES[trend.direction])}>
              {trend.value}
            </span>
          ) : null}
          {hint ? <span>{hint}</span> : null}
        </p>
      ) : null}
    </>
  );

  const baseClasses = cn(
    "block rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 shadow-sm transition-colors",
    href && "hover:border-zinc-700 hover:bg-zinc-900",
    className
  );

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {body}
      </Link>
    );
  }

  return <div className={baseClasses}>{body}</div>;
}
