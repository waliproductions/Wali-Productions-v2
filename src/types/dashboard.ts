/**
 * Dashboard widget and layout types — reusable reporting architecture.
 *
 * Widgets are composable units of data display. A DashboardLayout
 * arranges widgets into a named dashboard. Supports future dynamic
 * dashboards without hardcoding layouts in page components.
 */

export type WidgetType =
  | "metric"         // Single KPI number with trend
  | "chart-line"     // Line chart
  | "chart-bar"      // Bar chart
  | "chart-pie"      // Pie / donut chart
  | "table"          // Tabular data
  | "list"           // Simple item list
  | "pipeline"       // Pipeline stage visualization
  | "calendar"       // Event/deadline calendar
  | "status-grid"    // Multi-item status matrix
  | "activity-feed"  // Recent activity log
  | "progress"       // Progress toward goal
  | "alert";         // Attention / action required

export type WidgetSize = "xs" | "sm" | "md" | "lg" | "xl" | "full";

export type WidgetRefreshInterval =
  | "realtime"
  | "5min"
  | "15min"
  | "1hr"
  | "daily"
  | "manual";

export type ChartSeriesType = "line" | "bar" | "area" | "scatter";

export type MetricWidgetConfig = {
  label: string;
  valuePath: string;
  unit?: string;
  trendPath?: string;
  trendDirection?: "up-is-good" | "down-is-good" | "neutral";
  format?: "number" | "currency" | "percent" | "duration";
  currency?: string;
};

export type ChartWidgetConfig = {
  xAxisPath: string;
  series: {
    label: string;
    valuePath: string;
    type: ChartSeriesType;
    color?: string;
  }[];
  showLegend?: boolean;
  showGrid?: boolean;
  yAxisLabel?: string;
  xAxisLabel?: string;
};

export type TableWidgetConfig = {
  columns: {
    key: string;
    header: string;
    format?: "text" | "number" | "currency" | "date" | "badge" | "link";
  }[];
  rowLinkPath?: string;
  maxRows?: number;
};

export type DashboardWidget = {
  id: string;
  type: WidgetType;
  title: string;
  description?: string;
  size: WidgetSize;
  dataSource: string;
  filterParams?: Record<string, string>;
  refreshInterval?: WidgetRefreshInterval;
  config?: MetricWidgetConfig | ChartWidgetConfig | TableWidgetConfig;
  order: number;
};

export type DashboardLayout = {
  id: string;
  name: string;
  description?: string;
  slug: string;
  audience: "founder" | "operations" | "contracts" | "all";
  widgets: DashboardWidget[];
  defaultForRole?: string;
  createdAt: string;
  updatedAt: string;
};

export type ReportDomain =
  | "business-development"
  | "revenue"
  | "pipeline"
  | "proposal-success"
  | "project-status"
  | "government-opportunities"
  | "client-growth"
  | "website-analytics"
  | "support-activity"
  | "operational-health";

export type ReportConfig = {
  id: string;
  domain: ReportDomain;
  title: string;
  description?: string;
  widgets: DashboardWidget[];
  schedule?: "daily" | "weekly" | "monthly";
  recipients?: string[];
  lastGeneratedAt?: string;
};
