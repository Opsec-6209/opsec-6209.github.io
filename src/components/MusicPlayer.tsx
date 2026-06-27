import { useRef, useState } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAudioPlayer } from "../hooks/useAudioPlayer";

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
    track,
    isPlaying,
    volume,
    isMuted,
    currentTime,
    duration,
    currentIndex,
    totalTracks,
    isTransitioning,
    togglePlay,
    next,
    prev,
    seek,
    setVolume,
    toggleMute,
  } = player;

  const progressRef = useRef<HTMLDivElement>(null);
  const [hoverPct, setHoverPct] = useState<number | null>(null);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const volumePct = Math.round((isMuted ? 0 : volume) * 100);

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || duration <= 0) return;
    const rect = progressRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(1, x / rect.width));
    seek(pct * duration);
  };

  const handleProgressHover = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || duration <= 0) return;
    const rect = progressRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    setHoverPct(Math.max(0, Math.min(1, x / rect.width)));
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/85 backdrop-blur-xl border-b border-sakura-200 shadow-[0_2px_20px_rgba(255,77,141,0.06)]">
      <div className="max-w-6xl mx-auto px-4 py-2 flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <AnimatePresence mode="wait">
            <motion.img
              key={track.id}
              src={track.thumbnail}
              alt={track.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: isTransitioning ? 0.4 : 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="w-10 h-10 rounded-lg object-cover border border-sakura-200 flex-shrink-0 hidden sm:block"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'><rect fill='%23ffe4ec' width='40' height='40'/><text x='20' y='25' text-anchor='middle' fill='%23ff4d8d' font-size='14'>🎵</text></svg>";
              }}
            />
          </AnimatePresence>

          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.p
                key={track.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className="text-[13px] font-medium text-ink truncate leading-tight"
              >
                {track.title}
              </motion.p>
            </AnimatePresence>
            <p className="text-[11px] text-ink-muted truncate leading-tight">
              {track.artist} · {currentIndex + 1}/{totalTracks}
            </p>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={prev}
              className="p-2 rounded-full hover:bg-sakura-100 text-ink-muted hover:text-ink transition-colors"
              aria-label="Previous"
            >
              <SkipBack size={18} />
            </button>

            <motion.button
              onClick={togglePlay}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className="p-2.5 rounded-full bg-sakura-500 text-white hover:bg-sakura-600 transition-colors shadow-lg shadow-sakura-500/30"
              aria-label={isPlaying ? "Pause" : "Play"}
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

            <button
              onClick={next}
              className="p-2 rounded-full hover:bg-sakura-100 text-ink-muted hover:text-ink transition-colors"
              aria-label="Next"
            >
              <SkipForward size={18} />
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2 min-w-[140px]">
            <button
              onClick={toggleMute}
              className="p-1.5 rounded-full hover:bg-sakura-100 text-ink-muted hover:text-ink transition-colors"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
            <div className="relative flex-1 flex items-center group/vol">
              <div
                className="w-full h-[3px] bg-sakura-100 rounded-full overflow-hidden cursor-pointer relative"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const pct = Math.max(0, Math.min(1, x / rect.width));
                  setVolume(pct);
                }}
              >
                <div
                  className="h-full bg-gradient-to-r from-sakura-300 to-sakura-500 rounded-full"
                  style={{ width: `${volumePct}%` }}
                />
              </div>
              <div
                className="absolute w-3.5 h-3.5 bg-sakura-500 rounded-full shadow-md shadow-sakura-500/40 cursor-grab active:cursor-grabbing pointer-events-none transition-transform group-hover/vol:scale-110"
                style={{
                  left: `calc(${volumePct}% - 7px)`,
                }}
              />
            </div>
            <span className="text-[10px] text-ink-muted tabular-nums w-7 text-right">
              {volumePct}%
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[10px] text-ink-muted">
          <span className="w-8 tabular-nums">{formatTime(currentTime)}</span>
          <div
            ref={progressRef}
            onClick={handleProgressClick}
            onMouseMove={handleProgressHover}
            onMouseLeave={() => setHoverPct(null)}
            className="flex-1 h-1.5 bg-sakura-100 rounded-full cursor-pointer relative group/prog"
          >
            <div
              className="h-full bg-gradient-to-r from-sakura-400 to-sakura-500 rounded-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-sakura-500 rounded-full shadow-md shadow-sakura-500/40 transition-opacity"
              style={{ left: `calc(${progress}% - 6px)`, opacity: hoverPct !== null ? 1 : 0 }}
            />
            {hoverPct !== null && duration > 0 && (
              <div
                className="absolute -top-7 px-2 py-0.5 rounded-md bg-ink text-white text-[10px] font-mono pointer-events-none transform -translate-x-1/2"
                style={{ left: `${hoverPct * 100}%` }}
              >
                {formatTime(hoverPct * duration)}
              </div>
            )}
          </div>
          <span className="w-8 tabular-nums text-right">{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
}
