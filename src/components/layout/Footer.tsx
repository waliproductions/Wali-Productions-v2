import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0A0A0A]">
      <div className="mx-auto max-w-content px-4 pb-8 pt-16 sm:px-6 lg:px-8">
        {/* Main grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Identity column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src="/branding/logo.png"
                alt=""
                aria-hidden="true"
                width={36}
                height={36}
                className="rounded-sm object-contain opacity-90"
              />
              <span className="text-base font-semibold tracking-tight text-white">
                {siteConfig.name}
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-neutral-500">
              {siteConfig.identity}. Serving small businesses and government
              clients with integrity and excellence.
            </p>
          </div>

          {/* Site navigation */}
          <nav aria-label="Footer site navigation">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-600">
              Site
            </h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-1">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-neutral-400 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Work with us column */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-600">
              Work with us
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-neutral-500">
              Ready to start a project? We partner with small businesses and
              government clients to deliver technology with purpose.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#1E3A5F] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#2B4C7E]"
            >
              Get in touch
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M2 7h10M7 2l5 5-5 5" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-neutral-700">
            &copy; {year} {siteConfig.legalName}. All rights reserved.
          </p>
          {siteConfig.legal.length > 0 && (
            <ul className="flex gap-6">
              {siteConfig.legal.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-xs text-neutral-700 transition-colors hover:text-neutral-400"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </footer>
  );
}
