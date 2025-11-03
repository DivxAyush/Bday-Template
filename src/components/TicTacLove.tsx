import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

type Cell = "heart" | "x" | null;

type Props = {
  onBack?: () => void;
  onNext?: () => void;
};

export default function TicTacLove({ onBack, onNext }: Props) {
  const [cells, setCells] = useState<Cell[]>([
    "heart",
    "x",
    "x",
    "x",
    null,
    "x",
    "x",
    "x",
    "heart",
  ]);
  const [finished, setFinished] = useState(false);

  const handleClick = (i: number) => {
    if (cells[i] || finished) return;

    const newCells = [...cells];
    newCells[i] = "heart";
    setCells(newCells);

    if (newCells.filter((c) => c === "heart").length === 3) {
      setFinished(true);
    }
  };

  // ⏱ Auto-move to next after message is shown
  useEffect(() => {
    if (finished && onNext) {
      const timer = setTimeout(() => {
        onNext();
      }, 2500); // auto-transition after 2.5 seconds
      return () => clearTimeout(timer);
    }
  }, [finished, onNext]);

  return (
    <div className="min-h-screen flex flex-col justify-between items-center bg-[#f6efec] p-4 sm:p-6 relative overflow-hidden">
      {/* --- HEADER --- */}
      <motion.h1
        className="text-[clamp(2.2rem, 6vw, 4rem)] text-[#d84b5a] font-semibold text-center mt-6 sm:mt-10 mb-4 sm:mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Fill the heart to continue
      </motion.h1>

      {/* --- GAME BOARD --- */}
      <motion.div
        className="bg-[#f7efe9] w-full max-w-[700px] flex flex-col items-center justify-center py-6 sm:py-10 rounded-2xl shadow-lg border border-[#e6dfda] relative"
        style={{ fontFamily: "'Playfair Display', serif" }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="grid grid-cols-3 gap-3 sm:gap-4 px-4 sm:px-6">
          {cells.map((cell, i) => (
            <motion.div
              key={i}
              whileTap={{ scale: 0.85 }}
              onClick={() => handleClick(i)}
              className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 border-2 border-[#d84b5a] flex items-center justify-center text-[clamp(1.8rem,4vw,3rem)] cursor-pointer select-none bg-[#fffaf8] rounded-lg"
            >
              {cell === "heart" && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="text-[#d84b5a]"
                >
                  ❤️
                </motion.div>
              )}
              {cell === "x" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-[#d84b5a]"
                >
                  ✖
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* --- WIN OVERLAY --- */}
        {finished && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center p-6 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {/* Glowing heart animation */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [1, 1.2, 1], opacity: [1, 0.8, 1] }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut",
              }}
              className="absolute w-36 h-36 rounded-full bg-[#f7c2cf] blur-3xl opacity-40"
            ></motion.div>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 150 }}
              className="relative text-[clamp(1.8rem, 6vw, 4rem)] text-[#d84b5a] font-semibold text-center px-4"
            >
              ❤️ You won my heart ❤️
            </motion.div>
          </motion.div>
        )}
      </motion.div>

      {/* --- BUTTONS --- */}
      <div className="flex justify-between items-center w-full max-w-[700px] mt-6 mb-6 px-4 relative z-10">
        {onBack && (
          <motion.button
            onClick={onBack}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-gray-700 bg-[#9EC1E6] px-6 py-2.5 rounded-full text-sm sm:text-base shadow-sm hover:bg-[#7fa8ce] transition-all"
            style={{ fontFamily: "Montserrat, system-ui, sans-serif" }}
          >
            ← Back
          </motion.button>
        )}

        {onNext && (
          <motion.button
            onClick={onNext}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-gray-700 bg-[#F7D9E6] px-6 py-2.5 rounded-full text-sm sm:text-base shadow-sm hover:bg-[#F7B5CF] transition-all"
            style={{ fontFamily: "Montserrat, system-ui, sans-serif" }}
          >
            Next →
          </motion.button>
        )}
      </div>
    </div>
  );
}
