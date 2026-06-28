import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type CardVariant = "default" | "elevated" | "bordered" | "muted" | "flush";

type CardProps = {
  children: ReactNode;
  variant?: CardVariant;
  className?: string;
  /** Semantic element. Defaults to "div". Use "article" for standalone content cards. */
  as?: ElementType;
  id?: string;
};

const variantClasses: Record<CardVariant, string> = {
  default: "bg-white border border-black/10 shadow-card",
  elevated: "bg-white border border-black/10 shadow-card-hover",
  bordered: "bg-white border-2 border-[#1E3A5F]/15",
  muted: "bg-[#F8FAFC] border border-black/10",
  flush: "bg-white border border-black/10",
};

export function Card({ children, variant = "default", className, as: Tag = "div", id }: CardProps) {
  return (
    <Tag id={id} className={cn("rounded-xl overflow-hidden", variantClasses[variant], className)}>
      {children}
    </Tag>
  );
}

type CardHeaderProps = {
  children: ReactNode;
  className?: string;
};

export function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <div className={cn("px-6 py-5 border-b border-black/10", className)}>
      {children}
    </div>
  );
}

type CardBodyProps = {
  children: ReactNode;
  className?: string;
  padded?: boolean;
};

export function CardBody({ children, className, padded = true }: CardBodyProps) {
  return (
    <div className={cn(padded && "px-6 py-5", className)}>
      {children}
    </div>
  );
}

type CardFooterProps = {
  children: ReactNode;
  className?: string;
};

export function CardFooter({ children, className }: CardFooterProps) {
  return (
    <div className={cn("px-6 py-4 border-t border-black/10 bg-[#F8FAFC]", className)}>
      {children}
    </div>
  );
}
