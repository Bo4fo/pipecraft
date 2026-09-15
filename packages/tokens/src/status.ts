/**
 * The single source of truth for every status/state union used across
 * PipeCraft. Every component that renders a status (StatusBadge,
 * PipelineStatus, DeploymentStatus, BuildStatus, ServiceStatus,
 * EnvironmentBadge, HealthIndicator, UptimeIndicator, RunnerStatus, the
 * pipeline visualization, and the dashboard charts) resolves through
 * `getStatusConfig` instead of switching on the string itself.
 */

export const STATUS_KINDS = [
  "success",
  "failed",
  "running",
  "pending",
  "queued",
  "cancelled",
  "warning",
  "skipped",
  "deploying",
  "offline",
  "healthy",
  "degraded",
] as const;

export type StatusKind = (typeof STATUS_KINDS)[number];

/**
 * The color "role" a status maps to. Each role is a CSS custom property
 * pair (`--pc-status-{role}` / `--pc-status-{role}-bg`) defined in
 * pipecraft.css, so component code never hardcodes a hex value.
 */
export type StatusRole =
  | "success"
  | "danger"
  | "info"
  | "neutral"
  | "warning"
  | "accent";

export interface StatusConfig {
  kind: StatusKind;
  /** Human-readable label used as the default badge text. */
  label: string;
  /** Color role resolved to CSS variables at render time. */
  role: StatusRole;
  /** Lucide icon name (kept as a string to avoid an icons->tokens dependency). */
  icon: string;
  /** Whether the state represents in-progress work and should pulse/animate. */
  animated: boolean;
  /** Short description, used for tooltips and a11y labels. */
  description: string;
}

export const statusConfig: Record<StatusKind, StatusConfig> = {
  success: {
    kind: "success",
    label: "Success",
    role: "success",
    icon: "CheckCircle2",
    animated: false,
    description: "Completed successfully",
  },
  healthy: {
    kind: "healthy",
    label: "Healthy",
    role: "success",
    icon: "HeartPulse",
    animated: false,
    description: "Operating normally",
  },
  failed: {
    kind: "failed",
    label: "Failed",
    role: "danger",
    icon: "XCircle",
    animated: false,
    description: "Completed with errors",
  },
  offline: {
    kind: "offline",
    label: "Offline",
    role: "danger",
    icon: "PowerOff",
    animated: false,
    description: "Not reachable",
  },
  running: {
    kind: "running",
    label: "Running",
    role: "info",
    icon: "Loader2",
    animated: true,
    description: "Currently in progress",
  },
  deploying: {
    kind: "deploying",
    label: "Deploying",
    role: "info",
    icon: "Rocket",
    animated: true,
    description: "Deployment in progress",
  },
  pending: {
    kind: "pending",
    label: "Pending",
    role: "neutral",
    icon: "Clock",
    animated: false,
    description: "Waiting to start",
  },
  queued: {
    kind: "queued",
    label: "Queued",
    role: "neutral",
    icon: "ListTodo",
    animated: false,
    description: "Queued for execution",
  },
  skipped: {
    kind: "skipped",
    label: "Skipped",
    role: "neutral",
    icon: "SkipForward",
    animated: false,
    description: "Skipped intentionally",
  },
  cancelled: {
    kind: "cancelled",
    label: "Cancelled",
    role: "neutral",
    icon: "Ban",
    animated: false,
    description: "Cancelled before completion",
  },
  warning: {
    kind: "warning",
    label: "Warning",
    role: "warning",
    icon: "AlertTriangle",
    animated: false,
    description: "Completed with warnings",
  },
  degraded: {
    kind: "degraded",
    label: "Degraded",
    role: "warning",
    icon: "AlertCircle",
    animated: false,
    description: "Operating with reduced performance",
  },
};

export function getStatusConfig(kind: StatusKind): StatusConfig {
  return statusConfig[kind];
}

export function isStatusKind(value: string): value is StatusKind {
  return (STATUS_KINDS as readonly string[]).includes(value);
}
