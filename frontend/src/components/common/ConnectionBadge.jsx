import { useEffect, useState, useRef } from "react";
import { Wifi, WifiOff, Loader2 } from "lucide-react";
import { checkConnection } from "@/services/api";
import { CONNECTION_STATUS } from "@/utils/constants";
import { cn } from "@/utils/helpers";

const POLL_INTERVAL_MS = 20000;

const STATUS_CONFIG = {
  [CONNECTION_STATUS.ONLINE]: {
    label: "Connected",
    icon: Wifi,
    dot: "bg-success",
    text: "text-success",
  },
  [CONNECTION_STATUS.OFFLINE]: {
    label: "Offline",
    icon: WifiOff,
    dot: "bg-danger",
    text: "text-danger",
  },
  [CONNECTION_STATUS.CONNECTING]: {
    label: "Connecting",
    icon: Loader2,
    dot: "bg-warning",
    text: "text-warning",
  },
};

export default function ConnectionBadge({ className }) {
  const [status, setStatus] = useState(CONNECTION_STATUS.CONNECTING);
  const intervalRef = useRef(null);

  useEffect(() => {
    let mounted = true;

    async function poll() {
      const online = await checkConnection();
      if (!mounted) return;
      setStatus(online ? CONNECTION_STATUS.ONLINE : CONNECTION_STATUS.OFFLINE);
    }

    poll();
    intervalRef.current = setInterval(poll, POLL_INTERVAL_MS);

    return () => {
      mounted = false;
      clearInterval(intervalRef.current);
    };
  }, []);

  const config = STATUS_CONFIG[status];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "flex items-center gap-1.5 rounded-full border border-border bg-card/60 px-2.5 py-1 text-xs font-medium",
        config.text,
        className
      )}
      title={`Backend status: ${config.label}`}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          config.dot,
          status === CONNECTION_STATUS.ONLINE && "animate-pulse-soft"
        )}
      />
      <span className="hidden sm:inline">{config.label}</span>
      {status === CONNECTION_STATUS.CONNECTING && (
        <Icon size={12} className="animate-spin sm:hidden" />
      )}
    </div>
  );
}
