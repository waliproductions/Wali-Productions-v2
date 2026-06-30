import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";

const SERVICES_LINKS = [
  { label: "Custom Software", href: "/services/custom-software" },
  { label: "Web Development", href: "/services/web-development" },
  { label: "AI & Automation", href: "/services/ai-integration" },
  { label: "Cybersecurity", href: "/services/security-assessment" },
  { label: "Cloud Solutions", href: "/services/cloud-migration" },
  { label: "Government IT", href: "/government" },
];

const COMPANY_LINKS = [
  { label: "About", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Resources", href: "/resources" },
  { label: "Government", href: "/government" },
  { label: "Capability Statement", href: "/capability-statement" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-[#060d1a]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#4A7DB5]/20 to-transparent" aria-hidden="true" />

      <div className="mx-auto max-w-content px-4 pb-10 pt-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="group inline-flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#1E3A5F] to-[#2B4C7E]">
                <Image
                  src="/branding/logo.png"
                  alt=""
                  aria-hidden="true"
                  width={30}
                  height={30}
                  className="rounded-sm object-contain opacity-90"
                />
              </div>
              <div>
                <span className="block text-sm font-bold tracking-tight text-white">
                  {siteConfig.name}
                </span>
                <span className="block text-[10px] font-medium tracking-wider text-neutral-500">
                  Technology Consulting
                </span>
              </div>
            </Link>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-neutral-500">
              Enterprise technology consulting based in Springfield, Missouri. Cybersecurity, AI integration, software engineering, and government IT — delivered with veteran discipline and integrity.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                VOSB
              </span>
              <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                Gov Ready
              </span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
              Services
            </h2>
            <ul className="mt-5 space-y-3">
              {SERVICES_LINKS.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-neutral-500 transition-colors hover:text-neutral-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
              Company
            </h2>
            <ul className="mt-5 space-y-3">
              {COMPANY_LINKS.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-neutral-500 transition-colors hover:text-neutral-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Column */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
              Start Today
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-neutral-500">
              Government agency, small business, nonprofit, or ministry — we&apos;re ready to help. No commitment required.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <Link
                href="/start"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#1E3A5F] px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#2B4C7E]"
              >
                Start a Project
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
                  <path d="M2 7h10M7 2l5 5-5 5" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl border border-white/10 px-5 py-2.5 text-sm font-medium text-neutral-400 transition-all duration-200 hover:border-white/20 hover:text-neutral-200"
              >
                Contact Us
              </Link>
            </div>

            <div className="mt-8">
              <p className="text-xs text-neutral-600">Response within 24 hours</p>
              <p className="mt-1 text-xs text-neutral-600">No commitment required</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col gap-4 border-t border-white/[0.07] pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-neutral-600">
            &copy; {year} {siteConfig.legalName}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <p className="text-xs text-neutral-600">
              Veteran-Owned · Government Contracting Ready
            </p>
            {siteConfig.legal.length > 0 && (
              <ul className="flex gap-4">
                {siteConfig.legal.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-xs text-neutral-600 transition-colors hover:text-neutral-400"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
