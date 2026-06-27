import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

const GITHUB_USERNAME = "Opsec-6209";

const stats = [
  {
    title: "GitHub Stats",
    src: `https://github-readme-stats.vercel.app/api?username=${GITHUB_USERNAME}&theme=default&show_icons=true&hide_border=true&title_color=ff4d8d&icon_color=ff4d8d&text_color=2a1a20&bg_color=ffffff&cache_seconds=3600`,
  },
  {
    title: "Top Languages",
    src: `https://github-readme-stats.vercel.app/api/top-langs/?username=${GITHUB_USERNAME}&layout=compact&theme=default&hide_border=true&title_color=ff4d8d&text_color=2a1a20&bg_color=ffffff&cache_seconds=3600`,
  },
  {
    title: "Streak",
    src: `https://streak-stats.demolab.com/?user=${GITHUB_USERNAME}&theme=default&hide_border=true&ring=ff4d8d&fire=ff4d8d&currStreakLabel=ff4d8d&cache_seconds=3600`,
  },
];

export function GitHubStats() {
  return (
    <section id="stats" className="py-16 px-4">
      <SectionHeader
        title="GitHub Activity"
        subtitle="Live data from GitHub"
        kanji="統計"
        className="mb-10"
      />
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <motion.a
            key={stat.title}
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="group relative glass rounded-2xl border border-sakura-200/60 shadow-[0_4px_24px_rgba(255,77,141,0.06)] overflow-hidden hover:shadow-[0_10px_36px_rgba(255,77,141,0.18)] hover:border-sakura-400 transition-all duration-300"
          >
            <span
              className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ boxShadow: "inset 0 0 0 1px rgba(255,122,168,0.4)" }}
            />
            <img
              src={stat.src}
              alt={stat.title}
              className="relative w-full"
              loading="lazy"
            />
            <div className="relative flex items-center justify-center gap-1 py-2.5 opacity-70 group-hover:opacity-100 transition-opacity">
              <span className="text-xs text-sakura-500 font-medium">
                View Profile
              </span>
              <ExternalLink size={12} className="text-sakura-400" />
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
