import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { textConfig } from "../textConfig";
import { sounds } from "../utils/soundEffects";

type Props = {
  onBack?: () => void;
  onNext?: () => void;
};

const SEGMENT_COLORS = [
  "#ffd6df", // Rose blush
  "#ffe8b3", // Champagne gold
  "#d4f0f0", // Aqua pastel
  "#e8dff5", // Soft lilac
  "#d6eed8", // Mint green
  "#fed5be", // Warm peach
];

export default function BirthdayFortuneWheel({ onBack, onNext }: Props) {
  const cfg = textConfig.wheel;
  const newAge = textConfig.countdown.newAge || "23";
  const fortunes = cfg.fortunes || [];
  const numSegments = fortunes.length || 6;
  const segmentAngle = 360 / numSegments;

  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [hasSpun, setHasSpun] = useState(false);
  const [selectedFortune, setSelectedFortune] = useState<typeof fortunes[0] | null>(null);

  const spinWheel = () => {
    // Single-spin rule: cannot spin if already spinning or already spun once
    if (isSpinning || hasSpun) return;

    sounds.playPop();
    setIsSpinning(true);
    setSelectedFortune(null);

    const targetIndex = Math.floor(Math.random() * numSegments);
    const segmentCenter = targetIndex * segmentAngle + segmentAngle / 2;
    const targetAngle = (270 - segmentCenter + 360) % 360;
    const extraSpins = 360 * (5 + Math.floor(Math.random() * 3));
    
    const currentModulo = rotation % 360;
    const distanceToTarget = (targetAngle - currentModulo + 360) % 360;
    const finalRotation = rotation + extraSpins + distanceToTarget;

    setRotation(finalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      setHasSpun(true);
      const won = fortunes[targetIndex];
      setSelectedFortune(won);

      sounds.playFanfare();
      confetti({
        particleCount: 65,
        spread: 70,
        origin: { y: 0.55 },
        colors: ["#ffd166", "#ff4d6d", "#06d6a0", "#118ab2", "#f72585"],
      });
    }, 3600);
  };

  return (
    <div className="w-full h-full max-h-[100dvh] flex flex-col justify-between items-center px-3 sm:px-6 py-1.5 sm:py-3 relative overflow-hidden select-none">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.7)_0%,_rgba(251,245,244,0.3)_60%,_rgba(245,225,225,0.7)_100%)] pointer-events-none" />

      {/* Top Banner (Leaves space for sound toggle on right) */}
      <div className="w-full max-w-3xl flex justify-between items-center text-[10px] sm:text-xs tracking-wider text-[#8e7571] uppercase font-semibold relative z-10 px-1 whitespace-nowrap border-b border-[#e2cac6] pb-1 pr-14 sm:pr-1">
        <span className="truncate">{cfg.tagline || `CHAPTER ${newAge} DESTINY PROTOCOL`}</span>
        <span className="text-[#d84b5a] font-bold shrink-0">
          <span className="hidden sm:inline">★ 1 OFFICIAL PROPHECY ONLY ★</span>
          <span className="sm:hidden">★ 1 SPIN ONLY ★</span>
        </span>
      </div>

      {/* --- RESPONSIVE MAIN DECK --- */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="relative w-full max-w-3xl bg-white/85 rounded-3xl shadow-xl border border-[#ecd5d1] p-2.5 sm:p-4 md:p-5 backdrop-blur-md my-auto z-10 flex flex-col md:flex-row items-center justify-between gap-2 md:gap-7 max-h-[80dvh] overflow-hidden"
      >
        {/* WHEEL SECTION */}
        <div className="flex flex-col items-center justify-center relative shrink-0">
          {/* Pointer Arrow at top */}
          <div className="relative z-30 -mb-2 sm:-mb-3 flex flex-col items-center">
            <div className="w-0 h-0 border-l-[7px] sm:border-l-[10px] border-l-transparent border-r-[7px] sm:border-r-[10px] border-r-transparent border-t-[12px] sm:border-t-[18px] border-t-[#d84b5a] filter drop-shadow-sm" />
          </div>

          {/* Wheel Frame */}
          <div className="relative p-1 sm:p-1.5 rounded-full bg-gradient-to-tr from-[#eedad7] via-white to-[#eedad7] shadow-lg border border-[#e0c4bf]">
            {/* Wheel Canvas (130px on mobile, 240px on desktop) */}
            <div className="w-[130px] h-[130px] sm:w-[190px] sm:h-[190px] md:w-[240px] md:h-[240px] rounded-full overflow-hidden relative shadow-inner border-2 border-white">
              <div
                className="w-full h-full rounded-full transition-transform"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  transitionDuration: isSpinning ? "3.5s" : "0s",
                  transitionTimingFunction: "cubic-bezier(0.12, 0.88, 0.2, 1)",
                }}
              >
                <svg viewBox="0 0 300 300" className="w-full h-full">
                  {fortunes.map((f, i) => {
                    const startAngle = (i * segmentAngle * Math.PI) / 180;
                    const endAngle = (((i + 1) * segmentAngle) * Math.PI) / 180;
                    const x1 = 150 + 150 * Math.cos(startAngle);
                    const y1 = 150 + 150 * Math.sin(startAngle);
                    const x2 = 150 + 150 * Math.cos(endAngle);
                    const y2 = 150 + 150 * Math.sin(endAngle);
                    const pathData = `M 150 150 L ${x1} ${y1} A 150 150 0 0 1 ${x2} ${y2} Z`;
                    const midAngle = i * segmentAngle + segmentAngle / 2;

                    return (
                      <g key={f.id}>
                        <path
                          d={pathData}
                          fill={SEGMENT_COLORS[i % SEGMENT_COLORS.length]}
                          stroke="#ffffff"
                          strokeWidth="2"
                        />
                        <g transform={`rotate(${midAngle}, 150, 150)`}>
                          <text
                            x="220"
                            y="153"
                            textAnchor="middle"
                            dominantBaseline="central"
                            fontSize="12"
                            fontWeight="bold"
                            fill="#4a3937"
                            style={{ fontFamily: "'Montserrat', sans-serif" }}
                          >
                            {f.icon} {f.label.split(" ")[0]}
                          </text>
                        </g>
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Center Button (SPIN vs SEALED) */}
              <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                <motion.button
                  whileHover={{ scale: isSpinning || hasSpun ? 1 : 1.08 }}
                  whileTap={{ scale: isSpinning || hasSpun ? 1 : 0.92 }}
                  onClick={spinWheel}
                  disabled={isSpinning || hasSpun}
                  className={`pointer-events-auto w-9 h-9 sm:w-11 sm:h-11 md:w-14 md:h-14 rounded-full shadow-md border-2 border-white flex flex-col items-center justify-center transition-all ${
                    hasSpun
                      ? "bg-gradient-to-r from-[#ffd166] to-[#f4a261] text-[#4a3900] cursor-not-allowed shadow-inner"
                      : isSpinning
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-[#e76077] to-[#d84b5a] text-white cursor-pointer hover:shadow-lg animate-pulse"
                  }`}
                >
                  <span className="text-[7.5px] sm:text-[9.5px] font-black uppercase tracking-wider text-center px-0.5 leading-tight">
                    {hasSpun ? "LOCKED 🔒" : isSpinning ? "..." : "SPIN 🎯"}
                  </span>
                </motion.button>
              </div>
            </div>
          </div>

          {/* Under-wheel dynamic guidance */}
          <span className="text-[8px] sm:text-[9.5px] font-semibold mt-0.5 text-center px-1">
            {hasSpun ? (
              <span className="text-[#0f8b5f] font-bold">
                🔒 Prophecy Sealed for Age {newAge}! ✨
              </span>
            ) : isSpinning ? (
              <span className="text-[#8e7571] animate-pulse">
                ✨ Consulting the cosmos for Chapter {newAge}...
              </span>
            ) : (
              <span className="text-[#d84b5a] font-bold">
                ⚠️ Single Turn: Revealing your Year 2026 Destiny!
              </span>
            )}
          </span>
        </div>

        {/* DETAILS & REVEAL SECTION */}
        <div className="flex-1 w-full flex flex-col items-center md:items-start text-center md:text-left justify-center">
          {/* Header */}
          <div className="hidden md:block mb-2">
            <span
              className="text-[10px] uppercase tracking-widest text-[#d84b5a] font-bold"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              ✦ OFFICIAL DESTINY PREDICTION ✦
            </span>
            <h1
              className="text-xl sm:text-2xl text-[#3d2d2a] font-black tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {cfg.title}
            </h1>
            <p className="text-xs text-[#7a6460] mt-0.5">
              {cfg.subtitle}
            </p>
          </div>

          {/* Reveal Card / Prophecy Certificate */}
          <div className="w-full max-w-sm bg-[#fff8fa] border-2 border-[#f5b8c9] rounded-2xl p-2.5 sm:p-3 shadow-md flex flex-col justify-center min-h-[75px] sm:min-h-[95px] relative overflow-hidden">
            <AnimatePresence mode="wait">
              {selectedFortune ? (
                <motion.div
                  key={selectedFortune.id}
                  initial={{ opacity: 0, scale: 0.95, y: 5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center md:items-start"
                >
                  <div className="flex items-center gap-1.5 mb-1 flex-wrap justify-center md:justify-start">
                    <span className="text-xl sm:text-2xl">{selectedFortune.icon}</span>
                    <span
                      className="text-sm sm:text-base font-black text-[#d84b5a]"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {selectedFortune.label}
                    </span>
                    <span className="text-[8px] sm:text-[9px] bg-gradient-to-r from-[#ffd166] to-[#f4a261] text-[#4a3900] px-2 py-0.5 rounded-full font-black shadow-xs">
                      LOCKED IN FOR {textConfig.details.birthdayYear} 🔒
                    </span>
                  </div>

                  <p
                    className="text-[11px] sm:text-xs text-[#4a3937] leading-relaxed italic font-medium"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    "{selectedFortune.text}"
                  </p>

                  <div className="mt-1 pt-1 border-t border-[#fbd4de] w-full flex items-center justify-between text-[8px] sm:text-[9px] text-[#8e7571] font-mono">
                    <span>STATUS: OFFICIAL 2026 PROPHECY</span>
                    <span className="text-[#0f8b5f] font-bold">100% UNLOCKED ✨</span>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center text-center py-1"
                >
                  <span className="text-[9px] uppercase tracking-widest text-[#d84b5a] font-bold mb-0.5">
                    ✦ ONE CHANCE ONLY ✦
                  </span>
                  <p className="text-[11px] sm:text-xs text-[#5c4946] font-medium leading-snug">
                    Tap the center <span className="font-bold text-[#d84b5a]">SPIN</span> button to reveal what the universe has planned for your newly unlocked <span className="font-bold text-[#d84b5a]">Chapter {newAge}</span>!
                  </p>
                  <span className="text-[9px] text-[#8e7571] italic mt-1">
                    *The wheel will lock immediately after one spin. Trust your fate! 🌟
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Prophecy Verification Tag */}
          <div className="w-full max-w-sm mt-1.5 flex items-center justify-center md:justify-start">
            {hasSpun ? (
              <span className="text-[9px] font-bold px-2.5 py-0.5 rounded-full bg-[#e8f7f0] border border-[#b4e5cc] text-[#0f8b5f] flex items-center gap-1">
                <span>✔</span>
                <span>Cosmic turn complete • Carry this energy for Age {newAge}!</span>
              </span>
            ) : (
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-1">
                <span className="text-[9px] text-[#8e7571] font-semibold">6 Possible Destinies:</span>
                {fortunes.slice(0, 4).map((f) => (
                  <span
                    key={f.id}
                    className="text-[8.5px] px-1.5 py-0.2 rounded-full bg-white/70 border border-[#ecd5d1] text-[#7a6460]"
                  >
                    {f.icon} {f.label.split(" ")[0]}
                  </span>
                ))}
                <span className="text-[8.5px] text-[#8e7571]">+more</span>
              </div>
            )}
          </div>
        </div>
      </motion.div>

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
            {cfg.nextButton || "Next →"}
          </motion.button>
        )}
      </div>
    </div>
  );
}
