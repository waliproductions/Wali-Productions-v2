"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { SVGProps } from "react";

import { AdminButton } from "@/components/admin/AdminButton";
import { ADMIN_NAV } from "@/components/admin/AdminSidebar";
import { humanizeSegment } from "@/lib/admin/utils";

function MenuIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

type Crumb = {
  href: string;
  label: string;
  isLast: boolean;
};

function prettySegment(segment: string): string {
  if (/^[0-9a-f-]{8,}$/i.test(segment) || /^\d+$/.test(segment)) {
    return "Details";
  }

  return humanizeSegment(segment);
}

function buildCrumbs(pathname: string): Crumb[] {
  const segments = pathname.split("/").filter(Boolean);

  return segments.map((segment, index) => ({
    href: `/${segments.slice(0, index + 1).join("/")}`,
    label: index === 0 ? "Admin" : prettySegment(segment),
    isLast: index === segments.length - 1,
  }));
}

type AdminHeaderProps = {
  onMenuClick: () => void;
};

export function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  const pathname = usePathname() ?? "/admin";
  const crumbs = buildCrumbs(pathname);
  const exactNav = ADMIN_NAV.find((item) => item.href === pathname);
  const title = exactNav?.label ?? crumbs[crumbs.length - 1]?.label ?? "Admin";

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-zinc-800 bg-zinc-950/90 px-4 backdrop-blur sm:px-6 lg:px-8">
      <button
        type="button"
        onClick={onMenuClick}
        className="rounded-md p-2 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 lg:hidden"
        aria-label="Open navigation"
      >
        <MenuIcon className="h-5 w-5" />
      </button>

      <div className="min-w-0 flex-1">
        <nav aria-label="Breadcrumb" className="hidden sm:block">
          <ol className="flex items-center gap-1.5 text-xs text-zinc-500">
            {crumbs.map((crumb) => (
              <li key={crumb.href} className="flex items-center gap-1.5">
                {crumb.isLast ? (
                  <span className="text-zinc-400">{crumb.label}</span>
                ) : (
                  <Link
                    href={crumb.href}
                    className="transition-colors hover:text-zinc-300"
                  >
                    {crumb.label}
                  </Link>
                )}
                {!crumb.isLast ? (
                  <span className="text-zinc-700">/</span>
                ) : null}
              </li>
            ))}
          </ol>
        </nav>

        <h1 className="truncate text-base font-semibold text-zinc-100">
          {title}
        </h1>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <span className="hidden items-center gap-1.5 text-xs text-zinc-500 sm:flex">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          Live
        </span>

        <AdminButton href="/" external variant="ghost" size="sm">
          View site
        </AdminButton>
      </div>
    </header>
  );
}
