import type { SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  error?: boolean;
  /** Option list; children prop is not used — pass options via this prop. */
  options: { value: string; label: string }[];
  placeholder?: string;
};

export function Select({ error, options, placeholder, className, ...props }: SelectProps) {
  return (
    <select
      {...props}
      className={cn(
        "w-full rounded-xl border bg-background px-4 py-3 text-sm text-foreground transition-colors",
        "appearance-none bg-no-repeat",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A5F] focus-visible:ring-offset-1",
        "disabled:cursor-not-allowed disabled:opacity-60",
        error
          ? "border-red-400 focus-visible:ring-red-400"
          : "border-black/10 hover:border-black/20 dark:border-white/10 dark:hover:border-white/20",
        className
      )}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
        backgroundPosition: "right 12px center",
        backgroundSize: "16px 16px",
        paddingRight: "40px",
      }}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
