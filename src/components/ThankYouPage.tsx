import React from "react";
import { motion } from "framer-motion";
import kitty from "../images/thankyou.gif"; // Replace with your Hello Kitty image

type Props = {
  onBack?: () => void;
};

export default function ThankYouPage({ onBack }: Props) {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#fdf9f8] overflow-hidden">
      {/* Floating sparkles / hearts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-[#f19ac0] opacity-30"
            initial={{
              y: "100vh",
              x: Math.random() * window.innerWidth,
            }}
            animate={{
              y: [-100, -300, -500],
              x: `calc(${Math.random() * 100}vw - 40px)`,
              opacity: [0.3, 0.6, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              delay: Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ fontSize: `${Math.random() * 18 + 14}px` }}
          >
            ✦
          </motion.div>
        ))}
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative w-full max-w-[760px] bg-white rounded-2xl shadow-xl border border-[#f1e3e0] px-6 sm:px-10 py-8 sm:py-12 flex flex-col justify-between text-center overflow-hidden backdrop-blur-sm"
        style={{
          fontFamily: "'Playfair Display', serif",
          backgroundImage:
            "linear-gradient(180deg, #fffdfc 0%, #fff7f7 100%)",
        }}
      >
        {/* Small header tag */}
        <div className="flex items-center justify-between text-xs sm:text-sm text-[#444] uppercase tracking-wider mb-4">
          <span>for my love ✦</span>
          <span className="font-semibold text-[#f19ac0]"> ✦ </span>
        </div>

        {/* Title section */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <motion.h1
            className="text-[#f19ac0] text-[clamp(2.8rem,10vw,5.5rem)] italic font-medium leading-none mb-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Thank You
          </motion.h1>

          <motion.h2
            className="text-[#2c2c2c] text-[clamp(1.5rem,5vw,2.5rem)] font-extrabold uppercase tracking-tight mb-4"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            for being mine 💞
          </motion.h2>

          <motion.p
            className="text-[#4b4b4b] text-[clamp(0.9rem,1.4vw,1.1rem)] leading-relaxed max-w-[480px]"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            I hope this little space made you smile. <br />
            You are my favorite part of every day — always. 💗
          </motion.p>
        </div>

        {/* Hello Kitty Sticker */}
        <motion.img
          src={kitty}
          alt="Hello Kitty"
          className="absolute right-2 bottom-3 sm:right-6 sm:bottom-5 w-[130px] sm:w-[190px] md:w-[230px] select-none drop-shadow-lg"
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        />

        {/* Footer line */}
        <div className="text-center text-xs sm:text-sm mt-6 text-[#2c2c2c]">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            made with 💗 and sparkles — forever yours ✨
          </motion.p>
        </div>
      </motion.div>

      {/* Back button */}
      {onBack && (
        <motion.button
          onClick={onBack}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="absolute bottom-4 left-4 text-gray-700 bg-[#f8dff0] px-6 py-2 sm:px-7 sm:py-2.5 rounded-full text-sm sm:text-base shadow-md hover:bg-[#f4c9e3] hover:shadow-lg transition-all"
          style={{ fontFamily: "Montserrat, system-ui, sans-serif" }}
        >
          ← Back
        </motion.button>
      )}
    </div>
  );
}
