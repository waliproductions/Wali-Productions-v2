/**
 * Client portal index — placeholder module.
 *
 * This route group exists to isolate future portal authentication, navigation,
 * and session management from the main public site and admin layouts. No auth
 * is implemented here yet; this file is a structural placeholder only.
 *
 * Future modules planned for this route group:
 *   /portal/dashboard   — project overview and active engagements
 *   /portal/projects    — project documents and milestone tracking
 *   /portal/invoices    — billing and payment history
 *   /portal/messages    — secure client–team messaging
 */
export default function PortalIndexPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#4A7DB5]">
          Coming Soon
        </p>
        <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-[#0D1B2A]">
          Client Portal
        </h1>
        <p className="mt-4 text-base leading-relaxed text-neutral-600">
          The Wali Productions client portal is under development. Clients will
          be able to access project updates, documents, and communication tools
          here.
        </p>
        <a
          href="/contact"
          className="mt-8 inline-flex items-center rounded-lg bg-[#0D1B2A] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1E3A5F]"
        >
          Contact us
        </a>
      </div>
    </main>
  );
}
