import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  error?: boolean;
};

export function Textarea({ error, className, ...props }: TextareaProps) {
  return (
    <textarea
      {...props}
      className={cn(
        "w-full rounded-lg border bg-background px-4 py-2.5 text-sm text-foreground transition-colors",
        "placeholder:text-neutral-400 resize-y min-h-[120px]",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A5F] focus-visible:ring-offset-1",
        "disabled:cursor-not-allowed disabled:opacity-60",
        error
          ? "border-red-400 focus-visible:ring-red-400"
          : "border-black/15 hover:border-black/25 dark:border-white/20 dark:hover:border-white/30",
        className
      )}
    />
  );
}
