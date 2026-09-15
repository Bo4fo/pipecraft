"use client";

import { Moon, Sun } from "lucide-react";
import { IconButton } from "@pipecraft/ui";
import { useTheme } from "./theme-provider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <IconButton
      label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      variant="ghost"
      size="sm"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </IconButton>
  );
}
