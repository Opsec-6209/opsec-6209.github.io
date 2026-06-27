import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  kanji?: string;
  className?: string;
}

export function SectionHeader({ title, subtitle, kanji, className = "" }: SectionHeaderProps) {
  return (
    <div className={`text-center ${className}`}>
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto mb-4 h-px w-8 bg-gradient-to-r from-transparent via-sakura-400 to-transparent"
      />
      {kanji && (
        <motion.span
          initial={{ opacity: 0, y: -6 }}
          whileInView={{ opacity: 0.45, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="block text-sakura-400 text-xs tracking-[0.5em] mb-1 font-[var(--font-serif)]"
        >
          {kanji}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold font-[var(--font-serif)] text-ink"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-sm text-ink-muted mt-2"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
