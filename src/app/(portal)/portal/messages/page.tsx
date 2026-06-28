import type { Metadata } from "next";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { Alert } from "@/components/ui/Alert";

export const metadata: Metadata = { title: "Messages" };

export default function PortalMessagesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-[#0D1B2A]">
            Messages
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            Secure communication with your Wali Productions project team.
          </p>
        </div>
        <Badge variant="pending" dot>Coming soon</Badge>
      </div>

      <Alert variant="info" title="Secure messaging">
        All messages are encrypted in transit and stored securely. Message
        history is retained for the duration of your engagement.
      </Alert>

      <Card>
        <CardHeader>
          <h2 className="text-sm font-semibold text-[#0D1B2A]">Conversations</h2>
        </CardHeader>
        <CardBody>
          <EmptyState
            title="No messages yet"
            description="Project updates, questions, and communications with your Wali Productions team will appear here."
            action={{ label: "Contact us now", href: "/contact" }}
            secondaryAction={{ label: "Learn about the portal", href: "/portal" }}
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
              "Project-scoped conversation threads",
              "File attachments in messages",
              "Read receipts and delivery status",
              "Message search and filtering",
              "Email notification integration",
              "Team member tagging",
              "Message archive and export",
              "Mobile-responsive interface",
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
