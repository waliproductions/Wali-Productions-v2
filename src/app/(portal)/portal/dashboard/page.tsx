import type { Metadata } from "next";
import { MetricCard } from "@/components/ui/MetricCard";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { Alert } from "@/components/ui/Alert";

export const metadata: Metadata = { title: "Dashboard" };

export default function PortalDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight text-[#0D1B2A]">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-neutral-500">
          Overview of your active engagements with Wali Productions LLC.
        </p>
      </div>

      <Alert variant="info" title="Portal in development">
        This portal is a preview of upcoming client services. Full access will
        be available once your account is set up. Contact us at{" "}
        <a href="/contact" className="underline underline-offset-2 font-medium">
          waliproductions.com/contact
        </a>{" "}
        to get started.
      </Alert>

      {/* Metrics row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          label="Active Projects"
          value="—"
          context="No active projects yet"
          icon={
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
            </svg>
          }
        />
        <MetricCard
          label="Open Proposals"
          value="—"
          context="No proposals yet"
          icon={
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
          }
        />
        <MetricCard
          label="Pending Invoices"
          value="—"
          context="No invoices yet"
          icon={
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
            </svg>
          }
        />
        <MetricCard
          label="Open Tickets"
          value="—"
          context="No support tickets"
          icon={
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
            </svg>
          }
        />
      </div>

      {/* Recent activity */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-[#0D1B2A]">Recent Activity</h2>
            <Badge variant="pending" dot>Coming soon</Badge>
          </div>
        </CardHeader>
        <CardBody>
          <EmptyState
            title="No activity yet"
            description="Your project updates, messages, and file exchanges will appear here once your engagement begins."
            action={{ label: "Request a consultation", href: "/contact" }}
          />
        </CardBody>
      </Card>

      {/* Upcoming modules */}
      <Card variant="muted">
        <CardHeader>
          <h2 className="text-sm font-semibold text-[#0D1B2A]">Available Modules</h2>
        </CardHeader>
        <CardBody>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { label: "Projects",  desc: "Track milestones and deliverables",  href: "/portal/projects" },
              { label: "Proposals", desc: "Review and accept project proposals", href: "/portal/proposals" },
              { label: "Files",     desc: "Secure file exchange",                href: "/portal/files" },
              { label: "Invoices",  desc: "Billing history and payments",        href: "/portal/invoices" },
              { label: "Messages",  desc: "Secure team communication",           href: "/portal/messages" },
              { label: "Support",   desc: "Submit and track support requests",   href: "/portal/support" },
            ].map((m) => (
              <li key={m.label}>
                <a
                  href={m.href}
                  className="flex flex-col gap-1 rounded-lg border border-black/10 bg-white p-4 shadow-card transition-all hover:border-[#4A7DB5]/30 hover:shadow-card-hover"
                >
                  <span className="text-sm font-semibold text-[#0D1B2A]">{m.label}</span>
                  <span className="text-xs text-neutral-500">{m.desc}</span>
                </a>
              </li>
            ))}
          </ul>
        </CardBody>
      </Card>
    </div>
  );
}
