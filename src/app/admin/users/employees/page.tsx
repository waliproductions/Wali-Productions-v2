import { AdminBadge } from "@/components/admin/AdminBadge";
import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export const metadata = { title: "Employees — Users" };

const EMPLOYMENT_TYPES = [
  { type: "Full-time", description: "Permanent salaried employees", count: 0 },
  { type: "Part-time", description: "Regular part-time staff", count: 0 },
  { type: "Intern", description: "Time-limited training positions", count: 0 },
] as const;

const EMPLOYEE_STATUSES = [
  { status: "Active", description: "Currently employed with platform access", count: 0 },
  { status: "On Leave", description: "Temporarily unavailable — access may be limited", count: 0 },
  { status: "Pending Start", description: "Onboarding in progress — access being provisioned", count: 0 },
  { status: "Terminated", description: "Access revoked at employment end", count: 0 },
] as const;

export default function AdminEmployeesPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Employees"
        description="Internal employee accounts — full-time, part-time, and intern platform access."
        actions={
          <AdminButton href="/admin/users" variant="ghost" size="md">
            Back to users
          </AdminButton>
        }
      />

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStatCard label="Total employees" value="0" />
        <AdminStatCard label="Active" value="0" hint="With system access" />
        <AdminStatCard label="Onboarding" value="0" hint="Pending start" />
        <AdminStatCard label="Clearance holders" value="0" hint="Gov clearance on file" />
      </section>

      <AdminCard
        title="Employee Directory"
        actions={<AdminBadge variant="neutral">Coming soon</AdminBadge>}
      >
        <AdminEmptyState
          title="No employees registered"
          description="Employee accounts are created during onboarding. Each account has an employment type, department, manager assignment, system roles, and an optional clearance level for government contract eligibility."
        />
      </AdminCard>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AdminCard title="By Employment Type">
          <div className="divide-y divide-zinc-800">
            {EMPLOYMENT_TYPES.map(({ type, description, count }) => (
              <div key={type} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                <div>
                  <p className="text-sm font-medium text-zinc-200">{type}</p>
                  <p className="mt-0.5 text-xs text-zinc-500">{description}</p>
                </div>
                <span className="text-sm font-semibold text-zinc-400">{count}</span>
              </div>
            ))}
          </div>
        </AdminCard>

        <AdminCard title="By Status">
          <div className="divide-y divide-zinc-800">
            {EMPLOYEE_STATUSES.map(({ status, description, count }) => (
              <div key={status} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                <div>
                  <p className="text-sm font-medium text-zinc-200">{status}</p>
                  <p className="mt-0.5 text-xs text-zinc-500">{description}</p>
                </div>
                <span className="text-sm font-semibold text-zinc-400">{count}</span>
              </div>
            ))}
          </div>
        </AdminCard>
      </div>

      <AdminCard title="Employee Onboarding Checklist" description="Steps completed during account provisioning">
        <ul className="space-y-2.5 text-sm text-zinc-400">
          {[
            "Email invitation sent via identity service",
            "Account created and email verified",
            "Temporary password set and password-change required flag set",
            "System roles assigned by admin",
            "Permission group assignment reviewed",
            "Department and manager linkage confirmed",
            "Clearance level recorded (if applicable)",
            "Government contracting eligibility flag set",
            "Onboarding completion recorded in lifecycle events",
          ].map((step, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-xs font-medium text-zinc-500">
                {i + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ul>
      </AdminCard>
    </div>
  );
}
