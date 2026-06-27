import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TIMEZONE = "Europe/Berlin";

function getBerlinHour(): number {
  const formatted = new Intl.DateTimeFormat("en-GB", {
    timeZone: TIMEZONE,
    hour: "2-digit",
    hour12: false,
  }).format(new Date());
  return Number(formatted);
}

function getGreeting(hour: number): string {
  if (hour >= 5 && hour < 12) return "Good morning · おはよう";
  if (hour >= 12 && hour < 18) return "Good afternoon · こんにちは";
  if (hour >= 18 && hour < 22) return "Good evening · こんばんは";
  return "Good night · おやすみ";
}

interface GreetingProps {
  className?: string;
}

export function Greeting({ className = "" }: GreetingProps) {
  const [greeting, setGreeting] = useState(() => getGreeting(getBerlinHour()));

  useEffect(() => {
    const update = () => setGreeting(getGreeting(getBerlinHour()));
    update();
    const id = setInterval(update, 60000);
    return () => clearInterval(id);
  }, []);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.p
        key={greeting}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className={`text-base md:text-lg font-medium text-ink-muted tracking-wide ${className}`}
      >
        {greeting}
      </motion.p>
    </AnimatePresence>
  );
}
