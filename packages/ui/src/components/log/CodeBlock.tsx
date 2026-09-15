import * as React from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "../../lib/cn";
import { IconButton } from "../core/IconButton";

export interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
}

/**
 * Syntax-highlighted code block. Highlighting is loaded lazily via Shiki on
 * the client; until it resolves (or if it fails), plain monospace text is
 * shown so the block never blocks on the network/bundle.
 */
export function CodeBlock({ code, language = "bash", filename, showLineNumbers = false, className, ...props }: CodeBlockProps) {
  const [html, setHtml] = React.useState<string | null>(null);
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    let cancelled = false;
    import("shiki")
      .then(({ codeToHtml }) =>
        codeToHtml(code, {
          lang: language,
          themes: { light: "github-light", dark: "github-dark" },
          defaultColor: false,
        }),
      )
      .then((result) => {
        if (!cancelled) setHtml(result);
      })
      .catch(() => {
        // shiki couldn't load this grammar/theme combo — fall back to plain text
      });
    return () => {
      cancelled = true;
    };
  }, [code, language]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable; no-op
    }
  };

  return (
    <div className={cn("group relative overflow-hidden rounded-lg border border-border-default bg-log-bg", className)} {...props}>
      {filename && (
        <div className="border-b border-white/5 px-3 py-1.5 font-mono text-[11px] text-fg-tertiary">{filename}</div>
      )}
      <IconButton
        label={copied ? "Copied" : "Copy code"}
        size="sm"
        variant="ghost"
        onClick={handleCopy}
        className="absolute right-2 top-2 text-fg-tertiary opacity-0 transition-opacity hover:text-log-fg group-hover:opacity-100"
      >
        {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
      </IconButton>
      {html ? (
        <div
          className={cn(
            "overflow-x-auto p-3 text-xs leading-6 [&_pre]:!bg-transparent [&_code]:font-mono",
            showLineNumbers && "[&_code]:[counter-reset:line]",
          )}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <pre className="overflow-x-auto p-3 font-mono text-xs leading-6 text-log-fg">
          <code>{code}</code>
        </pre>
      )}
    </div>
  );
}
