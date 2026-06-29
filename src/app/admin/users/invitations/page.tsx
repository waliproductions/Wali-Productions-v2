import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { userAccountRepository } from "@/lib/repositories";

export const dynamic = "force-dynamic";
export const metadata = { title: "Invitations — Users" };

const INVITATION_STATUSES = [
  { status: "Pending", description: "Sent and awaiting acceptance" },
  { status: "Accepted", description: "Invitation used and account created" },
  { status: "Expired", description: "Invitation window closed without acceptance" },
  { status: "Cancelled", description: "Manually cancelled before expiration" },
] as const;

const ACCOUNT_TYPES = [
  { type: "Employee", description: "Internal staff" },
  { type: "Contractor", description: "External contractors" },
  { type: "Client", description: "Client portal access" },
  { type: "Partner", description: "Teaming or referral partners" },
] as const;

export default async function AdminInvitationsPage() {
  const allUsers = await userAccountRepository.listAll();
  const pendingVerification = allUsers.filter(
    (u) => !u.deleted && !u.archived && u.status === "pending-verification",
  );

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Invitations"
        description="Track and manage all platform access invitations across account types."
        actions={
          <AdminButton href="/admin/users" variant="ghost" size="md">
            Back to users
          </AdminButton>
        }
      />

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStatCard label="Pending verification" value={String(pendingVerification.length)} hint="Email unconfirmed" />
        <AdminStatCard label="Accepted" value="0" hint="All time" />
        <AdminStatCard label="Expired" value="0" hint="Not acted upon" />
        <AdminStatCard label="Acceptance rate" value="—" hint="No data yet" />
      </section>

      <AdminCard title="Invitation Queue" description="All outstanding and historical invitations">
        {pendingVerification.length === 0 ? (
          <AdminEmptyState
            title="No pending invitations"
            description="Invitations are sent when creating new employee, contractor, client, or partner accounts. Each invitation has a configurable expiration window and can be resent if not accepted."
          />
        ) : (
          <div className="divide-y divide-zinc-800">
            {pendingVerification.map((u) => (
              <div key={u.id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                <div>
                  <p className="text-sm font-medium text-zinc-200">{u.displayName}</p>
                  <p className="text-xs text-zinc-500">{u.email} · {u.accountType}</p>
                </div>
                <span className="rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-medium text-amber-400">
                  pending
                </span>
              </div>
            ))}
          </div>
        )}
      </AdminCard>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AdminCard title="By Status">
          <div className="divide-y divide-zinc-800">
            {INVITATION_STATUSES.map(({ status, description }) => (
              <div key={status} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                <div>
                  <p className="text-sm font-medium text-zinc-200">{status}</p>
                  <p className="mt-0.5 text-xs text-zinc-500">{description}</p>
                </div>
                <span className="text-sm font-semibold text-zinc-400">0</span>
              </div>
            ))}
          </div>
        </AdminCard>

        <AdminCard title="By Account Type">
          <div className="divide-y divide-zinc-800">
            {ACCOUNT_TYPES.map(({ type, description }) => (
              <div key={type} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                <div>
                  <p className="text-sm font-medium text-zinc-200">{type}</p>
                  <p className="mt-0.5 text-xs text-zinc-500">{description}</p>
                </div>
                <span className="text-sm font-semibold text-zinc-400">0</span>
              </div>
            ))}
          </div>
        </AdminCard>
      </div>

      <AdminCard title="Invitation Workflow">
        <ol className="space-y-2 text-sm text-zinc-400">
          {[
            "Admin creates an invitation with account type, intended role, and optional personal note",
            "Signed invitation token is generated with configurable expiration (default: 48 hours)",
            "Invitation email is sent via the notification service",
            "Recipient clicks the link and completes account setup (name, password, MFA optional)",
            "Account created with pre-assigned role — invitation status set to Accepted",
            "If not accepted within the window, status becomes Expired and token is invalidated",
            "Admins can resend invitations up to 3 times before requiring a new invitation",
          ].map((step, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-xs font-medium text-zinc-500">
                {i + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </AdminCard>
    </div>
  );
}
