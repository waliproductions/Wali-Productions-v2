"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode, SVGProps } from "react";

import type { AdminIcon, AdminNavItem, AdminNavSection } from "@/lib/admin/types";
import { cn, isActiveNav } from "@/lib/admin/utils";

function BaseIcon({
  children,
  ...props
}: SVGProps<SVGSVGElement> & { children: ReactNode }) {
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
      {children}
    </svg>
  );
}

const DashboardIcon: AdminIcon = (props) => (
  <BaseIcon {...props}>
    <rect x="3" y="3" width="7.5" height="7.5" rx="1.5" />
    <rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5" />
    <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5" />
    <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5" />
  </BaseIcon>
);

const InboxIcon: AdminIcon = (props) => (
  <BaseIcon {...props}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 8 9 6 9-6" />
  </BaseIcon>
);

const AuditIcon: AdminIcon = (props) => (
  <BaseIcon {...props}>
    <rect x="5" y="3" width="14" height="18" rx="2" />
    <path d="M9 8h6M9 12h6M9 16h4" />
  </BaseIcon>
);

const PortfolioIcon: AdminIcon = (props) => (
  <BaseIcon {...props}>
    <rect x="3" y="7" width="18" height="13" rx="2" />
    <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <path d="M3 12h18" />
  </BaseIcon>
);

const GovernmentIcon: AdminIcon = (props) => (
  <BaseIcon {...props}>
    <path d="m3 9 9-5 9 5" />
    <path d="M5 9v9M9 9v9M15 9v9M19 9v9" />
    <path d="M3 21h18" />
  </BaseIcon>
);

const AnalyticsIcon: AdminIcon = (props) => (
  <BaseIcon {...props}>
    <rect x="4" y="13" width="3.5" height="7" rx="1" />
    <rect x="10.25" y="8" width="3.5" height="12" rx="1" />
    <rect x="16.5" y="4" width="3.5" height="16" rx="1" />
    <path d="M3 20.5h18" />
  </BaseIcon>
);

const SettingsIcon: AdminIcon = (props) => (
  <BaseIcon {...props}>
    <path d="M4 8h8" />
    <circle cx="15" cy="8" r="2.25" />
    <path d="M18 8h2" />
    <path d="M4 16h2" />
    <circle cx="9" cy="16" r="2.25" />
    <path d="M12 16h8" />
  </BaseIcon>
);

const OperationsIcon: AdminIcon = (props) => (
  <BaseIcon {...props}>
    <path d="M9 11l3 3L22 4" />
    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
  </BaseIcon>
);

const ContractsIcon: AdminIcon = (props) => (
  <BaseIcon {...props}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <path d="M16 13H8M16 17H8M10 9H8" />
  </BaseIcon>
);

const KnowledgeIcon: AdminIcon = (props) => (
  <BaseIcon {...props}>
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </BaseIcon>
);

const CloseIcon = (props: SVGProps<SVGSVGElement>) => (
  <BaseIcon {...props}>
    <path d="M6 6l12 12M18 6 6 18" />
  </BaseIcon>
);

export const ADMIN_NAV: AdminNavItem[] = [
  { label: "Dashboard", href: "/admin", icon: DashboardIcon },
  { label: "Contact Inquiries", href: "/admin/contact", icon: InboxIcon, matchPrefix: true },
  { label: "Audit Log", href: "/admin/audit", icon: AuditIcon, matchPrefix: true },
  { label: "Portfolio", href: "/admin/portfolio", icon: PortfolioIcon, matchPrefix: true },
  { label: "Government", href: "/admin/government", icon: GovernmentIcon, matchPrefix: true },
  { label: "Analytics", href: "/admin/analytics", icon: AnalyticsIcon, matchPrefix: true },
  { label: "Settings", href: "/admin/settings", icon: SettingsIcon, matchPrefix: true },
];

