import * as React from "react";
import { GitFork, Lock, Star } from "lucide-react";
import { cn } from "../../lib/cn";
import { Card, CardContent, CardHeader, CardTitle } from "../core/Card";
import { Badge } from "../core/Badge";

export interface RepositoryCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  owner: string;
  description?: string;
  language?: string;
  stars?: number;
  forks?: number;
  isPrivate?: boolean;
}

export const RepositoryCard = React.forwardRef<HTMLDivElement, RepositoryCardProps>(
  ({ name, owner, description, language, stars, forks, isPrivate, className, ...props }, ref) => (
    <Card ref={ref} className={cn(className)} {...props}>
      <CardHeader>
        <CardTitle className="flex items-center gap-1.5 font-mono">
          <span className="text-fg-tertiary">{owner}/</span>
          {name}
          {isPrivate && <Lock className="size-3.5 text-fg-tertiary" aria-label="Private repository" />}
        </CardTitle>
        {language && <Badge variant="outline">{language}</Badge>}
      </CardHeader>
      <CardContent className="pt-3">
        {description && <p className="mb-3 text-sm text-fg-secondary">{description}</p>}
        <div className="flex items-center gap-4 text-xs text-fg-tertiary">
          {typeof stars === "number" && (
            <span className="inline-flex items-center gap-1">
              <Star className="size-3.5" /> {stars.toLocaleString()}
            </span>
          )}
          {typeof forks === "number" && (
            <span className="inline-flex items-center gap-1">
              <GitFork className="size-3.5" /> {forks.toLocaleString()}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  ),
);
RepositoryCard.displayName = "RepositoryCard";
