import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Status = "online" | "coding" | "listening";

const STATUS_COLORS: Record<Status, string> = {
  online: "bg-emerald-500",
  coding: "bg-sakura-500",
  listening: "bg-amber-500",
};

interface StatusBadgeProps {
  isPlaying?: boolean;
}

export function StatusBadge({ isPlaying = false }: StatusBadgeProps) {
  const [override, setOverride] = useState<Status | null>(null);
  const status: Status = override ?? "coding";
  const color = STATUS_COLORS[status];

  useEffect(() => {
    if (!isPlaying) {
      setOverride(null);
      return;
    }
    setOverride("listening");
    const id = setTimeout(() => setOverride(null), 5000);
    return () => clearTimeout(id);
  }, [isPlaying]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={status}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full glass text-[11px] text-ink-muted select-none"
        title={`Status: ${status}`}
      >
        <span className="relative flex items-center justify-center w-2 h-2">
          <motion.span
            className={`absolute inset-0 rounded-full ${color}`}
            animate={{ scale: [1, 2.2], opacity: [0.55, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
          />
          <motion.span
            className={`relative w-1.5 h-1.5 rounded-full ${color}`}
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
        <span className="font-medium">{status}</span>
      </motion.div>
    </AnimatePresence>
  );
}
