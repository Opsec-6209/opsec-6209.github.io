import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TIMEZONE = "Europe/Berlin";
const STORAGE_KEY = "sakura-clock-format";

type Format = "24" | "12";

function getStoredFormat(): Format {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === "12" ? "12" : "24";
  } catch {
    return "24";
  }
}

function formatBerlinTime(date: Date, format: Format): { time: string; date: string } {
  const timeStr = new Intl.DateTimeFormat("en-US", {
    timeZone: TIMEZONE,
    hour12: format === "12",
    hour: format === "12" ? "numeric" : "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(date);

  const dateParts = new Intl.DateTimeFormat("en-GB", {
    timeZone: TIMEZONE,
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).formatToParts(date);

  let day = "";
  let month = "";
  let year = "";
  for (const part of dateParts) {
    if (part.type === "day") day = part.value;
    else if (part.type === "month") month = part.value;
    else if (part.type === "year") year = part.value;
  }

  return { time: timeStr, date: `${day} / ${month} / ${year}` };
}

export function Clock() {
  const [format, setFormat] = useState<Format>(getStoredFormat);
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const toggle = () => {
    setFormat((prev) => {
      const next: Format = prev === "24" ? "12" : "24";
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {}
      return next;
    });
  };

  const renderTime = () => {
    if (!now) return <span className="font-mono text-sm font-semibold tabular-nums text-ink-muted">--:--:--</span>;
    const { time } = formatBerlinTime(now, format);
    return (
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={format}
          initial={{ opacity: 0, y: -4, filter: "blur(2px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: 4, filter: "blur(2px)" }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="font-mono text-sm font-semibold tabular-nums text-ink"
        >
          {time}
        </motion.span>
      </AnimatePresence>
    );
  };

  const renderDate = () => {
    if (!now) return <span className="text-xs text-ink-muted tabular-nums">-- / -- / ----</span>;
    const { date } = formatBerlinTime(now, format);
    return <span className="text-xs text-ink-muted tabular-nums">{date}</span>;
  };

  return (
    <motion.button
      onClick={toggle}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className="inline-flex items-center gap-2 cursor-pointer select-none rounded-md px-1.5 py-1 hover:text-sakura-600 transition-colors"
      aria-label={`Toggle clock format (current: ${format}h)`}
      title="Click to toggle 12/24 hour format"
    >
      {renderTime()}
      <motion.span
        animate={{ opacity: [0.35, 1, 0.35], scale: [1, 1.15, 1] }}
        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
        className="w-1.5 h-1.5 rounded-full bg-sakura-500 shadow-[0_0_6px_rgba(255,77,141,0.6)]"
      />
      {renderDate()}
    </motion.button>
  );
}
