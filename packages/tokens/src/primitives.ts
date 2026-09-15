/** Spacing scale in rem, exposed as both a TS object (for JS consumers) and CSS vars (pipecraft.css). */
export const spacing = {
  0: "0",
  0.5: "0.125rem",
  1: "0.25rem",
  1.5: "0.375rem",
  2: "0.5rem",
  3: "0.75rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  8: "2rem",
  10: "2.5rem",
  12: "3rem",
  16: "4rem",
  20: "5rem",
  24: "6rem",
} as const;

export const radius = {
  none: "0",
  sm: "0.25rem",
  md: "0.5rem",
  lg: "0.75rem",
  xl: "1rem",
  full: "9999px",
} as const;

export const shadow = {
  none: "none",
  sm: "0 1px 2px 0 rgb(0 0 0 / 0.04)",
  md: "0 1px 3px 0 rgb(0 0 0 / 0.08), 0 1px 2px -1px rgb(0 0 0 / 0.06)",
  lg: "0 4px 12px -2px rgb(0 0 0 / 0.10), 0 2px 4px -2px rgb(0 0 0 / 0.06)",
  xl: "0 12px 24px -4px rgb(0 0 0 / 0.14), 0 4px 8px -4px rgb(0 0 0 / 0.08)",
} as const;

export const fontFamily = {
  sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Inter, Helvetica, Arial, sans-serif',
  mono: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace',
} as const;

export const fontSize = {
  xs: ["0.75rem", "1rem"],
  sm: ["0.8125rem", "1.25rem"],
  base: ["0.875rem", "1.375rem"],
  md: ["0.9375rem", "1.5rem"],
  lg: ["1.0625rem", "1.625rem"],
  xl: ["1.25rem", "1.75rem"],
  "2xl": ["1.5rem", "2rem"],
  "3xl": ["1.875rem", "2.375rem"],
} as const;

export const fontWeight = {
  normal: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
} as const;

export type SpacingToken = keyof typeof spacing;
export type RadiusToken = keyof typeof radius;
export type ShadowToken = keyof typeof shadow;
export type FontSizeToken = keyof typeof fontSize;
