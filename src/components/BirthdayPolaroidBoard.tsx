import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import pic1 from "../images/pic1.jpg";
import pic2 from "../images/pic2.gif";
import pic3 from "../images/pic3.jpg";
import { textConfig } from "../textConfig";
import { sounds } from "../utils/soundEffects";

type Props = {
  onBack?: () => void;
  onNext?: () => void;
};

const PHOTOS = [pic1, pic2, pic3];

export default function BirthdayPolaroidBoard({ onBack, onNext }: Props) {
  const cfg = textConfig.polaroids;
  const cards = cfg.cards || [];

  const [flipped, setFlipped] = useState<number[]>([]);
  const [hasCelebratedAll, setHasCelebratedAll] = useState(false);

  const toggleFlip = (id: number) => {
    sounds.playPop();

    const nextFlipped = flipped.includes(id)
      ? flipped.filter((fId) => fId !== id)
      : [...flipped, id];

    setFlipped(nextFlipped);

    // If all cards are now flipped for the first time
    if (nextFlipped.length === cards.length && !hasCelebratedAll) {
      setHasCelebratedAll(true);
      sounds.playFanfare();
      confetti({
        particleCount: 55,
        spread: 65,
        origin: { y: 0.55 },
        colors: ["#ff4d6d", "#ffd166", "#06d6a0", "#118ab2", "#f72585"],
      });
    }
  };

  // Subtle natural scrapbooking rotation for each polaroid
  const rotations = ["-rotate-2 sm:-rotate-3", "rotate-1 sm:rotate-2", "-rotate-1 sm:-rotate-2"];

  return (
    <div className="w-full h-full max-h-[100dvh] flex flex-col justify-between items-center px-3 sm:px-6 py-2 sm:py-3 relative overflow-hidden select-none">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.7)_0%,_rgba(251,245,244,0.3)_60%,_rgba(245,225,225,0.7)_100%)] pointer-events-none" />

      {/* Top Banner (Leaves space for sound toggle on right) */}
      <div className="w-full max-w-3xl flex justify-between items-center text-[10px] sm:text-xs tracking-wider text-[#8e7571] uppercase font-semibold relative z-10 px-1 whitespace-nowrap border-b border-[#e2cac6] pb-1 pr-14 sm:pr-1">
        <span className="truncate">{cfg.tagline}</span>
        <span className="text-[#d84b5a] font-bold shrink-0">
          <span className="hidden sm:inline">★ TAP ON CARDS TO FLIP 💌 ★</span>
          <span className="sm:hidden">★ TAP TO FLIP ★</span>
        </span>
      </div>

      {/* Center Deck Area */}
      <div className="w-full max-w-3xl my-auto z-10 flex flex-col items-center justify-center">
        {/* Header */}
        <div className="text-center mb-2 sm:mb-4 px-2">
          <span
            className="text-[9.5px] sm:text-[11px] uppercase tracking-widest text-[#d84b5a] font-bold"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            ✦ INTERACTIVE MEMORY SCRAPBOOK ✦
          </span>
          <h1
            className="text-lg sm:text-2xl md:text-3xl text-[#3d2d2a] font-black tracking-tight mt-0.5 leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {cfg.title}
          </h1>
          <p className="text-[11px] sm:text-xs text-[#7a6460] mt-0.5 max-w-md mx-auto line-clamp-1 sm:line-clamp-none">
            {cfg.subtitle}
          </p>
        </div>

        {/* --- 3 POLAROID CARDS ROW --- */}
        <div className="w-full flex items-center justify-center gap-2.5 sm:gap-6 py-1">
          {cards.map((card, idx) => {
            const isFlipped = flipped.includes(card.id);
            const photo = PHOTOS[idx % PHOTOS.length];

            return (
              <div
                key={card.id}
                onClick={() => toggleFlip(card.id)}
                className={`relative cursor-pointer transition-transform duration-300 hover:scale-105 hover:z-30 ${rotations[idx % rotations.length]}`}
                style={{ perspective: "1000px" }}
              >
                {/* Washi Tape Strip on Top */}
                <div
                  className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 sm:w-16 h-3 sm:h-4 z-20 opacity-80 shadow-xs pointer-events-none rounded-xs border-y border-white/50"
                  style={{
                    backgroundColor: card.washiColor || "#ffd6df",
                    transform: "translateX(-50%) rotate(-1deg)",
                  }}
                />

                {/* 3D Flip Card Container */}
                <div
                  className="w-[100px] h-[155px] sm:w-[175px] sm:h-[245px] md:w-[200px] md:h-[265px] transition-transform duration-500 rounded-sm sm:rounded-md"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                  }}
                >
                  {/* ======================================================== */}
                  {/* FRONT SIDE: POLAROID PHOTO FRAME */}
                  {/* ======================================================== */}
                  <div
                    className="absolute inset-0 bg-white rounded-sm sm:rounded-md p-1.5 sm:p-2.5 pb-3 sm:pb-5 shadow-lg border border-[#edd7d3] flex flex-col justify-between"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                    }}
                  >
                    {/* Photo Container */}
                    <div className="w-full h-[95px] sm:h-[160px] md:h-[180px] bg-[#fbf5f4] rounded-xs overflow-hidden border border-[#f0deda] shadow-inner relative">
                      <img
                        src={photo}
                        alt={card.title}
                        className="w-full h-full object-cover select-none pointer-events-none"
                      />
                      <div className="absolute top-1 right-1 bg-black/40 text-white text-[7px] sm:text-[9px] px-1 py-0.2 rounded-full font-mono backdrop-blur-xs">
                        #0{idx + 1}
                      </div>
                    </div>

                    {/* Bottom Handwritten Title */}
                    <div className="text-center pt-1 sm:pt-1.5 flex flex-col items-center">
                      <h3
                        className="text-[#3d2d2a] font-bold text-xs sm:text-base leading-tight truncate w-full"
                        style={{ fontFamily: "'Dancing Script', cursive" }}
                      >
                        {card.title}
                      </h3>
                      <span className="text-[7.5px] sm:text-[9px] text-[#9c827e] font-semibold mt-0.5 flex items-center gap-0.5">
                        <span>Tap to flip ↺</span>
                      </span>
                    </div>
                  </div>

                  {/* ======================================================== */}
                  {/* BACK SIDE: VINTAGE SECRET NOTE CARD */}
                  {/* ======================================================== */}
                  <div
                    className="absolute inset-0 bg-gradient-to-b from-[#fffaf8] to-[#fef5f4] rounded-sm sm:rounded-md p-2 sm:p-3.5 shadow-xl border-2 border-[#f5b8c9] flex flex-col justify-between text-left"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    {/* Card Top Stamp */}
                    <div className="flex items-center justify-between border-b border-[#f0deda] pb-1">
                      <span className="text-[7px] sm:text-[8.5px] font-mono uppercase tracking-wider text-[#9c827e]">
                        {card.date}
                      </span>
                      <span className="text-[7.5px] sm:text-[9px] bg-[#ffeef2] text-[#d84b5a] font-bold px-1.5 py-0.2 rounded-full border border-[#f5b8c9]">
                        {card.stamp}
                      </span>
                    </div>

                    {/* Handwritten Secret Note */}
                    <div className="my-auto py-1">
                      <p
                        className="text-[9.5px] sm:text-xs text-[#4a3937] leading-tight sm:leading-relaxed italic"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        "{card.note}"
                      </p>
                    </div>

                    {/* Card Bottom Flip Back Pill */}
                    <div className="border-t border-[#f0deda] pt-1 flex items-center justify-between text-[7px] sm:text-[8.5px] text-[#9c827e]">
                      <span className="font-semibold text-[#d84b5a]">Secret Unlocked ✨</span>
                      <span className="flex items-center gap-0.5 hover:text-[#d84b5a]">
                        <span>↻ Photo</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Unlocked Progress Status Pill */}
        <div className="mt-3 sm:mt-4 text-center">
          <AnimatePresence mode="wait">
            {flipped.length === cards.length ? (
              <motion.div
                key="all-done"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e8f7f0] border border-[#b4e5cc] text-[#0f8b5f] text-[10px] sm:text-xs font-bold shadow-xs"
              >
                <span>🎉</span>
                <span>{cfg.revealedNotice}</span>
              </motion.div>
            ) : (
              <div className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-white/80 border border-[#ecd5d1] text-[#7a6460] text-[9.5px] sm:text-xs font-semibold shadow-2xs">
                <span>💌</span>
                <span>Revealed: {flipped.length}/3 Polaroids</span>
                <span className="text-[9px] text-[#9c827e] hidden sm:inline">• Tap all 3 to read notes!</span>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* --- BOTTOM BUTTONS --- */}
      <div className="flex justify-between items-center w-full max-w-3xl mb-2 sm:mb-3 px-1 relative z-20 pb-safe">
        {onBack && (
          <motion.button
            onClick={() => {
              sounds.playPop();
              onBack();
            }}
            whileTap={{ scale: 0.95 }}
            className="text-[#5c4946] bg-white border border-[#e2cdc9] px-4 sm:px-5 py-1.5 rounded-full text-xs shadow-xs hover:bg-[#faeae7] transition-all font-medium"
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
            className="text-white bg-[#d84b5a] hover:bg-[#c03d4a] px-4 sm:px-5 py-1.5 rounded-full text-xs shadow-sm transition-all font-medium ml-auto"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {cfg.nextButton || "Read Birthday Letter →"}
          </motion.button>
        )}
      </div>
    </div>
  );
}
