import Link from "next/link";
import { siteConfig } from "@/config/site";

/**
 * Site footer — part of the shared layout shell.
 *
 * Shows company identity (legal name + copyright), primary site navigation, and
 * legal links. Navigation is data-driven from `siteConfig` and reuses the
 * site's existing design language.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-black/10 dark:border-white/10">
      <div className="mx-auto max-w-content px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* Identity */}
          <div className="max-w-sm">
            <p className="text-base font-semibold tracking-tight">
              {siteConfig.name}
            </p>
            <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
              {siteConfig.identity}
            </p>
          </div>

          {/* Navigation groups */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-2">
            <nav aria-label="Footer">
              <h2 className="text-sm font-semibold tracking-tight">Navigation</h2>
              <ul className="mt-4 space-y-2">
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

            <nav aria-label="Legal">
              <h2 className="text-sm font-semibold tracking-tight">Legal</h2>
              <ul className="mt-4 space-y-2">
                {siteConfig.legal.map((item) => (
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
        </div>

        <div className="mt-10 border-t border-black/10 pt-6 dark:border-white/10">
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            &copy; {year} {siteConfig.legalName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
