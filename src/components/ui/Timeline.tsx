import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export type TimelineItemStatus = "completed" | "active" | "pending" | "blocked";

export type TimelineItemProps = {
  title: string;
  description?: string;
  date?: string;
  status?: TimelineItemStatus;
  icon?: ReactNode;
  children?: ReactNode;
};

const statusStyles: Record<TimelineItemStatus, { dot: string; line: string }> = {
  completed: {
    dot: "bg-[#4A7DB5] border-[#4A7DB5]",
    line: "bg-[#4A7DB5]/30",
  },
  active: {
    dot: "bg-white border-[#1E3A5F] ring-4 ring-[#4A7DB5]/20",
    line: "bg-neutral-200",
  },
  pending: {
    dot: "bg-white border-neutral-300",
    line: "bg-neutral-200",
  },
  blocked: {
    dot: "bg-red-100 border-red-400",
    line: "bg-neutral-200",
  },
};

export function TimelineItem({
  title,
  description,
  date,
  status = "pending",
  icon,
  children,
}: TimelineItemProps) {
  const styles = statusStyles[status];

  return (
    <div className="relative flex gap-4">
      <div className="flex flex-col items-center">
        <div
          className={cn(
            "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2",
            styles.dot
          )}
        >
          {icon ?? (
            status === "completed" ? (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-3.5 w-3.5 text-white"
                aria-hidden="true"
              >
                <path d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            ) : status === "blocked" ? (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-3.5 w-3.5 text-red-500"
                aria-hidden="true"
              >
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            ) : null
          )}
        </div>
        <div className={cn("mt-1 w-0.5 flex-1", styles.line)} />
      </div>

      <div className="min-w-0 flex-1 pb-8">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="text-sm font-semibold text-neutral-900">{title}</h3>
          {date ? (
            <time className="shrink-0 text-xs text-neutral-400">{date}</time>
          ) : null}
        </div>
        {description ? (
          <p className="mt-1 text-sm leading-relaxed text-neutral-600">{description}</p>
        ) : null}
        {children ? <div className="mt-3">{children}</div> : null}
      </div>
    </div>
  );
}

type TimelineProps = {
  children: ReactNode;
  className?: string;
};

export function Timeline({ children, className }: TimelineProps) {
  return (
    <div className={cn("flow-root", className)} role="list" aria-label="Timeline">
      {children}
    </div>
  );
}
