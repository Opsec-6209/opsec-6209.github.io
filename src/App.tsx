import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import { MusicPlayer } from "./components/MusicPlayer";
import { Hero } from "./components/Hero";
import { SocialLinks } from "./components/SocialLinks";
import { SkillsGrid } from "./components/SkillsGrid";
import { CryptoAddresses } from "./components/CryptoAddresses";
import { PayPalCard } from "./components/PayPalCard";
import { ProjectsShowcase } from "./components/ProjectsShowcase";
import { GitHubStats } from "./components/GitHubStats";
import { Footer } from "./components/Footer";
import { ScrollProgress } from "./components/ScrollProgress";
import { useAudioPlayer } from "./hooks/useAudioPlayer";
import { useSakuraCanvas } from "./hooks/useSakuraCanvas";

function KonamiRain() {
  const [active, setActive] = useState(false);
  const [petals, setPetals] = useState<{ id: number; x: number; delay: number }[]>([]);

  useEffect(() => {
    const seq = [
      "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
      "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a",
    ];
    let i = 0;
    const handler = (e: KeyboardEvent) => {
      if (e.key === seq[i] || e.key.toLowerCase() === seq[i]) {
        i++;
        if (i === seq.length) {
          i = 0;
          const newPetals = Array.from({ length: 100 }, (_, idx) => ({
            id: Date.now() + idx,
            x: Math.random() * 100,
            delay: Math.random() * 0.8,
          }));
          setPetals(newPetals);
          setActive(true);
          setTimeout(() => setActive(false), 5500);
        }
      } else {
        i = 0;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <AnimatePresence>
      {active && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-20 z-[80] text-center pointer-events-none"
          >
            <p className="inline-block bg-white/90 backdrop-blur px-6 py-2 rounded-full border border-sakura-300 text-sakura-700 font-semibold text-sm shadow-lg">
              🌸 Konami Code Unlocked 🌸
            </p>
          </motion.div>
          <div className="fixed inset-0 z-[75] pointer-events-none overflow-hidden">
            {petals.map((p) => (
              <motion.span
                key={p.id}
                className="absolute text-3xl"
                style={{ left: `${p.x}%`, top: 0 }}
                initial={{ y: -50, rotate: 0, opacity: 1 }}
                animate={{ y: "110vh", rotate: 720, opacity: 0 }}
                transition={{ duration: 4, delay: p.delay, ease: "easeIn" }}
              >
                🌸
              </motion.span>
            ))}
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

function FloatingDivider() {
  return (
    <motion.div
      className="flex items-center justify-center py-2"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6 }}
    >
      <motion.span
        animate={{ y: [0, -6, 0], rotate: [0, 8, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="text-2xl"
      >
        🌸
      </motion.span>
    </motion.div>
  );
}

interface RevealSectionProps {
  children: React.ReactNode;
  from?: "left" | "right" | "bottom";
  className?: string;
}

function RevealSection({ children, from = "bottom", className = "" }: RevealSectionProps) {
  const variants = {
    hidden: {
      opacity: 0,
      x: from === "left" ? -50 : from === "right" ? 50 : 0,
      y: from === "bottom" ? 40 : 0,
    },
    visible: { opacity: 1, x: 0, y: 0 },
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SakuraBackgroundReactive() {
  const ref = useRef<HTMLCanvasElement>(null);
  useSakuraCanvas(ref);
  return <canvas ref={ref} className="canvas-bg" />;
}

function AutoPlayMusic({ play }: { play: () => void }) {
  useEffect(() => {
    let cleaned = false;

    // Try autoplay immediately (will be blocked by most browsers)
    const tryPlay = () => {
      if (cleaned) return;
      play();
    };
    tryPlay();

    // Fallback: start music on first user interaction
    const events: (keyof WindowEventMap)[] = [
      "click", "keydown", "scroll", "touchstart", "pointerdown", "wheel", "mousemove",
    ];

    const handler = () => {
      if (cleaned) return;
      cleaned = true;
      play();
      events.forEach((e) => window.removeEventListener(e, handler));
    };

    // Wait a bit before adding listeners (in case autoplay succeeded)
    const timeout = setTimeout(() => {
      if (!cleaned) {
        events.forEach((e) =>
          window.addEventListener(e, handler, { once: true, passive: true })
        );
      }
    }, 300);

    return () => {
      cleaned = true;
      clearTimeout(timeout);
      events.forEach((e) => window.removeEventListener(e, handler));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

export default function App() {
  const player = useAudioPlayer();

  // Lenis smooth scroll — snappier but still smooth with momentum
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.13,
      duration: 0.9,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative">
      <SakuraBackgroundReactive />
      <ScrollProgress />
      <MusicPlayer player={player} />
      <KonamiRain />
      <AutoPlayMusic play={player.play} />

      <Hero />

      <RevealSection from="bottom">
        <SocialLinks />
      </RevealSection>

      <FloatingDivider />

      <RevealSection from="left">
        <SkillsGrid />
      </RevealSection>

      <FloatingDivider />

      <RevealSection from="right">
        <ProjectsShowcase />
      </RevealSection>

      <FloatingDivider />

      <RevealSection from="left">
        <GitHubStats />
      </RevealSection>

      <FloatingDivider />

      <RevealSection from="right">
        <CryptoAddresses />
      </RevealSection>

      <FloatingDivider />

      <RevealSection from="left">
        <PayPalCard />
      </RevealSection>

      <Footer />
    </div>
  );
}
