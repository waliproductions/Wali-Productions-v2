import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type FieldProps = {
  /** Visible label text. */
  label: string;
  /** Must match the `id` of the child input element. */
  htmlFor: string;
  /** Inline error message; also sets aria-describedby on the input. */
  error?: string;
  /** Hint text shown below the label in muted style. */
  hint?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
};

/**
 * Form field wrapper — pairs a label with its control and surfaces validation
 * errors. The child input/select/textarea should receive `id={htmlFor}` and
 * `aria-describedby={errorId}` (use the `fieldId` pattern below).
 */
export function Field({
  label,
  htmlFor,
  error,
  hint,
  required,
  children,
  className,
}: FieldProps) {
  const errorId = error ? `${htmlFor}-error` : undefined;
  const hintId = hint ? `${htmlFor}-hint` : undefined;

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label
        htmlFor={htmlFor}
        className="text-sm font-medium text-neutral-700 dark:text-neutral-300"
      >
        {label}
        {required ? (
          <span className="ml-1 text-red-500" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="ml-1.5 text-xs font-normal text-neutral-400">(optional)</span>
        )}
      </label>
      {hint && (
        <p id={hintId} className="text-xs text-neutral-500">
          {hint}
        </p>
      )}
      {/* Clone children so we can inject aria-describedby */}
      <div data-error-id={errorId} data-hint-id={hintId}>
        {children}
      </div>
      {error && (
        <p id={errorId} role="alert" className="text-xs font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
