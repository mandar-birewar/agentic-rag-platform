import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Check, Copy } from "lucide-react";
import { cn } from "@/utils/helpers";

export default function CodeBlock({ language, value }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API can fail in insecure contexts — fail silently.
    }
  }

  return (
    <div className="group relative my-3 overflow-hidden rounded-lg border border-border bg-[#0d0d10]">
      <div className="flex items-center justify-between border-b border-border bg-white/[0.03] px-3 py-1.5">
        <span className="font-mono text-[11px] uppercase tracking-wide text-muted">
          {language || "text"}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className={cn(
            "flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] font-medium text-muted transition-colors hover:bg-white/5 hover:text-foreground"
          )}
        >
          {copied ? (
            <>
              <Check size={12} className="text-success" />
              Copied
            </>
          ) : (
            <>
              <Copy size={12} />
              Copy
            </>
          )}
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          margin: 0,
          padding: "0.875rem 1rem",
          background: "transparent",
          fontSize: "13px",
          lineHeight: 1.6,
        }}
        wrapLongLines
      >
        {value}
      </SyntaxHighlighter>
    </div>
  );
}
