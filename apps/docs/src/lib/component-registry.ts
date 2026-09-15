export interface ComponentRegistryEntry {
  name: string;
  slug: string;
  category: "Core" | "Pipeline" | "Logs" | "DevOps";
  /** Whether a full documentation page exists at /components/{slug}. */
  documented: boolean;
}

export const componentRegistry: ComponentRegistryEntry[] = [
  // Core
  { name: "Button", slug: "button", category: "Core", documented: true },
  { name: "IconButton", slug: "icon-button", category: "Core", documented: false },
  { name: "Badge", slug: "badge", category: "Core", documented: false },
  { name: "StatusBadge", slug: "status-badge", category: "Core", documented: true },
  { name: "Card", slug: "card", category: "Core", documented: false },
  { name: "Input", slug: "input", category: "Core", documented: false },
  { name: "Textarea", slug: "textarea", category: "Core", documented: false },
  { name: "Select", slug: "select", category: "Core", documented: false },
  { name: "Tabs", slug: "tabs", category: "Core", documented: false },
  { name: "Tooltip", slug: "tooltip", category: "Core", documented: false },
  { name: "Popover", slug: "popover", category: "Core", documented: false },
  { name: "Dialog", slug: "dialog", category: "Core", documented: false },
  { name: "DropdownMenu", slug: "dropdown-menu", category: "Core", documented: false },
  { name: "CommandPalette", slug: "command-palette", category: "Core", documented: false },
  { name: "Table", slug: "table", category: "Core", documented: false },
  { name: "DataTable", slug: "data-table", category: "Core", documented: false },
  { name: "Avatar", slug: "avatar", category: "Core", documented: false },
  { name: "Skeleton", slug: "skeleton", category: "Core", documented: false },
  { name: "Progress", slug: "progress", category: "Core", documented: false },
  { name: "Alert", slug: "alert", category: "Core", documented: false },
  { name: "Toast", slug: "toast", category: "Core", documented: false },
  { name: "EmptyState", slug: "empty-state", category: "Core", documented: false },

  // Pipeline visualization
  { name: "Pipeline", slug: "pipeline", category: "Pipeline", documented: true },
  { name: "PipelineStage", slug: "pipeline-stage", category: "Pipeline", documented: false },
  { name: "PipelineStep", slug: "pipeline-step", category: "Pipeline", documented: false },
  { name: "PipelineConnector", slug: "pipeline-connector", category: "Pipeline", documented: false },
  { name: "PipelineStatus", slug: "pipeline-status", category: "Pipeline", documented: false },

  // Logs & code
  { name: "LogViewer", slug: "log-viewer", category: "Logs", documented: true },
  { name: "BuildLog", slug: "build-log", category: "Logs", documented: false },
  { name: "Terminal", slug: "terminal", category: "Logs", documented: false },
  { name: "CodeBlock", slug: "code-block", category: "Logs", documented: false },

  // DevOps
  { name: "DeploymentCard", slug: "deployment-card", category: "DevOps", documented: true },
  { name: "DeploymentTimeline", slug: "deployment-timeline", category: "DevOps", documented: false },
  { name: "DeploymentStatus", slug: "deployment-status", category: "DevOps", documented: false },
  { name: "BuildStatus", slug: "build-status", category: "DevOps", documented: false },
  { name: "EnvironmentCard", slug: "environment-card", category: "DevOps", documented: false },
  { name: "EnvironmentBadge", slug: "environment-badge", category: "DevOps", documented: false },
  { name: "CommitCard", slug: "commit-card", category: "DevOps", documented: false },
  { name: "CommitHash", slug: "commit-hash", category: "DevOps", documented: false },
  { name: "BranchBadge", slug: "branch-badge", category: "DevOps", documented: false },
  { name: "RepositoryCard", slug: "repository-card", category: "DevOps", documented: false },
  { name: "PullRequestBadge", slug: "pull-request-badge", category: "DevOps", documented: false },
  { name: "MetricCard", slug: "metric-card", category: "DevOps", documented: false },
  { name: "ServiceCard", slug: "service-card", category: "DevOps", documented: false },
  { name: "ServiceStatus", slug: "service-status", category: "DevOps", documented: false },
  { name: "IncidentBanner", slug: "incident-banner", category: "DevOps", documented: false },
  { name: "UptimeIndicator", slug: "uptime-indicator", category: "DevOps", documented: false },
  { name: "HealthIndicator", slug: "health-indicator", category: "DevOps", documented: false },
  { name: "JobQueue", slug: "job-queue", category: "DevOps", documented: false },
  { name: "RunnerStatus", slug: "runner-status", category: "DevOps", documented: false },
  { name: "ArtifactCard", slug: "artifact-card", category: "DevOps", documented: false },
  { name: "ReleaseCard", slug: "release-card", category: "DevOps", documented: false },
];

export const componentCategories = ["Core", "Pipeline", "Logs", "DevOps"] as const;
