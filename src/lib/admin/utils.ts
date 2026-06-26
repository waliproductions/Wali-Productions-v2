import type { AdminBadgeVariant } from "@/lib/admin/types";

export type ClassValue =
  | string
  | number
  | bigint
  | null
  | boolean
  | undefined
  | ClassValue[]
  | Record<string, unknown>;

export function cn(...inputs: ClassValue[]): string {
  const out: string[] = [];

  for (const input of inputs) {
    if (
      input === null ||
      input === undefined ||
      input === false ||
      input === true
    ) {
      continue;
    }

    if (
      typeof input === "string" ||
      typeof input === "number" ||
      typeof input === "bigint"
    ) {
      const value = String(input).trim();
      if (value) out.push(value);
      continue;
    }

    if (Array.isArray(input)) {
      const nested = cn(...input);
      if (nested) out.push(nested);
      continue;
    }

    if (typeof input === "object") {
      for (const [key, value] of Object.entries(input)) {
        if (value) out.push(key);
      }
    }
  }

  return out.join(" ");
}

function toValidDate(value: string | number | Date | null | undefined): Date | null {
  if (value === null || value === undefined) return null;

  const date = value instanceof Date ? value : new Date(value);

  return Number.isNaN(date.getTime()) ? null : date;
}

const DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
});

const DATE_TIME_FORMATTER = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeStyle: "short",
});

const TIME_FORMATTER = new Intl.DateTimeFormat("en-US", {
  timeStyle: "short",
});

export function formatDate(value: string | number | Date | null | undefined): string {
  const date = toValidDate(value);

  return date ? DATE_FORMATTER.format(date) : "—";
}

export function formatDateTime(
  value: string | number | Date | null | undefined
): string {
  const date = toValidDate(value);

  return date ? DATE_TIME_FORMATTER.format(date) : "—";
}

export function formatTime(value: string | number | Date | null | undefined): string {
  const date = toValidDate(value);

  return date ? TIME_FORMATTER.format(date) : "—";
}

const RELATIVE_DIVISIONS: {
  amount: number;
  unit: Intl.RelativeTimeFormatUnit;
}[] = [
  { amount: 60, unit: "second" },
  { amount: 60, unit: "minute" },
  { amount: 24, unit: "hour" },
  { amount: 7, unit: "day" },
  { amount: 4.34524, unit: "week" },
  { amount: 12, unit: "month" },
  { amount: Number.POSITIVE_INFINITY, unit: "year" },
];

const RELATIVE_FORMATTER = new Intl.RelativeTimeFormat("en-US", {
  numeric: "auto",
});

export function formatRelativeTime(
  value: string | number | Date | null | undefined,
  now: number = Date.now()
): string {
  const date = toValidDate(value);

  if (!date) return "—";

  let duration = (date.getTime() - now) / 1000;

  for (const division of RELATIVE_DIVISIONS) {
    if (Math.abs(duration) < division.amount) {
      return RELATIVE_FORMATTER.format(Math.round(duration), division.unit);
    }

    duration /= division.amount;
  }

  return formatDate(date);
}

export function isActiveNav(
  pathname: string,
  href: string,
  matchPrefix = false
): boolean {
  if (pathname === href) return true;
  if (matchPrefix) return pathname.startsWith(`${href}/`);

  return false;
}

export function humanizeSegment(segment: string): string {
  return segment
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function truncate(value: string, max: number): string {
  if (value.length <= max) return value;

  return `${value.slice(0, Math.max(0, max - 1)).trimEnd()}…`;
}

export function pluralize(count: number, singular: string, plural?: string): string {
  const word = count === 1 ? singular : plural ?? `${singular}s`;

  return `${formatNumber(count)} ${word}`;
}

const NUMBER_FORMATTER = new Intl.NumberFormat("en-US");

export function formatNumber(value: number): string {
  return Number.isFinite(value) ? NUMBER_FORMATTER.format(value) : "—";
}

const BADGE_CLASSES: Record<AdminBadgeVariant, string> = {
  neutral: "bg-zinc-800 text-zinc-300 ring-zinc-700",
  info: "bg-sky-500/10 text-sky-300 ring-sky-500/30",
  success: "bg-emerald-500/10 text-emerald-300 ring-emerald-500/30",
  warning: "bg-amber-500/10 text-amber-300 ring-amber-500/30",
  danger: "bg-red-500/10 text-red-300 ring-red-500/30",
};

export function badgeClasses(variant: AdminBadgeVariant = "neutral"): string {
  return cn(
    "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset",
    BADGE_CLASSES[variant]
  );
}
