import Link from "next/link";
import {
  getContactAuditEvents,
  getContactDashboardSubmissions,
} from "@/lib/admin/contact-dashboard";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [submissions, auditEvents] = await Promise.all([
    getContactDashboardSubmissions(),
    getContactAuditEvents(),
  ]);

  const processedCount = submissions.filter(
    (submission) => submission.lifecycleStatus === "processed"
  ).length;
  const failedCount = submissions.filter(
    (submission) => submission.lifecycleStatus === "failed"
  ).length;
  const archivedCount = submissions.filter(
    (submission) => submission.lifecycleStatus === "archived"
  ).length;

  const cards = [
    {
      label: "Contact inquiries",
      value: submissions.length,
      href: "/admin/contact",
      description: "View and manage incoming production inquiries.",
    },
    {
      label: "Processed",
      value: processedCount,
      href: "/admin/contact?status=processed",
      description: "Successfully delivered contact submissions.",
    },
    {
      label: "Failed",
      value: failedCount,
      href: "/admin/contact?status=failed",
      description: "Submissions requiring follow-up or resend review.",
    },
    {
      label: "Archived",
      value: archivedCount,
      href: "/admin/contact?status=archived",
      description: "Closed or stored inquiries.",
    },
  ];

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-10 text-zinc-100">
      <div className="mx-auto max-w-7xl space-y-10">
        <section className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">
            Internal Operations
          </p>
          <h1 className="text-4xl font-bold tracking-tight">
            Wali Productions Admin
          </h1>
          <p className="max-w-3xl text-zinc-300">
            Operations portal for contact inquiries, audit history, portfolio
            management, government contracting workflows, and site monitoring.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-4">
          {cards.map((card) => (
            <Link
              className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 transition hover:border-amber-400/60 hover:bg-zinc-800"
              href={card.href}
              key={card.label}
            >
              <p className="text-sm text-zinc-400">{card.label}</p>
              <p className="mt-2 text-3xl font-bold">{card.value}</p>
              <p className="mt-3 text-sm leading-6 text-zinc-400">
                {card.description}
              </p>
            </Link>
          ))}
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <Link
            className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition hover:border-amber-400/60 hover:bg-zinc-800"
            href="/admin/contact"
          >
            <h2 className="text-xl font-semibold">Contact Management</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-400">
              Review inquiries, search submissions, inspect lifecycle details,
              export records, archive submissions, and handle resend workflows.
            </p>
          </Link>

          <Link
            className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition hover:border-amber-400/60 hover:bg-zinc-800"
            href="/admin/audit"
          >
            <h2 className="text-xl font-semibold">Audit Log</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-400">
              View contact pipeline events, delivery attempts, processing
              results, and recovery records.
            </p>
            <p className="mt-4 text-sm text-zinc-500">
              {auditEvents.length} audit events recorded.
            </p>
          </Link>
        </section>
      </div>
    </main>
  );
}
