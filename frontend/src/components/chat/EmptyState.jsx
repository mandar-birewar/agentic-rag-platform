import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { EMPTY_STATE_SUGGESTIONS, APP_NAME } from "@/utils/constants";

export default function EmptyState({ onSuggestionClick }) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/30 bg-glow-blue shadow-glow"
      >
        <Sparkles size={24} className="text-primary" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="text-2xl font-semibold tracking-tight text-foreground"
      >
        What can I help with?
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="mt-2 max-w-md text-sm text-muted"
      >
        Ask {APP_NAME} anything, or upload a PDF and dig into it together.
      </motion.p>

      <div className="mt-8 grid w-full max-w-xl grid-cols-1 gap-3 sm:grid-cols-2">
        {EMPTY_STATE_SUGGESTIONS.map((suggestion, index) => (
          <motion.button
            key={suggestion.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.2 + index * 0.05 }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSuggestionClick?.(suggestion.title)}
            className="rounded-xl border border-border bg-card px-4 py-3 text-left transition-colors hover:border-primary/40 hover:bg-white/[0.03]"
          >
            <p className="text-sm font-medium text-foreground">
              {suggestion.title}
            </p>
            <p className="mt-0.5 text-xs text-muted">{suggestion.subtitle}</p>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
