"use client";

import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/config/site";

/**
 * Navigation placeholder.
 *
 * Provides a responsive, accessible shell (desktop links + mobile disclosure).
 * Link targets are placeholders pending approved navigation structure.
 */
export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-black/10 dark:border-white/10">
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Primary"
      >
        <Link href="/" className="text-lg font-semibold tracking-tight">
          {siteConfig.name}
        </Link>

        {/* Desktop navigation */}
        <ul className="hidden items-center gap-6 md:flex">
          {siteConfig.nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-sm text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-current md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="Toggle navigation menu"
          onClick={() => setOpen((prev) => !prev)}
        >
          <span aria-hidden="true">{open ? "\u2715" : "\u2630"}</span>
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <ul
          id="mobile-menu"
          className="space-y-1 border-t border-black/10 px-4 py-3 dark:border-white/10 md:hidden"
        >
          {siteConfig.nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block rounded-md px-2 py-2 text-sm text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
