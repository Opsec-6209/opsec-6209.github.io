import { useRef } from "react";
import { useSakuraCanvas } from "../hooks/useSakuraCanvas";

export function SakuraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useSakuraCanvas(canvasRef);
  return <canvas ref={canvasRef} className="canvas-bg" />;
}
