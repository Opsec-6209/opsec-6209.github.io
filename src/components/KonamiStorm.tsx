import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SEQ = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
] as const;

const DURATION = 8000;
const PETAL_COUNT = 150;
const TOAST_DURATION = 3000;
const STORM_CLASS = "konami-storm";

interface Petal {
  id: number;
  x: number;
  delay: number;
  size: number;
  rot: number;
  drift: number;
}

function buildPetals(): Petal[] {
  return Array.from({ length: PETAL_COUNT }, (_, idx) => ({
    id: Date.now() + idx,
    x: Math.random() * 100,
    delay: Math.random() * 1.4,
    size: 22 + Math.random() * 18,
    rot: (Math.random() - 0.5) * 900,
    drift: (Math.random() - 0.5) * 120,
  }));
}

export function KonamiStorm() {
  const [active, setActive] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    let i = 0;
    let toastTimer: ReturnType<typeof setTimeout> | null = null;
    let endTimer: ReturnType<typeof setTimeout> | null = null;

    const trigger = () => {
      if (toastTimer) clearTimeout(toastTimer);
      if (endTimer) clearTimeout(endTimer);
      setPetals(buildPetals());
      setActive(true);
      setToastVisible(true);
      document.body.classList.add(STORM_CLASS);
      toastTimer = setTimeout(() => setToastVisible(false), TOAST_DURATION);
      endTimer = setTimeout(() => {
        setActive(false);
        document.body.classList.remove(STORM_CLASS);
      }, DURATION);
    };

    const handler = (e: KeyboardEvent) => {
      const expected = SEQ[i];
      if (e.key === expected || e.key.toLowerCase() === expected) {
        i++;
        if (i === SEQ.length) {
          i = 0;
          trigger();
        }
      } else {
        i = 0;
      }
    };

    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
      if (toastTimer) clearTimeout(toastTimer);
      if (endTimer) clearTimeout(endTimer);
      document.body.classList.remove(STORM_CLASS);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {toastVisible && (
          <motion.div
            key="toast"
            initial={{ opacity: 0, y: -16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed inset-x-0 top-20 z-[80] text-center pointer-events-none px-4"
          >
            <span className="inline-block glass-strong rounded-full px-5 py-2 text-sakura-700 font-semibold text-sm shadow-lg border border-sakura-300/60">
              🌸 Konami Code Unlocked 🌸
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {active && (
          <motion.div
            key="storm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="fixed inset-0 z-[75] pointer-events-none overflow-hidden"
          >
            {petals.map((p) => (
              <motion.span
                key={p.id}
                className="absolute select-none"
                style={{
                  left: `${p.x}%`,
                  top: 0,
                  fontSize: `${p.size}px`,
                }}
                initial={{ y: -60, x: 0, rotate: 0, opacity: 1 }}
                animate={{
                  y: "110vh",
                  x: p.drift,
                  rotate: p.rot,
                  opacity: 0,
                }}
                transition={{
                  duration: 4,
                  delay: p.delay,
                  ease: "easeIn",
                }}
              >
                🌸
              </motion.span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
