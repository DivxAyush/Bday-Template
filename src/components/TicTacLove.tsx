import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { textConfig } from "../textConfig";
import { sounds } from "../utils/soundEffects";

type CellType = "cake" | "balloon" | "gift" | null;

type Props = {
  onBack?: () => void;
  onNext?: () => void;
};

export default function TicTacLove({ onBack, onNext }: Props) {
  const cfg = textConfig.game;

  // Initial grid state with 2 cakes aligned, leaving cell 4 (center) for the user to make 3-in-a-row!
  const [cells, setCells] = useState<CellType[]>([
    "cake",    "balloon", "gift",
    "balloon", null,      "balloon",
    "gift",    "gift",    "cake",
  ]);
  const [finished, setFinished] = useState(false);

  const triggerConfetti = () => {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.55 },
      colors: ["#ff758c", "#ff7eb3", "#ffd166", "#06d6a0", "#118ab2"],
    });
  };

  const handleClick = (i: number) => {
    if (cells[i] || finished) return;

    sounds.playPop();
    const newCells = [...cells];
    newCells[i] = "cake";
    setCells(newCells);

    setFinished(true);
    sounds.playFanfare();
    triggerConfetti();
  };

  // Auto-move to next after message is shown if user doesn't click
  useEffect(() => {
    if (finished && onNext) {
      const timer = setTimeout(() => {
        onNext();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [finished, onNext]);

  return (
    <div className="w-full h-full max-h-[100dvh] flex flex-col justify-between items-center px-4 py-2 sm:py-3 relative overflow-hidden select-none">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#fff8f8_0%,_#fbf0ee_70%,_#f3dfdc_100%)] pointer-events-none" />

      {/* Floating party elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { icon: "🎈", top: "10%", left: "8%", delay: 0 },
          { icon: "✨", top: "15%", right: "10%", delay: 1 },
          { icon: "🎁", bottom: "16%", left: "8%", delay: 1.5 },
          { icon: "🎂", bottom: "12%", right: "8%", delay: 0.5 },
        ].map((item, i) => (
          <motion.div
            key={i}
            className="absolute text-lg select-none opacity-30"
            style={{ top: item.top, left: item.left, right: item.right, bottom: item.bottom }}
            animate={{ y: [-6, 6, -6] }}
            transition={{ duration: 3.5, delay: item.delay, repeat: Infinity, ease: "easeInOut" }}
          >
            {item.icon}
          </motion.div>
        ))}
      </div>

      {/* --- HEADER --- */}
      <div className="text-center mt-1 relative z-10">
        <span
          className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#8e7571] font-semibold"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          ✦ BIRTHDAY MINI GAME ✦
        </span>
        <h1
          className="text-base sm:text-xl md:text-2xl text-[#d84b5a] font-bold text-center leading-tight mt-0.5"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {cfg.header}
        </h1>
        <p
          className="text-[11px] sm:text-xs text-[#5c4946] max-w-xs mx-auto mt-0.5 line-clamp-1"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          {cfg.subtext}
        </p>
      </div>

      {/* --- COMPACT GAME BOARD --- */}
      <motion.div
        className="bg-white/90 w-full max-w-[340px] sm:max-w-[380px] flex flex-col items-center justify-center p-3 sm:p-4 rounded-3xl shadow-xl border border-[#ecd5d1] relative z-10 backdrop-blur-md my-auto"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid grid-cols-3 gap-2 sm:gap-2.5 p-1">
          {cells.map((cell, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: cell ? 1 : 1.05 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => handleClick(i)}
              className={`w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 border-2 ${
                cell === "cake"
                  ? "border-[#f08a9d] bg-[#fff0f3]"
                  : cell
                  ? "border-[#ecd5d1] bg-[#fffbf9]"
                  : "border-dashed border-[#d84b5a] bg-white cursor-pointer hover:bg-[#fff5f6]"
              } flex flex-col items-center justify-center text-xl sm:text-2xl md:text-3xl select-none rounded-2xl shadow-xs transition-colors duration-150`}
            >
              {cell === "cake" && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 350, damping: 15 }}
                >
                  🎂
                </motion.div>
              )}
              {cell === "balloon" && <span className="opacity-75">🎈</span>}
              {cell === "gift" && <span className="opacity-75">🎁</span>}
              {!cell && (
                <motion.span
                  animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-[10px] sm:text-xs text-[#d84b5a] font-bold text-center leading-none"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Tap! 🎂
                </motion.span>
              )}
            </motion.div>
          ))}
        </div>

        {/* --- WIN OVERLAY (COMPACT) --- */}
        <AnimatePresence>
          {finished && (
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-white/95 rounded-3xl backdrop-blur-md z-20 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
            >
              <div className="text-2xl sm:text-3xl mb-1">🎉 🎂 🎈</div>

              <h3
                className="text-sm sm:text-base text-[#d84b5a] font-bold leading-tight max-w-[260px]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {cfg.winHeading}
              </h3>

              <p
                className="text-[11px] sm:text-xs text-[#5c4946] mt-1 max-w-[260px] leading-snug"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {cfg.winSubtext}
              </p>

              {onNext && (
                <motion.button
                  onClick={() => {
                    sounds.playPop();
                    onNext();
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-3 text-white bg-gradient-to-r from-[#e76077] to-[#d84b5a] px-5 py-1.5 rounded-full text-xs font-semibold shadow-md transition-all"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {cfg.nextButton}
                </motion.button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* --- BOTTOM BUTTONS --- */}
      <div className="flex justify-between items-center w-full max-w-[380px] mb-2 sm:mb-3 px-2 relative z-10 pb-1">
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
            className="text-white bg-[#d84b5a] px-5 py-1.5 rounded-full text-xs shadow-sm hover:bg-[#c03d4a] transition-all font-medium ml-auto"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Next →
          </motion.button>
        )}
      </div>
    </div>
  );
}
