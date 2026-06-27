import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    restDelta: 0.001,
  });

  const [isScrolling, setIsScrolling] = useState(false);
  const [pulseKey, setPulseKey] = useState(0);

  useEffect(() => {
    let lastValue = scrollYProgress.get();
    let stopTimer: ReturnType<typeof setTimeout> | null = null;

    const unsubscribe = scrollYProgress.on("change", (v) => {
      if (Math.abs(v - lastValue) > 0.0005) {
        lastValue = v;
        if (stopTimer) clearTimeout(stopTimer);
        if (!isScrolling) setIsScrolling(true);
        stopTimer = setTimeout(() => {
          setIsScrolling(false);
          setPulseKey((k) => k + 1);
        }, 160);
      }
    });

    return () => {
      if (stopTimer) clearTimeout(stopTimer);
      unsubscribe();
    };
  }, [scrollYProgress, isScrolling]);

  const opacity = useTransform(scrollYProgress, [0, 0.02, 0.05], [0, 0, 1]);
  const glow = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [
      "0 0 4px rgba(255,77,141,0.15)",
      "0 0 8px rgba(255,77,141,0.30)",
      "0 0 4px rgba(255,77,141,0.15)",
    ]
  );

  return (
    <motion.div
      key={pulseKey}
      style={{
        scaleX,
        opacity,
        boxShadow: glow,
        backgroundSize: "200% 100%",
      }}
      animate={{
        backgroundPosition: ["0% 0%", "200% 0%"],
        scaleY: isScrolling ? [1, 1.6, 1] : [1, 1.35, 1],
      }}
      transition={{
        backgroundPosition: {
          duration: 6,
          ease: "linear",
          repeat: Infinity,
        },
        scaleY: { duration: 0.45, ease: "easeOut" },
      }}
      className="fixed top-[52px] left-0 right-0 h-[2px] origin-left z-40 bg-gradient-to-r from-sakura-300 via-sakura-500 to-sakura-400"
    />
  );
}
