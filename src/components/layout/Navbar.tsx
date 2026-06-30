"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";

const CONTACT_HREF = "/contact";
const START_HREF = "/start";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const desktopNav = siteConfig.nav.filter(
    (item) => item.href !== CONTACT_HREF && item.href !== START_HREF
  );

  return (
    <header
      className={[
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-black/10 bg-white/95 shadow-sm backdrop-blur-xl supports-[backdrop-filter]:bg-white/85 dark:border-white/10 dark:bg-[#060d1a]/95"
          : "border-b border-black/8 bg-white/90 backdrop-blur-md supports-[backdrop-filter]:bg-white/80 dark:border-white/8 dark:bg-[#060d1a]/90",
      ].join(" ")}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-[68px] max-w-content items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-3 rounded-lg transition-opacity hover:opacity-90"
          aria-label={`${siteConfig.name} home`}
        >
          <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-[#1E3A5F] to-[#2B4C7E] shadow-sm transition-shadow group-hover:shadow-md">
            <Image
              src="/branding/logo.png"
              alt=""
              aria-hidden="true"
              width={32}
              height={32}
              className="rounded-sm object-contain"
            />
          </div>
          <div className="hidden sm:block">
            <span className="block text-sm font-bold tracking-tight text-[#0D1B2A] dark:text-white">
              {siteConfig.name}
            </span>
            <span className="block text-[10px] font-medium tracking-wider text-neutral-500 dark:text-neutral-400">
              Technology Consulting
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 md:flex">
          {desktopNav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={[
                  "relative rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-200",
                  isActive(item.href)
                    ? "bg-[#EEF3FA] text-[#1E3A5F] dark:bg-white/10 dark:text-white"
                    : "text-neutral-600 hover:bg-black/5 hover:text-[#0D1B2A] dark:text-neutral-300 dark:hover:bg-white/8 dark:hover:text-white",
                ].join(" ")}
              >
                {item.label}
                {isActive(item.href) && (
                  <span
                    className="absolute inset-x-3 bottom-1 h-0.5 rounded-full bg-[#1E3A5F] dark:bg-[#4A7DB5]"
                    aria-hidden="true"
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-2">
          <Link
            href={CONTACT_HREF}
            aria-current={isActive(CONTACT_HREF) ? "page" : undefined}
            className="rounded-lg px-3.5 py-2 text-sm font-medium text-neutral-600 transition-all duration-200 hover:bg-black/5 hover:text-[#0D1B2A] dark:text-neutral-300 dark:hover:bg-white/8 dark:hover:text-white"
          >
            Contact
          </Link>
          <Link
            href={START_HREF}
            aria-current={isActive(START_HREF) ? "page" : undefined}
            className="group inline-flex items-center gap-2 rounded-lg bg-[#0D1B2A] px-5 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#1E3A5F] dark:bg-[#1E3A5F] dark:hover:bg-[#2B4C7E]"
          >
            Start a Project
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
              <path d="M2 6h8M6 2l4 4-4 4" />
            </svg>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-neutral-700 transition-colors hover:bg-black/8 md:hidden dark:text-neutral-200 dark:hover:bg-white/10"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true">
              <path d="M2 2l14 14M16 2 2 16" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true">
              <path d="M2 4.5h14M2 9h14M2 13.5h14" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile panel */}
      {open && (
        <div
          id="mobile-menu"
          className="border-t border-black/8 bg-white dark:border-white/8 dark:bg-[#060d1a] md:hidden"
        >
          <ul className="mx-auto max-w-content space-y-0.5 px-4 py-3 sm:px-6">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={[
                    "flex items-center rounded-lg px-3 py-3 text-sm font-medium transition-colors",
                    isActive(item.href)
                      ? "bg-[#EEF3FA] text-[#1E3A5F] font-semibold dark:bg-white/10 dark:text-white"
                      : "text-neutral-700 hover:bg-black/5 dark:text-neutral-300 dark:hover:bg-white/8",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mx-auto max-w-content border-t border-black/8 px-4 py-4 sm:px-6 dark:border-white/8 space-y-2">
            <Link
              href={START_HREF}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0D1B2A] px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-[#1E3A5F] dark:bg-[#1E3A5F] dark:hover:bg-[#2B4C7E]"
            >
              Start a Project
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M2 7h10M7 2l5 5-5 5" />
              </svg>
            </Link>
            <Link
              href={CONTACT_HREF}
              className="flex w-full items-center justify-center rounded-xl border border-black/10 px-4 py-2.5 text-sm font-medium text-neutral-700 transition-all hover:bg-black/5 dark:border-white/10 dark:text-neutral-200 dark:hover:bg-white/8"
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
