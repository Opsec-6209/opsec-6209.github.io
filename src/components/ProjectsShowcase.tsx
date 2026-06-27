import { motion } from "framer-motion";
import { ExternalLink, Star, GitFork } from "lucide-react";
import { useGitHubRepos } from "../hooks/useGitHubRepos";

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
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-2xl md:text-3xl font-bold font-[var(--font-serif)] text-ink text-center mb-2"
      >
        Projects
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-ink-muted text-center mb-8 text-sm"
      >
        Open-source work from GitHub
      </motion.p>

      {loading && (
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-white/70 rounded-2xl p-5 border border-sakura-100 animate-pulse"
            >
              <div className="h-5 bg-sakura-100 rounded w-3/4 mb-3" />
              <div className="h-3 bg-sakura-50 rounded w-full mb-2" />
              <div className="h-3 bg-sakura-50 rounded w-2/3" />
            </div>
          ))}
        </div>
      )}

      {error && (
        <p className="text-center text-red-500 text-sm">
          Could not load projects. Try again later.
        </p>
      )}

      {!loading && !error && (
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {repos.slice(0, 12).map((repo, i) => (
            <motion.a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 border border-sakura-200 shadow-[0_4px_24px_rgba(255,77,141,0.06)] hover:shadow-[0_8px_30px_rgba(255,77,141,0.12)] transition-all flex flex-col"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-ink text-sm truncate flex-1 mr-2">
                  {repo.name}
                </h3>
                <ExternalLink
                  size={14}
                  className="text-sakura-300 flex-shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </div>

              {repo.description && (
                <p className="text-xs text-ink-muted leading-relaxed mb-3 line-clamp-2 flex-1">
                  {repo.description}
                </p>
              )}

              <div className="flex items-center gap-3 text-xs text-ink-muted mt-auto">
                {repo.language && (
                  <span className="flex items-center gap-1">
                    <span
                      className={`w-2 h-2 rounded-full ${LANGUAGE_COLORS[repo.language] || "bg-sakura-400"}`}
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
          ))}
        </div>
      )}
    </section>
  );
}
