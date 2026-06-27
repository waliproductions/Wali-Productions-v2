import fs from "node:fs/promises";
import path from "node:path";

import { AdminBadge } from "@/components/admin/AdminBadge";
import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { governmentContent } from "@/config/government";
import { siteConfig } from "@/config/site";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Settings",
};

const CONTACT_DATA_ROOT = path.join(
  process.cwd(),
  "app-data",
  "contact-submissions"
);

async function checkPath(p: string): Promise<boolean> {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function countJsonFiles(dirPath: string): Promise<number> {
  try {
    const entries = await fs.readdir(dirPath);
    return entries.filter((f) => f.endsWith(".json")).length;
  } catch {
    return 0;
  }
}

function hasEnv(key: string): boolean {
  const val = process.env[key];
  return Boolean(val && val.trim().length > 0);
}

function StatusBadge({ ok, okLabel = "Configured", failLabel = "Not configured" }: {
  ok: boolean;
  okLabel?: string;
  failLabel?: string;
}) {
  return (
    <AdminBadge variant={ok ? "success" : "warning"}>
      {ok ? okLabel : failLabel}
    </AdminBadge>
  );
}

export default async function AdminSettingsPage() {
  // Env var presence checks — values are never read or displayed
  const authConfigured =
    hasEnv("ADMIN_USERNAME") && hasEnv("ADMIN_PASSWORD");
  const smtpConfigured =
    hasEnv("SMTP_HOST") &&
    hasEnv("SMTP_PORT") &&
    hasEnv("SMTP_USER") &&
    hasEnv("SMTP_PASS");
  const emailAddressesConfigured =
    hasEnv("CONTACT_TO_EMAIL") && hasEnv("CONTACT_FROM_EMAIL");

  // Storage health checks
  const [queueOk, processedOk, failedOk, archiveOk, logsOk] =
    await Promise.all([
      checkPath(path.join(CONTACT_DATA_ROOT, "queue")),
      checkPath(path.join(CONTACT_DATA_ROOT, "processed")),
      checkPath(path.join(CONTACT_DATA_ROOT, "failed")),
      checkPath(path.join(CONTACT_DATA_ROOT, "archive")),
      checkPath(path.join(CONTACT_DATA_ROOT, "logs", "events.jsonl")),
    ]);

  const storageHealthy = queueOk && processedOk && failedOk && archiveOk;

  // Submission counts — directory listing only, no JSON parsing
  const [queueCount, failedCount] = await Promise.all([
    countJsonFiles(path.join(CONTACT_DATA_ROOT, "queue")),
    countJsonFiles(path.join(CONTACT_DATA_ROOT, "failed")),
  ]);

  // Government readiness — matches isPending() logic in admin/government
  const regItems = governmentContent.registration.items;
  const verifiedRegCount = regItems.filter(
    (item) => !item.value.toLowerCase().includes("pending verified detail")
  ).length;

  const nodeVersion = process.version;
  const platform = process.platform;
  const arch = process.arch;
  const nodeEnv = process.env.NODE_ENV ?? "unknown";

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Settings"
        description="System diagnostics, environment configuration status, and pipeline health. Values are never displayed — only whether required configuration is present."
        actions={
          <AdminButton href="/admin" variant="outline" size="md">
            Back to dashboard
          </AdminButton>
        }
      />

      {/* Company information */}
      <AdminCard title="Company Information" description="From src/config/site.ts">
        <dl className="grid gap-3 text-sm sm:grid-cols-2">
          {[
            { label: "Name", value: siteConfig.name },
            { label: "Legal name", value: siteConfig.legalName },
            { label: "Identity", value: siteConfig.identity },
            { label: "Public URL", value: siteConfig.url || "Not configured (NEXT_PUBLIC_SITE_URL)" },
          ].map(({ label, value }) => (
            <div key={label} className="rounded-lg border border-zinc-800 bg-zinc-950/50 p-3">
              <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                {label}
              </dt>
              <dd className="mt-1 break-words text-zinc-200">{value}</dd>
            </div>
          ))}
        </dl>
      </AdminCard>

      {/* Configuration status */}
      <div className="grid gap-6 sm:grid-cols-2">
        <AdminCard title="Authentication" description="HTTP Basic Auth credentials">
          <ul className="divide-y divide-zinc-800/60">
            {[
              { label: "ADMIN_USERNAME", hint: "Basic Auth username for /admin" },
              { label: "ADMIN_PASSWORD", hint: "Basic Auth password for /admin" },
            ].map((row) => (
              <li
                key={row.label}
                className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <code className="font-mono text-sm text-zinc-100">
                    {row.label}
                  </code>
                  <p className="mt-0.5 text-xs text-zinc-500">{row.hint}</p>
                </div>
                <StatusBadge ok={hasEnv(row.label)} />
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-zinc-600">
            Overall auth config:{" "}
            <span className={authConfigured ? "text-emerald-400" : "text-amber-400"}>
              {authConfigured ? "both credentials present" : "incomplete — middleware not enforcing auth yet"}
            </span>
          </p>
        </AdminCard>

        <AdminCard title="Email / SMTP" description="Contact pipeline delivery credentials">
          <ul className="divide-y divide-zinc-800/60">
            {[
              { label: "SMTP_HOST", hint: "Mail server host" },
              { label: "SMTP_PORT", hint: "Mail server port" },
              { label: "SMTP_USER", hint: "Mail server username" },
              { label: "SMTP_PASS", hint: "Mail server password" },
              { label: "CONTACT_TO_EMAIL", hint: "Notification recipient address" },
              { label: "CONTACT_FROM_EMAIL", hint: "Sender address for notifications" },
            ].map((row) => (
              <li
                key={row.label}
                className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <code className="font-mono text-sm text-zinc-100">
                    {row.label}
                  </code>
                  <p className="mt-0.5 text-xs text-zinc-500">{row.hint}</p>
                </div>
                <StatusBadge ok={hasEnv(row.label)} />
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-zinc-600">
            SMTP delivery:{" "}
            <span className={smtpConfigured ? "text-emerald-400" : "text-amber-400"}>
              {smtpConfigured ? "configured" : "incomplete"}
            </span>
            {" · "}
            Email addresses:{" "}
            <span className={emailAddressesConfigured ? "text-emerald-400" : "text-amber-400"}>
              {emailAddressesConfigured ? "configured" : "incomplete"}
            </span>
          </p>
        </AdminCard>
      </div>

      {/* Storage health */}
      <AdminCard
        title="Runtime Storage"
        description="Contact submission directory health — app-data/contact-submissions/"
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { label: "queue/", ok: queueOk, hint: "Incoming submissions" },
            { label: "processed/", ok: processedOk, hint: "Delivered submissions" },
            { label: "failed/", ok: failedOk, hint: "Failed delivery submissions" },
            { label: "archive/", ok: archiveOk, hint: "Archived submissions" },
            { label: "logs/events.jsonl", ok: logsOk, hint: "Audit trail log file" },
          ].map(({ label, ok, hint }) => (
            <div
              key={label}
              className="rounded-lg border border-zinc-800 bg-zinc-950/50 p-3"
            >
              <div className="flex items-start justify-between gap-2">
                <code className="text-xs font-medium text-zinc-200">{label}</code>
                <StatusBadge ok={ok} okLabel="Present" failLabel="Missing" />
              </div>
              <p className="mt-1.5 text-xs text-zinc-500">{hint}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-4">
          <p className="text-sm text-zinc-400">
            Overall storage:{" "}
            <span className={storageHealthy ? "text-emerald-400" : "text-amber-400"}>
              {storageHealthy ? "healthy" : "directories missing — run the contact pipeline to initialize"}
            </span>
          </p>
          {!logsOk ? (
            <p className="text-xs text-zinc-500">
              Audit log file does not exist yet — created automatically on first submission.
            </p>
          ) : null}
        </div>
      </AdminCard>

      {/* Contact pipeline health */}
      <AdminCard title="Contact Pipeline Health" description="Current pipeline state">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <AdminStatCard
            label="Failed submissions"
            value={failedCount}
            hint={failedCount > 0 ? "Review required" : "No failures"}
            href={failedCount > 0 ? "/admin/contact?status=failed" : undefined}
          />
          <AdminStatCard
            label="In queue"
            value={queueCount}
            hint={queueCount > 0 ? "Awaiting delivery" : "Queue empty"}
            href={queueCount > 0 ? "/admin/contact?status=queue" : undefined}
          />
        </div>
        <p className="mt-4 text-xs text-zinc-600">
          View full submission history and audit events via Contact Inquiries and Audit Log.
        </p>
      </AdminCard>

      {/* Government readiness */}
      <AdminCard
        title="Government Readiness"
        description="From src/config/government.ts — registration items status"
      >
        <div className="flex flex-wrap items-center gap-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
              Registration items
            </p>
            <p className="mt-1 text-2xl font-semibold text-zinc-50">
              {regItems.length}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
              Verified / known status
            </p>
            <p className="mt-1 text-2xl font-semibold text-zinc-50">
              {verifiedRegCount}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
              Pending verified detail
            </p>
            <p className="mt-1 text-2xl font-semibold text-zinc-50">
              {regItems.length - verifiedRegCount}
            </p>
          </div>
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <AdminButton href="/admin/government" variant="secondary" size="sm">
            Open Government section
          </AdminButton>
          <AdminButton href="/government" external variant="outline" size="sm">
            View public page
          </AdminButton>
        </div>
      </AdminCard>

      {/* System information */}
      <AdminCard title="System Information" description="Runtime environment">
        <dl className="grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Node.js", value: nodeVersion },
            { label: "Platform", value: platform },
            { label: "Architecture", value: arch },
            { label: "NODE_ENV", value: nodeEnv },
          ].map(({ label, value }) => (
            <div key={label} className="rounded-lg border border-zinc-800 bg-zinc-950/50 p-3">
              <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                {label}
              </dt>
              <dd className="mt-1 font-mono text-sm text-zinc-200">{value}</dd>
            </div>
          ))}
        </dl>
      </AdminCard>
    </div>
  );
}
