import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export function Hero() {
  return (
    <section className="min-h-[calc(100vh-54px)] flex flex-col items-center justify-center text-center px-4 pt-16 pb-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
        whileHover={{ scale: 1.05 }}
        className="group relative"
      >
        <motion.div
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -inset-3 rounded-full bg-gradient-to-r from-sakura-200 via-sakura-300 to-sakura-200 blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500"
        />
        <img
          src="/pfp.png"
          alt="opsec_6209"
          className="relative w-40 h-40 md:w-56 md:h-56 rounded-full object-cover border-4 border-sakura-300 shadow-[0_8px_40px_rgba(255,77,141,0.15)] select-none transition-all duration-500 group-hover:border-sakura-500 group-hover:shadow-[0_8px_50px_rgba(255,77,141,0.35)]"
          draggable={false}
        />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-4xl md:text-6xl font-bold font-[var(--font-serif)] text-ink mt-8 mb-3 tracking-tight"
      >
        opsec_6209
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="relative inline-block"
      >
        <p className="text-lg md:text-xl text-ink-muted font-medium">developer</p>
        <motion.span
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
          className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-sakura-500 to-transparent origin-left"
        />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="text-2xl md:text-3xl mt-6 mb-8"
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
