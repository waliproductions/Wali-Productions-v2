import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export const metadata = { title: "Security Events — Security" };

const EVENT_TYPES = [
  { type: "Login Success", severity: "Info", description: "Successful authentication", count: 0 },
  { type: "Login Failed", severity: "Low", description: "Bad credentials or locked account", count: 0 },
  { type: "Permission Denied", severity: "Medium", description: "Attempted access beyond role", count: 0 },
  { type: "Session Revoked", severity: "Low", description: "Session manually or auto-revoked", count: 0 },
  { type: "Password Reset", severity: "Low", description: "Password reset initiated or completed", count: 0 },
  { type: "MFA Event", severity: "Info", description: "MFA enabled, disabled, or failed", count: 0 },
  { type: "Rate Limit Exceeded", severity: "Medium", description: "Request rate limit hit", count: 0 },
  { type: "Suspicious Activity", severity: "High", description: "Unusual patterns detected", count: 0 },
  { type: "CSRF Violation", severity: "High", description: "Invalid CSRF token on mutation", count: 0 },
  { type: "Admin Action", severity: "Info", description: "Privileged admin operation", count: 0 },
] as const;

const SEVERITY_CONFIG: Record<string, string> = {
  Info: "bg-zinc-800 text-zinc-400",
  Low: "bg-blue-500/10 text-blue-400",
  Medium: "bg-amber-500/10 text-amber-400",
  High: "bg-red-500/10 text-red-400",
  Critical: "bg-red-600/20 text-red-300",
};

export default function AdminSecurityEventsPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Security Events"
        description="Real-time security event log — authentication, authorization, and suspicious activity."
        actions={
          <AdminButton href="/admin/security" variant="ghost" size="md">
            Back to security
          </AdminButton>
        }
      />

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStatCard label="Events (24h)" value="0" />
        <AdminStatCard label="Failed logins" value="0" hint="Last 24 hours" />
        <AdminStatCard label="High / Critical" value="0" hint="Needs review" />
        <AdminStatCard label="Unresolved alerts" value="0" hint="Open security alerts" />
      </section>

      <AdminCard title="Security Event Log">
        <AdminEmptyState
          title="No events recorded"
          description="Security events are recorded for every authentication attempt, permission denial, and administrative action. Events are immutable and retained per the audit retention policy."
        />
      </AdminCard>

      <AdminCard title="Event Types and Severity" description="All 24 tracked security event types">
        <div className="divide-y divide-zinc-800">
          {EVENT_TYPES.map(({ type, severity, description, count }) => (
            <div
              key={type}
              className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${SEVERITY_CONFIG[severity] ?? SEVERITY_CONFIG.Info}`}
                >
                  {severity}
                </span>
                <div>
                  <p className="text-sm font-medium text-zinc-200">{type}</p>
                  <p className="mt-0.5 text-xs text-zinc-500">{description}</p>
                </div>
              </div>
              <span className="text-sm font-semibold text-zinc-500">{count}</span>
            </div>
          ))}
        </div>
      </AdminCard>
    </div>
  );
}
