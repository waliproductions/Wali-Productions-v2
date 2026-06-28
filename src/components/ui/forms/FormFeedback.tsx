import { cn } from "@/lib/utils";

type FormFeedbackProps = {
  /** "error" shows in red; "success" shows in green; "info" shows in blue. */
  variant: "error" | "success" | "info";
  message: string;
  /** Optional secondary detail (e.g. a confirmation ID). */
  detail?: string;
  className?: string;
};

const variantConfig = {
  error:   { container: "bg-red-50 border-red-200 text-red-800",     icon: "text-red-500" },
  success: { container: "bg-emerald-50 border-emerald-200 text-emerald-800", icon: "text-emerald-500" },
  info:    { container: "bg-[#F0F4F8] border-[#4A7DB5]/30 text-[#1E3A5F]",  icon: "text-[#4A7DB5]" },
};

const ICONS = {
  error: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
    </svg>
  ),
  success: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
    </svg>
  ),
  info: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
    </svg>
  ),
};

export function FormFeedback({ variant, message, detail, className }: FormFeedbackProps) {
  const cfg = variantConfig[variant];

  return (
    <div
      role={variant === "error" ? "alert" : "status"}
      className={cn(
        "flex items-start gap-3 rounded-lg border p-4 text-sm",
        cfg.container,
        className
      )}
    >
      <span className={cn("mt-0.5 shrink-0", cfg.icon)}>{ICONS[variant]}</span>
      <div>
        <p className="font-medium">{message}</p>
        {detail && <p className="mt-0.5 opacity-75">{detail}</p>}
      </div>
    </div>
  );
}
