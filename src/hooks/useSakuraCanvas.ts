import { useRef, useEffect, useCallback } from "react";

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  color: string;
  swayOffset: number;
  swaySpeed: number;
}

const COLORS = [
  "rgba(255, 164, 191, 0.8)",
  "rgba(255, 122, 168, 0.7)",
  "rgba(255, 77, 141, 0.6)",
  "rgba(255, 200, 216, 0.9)",
];

export function useSakuraCanvas(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const animFrameRef = useRef<number>(0);
  const petalsRef = useRef<Petal[]>([]);

  const drawPetal = useCallback((ctx: CanvasRenderingContext2D, p: Petal) => {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    ctx.globalAlpha = p.opacity;
    ctx.fillStyle = p.color;

    const s = p.size;
    ctx.beginPath();
    ctx.moveTo(0, -s);
    ctx.bezierCurveTo(s * 0.5, -s * 0.6, s, 0, 0, s * 0.5);
    ctx.bezierCurveTo(-s, 0, -s * 0.5, -s * 0.6, 0, -s);
    ctx.fill();

    ctx.restore();
  }, []);

  const initPetals = useCallback(
    (count: number, width: number, height: number) => {
      const p: Petal[] = [];
      for (let i = 0; i < count; i++) {
        p.push({
          x: Math.random() * width,
          y: Math.random() * height * -1,
          size: 8 + Math.random() * 14,
          speedY: 0.4 + Math.random() * 1.2,
          speedX: -0.3 + Math.random() * 0.6,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.03,
          opacity: 0.35 + Math.random() * 0.5,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          swayOffset: Math.random() * Math.PI * 2,
          swaySpeed: 0.001 + Math.random() * 0.002,
        });
      }
      petalsRef.current = p;
    },
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;
    const count = prefersReduced ? 5 : isMobile ? 15 : 35;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    initPetals(count, canvas.width, canvas.height);

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const petals = petalsRef.current;
      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];
        p.y += p.speedY;
        const sway = Math.sin(Date.now() * p.swaySpeed + p.swayOffset) * 25;
        p.x += p.speedX;
        const swayX = p.x + sway * 0.3;
        p.rotation += p.rotationSpeed;

        drawPetal(ctx, { ...p, x: swayX });

        if (p.y > canvas.height + 50) {
          p.y = -50;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -50) p.x = canvas.width + 50;
        if (p.x > canvas.width + 50) p.x = -50;
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [canvasRef, initPetals, drawPetal]);
}
