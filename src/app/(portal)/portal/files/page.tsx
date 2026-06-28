import type { Metadata } from "next";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { Alert } from "@/components/ui/Alert";

export const metadata: Metadata = { title: "Files" };

export default function PortalFilesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-[#0D1B2A]">
            Files
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            Secure exchange of project documents and deliverables.
          </p>
        </div>
        <Badge variant="pending" dot>Coming soon</Badge>
      </div>

      <Alert variant="info" title="Secure file exchange">
        All shared files are access-controlled and only visible to authorized
        account members. Files are retained per the terms of your engagement.
      </Alert>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-[#0D1B2A]">Shared Files</h2>
          </div>
        </CardHeader>
        <CardBody>
          <EmptyState
            title="No files shared yet"
            description="Deliverables, contracts, reports, and other project documents shared by Wali Productions LLC will appear here."
            action={{ label: "Contact your project lead", href: "/contact" }}
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
              "Deliverable uploads and versioning",
              "Contract and proposal documents",
              "Project reports and status updates",
              "Access logs and download history",
              "File organization by project",
              "Secure client upload capability",
              "Retention policy per engagement",
              "Direct sharing via secure link",
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
