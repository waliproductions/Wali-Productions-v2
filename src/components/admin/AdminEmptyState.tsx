import type { ReactNode } from "react";

import { cn } from "@/lib/admin/utils";

type AdminEmptyStateProps = {
  title: string;
  description?: ReactNode;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
  compact?: boolean;
};

function DefaultIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <path d="M3 8.5 6 4h12l3 4.5" />
      <path d="M3 8.5V19a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V8.5" />
      <path d="M3 8.5h6l1.5 2.5h3L15 8.5h6" />
    </svg>
  );
}

export function AdminEmptyState({
  title,
  description,
  icon,
  action,
  className,
  compact = false,
}: AdminEmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-xl border border-dashed border-zinc-800 bg-zinc-900/40 text-center",
        compact ? "px-6 py-8" : "px-6 py-14",
        className
      )}
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-800/80 text-zinc-400">
        {icon ?? <DefaultIcon />}
      </div>

      <h3 className="text-sm font-semibold text-zinc-200">{title}</h3>

      {description ? (
        <p className="mt-1.5 max-w-sm text-sm text-zinc-500">{description}</p>
      ) : null}

      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
