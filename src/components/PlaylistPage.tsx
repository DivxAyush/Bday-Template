import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Music1 from "../music/music1.mp3";
import Music2 from "../music/music2.mp3";
import Music3 from "../music/music3.mp3";
import Cover1 from "../musiccover/music1.gif";
import Cover2 from "../musiccover/music2.gif";
import Cover3 from "../musiccover/music3.jpg";

type Props = {
  onBack?: () => void;
  onNext?: () => void;
};

type Song = {
  id: number;
  title: string;
  file: string;
  cover: string;
};

const playlist: Song[] = [
  { id: 1, title: "Dil Cheez Tujhe Dedi", file: Music1, cover: Cover1 },
  { id: 2, title: "If The World Was Ending", file: Music2, cover: Cover2 },
  { id: 3, title: "Dil Jo Tumhara Hai", file: Music3, cover: Cover3 },
];

export default function PlaylistPage({ onBack, onNext }: Props) {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentSong = playlist[currentSongIndex];

  useEffect(() => {
    if (audioRef.current) {
      setIsLoading(true);
      setError(null);
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
              setError("Playback failed");
            });
        }
      } else {
        setIsLoading(false);
      }
    }
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
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => {
            setIsPlaying(false);
            setError("Tap again to retry.");
          });
      }
    }
  };

  const nextSong = () => {
    setCurrentSongIndex((prev) => (prev + 1) % playlist.length);
    setIsPlaying(true);
  };

  const prevSong = () => {
    setCurrentSongIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
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
    <div className="w-full min-h-screen flex flex-col justify-between items-center bg-[#FBF5F4] relative overflow-hidden p-3 sm:p-5">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_#fff8f8_0%,_#fde5eb_100%)] opacity-90 pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/paper-texture.png')] opacity-10 mix-blend-multiply pointer-events-none" />

      {/* --- Center Card --- */}
      <div className="flex-grow flex items-center justify-center w-full z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative w-full max-w-[700px] bg-white/85 rounded-2xl shadow-2xl border border-[#e7d8d2] px-5 py-8 sm:px-8 sm:py-10 flex flex-col items-center text-center backdrop-blur-sm"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-[clamp(1.2rem,4vw,2.5rem)] text-[#d84b5a] font-bold mb-6"
          >
            Songs Dedicated To You 💗
          </motion.h1>

          {/* Album Cover */}
          <div className="relative flex items-center justify-center mb-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSongIndex}
                initial={{ opacity: 0, scale: 0.9, rotateY: -90 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.9, rotateY: 90 }}
                transition={{ duration: 0.5 }}
                className="relative w-44 h-44 sm:w-60 sm:h-60 rounded-2xl overflow-hidden shadow-xl ring-1 ring-[#d84b5a]/30"
              >
                <img
                  src={currentSong.cover}
                  alt={currentSong.title}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
                {isPlaying && (
                  <motion.div
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 flex items-center justify-center text-5xl sm:text-6xl text-white drop-shadow-xl"
                  >
                    ♪
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Song Info */}
          <div className="bg-white/60 border border-[#e7d8d2] rounded-xl shadow-inner px-4 py-3 sm:px-5 sm:py-3 mb-5 w-full max-w-sm">
            <p
              className="text-[#d84b5a] uppercase text-xs sm:text-sm tracking-widest mb-1"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              {isLoading ? "Loading..." : isPlaying ? "♪ Now Playing ♪" : "Paused"}
            </p>
            <h2 className="text-base sm:text-lg font-semibold text-[#2c2c2c] mb-1">
              {currentSong.title}
            </h2>
            {/* <p
              className="text-[11px] sm:text-xs text-[#2c2c2c]/60"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Track {currentSongIndex + 1} of {playlist.length}
            </p> */}
          </div>

          {/* Progress Bar */}
          <div className="w-full max-w-sm mb-5">
            <div
              className="flex justify-between text-[#2c2c2c] text-xs sm:text-sm mb-2"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-2 rounded-full cursor-pointer appearance-none focus:outline-none"
              style={{
                background: `linear-gradient(to right, #d84b5a 0%, #d84b5a ${
                  duration > 0 ? (currentTime / duration) * 100 : 0
                }%, #f1e5e5 ${duration > 0 ? (currentTime / duration) * 100 : 0}%, #f1e5e5 100%)`,
              }}
            />
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-center gap-4 sm:gap-5">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={prevSong}
              disabled={isLoading}
              className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white border-2 border-[#d84b5a] text-[#d84b5a] text-lg sm:text-xl shadow-md hover:bg-[#d84b5a] hover:text-white transition-all"
            >
              ⏮
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={togglePlay}
              disabled={isLoading}
              className="w-14 h-14 sm:w-18 sm:h-18 rounded-full bg-gradient-to-br from-[#d84b5a] to-[#c03d4a] text-white text-2xl sm:text-3xl shadow-lg hover:shadow-xl border-2 border-[#a83545] transition-all"
            >
              {isLoading ? "⟳" : isPlaying ? "⏸" : "▶"}
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={nextSong}
              disabled={isLoading}
              className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white border-2 border-[#d84b5a] text-[#d84b5a] text-lg sm:text-xl shadow-md hover:bg-[#d84b5a] hover:text-white transition-all"
            >
              ⏭
            </motion.button>
          </div>

          <audio ref={audioRef} preload="metadata">
            <source src={currentSong.file} type="audio/mpeg" />
          </audio>
        </motion.div>
      </div>

      {/* --- Navigation Buttons --- */}
      {onBack && (
        <motion.button
          onClick={onBack}
          whileTap={{ scale: 0.95 }}
          className="absolute bottom-4 left-4 text-gray-700 bg-[#9EC1E6] px-6 py-2.5 rounded-full text-sm sm:text-base shadow-md hover:bg-[#7fa8ce] transition-all z-20"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          ← Back
        </motion.button>
      )}

      {onNext && (
        <motion.button
          onClick={onNext}
          whileTap={{ scale: 0.95 }}
          className="absolute bottom-4 right-4 text-gray-700 bg-[#F7D9E6] px-6 py-2.5 rounded-full text-sm sm:text-base shadow-md hover:bg-[#F7B5CF] transition-all z-20"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          Next →
        </motion.button>
      )}

      <style>{`
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #d84b5a;
          border: 2px solid white;
          cursor: pointer;
        }
        input[type="range"]::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #d84b5a;
          border: 2px solid white;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
