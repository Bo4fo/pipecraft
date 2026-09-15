"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Github, GitBranch } from "lucide-react";
import { Button, Input } from "@pipecraft/ui";

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas px-4">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href="/overview" className="flex items-center justify-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-md bg-accent-1 text-accent-fg">
            <GitBranch className="size-4" />
          </span>
          <span className="text-base font-semibold text-fg-primary">PipeCraft</span>
        </Link>

        <div className="rounded-lg border border-border-default bg-surface p-8 shadow-sm">
          <h1 className="text-lg font-semibold text-fg-primary">Sign in</h1>
          <p className="mt-1 text-sm text-fg-tertiary">Continue to your workspace&apos;s pipelines.</p>

          <form
            className="mt-6 flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              router.push("/overview");
            }}
          >
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-fg-secondary" htmlFor="email">
                Email
              </label>
              <Input id="email" type="email" placeholder="you@company.com" required />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-fg-secondary" htmlFor="password">
                Password
              </label>
              <Input id="password" type="password" placeholder="••••••••" required />
            </div>
            <Button type="submit" variant="outline">
              Continue
            </Button>

            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-border-default" />
              <span className="text-[11px] uppercase tracking-wide text-fg-tertiary">or</span>
              <div className="h-px flex-1 bg-border-default" />
            </div>

            <Button type="button" variant="secondary" onClick={() => router.push("/overview")}>
              <Github className="size-4" />
              Continue with GitHub SSO
            </Button>
          </form>
        </div>

        <p className="text-center text-xs text-fg-tertiary">
          Don&apos;t have an account? Contact your workspace admin.
        </p>
      </div>
    </div>
  );
}
