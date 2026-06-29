import { notificationRepository } from "@/lib/repositories/notification.repository";
import type { InAppNotification } from "@/lib/store/types";
import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminBadge } from "@/components/admin/AdminBadge";
import { formatDate } from "@/lib/admin/utils";

export const dynamic = "force-dynamic";
export const metadata = { title: "Notification Center" };

type Props = { searchParams?: Promise<{ status?: string; category?: string; priority?: string }> };

const PRIORITY_VARIANT: Record<string, "success" | "info" | "neutral" | "warning" | "danger"> = {
  low: "neutral",
  normal: "neutral",
  high: "warning",
  urgent: "danger",
};

const CATEGORY_VARIANT: Record<string, "success" | "info" | "neutral" | "warning"> = {
  crm: "info",
  opportunity: "warning",
  proposal: "warning",
  project: "info",
  contract: "success",
  knowledge: "neutral",
  system: "neutral",
};

function NotificationItem({ n }: { n: InAppNotification }) {
  const isUnread = n.status === "unread";
  return (
    <div className={`rounded-xl border p-4 transition-colors ${
      isUnread
        ? "border-zinc-700 bg-zinc-900/80"
        : "border-zinc-800 bg-zinc-900/30"
    }`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            {isUnread && <span className="h-2 w-2 flex-shrink-0 rounded-full bg-amber-400" />}
            <p className={`text-sm font-medium ${isUnread ? "text-zinc-100" : "text-zinc-300"}`}>
              {n.title}
            </p>
          </div>
          <p className="mt-1 text-sm text-zinc-400">{n.body}</p>
          {n.actionLabel && n.actionHref && (
            <a
              href={n.actionHref}
              className="mt-2 inline-block text-xs font-medium text-amber-400 hover:text-amber-300"
            >
              {n.actionLabel} →
            </a>
          )}
          <p className="mt-2 text-xs text-zinc-600">{formatDate(n.createdAt)}</p>
        </div>
        <div className="flex flex-shrink-0 flex-col items-end gap-1.5">
          <AdminBadge variant={PRIORITY_VARIANT[n.priority] ?? "neutral"}>{n.priority}</AdminBadge>
          <AdminBadge variant={CATEGORY_VARIANT[n.category] ?? "neutral"}>{n.category}</AdminBadge>
        </div>
      </div>
    </div>
  );
}

export default async function AdminNotificationsPage({ searchParams }: Props) {
  const params = await searchParams;
  const statusFilter = params?.status ?? "unread";
  const categoryFilter = params?.category;
  const priorityFilter = params?.priority;

  const [unreadCount, result] = await Promise.all([
    notificationRepository.getUnreadCount(),
    notificationRepository.findAll({
      filters: [
        ...(statusFilter !== "all" ? [{ field: "status", operator: "eq" as const, value: statusFilter }] : []),
        ...(categoryFilter ? [{ field: "category", operator: "eq" as const, value: categoryFilter }] : []),
        ...(priorityFilter ? [{ field: "priority", operator: "eq" as const, value: priorityFilter }] : []),
      ],
      sort: { field: "createdAt", order: "desc" },
      perPage: 50,
    }),
  ]);

  const all = await notificationRepository.findAll({ perPage: 200 });
  const stats = {
    total: all.total,
    unread: unreadCount,
    high: all.items.filter((n) => n.priority === "high" || n.priority === "urgent").length,
    urgent: all.items.filter((n) => n.priority === "urgent").length,
  };

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Notification Center"
        description="All platform notifications — read, unread, by category and priority."
        actions={
          <AdminButton href="/admin" variant="ghost" size="md">
            Dashboard
          </AdminButton>
        }
      />

      <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <AdminStatCard label="Total" value={stats.total} />
        <AdminStatCard
          label="Unread"
          value={stats.unread}
          trend={stats.unread > 0 ? { value: "Needs attention", direction: "down" } : undefined}
        />
        <AdminStatCard label="High priority" value={stats.high} />
        <AdminStatCard
          label="Urgent"
          value={stats.urgent}
          trend={stats.urgent > 0 ? { value: "Immediate action", direction: "down" } : undefined}
        />
      </section>

      {/* Status filter */}
      <form className="flex flex-wrap gap-2" method="GET">
        {(["unread", "read", "all"] as const).map((status) => (
          <button
            key={status}
            type="submit"
            name="status"
            value={status}
            className={`rounded-lg border px-3 py-2 text-xs font-medium capitalize transition-colors ${
              statusFilter === status
                ? "border-amber-400 bg-amber-500/10 text-amber-300"
                : "border-zinc-700 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200"
            }`}
          >
            {status}
          </button>
        ))}
        <div className="ml-auto flex gap-2">
          {(["crm", "opportunity", "proposal", "project", "system"] as const).map((cat) => (
            <button
              key={cat}
              type="submit"
              name="category"
              value={categoryFilter === cat ? "" : cat}
              className={`rounded-lg border px-3 py-2 text-xs font-medium capitalize transition-colors ${
                categoryFilter === cat
                  ? "border-amber-400 bg-amber-500/10 text-amber-300"
                  : "border-zinc-700 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </form>

      <div className="space-y-3">
        {result.items.length === 0 ? (
          <AdminCard title="No notifications">
            <p className="text-sm text-zinc-500">
              {statusFilter === "unread"
                ? "You're all caught up — no unread notifications."
                : "No notifications match this filter."}
            </p>
          </AdminCard>
        ) : (
          <>
            <p className="text-xs text-zinc-500">{result.total} notification{result.total !== 1 ? "s" : ""}</p>
            {result.items.map((n) => (
              <NotificationItem key={n.id} n={n} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
