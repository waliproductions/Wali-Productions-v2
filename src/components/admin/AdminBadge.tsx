import type { ReactNode } from "react";
import type { AdminBadgeVariant } from "@/lib/admin/types";
import { badgeClasses } from "@/lib/admin/utils";

interface AdminBadgeProps {
  children: ReactNode;
  variant?: AdminBadgeVariant;
  className?: string;
}

export function AdminBadge({ children, variant = "neutral", className }: AdminBadgeProps) {
  return <span className={className ? `${badgeClasses(variant)} ${className}` : badgeClasses(variant)}>{children}</span>;
}
