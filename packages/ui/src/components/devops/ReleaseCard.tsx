import * as React from "react";
import { Tag } from "lucide-react";
import { cn } from "../../lib/cn";
import { formatRelativeTime } from "../../lib/format";
import { Badge } from "../core/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "../core/Card";

export interface ReleaseCardProps extends React.HTMLAttributes<HTMLDivElement> {
  version: string;
  name?: string;
  publishedAt: string;
  isPrerelease?: boolean;
  isLatest?: boolean;
  notes?: string;
}

export const ReleaseCard = React.forwardRef<HTMLDivElement, ReleaseCardProps>(
  ({ version, name, publishedAt, isPrerelease, isLatest, notes, className, ...props }, ref) => (
    <Card ref={ref} className={cn(className)} {...props}>
      <CardHeader>
        <CardTitle className="flex items-center gap-1.5 font-mono">
          <Tag className="size-3.5 text-fg-tertiary" aria-hidden />
          {version}
        </CardTitle>
        <div className="flex items-center gap-1.5">
          {isLatest && <Badge variant="success">Latest</Badge>}
          {isPrerelease && <Badge variant="warning">Pre-release</Badge>}
        </div>
      </CardHeader>
      <CardContent className="pt-3">
        {name && <p className="text-sm font-medium text-fg-primary">{name}</p>}
        {notes && <p className="mt-1 text-sm text-fg-secondary">{notes}</p>}
        <p className="mt-2 text-xs text-fg-tertiary">Published {formatRelativeTime(publishedAt)}</p>
      </CardContent>
    </Card>
  ),
);
ReleaseCard.displayName = "ReleaseCard";
