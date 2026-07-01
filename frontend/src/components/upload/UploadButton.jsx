import { FileUp } from "lucide-react";
import { cn } from "@/utils/helpers";

export default function UploadButton({ onClick, className }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-2.5 rounded-lg border border-border bg-white/[0.02] px-3 py-2 text-sm text-muted transition-colors hover:border-primary/30 hover:bg-white/5 hover:text-foreground",
        className
      )}
    >
      <FileUp size={16} />
      Upload PDF
    </button>
  );
}
