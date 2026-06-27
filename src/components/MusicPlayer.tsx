import { useRef, useState, useCallback, useMemo, useEffect } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Shuffle,
  Repeat,
  Repeat1,
  Keyboard,
  ListMusic,
  X,
  Music2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAudioPlayer } from "../hooks/useAudioPlayer";
import { useKeyboardShortcuts } from "../hooks/useKeyboardShortcuts";
import { AudioVisualizer } from "./AudioVisualizer";
import { playlist } from "../data/playlist";

function formatTime(seconds: number) {
  if (!isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

interface MusicPlayerProps {
  player: ReturnType<typeof useAudioPlayer>;
}

export function MusicPlayer({ player }: MusicPlayerProps) {
  const {
    audio,
    track,
    isPlaying,
    volume,
    isMuted,
    currentTime,
    duration,
    currentIndex,
    totalTracks,
    isTransitioning,
    shuffle,
    repeat,
    togglePlay,
    next,
    prev,
    seek,
    setVolume,
    toggleMute,
    toggleShuffle,
    cycleRepeat,
    jumpTo,
  } = player;

  const progressRef = useRef<HTMLDivElement>(null);
  const volumeRef = useRef<HTMLDivElement>(null);
  const [hoverPct, setHoverPct] = useState<number | null>(null);
  const [showHelp, setShowHelp] = useState(false);
  const [showQueue, setShowQueue] = useState(false);
  const [isDraggingProgress, setIsDraggingProgress] = useState(false);
  const [isDraggingVolume, setIsDraggingVolume] = useState(false);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const volumePct = Math.round((isMuted ? 0 : volume) * 100);

  const shortcuts = useMemo(
    () => ({
      " ": () => togglePlay(),
      arrowleft: () => prev(),
      arrowright: () => next(),
      arrowup: () => setVolume(Math.min(1, (isMuted ? 0 : volume) + 0.05)),
      arrowdown: () => setVolume(Math.max(0, (isMuted ? 0 : volume) - 0.05)),
      m: () => toggleMute(),
      s: () => toggleShuffle(),
      r: () => cycleRepeat(),
      "?": () => setShowHelp((s) => !s),
      q: () => setShowQueue((s) => !s),
      escape: () => {
        setShowHelp(false);
        setShowQueue(false);
      },
    }),
    [togglePlay, next, prev, setVolume, isMuted, volume, toggleMute, toggleShuffle, cycleRepeat]
  );
  useKeyboardShortcuts(shortcuts);

  const updateProgressFromEvent = useCallback(
    (clientX: number) => {
      if (!progressRef.current || duration <= 0) return;
      const rect = progressRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const pct = Math.max(0, Math.min(1, x / rect.width));
      seek(pct * duration);
    },
    [duration, seek]
  );

  const handleProgressPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDraggingProgress(true);
      e.currentTarget.setPointerCapture(e.pointerId);
      updateProgressFromEvent(e.clientX);
    },
    [updateProgressFromEvent]
  );

  const handleProgressPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (progressRef.current && duration > 0) {
        const rect = progressRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        setHoverPct(Math.max(0, Math.min(1, x / rect.width)));
      }
      if (isDraggingProgress) {
        updateProgressFromEvent(e.clientX);
      }
    },
    [isDraggingProgress, updateProgressFromEvent, duration]
  );

  const handleProgressPointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      setIsDraggingProgress(false);
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {}
    },
    []
  );

  const handleProgressPointerLeave = useCallback(() => {
    setHoverPct(null);
  }, []);

  const updateVolumeFromEvent = useCallback(
    (clientX: number) => {
      if (!volumeRef.current) return;
      const rect = volumeRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const pct = Math.max(0, Math.min(1, x / rect.width));
      setVolume(pct);
    },
    [setVolume]
  );

  const handleVolumePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDraggingVolume(true);
      e.currentTarget.setPointerCapture(e.pointerId);
      updateVolumeFromEvent(e.clientX);
    },
    [updateVolumeFromEvent]
  );

  const handleVolumePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (isDraggingVolume) {
        updateVolumeFromEvent(e.clientX);
      }
    },
    [isDraggingVolume, updateVolumeFromEvent]
  );

  const handleVolumePointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      setIsDraggingVolume(false);
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {}
    },
    []
  );

  useEffect(() => {
    if (!isDraggingProgress) return;
    const onUp = () => setIsDraggingProgress(false);
    window.addEventListener("pointerup", onUp);
    return () => window.removeEventListener("pointerup", onUp);
  }, [isDraggingProgress]);

  useEffect(() => {
    if (!isDraggingVolume) return;
    const onUp = () => setIsDraggingVolume(false);
    window.addEventListener("pointerup", onUp);
    return () => window.removeEventListener("pointerup", onUp);
  }, [isDraggingVolume]);

  const queueItems = useMemo(() => {
    const out: { track: typeof playlist[number]; index: number; playing: boolean }[] = [];
    for (let i = 1; i <= 5; i++) {
      const idx = (currentIndex + i) % playlist.length;
      out.push({ track: playlist[idx], index: idx, playing: false });
    }
    out.unshift({ track: playlist[currentIndex], index: currentIndex, playing: true });
    return out;
  }, [currentIndex]);

  const RepeatIcon = repeat === "one" ? Repeat1 : Repeat;

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 glass-strong border-b border-sakura-200/60 select-none">
        <div className="max-w-6xl mx-auto px-4 py-2 flex flex-col gap-1.5">
          <div className="flex items-center gap-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={track.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: isTransitioning ? 0.4 : 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="relative w-11 h-11 rounded-xl overflow-hidden border border-sakura-200 flex-shrink-0 hidden sm:block"
              >
                <img
                  src={track.thumbnail}
                  alt={track.title}
                  className="w-full h-full object-cover"
                  draggable={false}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 44 44'><rect fill='%23ffe4ec' width='44' height='44'/><text x='22' y='28' text-anchor='middle' fill='%23ff4d8d' font-size='16'>🎵</text></svg>";
                  }}
                />
                {isPlaying && (
                  <div className="absolute inset-0 bg-gradient-to-t from-sakura-500/20 to-transparent" />
                )}
              </motion.div>
            </AnimatePresence>

            <div className="flex-1 min-w-0 flex flex-col gap-0.5">
              <div className="flex items-center gap-1.5">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={track.id}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="text-[13px] font-semibold text-ink truncate leading-tight"
                  >
                    {track.title}
                  </motion.p>
                </AnimatePresence>
                {isPlaying && (
                  <span className="inline-flex items-center gap-0.5 flex-shrink-0">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="w-0.5 bg-sakura-500 rounded-full"
                        animate={{ height: ["3px", "8px", "3px"] }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: i * 0.15,
                        }}
                      />
                    ))}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-ink-muted truncate leading-tight font-mono">
                {track.artist} · {currentIndex + 1}/{totalTracks}
              </p>
            </div>

            <AudioVisualizer audioElement={audio} isPlaying={isPlaying} />

            <div className="flex items-center gap-0.5">
              <motion.button
                onClick={toggleShuffle}
                whileTap={{ scale: 0.9 }}
                className={`p-1.5 rounded-full transition-colors ${
                  shuffle
                    ? "text-sakura-600 bg-sakura-100"
                    : "text-ink-muted hover:text-ink hover:bg-sakura-100/60"
                }`}
                aria-label="Shuffle"
                title="Shuffle (S)"
              >
                <Shuffle size={15} />
              </motion.button>

              <motion.button
                onClick={prev}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full text-ink-muted hover:text-ink hover:bg-sakura-100 transition-colors"
                aria-label="Previous"
                title="Previous (←)"
              >
                <SkipBack size={18} />
              </motion.button>

              <motion.button
                onClick={togglePlay}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                className="p-2.5 rounded-full bg-sakura-500 text-white hover:bg-sakura-600 transition-colors shadow-lg shadow-sakura-500/40"
                aria-label={isPlaying ? "Pause" : "Play"}
                title={isPlaying ? "Pause (Space)" : "Play (Space)"}
              >
                <AnimatePresence mode="wait">
                  {isPlaying ? (
                    <motion.span
                      key="pause"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Pause size={18} />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="play"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Play size={18} className="ml-0.5" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              <motion.button
                onClick={next}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full text-ink-muted hover:text-ink hover:bg-sakura-100 transition-colors"
                aria-label="Next"
                title="Next (→)"
              >
                <SkipForward size={18} />
              </motion.button>

              <motion.button
                onClick={cycleRepeat}
                whileTap={{ scale: 0.9 }}
                className={`p-1.5 rounded-full transition-colors ${
                  repeat !== "off"
                    ? "text-sakura-600 bg-sakura-100"
                    : "text-ink-muted hover:text-ink hover:bg-sakura-100/60"
                }`}
                aria-label="Repeat"
                title={`Repeat: ${repeat} (R)`}
              >
                <RepeatIcon size={15} />
              </motion.button>
            </div>

            <div className="hidden md:flex items-center gap-1.5 min-w-[150px]">
              <button
                onClick={toggleMute}
                className="p-1.5 rounded-full hover:bg-sakura-100 text-ink-muted hover:text-ink transition-colors"
                aria-label={isMuted ? "Unmute" : "Mute"}
                title="Mute (M)"
              >
                {isMuted || volume === 0 ? <VolumeX size={15} /> : <Volume2 size={15} />}
              </button>
              <div
                ref={volumeRef}
                onPointerDown={handleVolumePointerDown}
                onPointerMove={handleVolumePointerMove}
                onPointerUp={handleVolumePointerUp}
                onPointerCancel={handleVolumePointerUp}
                className="relative flex-1 h-3 flex items-center cursor-pointer group/vol touch-none"
                title="Click or drag to set volume"
              >
                <div className="w-full h-1.5 bg-sakura-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-sakura-300 to-sakura-500 rounded-full"
                    style={{ width: `${volumePct}%` }}
                  />
                </div>
                <div
                  className={`absolute w-3 h-3 bg-white border-2 border-sakura-500 rounded-full shadow-md shadow-sakura-500/30 pointer-events-none transition-transform ${
                    isDraggingVolume ? "scale-150" : "group-hover/vol:scale-125"
                  }`}
                  style={{ left: `calc(${volumePct}% - 6px)` }}
                />
              </div>
              <span className="text-[10px] text-ink-muted tabular-nums w-7 text-right font-mono">
                {volumePct}%
              </span>
            </div>

            <div className="flex items-center gap-0.5">
              <motion.button
                onClick={() => setShowQueue((s) => !s)}
                whileTap={{ scale: 0.9 }}
                className={`p-1.5 rounded-full transition-colors ${
                  showQueue
                    ? "text-sakura-600 bg-sakura-100"
                    : "text-ink-muted hover:text-ink hover:bg-sakura-100/60"
                }`}
                aria-label="Queue"
                title="Queue (Q)"
              >
                <ListMusic size={15} />
              </motion.button>
              <motion.button
                onClick={() => setShowHelp((s) => !s)}
                whileTap={{ scale: 0.9 }}
                className={`p-1.5 rounded-full transition-colors ${
                  showHelp
                    ? "text-sakura-600 bg-sakura-100"
                    : "text-ink-muted hover:text-ink hover:bg-sakura-100/60"
                } hidden sm:inline-flex`}
                aria-label="Keyboard shortcuts"
                title="Shortcuts (?)"
              >
                <Keyboard size={15} />
              </motion.button>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[10px] text-ink-muted">
            <span className="w-8 tabular-nums font-mono">{formatTime(currentTime)}</span>
            <div
              ref={progressRef}
              onPointerDown={handleProgressPointerDown}
              onPointerMove={handleProgressPointerMove}
              onPointerUp={handleProgressPointerUp}
              onPointerCancel={handleProgressPointerUp}
              onPointerLeave={handleProgressPointerLeave}
              className="flex-1 h-3 flex items-center cursor-pointer group/prog touch-none"
              title="Click or drag to seek"
            >
              <div className="w-full h-1 bg-sakura-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-sakura-400 to-sakura-500 rounded-full transition-all duration-100"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div
                className={`absolute w-3.5 h-3.5 bg-sakura-500 rounded-full shadow-md shadow-sakura-500/50 ring-2 ring-white pointer-events-none transition-transform ${
                  isDraggingProgress ? "scale-125" : "group-hover/prog:scale-110"
                }`}
                style={{
                  left: `calc(${progress}% - 7px)`,
                  opacity: hoverPct !== null || isDraggingProgress || isPlaying ? 1 : 0,
                }}
              />
              {hoverPct !== null && duration > 0 && (
                <div
                  className="absolute -top-7 px-2 py-0.5 rounded-md bg-ink text-white text-[10px] font-mono pointer-events-none transform -translate-x-1/2 whitespace-nowrap"
                  style={{ left: `${hoverPct * 100}%` }}
                >
                  {formatTime(hoverPct * duration)}
                </div>
              )}
            </div>
            <span className="w-8 tabular-nums text-right font-mono">{formatTime(duration)}</span>
          </div>
        </div>

        <AnimatePresence>
          {showQueue && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="border-t border-sakura-200 overflow-hidden"
            >
              <div className="max-w-6xl mx-auto px-4 py-3">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-ink-muted flex items-center gap-1.5">
                    <Music2 size={12} /> Up Next
                  </h4>
                  <button
                    onClick={() => setShowQueue(false)}
                    className="text-ink-muted hover:text-ink"
                    aria-label="Close queue"
                  >
                    <X size={14} />
                  </button>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {queueItems.map((q) => (
                    <li key={`${q.index}-${q.track.id}`}>
                      <button
                        onClick={() => jumpTo(q.index)}
                        className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left transition-colors ${
                          q.playing
                            ? "bg-sakura-100 text-sakura-700"
                            : "hover:bg-sakura-50 text-ink"
                        }`}
                      >
                        <img
                          src={q.track.thumbnail}
                          alt=""
                          className="w-7 h-7 rounded object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = "none";
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-[12px] font-medium truncate">{q.track.title}</p>
                          <p className="text-[10px] text-ink-muted truncate font-mono">
                            {q.track.artist}
                          </p>
                        </div>
                        {q.playing && (
                          <span className="text-[10px] text-sakura-600 font-mono flex-shrink-0">
                            NOW
                          </span>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showHelp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setShowHelp(false)}
            className="fixed inset-0 z-[100] bg-black/30 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 8 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong rounded-2xl p-6 max-w-md w-full shadow-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold font-[var(--font-serif)] text-ink flex items-center gap-2">
                  <Keyboard size={18} className="text-sakura-500" /> Shortcuts
                </h3>
                <button
                  onClick={() => setShowHelp(false)}
                  className="text-ink-muted hover:text-ink p-1"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>
              <ul className="space-y-2 text-sm">
                {[
                  { keys: ["Space"], label: "Play / Pause" },
                  { keys: ["←", "→"], label: "Previous / Next" },
                  { keys: ["↑", "↓"], label: "Volume up / down" },
                  { keys: ["M"], label: "Mute toggle" },
                  { keys: ["S"], label: "Shuffle toggle" },
                  { keys: ["R"], label: "Repeat cycle" },
                  { keys: ["Q"], label: "Toggle queue" },
                  { keys: ["?"], label: "Toggle this help" },
                  { keys: ["Esc"], label: "Close" },
                ].map((s) => (
                  <li
                    key={s.label}
                    className="flex items-center justify-between py-1 border-b border-sakura-100 last:border-0"
                  >
                    <span className="text-ink-muted">{s.label}</span>
                    <span className="flex gap-1">
                      {s.keys.map((k) => (
                        <kbd
                          key={k}
                          className="px-2 py-0.5 rounded-md bg-sakura-100 text-sakura-700 text-[11px] font-mono border border-sakura-200"
                        >
                          {k}
                        </kbd>
                      ))}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="text-[10px] text-ink-faint mt-4 text-center">
                Shortcuts work globally except in text fields
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
