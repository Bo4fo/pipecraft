import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { AlertCircle, AlertTriangle, CheckCircle2, Info } from "lucide-react";
import { cn } from "../../lib/cn";

export const alertVariants = cva("relative w-full rounded-lg border px-4 py-3 text-sm", {
  variants: {
    variant: {
      info: "border-status-info-border bg-status-info-bg text-status-info",
      success: "border-status-success-border bg-status-success-bg text-status-success",
      warning: "border-status-warning-border bg-status-warning-bg text-status-warning",
      danger: "border-status-danger-border bg-status-danger-bg text-status-danger",
    },
  },
  defaultVariants: { variant: "info" },
});

const iconMap = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  danger: AlertCircle,
} as const;

export interface AlertProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof alertVariants> {
  title?: React.ReactNode;
  hideIcon?: boolean;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = "info", title, hideIcon, children, ...props }, ref) => {
    const Icon = iconMap[variant ?? "info"];
    return (
      <div ref={ref} role="alert" className={cn(alertVariants({ variant }), "flex gap-2.5", className)} {...props}>
        {!hideIcon && <Icon className="mt-0.5 size-4 shrink-0" aria-hidden />}
        <div className="min-w-0 flex-1 text-fg-primary [&>*:first-child]:mt-0">
          {title && <p className="mb-0.5 font-medium">{title}</p>}
          <div className="text-fg-secondary">{children}</div>
        </div>
      </div>
    );
  },
);
Alert.displayName = "Alert";
