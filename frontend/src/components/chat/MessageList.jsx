import { AnimatePresence } from "framer-motion";
import { ArrowDown } from "lucide-react";
import ChatMessage from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";
import EmptyState from "./EmptyState";
import { useAutoScroll } from "@/hooks/useAutoScroll";
import { cn } from "@/utils/helpers";

export default function MessageList({ messages, isLoading, onSuggestionClick }) {
  const { containerRef, isPinnedToBottom, scrollToBottom, handleScroll } =
    useAutoScroll(messages.length + (isLoading ? 1 : 0));

  if (messages.length === 0 && !isLoading) {
    return <EmptyState onSuggestionClick={onSuggestionClick} />;
  }

  return (
    <div className="relative flex-1 overflow-hidden">
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="scrollbar-thin h-full overflow-y-auto px-4 py-6 sm:px-8"
      >
        <div className="mx-auto flex max-w-3xl flex-col gap-5">
          <AnimatePresence initial={false}>
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
          </AnimatePresence>

          {isLoading && (
            <div className="flex items-center gap-3">
              <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border bg-card text-muted">
                <TypingIndicator />
              </div>
            </div>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={() => scrollToBottom()}
        aria-label="Scroll to latest message"
        className={cn(
          "absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted shadow-soft transition-all hover:text-foreground",
          isPinnedToBottom
            ? "pointer-events-none translate-y-2 opacity-0"
            : "translate-y-0 opacity-100"
        )}
      >
        <ArrowDown size={12} />
        New messages
      </button>
    </div>
  );
}
