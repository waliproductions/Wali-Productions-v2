import { cn } from "@/lib/utils";

export type ProgressBarVariant = "default" | "success" | "warning" | "danger" | "navy";

type ProgressBarProps = {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  variant?: ProgressBarVariant;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const variantTrack: Record<ProgressBarVariant, string> = {
  default: "bg-[#4A7DB5]",
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  danger: "bg-red-500",
  navy: "bg-[#1E3A5F]",
};

const sizeStyles: Record<"sm" | "md" | "lg", string> = {
  sm: "h-1.5",
  md: "h-2",
  lg: "h-3",
};

export function ProgressBar({
  value,
  max = 100,
  label,
  showValue = false,
  variant = "default",
  size = "md",
  className,
}: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  return (
    <div className={cn("w-full", className)}>
      {(label || showValue) ? (
        <div className="mb-1.5 flex items-center justify-between gap-2">
          {label ? (
            <span className="text-xs font-medium text-neutral-600">{label}</span>
          ) : null}
          {showValue ? (
            <span className="text-xs text-neutral-500">{pct}%</span>
          ) : null}
        </div>
      ) : null}
      <div
        className={cn("overflow-hidden rounded-full bg-neutral-100", sizeStyles[size])}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label}
      >
        <div
          className={cn(
            "h-full rounded-full transition-all duration-300",
            variantTrack[variant]
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
