import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { textConfig } from "../textConfig";
import { sounds } from "../utils/soundEffects";

type Props = {
  onBack?: () => void;
  onNext?: () => void;
};

type Phase = "countdown" | "midnight" | "age_upgrade" | "party_popup";

export default function BirthdayCountdown({ onBack, onNext }: Props) {
  const cfg = textConfig.countdown;
  const [phase, setPhase] = useState<Phase>("countdown");
  const [count, setCount] = useState(5);
  const [clockTime, setClockTime] = useState("11:59:58 PM");
  const [isAgeFlipped, setIsAgeFlipped] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Trigger celebration confetti cannon
  const firePartyConfetti = () => {
    sounds.playFanfare();

    // Side cannons + center burst
    confetti({
      particleCount: 60,
      angle: 60,
      spread: 65,
      origin: { x: 0, y: 0.65 },
      colors: ["#ff4d6d", "#ffd166", "#06d6a0", "#118ab2", "#f72585"],
    });

    confetti({
      particleCount: 60,
      angle: 120,
      spread: 65,
      origin: { x: 1, y: 0.65 },
      colors: ["#ff4d6d", "#ffd166", "#06d6a0", "#118ab2", "#f72585"],
    });

    setTimeout(() => {
      confetti({
        particleCount: 90,
        spread: 90,
        origin: { x: 0.5, y: 0.5 },
        colors: ["#ffd700", "#ff69b4", "#ff1493", "#00ffff", "#ff4500"],
      });
    }, 350);
  };

  // Reset and restart the sequence
  const startSequence = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setPhase("countdown");
    setCount(5);
    setClockTime("11:59:58 PM");
    setIsAgeFlipped(false);
  };

  // Countdown timer loop
  useEffect(() => {
    if (phase === "countdown") {
      sounds.playTick();

      if (count > 1) {
        timerRef.current = setTimeout(() => {
          setCount((prev) => prev - 1);
        }, 1000);
      } else {
        // Count reached 1 -> transition to Midnight Clock
        timerRef.current = setTimeout(() => {
          setPhase("midnight");
        }, 1000);
      }
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [phase, count]);

  // Midnight Clock sequence
  useEffect(() => {
    if (phase === "midnight") {
      // Step 1: 11:59:58 PM -> 11:59:59 PM
      timerRef.current = setTimeout(() => {
        sounds.playTick();
        setClockTime("11:59:59 PM");

        // Step 2: 11:59:59 PM -> 12:00:00 AM (MIDNIGHT!)
        timerRef.current = setTimeout(() => {
          sounds.playMidnightBell();
          setClockTime("12:00:00 AM");

          // Step 3: Transition to Age Upgrade after clock chime
          timerRef.current = setTimeout(() => {
            setPhase("age_upgrade");
          }, 1800);
        }, 1100);
      }, 900);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [phase]);

  // Age Upgrade sequence (22 -> 23)
  useEffect(() => {
    if (phase === "age_upgrade") {
      sounds.playPop();

      // Trigger the flip / conversion from prevAge to newAge
      timerRef.current = setTimeout(() => {
        setIsAgeFlipped(true);
        sounds.playFanfare();

        // Trigger confetti pop
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.5 },
          colors: ["#ffd700", "#ff4d6d", "#06d6a0"],
        });

        // Step 4: Full Party Popup
        timerRef.current = setTimeout(() => {
          setPhase("party_popup");
          firePartyConfetti();
        }, 1800);
      }, 1200);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [phase]);

  // Skip straight to party popup if user clicks skip
  const handleSkip = () => {
    sounds.playPop();
    if (timerRef.current) clearTimeout(timerRef.current);
    setPhase("party_popup");
    firePartyConfetti();
  };

  const countdownHints: Record<number, string> = {
    5: "Gathering all the happiness in the universe... 💫",
    4: "Calibrating unlimited smiles & hugs... 🌸",
    3: "Charging up 1000% birthday aura... ⚡",
    2: `Saying farewell to Chapter ${cfg.prevAge}... ⏳`,
    1: "Hold your breath! Midnight is here! 🚀",
  };

  return (
    <div className="w-full h-full max-h-[100dvh] flex flex-col justify-between items-center px-3 sm:px-6 py-2 sm:py-3 relative overflow-hidden select-none">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.7)_0%,_rgba(251,245,244,0.3)_60%,_rgba(245,225,225,0.7)_100%)] pointer-events-none" />

      {/* Top Banner (Leaves space for sound toggle on right) */}
      <div className="w-full max-w-xl flex justify-between items-center text-[10px] sm:text-xs tracking-wider text-[#8e7571] uppercase font-semibold relative z-10 px-1 whitespace-nowrap border-b border-[#e2cac6] pb-1 pr-14 sm:pr-1">
        <span className="truncate">{cfg.tagline}</span>
        <span className="text-[#d84b5a] font-bold shrink-0">★ {cfg.subTagline} ★</span>
      </div>

      {/* Center Animated Stage */}
      <div className="relative w-full max-w-md my-auto z-10 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {/* ======================================================== */}
          {/* STAGE 1: COUNTDOWN (5 -> 4 -> 3 -> 2 -> 1) */}
          {/* ======================================================== */}
          {phase === "countdown" && (
            <motion.div
              key="countdown-stage"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="w-full bg-white/85 rounded-3xl shadow-xl border border-[#ecd5d1] p-4 sm:p-6 backdrop-blur-md flex flex-col items-center text-center"
            >
              <div className="flex items-center gap-1.5 text-[10px] sm:text-xs uppercase tracking-widest text-[#d84b5a] font-bold mb-2">
                <span>⏱</span>
                <span>COUNTDOWN IN PROGRESS</span>
                <span>⏱</span>
              </div>

              {/* Glowing Pulse Ring & Digit */}
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center my-2">
                {/* Rotating aura ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full border-2 border-dashed border-[#f5b8c9]"
                />
                <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-[#ffe8ef] via-[#fff4f6] to-[#ffe5ea] shadow-inner" />

                {/* Animated Number */}
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={count}
                    initial={{ scale: 0.2, opacity: 0, rotate: -20 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    exit={{ scale: 1.8, opacity: 0, filter: "blur(4px)" }}
                    transition={{ type: "spring", stiffness: 350, damping: 20 }}
                    className="relative z-10 text-6xl sm:text-7xl md:text-8xl font-black text-[#d84b5a] drop-shadow-md"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {count}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Progress Dots */}
              <div className="flex items-center gap-1.5 my-2">
                {[5, 4, 3, 2, 1].map((n) => (
                  <span
                    key={n}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      count <= n
                        ? "w-5 bg-[#d84b5a]"
                        : "w-2 bg-[#ebd5d1]"
                    }`}
                  />
                ))}
              </div>

              {/* Dynamic Subtext */}
              <p className="text-xs sm:text-sm text-[#5c4946] font-medium italic mt-1 min-h-[32px] flex items-center justify-center">
                "{countdownHints[count] || "Get ready..."}"
              </p>

              {/* Skip button */}
              <button
                onClick={handleSkip}
                className="mt-3 text-[10px] text-[#9c827e] hover:text-[#d84b5a] underline underline-offset-4 tracking-wider uppercase font-semibold transition-colors"
              >
                Skip Countdown ⏩
              </button>
            </motion.div>
          )}

          {/* ======================================================== */}
          {/* STAGE 2: MIDNIGHT CLOCK STRIKE (11:59 PM -> 12:00 AM) */}
          {/* ======================================================== */}
          {phase === "midnight" && (
            <motion.div
              key="midnight-stage"
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35 }}
              className="w-full bg-white/90 rounded-3xl shadow-2xl border-2 border-[#f5b8c9] p-5 sm:p-7 backdrop-blur-md flex flex-col items-center text-center"
            >
              <div className="flex items-center gap-1.5 text-[10px] sm:text-xs uppercase tracking-widest text-[#8e7571] font-bold mb-2">
                <span>✦</span>
                <span>{cfg.clockLabel}</span>
                <span>✦</span>
              </div>

              {/* Clock Housing */}
              <div className="my-3 px-6 py-4 rounded-2xl bg-gradient-to-b from-[#2c2423] to-[#1a1413] text-[#fff] shadow-2xl border border-[#4a3b39] flex flex-col items-center">
                <span className="text-[9px] tracking-widest text-[#e8a5b0] uppercase font-mono mb-1">
                  OFFICIAL TIME
                </span>

                <motion.div
                  key={clockTime}
                  initial={{ y: 8, opacity: 0.4 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className={`text-3xl sm:text-4xl font-mono font-black tracking-widest ${
                    clockTime === "12:00:00 AM"
                      ? "text-[#ffd166] drop-shadow-[0_0_12px_rgba(255,209,102,0.8)]"
                      : "text-[#ff9ebb]"
                  }`}
                >
                  {clockTime}
                </motion.div>
              </div>

              {/* Midnight Status Message */}
              <div className="min-h-[44px] flex flex-col items-center justify-center mt-1">
                {clockTime === "12:00:00 AM" ? (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center"
                  >
                    <span className="text-base sm:text-lg font-black text-[#d84b5a] tracking-tight">
                      {cfg.midnightGreeting}
                    </span>
                    <span className="text-[11px] text-[#7a6460]">
                      The special day has officially arrived! 🌙
                    </span>
                  </motion.div>
                ) : (
                  <span className="text-xs text-[#8e7571] animate-pulse">
                    Waiting for midnight strike... 🕛
                  </span>
                )}
              </div>
            </motion.div>
          )}

          {/* ======================================================== */}
          {/* STAGE 3: AGE CONVERSION (22 -> 23) */}
          {/* ======================================================== */}
          {phase === "age_upgrade" && (
            <motion.div
              key="age-stage"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35 }}
              className="w-full bg-white/90 rounded-3xl shadow-2xl border-2 border-[#f5b8c9] p-5 sm:p-7 backdrop-blur-md flex flex-col items-center text-center"
            >
              <div className="text-[10px] sm:text-xs uppercase tracking-widest text-[#d84b5a] font-bold mb-3">
                ✦ {cfg.ageUpgradeTitle} ✦
              </div>

              {/* Age Morph Cards Deck */}
              <div className="flex items-center justify-center gap-3 sm:gap-4 my-2">
                {/* Chapter Old (e.g. 22) */}
                <motion.div
                  animate={{
                    opacity: isAgeFlipped ? 0.35 : 1,
                    scale: isAgeFlipped ? 0.85 : 1,
                  }}
                  transition={{ duration: 0.4 }}
                  className="px-4 py-3 rounded-2xl bg-[#fdf2f4] border border-[#e8c8ce] flex flex-col items-center relative"
                >
                  <span className="text-[9px] uppercase tracking-wider text-[#9e7a75] font-semibold">
                    CHAPTER {cfg.prevAge}
                  </span>
                  <span className="text-3xl sm:text-4xl font-black text-[#6e5855]">
                    {cfg.prevAge}
                  </span>
                  {isAgeFlipped && (
                    <span className="absolute -top-1.5 -right-1.5 text-[9px] bg-[#06d6a0] text-white px-1.5 py-0.2 rounded-full font-bold">
                      DONE ✔
                    </span>
                  )}
                </motion.div>

                {/* Arrow / Spark Indicator */}
                <motion.div
                  animate={{ scale: [1, 1.25, 1], rotate: isAgeFlipped ? 360 : 0 }}
                  transition={{ duration: 0.8, repeat: isAgeFlipped ? 0 : Infinity }}
                  className="text-xl sm:text-2xl text-[#d84b5a]"
                >
                  ➔
                </motion.div>

                {/* Chapter New (e.g. 23) */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0.5 }}
                  animate={{
                    scale: isAgeFlipped ? 1.12 : 0.85,
                    opacity: isAgeFlipped ? 1 : 0.4,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className={`px-5 py-3.5 rounded-2xl flex flex-col items-center relative shadow-lg ${
                    isAgeFlipped
                      ? "bg-gradient-to-tr from-[#ffe8ef] via-[#fff0f4] to-[#ffe5ed] border-2 border-[#d84b5a] shadow-[#f5b8c9]/50"
                      : "bg-gray-100 border border-gray-200"
                  }`}
                >
                  <span className="text-[9px] uppercase tracking-wider text-[#d84b5a] font-bold">
                    CHAPTER {cfg.newAge}
                  </span>
                  <span className="text-4xl sm:text-5xl font-black text-[#d84b5a] drop-shadow-sm">
                    {cfg.newAge}
                  </span>
                  {isAgeFlipped && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2.5 -right-2 text-[9px] bg-gradient-to-r from-[#ffd166] to-[#ffb703] text-[#4a3900] px-2 py-0.5 rounded-full font-black shadow-xs"
                    >
                      UNLOCKED 👑
                    </motion.span>
                  )}
                </motion.div>
              </div>

              {/* Status Message */}
              <div className="mt-2 min-h-[36px] flex items-center justify-center">
                {isAgeFlipped ? (
                  <motion.p
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs sm:text-sm font-bold text-[#d84b5a]"
                  >
                    ✨ {cfg.unlockedBadge} ✨
                  </motion.p>
                ) : (
                  <p className="text-xs text-[#7a6460]">
                    Converting age data to Chapter {cfg.newAge}...
                  </p>
                )}
              </div>
            </motion.div>
          )}

          {/* ======================================================== */}
          {/* STAGE 4: FULL PARTY POPUP CELEBRATION */}
          {/* ======================================================== */}
          {phase === "party_popup" && (
            <motion.div
              key="party-stage"
              initial={{ opacity: 0, scale: 0.85, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 20 }}
              className="w-full bg-white/95 rounded-3xl shadow-2xl border-2 border-[#f5b8c9] p-4 sm:p-6 backdrop-blur-lg flex flex-col items-center text-center relative overflow-hidden"
            >
              {/* Confetti corner sparks */}
              <div className="absolute top-1 left-2 text-base select-none">🎉</div>
              <div className="absolute top-1 right-2 text-base select-none">🎈</div>

              {/* Ribbon */}
              <div className="inline-block bg-gradient-to-r from-[#e76077] to-[#d84b5a] text-white text-[9px] sm:text-[10px] font-black uppercase tracking-widest px-3 py-0.5 rounded-full shadow-xs mb-2">
                ★ OFFICIAL BIRTHDAY CELEBRATION ★
              </div>

              {/* Main Headline */}
              <h2
                className="text-xl sm:text-2xl md:text-3xl font-black text-[#d84b5a] tracking-tight leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {cfg.partyTitle}
              </h2>

              <p className="text-xs sm:text-sm text-[#4a3937] font-semibold mt-0.5">
                For the one and only <span className="text-[#d84b5a] font-bold">{cfg.partyRecipient}</span> 👑
              </p>

              {/* Warm Birthday Wish Message */}
              <div className="bg-[#fff8fa] border border-[#fbd4de] rounded-2xl p-2.5 sm:p-3 my-2 text-center max-w-sm">
                <p
                  className="text-[11px] sm:text-xs text-[#5c4946] leading-relaxed italic"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  "{cfg.partyMessage}"
                </p>
              </div>

              {/* Badges / Stickers Row */}
              <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-1.5 my-1">
                {cfg.stickers.map((stk, idx) => (
                  <span
                    key={idx}
                    className="text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#ffeef2] text-[#c03d4a] border border-[#f5b8c9]"
                  >
                    {stk}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-2 mt-3">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={startSequence}
                  className="w-full sm:w-auto px-4 py-1.5 rounded-full text-xs font-semibold text-[#7a6460] bg-white border border-[#e2cdc9] hover:bg-[#faeae7] shadow-xs transition-all flex items-center justify-center gap-1"
                >
                  <span>{cfg.replayButton}</span>
                </motion.button>

                {onNext && (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      sounds.playPop();
                      onNext();
                    }}
                    className="w-full sm:w-auto px-5 py-2 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#e76077] to-[#d84b5a] hover:from-[#d84b5a] hover:to-[#c03d4a] shadow-md transition-all flex items-center justify-center whitespace-nowrap"
                  >
                    <span>{cfg.nextButton}</span>
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* --- BOTTOM CONTROLS --- */}
      <div className="flex justify-between items-center w-full max-w-xl mb-1 sm:mb-2 px-1 relative z-20">
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

        {onNext && phase !== "party_popup" && (
          <motion.button
            onClick={() => {
              sounds.playPop();
              onNext();
            }}
            whileTap={{ scale: 0.95 }}
            className="text-white bg-[#d84b5a] hover:bg-[#c03d4a] px-4 sm:px-5 py-1.5 rounded-full text-xs shadow-sm transition-all font-medium ml-auto"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Skip to Game →
          </motion.button>
        )}
      </div>
    </div>
  );
}

