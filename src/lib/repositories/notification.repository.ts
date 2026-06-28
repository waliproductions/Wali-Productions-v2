import { BaseRepository } from "@/lib/store/base-repository";
import { COLLECTION_PATHS } from "@/lib/store/types";
import type { InAppNotification, NotificationStatus, NotificationCategory } from "@/lib/store/types";

class NotificationRepository extends BaseRepository<InAppNotification> {
  constructor() {
    super(COLLECTION_PATHS.notification, "notification");
  }

  protected buildSearchKeywords(e: InAppNotification): string[] {
    return [e.title, e.body, e.category, e.priority].filter(Boolean);
  }

  async findUnread(): Promise<InAppNotification[]> {
    const result = await this.findAll({
      filters: [{ field: "status", operator: "eq", value: "unread" }],
      sort: { field: "createdAt", order: "desc" },
      perPage: 100,
    });
    return result.items;
  }

  async findByCategory(category: NotificationCategory): Promise<InAppNotification[]> {
    const result = await this.findAll({
      filters: [{ field: "category", operator: "eq", value: category }],
      perPage: 100,
    });
    return result.items;
  }

  async markRead(id: string): Promise<InAppNotification | null> {
    const now = new Date().toISOString();
    return this.update(id, { status: "read" as NotificationStatus, readAt: now });
  }

  async markAllRead(): Promise<number> {
    const unread = await this.findUnread();
    const now = new Date().toISOString();
    let count = 0;
    for (const n of unread) {
      await this.update(n.id, { status: "read" as NotificationStatus, readAt: now });
      count++;
    }
    return count;
  }

  async getUnreadCount(): Promise<number> {
    return this.count({
      filters: [{ field: "status", operator: "eq", value: "unread" }],
    });
  }

  async createNotification(data: {
    category: InAppNotification["category"];
    priority?: InAppNotification["priority"];
    title: string;
    body: string;
    entityType?: InAppNotification["entityType"];
    entityId?: string;
    actionLabel?: string;
    actionHref?: string;
  }): Promise<InAppNotification> {
    return this.create({
      category: data.category,
      priority: data.priority ?? "normal",
      status: "unread",
      title: data.title,
      body: data.body,
      entityType: data.entityType,
      entityId: data.entityId,
      actionLabel: data.actionLabel,
      actionHref: data.actionHref,
    });
  }
}

export const notificationRepository = new NotificationRepository();

// ─── Notification engine ──────────────────────────────────────────────────────
// Route all notification creation through this function so future
// channel providers (email, SMS, Teams, Slack) can be wired here.

export async function dispatchNotification(data: Parameters<typeof notificationRepository.createNotification>[0]): Promise<void> {
  await notificationRepository.createNotification(data);
  // Future: await emailProvider.send(data), await slackProvider.send(data), etc.
}
