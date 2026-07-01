import { useCallback, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, UploadCloud, CheckCircle2, XCircle, X } from "lucide-react";
import { uploadPdf } from "@/services/api";
import { validatePdfFile, formatFileSize, cn } from "@/utils/helpers";
import { MAX_FILE_SIZE_MB } from "@/utils/constants";

const STATES = {
  IDLE: "idle",
  UPLOADING: "uploading",
  SUCCESS: "success",
  ERROR: "error",
};

export default function DropZone({ onUploadComplete }) {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState(STATES.IDLE);
  const [errorMessage, setErrorMessage] = useState(null);
  const inputRef = useRef(null);

  const reset = useCallback(() => {
    setFile(null);
    setProgress(0);
    setStatus(STATES.IDLE);
    setErrorMessage(null);
  }, []);

  const startUpload = useCallback(
    async (selectedFile) => {
      const { valid, error } = validatePdfFile(selectedFile, MAX_FILE_SIZE_MB);
      if (!valid) {
        setFile(selectedFile);
        setStatus(STATES.ERROR);
        setErrorMessage(error);
        return;
      }

      setFile(selectedFile);
      setStatus(STATES.UPLOADING);
      setProgress(0);
      setErrorMessage(null);

      try {
        const message = await uploadPdf(selectedFile, setProgress);
        setStatus(STATES.SUCCESS);
        onUploadComplete?.({ file: selectedFile, message });
      } catch (err) {
        setStatus(STATES.ERROR);
        setErrorMessage(err.message || "Upload failed. Please try again.");
      }
    },
    [onUploadComplete]
  );

  function handleDrop(e) {
    e.preventDefault();
    setIsDragging(false);
    const dropped = e.dataTransfer.files?.[0];
    if (dropped) startUpload(dropped);
  }

  function handleFileSelect(e) {
    const selected = e.target.files?.[0];
    if (selected) startUpload(selected);
    e.target.value = "";
  }

  return (
    <div className="w-full">
      <motion.div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => status === STATES.IDLE && inputRef.current?.click()}
        animate={{
          borderColor: isDragging
            ? "#3B82F6"
            : status === STATES.ERROR
            ? "#EF4444"
            : status === STATES.SUCCESS
            ? "#22C55E"
            : "#27272A",
          scale: isDragging ? 1.01 : 1,
        }}
        className={cn(
          "relative flex min-h-[220px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed bg-card/60 px-6 py-10 text-center transition-colors",
          status !== STATES.IDLE && "cursor-default"
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={handleFileSelect}
        />

        <AnimatePresence mode="wait">
          {status === STATES.IDLE && (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/30 bg-glow-blue">
                <UploadCloud size={24} className="text-primary" />
              </div>
              <p className="text-sm font-medium text-foreground">
                Drag and drop a PDF, or click to browse
              </p>
              <p className="mt-1 text-xs text-muted">
                Supports PDF up to {MAX_FILE_SIZE_MB}MB
              </p>
            </motion.div>
          )}

          {status === STATES.UPLOADING && (
            <motion.div
              key="uploading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex w-full max-w-xs flex-col items-center"
            >
              <FileText size={28} className="mb-3 text-primary" />
              <p className="max-w-full truncate text-sm font-medium text-foreground">
                {file?.name}
              </p>
              <p className="mb-3 text-xs text-muted">
                {formatFileSize(file?.size ?? 0)}
              </p>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut" }}
                />
              </div>
              <p className="mt-2 text-xs text-muted">{progress}%</p>
            </motion.div>
          )}

          {status === STATES.SUCCESS && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center"
            >
              <CheckCircle2 size={32} className="mb-3 text-success" />
              <p className="text-sm font-medium text-foreground">
                Uploaded successfully
              </p>
              <p className="mt-1 max-w-full truncate text-xs text-muted">
                {file?.name}
              </p>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  reset();
                }}
                className="mt-4 rounded-lg border border-border px-3 py-1.5 text-xs text-muted hover:text-foreground"
              >
                Upload another
              </button>
            </motion.div>
          )}

          {status === STATES.ERROR && (
            <motion.div
              key="error"
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center"
            >
              <XCircle size={32} className="mb-3 text-danger" />
              <p className="text-sm font-medium text-foreground">
                Upload failed
              </p>
              <p className="mt-1 max-w-xs text-xs text-muted">
                {errorMessage}
              </p>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  reset();
                }}
                className="mt-4 rounded-lg border border-border px-3 py-1.5 text-xs text-muted hover:text-foreground"
              >
                Try again
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {status !== STATES.IDLE && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              reset();
            }}
            aria-label="Dismiss"
            className="absolute right-3 top-3 rounded-md p-1 text-muted hover:text-foreground"
          >
            <X size={14} />
          </button>
        )}
      </motion.div>
    </div>
  );
}
