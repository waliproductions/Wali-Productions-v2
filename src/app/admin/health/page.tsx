import fs from "node:fs/promises";
import path from "node:path";
import type { Metadata } from "next";

import { AdminCard } from "@/components/admin/AdminCard";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminBadge } from "@/components/admin/AdminBadge";
import { cn } from "@/lib/admin/utils";
import {
  validatePlatformConfig,
  type ConfigCheck,
  type ConfigGroup,
  type PlatformHealth,
} from "@/lib/config/validator";
import {
  contactRepository,
  organizationRepository,
  opportunityRepository,
  proposalRepository,
  contractRepository,
  projectRepository,
  knowledgeRepository,
  notificationRepository,
  activityRepository,
  workflowRepository,
  documentRepository,
  captureRepository,
  userAccountRepository,
  taskRepository,
  departmentRepository,
  agencyRepository,
  contractVehicleRepository,
} from "@/lib/repositories";

export const metadata: Metadata = {
  title: "System Health | Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

// ─── Status Display ───────────────────────────────────────────────────────────

const STATUS_LABEL: Record<string, string> = {
  configured: "Configured",
  missing: "Missing",
  invalid: "Invalid",
  warning: "Warning",
};

const STATUS_DOT: Record<string, string> = {
  configured: "bg-emerald-500",
  missing: "bg-red-500",
  invalid: "bg-red-500",
  warning: "bg-amber-400",
};

const STATUS_TEXT: Record<string, string> = {
  configured: "text-emerald-400",
  missing: "text-red-400",
  invalid: "text-red-400",
  warning: "text-amber-400",
};

const STATUS_BADGE: Record<string, string> = {
  configured: "success",
  missing: "danger",
  invalid: "danger",
  warning: "warning",
};

function OverallBanner({ health }: { health: PlatformHealth }) {
  if (health.healthy) {
    return (
      <div className="flex items-start gap-3 rounded-xl border border-emerald-800/60 bg-emerald-950/40 px-5 py-4">
        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500">
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3" aria-hidden="true">
            <path d="M5 13l4 4L19 7" />
          </svg>
        </span>
        <div>
          <p className="text-sm font-semibold text-emerald-300">
            All systems healthy
          </p>
          <p className="mt-0.5 text-sm text-emerald-700">
            {health.configuredCount} of {health.totalChecks} checks passed. No action required.
          </p>
        </div>
      </div>
    );
  }

  const hasWarning = health.warningCount > 0 && health.criticalCount === 0;

  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-xl border px-5 py-4",
        hasWarning
          ? "border-amber-800/60 bg-amber-950/40"
          : "border-red-800/60 bg-red-950/40"
      )}
    >
      <span
        className={cn(
          "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
          hasWarning ? "bg-amber-400" : "bg-red-500"
        )}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3" aria-hidden="true">
          <path d="M12 9v4M12 17h.01" />
        </svg>
      </span>
      <div>
        <p className={cn("text-sm font-semibold", hasWarning ? "text-amber-300" : "text-red-300")}>
          {health.criticalCount > 0
            ? `${health.criticalCount} critical issue${health.criticalCount !== 1 ? "s" : ""} — platform may not function correctly`
            : `${health.warningCount} warning${health.warningCount !== 1 ? "s" : ""} — review recommended`}
        </p>
        <p className={cn("mt-0.5 text-sm", hasWarning ? "text-amber-700" : "text-red-700")}>
          {health.configuredCount} of {health.totalChecks} checks passed.
          {health.criticalCount > 0 ? " Set the missing or invalid environment variables and redeploy." : ""}
        </p>
      </div>
    </div>
  );
}

function CheckRow({ check }: { check: ConfigCheck }) {
  return (
    <div className="flex items-start gap-3 py-3.5 first:pt-0 last:pb-0">
      <span
        className={cn(
          "mt-1.5 h-2 w-2 shrink-0 rounded-full",
          STATUS_DOT[check.status]
        )}
        aria-hidden="true"
      />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-zinc-200">{check.label}</span>
          <span className={cn("text-xs font-medium", STATUS_TEXT[check.status])}>
            {STATUS_LABEL[check.status]}
          </span>
        </div>
        <p className="mt-0.5 text-sm text-zinc-500">{check.message}</p>
        {check.guidance ? (
          <p className="mt-1 font-mono text-xs text-zinc-600">{check.guidance}</p>
        ) : null}
      </div>
      <AdminBadge variant={STATUS_BADGE[check.status] as "success" | "danger" | "warning"} className="mt-0.5 shrink-0">
        {STATUS_LABEL[check.status]}
      </AdminBadge>
    </div>
  );
}

