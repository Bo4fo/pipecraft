/**
 * Minimal ANSI SGR (Select Graphic Rendition) parser. Converts a string
 * containing `\x1b[...m` escape codes into an array of styled segments,
 * used by LogViewer/Terminal to render colored build/CI output.
 */

export interface AnsiSegment {
  text: string;
  className?: string;
}

const FG_COLORS: Record<number, string> = {
  30: "text-neutral-500",
  31: "text-red-400",
  32: "text-emerald-400",
  33: "text-amber-400",
  34: "text-blue-400",
  35: "text-purple-400",
  36: "text-cyan-400",
  37: "text-neutral-200",
  90: "text-neutral-500",
  91: "text-red-300",
  92: "text-emerald-300",
  93: "text-amber-300",
  94: "text-blue-300",
  95: "text-purple-300",
  96: "text-cyan-300",
  97: "text-white",
};

const ANSI_PATTERN = /\x1b\[([0-9;]*)m/g;

export function parseAnsi(input: string): AnsiSegment[] {
  const segments: AnsiSegment[] = [];
  let lastIndex = 0;
  let currentClasses: string[] = [];
  let match: RegExpExecArray | null;

  ANSI_PATTERN.lastIndex = 0;
  while ((match = ANSI_PATTERN.exec(input)) !== null) {
    const text = input.slice(lastIndex, match.index);
    if (text) segments.push({ text, className: currentClasses.join(" ") || undefined });

    const codes = match[1] ? match[1].split(";").map(Number) : [0];
    for (const code of codes) {
      if (code === 0) currentClasses = [];
      else if (code === 1) currentClasses.push("font-semibold");
      else if (code === 3) currentClasses.push("italic");
      else if (code === 4) currentClasses.push("underline");
      else if (FG_COLORS[code]) currentClasses = currentClasses.filter((c) => !c.startsWith("text-")).concat(FG_COLORS[code]!);
    }
    lastIndex = ANSI_PATTERN.lastIndex;
  }

  const rest = input.slice(lastIndex);
  if (rest) segments.push({ text: rest, className: currentClasses.join(" ") || undefined });
  if (segments.length === 0) segments.push({ text: input });
  return segments;
}

export function stripAnsi(input: string): string {
  return input.replace(ANSI_PATTERN, "");
}
