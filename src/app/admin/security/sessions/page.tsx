import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export const metadata = { title: "Active Sessions — Security" };

const REVOCATION_REASONS = [
  { reason: "Logout", description: "User-initiated sign out", count: 0 },
  { reason: "Admin Revoke", description: "Manually revoked by an administrator", count: 0 },
  { reason: "Expired", description: "Session TTL exceeded (7 days default)", count: 0 },
  { reason: "Suspicious", description: "Flagged by anomaly detection", count: 0 },
] as const;

export default function AdminSessionsPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Active Sessions"
        description="All current user sessions — view, inspect, and revoke access in real time."
        actions={
          <AdminButton href="/admin/security" variant="ghost" size="md">
            Back to security
          </AdminButton>
        }
      />

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStatCard label="Active sessions" value="0" hint="Currently valid" />
        <AdminStatCard label="Sessions today" value="0" hint="Created in last 24h" />
        <AdminStatCard label="Unique users" value="0" hint="With active sessions" />
        <AdminStatCard label="Revoked (24h)" value="0" hint="Ended sessions" />
      </section>

      <AdminCard
        title="Current Sessions"
        description="All unexpired, non-revoked sessions"
      >
        <AdminEmptyState
          title="No active sessions"
          description="User sessions appear here while active. Each session record includes IP address, user agent, creation time, last activity, and expiration. Admins can revoke any session immediately."
        />
      </AdminCard>

      <AdminCard title="Session Architecture" description="How sessions are managed">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-3 text-sm text-zinc-400">
            <p className="font-semibold text-zinc-200">Session Implementation</p>
            <ul className="space-y-1.5">
              {[
                "iron-session sealed cookies (AES-GCM + HMAC)",
                "SESSION_SECRET env var (min 32 chars)",
                "Cookie: __admin_session, HttpOnly, Secure",
                "SameSite=lax, Path=/, 7-day TTL",
                "Session data: userId, isLoggedIn, role",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-3 text-sm text-zinc-400">
            <p className="font-semibold text-zinc-200">Future Session Enhancements</p>
            <ul className="space-y-1.5">
              {[
                "Session record persistence in database",
                "IP address and user-agent fingerprinting",
                "Anomalous location detection",
                "Concurrent session limits per user",
                "Remember-me with extended TTL",
                "Admin forced re-authentication",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500/50" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </AdminCard>

      <AdminCard title="Session Revocation History">
        <div className="divide-y divide-zinc-800">
          {REVOCATION_REASONS.map(({ reason, description, count }) => (
            <div key={reason} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
              <div>
                <p className="text-sm font-medium text-zinc-200">{reason}</p>
                <p className="mt-0.5 text-xs text-zinc-500">{description}</p>
              </div>
              <span className="text-sm font-semibold text-zinc-400">{count}</span>
            </div>
          ))}
        </div>
      </AdminCard>
    </div>
  );
}
