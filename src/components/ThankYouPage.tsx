import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import kitty from "../images/thankyou.gif";
import { textConfig } from "../textConfig";
import { sounds } from "../utils/soundEffects";

type Props = {
  onBack?: () => void;
  onRestart?: () => void;
};

export default function ThankYouPage({ onBack, onRestart }: Props) {
  const cfg = textConfig.finale;
  const initialCoupons = (textConfig as unknown as { coupons: { id: number; title: string; desc: string }[] }).coupons || [];

  const [candles, setCandles] = useState<boolean[]>([true, true, true]);
  const [wished, setWished] = useState(false);
  const [showCoupons, setShowCoupons] = useState(false);
  const [claimedCoupons, setClaimedCoupons] = useState<{ [key: number]: boolean }>({});
  const [secretWish, setSecretWish] = useState("");
  const [wishSent, setWishSent] = useState(false);

  const litCount = candles.filter((c) => c).length;

  const triggerGrandConfetti = () => {
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors: ["#ff4d6d", "#ffd166", "#06d6a0", "#118ab2", "#f72585"],
    });
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors: ["#ff4d6d", "#ffd166", "#06d6a0", "#118ab2", "#f72585"],
    });

    setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.5 },
        shapes: ["circle", "star"],
        colors: ["#ffd166", "#ff758c", "#ff7eb3", "#ffffff"],
      });
    }, 200);
  };

  const blowCandle = (index: number) => {
    if (!candles[index]) return;

    sounds.playBlow();
    const updated = [...candles];
    updated[index] = false;
    setCandles(updated);

    confetti({
      particleCount: 15,
      spread: 30,
      origin: { y: 0.55 },
      colors: ["#ffd166", "#f08a9d", "#ffffff"],
    });

    if (updated.every((c) => !c)) {
      setWished(true);
      sounds.playFanfare();
      triggerGrandConfetti();
    }
  };

  const blastExtraConfetti = () => {
    sounds.playPop();
    triggerGrandConfetti();
  };

  const handleSendWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!secretWish.trim()) return;

    sounds.playChime();
    setWishSent(true);
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      shapes: ["star"],
      colors: ["#ffd166", "#ffffff", "#ff8da1"],
    });
  };

  const handleClaimCoupon = (id: number) => {
    sounds.playPop();
    setClaimedCoupons((prev) => ({ ...prev, [id]: true }));
    confetti({
      particleCount: 25,
      spread: 45,
      origin: { y: 0.6 },
      colors: ["#ff758c", "#ffd166", "#06d6a0"],
    });
  };

  return (
    <div className="w-full h-full max-h-[100dvh] flex flex-col justify-between items-center px-4 py-2 sm:py-3 relative overflow-hidden select-none">
      {/* Radiant celebratory background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.7)_0%,_rgba(251,245,244,0.3)_60%,_rgba(245,225,225,0.7)_100%)] pointer-events-none" />

      {/* Top Banner */}
      <div className="w-full max-w-3xl flex justify-between items-center text-[10px] sm:text-xs tracking-wider text-[#8e7571] uppercase font-semibold relative z-10 px-1 whitespace-nowrap border-b border-[#e2cac6] pb-1 pr-14 sm:pr-1">
        <span>{cfg.tagline}</span>
        <span className="text-[#d84b5a] font-bold">★ CELEBRATION FINALE ★</span>
      </div>

      {/* --- 2-COLUMN SPREAD CARD --- */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-3xl bg-white/85 rounded-3xl shadow-2xl border border-[#ecd5d1] p-3 sm:p-6 backdrop-blur-md my-auto z-10 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-3 md:gap-8 max-h-[82dvh]"
      >
        {/* LEFT: Interactive Cake & Candles */}
        <div className="flex flex-col items-center justify-center relative">
          <div className="relative my-1 sm:my-2 flex flex-col items-center select-none scale-[0.78] sm:scale-95 md:scale-100">
            {/* Candles Row */}
            <div className="flex justify-center gap-6 sm:gap-7 mb-0.5 z-10">
              {candles.map((isLit, idx) => (
                <div
                  key={idx}
                  onClick={() => blowCandle(idx)}
                  className="flex flex-col items-center cursor-pointer group"
                  title={isLit ? "Click to blow out candle" : "Blown out"}
                >
                  <div className="h-6 flex items-end justify-center">
                    <AnimatePresence mode="wait">
                      {isLit ? (
                        <motion.div
                          key="flame"
                          animate={{
                            scale: [1, 1.25, 1],
                            rotate: [-3, 3, -3],
                          }}
                          transition={{
                            duration: 0.7 + idx * 0.2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className="w-3.5 h-5 rounded-full bg-gradient-to-t from-[#ff4500] via-[#ffd166] to-[#fffde7] shadow-[0_0_10px_#ffd166]"
                        />
                      ) : (
                        <motion.div
                          key="smoke"
                          initial={{ opacity: 0.8, y: 0 }}
                          animate={{ opacity: 0, y: -12 }}
                          transition={{ duration: 0.8 }}
                          className="text-[10px]"
                        >
                          💨
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div
                    className="w-3 h-8 rounded-t-sm shadow-xs border border-white"
                    style={{
                      background:
                        idx === 0
                          ? "repeating-linear-gradient(45deg, #f08a9d, #f08a9d 3px, #ffffff 3px, #ffffff 6px)"
                          : idx === 1
                          ? "repeating-linear-gradient(45deg, #ffd166, #ffd166 3px, #ffffff 3px, #ffffff 6px)"
                          : "repeating-linear-gradient(45deg, #06d6a0, #06d6a0 3px, #ffffff 3px, #ffffff 6px)",
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Layered Cake Structure */}
            <div className="flex flex-col items-center">
              <div className="w-28 sm:w-32 h-6 bg-[#ffe8ed] rounded-t-xl border border-[#f3bac6] shadow-sm relative overflow-hidden flex items-center justify-around px-2">
                <div className="absolute top-0 inset-x-0 h-2 bg-[#ffd0da] rounded-b-md opacity-80" />
                <span className="text-[10px]">🍓</span>
                <span className="text-[10px]">⭐</span>
                <span className="text-[10px]">🍓</span>
              </div>

              <div className="w-36 sm:w-40 h-2 bg-[#fff] border-x border-[#f3bac6] z-10" />

              <div className="w-40 sm:w-44 h-8 bg-[#ffd9e1] rounded-b-xl border border-[#f3bac6] shadow-sm relative flex items-center justify-around px-2">
                <span className="text-[10px]">💖</span>
                <span className="text-[9px] font-bold text-[#b5344e] tracking-widest uppercase">
                  HAPPY B'DAY
                </span>
                <span className="text-[10px]">💖</span>
              </div>

              <div className="w-44 sm:w-50 h-2.5 bg-gradient-to-r from-[#eedad7] via-[#fff] to-[#eedad7] rounded-full shadow-xs mt-0.5 border border-[#dfc3bf]" />
            </div>
          </div>

          <span className="text-[10px] text-[#8e7571] font-semibold mt-1">
            {litCount > 0 ? `🎂 Tap to blow (${litCount} left)` : "🎉 All candles blown!"}
          </span>
        </div>

        {/* RIGHT: Titles, Wish Box, Message & Buttons */}
        <div className="flex-1 w-full flex flex-col items-center md:items-start text-center md:text-left">
          {/* Title */}
          <div className="mb-1">
            <h1
              className="text-[#d84b5a] text-xl sm:text-3xl italic font-bold leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {wished ? "Wish Granted! 🎉" : cfg.title}
            </h1>

            <h2
              className="text-[#3a2e2c] text-xs sm:text-base font-extrabold uppercase tracking-wide"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {wished ? "HAPPY BIRTHDAY!" : cfg.subtitle}
            </h2>

            <p className="text-[10px] sm:text-xs text-[#7a6460] mt-0.5">
              {wished
                ? "All candles blown! May your year be pure magic ✨"
                : litCount > 0
                ? `${cfg.instruction}`
                : cfg.allBlownMessage}
            </p>
          </div>

          {/* Secret Wish Box */}
          {wished && !wishSent && (
            <form
              onSubmit={handleSendWish}
              className="w-full max-w-sm bg-[#fff8fa] border border-[#f5b8c9] rounded-xl p-1.5 my-1 flex gap-1.5 items-center shadow-inner"
            >
              <input
                type="text"
                value={secretWish}
                onChange={(e) => setSecretWish(e.target.value)}
                placeholder="Type your secret wish... 🌠"
                className="flex-1 bg-transparent px-2 py-0.5 text-xs text-[#4a3937] placeholder-[#a68682] focus:outline-none"
              />
              <button
                type="submit"
                className="bg-[#d84b5a] hover:bg-[#c03d4a] text-white px-3 py-1 rounded-lg text-xs font-semibold transition-all whitespace-nowrap"
              >
                Send 🌠
              </button>
            </form>
          )}

          {wishSent && (
            <div className="bg-[#fff0f3] border border-[#f5b8c9] text-[#c03d4a] px-3 py-1 rounded-full text-xs font-semibold my-1 shadow-xs">
              ✨ Wish sent to the cosmos! ✨
            </div>
          )}

          {/* Message */}
          <p className="text-[#4a3937] text-xs sm:text-sm leading-relaxed max-w-sm my-1">
            {cfg.birthdayMessage}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 my-2">
            <motion.button
              onClick={blastExtraConfetti}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-[#e76077] to-[#d84b5a] text-white px-4 py-1.5 rounded-full text-xs font-semibold shadow-xs flex items-center gap-1"
            >
              <span>🎊</span>
              <span>{cfg.confettiButton}</span>
            </motion.button>

            {initialCoupons.length > 0 && (
              <motion.button
                onClick={() => {
                  sounds.playPop();
                  setShowCoupons(true);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#ffe8ef] border border-[#f5b8c9] hover:bg-[#ffd6e2] text-[#c03d4a] px-4 py-1.5 rounded-full text-xs font-semibold shadow-xs flex items-center gap-1"
              >
                <span>🎁</span>
                <span>Claim Perks</span>
              </motion.button>
            )}

            {onRestart && (
              <motion.button
                onClick={() => {
                  sounds.playPop();
                  onRestart();
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white border border-[#e2cdc9] hover:bg-[#faeae7] text-[#5c4946] px-4 py-1.5 rounded-full text-xs font-semibold shadow-xs"
              >
                {cfg.restartButton}
              </motion.button>
            )}
          </div>

          {/* Footer Credit */}
          <div className="text-xs text-[#7a6460] mt-0.5">
            <p style={{ fontFamily: "'Dancing Script', cursive" }}>
              {cfg.credit}
            </p>
          </div>
        </div>

        {/* Hello Kitty Sticker (Compact in corner) */}
        <img
          src={kitty}
          alt="Birthday Hello Kitty"
          className="absolute right-2 bottom-1 w-14 sm:w-18 pointer-events-none opacity-85 select-none hidden md:block"
        />
      </motion.div>

      {/* --- BIRTHDAY PERKS MODAL --- */}
      <AnimatePresence>
        {showCoupons && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.92 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.92 }}
              className="bg-white rounded-3xl p-4 sm:p-6 max-w-sm w-full shadow-2xl border border-[#ecd5d1] relative text-center"
            >
              <button
                onClick={() => setShowCoupons(false)}
                className="absolute top-3 right-3 w-7 h-7 rounded-full bg-[#fdf2f1] text-[#7a6460] hover:bg-[#d84b5a] hover:text-white transition-all flex items-center justify-center font-bold text-xs"
              >
                ✕
              </button>

              <span className="text-[10px] uppercase tracking-widest text-[#8e7571] font-semibold">
                ✦ EXCLUSIVE PRIVILEGES ✦
              </span>
              <h3
                className="text-lg font-bold text-[#d84b5a] mt-0.5 mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Birthday Perks & Vouchers 🎁
              </h3>

              <div className="flex flex-col gap-1.5 my-2 max-h-[50vh] overflow-y-auto pr-1">
                {initialCoupons.map((c) => {
                  const isClaimed = claimedCoupons[c.id];
                  return (
                    <div
                      key={c.id}
                      onClick={() => !isClaimed && handleClaimCoupon(c.id)}
                      className={`p-2 rounded-xl border text-left flex justify-between items-center transition-all cursor-pointer ${
                        isClaimed
                          ? "bg-[#e8f7f0] border-[#b4e5cc]"
                          : "bg-[#fff8fa] border-[#f5b8c9] hover:bg-[#ffeef3]"
                      }`}
                    >
                      <div>
                        <h4 className="text-[11px] font-bold text-[#3d2d2a]">
                          {c.title}
                        </h4>
                        <p className="text-[10px] text-[#7a6460]">
                          {c.desc}
                        </p>
                      </div>
                      <span
                        className={`text-[9px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap ml-2 ${
                          isClaimed
                            ? "bg-[#06d6a0] text-white"
                            : "bg-[#d84b5a] text-white"
                        }`}
                      >
                        {isClaimed ? "CLAIMED ✅" : "CLAIM 🎁"}
                      </span>
                    </div>
                  );
                })}
              </div>

              <p className="text-[9px] text-[#8e7571] mt-1">
                *Coupons never expire and can be redeemed with love!
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation: Back */}
      <div className="flex justify-between items-center w-full max-w-3xl mb-2 sm:mb-3 px-1 relative z-20 pb-1">
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
      </div>
    </div>
  );
}
