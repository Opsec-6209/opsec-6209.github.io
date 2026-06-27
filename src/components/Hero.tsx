import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { StatusBadge } from "./StatusBadge";
import { Greeting } from "./Greeting";

interface HeroProps {
  isPlaying?: boolean;
}

export function Hero({ isPlaying = false }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pfpPos, setPfpPos] = useState({ x: 0, y: 0 });
  const [clickPop, setClickPop] = useState(false);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / window.innerWidth;
      const dy = (e.clientY - cy) / window.innerHeight;
      setPfpPos({ x: dx * 10, y: dy * 10 });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  const username = "opsec_6209";

  return (
    <section
      ref={containerRef}
      className="min-h-[calc(100vh-54px)] flex flex-col items-center justify-center text-center px-4 pt-16 pb-8 relative"
    >
      <div className="flex items-center gap-2 mb-6">
        <StatusBadge isPlaying={isPlaying} />
      </div>

      <motion.div
        style={{ x: pfpPos.x, y: pfpPos.y }}
        className="relative group"
        onClick={() => {
          setClickPop(true);
          setTimeout(() => setClickPop(false), 1500);
        }}
      >
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -inset-4 rounded-full bg-gradient-to-r from-sakura-200 via-sakura-300 to-sakura-200 blur-2xl"
        />

        <div className="relative w-40 h-40 md:w-56 md:h-56">
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <motion.div
              className="absolute -inset-1/2 w-[200%] h-[200%]"
              style={{
                background:
                  "conic-gradient(from 0deg, #ff4d8d 0%, #ff7aa8 15%, #ffa3bf 30%, #ffc8d8 45%, #ffa3bf 60%, #ff7aa8 75%, #ff4d8d 90%, #c41e5a 100%)",
                transformOrigin: "center",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
          </div>

          <div className="absolute inset-[3px] rounded-full bg-white" />

          <motion.img
            src="/pfp.png"
            alt="opsec_6209"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
            whileHover={{ scale: 1.05, rotate: 2 }}
            className="absolute inset-[3px] w-[calc(100%-6px)] h-[calc(100%-6px)] rounded-full object-cover shadow-[0_8px_40px_rgba(255,77,141,0.25),0_4px_16px_rgba(255,77,141,0.15)] select-none transition-shadow duration-500 group-hover:shadow-[0_12px_50px_rgba(255,77,141,0.45)]"
            draggable={false}
          />

          {clickPop && (
            <motion.div
              initial={{ opacity: 0, y: 0, scale: 0.5 }}
              animate={{ opacity: [0, 1, 0], y: -30, scale: 1 }}
              transition={{ duration: 1.2 }}
              className="absolute top-0 left-1/2 -translate-x-1/2 text-sakura-600 text-sm font-semibold pointer-events-none whitespace-nowrap"
            >
              ✨ thanks!
            </motion.div>
          )}
        </div>
      </motion.div>

      <h1 className="text-5xl md:text-7xl font-bold font-[var(--font-serif)] text-ink mt-8 mb-2 tracking-tighter flex items-baseline gap-3 justify-center flex-wrap">
        {username.split("").map((char, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 + i * 0.04, ease: "easeOut" }}
          >
            {char}
          </motion.span>
        ))}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="text-2xl md:text-3xl font-serif text-sakura-300"
        >
          桜
        </motion.span>
      </h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="mb-4"
      >
        <Greeting />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.1 }}
        className="relative inline-flex items-center gap-2 mb-6"
      >
        <motion.span
          animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-1.5 h-1.5 rounded-full bg-sakura-500 shadow-[0_0_8px_rgba(255,77,141,0.8)]"
        />
        <p className="text-xl md:text-2xl text-ink-muted font-medium">developer</p>
        <motion.span
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1.4, ease: "easeOut" }}
          className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-sakura-500 to-transparent origin-left"
        />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.5 }}
        className="text-3xl md:text-4xl mb-12"
      >
        🌸
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.7 }}
        className="flex flex-col items-center gap-1 text-ink-muted"
      >
        <span className="text-[10px] font-mono uppercase tracking-[0.3em]">scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={20} className="text-sakura-300" />
        </motion.div>
      </motion.div>
    </section>
  );
}
