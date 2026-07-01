import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";

export default function Toast({ message, onDismiss }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.96 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-24 left-1/2 z-50 flex w-[min(90vw,420px)] -translate-x-1/2 items-start gap-3 rounded-xl border border-danger/30 bg-card px-4 py-3 shadow-soft"
          role="alert"
        >
          <AlertTriangle size={18} className="mt-0.5 shrink-0 text-danger" />
          <p className="flex-1 text-sm text-foreground">{message}</p>
          <button
            type="button"
            onClick={onDismiss}
            aria-label="Dismiss"
            className="shrink-0 rounded-md p-0.5 text-muted hover:text-foreground"
          >
            <X size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
