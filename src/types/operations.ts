export type TaskPriority = "low" | "medium" | "high" | "urgent";
export type TaskStatus =
  | "backlog"
  | "todo"
  | "in-progress"
  | "blocked"
  | "done"
  | "cancelled";
export type TaskCategory =
  | "client"
  | "proposal"
  | "project"
  | "admin"
  | "government"
  | "internal";

export type Task = {
  id: string;
  title: string;
  description?: string;
  category: TaskCategory;
  status: TaskStatus;
  priority: TaskPriority;
  assigneeId?: string;
  clientId?: string;
  projectId?: string;
  proposalId?: string;
  dueDate?: string;
  completedAt?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
};

export type NotificationType =
  | "task-assigned"
  | "task-due"
  | "proposal-sent"
  | "proposal-accepted"
  | "proposal-expired"
  | "project-milestone"
  | "client-message"
  | "document-review"
  | "contract-action";

export type NotificationChannel = "in-app" | "email" | "both";

export type Notification = {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  read: boolean;
  channel: NotificationChannel;
  relatedEntityType?: "task" | "proposal" | "project" | "client" | "contract";
  relatedEntityId?: string;
  createdAt: string;
  readAt?: string;
};

export type MetricPeriod = "daily" | "weekly" | "monthly" | "quarterly" | "annual";
export type MetricTrend = "up" | "down" | "flat";

export type BusinessMetric = {
  id: string;
  label: string;
  value: number;
  unit?: string;
  period: MetricPeriod;
  trend: MetricTrend;
  trendValue?: number;
  context?: string;
  measuredAt: string;
};

export type PipelineStage =
  | "lead"
  | "qualified"
  | "proposal-sent"
  | "negotiation"
  | "closed-won"
  | "closed-lost";

export type PipelineEntry = {
  id: string;
  label: string;
  clientId?: string;
  clientName?: string;
  proposalId?: string;
  stage: PipelineStage;
  estimatedValue?: number;
  currency?: string;
  probability?: number;
  expectedCloseDate?: string;
  assigneeId?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};
