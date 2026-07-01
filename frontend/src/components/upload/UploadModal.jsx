import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import DropZone from "./DropZone";

export default function UploadModal({ open, onClose, onUploadComplete }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-2xl border border-border bg-card p-5 shadow-soft"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-foreground">
                Upload a PDF
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="rounded-md p-1 text-muted hover:text-foreground"
              >
                <X size={16} />
              </button>
            </div>
            <DropZone onUploadComplete={onUploadComplete} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
