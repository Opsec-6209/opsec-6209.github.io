import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "sakura-entered";

export function EntryCurtain({ onEnter }: { onEnter: () => void }) {
  const [visible, setVisible] = useState(() => {
    try {
      return !localStorage.getItem(STORAGE_KEY);
    } catch {
      return true;
    }
  });

  const dismiss = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {}
    setVisible(false);
    setTimeout(() => onEnter(), 200);
  };

  useEffect(() => {
    if (!visible) return;
    const onKey = () => dismiss();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          onClick={dismiss}
          className="fixed inset-0 z-[9999] flex items-center justify-center cursor-pointer select-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,245,247,0.4) 0%, rgba(255,255,255,0.25) 50%, rgba(255,228,236,0.4) 100%)",
            backdropFilter: "blur(28px) saturate(180%)",
            WebkitBackdropFilter: "blur(28px) saturate(180%)",
          }}
        >
          {/* Decorative floating petals */}
          {[...Array(8)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute text-sakura-300 text-2xl pointer-events-none"
              style={{
                left: `${10 + (i * 11) % 80}%`,
                top: `${15 + (i * 13) % 70}%`,
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 360],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 4 + (i % 3),
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut",
              }}
            >
              🌸
            </motion.span>
          ))}

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative z-10 text-center px-4"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.85, 1, 0.85] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="text-8xl md:text-9xl mb-8 drop-shadow-[0_0_30px_rgba(255,77,141,0.4)]"
            >
              🌸
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-bold font-[var(--font-serif)] text-ink mb-3 tracking-tight">
              opsec_6209
            </h1>

            <motion.p
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-lg md:text-xl text-ink-muted font-medium tracking-wide"
            >
              Click to enter
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
