import { motion } from "framer-motion";
import { Music, MessageCircle } from "lucide-react";

const links = [
  {
    href: "https://www.tiktok.com/@opsec_6209",
    icon: Music,
    label: "TikTok",
    color: "bg-gradient-to-r from-[#00f2ea] to-[#ff0050]",
    delay: 0,
  },
  {
    href: "https://discord.com/users/868572830269329439",
    icon: MessageCircle,
    label: "Discord",
    color: "bg-[#5865F2]",
    delay: 0.1,
  },
  {
    href: "https://github.com/Opsec-6209",
    icon: null,
    label: "GitHub",
    color: "bg-[#24292f]",
    delay: 0.2,
  },
];

export function SocialLinks() {
  return (
    <section id="social" className="py-12 px-4">
      <div className="max-w-xl mx-auto flex flex-wrap justify-center gap-3">
        {links.map((link) => (
          <motion.a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: link.delay }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full ${link.color} text-white font-medium text-sm shadow-lg hover:shadow-xl transition-shadow`}
          >
            {link.icon && <link.icon size={18} />}
            <span>{link.label}</span>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
