import * as React from "react";

export interface ToastOptions {
  id?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  variant?: "default" | "success" | "danger" | "warning";
  duration?: number;
}

export interface ToastState extends ToastOptions {
  id: string;
  open: boolean;
}

type Listener = (toasts: ToastState[]) => void;

let toasts: ToastState[] = [];
const listeners = new Set<Listener>();

function emit() {
  listeners.forEach((listener) => listener(toasts));
}

function genId() {
  return Math.random().toString(36).slice(2, 10);
}

export function toast(options: ToastOptions) {
  const id = options.id ?? genId();
  toasts = [...toasts, { ...options, id, open: true }];
  emit();
  return id;
}

export function dismissToast(id: string) {
  toasts = toasts.map((t) => (t.id === id ? { ...t, open: false } : t));
  emit();
  setTimeout(() => {
    toasts = toasts.filter((t) => t.id !== id);
    emit();
  }, 200);
}

export function useToast() {
  const [state, setState] = React.useState<ToastState[]>(toasts);

  React.useEffect(() => {
    listeners.add(setState);
    return () => {
      listeners.delete(setState);
    };
  }, []);

  return { toasts: state, toast, dismiss: dismissToast };
}
