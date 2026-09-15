import {
  AlertCircle,
  AlertTriangle,
  Ban,
  CheckCircle2,
  Clock,
  HeartPulse,
  ListTodo,
  Loader2,
  PowerOff,
  Rocket,
  SkipForward,
  XCircle,
  type LucideIcon,
} from "lucide-react";

/** Maps the icon name string stored in @pipecraft/tokens status config to an actual Lucide component. */
export const statusIconMap: Record<string, LucideIcon> = {
  CheckCircle2,
  HeartPulse,
  XCircle,
  PowerOff,
  Loader2,
  Rocket,
  Clock,
  ListTodo,
  SkipForward,
  Ban,
  AlertTriangle,
  AlertCircle,
};
