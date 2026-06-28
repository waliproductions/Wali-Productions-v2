import type { Metadata } from "next";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";

export const metadata: Metadata = { title: "Support" };

export default function PortalSupportPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-[#0D1B2A]">
            Support
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            Submit and track service requests and support tickets.
          </p>
        </div>
        <Badge variant="pending" dot>Coming soon</Badge>
      </div>

      <Card>
        <CardHeader>
          <h2 className="text-sm font-semibold text-[#0D1B2A]">Support Tickets</h2>
        </CardHeader>
        <CardBody>
          <EmptyState
            title="No open tickets"
            description="Support requests and service tickets will appear here. In the meantime, reach us directly via the contact page."
            action={{ label: "Contact us", href: "/contact" }}
          />
        </CardBody>
      </Card>

      <Card variant="muted">
        <CardHeader>
          <h2 className="text-sm font-semibold text-[#0D1B2A]">What this module will include</h2>
        </CardHeader>
        <CardBody>
          <ul className="grid grid-cols-1 gap-2 text-sm text-neutral-600 sm:grid-cols-2">
            {[
              "Ticket submission with priority levels",
              "Real-time status tracking",
              "File attachments for context",
              "SLA tracking and escalation",
              "Resolution history",
              "Satisfaction feedback",
              "Knowledge base integration",
              "Multi-user ticket visibility",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-0.5 h-4 w-4 shrink-0 text-[#4A7DB5]" aria-hidden="true">
                  <svg fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </span>
                {item}
              </li>
            ))}
          </ul>
        </CardBody>
      </Card>
    </div>
  );
}
