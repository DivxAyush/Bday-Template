import React from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import StampSvg from "../svg/StampSVG";
import LetterPNG from "../images/letter.png";
import { textConfig } from "../textConfig";
import { sounds } from "../utils/soundEffects";

type Props = {
  onBack?: () => void;
  onNext?: () => void;
};

export default function LoveLetter({ onBack, onNext }: Props) {
  const cfg = textConfig.letter;

  const handleSprinkle = () => {
    sounds.playChime();
    confetti({
      particleCount: 35,
      spread: 50,
      origin: { y: 0.5 },
      shapes: ["circle", "star"],
      colors: ["#ffd166", "#f28ba2", "#ffadad", "#ffd6a5"],
    });
  };

  return (
    <div className="w-full h-full max-h-[100dvh] flex flex-col justify-between items-center px-4 py-2 sm:py-3 relative overflow-hidden select-none">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#fff8f8_0%,_#fbe9eb_60%,_#f5dedc_100%)] opacity-95 pointer-events-none" />

      {/* --- CENTERED LETTER CARD --- */}
      <div className="flex items-center justify-center w-full relative z-10 flex-grow my-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative w-full max-w-lg bg-white/90 rounded-3xl shadow-xl border border-[#eedad7] px-5 py-4 sm:px-8 sm:py-5 flex flex-col items-center text-center backdrop-blur-md"
        >
          {/* Decorative pinned photo (compact) */}
          <div className="absolute -top-4 -right-2 sm:-top-5 sm:-right-3 w-16 sm:w-20 rotate-6 overflow-hidden rounded-xl shadow-md border-2 border-white bg-white p-0.5 pointer-events-none">
            <div className="w-full h-14 sm:h-16 overflow-hidden rounded-lg">
              <img
                src={LetterPNG}
                alt="Birthday Memory"
                className="w-full h-full object-cover"
              />
            </div>
            <div
              className="text-[8px] text-[#8e7571] text-center pt-0.5 font-semibold"
              style={{ fontFamily: "'Dancing Script', cursive" }}
            >
              Happy B'day! ✨
            </div>
          </div>

          {/* Stamp in bottom left corner (compact) */}
          <div className="absolute -bottom-4 -left-3 sm:-bottom-5 sm:-left-4 pointer-events-none">
            <StampSvg size={75} topText="BIRTHDAY" bottomText="WISHES" color="#d84b5a" />
          </div>

          {/* Header */}
          <div className="mb-2">
            <span
              className="tracking-[0.2em] text-[#8e7571] uppercase font-bold text-[9px] sm:text-[10px]"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {cfg.tagline}
            </span>
            <h2
              className="text-[#d84b5a] uppercase font-black leading-tight text-base sm:text-xl tracking-wide"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {cfg.title} ✦
            </h2>
            <div className="w-12 h-0.5 bg-[#f5b8c9] mx-auto mt-1 rounded-full" />
          </div>

          {/* Letter Body */}
          <div className="max-w-md space-y-2 text-left my-1">
            <h3
              className="text-[#d84b5a] italic font-semibold text-sm sm:text-base"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {cfg.salutation}
            </h3>

            {cfg.paragraphs.map((p, i) => (
              <p
                key={i}
                className="text-[#4a3937] text-[11px] sm:text-xs leading-relaxed"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {p}
              </p>
            ))}

            <div className="pt-1 text-right">
              <p
                className="text-[10px] text-[#8e7571] italic leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {cfg.closing}
              </p>
              <h4
                className="text-[#d84b5a] text-base sm:text-lg font-bold leading-tight"
                style={{ fontFamily: "'Dancing Script', cursive" }}
              >
                {cfg.signature}
              </h4>
            </div>
          </div>

          {/* Sprinkle Sparkles Interactive Button */}
          <motion.button
            onClick={handleSprinkle}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-2 bg-[#fff0f3] border border-[#f5b8c9] text-[#c03d4a] hover:bg-[#ffe4ec] px-3.5 py-1 rounded-full text-[10px] sm:text-xs font-semibold shadow-xs transition-all flex items-center gap-1"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            <span>✨</span>
            <span>{cfg.sprinkleButton}</span>
          </motion.button>
        </motion.div>
      </div>

      {/* --- NAVIGATION BUTTONS --- */}
      <div className="flex justify-between items-center w-full max-w-lg mb-2 sm:mb-3 px-2 z-20 pb-1">
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
            Next →
          </motion.button>
        )}
      </div>
    </div>
  );
}
