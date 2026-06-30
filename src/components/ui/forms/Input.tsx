import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean;
};

export function Input({ error, className, ...props }: InputProps) {
  return (
    <input
      {...props}
      className={cn(
        "w-full rounded-xl border bg-background px-4 py-3 text-sm text-foreground transition-colors",
        "placeholder:text-neutral-400",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A5F] focus-visible:ring-offset-1",
        "disabled:cursor-not-allowed disabled:opacity-60",
        error
          ? "border-red-400 focus-visible:ring-red-400"
          : "border-black/10 hover:border-black/20 dark:border-white/10 dark:hover:border-white/20",
        className
      )}
    />
  );
}
