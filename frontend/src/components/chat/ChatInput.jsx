import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Paperclip, Send, Square } from "lucide-react";
import { cn } from "@/utils/helpers";

export default function ChatInput({
  onSend,
  onAttachClick,
  isLoading,
  onStop,
  initialValue = "",
}) {
  const [value, setValue] = useState(initialValue);
  const textareaRef = useRef(null);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 200)}px`;
  }, [value]);

  function handleSubmit() {
    if (!value.trim() || isLoading) return;
    onSend(value);
    setValue("");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  return (
    <div className="border-t border-border bg-background/80 px-4 pb-4 pt-3 backdrop-blur-sm sm:px-8">
      <div className="mx-auto max-w-3xl">
        <div
          className={cn(
            "flex items-end gap-2 rounded-2xl border border-border bg-card px-3 py-2.5 shadow-soft transition-colors focus-within:border-primary/50"
          )}
        >
          <button
            type="button"
            onClick={onAttachClick}
            title="Attach a PDF"
            aria-label="Attach a PDF"
            className="mb-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted transition-colors hover:bg-white/5 hover:text-foreground"
          >
            <Paperclip size={17} />
          </button>

          <textarea
            ref={textareaRef}
            rows={1}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message Prodigy AI..."
            className="max-h-[200px] flex-1 resize-none bg-transparent py-1.5 text-sm text-foreground placeholder:text-muted focus:outline-none"
          />

          {isLoading ? (
            <motion.button
              whileTap={{ scale: 0.92 }}
              type="button"
              onClick={onStop}
              title="Stop generating"
              aria-label="Stop generating"
              className="mb-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-danger/15 text-danger transition-colors hover:bg-danger/25"
            >
              <Square size={14} fill="currentColor" />
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
              type="button"
              onClick={handleSubmit}
              disabled={!value.trim()}
              title="Send message"
              aria-label="Send message"
              className={cn(
                "mb-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors",
                value.trim()
                  ? "bg-primary text-primary-foreground hover:bg-primary-hover"
                  : "cursor-not-allowed bg-white/5 text-muted"
              )}
            >
              <Send size={15} />
            </motion.button>
          )}
        </div>
        <p className="mt-2 text-center text-[11px] text-muted">
          Enter to send · Shift + Enter for a new line
        </p>
      </div>
    </div>
  );
}
