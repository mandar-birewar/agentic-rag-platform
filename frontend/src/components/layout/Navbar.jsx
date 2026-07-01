import { Menu, Sparkles } from "lucide-react";
import ConnectionBadge from "@/components/common/ConnectionBadge";
import ThemeToggle from "@/components/common/ThemeToggle";
import { APP_NAME } from "@/utils/constants";

export default function Navbar({ onMenuClick, chatTitle }) {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur-sm sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <button
          onClick={onMenuClick}
          aria-label="Open menu"
          className="rounded-md p-1.5 text-muted hover:text-foreground lg:hidden"
        >
          <Menu size={18} />
        </button>
        <div className="flex items-center gap-2 lg:hidden">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/15 text-primary">
            <Sparkles size={12} />
          </div>
          <span className="text-sm font-semibold text-foreground">
            {APP_NAME}
          </span>
        </div>
        {chatTitle && (
          <span className="hidden truncate text-sm font-medium text-foreground/80 lg:block">
            {chatTitle}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        <ConnectionBadge />
        <ThemeToggle />
      </div>
    </header>
  );
}
