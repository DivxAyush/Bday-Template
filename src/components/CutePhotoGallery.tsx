import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CupidBowIcon = () => (
  <motion.svg
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="drop-shadow-sm"
    animate={{ rotate: [0, -8, 8, 0] }}
    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
  >
    <path d="M13 2.1c4.6 3.4 5.9 10.2 3.1 14.8-2.1 3.4-6.2 5.1-10.2 4.3-.4-2.4.4-4.8 2.2-6.5C10 13 11.4 12.1 13 11.1" />
    <path d="M13 11.1c-3.1-2.9-4.3-7.5-2.2-10.8" />
    <path d="m14.5 12.5 6 6" />
    <path d="m18 16 2.5 2.5" />
  </motion.svg>
);

const HeartArrowIcon = () => (
  <motion.svg
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="currentColor"
    animate={{ scale: [1, 1.1, 1] }}
    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
  >
    <path d="M12.003 21.352c-.347-.19-8.32-4.88-8.32-11.446 0-3.08 2.498-5.578 5.578-5.578 1.83 0 3.538.88 4.618 2.26a4.954 4.954 0 0 1 4.618-2.26c3.08 0 5.578 2.498 5.578 5.578 0 6.565-7.972 11.255-8.32 11.446a.998.998 0 0 1-1.092 0z" />
  </motion.svg>
);

type Props = {
  title?: string;
  photos: string[];
  captions?: string[];
  onBack?: () => void;
  onNext?: () => void;
};

export default function CutePhotoGallery({
  title = "Special Photo Cards",
  photos,
  captions,
  onBack,
  onNext,
}: Props) {
  const [index, setIndex] = useState(0);
  const nextPhoto = () => setIndex((prev) => (prev + 1) % photos.length);
  const prevPhoto = () => setIndex((prev) => (prev - 1 + photos.length) % photos.length);

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center bg-[#FBF5F4] p-2 sm:p-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_#fff8f8_0%,_#fce4ec_100%)] opacity-90 pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/paper-texture.png')] opacity-10 mix-blend-multiply pointer-events-none" />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-[720px] rounded-2xl border-[2px] border-[#e7d8d2] bg-white/80 shadow-2xl flex flex-col overflow-hidden backdrop-blur-sm"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        {/* Header */}
        <div className="px-8 sm:px-10 pt-6 text-[#2c2c2c]">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[clamp(1.8rem,6vw,3.2rem)] leading-none text-[#d84b5a] font-semibold text-center"
          >
            {title}
          </motion.h1>
          <div className="mt-3 border-t-2 border-b-2 border-[#222]/20"></div>
          <div
            className="flex justify-between mt-2 text-xs sm:text-sm text-[#444]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            <span><span className="font-bold">FROM:</span> Me</span>
            <span><span className="font-bold">TO:</span> My Rasmalai</span>
          </div>
        </div>

        {/* Gallery Frame */}
        <div className="mx-6 sm:mx-8 my-4 border-[2px] border-[#2c2c2c]/30 rounded-xl bg-[#faf4f3] flex-1 relative overflow-hidden flex flex-col items-center justify-center p-3">
          <div className="relative w-full aspect-[4/3] flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={index}
                src={photos[index]}
                alt={`Photo ${index + 1}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full object-cover rounded-xl shadow-xl ring-1 ring-[#d84b5a]/30"
              />
            </AnimatePresence>
          </div>

          {/* Caption */}
          <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center px-4">
            <AnimatePresence mode="wait">
              {captions && captions[index] && (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="text-[clamp(1rem,2vw,1.3rem)] text-[#d84b5a] italic drop-shadow-sm"
                  style={{ fontFamily: "'Dancing Script', cursive" }}
                >
                  {captions[index]}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Decorative icons */}
          <div className="absolute left-3 top-3 text-[#e74c5b] opacity-30">
            <CupidBowIcon />
          </div>
          <div className="absolute right-3 bottom-3 text-[#e74c5b] opacity-50">
            <HeartArrowIcon />
          </div>

          {/* Navigation */}
          <button
            onClick={prevPhoto}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-[#fff5f4]/70 border border-[#d84b5a]/50 rounded-full w-9 h-9 flex items-center justify-center text-lg text-[#d84b5a] hover:bg-[#d84b5a] hover:text-white transition-all duration-300 shadow-sm backdrop-blur-md"
          >
            ‹
          </button>
          <button
            onClick={nextPhoto}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#fff5f4]/70 border border-[#d84b5a]/50 rounded-full w-9 h-9 flex items-center justify-center text-lg text-[#d84b5a] hover:bg-[#d84b5a] hover:text-white transition-all duration-300 shadow-sm backdrop-blur-md"
          >
            ›
          </button>
        </div>

        {/* Footer */}
        <div className="px-8 sm:px-10 pb-6 pt-3 border-t-[1.5px] border-[#2c2c2c]/20 text-[#2c2c2c]">
          <div className="flex justify-between items-end">
            <div className="text-xs sm:text-sm" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              <div><span className="font-bold">DATE:</span> Now</div>
              <div><span className="font-bold">VALID FOR:</span> Forever</div>
            </div>
            <div className="text-right">
              <span
                className="block text-base sm:text-lg text-[#d84b5a]"
                style={{ fontFamily: "'Dancing Script', cursive" }}
              >
                with love,Pragati Ji 💌
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Back / Next Buttons */}
      {onBack && (
        <motion.button
          onClick={onBack}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="absolute bottom-3 left-3 sm:bottom-6 sm:left-6 text-gray-700 bg-[#9EC1E6] px-5 py-2 rounded-full text-sm shadow-md hover:bg-[#7fa8ce] transition-all z-20"
          style={{ fontFamily: "Montserrat, system-ui, sans-serif" }}
        >
          ← Back
        </motion.button>
      )}
      {onNext && (
        <motion.button
          onClick={onNext}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="absolute bottom-3 right-3 sm:bottom-6 sm:right-6 text-gray-700 bg-[#F7D9E6] px-5 py-2 rounded-full text-sm shadow-md hover:bg-[#F7B5CF] transition-all z-20"
          style={{ fontFamily: "Montserrat, system-ui, sans-serif" }}
        >
          Next →
        </motion.button>
      )}
    </div>
  );
}
