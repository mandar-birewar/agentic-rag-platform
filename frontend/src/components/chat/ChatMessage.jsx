import { memo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion } from "framer-motion";
import { Bot, User, Copy, Check } from "lucide-react";
import { useState } from "react";
import CodeBlock from "./CodeBlock";
import { ROLES } from "@/utils/constants";
import { formatTime, cn } from "@/utils/helpers";

function ChatMessage({ message }) {
  const isUser = message.role === ROLES.USER;
  const [copied, setCopied] = useState(false);

  async function handleCopyMessage() {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Ignore clipboard failures.
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={cn("flex w-full gap-3", isUser && "flex-row-reverse")}
    >
      <div
        className={cn(
          "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border",
          isUser
            ? "border-primary/30 bg-primary/15 text-primary"
            : "border-border bg-card text-muted"
        )}
      >
        {isUser ? <User size={14} /> : <Bot size={14} />}
      </div>

      <div
        className={cn(
          "group relative flex max-w-[80%] flex-col gap-1",
          isUser && "items-end"
        )}
      >
        <div
          className={cn(
            "rounded-2xl px-4 py-2.5 text-sm shadow-soft",
            isUser
              ? "rounded-tr-sm bg-primary text-primary-foreground"
              : "rounded-tl-sm border border-border bg-card text-foreground"
          )}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap break-words">{message.content}</p>
          ) : (
            <div className="markdown-body">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    const value = String(children).replace(/\n$/, "");
                    if (inline) {
                      return (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    }
                    return (
                      <CodeBlock
                        language={match ? match[1] : ""}
                        value={value}
                      />
                    );
                  },
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 px-1 text-[11px] text-muted opacity-0 transition-opacity group-hover:opacity-100">
          <span>{formatTime(message.createdAt)}</span>
          <button
            type="button"
            onClick={handleCopyMessage}
            className="flex items-center gap-1 hover:text-foreground"
            aria-label="Copy message"
          >
            {copied ? <Check size={11} className="text-success" /> : <Copy size={11} />}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default memo(ChatMessage);