export const ADMIN_NAV_SECTIONS: AdminNavSection[] = [
  {
    items: [
      { label: "Dashboard", href: "/admin", icon: DashboardIcon },
    ],
  },
  {
    title: "Work",
    items: [
      { label: "Operations", href: "/admin/operations", icon: OperationsIcon, matchPrefix: true },
      { label: "Gov Contracts", href: "/admin/contracts", icon: ContractsIcon, matchPrefix: true },
    ],
  },
  {
    title: "Content",
    items: [
      { label: "Portfolio", href: "/admin/portfolio", icon: PortfolioIcon, matchPrefix: true },
      { label: "Government", href: "/admin/government", icon: GovernmentIcon, matchPrefix: true },
    ],
  },
  {
    title: "Knowledge",
    items: [
      { label: "Knowledge Base", href: "/admin/knowledge", icon: KnowledgeIcon, matchPrefix: true },
    ],
  },
  {
    title: "System",
    items: [
      { label: "Analytics", href: "/admin/analytics", icon: AnalyticsIcon, matchPrefix: true },
      { label: "Contact Inquiries", href: "/admin/contact", icon: InboxIcon, matchPrefix: true },
      { label: "Audit Log", href: "/admin/audit", icon: AuditIcon, matchPrefix: true },
      { label: "Settings", href: "/admin/settings", icon: SettingsIcon, matchPrefix: true },
    ],
  },
];

type AdminSidebarProps = {
  open: boolean;
  onClose: () => void;
  navItems?: AdminNavItem[];
  navSections?: AdminNavSection[];
};

function NavLink({
  item,
  pathname,
  onClose,
}: {
  item: AdminNavItem;
  pathname: string;
  onClose: () => void;
}) {
  const active = isActiveNav(pathname, item.href, item.matchPrefix ?? false);
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      onClick={onClose}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex items-center gap-3 rounded-md border-l-2 px-3 py-2 text-sm font-medium transition-colors",
        active
          ? "border-amber-400 bg-amber-500/10 text-amber-300"
          : "border-transparent text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-200"
      )}
    >
      <Icon className="h-5 w-5 shrink-0" />
      <span className="truncate">{item.label}</span>
      {item.badge !== undefined ? (
        <span className="ml-auto rounded-full bg-zinc-800 px-2 py-0.5 text-xs text-zinc-300">
          {item.badge}
        </span>
      ) : null}
    </Link>
  );
}

export function AdminSidebar({
  open,
  onClose,
  navItems = ADMIN_NAV,
  navSections,
}: AdminSidebarProps) {
  const pathname = usePathname() ?? "";

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden",
          open ? "block" : "hidden"
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-zinc-800 bg-zinc-950",
          "transition-transform duration-200 ease-out",
          "lg:static lg:z-auto lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
        aria-label="Admin navigation"
      >
        <div className="flex h-16 items-center justify-between gap-2 border-b border-zinc-800 px-4">
          <Link href="/admin" className="flex items-center gap-3" onClick={onClose}>
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 text-sm font-bold text-zinc-950">
              W
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-zinc-100">
                Wali Productions
              </span>
              <span className="text-xs text-zinc-500">Admin Portal</span>
            </span>
          </Link>

          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 lg:hidden"
            aria-label="Close navigation"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          {navSections ? (
            <div className="space-y-5">
              {navSections.map((section, idx) => (
                <div key={section.title ?? idx}>
                  {section.title ? (
                    <p className="mb-1.5 px-3 text-[10px] font-semibold uppercase tracking-widest text-zinc-600">
                      {section.title}
                    </p>
                  ) : null}
                  <div className="space-y-0.5">
                    {section.items.map((item) => (
                      <NavLink
                        key={item.href}
                        item={item}
                        pathname={pathname}
                        onClose={onClose}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-0.5">
              {navItems.map((item) => (
                <NavLink
                  key={item.href}
                  item={item}
                  pathname={pathname}
                  onClose={onClose}
                />
              ))}
            </div>
          )}
        </nav>

        <div className="border-t border-zinc-800 px-4 py-3">
          <p className="text-xs text-zinc-600">Admin Portal · v0.7.0</p>
        </div>
      </aside>
    </>
  );
}
