import { Loader2 } from "lucide-react";
import { cn } from "@/utils/helpers";

const SIZES = {
  sm: "h-3.5 w-3.5",
  md: "h-5 w-5",
  lg: "h-7 w-7",
};

export default function LoadingSpinner({ size = "md", className }) {
  return (
    <Loader2
      className={cn("animate-spin text-primary", SIZES[size], className)}
      aria-label="Loading"
    />
  );
}
