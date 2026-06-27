import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

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
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-2xl md:text-3xl font-bold font-[var(--font-serif)] text-ink text-center mb-2"
      >
        GitHub Stats
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-ink-muted text-center mb-8 text-sm"
      >
        Live activity from GitHub
      </motion.p>
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
            whileHover={{ y: -3 }}
            className="bg-white/70 backdrop-blur-sm rounded-2xl border border-sakura-200 shadow-[0_4px_24px_rgba(255,77,141,0.06)] overflow-hidden hover:shadow-[0_8px_30px_rgba(255,77,141,0.12)] transition-all group"
          >
            <img
              src={stat.src}
              alt={stat.title}
              className="w-full"
              loading="lazy"
            />
            <div className="flex items-center justify-center gap-1 py-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-xs text-sakura-500">View Profile</span>
              <ExternalLink size={12} className="text-sakura-400" />
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
