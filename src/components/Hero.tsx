import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export function Hero() {
  return (
    <section className="min-h-[calc(100vh-52px)] flex flex-col items-center justify-center text-center px-4 pt-16 pb-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <img
          src="/pfp.png"
          alt="opsec_6209"
          className="w-40 h-40 md:w-56 md:h-56 rounded-full object-cover border-4 border-sakura-300 shadow-[0_8px_40px_rgba(255,77,141,0.15)] select-none"
          draggable={false}
        />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-4xl md:text-6xl font-bold font-[var(--font-serif)] text-ink mt-8 mb-2 tracking-tight"
      >
        opsec_6209
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="text-lg md:text-xl text-ink-muted font-medium mb-2"
      >
        developer · music lover · sakura enthusiast
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="text-2xl md:text-3xl mb-8"
      >
        🌸
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        className="animate-bounce mt-4"
      >
        <ChevronDown size={28} className="text-sakura-300" />
      </motion.div>
    </section>
  );
}
