import { useRef, useState, useEffect, useCallback } from "react";

/**
 * Keeps a scroll container pinned to the bottom as new content streams in,
 * but stops auto-scrolling the moment the user manually scrolls up to read
 * earlier messages. Returns a ref to attach and a flag for showing a
 * "scroll to bottom" affordance.
 */
export function useAutoScroll(dependency) {
  const containerRef = useRef(null);
  const [isPinnedToBottom, setIsPinnedToBottom] = useState(true);

  const scrollToBottom = useCallback((behavior = "smooth") => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior });
  }, []);

  const handleScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const distanceFromBottom =
      el.scrollHeight - el.scrollTop - el.clientHeight;
    setIsPinnedToBottom(distanceFromBottom < 80);
  }, []);

  useEffect(() => {
    if (isPinnedToBottom) {
      scrollToBottom("smooth");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dependency]);

  return { containerRef, isPinnedToBottom, scrollToBottom, handleScroll };
}
