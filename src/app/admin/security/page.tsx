import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export const metadata = { title: "Security" };

const MODULES = [
  {
    label: "Security Events",
    description: "Login failures, permission denials, suspicious activity",
    href: "/admin/security/events",
  },
  {
    label: "Active Sessions",
    description: "Current user sessions with device and location info",
    href: "/admin/security/sessions",
  },
] as const;

const SECURITY_CONTROLS = [
  {
    control: "Session Encryption",
    status: "Active",
    description: "iron-session AES-GCM sealed cookies. 7-day TTL. HttpOnly, Secure, SameSite=lax.",
  },
  {
    control: "Password Hashing",
    status: "Active",
    description: "bcryptjs with salt factor 10. No plaintext passwords stored anywhere.",
  },
  {
    control: "Authentication Required",
    status: "Active",
    description: "All /admin/* routes protected by middleware session check.",
  },
  {
    control: "Rate Limiting",
    status: "Planned",
    description: "Login endpoint rate limiting — max attempts before temporary block.",
  },
  {
    control: "Account Lockout",
    status: "Planned",
    description: "Automatic lock after configurable failed login attempts.",
  },
  {
    control: "MFA",
    status: "Planned",
    description: "TOTP, SMS, email second factor. Optional initially, enforceable by role.",
  },
  {
    control: "Secure Headers",
    status: "Planned",
    description: "CSP, HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy.",
  },
  {
    control: "CSRF Protection",
    status: "Planned",
    description: "Double-submit cookie pattern for state-changing requests.",
  },
  {
    control: "Audit Trail",
    status: "Planned",
    description: "Immutable audit records for all sensitive operations.",
  },
  {
    control: "Secret Rotation",
    status: "Planned",
    description: "Configurable rotation schedule for SESSION_SECRET and API keys.",
  },
] as const;

export default function AdminSecurityPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Security"
        description="Platform security posture — events, sessions, controls, and configuration validation."
        actions={
          <AdminButton href="/admin" variant="ghost" size="md">
            Back to dashboard
          </AdminButton>
        }
      />

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStatCard label="Open alerts" value="0" hint="Requires attention" />
        <AdminStatCard label="Events today" value="0" hint="Across all types" />
        <AdminStatCard label="Active sessions" value="0" hint="Current logins" />
        <AdminStatCard label="Failed logins (24h)" value="0" hint="Across all accounts" />
      </section>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {MODULES.map(({ label, description, href }) => (
          <a
            key={href}
            href={href}
            className="group flex flex-col gap-3 rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 transition-colors hover:border-amber-400/40 hover:bg-zinc-900"
          >
            <p className="text-sm font-semibold text-zinc-100 group-hover:text-amber-400 transition-colors">
              {label}
            </p>
            <p className="text-xs leading-relaxed text-zinc-500">{description}</p>
          </a>
        ))}
      </div>

      <AdminCard title="Security Controls" description="Current status of all platform security layers">
        <div className="divide-y divide-zinc-800">
          {SECURITY_CONTROLS.map(({ control, status, description }) => (
            <div
              key={control}
              className="flex items-start justify-between gap-4 py-4 first:pt-0 last:pb-0"
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-zinc-200">{control}</p>
                <p className="mt-1 text-xs leading-relaxed text-zinc-500">{description}</p>
              </div>
              <span
                className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  status === "Active"
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "bg-zinc-800 text-zinc-500"
                }`}
              >
                {status}
              </span>
            </div>
          ))}
        </div>
      </AdminCard>

      <AdminCard title="Open Security Alerts">
        <AdminEmptyState
          compact
          title="No open alerts"
          description="Security alerts for suspicious activity, repeated failures, and policy violations will surface here."
        />
      </AdminCard>
    </div>
  );
}
