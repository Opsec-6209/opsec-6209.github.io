import { motion, useReducedMotion } from "framer-motion";
import type { ReactElement } from "react";

interface FloatingKanji {
  char: string;
  top: string;
  left?: string;
  right?: string;
  size: string;
  opacity: number;
  duration: number;
  amplitude: number;
  delay: number;
  rotate?: number;
}

const kanji: FloatingKanji[] = [
  {
    char: "桜",
    top: "12%",
    left: "6%",
    size: "text-5xl",
    opacity: 0.4,
    duration: 8,
    amplitude: 10,
    delay: 0,
    rotate: -6,
  },
  {
    char: "夢",
    top: "22%",
    right: "10%",
    size: "text-4xl",
    opacity: 0.32,
    duration: 9,
    amplitude: 12,
    delay: 0.6,
    rotate: 4,
  },
  {
    char: "光",
    top: "48%",
    left: "14%",
    size: "text-3xl",
    opacity: 0.3,
    duration: 7,
    amplitude: 8,
    delay: 1.2,
    rotate: 8,
  },
  {
    char: "風",
    top: "55%",
    right: "8%",
    size: "text-5xl",
    opacity: 0.38,
    duration: 10,
    amplitude: 11,
    delay: 0.3,
    rotate: -4,
  },
  {
    char: "雪",
    top: "78%",
    left: "44%",
    size: "text-4xl",
    opacity: 0.34,
    duration: 8.5,
    amplitude: 9,
    delay: 1.8,
    rotate: 6,
  },
];

export function FloatingElements(): ReactElement | null {
  const reduced = useReducedMotion();

  if (reduced) return null;

  return (
    <div
      aria-hidden="true"
      className="hidden md:block fixed inset-0 pointer-events-none z-0 overflow-hidden"
    >
      {kanji.map((k) => (
        <motion.span
          key={k.char}
          className={`absolute font-[var(--font-serif)] text-sakura-200 select-none ${k.size}`}
          style={{
            top: k.top,
            left: k.left,
            right: k.right,
            opacity: k.opacity,
            rotate: k.rotate ?? 0,
          }}
          animate={{ y: [0, -k.amplitude, 0] }}
          transition={{
            duration: k.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: k.delay,
          }}
        >
          {k.char}
        </motion.span>
      ))}
    </div>
  );
}
