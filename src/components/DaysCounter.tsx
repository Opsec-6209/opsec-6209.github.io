import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const START_DATE = new Date(2026, 0, 1);

function getDaysSince2026(): number {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const diff = today.getTime() - START_DATE.getTime();
  return Math.max(1, Math.floor(diff / 86400000) + 1);
}

export function DaysCounter() {
  const [day, setDay] = useState(0);
  const target = getDaysSince2026();

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const duration = 1500;

    const animate = (t: number) => {
      const elapsed = t - start;
      const progress = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDay(Math.round(eased * target));
      if (progress < 1) {
        raf = requestAnimationFrame(animate);
      }
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [target]);

  return (
    <div className="glass rounded-full px-3 py-1.5 text-[11px] text-ink-muted font-mono border border-sakura-200 inline-flex items-center gap-1.5 select-none">
      <motion.span
        animate={{ rotate: [0, 14, -10, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        className="inline-block leading-none"
        aria-hidden
      >
        🌸
      </motion.span>
      <span className="tabular-nums">Day {day} since 2026</span>
    </div>
  );
}
