import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export const metadata = { title: "Users" };

const MODULES = [
  {
    label: "Employees",
    description: "Internal staff with platform access",
    href: "/admin/users/employees",
    count: 0,
  },
  {
    label: "Contractors",
    description: "External contractors with scoped access",
    href: "/admin/users/contractors",
    count: 0,
  },
  {
    label: "Client Access",
    description: "Client portal accounts and permissions",
    href: "/admin/users/clients-access",
    count: 0,
  },
  {
    label: "Invitations",
    description: "Pending and sent invitations",
    href: "/admin/users/invitations",
    count: 0,
  },
] as const;

const ACCOUNT_TYPES = [
  {
    type: "Employee",
    description: "Full-time, part-time, or intern. Internal staff with operational platform access and role-based permissions.",
  },
  {
    type: "Contractor",
    description: "External contractors with time-limited, scoped access. Access tied to a contract record and sponsor. Expires automatically.",
  },
  {
    type: "Client",
    description: "Client portal access for project stakeholders, approvers, and invoice viewers. Scoped to their specific client account.",
  },
  {
    type: "Government Contact",
    description: "Government agency contacts (COR, CO, PM) linked to contracts and opportunities. Managed in CRM and Contract Records.",
  },
] as const;

export default function AdminUsersPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="User Management"
        description="Employee, contractor, and client account administration — identity, roles, and access control."
        actions={
          <AdminButton href="/admin" variant="ghost" size="md">
            Back to dashboard
          </AdminButton>
        }
      />

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStatCard label="Total accounts" value="0" hint="Across all types" />
        <AdminStatCard label="Active users" value="0" hint="With current access" />
        <AdminStatCard label="Pending invitations" value="0" hint="Awaiting acceptance" />
        <AdminStatCard label="Expiring access" value="0" hint="Within 30 days" />
      </section>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {MODULES.map(({ label, description, href, count }) => (
          <a
            key={href}
            href={href}
            className="group flex flex-col gap-3 rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 transition-colors hover:border-amber-400/40 hover:bg-zinc-900"
          >
            <div className="flex items-start justify-between">
              <p className="text-sm font-semibold text-zinc-100 group-hover:text-amber-400 transition-colors">
                {label}
              </p>
              <span className="rounded-full bg-zinc-800 px-2.5 py-0.5 text-xs font-medium text-zinc-400">
                {count}
              </span>
            </div>
            <p className="text-xs leading-relaxed text-zinc-500">{description}</p>
          </a>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AdminCard title="Recent Account Activity">
          <AdminEmptyState
            compact
            title="No recent activity"
            description="Account creation, status changes, and permission updates will appear here."
          />
        </AdminCard>

        <AdminCard title="Expiring Access">
          <AdminEmptyState
            compact
            title="No expiring access"
            description="Contractor and client accounts approaching their access expiration date will appear here."
          />
        </AdminCard>
      </div>

      <AdminCard title="Account Types" description="Platform identity architecture">
        <div className="divide-y divide-zinc-800">
          {ACCOUNT_TYPES.map(({ type, description }) => (
            <div key={type} className="py-4 first:pt-0 last:pb-0">
              <p className="text-sm font-semibold text-zinc-200">{type}</p>
              <p className="mt-1 text-xs leading-relaxed text-zinc-500">{description}</p>
            </div>
          ))}
        </div>
      </AdminCard>

      <AdminCard title="Identity Architecture" description="How authentication and authorization are separated">
        <div className="space-y-4 text-sm text-zinc-400">
          <p>
            Authentication (who you are) and authorization (what you can do) are managed independently:
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-zinc-800 bg-zinc-950/60 p-4">
              <p className="font-semibold text-zinc-200">Authentication Layer</p>
              <ul className="mt-2 space-y-1 text-xs text-zinc-500">
                <li>→ iron-session sealed cookies</li>
                <li>→ bcryptjs password hashing</li>
                <li>→ Future: OAuth 2.0 / SAML 2.0</li>
                <li>→ Future: MFA (TOTP, SMS)</li>
                <li>→ Session audit + lockout</li>
              </ul>
            </div>
            <div className="rounded-lg border border-zinc-800 bg-zinc-950/60 p-4">
              <p className="font-semibold text-zinc-200">Authorization Layer</p>
              <ul className="mt-2 space-y-1 text-xs text-zinc-500">
                <li>→ Role-based access control</li>
                <li>→ 6 built-in roles (roles.ts)</li>
                <li>→ Permission groups (identity.ts)</li>
                <li>→ Future: fine-grained policies</li>
                <li>→ Future: row-level security</li>
              </ul>
            </div>
          </div>
        </div>
      </AdminCard>
    </div>
  );
}
