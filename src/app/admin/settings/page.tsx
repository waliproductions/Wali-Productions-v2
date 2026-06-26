import { AdminCard } from "@/components/admin/AdminCard";
import { AdminButton } from "@/components/admin/AdminButton";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminBadge } from "@/components/admin/AdminBadge";

export const metadata = {
  title: "Settings",
};

interface EnvRow {
  label: string;
  hint: string;
}

const REQUIRED_ENV: EnvRow[] = [
  { label: "ADMIN_USERNAME", hint: "Username for HTTP Basic Auth on /admin." },
  { label: "ADMIN_PASSWORD", hint: "Password for HTTP Basic Auth on /admin." },
];

const OPTIONAL_ENV: EnvRow[] = [
  { label: "SMTP_HOST", hint: "Mail server host used by the contact pipeline." },
  { label: "SMTP_PORT", hint: "Mail server port." },
  { label: "SMTP_USER", hint: "Mail server username." },
  { label: "SMTP_PASS", hint: "Mail server password." },
];

function EnvList({ rows }: { rows: EnvRow[] }) {
  return (
    <ul className="divide-y divide-zinc-800/80">
      {rows.map((row) => (
        <li key={row.label} className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <code className="font-mono text-sm text-zinc-100">{row.label}</code>
            <p className="mt-0.5 text-xs text-zinc-500">{row.hint}</p>
          </div>
          <AdminBadge variant="neutral">Configured via environment</AdminBadge>
        </li>
      ))}
    </ul>
  );
}

export default function AdminSettingsPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Settings"
        description="Administrative configuration and environment reference."
        actions={
          <AdminButton href="/admin" variant="outline" size="md">
            Back to dashboard
          </AdminButton>
        }
      />

      <AdminCard
        title="Authentication"
        description="Admin access is protected by HTTP Basic Auth. Credentials are read from environment variables and are never displayed here."
      >
        <EnvList rows={REQUIRED_ENV} />
      </AdminCard>

      <AdminCard
        title="Email (contact pipeline)"
        description="SMTP settings used to deliver contact notifications. Values are managed through the deployment environment."
      >
        <EnvList rows={OPTIONAL_ENV} />
      </AdminCard>

      <AdminCard
        title="Government knowledge base"
        description="The Government section reads from src/config/government.ts. Update that file to publish verified identifiers and references."
      >
        <div className="flex flex-wrap items-center gap-3">
          <AdminButton href="/admin/government" variant="secondary" size="sm">
            Open Government section
          </AdminButton>
        </div>
      </AdminCard>
    </div>
  );
}
