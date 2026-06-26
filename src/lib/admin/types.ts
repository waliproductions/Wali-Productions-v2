import type { ComponentType, ReactNode, SVGProps } from "react";

export type AdminIcon = ComponentType<SVGProps<SVGSVGElement>>;

export type AdminNavItem = {
  label: string;
  href: string;
  icon: AdminIcon;
  matchPrefix?: boolean;
  badge?: string | number;
  description?: string;
};

export type AdminNavSection = {
  title?: string;
  items: AdminNavItem[];
};

export type AdminBadgeVariant =
  | "neutral"
  | "info"
  | "success"
  | "warning"
  | "danger";

export type AdminButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger";

export type AdminButtonSize = "sm" | "md" | "lg";

export type AdminCellAlign = "left" | "center" | "right";

export type AdminTableColumn<Row> = {
  key: string;
  header: ReactNode;
  render?: (row: Row, index: number) => ReactNode;
  align?: AdminCellAlign;
  className?: string;
  headerClassName?: string;
  hideOnMobile?: boolean;
  width?: string;
};

export type AdminBreadcrumb = {
  label: string;
  href?: string;
};
