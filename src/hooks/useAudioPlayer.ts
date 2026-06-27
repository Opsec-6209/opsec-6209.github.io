import { useState, useCallback, useEffect, useRef } from "react";
import { playlist } from "../data/playlist";

export function useAudioPlayer() {
  const [currentIndex, setCurrentIndex] = useState(() => {
    try {
      const saved = localStorage.getItem("sakura-track-index");
      return saved ? Number(saved) : 0;
    } catch {
      return 0;
    }
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(() => {
    try {
      const saved = localStorage.getItem("sakura-volume");
      return saved ? Number(saved) : 0.7;
    } catch {
      return 0.7;
    }
  });
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Audio instance created ONCE (preserves through re-renders, no double-create in StrictMode)
  const [audio] = useState(() => {
    const a = new Audio();
    a.preload = "auto";
    return a;
  });

  const track = playlist[currentIndex];
  const isPlayingRef = useRef(isPlaying);
  isPlayingRef.current = isPlaying;

  const play = useCallback(() => {
    audio.src = track.file;
    audio.volume = isMuted ? 0 : volume;
    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => {});
  }, [track.file, audio, volume, isMuted]);

  const pause = useCallback(() => {
    audio.pause();
    setIsPlaying(false);
  }, [audio]);

  const togglePlay = useCallback(() => {
    if (isPlaying) pause();
    else play();
  }, [isPlaying, play, pause]);

  const next = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % playlist.length);
    setTimeout(() => setIsTransitioning(false), 250);
  }, []);

  const prev = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
    setTimeout(() => setIsTransitioning(false), 250);
  }, []);

  const seek = useCallback(
    (time: number) => {
      audio.currentTime = time;
      setCurrentTime(time);
    },
    [audio]
  );

  const setVolume = useCallback(
    (v: number) => {
      audio.volume = v;
      setVolumeState(v);
      setIsMuted(v === 0);
      try {
        localStorage.setItem("sakura-volume", String(v));
      } catch {}
    },
    [audio]
  );

  const toggleMute = useCallback(() => {
    if (isMuted) {
      audio.volume = volume;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  }, [isMuted, volume, audio]);

  // Initial volume apply
  useEffect(() => {
    audio.volume = isMuted ? 0 : volume;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Track change effect — only re-runs on track change, NOT volume change (BUG-FIX)
  useEffect(() => {
    audio.src = track.file;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration);
    const onEnded = () => {
      // Auto-advance to next track (no need to set isPlaying false, the new track will play)
      setCurrentIndex((prev) => (prev + 1) % playlist.length);
    };
    const onPause = () => {
      // Only update state if not at end of track
      if (!audio.ended) setIsPlaying(false);
    };
    const onPlay = () => setIsPlaying(true);

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("play", onPlay);

    // If was playing, continue playing the new track
    if (isPlayingRef.current) {
      audio.play().catch(() => {});
    }

    try {
      localStorage.setItem("sakura-track-index", String(currentIndex));
    } catch {}

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("play", onPlay);
    };
  }, [currentIndex, track.file, audio]);

  return {
    track,
    isPlaying,
    volume,
    isMuted,
    currentTime,
    duration,
    currentIndex,
    totalTracks: playlist.length,
    isTransitioning,
    play,
    pause,
    togglePlay,
    next,
    prev,
    seek,
    setVolume,
    toggleMute,
  };
}
