import * as React from "react";
import { cn } from "../../lib/cn";

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-md bg-gradient-to-r from-subtle via-muted to-subtle bg-[length:200%_100%] animate-pc-shimmer",
        className,
      )}
      {...props}
    />
  );
}
