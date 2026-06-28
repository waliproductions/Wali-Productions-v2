import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type MetricTrend = "up" | "down" | "neutral";

type MetricCardProps = {
  label: string;
  value: string | number;
  /** Contextual sub-text (e.g. "vs last month", "of 10 total"). */
  context?: string;
  /** Icon rendered at top-right of the card. */
  icon?: ReactNode;
  trend?: MetricTrend;
  /** Percentage or absolute change for the trend indicator. */
  trendValue?: string;
  className?: string;
};

const trendConfig: Record<MetricTrend, { color: string; arrow: string }> = {
  up:      { color: "text-emerald-600", arrow: "↑" },
  down:    { color: "text-red-600",     arrow: "↓" },
  neutral: { color: "text-neutral-500", arrow: "→" },
};

export function MetricCard({
  label,
  value,
  context,
  icon,
  trend,
  trendValue,
  className,
}: MetricCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl bg-white border border-black/10 shadow-card px-6 py-5",
        className
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500">
            {label}
          </p>
          <p className="mt-2 font-display text-3xl font-bold tracking-tight text-[#0D1B2A]">
            {value}
          </p>
          {(trend || context) && (
            <div className="mt-1.5 flex items-center gap-1.5">
              {trend && trendValue && (
                <span
                  className={cn(
                    "text-xs font-semibold",
                    trendConfig[trend].color
                  )}
                  aria-label={`${trend === "up" ? "Increased" : trend === "down" ? "Decreased" : "No change"} by ${trendValue}`}
                >
                  {trendConfig[trend].arrow} {trendValue}
                </span>
              )}
              {context && (
                <span className="text-xs text-neutral-500">{context}</span>
              )}
            </div>
          )}
        </div>
        {icon && (
          <div className="shrink-0 rounded-lg bg-[#F0F4F8] p-2.5 text-[#1E3A5F]">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
