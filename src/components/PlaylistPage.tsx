import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Music1 from "../music/music1.mp3";
import Music2 from "../music/music2.mp3";
import Music3 from "../music/music3.mp3";
import Cover1 from "../musiccover/music1.gif";
import Cover2 from "../musiccover/music2.gif";
import Cover3 from "../musiccover/music3.jpg";
import { textConfig } from "../textConfig";
import { sounds } from "../utils/soundEffects";

type Props = {
  onBack?: () => void;
  onNext?: () => void;
};

type Song = {
  id: number;
  title: string;
  tag: string;
  file: string;
  cover: string;
};

const playlist: Song[] = [
  { id: 1, title: textConfig?.playlist?.tracks?.[0]?.title || "Finding You (Celebration Mix)", tag: "Acoustic", file: Music1, cover: Cover1 },
  { id: 2, title: textConfig?.playlist?.tracks?.[1]?.title || "If The World Was Ending", tag: "Favorites", file: Music2, cover: Cover2 },
  { id: 3, title: textConfig?.playlist?.tracks?.[2]?.title || "Dil Jo Tumhara Hai", tag: "Melody", file: Music3, cover: Cover3 },
];

export default function PlaylistPage({ onBack, onNext }: Props) {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const cfg = textConfig.playlist;
  const currentSong = playlist[currentSongIndex];

  useEffect(() => {
    if (audioRef.current) {
      setIsLoading(true);
      audioRef.current.pause();
      audioRef.current.load();
      setCurrentTime(0);

      if (isPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => setIsLoading(false))
            .catch(() => {
              setIsPlaying(false);
              setIsLoading(false);
            });
        }
      } else {
        setIsLoading(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSongIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration || 0);
    const handleEnd = () => nextSong();

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnd);
    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnd);
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    sounds.playPop();

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            setIsPlaying(false);
          });
      }
    }
  };

  const nextSong = () => {
    sounds.playPop();
    setCurrentSongIndex((prev) => (prev + 1) % playlist.length);
    setIsPlaying(true);
  };

  const prevSong = () => {
    sounds.playPop();
    setCurrentSongIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
    setIsPlaying(true);
  };

  const selectSong = (idx: number) => {
    sounds.playPop();
    setCurrentSongIndex(idx);
    setIsPlaying(true);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) audioRef.current.currentTime = time;
  };

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full h-full max-h-[100dvh] flex flex-col justify-between items-center px-4 py-2 sm:py-3 relative overflow-hidden select-none">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.7)_0%,_rgba(251,245,244,0.3)_60%,_rgba(245,225,225,0.7)_100%)] pointer-events-none" />

      {/* Top Banner */}
      <div className="w-full max-w-3xl flex justify-between items-center text-[10px] sm:text-xs tracking-wider text-[#8e7571] uppercase font-semibold relative z-10 px-1 whitespace-nowrap border-b border-[#e2cac6] pb-1 pr-14 sm:pr-1">
        <span>THE SOUNDTRACK</span>
        <span className="text-[#d84b5a] font-bold">★ JUKEBOX EDITION ★</span>
      </div>

      {/* --- STUDIO AUDIO DECK SPREAD --- */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-3xl bg-white/85 rounded-3xl shadow-2xl border border-[#ecd5d1] p-4 sm:p-6 backdrop-blur-md my-auto z-10 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8"
      >
        {/* LEFT: Spinning Vinyl & Cover Visualizer */}
        <div className="flex flex-col items-center justify-center relative">
          <div className="relative flex items-center justify-center my-2">
            {/* Spinning Vinyl */}
            <motion.div
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
              className="absolute w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-[#1c1c1c] shadow-xl border-2 border-[#333] flex items-center justify-center -right-5 sm:-right-7"
              style={{
                backgroundImage:
                  "repeating-radial-gradient(circle, #1a1a1a 0, #1a1a1a 2px, #262626 3px, #1a1a1a 4px)",
              }}
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#ffd166] border border-white flex items-center justify-center text-[8px] font-bold text-[#8a5b00]">
                BDAY
              </div>
            </motion.div>

            {/* Album Cover */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSongIndex}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.3 }}
                className="relative z-10 w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden shadow-lg border-2 border-white bg-white"
              >
                <img
                  src={currentSong.cover}
                  alt={currentSong.title}
                  className="w-full h-full object-cover select-none"
                  draggable={false}
                />
                {isPlaying && (
                  <div className="absolute inset-0 bg-black/25 flex items-center justify-center gap-1 backdrop-blur-[1px]">
                    {[0.6, 1, 0.4, 0.8, 0.5].map((h, i) => (
                      <motion.div
                        key={i}
                        animate={{ height: ["20%", "85%", "30%", "95%", "40%"] }}
                        transition={{
                          duration: 1.1,
                          delay: i * 0.15,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="w-1.5 bg-[#ffd166] rounded-full"
                        style={{ height: `${h * 100}%` }}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <span className="text-[10px] text-[#8e7571] font-mono tracking-wider mt-1 hidden sm:block">
            VINYL // STEREO 33 RPM
          </span>
        </div>

        {/* RIGHT: Song Details, Controls, and Queue */}
        <div className="flex-1 w-full flex flex-col items-center md:items-start text-center md:text-left">
          {/* Header */}
          <div className="mb-2">
            <h1
              className="text-lg sm:text-2xl text-[#d84b5a] font-bold tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {cfg.title}
            </h1>
            <p className="text-xs text-[#7a6460]">
              {cfg.subtitle}
            </p>
          </div>

          {/* Current Song Pill */}
          <div className="bg-[#fcf6f5] border border-[#f0deda] rounded-xl px-3 py-1.5 mb-2 w-full max-w-sm">
            <span className="text-[#d84b5a] uppercase text-[9px] tracking-wider font-bold block">
              {isLoading ? "Loading..." : isPlaying ? cfg.statusPlaying : cfg.statusPaused}
            </span>
            <h2 className="text-xs sm:text-sm font-bold text-[#3d2f2d] truncate">
              {currentSong.title}
            </h2>
          </div>

          {/* Progress Slider */}
          <div className="w-full max-w-sm mb-2">
            <div className="flex justify-between text-[#7a6460] text-[10px] mb-0.5 font-semibold">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1.5 rounded-full cursor-pointer appearance-none focus:outline-none"
              style={{
                background: `linear-gradient(to right, #d84b5a 0%, #d84b5a ${
                  duration > 0 ? (currentTime / duration) * 100 : 0
                }%, #ebd5d1 ${duration > 0 ? (currentTime / duration) * 100 : 0}%, #ebd5d1 100%)`,
              }}
            />
          </div>

          {/* Playback Controls */}
          <div className="flex items-center justify-center md:justify-start gap-3 my-1">
            <button
              onClick={prevSong}
              disabled={isLoading}
              className="w-8 h-8 rounded-full bg-white border border-[#e8d0cb] text-[#d84b5a] text-sm shadow-xs hover:bg-[#fff0f3] flex items-center justify-center transition-all"
            >
              ⏮
            </button>

            <button
              onClick={togglePlay}
              disabled={isLoading}
              className="w-11 h-11 rounded-full bg-gradient-to-r from-[#e76077] to-[#d84b5a] text-white text-lg shadow-md hover:shadow-lg flex items-center justify-center transition-all"
            >
              {isLoading ? "⟳" : isPlaying ? "⏸" : "▶"}
            </button>

            <button
              onClick={nextSong}
              disabled={isLoading}
              className="w-8 h-8 rounded-full bg-white border border-[#e8d0cb] text-[#d84b5a] text-sm shadow-xs hover:bg-[#fff0f3] flex items-center justify-center transition-all"
            >
              ⏭
            </button>
          </div>

          {/* Track List (Queue) - Desktop only to save mobile height */}
          <div className="w-full max-w-sm mt-2 pt-2 border-t border-[#f0deda] hidden sm:flex flex-col gap-1">
            {playlist.map((track, i) => (
              <button
                key={track.id}
                onClick={() => selectSong(i)}
                className={`w-full flex items-center justify-between px-2.5 py-1 rounded-lg text-xs transition-all text-left ${
                  i === currentSongIndex
                    ? "bg-[#fff0f3] text-[#d84b5a] font-bold border border-[#f5b8c9]"
                    : "hover:bg-[#fcf5f4] text-[#5c4946]"
                }`}
              >
                <div className="flex items-center gap-1.5 truncate">
                  <span>{i === currentSongIndex && isPlaying ? "▶" : `${i + 1}.`}</span>
                  <span className="truncate">{track.title}</span>
                </div>
                <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-white border border-[#ebd5d1] text-[#7a6460]">
                  {track.tag}
                </span>
              </button>
            ))}
          </div>
        </div>

        <audio ref={audioRef} preload="metadata">
          <source src={currentSong.file} type="audio/mpeg" />
        </audio>
      </motion.div>

      {/* --- Navigation Buttons --- */}
      <div className="flex justify-between items-center w-full max-w-3xl mb-2 sm:mb-3 px-1 relative z-20 pb-1">
        {onBack && (
          <motion.button
            onClick={() => {
              sounds.playPop();
              onBack();
            }}
            whileTap={{ scale: 0.95 }}
            className="text-[#5c4946] bg-white border border-[#e2cdc9] px-5 py-1.5 rounded-full text-xs shadow-xs hover:bg-[#faeae7] transition-all font-medium"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            ← Back
          </motion.button>
        )}

        {onNext && (
          <motion.button
            onClick={() => {
              sounds.playPop();
              onNext();
            }}
            whileTap={{ scale: 0.95 }}
            className="text-white bg-[#d84b5a] hover:bg-[#c03d4a] px-5 py-1.5 rounded-full text-xs shadow-sm transition-all font-medium ml-auto"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {cfg.nextButton}
          </motion.button>
        )}
      </div>

      <style>{`
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #d84b5a;
          border: 1.5px solid white;
          cursor: pointer;
        }
        input[type="range"]::-moz-range-thumb {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #d84b5a;
          border: 1.5px solid white;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
