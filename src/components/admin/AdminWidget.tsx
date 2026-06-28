import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/admin/utils";

type AdminWidgetProps = {
  title: string;
  children: ReactNode;
  action?: { label: string; href: string };
  className?: string;
  size?: "default" | "compact";
};

export function AdminWidget({
  title,
  children,
  action,
  className,
  size = "default",
}: AdminWidgetProps) {
  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/60 shadow-sm",
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-3.5">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
          {title}
        </h2>
        {action ? (
          <Link
            href={action.href}
            className="text-xs text-zinc-500 transition-colors hover:text-amber-400"
          >
            {action.label} →
          </Link>
        ) : null}
      </div>
      <div className={cn("flex-1", size === "compact" ? "px-5 py-4" : "px-5 py-5")}>
        {children}
      </div>
    </div>
  );
}

type AdminWidgetMetricProps = {
  label: string;
  value: ReactNode;
  hint?: string;
  trend?: { value: string; direction: "up" | "down" | "neutral" };
};

const TREND_COLORS = {
  up: "text-emerald-400",
  down: "text-red-400",
  neutral: "text-zinc-500",
};

export function AdminWidgetMetric({ label, value, hint, trend }: AdminWidgetMetricProps) {
  return (
    <div className="flex flex-col">
      <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">{label}</p>
      <p className="mt-2 text-3xl font-bold text-zinc-50">{value}</p>
      {(trend || hint) ? (
        <p className="mt-1 flex items-center gap-2 text-xs text-zinc-500">
          {trend ? (
            <span className={cn("font-medium", TREND_COLORS[trend.direction])}>
              {trend.value}
            </span>
          ) : null}
          {hint ? <span>{hint}</span> : null}
        </p>
      ) : null}
    </div>
  );
}

type AdminWidgetListItem = {
  label: string;
  value?: ReactNode;
  href?: string;
  badge?: ReactNode;
};

export function AdminWidgetList({ items }: { items: AdminWidgetListItem[] }) {
  if (items.length === 0) {
    return <p className="text-sm text-zinc-600">Nothing to show.</p>;
  }

  return (
    <ul className="divide-y divide-zinc-800/60">
      {items.map((item, i) => {
        const inner = (
          <div className="flex items-center justify-between gap-3 py-2.5">
            <span className="min-w-0 truncate text-sm text-zinc-300">{item.label}</span>
            <div className="flex shrink-0 items-center gap-2">
              {item.badge}
              {item.value ? (
                <span className="text-sm text-zinc-500">{item.value}</span>
              ) : null}
            </div>
          </div>
        );

        return (
          <li key={i}>
            {item.href ? (
              <Link
                href={item.href}
                className="block transition-colors hover:text-amber-400"
              >
                {inner}
              </Link>
            ) : (
              inner
            )}
          </li>
        );
      })}
    </ul>
  );
}
