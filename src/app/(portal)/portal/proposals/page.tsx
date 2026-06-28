import type { Metadata } from "next";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";

export const metadata: Metadata = { title: "Proposals" };

export default function PortalProposalsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-[#0D1B2A]">
            Proposals
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            Review, comment on, and accept project proposals.
          </p>
        </div>
        <Badge variant="pending" dot>Coming soon</Badge>
      </div>

      <Card>
        <CardHeader>
          <h2 className="text-sm font-semibold text-[#0D1B2A]">Proposals</h2>
        </CardHeader>
        <CardBody>
          <EmptyState
            title="No proposals yet"
            description="Proposals from Wali Productions LLC will appear here for your review and signature. You can comment, request revisions, and accept online."
            action={{ label: "Request a proposal", href: "/contact" }}
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
              "Proposal PDF preview and download",
              "Scope, assumptions, and exclusions",
              "Itemized pricing and milestone schedule",
              "Revision history and change tracking",
              "Online acceptance and e-signature",
              "Proposal expiration alerts",
              "Counter-proposal and comment threads",
              "Approved proposal archive",
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
