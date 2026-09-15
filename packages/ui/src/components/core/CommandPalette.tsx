import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Search } from "lucide-react";
import { cn } from "../../lib/cn";

export const CommandPalette = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn("flex w-full flex-col overflow-hidden rounded-lg bg-surface-raised text-fg-primary", className)}
    {...props}
  />
));
CommandPalette.displayName = "CommandPalette";

export interface CommandPaletteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  label?: string;
}

export function CommandPaletteDialog({ open, onOpenChange, children, label = "Command palette" }: CommandPaletteDialogProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-overlay animate-in fade-in-0" />
        <DialogPrimitive.Content
          className="fixed left-1/2 top-24 z-50 w-full max-w-xl -translate-x-1/2 overflow-hidden rounded-lg border border-border-default bg-surface-raised shadow-xl animate-in fade-in-0 zoom-in-95"
          aria-label={label}
        >
          <DialogPrimitive.Title className="sr-only">{label}</DialogPrimitive.Title>
          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export const CommandPaletteInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div className="flex items-center gap-2 border-b border-border-subtle px-3">
    <Search className="size-4 shrink-0 text-fg-tertiary" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        "flex h-11 w-full bg-transparent py-3 text-sm text-fg-primary outline-none placeholder:text-fg-tertiary disabled:opacity-50",
        className,
      )}
      {...props}
    />
  </div>
));
CommandPaletteInput.displayName = CommandPrimitive.Input.displayName;

export const CommandPaletteList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List ref={ref} className={cn("max-h-80 overflow-y-auto overflow-x-hidden p-1", className)} {...props} />
));
CommandPaletteList.displayName = CommandPrimitive.List.displayName;

export const CommandPaletteEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  <CommandPrimitive.Empty ref={ref} className="py-6 text-center text-sm text-fg-tertiary" {...props} />
));
CommandPaletteEmpty.displayName = CommandPrimitive.Empty.displayName;

export const CommandPaletteGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      "overflow-hidden p-1 text-fg-primary [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:text-fg-tertiary",
      className,
    )}
    {...props}
  />
));
CommandPaletteGroup.displayName = CommandPrimitive.Group.displayName;

export const CommandPaletteItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-fg-primary outline-none",
      "data-[selected=true]:bg-subtle data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
      className,
    )}
    {...props}
  />
));
CommandPaletteItem.displayName = CommandPrimitive.Item.displayName;
