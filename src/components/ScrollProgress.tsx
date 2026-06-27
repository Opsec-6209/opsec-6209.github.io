import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-[52px] left-0 right-0 h-[2px] bg-gradient-to-r from-sakura-300 via-sakura-500 to-sakura-400 origin-left z-40"
    />
  );
}
