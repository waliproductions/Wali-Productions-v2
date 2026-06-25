import { siteConfig } from "@/config/site";

/**
 * Footer placeholder.
 *
 * Structural footer only. Legal text, links, and company information are
 * governed by canonical documentation and pending approval.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-black/10 dark:border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          &copy; {year} {siteConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
