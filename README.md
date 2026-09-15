# PipeCraft

**A developer-first design system and UI toolkit for CI/CD pipelines and DevOps dashboards.**

_Build. Deploy. Observe._

PipeCraft gives you reusable, accessible React components for building interfaces like deployment platforms, CI/CD dashboards, infrastructure consoles, and observability products — so you stop redesigning the same pipeline visualizer, log viewer, and status badge from scratch on every internal tool.

```tsx
import { Pipeline, StatusBadge, DeploymentCard } from "@pipecraft/ui";
```

## Monorepo layout

```
apps/
  docs/          Next.js app: example DevOps dashboard + component documentation site
  playground/    scaffolded, not yet built out

packages/
  ui/            @pipecraft/ui — the component library
  tokens/        @pipecraft/tokens — design tokens (colors, spacing, type, the status system) + Tailwind preset
  charts/        @pipecraft/charts — themed Recharts wrappers for the dashboard's charts
  icons/         scaffolded, not yet built out (components currently use lucide-react directly)
  config/        shared tsconfig bases
```

Package manager: **pnpm** (workspaces). Build orchestration: **Turborepo**.

## Getting started

```bash
pnpm install
pnpm --filter @pipecraft/tokens build
pnpm --filter @pipecraft/ui build
pnpm --filter @pipecraft/charts build
pnpm --filter docs dev
```

Then open `http://localhost:3000` — it redirects to `/overview`, the example dashboard. Component documentation lives at `/components`.

Useful workspace scripts (via Turborepo): `pnpm build`, `pnpm dev`, `pnpm typecheck`, `pnpm test`.

## The status system

Every status you'll see across the library — pipeline stages, deployments, services, runners — comes from **one** union type and **one** resolver, both in `@pipecraft/tokens`:

```ts
type StatusKind =
  | "success" | "failed" | "running" | "pending" | "queued" | "cancelled"
  | "warning" | "skipped" | "deploying" | "offline" | "healthy" | "degraded";

getStatusConfig(status) // -> { label, role, icon, animated, description }
```

Components like `PipelineStatus`, `BuildStatus`, `DeploymentStatus`, `ServiceStatus`, and `RunnerStatus` are thin, type-narrowed wrappers around the shared `StatusBadge`, so color/icon/label/animation never drift between them. Colors are CSS custom properties (`--pc-status-*`) with light and dark values, so theming needs zero prop plumbing — just a `data-theme="dark"` attribute.

## What's implemented

- **Monorepo + tooling**: pnpm workspaces, Turborepo, shared TypeScript configs, Tailwind preset driven entirely by CSS variables from `@pipecraft/tokens`.
- **`@pipecraft/tokens`**: the full status system (12 states), spacing/radius/shadow/typography scales, and `pipecraft.css` with light + dark themes.
- **`@pipecraft/ui`** — 46 components, fully typed, `forwardRef` where it matters, `className` overrides throughout, built on Radix primitives where interaction/accessibility is non-trivial:
  - **Core**: Button, IconButton, Badge, StatusBadge, Card (+ subcomponents), Input, Textarea, Select, Tabs, Tooltip, Popover, Dialog, DropdownMenu, CommandPalette, Table, DataTable (sortable, with loading/empty states), Avatar, Skeleton, Progress, Alert, Toast (+ `useToast`/`Toaster`), EmptyState.
  - **Pipeline visualization**: Pipeline, PipelineStage, PipelineStep, PipelineConnector, PipelineStatus — renders Build → Test → Security Scan → Deploy → Verify with per-stage/per-step drill-down and animated connectors for running stages.
  - **Logs & code**: LogViewer (line numbers, timestamps, ANSI color parsing, search/filter, collapsible groups, copy, auto-scroll, error/warning highlighting), BuildLog, Terminal, CodeBlock (lazy-loaded Shiki syntax highlighting).
  - **DevOps**: DeploymentCard, DeploymentTimeline, DeploymentStatus, BuildStatus, EnvironmentCard, EnvironmentBadge, CommitCard, CommitHash, BranchBadge, RepositoryCard, PullRequestBadge, MetricCard, ServiceCard, ServiceStatus, IncidentBanner, UptimeIndicator, HealthIndicator, JobQueue, RunnerStatus, ArtifactCard, ReleaseCard.
- **`@pipecraft/charts`**: DeploymentFrequencyChart, BuildDurationChart, SuccessRateChart, IncidentHistoryChart, BuildsPerDayChart — Recharts wrapped with the token palette and a shared tooltip.
- **`apps/docs`**: a full example dashboard (Overview with metrics + charts, Pipelines list, Pipeline detail with interactive stage/step log inspection, Deployments, Environments, Services, Monitoring, Incidents, Analytics, Notifications, Integrations, Team, Settings) plus a standalone `/login` screen, all over realistic mock DevOps data, plus a `/components` documentation section (5 fully written pages — Button, StatusBadge, Pipeline, LogViewer, DeploymentCard — each with a live preview, install/usage snippets, an API table, and a11y notes; the remaining 41 components are implemented, exported, and listed in the index but don't yet have a dedicated doc page).
- **Testing**: Vitest + React Testing Library smoke tests for the core primitives (`packages/ui/src/components/__tests__`).

## What's scaffolded but not built out

- `packages/icons` — directory exists; components currently import `lucide-react` directly rather than through a PipeCraft icon package.
- `apps/playground` — directory exists, empty.
- Storybook and Playwright are named in the target stack but not wired up in this pass.
- 41 of 46 components don't have a written `/components/{slug}` documentation page yet (they're fully implemented — see `packages/ui/src/components` — just not individually documented in the docs site).

## Publishing as `@pipecraft/ui`

`packages/ui`, `packages/tokens`, and `packages/charts` each build to `dist/` via `tsup` with a proper `exports` map, `types`, and `react`/`react-dom` as `peerDependencies` — they're structured to be published to npm as-is (`npm publish` from each package directory after `pnpm build`), not just resolved via workspace path aliases.

`apps/docs` consumes them via `transpilePackages` in `next.config.mjs` for a fast local dev loop; that's a Next.js-side convenience and doesn't affect how the packages themselves ship.

## License

MIT
