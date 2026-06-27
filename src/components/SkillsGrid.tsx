import { motion } from "framer-motion";

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
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-2xl md:text-3xl font-bold font-[var(--font-serif)] text-ink text-center mb-2"
      >
        Tech Stack
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-ink-muted text-center mb-8 text-sm"
      >
        Technologies I work with
      </motion.p>
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
              hidden: { opacity: 0, scale: 0.7, y: 10 },
              visible: { opacity: 1, scale: 1, y: 0 },
            }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.1, y: -3 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/70 backdrop-blur-sm border border-sakura-200 text-sm font-medium text-ink shadow-sm hover:shadow-md hover:border-sakura-400 transition-all cursor-default select-none"
          >
            <span className={`text-base ${skill.color}`}>●</span>
            {skill.name}
          </motion.span>
        ))}
      </motion.div>
    </section>
  );
}
