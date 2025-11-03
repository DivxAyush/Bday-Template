import React from "react";
import { motion } from "framer-motion";
import StampSvg from "../svg/StampSVG"; // ← use your SVG component here
import LetterPNG from "../images/letter.png"

type Props = {
  onBack?: () => void;
  onNext?: () => void;
};

export default function LoveLetter({ onBack, onNext }: Props) {
  const fadeUp = {
    hidden: { opacity: 0, y: 25 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay, duration: 0.8, ease: "easeOut" },
    }),
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-between items-center bg-[#FBF5F4] p-4 sm:p-6 relative overflow-hidden">
      {/* Soft gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_#fff8f8_0%,_#fbe9e9_100%)] opacity-90 pointer-events-none" />

      {/* --- CENTERED CONTENT --- */}
      <div className="flex-grow flex items-center justify-center w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative w-full max-w-2xl bg-white/85 rounded-2xl shadow-xl border border-[#f1dede] px-6 py-10 sm:px-10 flex flex-col items-center text-center backdrop-blur-sm"
        >
          {/* Decorative pinned photo */}
          <motion.div
            initial={{ rotate: 6, opacity: 0 }}
            animate={{ rotate: 6, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="absolute top-[-30px] right-[-25px] w-[110px] sm:w-[130px] rotate-3 overflow-hidden"
          >
            <img
              src={LetterPNG}
              alt="Memory"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Stamp in corner */}
          <motion.div
            initial={{ opacity: 0, rotate: -10, scale: 0.9 }}
            animate={{ opacity: 1, rotate: -10, scale: 1 }}
            transition={{ delay: 0.8 }}
            className="absolute bottom-[-25px] left-[-25px]"
          >
            <StampSvg />
          </motion.div>

          {/* Header */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.1}
            className="mb-6"
          >
            <h1
              className="tracking-[0.2em] text-gray-700 uppercase font-semibold"
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontSize: "clamp(0.9rem, 1.5vw, 1rem)",
              }}
            >
              A LETTER
            </h1>
            <h2
              className="text-[#F7B5CF] uppercase font-black leading-none mt-[2px]"
              style={{
                fontFamily: "Playfair Display, serif",
                fontSize: "clamp(1.4rem, 2.8vw, 2rem)",
              }}
            >
              For You ✦
            </h2>
          </motion.div>

          {/* Letter content */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.3}
            className="max-w-md space-y-4"
          >
            <h3
              className="text-[#F7B5CF] italic font-semibold"
              style={{
                fontFamily: "Playfair Display, serif",
                fontSize: "clamp(1.2rem, 2vw, 1.5rem)",
              }}
            >
              My Dearest Pragati JI,
            </h3>

            <p
              className="text-gray-800 text-[clamp(13px,1.3vw,15px)] leading-relaxed"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              I’m sorry for the moments I hurt you. You mean everything to me —
              and I just want your smile back. 💗
            </p>

            <h4
              className="text-[#1f1f1f] italic font-semibold"
              style={{
                fontFamily: "Playfair Display, serif",
                fontSize: "clamp(1rem, 2vw, 1.3rem)",
              }}
            >
              With all my love — Pragati Ji💌
            </h4>
          </motion.div>
        </motion.div>
      </div>

      {/* --- BUTTONS --- */}
      <div className="flex justify-between items-center w-full max-w-2xl px-6 mb-6 z-20">
        {onBack && (
          <motion.button
            onClick={onBack}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-gray-700 bg-[#9EC1E6] px-6 py-2.5 rounded-full text-sm sm:text-base shadow-sm hover:bg-[#7fa8ce] transition-all"
            style={{ fontFamily: "Montserrat, sans-serif" }}
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
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Next →
          </motion.button>
        )}
      </div>
    </div>
  );
}
