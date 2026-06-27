"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";

const CONTACT_HREF = "/contact";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // Desktop: all nav items except Contact (shown as a CTA button instead).
  const desktopNav = siteConfig.nav.filter((item) => item.href !== CONTACT_HREF);

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75 dark:border-white/10">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-content items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 rounded-sm"
          aria-label={`${siteConfig.name} home`}
        >
          <Image
            src="/branding/logo.png"
            alt=""
            aria-hidden="true"
            width={38}
            height={38}
            className="rounded-sm object-contain"
          />
          <span className="hidden text-base font-semibold tracking-tight sm:inline">
            {siteConfig.name}
          </span>
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden items-center gap-7 md:flex">
          {desktopNav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={
                  "text-sm transition-colors " +
                  (isActive(item.href)
                    ? "font-semibold text-gold"
                    : "font-medium text-neutral-600 hover:text-foreground dark:text-neutral-300 dark:hover:text-white")
                }
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Contact CTA */}
        <div className="hidden md:block">
          <Link
            href={CONTACT_HREF}
            aria-current={isActive(CONTACT_HREF) ? "page" : undefined}
            className="inline-flex items-center rounded-lg bg-gold px-4 py-1.5 text-sm font-semibold text-white transition-all hover:bg-gold/90 focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
          >
            Contact
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-md text-neutral-700 transition-colors hover:bg-black/5 md:hidden dark:text-neutral-200 dark:hover:bg-white/10"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? (
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M2 2l14 14M16 2 2 16" />
            </svg>
          ) : (
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M2 4.5h14M2 9h14M2 13.5h14" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile panel */}
      {open && (
        <div
          id="mobile-menu"
          className="border-t border-black/10 md:hidden dark:border-white/10"
        >
          <ul className="mx-auto max-w-content space-y-0.5 px-4 py-3 sm:px-6">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={
                    "block rounded-md px-3 py-2.5 text-sm font-medium transition-colors " +
                    (isActive(item.href)
                      ? "text-gold"
                      : "text-neutral-700 hover:bg-black/5 dark:text-neutral-200 dark:hover:bg-white/10")
                  }
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mx-auto max-w-content border-t border-black/10 px-4 py-4 sm:px-6 dark:border-white/10">
            <Link
              href={CONTACT_HREF}
              className="block w-full rounded-lg bg-gold px-4 py-2.5 text-center text-sm font-semibold text-white transition-all hover:bg-gold/90"
            >
              Start a conversation
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
