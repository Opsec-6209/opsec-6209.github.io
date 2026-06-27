import { motion } from "framer-motion";
import { ExternalLink, Star, GitFork } from "lucide-react";
import { useGitHubRepos } from "../hooks/useGitHubRepos";
import { TiltCard } from "./TiltCard";
import { SectionHeader } from "./SectionHeader";

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "bg-[#3178c6]",
  JavaScript: "bg-[#f7df1e]",
  Python: "bg-[#3776ab]",
  HTML: "bg-[#e34f26]",
  CSS: "bg-[#563d7c]",
};

export function ProjectsShowcase() {
  const { repos, loading, error } = useGitHubRepos("Opsec-6209");

  return (
    <section id="projects" className="py-16 px-4">
      <SectionHeader
        title="Projects"
        subtitle="Open-source work from GitHub"
        kanji="作品"
        className="mb-10"
      />

      {loading && (
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="glass rounded-2xl p-5 border border-sakura-200/60"
            >
              <div className="h-5 bg-sakura-100 rounded w-3/4 mb-3 animate-pulse" />
              <div className="h-3 bg-sakura-100/70 rounded w-full mb-2 animate-pulse" />
              <div className="h-3 bg-sakura-100/70 rounded w-2/3 mb-4 animate-pulse" />
              <div className="h-3 bg-sakura-100/70 rounded w-1/3 animate-pulse" />
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-ink-muted text-sm">
            Could not load projects. Try again later.
          </p>
        </div>
      )}

      {!loading && !error && repos.length === 0 && (
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-ink-muted text-sm">No projects yet</p>
        </div>
      )}

      {!loading && !error && repos.length > 0 && (
        <motion.div
          className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.06 } },
          }}
        >
          {repos.slice(0, 12).map((repo) => (
            <motion.div
              key={repo.id}
              variants={{
                hidden: { opacity: 0, y: 25 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="h-full"
            >
              <TiltCard intensity={4} className="h-full">
                <motion.a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative block h-full glass rounded-2xl p-5 border border-sakura-200/60 shadow-[0_4px_24px_rgba(255,77,141,0.06)] hover:shadow-[0_10px_36px_rgba(255,77,141,0.20)] hover:border-sakura-400 transition-all duration-300 flex flex-col overflow-hidden"
                >
                  <span
                    className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      boxShadow: "inset 0 0 0 1px rgba(255,122,168,0.4)",
                    }}
                  />
                  <div className="relative flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-ink text-sm truncate flex-1 mr-2">
                      {repo.name}
                    </h3>
                    <ExternalLink
                      size={14}
                      className="text-sakura-300 flex-shrink-0 mt-0.5 opacity-60 group-hover:opacity-100 group-hover:text-sakura-500 transition-all"
                    />
                  </div>

                  {repo.description && (
                    <p className="relative text-xs text-ink-muted leading-relaxed mb-3 line-clamp-2 flex-1">
                      {repo.description}
                    </p>
                  )}

                  <div className="relative flex items-center gap-3 text-xs text-ink-muted mt-auto">
                    {repo.language && (
                      <span className="flex items-center gap-1">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            LANGUAGE_COLORS[repo.language] || "bg-sakura-400"
                          }`}
                        />
                        {repo.language}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Star size={12} /> {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork size={12} /> {repo.forks_count}
                    </span>
                  </div>
                </motion.a>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
}
