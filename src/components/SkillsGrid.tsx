import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";

const skills = [
  { name: "React", color: "text-[#61dafb]" },
  { name: "TypeScript", color: "text-[#3178c6]" },
  { name: "JavaScript", color: "text-[#f7df1e]" },
  { name: "Python", color: "text-[#3776ab]" },
  { name: "Vite", color: "text-[#646cff]" },
  { name: "Tailwind CSS", color: "text-[#06b6d4]" },
  { name: "Electron", color: "text-[#47848f]" },
  { name: "Monaco Editor", color: "text-[#5b5bf5]" },
  { name: "Node.js", color: "text-[#339933]" },
  { name: "HTML5 Canvas", color: "text-[#e34f26]" },
  { name: "Web Audio API", color: "text-[#ff4d8d]" },
  { name: "Recharts", color: "text-[#22b5bf]" },
  { name: "Lucide React", color: "text-[#ee6666]" },
  { name: "GitHub Pages", color: "text-[#222222]" },
  { name: "Selenium", color: "text-[#43b02a]" },
];

export function SkillsGrid() {
  return (
    <section id="skills" className="py-16 px-4">
      <SectionHeader
        title="Tech Stack"
        subtitle="Languages and tools I work with"
        kanji="技術"
        className="mb-10"
      />
      <motion.div
        className="max-w-3xl mx-auto flex flex-wrap justify-center gap-2.5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.04 } },
        }}
      >
        {skills.map((skill) => (
          <motion.span
            key={skill.name}
            variants={{
              hidden: { opacity: 0, scale: 0.7, y: 12 },
              visible: { opacity: 1, scale: 1, y: 0 },
            }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            whileHover={{ scale: 1.08, y: -2 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full glass border border-sakura-200/60 text-sm font-medium text-ink shadow-[0_2px_8px_rgba(255,77,141,0.04)] hover:border-sakura-400 hover:shadow-[0_4px_16px_rgba(255,77,141,0.18)] transition-all cursor-default select-none"
          >
            <span className={`text-base leading-none ${skill.color}`}>●</span>
            {skill.name}
          </motion.span>
        ))}
      </motion.div>
    </section>
  );
}
