import { useEffect, useRef } from "react";

interface AudioVisualizerProps {
  audioElement: HTMLAudioElement | null;
  isPlaying: boolean;
}

const BAR_COUNT = 28;
const W = 80;
const H = 32;
const GAP = 1;
const BAR_W = (W - (BAR_COUNT - 1) * GAP) / BAR_COUNT;

export function AudioVisualizer({ audioElement, isPlaying }: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const dataRef = useRef<Uint8Array<ArrayBuffer> | null>(null);
  const connectedElRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let cancelled = false;

    const ensureGraph = () => {
      if (cancelled || !audioElement) return;
      if (connectedElRef.current === audioElement) return;
      try {
        if (!audioCtxRef.current) {
          const Ctor = window.AudioContext;
          if (!Ctor) return;
          audioCtxRef.current = new Ctor();
        }
        const audioCtx = audioCtxRef.current;
        if (audioCtx.state === "suspended") {
          void audioCtx.resume();
        }
        if (!analyserRef.current) {
          const analyser = audioCtx.createAnalyser();
          analyser.fftSize = 64;
          analyser.smoothingTimeConstant = 0.72;
          analyserRef.current = analyser;
          dataRef.current = new Uint8Array(new ArrayBuffer(analyser.frequencyBinCount));
        }
        if (sourceRef.current) {
          try {
            sourceRef.current.disconnect();
          } catch {}
        }
        const analyser = analyserRef.current;
        if (!analyser) return;
        const source = audioCtx.createMediaElementSource(audioElement);
        source.connect(analyser);
        analyser.connect(audioCtx.destination);
        sourceRef.current = source;
        connectedElRef.current = audioElement;
      } catch {}
    };

    const draw = () => {
      if (cancelled || !ctx) return;
      ctx.clearRect(0, 0, W, H);
      const analyser = analyserRef.current;
      const data = dataRef.current;
      if (analyser && data && isPlaying && connectedElRef.current) {
        analyser.getByteFrequencyData(data);
        const step = Math.max(1, Math.floor(data.length / BAR_COUNT));
        for (let i = 0; i < BAR_COUNT; i++) {
          const v = data[i * step] ?? 0;
          const barH = Math.max(2, (v / 255) * H);
          const x = i * (BAR_W + GAP);
          const y = H - barH;
          const grad = ctx.createLinearGradient(0, y, 0, H);
          grad.addColorStop(0, "#ff7aa8");
          grad.addColorStop(1, "#ff4d8d");
          ctx.fillStyle = grad;
          ctx.beginPath();
          if (typeof ctx.roundRect === "function") {
            ctx.roundRect(x, y, BAR_W, barH, 1.5);
          } else {
            ctx.rect(x, y, BAR_W, barH);
          }
          ctx.fill();
        }
      } else {
        for (let i = 0; i < BAR_COUNT; i++) {
          const x = i * (BAR_W + GAP);
          ctx.fillStyle = "rgba(255, 122, 168, 0.22)";
          ctx.fillRect(x, H - 2, BAR_W, 2);
        }
      }
      raf = requestAnimationFrame(draw);
    };

    if (isPlaying) ensureGraph();
    raf = requestAnimationFrame(draw);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [audioElement, isPlaying]);

  useEffect(() => {
    return () => {
      try {
        sourceRef.current?.disconnect();
      } catch {}
      try {
        analyserRef.current?.disconnect();
      } catch {}
      const ctx = audioCtxRef.current;
      if (ctx && ctx.state !== "closed") {
        ctx.close().catch(() => {});
      }
      sourceRef.current = null;
      analyserRef.current = null;
      audioCtxRef.current = null;
      dataRef.current = null;
      connectedElRef.current = null;
    };
  }, []);

  if (!isPlaying) return null;

  return (
    <canvas
      ref={canvasRef}
      width={W}
      height={H}
      className="inline-block align-middle"
      style={{ width: `${W}px`, height: `${H}px` }}
      aria-hidden
    />
  );
}
