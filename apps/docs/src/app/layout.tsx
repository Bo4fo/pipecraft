import type { Metadata } from "next";
import { Toaster } from "@pipecraft/ui";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "PipeCraft",
    template: "%s · PipeCraft",
  },
  description: "A developer-first design system and UI toolkit for CI/CD pipelines and DevOps dashboards.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
