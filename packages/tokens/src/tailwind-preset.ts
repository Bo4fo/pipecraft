import type { Config } from "tailwindcss";

/**
 * Shared Tailwind preset. Every color/radius/shadow utility resolves to a
 * PipeCraft CSS variable, so `bg-surface` (light) automatically becomes the
 * dark-mode surface color with zero extra classes.
 */
const preset: Partial<Config> = {
  darkMode: ["selector", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        canvas: "var(--pc-bg-canvas)",
        surface: "var(--pc-bg-surface)",
        "surface-raised": "var(--pc-bg-surface-raised)",
        subtle: "var(--pc-bg-subtle)",
        muted: "var(--pc-bg-muted)",
        overlay: "var(--pc-bg-overlay)",
        "fg-primary": "var(--pc-fg-primary)",
        "fg-secondary": "var(--pc-fg-secondary)",
        "fg-tertiary": "var(--pc-fg-tertiary)",
        "fg-disabled": "var(--pc-fg-disabled)",
        "fg-inverse": "var(--pc-fg-inverse)",
        "fg-accent": "var(--pc-fg-accent)",
        "border-subtle": "var(--pc-border-subtle)",
        "border-default": "var(--pc-border-default)",
        "border-strong": "var(--pc-border-strong)",
        "border-focus": "var(--pc-border-focus)",
        accent: {
          1: "var(--pc-accent-1)",
          2: "var(--pc-accent-2)",
          fg: "var(--pc-accent-fg)",
        },
        status: {
          success: "var(--pc-status-success)",
          "success-bg": "var(--pc-status-success-bg)",
          "success-border": "var(--pc-status-success-border)",
          danger: "var(--pc-status-danger)",
          "danger-bg": "var(--pc-status-danger-bg)",
          "danger-border": "var(--pc-status-danger-border)",
          info: "var(--pc-status-info)",
          "info-bg": "var(--pc-status-info-bg)",
          "info-border": "var(--pc-status-info-border)",
          warning: "var(--pc-status-warning)",
          "warning-bg": "var(--pc-status-warning-bg)",
          "warning-border": "var(--pc-status-warning-border)",
          neutral: "var(--pc-status-neutral)",
          "neutral-bg": "var(--pc-status-neutral-bg)",
          "neutral-border": "var(--pc-status-neutral-border)",
          accent: "var(--pc-status-accent)",
          "accent-bg": "var(--pc-status-accent-bg)",
          "accent-border": "var(--pc-status-accent-border)",
        },
        log: {
          bg: "var(--pc-log-bg)",
          fg: "var(--pc-log-fg)",
          line: "var(--pc-log-line-number)",
          highlight: "var(--pc-log-highlight)",
        },
      },
      borderRadius: {
        sm: "var(--pc-radius-sm)",
        md: "var(--pc-radius-md)",
        lg: "var(--pc-radius-lg)",
        xl: "var(--pc-radius-xl)",
        full: "var(--pc-radius-full)",
      },
      boxShadow: {
        sm: "var(--pc-shadow-sm)",
        md: "var(--pc-shadow-md)",
        lg: "var(--pc-shadow-lg)",
        xl: "var(--pc-shadow-xl)",
      },
      fontFamily: {
        sans: "var(--pc-font-sans)",
        mono: "var(--pc-font-mono)",
      },
      keyframes: {
        "pc-pulse": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        "pc-spin": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "pc-shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "pc-pulse": "pc-pulse 1.6s ease-in-out infinite",
        "pc-spin": "pc-spin 0.8s linear infinite",
        "pc-shimmer": "pc-shimmer 1.8s linear infinite",
      },
    },
  },
};

export default preset;
