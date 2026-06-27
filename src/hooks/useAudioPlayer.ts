import { useState, useRef, useCallback, useEffect } from "react";
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
  const [volume, setVolume] = useState(() => {
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

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const track = playlist[currentIndex];

  const getAudio = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.volume = volume;
    }
    return audioRef.current;
  }, [volume]);

  const play = useCallback(() => {
    const audio = getAudio();
    audio.src = track.file;
    audio.play().then(() => setIsPlaying(true)).catch(() => {});
  }, [track.file, getAudio]);

  const pause = useCallback(() => {
    getAudio().pause();
    setIsPlaying(false);
  }, [getAudio]);

  const togglePlay = useCallback(() => {
    if (isPlaying) pause();
    else play();
  }, [isPlaying, play, pause]);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % playlist.length);
  }, []);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
  }, []);

  const seek = useCallback(
    (time: number) => {
      const audio = getAudio();
      audio.currentTime = time;
      setCurrentTime(time);
    },
    [getAudio]
  );

  const setVolumeLevel = useCallback(
    (v: number) => {
      const audio = getAudio();
      audio.volume = v;
      setVolume(v);
      setIsMuted(v === 0);
      try { localStorage.setItem("sakura-volume", String(v)); } catch {}
    },
    [getAudio]
  );

  const toggleMute = useCallback(() => {
    const audio = getAudio();
    if (isMuted) {
      audio.volume = volume;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  }, [isMuted, volume, getAudio]);

  useEffect(() => {
    const audio = getAudio();
    audio.src = track.file;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration);
    const onEnded = () => {
      setIsPlaying(false);
      setCurrentIndex((prev) => (prev + 1) % playlist.length);
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);

    if (isPlaying) {
      audio.play().catch(() => {});
    }

    try { localStorage.setItem("sakura-track-index", String(currentIndex)); } catch {}

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
    };
  }, [currentIndex, getAudio, isPlaying, track.file]);

  return {
    track,
    isPlaying,
    volume,
    isMuted,
    currentTime,
    duration,
    currentIndex,
    totalTracks: playlist.length,
    togglePlay,
    next,
    prev,
    seek,
    setVolume: setVolumeLevel,
    toggleMute,
  };
}
