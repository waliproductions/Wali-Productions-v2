import Link from "next/link";
import { siteConfig } from "@/config/site";

/**
 * Site footer — part of the shared layout shell.
 *
 * Shows company identity (legal name + copyright) and mirrors the approved
 * navigation. Additional footer content (legal links, contact, social) is
 * pending approved documentation and is intentionally omitted for now.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-black/10 dark:border-white/10">
      <div className="mx-auto flex max-w-content flex-col gap-6 px-4 py-10 sm:px-6 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <div>
          <p className="text-base font-semibold tracking-tight">
            {siteConfig.name}
          </p>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            &copy; {year} {siteConfig.legalName}. All rights reserved.
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-neutral-600 transition-colors hover:text-foreground dark:text-neutral-300"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
