import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { textConfig } from "../textConfig";
import { sounds } from "../utils/soundEffects";

type Props = {
  title?: string;
  photos: string[];
  captions?: string[];
  onBack?: () => void;
  onNext?: () => void;
};

export default function CutePhotoGallery({
  title = textConfig?.gallery?.title || "Golden Memories & Smiles 📸",
  photos = [],
  captions = textConfig?.gallery?.captions || [],
  onBack,
  onNext,
}: Props) {
  const [index, setIndex] = useState(0);
  const [likes, setLikes] = useState<{ [key: number]: number }>({ 0: 12, 1: 18, 2: 24 });

  const cfg = textConfig?.gallery || {};
  const stickers = cfg.stickers && cfg.stickers.length > 0 
    ? cfg.stickers 
    : ["CANDID MOMENTS", "ICONIC VIBES", "PURE JOY"];

  const safePhotos = photos.length > 0 ? photos : [];

  const nextPhoto = () => {
    if (safePhotos.length === 0) return;
    sounds.playPop();
    setIndex((prev) => (prev + 1) % safePhotos.length);
  };

  const prevPhoto = () => {
    if (safePhotos.length === 0) return;
    sounds.playPop();
    setIndex((prev) => (prev - 1 + safePhotos.length) % safePhotos.length);
  };

  const handleLike = () => {
    sounds.playPop();
    setLikes((prev) => ({
      ...prev,
      [index]: (prev[index] || 15) + 1,
    }));

    confetti({
      particleCount: 20,
      spread: 45,
      origin: { y: 0.65 },
      colors: ["#ff4d6d", "#ff758f", "#ff8fa3", "#ffb3c1"],
    });
  };

  return (
    <div className="w-full h-full max-h-screen flex flex-col justify-between items-center bg-[#FBF5F4] px-4 py-2 sm:py-3 relative overflow-hidden select-none">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#fff8f8_0%,_#fbebeb_60%,_#f5dfdc_100%)] pointer-events-none" />

      {/* Top Banner */}
      <div className="w-full max-w-md flex justify-between items-center text-[10px] sm:text-xs tracking-wider text-[#8e7571] uppercase font-semibold relative z-10 px-1 whitespace-nowrap">
        <span>MEMORIES CHAPTER</span>
        <span className="text-[#d84b5a] font-bold">★ HIGHLIGHTS ★</span>
      </div>

      {/* --- COMPACT POLAROID CARD --- */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-[420px] rounded-3xl border border-[#ecd5d1] bg-white/90 shadow-xl flex flex-col overflow-hidden backdrop-blur-md my-auto z-10 p-3 sm:p-4"
      >
        {/* Washi Tape */}
        <div className="absolute -top-2.5 left-8 w-16 h-5 bg-[#ffd6df]/80 border-t border-b border-[#f3bac6] -rotate-3 z-30 shadow-xs pointer-events-none" />
        <div className="absolute -top-2.5 right-8 w-16 h-5 bg-[#fae1dd]/80 border-t border-b border-[#ebd0cb] rotate-3 z-30 shadow-xs pointer-events-none" />

        {/* Card Header */}
        <div className="text-center pt-1 pb-1">
          <h1
            className="text-base sm:text-lg text-[#d84b5a] font-bold tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {title}
          </h1>

          <div className="mt-1 border-t border-b border-[#ebd5d1] py-0.5 flex justify-between text-[10px] sm:text-xs text-[#7a6460]">
            <span><b>{cfg.fromLabel || "FROM: Me"}</b></span>
            <span><b className="text-[#d84b5a]">{cfg.toLabel || "TO: Birthday Girl 👑"}</b></span>
          </div>
        </div>

        {/* Photo Container */}
        <div className="my-1.5 p-2 bg-[#fdf9f8] border border-[#f0deda] rounded-2xl relative flex flex-col items-center">
          <div className="absolute top-3 left-3 z-20 bg-white/90 border border-[#f0c2cd] text-[#c03d4a] text-[9px] font-bold px-2 py-0.2 rounded-full shadow-xs">
            ★ {stickers[index % stickers.length]} ★
          </div>

          {/* Photo Frame */}
          <div className="relative w-full aspect-[16/10] max-h-[200px] sm:max-h-[220px] flex items-center justify-center overflow-hidden rounded-xl bg-white shadow-inner border border-[#f0e2df]">
            {safePhotos.length > 0 ? (
              <AnimatePresence mode="wait">
                <motion.img
                  key={index}
                  src={safePhotos[index]}
                  alt={`Memory ${index + 1}`}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.35 }}
                  className="w-full h-full object-cover select-none"
                />
              </AnimatePresence>
            ) : (
              <div className="text-gray-400 text-xs">No photos</div>
            )}

            {safePhotos.length > 1 && (
              <>
                <button
                  onClick={prevPhoto}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-[#d84b5a] text-[#d84b5a] hover:text-white border border-[#f5c6cf] rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold shadow-xs transition-all backdrop-blur-sm z-20"
                >
                  ‹
                </button>
                <button
                  onClick={nextPhoto}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-[#d84b5a] text-[#d84b5a] hover:text-white border border-[#f5c6cf] rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold shadow-xs transition-all backdrop-blur-sm z-20"
                >
                  ›
                </button>
              </>
            )}
          </div>

          {/* Caption & Like Row */}
          <div className="w-full px-1 pt-1.5 flex justify-between items-center gap-1.5">
            <p
              className="text-xs sm:text-sm text-[#d84b5a] font-semibold truncate"
              style={{ fontFamily: "'Dancing Script', cursive" }}
            >
              "{captions?.[index] || "A special birthday memory 💖"}"
            </p>

            <motion.button
              onClick={handleLike}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.92 }}
              className="bg-[#fff0f3] hover:bg-[#ffe0e6] border border-[#f5b8c9] text-[#c03d4a] px-2.5 py-0.5 rounded-full text-[10px] font-semibold shadow-xs transition-all flex items-center gap-1 whitespace-nowrap"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              <span>❤️</span>
              <span>{likes[index] || 15}</span>
            </motion.button>
          </div>

          {/* Dots Indicator */}
          {safePhotos.length > 1 && (
            <div className="flex gap-1 mt-1">
              {safePhotos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    sounds.playPop();
                    setIndex(i);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-200 ${
                    i === index ? "w-4 bg-[#d84b5a]" : "w-1.5 bg-[#ecd5d1]"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Card Footer */}
        <div className="pt-1 text-[10px] text-[#7a6460] flex justify-between items-center border-t border-[#ebd5d1]/60">
          <div><span className="font-bold">EDITION:</span> Birthday Special</div>
          <div className="text-[#d84b5a] font-semibold" style={{ fontFamily: "'Dancing Script', cursive" }}>
            with love & joy 🌸
          </div>
        </div>
      </motion.div>

      {/* --- BOTTOM BUTTONS --- */}
      <div className="flex justify-between items-center w-full max-w-[420px] mb-1 sm:mb-2 px-1 relative z-20">
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
            {cfg.nextButton || "Next →"}
          </motion.button>
        )}
      </div>
    </div>
  );
}