function GroupCard({ group }: { group: ConfigGroup }) {
  const criticalCount = group.checks.filter(
    (c) => c.status === "missing" || c.status === "invalid"
  ).length;
  const warningCount = group.checks.filter((c) => c.status === "warning").length;

  let groupStatus: string;
  let groupStatusClass: string;
  if (criticalCount > 0) {
    groupStatus = `${criticalCount} issue${criticalCount !== 1 ? "s" : ""}`;
    groupStatusClass = "text-red-400";
  } else if (warningCount > 0) {
    groupStatus = `${warningCount} warning${warningCount !== 1 ? "s" : ""}`;
    groupStatusClass = "text-amber-400";
  } else {
    groupStatus = "Healthy";
    groupStatusClass = "text-emerald-400";
  }

  return (
    <AdminCard
      title={
        <span className="flex items-center gap-2">
          {group.label}
          {group.critical ? (
            <span className="rounded bg-red-950 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-red-400">
              Critical
            </span>
          ) : null}
        </span>
      }
      description={group.description}
      actions={
        <span className={cn("text-sm font-medium", groupStatusClass)}>
          {groupStatus}
        </span>
      }
    >
      <div className="divide-y divide-zinc-800/60">
        {group.checks.map((check) => (
          <CheckRow key={check.key} check={check} />
        ))}
      </div>
    </AdminCard>
  );
}

// ─── Storage stats ────────────────────────────────────────────────────────────

async function getDataDirSizeBytes(dirPath: string): Promise<number> {
  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true, recursive: true });
    let total = 0;
    for (const entry of entries) {
      if (entry.isFile()) {
        try {
          const fullPath = path.join(entry.parentPath ?? dirPath, entry.name);
          const stat = await fs.stat(fullPath);
          total += stat.size;
        } catch { /* skip unreadable */ }
      }
    }
    return total;
  } catch {
    return 0;
  }
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function HealthPage() {
  const health = validatePlatformConfig();

  const appDataPath = path.join(process.cwd(), "app-data");
  const [storageBytes, repoCounts] = await Promise.all([
    getDataDirSizeBytes(appDataPath),
    Promise.all([
      contactRepository.count(),
      organizationRepository.count(),
      opportunityRepository.count(),
      proposalRepository.count(),
      contractRepository.count(),
      projectRepository.count(),
      knowledgeRepository.count(),
      notificationRepository.count(),
      activityRepository.count(),
      workflowRepository.count(),
      documentRepository.count(),
      captureRepository.count(),
      userAccountRepository.count(),
      taskRepository.count(),
      departmentRepository.count(),
      agencyRepository.count(),
      contractVehicleRepository.count(),
    ]),
  ]);

  const REPO_LABELS = [
    "Contacts", "Organizations", "Opportunities", "Proposals",
    "Contracts", "Projects", "Knowledge", "Notifications",
    "Activity", "Workflows", "Documents", "Captures",
    "Users", "Tasks", "Departments", "Agencies", "Vehicles",
  ];

  const totalRecords = repoCounts.reduce((s, n) => s + n, 0);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="System Health"
        description="Environment configuration and runtime status. Values are never shown — only Configured, Missing, or Invalid."
      />

      <OverallBanner health={health} />

      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { label: "Total Checks", value: health.totalChecks, color: "text-zinc-100" },
          { label: "Configured", value: health.configuredCount, color: "text-emerald-400" },
          { label: "Issues", value: health.criticalCount, color: health.criticalCount > 0 ? "text-red-400" : "text-zinc-400" },
          { label: "Warnings", value: health.warningCount, color: health.warningCount > 0 ? "text-amber-400" : "text-zinc-400" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4"
          >
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
              {stat.label}
            </p>
            <p className={cn("mt-2 text-3xl font-semibold", stat.color)}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {health.groups.map((group) => (
        <GroupCard key={group.id} group={group} />
      ))}

      <AdminCard title="Storage" description="app-data/ directory on disk">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-lg border border-zinc-800 bg-zinc-950/50 p-4 text-center">
            <p className="text-2xl font-bold text-amber-400">{formatBytes(storageBytes)}</p>
            <p className="mt-1 text-xs text-zinc-500">Total data size</p>
          </div>
          <div className="rounded-lg border border-zinc-800 bg-zinc-950/50 p-4 text-center">
            <p className="text-2xl font-bold text-amber-400">{totalRecords}</p>
            <p className="mt-1 text-xs text-zinc-500">Total records</p>
          </div>
          <div className="rounded-lg border border-zinc-800 bg-zinc-950/50 p-4 text-center">
            <p className="text-2xl font-bold text-amber-400">{REPO_LABELS.length}</p>
            <p className="mt-1 text-xs text-zinc-500">Active repositories</p>
          </div>
          <div className="rounded-lg border border-zinc-800 bg-zinc-950/50 p-4 text-center">
            <p className="text-2xl font-bold text-zinc-400">JSON</p>
            <p className="mt-1 text-xs text-zinc-500">Storage backend</p>
          </div>
        </div>
        <p className="mt-4 text-xs text-zinc-600">
          Data is persisted to JSON files in app-data/. Repository layer abstractions are PostgreSQL-ready for a future migration.
        </p>
      </AdminCard>

      <AdminCard title="Repository Status" description="Record counts across all collections">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {REPO_LABELS.map((label, i) => (
            <div key={label} className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-950/40 px-3 py-2">
              <span className="text-xs text-zinc-400">{label}</span>
              <span className="text-sm font-semibold text-zinc-200">{repoCounts[i]}</span>
            </div>
          ))}
        </div>
      </AdminCard>

      <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 px-5 py-4">
        <p className="text-xs text-zinc-600">
          Health checks run at request time. After updating environment variables, redeploy the
          application and reload this page to reflect the new configuration state.
        </p>
      </div>
    </div>
  );
}
