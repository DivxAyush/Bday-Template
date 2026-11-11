import React from "react";
import { motion } from "framer-motion";
import coverImg from "../images/intro.gif";
import StampSvg from "../svg/StampSVG";
import { textConfig } from "../textConfig";
import { sounds } from "../utils/soundEffects";

type Props = {
  onNext?: () => void;
};

export default function MagazineCover({ onNext }: Props) {
  const cfg = textConfig.cover;

  const fadeUp = {
    hidden: { opacity: 0, y: 15 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay, duration: 0.6, ease: "easeOut" },
    }),
  };

  const handleNext = () => {
    sounds.playPop();
    if (onNext) onNext();
  };

  return (
    <div className="w-full h-full max-h-[100dvh] flex flex-col justify-between items-center px-3 sm:px-6 py-2 sm:py-3 pb-3 sm:pb-3 relative overflow-hidden select-none">
      {/* Subtle radial glow over grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.7)_0%,_rgba(251,245,244,0.3)_60%,_rgba(245,225,225,0.7)_100%)] pointer-events-none" />

      {/* Decorative Editorial Grid Marks */}
      <div className="absolute top-2 left-3 text-[10px] text-[#b89592] font-mono tracking-widest hidden sm:block pointer-events-none">
        + SEC.01 // BDAY.ARCHIVE
      </div>
      <div className="absolute bottom-2 left-3 text-[10px] text-[#b89592] font-mono tracking-widest hidden sm:block pointer-events-none">
        + COORD.2026
      </div>
      <div className="absolute bottom-2 right-3 text-[10px] text-[#b89592] font-mono tracking-widest hidden sm:block pointer-events-none">
        + SPEC.ISSUE.VOL.01
      </div>

      {/* Ambient Sparkles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { top: "10%", left: "6%", delay: 0 },
          { top: "18%", right: "8%", delay: 1.2 },
          { bottom: "20%", left: "7%", delay: 0.7 },
          { bottom: "16%", right: "6%", delay: 1.8 },
        ].map((star, i) => (
          <motion.div
            key={i}
            className="absolute text-sm text-[#f08a9d] select-none opacity-40"
            style={{ top: star.top, left: star.left, right: star.right, bottom: star.bottom }}
            animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 3.5, delay: star.delay, repeat: Infinity, ease: "easeInOut" }}
          >
            ✦
          </motion.div>
        ))}
      </div>

      {/* --- TOP ISSUE BANNER --- */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0.05}
        className="relative z-10 w-full max-w-3xl flex justify-between items-center text-[10px] sm:text-xs tracking-wider text-[#8e7571] uppercase font-semibold border-b border-[#e2cac6] pb-1 pt-0.5 px-1 whitespace-nowrap gap-2"
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        <span className="whitespace-nowrap font-medium">{cfg.issueTag}</span>
        <span className="text-[#d84b5a] font-bold whitespace-nowrap shrink-0">★ SPECIAL DAY ★</span>
      </motion.div>

      {/* --- MAIN EDITORIAL MAGAZINE SPREAD --- */}
      <div className="flex-1 w-full max-w-4xl flex items-center justify-center my-auto py-1 z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full bg-white/85 rounded-3xl border border-[#ecd5d1] shadow-2xl p-4 sm:p-6 md:p-7 backdrop-blur-md relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8"
        >
          {/* Subtle Corner Washi Tape */}
          <div className="absolute -top-3 left-10 w-20 h-6 bg-[#ffd6df]/80 border-t border-b border-[#f3bac6] -rotate-3 z-20 pointer-events-none hidden sm:block shadow-xs" />

          {/* LEFT COLUMN: Typography & Content */}
          <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left justify-center space-y-1.5 sm:space-y-2">
            {/* Superheader / Recipient */}
            <div className="flex flex-col items-center md:items-start">
              <span
                className="tracking-[0.25em] text-[#8e7571] uppercase font-semibold text-[10px] sm:text-xs"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {cfg.superHeader}
              </span>
              <h2
                className="text-[#d84b5a] uppercase font-black tracking-wider text-base sm:text-xl leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {cfg.nameHighlight}
              </h2>
            </div>

            {/* Main Headline: HAPPY BIRTHDAY */}
            <div className="relative my-0.5">
              <div className="relative inline-block">
                <h1
                  className="text-[#f28ba2] italic font-semibold drop-shadow-xs"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
                    lineHeight: "0.95",
                  }}
                >
                  {cfg.titleLine1}
                </h1>
                <span
                  className="absolute -top-2.5 left-1/2 -translate-x-1/2 md:left-auto md:right-0 md:translate-x-4 bg-[#ffe4ec] border border-[#f5b8c9] px-2 py-0.5 rounded-full text-[9px] font-bold tracking-widest text-[#a8334a] uppercase shadow-xs whitespace-nowrap"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  🎉 {cfg.badgeText} 🎉
                </span>
              </div>

              <h2
                className="text-[#2b2424] uppercase font-black tracking-tight"
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "clamp(1.9rem, 4.5vw, 3.4rem)",
                  lineHeight: "0.95",
                }}
              >
                {cfg.titleLine2}
              </h2>
            </div>

            {/* Editorial Blurb */}
            <p
              className="text-xs sm:text-sm text-[#5c4946] leading-relaxed max-w-sm"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {cfg.blurb}
            </p>

            {/* Badges / Stickers */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-1.5 pt-1">
              {cfg.stickers.map((sticker, idx) => (
                <span
                  key={idx}
                  className="bg-[#fff3f5] border border-[#f5c6cf] text-[#8a3848] text-[9px] sm:text-[10px] font-semibold px-2.5 py-0.5 rounded-full shadow-xs"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {sticker}
                </span>
              ))}
            </div>

            {/* Action Button (Desktop) */}
            {onNext && (
              <div className="pt-2 hidden md:block">
                <motion.button
                  onClick={handleNext}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-white bg-gradient-to-r from-[#e76077] to-[#d84b5a] hover:from-[#d84b5a] hover:to-[#c43847] px-6 py-2 rounded-full text-xs sm:text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  <span>{cfg.nextButton}</span>
                </motion.button>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Visual Centerpiece & Editorial Details */}
          <div className="flex flex-col items-center justify-center relative w-full md:w-auto my-1 md:my-0">
            {/* Photo Card with Polaroid Border */}
            <div className="relative bg-white p-2 rounded-2xl shadow-md border border-[#edd7d3] flex flex-col items-center">
              {/* Corner Stamp */}
              <div className="absolute -top-3 -right-3 pointer-events-none hidden sm:block">
                <StampSvg size={60} topText="SPECIAL" bottomText="EDITION" color="#d84b5a" />
              </div>

              {/* Image Frame */}
              <div className="w-24 h-24 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-xl overflow-hidden bg-[#fff5f6] border border-[#f5d0d8] flex items-center justify-center">
                <img
                  src={coverImg}
                  alt="Birthday celebration"
                  className="w-full h-full object-contain select-none"
                />
              </div>

              {/* Decorative Barcode Strip (Desktop only to save vertical space on mobile) */}
              <div className="w-full pt-1.5 hidden sm:flex flex-col items-center border-t border-[#f0deda] mt-1.5">
                <div className="flex items-center gap-0.5 h-3.5 opacity-75">
                  {[2, 1, 3, 1, 2, 4, 1, 3, 2, 1, 3, 1, 2, 4, 1, 2, 3, 1, 2].map((w, i) => (
                    <span
                      key={i}
                      className="bg-[#2c2423] inline-block h-full"
                      style={{ width: `${w}px` }}
                    />
                  ))}
                </div>
                <span className="text-[7.5px] font-mono tracking-widest text-[#7a6460] mt-0.5">
                  NO. 2026-BDAY-SPECIAL
                </span>
              </div>
            </div>
          </div>

          {/* Action Button (Mobile only) */}
          {onNext && (
            <div className="pt-1 md:hidden w-full flex justify-center">
              <motion.button
                onClick={handleNext}
                whileTap={{ scale: 0.95 }}
                className="text-white bg-gradient-to-r from-[#e76077] to-[#d84b5a] px-6 py-1.5 rounded-full text-xs font-semibold shadow-md transition-all duration-200"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                <span>{cfg.nextButton}</span>
              </motion.button>
            </div>
          )}
        </motion.div>
      </div>

      {/* Bottom Subtle Bar */}
      <div className="relative z-10 w-full max-w-3xl flex justify-between items-center text-[9px] text-[#9c827e] font-mono pt-0.5">
        <span>EDITION: LIMITED 2026</span>
        <span>DESIGNED WITH LOVE & SMILES</span>
      </div>
    </div>
  );
}
