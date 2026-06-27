import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";

const STORAGE_KEY = "sakura-time-shift";
const EVENT_NAME = "sakura-time-shift-change";

function getStored(): boolean {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === null) return true;
    return v === "true";
  } catch {
    return true;
  }
}

export function TimeShiftToggle() {
  const [enabled, setEnabled] = useState<boolean>(getStored);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ enabled: boolean }>).detail;
      if (detail && typeof detail.enabled === "boolean") {
        setEnabled(detail.enabled);
      }
    };
    window.addEventListener(EVENT_NAME, handler);
    return () => window.removeEventListener(EVENT_NAME, handler);
  }, []);

  const toggle = () => {
    const next = !enabled;
    setEnabled(next);
    try {
      localStorage.setItem(STORAGE_KEY, String(next));
    } catch {}
    window.dispatchEvent(
      new CustomEvent(EVENT_NAME, { detail: { enabled: next } })
    );
  };

  return (
    <motion.button
      onClick={toggle}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.92 }}
      transition={{ duration: 0.2 }}
      className="fixed bottom-4 right-4 z-30 glass-strong rounded-full p-2.5 w-10 h-10 flex items-center justify-center shadow-lg shadow-sakura-500/10 hover:shadow-sakura-500/20"
      aria-label={enabled ? "Time-of-day auto-shift on" : "Time-of-day auto-shift off"}
      title={enabled ? "Disable time-of-day background" : "Enable time-of-day background"}
    >
      <AnimatePresence mode="wait" initial={false}>
        {enabled ? (
          <motion.span
            key="moon"
            initial={{ rotate: -180, opacity: 0, scale: 0.6 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 180, opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex items-center justify-center"
          >
            <Moon size={18} className="text-sakura-500" />
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            initial={{ rotate: -180, opacity: 0, scale: 0.6 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 180, opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex items-center justify-center"
          >
            <Sun size={18} className="text-amber-500" />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
