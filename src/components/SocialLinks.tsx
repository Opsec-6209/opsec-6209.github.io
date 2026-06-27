import { motion } from "framer-motion";

interface SocialLink {
  href: string;
  label: string;
  username: string;
  color: string;
  glow: string;
  icon: () => React.ReactElement;
}

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.99a8.16 8.16 0 0 0 4.77 1.52V7.05a4.85 4.85 0 0 1-1.84-.36z" />
  </svg>
);

const DiscordIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
    <path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const links: SocialLink[] = [
  {
    href: "https://www.tiktok.com/@opsec_6209",
    label: "TikTok",
    username: "@opsec_6209",
    color: "text-[#ff0050]",
    glow: "shadow-[0_0_30px_rgba(255,0,80,0.25)]",
    icon: TikTokIcon,
  },
  {
    href: "https://discord.com/users/868572830269329439",
    label: "Discord",
    username: "opsec_6209",
    color: "text-[#5865F2]",
    glow: "shadow-[0_0_30px_rgba(88,101,242,0.25)]",
    icon: DiscordIcon,
  },
  {
    href: "https://github.com/Opsec-6209",
    label: "GitHub",
    username: "Opsec-6209",
    color: "text-ink",
    glow: "shadow-[0_0_30px_rgba(42,26,32,0.15)]",
    icon: GitHubIcon,
  },
];

export function SocialLinks() {
  return (
    <section id="social" className="py-12 px-4">
      <motion.div
        className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.12 } },
        }}
      >
        {links.map((link) => (
          <motion.a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            whileHover={{ y: -6 }}
            whileTap={{ scale: 0.97 }}
            className={`group relative bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-sakura-200 hover:border-sakura-400 transition-all duration-300 hover:${link.glow}`}
          >
            <div className="flex flex-col items-center text-center gap-3">
              <div className={`${link.color} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                <link.icon />
              </div>
              <div>
                <p className="font-semibold text-ink text-base">{link.label}</p>
                <p className="text-xs text-ink-muted font-mono mt-0.5">{link.username}</p>
              </div>
              <motion.span
                initial={{ opacity: 0, x: -4 }}
                whileHover={{ opacity: 1, x: 0 }}
                className="text-[10px] text-sakura-400 font-medium tracking-wider opacity-60 group-hover:opacity-100 transition-opacity"
              >
                CLICK TO OPEN ↗
              </motion.span>
            </div>
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
}
