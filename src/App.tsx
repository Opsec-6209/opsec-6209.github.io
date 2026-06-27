import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SakuraBackground } from "./components/SakuraBackground";
import { MusicPlayer } from "./components/MusicPlayer";
import { Hero } from "./components/Hero";
import { SocialLinks } from "./components/SocialLinks";
import { SkillsGrid } from "./components/SkillsGrid";
import { CryptoAddresses } from "./components/CryptoAddresses";
import { PayPalCard } from "./components/PayPalCard";
import { ProjectsShowcase } from "./components/ProjectsShowcase";
import { GitHubStats } from "./components/GitHubStats";
import { ContactForm } from "./components/ContactForm";
import { Footer } from "./components/Footer";

function KonamiEasterEgg() {
  const [konami, setKonami] = useState(false);

  useEffect(() => {
    const sequence = [
      "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
      "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
      "b", "a",
    ];
    let index = 0;

    const handler = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === sequence[index]) {
        index++;
        if (index === sequence.length) {
          setKonami(true);
          index = 0;
          setTimeout(() => setKonami(false), 4000);
        }
      } else {
        index = 0;
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <AnimatePresence>
      {konami && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
        >
          <motion.div
            initial={{ y: -30 }}
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-center"
          >
            <p className="text-8xl">🌸</p>
            <p className="text-sakura-600 text-2xl font-bold font-[var(--font-serif)] mt-4 drop-shadow-lg">
              Konami Code Activated!
            </p>
            <p className="text-ink-muted text-sm mt-2">You found a secret 🌸</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

function SectionDivider() {
  return (
    <div className="flex items-center justify-center py-2">
      <div className="h-px w-24 bg-gradient-to-r from-transparent via-sakura-200 to-transparent" />
      <span className="mx-3 text-sakura-300 text-sm">✦</span>
      <div className="h-px w-24 bg-gradient-to-r from-transparent via-sakura-200 to-transparent" />
    </div>
  );
}

export default function App() {
  return (
    <div className="relative">
      <SakuraBackground />
      <MusicPlayer />
      <KonamiEasterEgg />

      <Hero />

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <SocialLinks />
      </motion.div>

      <SectionDivider />

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <SkillsGrid />
      </motion.div>

      <SectionDivider />

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <ProjectsShowcase />
      </motion.div>

      <SectionDivider />

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <GitHubStats />
      </motion.div>

      <SectionDivider />

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <CryptoAddresses />
      </motion.div>

      <SectionDivider />

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <PayPalCard />
      </motion.div>

      <SectionDivider />

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <ContactForm />
      </motion.div>

      <Footer />
    </div>
  );
}
