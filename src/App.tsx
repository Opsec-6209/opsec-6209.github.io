import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Lenis from "lenis";
import { MusicPlayer } from "./components/MusicPlayer";
import { Hero } from "./components/Hero";
import { SocialLinks } from "./components/SocialLinks";
import { SkillsGrid } from "./components/SkillsGrid";
import { CryptoAddresses } from "./components/CryptoAddresses";
import { ProjectsShowcase } from "./components/ProjectsShowcase";
import { GitHubStats } from "./components/GitHubStats";
import { Footer } from "./components/Footer";
import { ScrollProgress } from "./components/ScrollProgress";
import { KonamiStorm } from "./components/KonamiStorm";
import { TimeShiftToggle } from "./components/TimeShiftToggle";
import { FloatingElements } from "./components/FloatingElements";
import { useAudioPlayer } from "./hooks/useAudioPlayer";
import { useSakuraCanvas } from "./hooks/useSakuraCanvas";

function FloatingDivider() {
  return (
    <motion.div
      className="flex items-center justify-center py-2"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="h-px w-24 bg-gradient-to-r from-transparent via-sakura-200 to-transparent" />
      <motion.span
        animate={{ y: [0, -5, 0], rotate: [0, 6, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="mx-3 text-xl"
      >
        🌸
      </motion.span>
      <div className="h-px w-24 bg-gradient-to-r from-transparent via-sakura-200 to-transparent" />
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
    const tryPlay = () => {
      if (cleaned) return;
      play();
    };
    tryPlay();

    const events: (keyof WindowEventMap)[] = [
      "click", "keydown", "scroll", "touchstart", "pointerdown", "wheel", "mousemove",
    ];
    const handler = () => {
      if (cleaned) return;
      cleaned = true;
      play();
      events.forEach((e) => window.removeEventListener(e, handler));
    };
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

function useTimeShift() {
  const [enabled, setEnabled] = useState<boolean>(() => {
    try {
      const v = localStorage.getItem("sakura-time-shift");
      return v === null ? true : v === "1";
    } catch {
      return true;
    }
  });

  useEffect(() => {
    const apply = () => {
      const root = document.documentElement;
      if (!enabled) {
        root.style.setProperty("--time-bg-1", "#ffffff");
        root.style.setProperty("--time-bg-2", "#fff5f7");
        root.style.setProperty("--time-bg-3", "#ffffff");
        return;
      }
      const hour = parseInt(
        new Intl.DateTimeFormat("en-US", {
          timeZone: "Europe/Berlin",
          hour: "2-digit",
          hour12: false,
        }).format(new Date()),
        10
      );
      let c1 = "#ffffff";
      let c2 = "#fff5f7";
      let c3 = "#ffffff";
      let accent = "#ff4d8d";
      if (hour >= 5 && hour < 9) {
        c1 = "#fff8f3";
        c2 = "#ffe8d6";
        c3 = "#fff5ed";
        accent = "#ff7a4d";
      } else if (hour >= 17 && hour < 20) {
        c1 = "#fff5f0";
        c2 = "#ffd6e0";
        c3 = "#fff0f3";
        accent = "#ff5d6c";
      } else if (hour >= 20 || hour < 5) {
        c1 = "#fbf7fc";
        c2 = "#ece4f3";
        c3 = "#f7f3fa";
        accent = "#b87fc7";
      }
      root.style.setProperty("--time-bg-1", c1);
      root.style.setProperty("--time-bg-2", c2);
      root.style.setProperty("--time-bg-3", c3);
      root.style.setProperty("--time-accent", accent);
    };

    apply();
    const id = setInterval(apply, 60_000);

    const onChange = () => {
      try {
        const v = localStorage.getItem("sakura-time-shift");
        setEnabled(v === null ? true : v === "1");
      } catch {}
    };
    window.addEventListener("sakura-time-shift-change", onChange);
    window.addEventListener("storage", onChange);

    return () => {
      clearInterval(id);
      window.removeEventListener("sakura-time-shift-change", onChange);
      window.removeEventListener("storage", onChange);
    };
  }, [enabled]);

  return enabled;
}

export default function App() {
  const player = useAudioPlayer();
  useTimeShift();

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
      <FloatingElements />
      <ScrollProgress />
      <MusicPlayer player={player} />
      <KonamiStorm />
      <TimeShiftToggle />
      <AutoPlayMusic play={player.play} />

      <Hero isPlaying={player.isPlaying} />

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

      <Footer />
    </div>
  );
}
