"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";

/**
 * Primary site navigation.
 *
 * - Sticky header shared across all pages (part of the layout shell).
 * - Desktop: inline horizontal links.
 * - Mobile: accessible disclosure panel (hamburger toggle).
 * - Renders whatever `siteConfig.nav` contains, so approved routes can be added
 *   in `src/config/site.ts` without touching this component.
 */
export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // Close the mobile panel whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close the mobile panel on Escape.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75 dark:border-white/10">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-content items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        <Link
          href="/"
          className="flex items-center gap-3 rounded-sm text-lg font-semibold tracking-tight"
          aria-label={`${siteConfig.name} home`}
        >
          <Image
            src="/branding/logo.png"
            alt=""
            aria-hidden="true"
            width={40}
            height={40}
            className="rounded-sm object-contain"
          />
          <span>{siteConfig.name}</span>
        </Link>

        {/* Desktop navigation */}
        <ul className="hidden items-center gap-8 md:flex">
          {siteConfig.nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={
                  "text-sm transition-colors " +
                  (isActive(item.href)
                    ? "font-medium text-foreground"
                    : "text-neutral-600 hover:text-foreground dark:text-neutral-300")
                }
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-neutral-700 hover:bg-black/5 md:hidden dark:text-neutral-200 dark:hover:bg-white/10"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setOpen((prev) => !prev)}
        >
          <span aria-hidden="true" className="text-xl leading-none">
            {open ? "\u2715" : "\u2630"}
          </span>
        </button>
      </nav>

      {/* Mobile navigation panel */}
      {open && (
        <div
          id="mobile-menu"
          className="border-t border-black/10 md:hidden dark:border-white/10"
        >
          <ul className="mx-auto max-w-content space-y-1 px-4 py-3 sm:px-6">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={
                    "block rounded-md px-3 py-2 text-base transition-colors " +
                    (isActive(item.href)
                      ? "bg-black/5 font-medium text-foreground dark:bg-white/10"
                      : "text-neutral-700 hover:bg-black/5 dark:text-neutral-200 dark:hover:bg-white/10")
                  }
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
