import { useRef } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";
import { useAudioPlayer } from "../hooks/useAudioPlayer";

function formatTime(seconds: number) {
  if (!isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function MusicPlayer() {
  const {
    track,
    isPlaying,
    volume,
    isMuted,
    currentTime,
    duration,
    currentIndex,
    totalTracks,
    togglePlay,
    next,
    prev,
    seek,
    setVolume,
    toggleMute,
  } = useAudioPlayer();

  const progressRef = useRef<HTMLDivElement>(null);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || duration <= 0) return;
    const rect = progressRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = x / rect.width;
    seek(pct * duration);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/85 backdrop-blur-xl border-b border-sakura-200 shadow-[0_2px_20px_rgba(255,77,141,0.06)]">
      <div className="max-w-6xl mx-auto px-4 py-2 flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <img
            src={track.thumbnail}
            alt={track.title}
            className="w-10 h-10 rounded-lg object-cover border border-sakura-200 flex-shrink-0 hidden sm:block"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'><rect fill='%23ffe4ec' width='40' height='40'/><text x='20' y='25' text-anchor='middle' fill='%23ff4d8d' font-size='14'>🎵</text></svg>";
            }}
          />

          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-medium text-ink truncate leading-tight">
              {track.title}
            </p>
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

            <button
              onClick={togglePlay}
              className="p-2.5 rounded-full bg-sakura-500 text-white hover:bg-sakura-600 transition-colors shadow-lg shadow-sakura-500/25"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
            </button>

            <button
              onClick={next}
              className="p-2 rounded-full hover:bg-sakura-100 text-ink-muted hover:text-ink transition-colors"
              aria-label="Next"
            >
              <SkipForward size={18} />
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={toggleMute}
              className="p-1.5 rounded-full hover:bg-sakura-100 text-ink-muted hover:text-ink transition-colors"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-20 h-1.5 appearance-none bg-sakura-200 rounded-full outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-sakura-500 [&::-webkit-slider-thumb]:cursor-pointer"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 text-[10px] text-ink-muted">
          <span className="w-8 tabular-nums">{formatTime(currentTime)}</span>
          <div
            ref={progressRef}
            onClick={handleProgressClick}
            className="flex-1 h-1 bg-sakura-100 rounded-full cursor-pointer relative group"
          >
            <div
              className="h-full bg-gradient-to-r from-sakura-400 to-sakura-500 rounded-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-sakura-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
              style={{ left: `calc(${progress}% - 5px)` }}
            />
          </div>
          <span className="w-8 tabular-nums text-right">{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
}
