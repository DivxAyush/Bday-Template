import React from "react";
import { motion } from "framer-motion";
import coverImg from "../images/intro.gif";

type Props = {
  name?: string;
  onNext?: () => void;
};

export default function MagazineCover({ name = "LOVE", onNext }: Props) {
  const fadeUp = {
    hidden: { opacity: 0, y: 25 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay, duration: 0.8, ease: "easeOut" },
    }),
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-between items-center bg-[#FBF5F4] p-4 relative overflow-hidden">
      {/* --- HEADER --- */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0.1}
        className="flex flex-col items-center text-center mt-6 sm:mt-8"
      >
        <h1
          className="tracking-[0.2em] text-gray-700 uppercase font-semibold"
          style={{
            fontFamily: "Montserrat, system-ui, sans-serif",
            fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
          }}
        >
          FOR MY
        </h1>
        <h2
          className="text-[#F7B5CF] uppercase font-black leading-none mt-[2px]"
          style={{
            fontFamily: "Playfair Display, serif",
            fontSize: "clamp(1.3rem, 3.5vw, 2.2rem)",
            letterSpacing: "0.05em",
          }}
        >
         R A S M A L A I ✦
        </h2>
      </motion.div>

      {/* --- MAIN CONTENT --- */}
      <div className="flex flex-col items-center justify-center space-y-3 sm:space-y-4 px-4 text-center flex-grow">
        {/* Title section */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.4}
          className="relative leading-none"
        >
          <h1
            className="text-[#F7B5CF] italic font-semibold"
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: "clamp(3rem, 9vw, 6rem)",
              lineHeight: "1",
            }}
          >
            I am
          </h1>

          <div className="absolute top-[40%] left-1/2 -translate-x-1/2 bg-[#F7D9E6] px-3 py-[1px] rounded-md rotate-[-8deg] shadow-sm">
            <span
              className="text-[clamp(11px,1.8vw,14px)]"
              style={{
                fontFamily: "Montserrat, system-ui, sans-serif",
                color: "#000",
              }}
            >
              really
            </span>
          </div>
        </motion.div>

        {/* "SORRY" heading */}
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.6}
          className="text-[#1f1f1f] uppercase font-extrabold"
          style={{
            fontFamily: "Montserrat, system-ui, sans-serif",
            fontSize: "clamp(2.5rem, 8vw, 5rem)",
            lineHeight: "1",
          }}
        >
          SORRY
        </motion.h2>

        {/* Description */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.8}
          className="text-[clamp(12px,1.6vw,15px)] text-gray-800 leading-relaxed max-w-[320px]"
          style={{ fontFamily: "Montserrat, system-ui, sans-serif" }}
        >
          I made this specially just for you, for moments when you're mad. Take a deep breath, read slowly, and check{" "}
          <span className="text-[#F7B5CF] font-semibold">
            what I made for you 💗
          </span>
          .
        </motion.p>

        {/* Star */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1.0}
          className="text-[#F7B5CF] text-[clamp(18px,2vw,22px)]"
        >
          ✦
        </motion.div>

        {/* Image */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1.2}
          className="w-[55%] sm:w-[35%] max-w-[220px] mt-1 sm:mt-2"
        >
          <img
            src={coverImg}
            alt="Cute illustration"
            className="w-full h-auto object-contain rounded-lg"
          />
        </motion.div>
      </div>

      {/* --- NEXT BUTTON --- */}
      {onNext && (
        <motion.button
          onClick={onNext}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="mb-6 sm:mb-8 text-gray-700 bg-[#F7D9E6] px-7 py-2.5 rounded-full text-sm sm:text-base shadow-md hover:bg-[#F7B5CF] transition-all"
          style={{
            fontFamily: "Montserrat, system-ui, sans-serif",
          }}
        >
          Next →
        </motion.button>
      )}
    </div>
  );
}
