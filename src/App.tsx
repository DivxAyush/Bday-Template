import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MagazineCover from "./components/MagazineCover";
import BirthdayCountdown from "./components/BirthdayCountdown";
import BirthdayPolaroidBoard from "./components/BirthdayPolaroidBoard";
import LoveLetter from "./components/LoveLetter";
import BirthdayFortuneWheel from "./components/BirthdayFortuneWheel";
import PlaylistPage from "./components/PlaylistPage";
import ThankYouPage from "./components/ThankYouPage";
import GridRunners from "./components/GridRunners";
import { textConfig } from "./textConfig";
import { sounds } from "./utils/soundEffects";

// Import music for ambient player
import ambientMusic from "./music/music1.mp3";

const TOTAL_PAGES = 7;

function App() {
  const [page, setPage] = useState(0);
  const [isAmbientPlaying, setIsAmbientPlaying] = useState(false);
  const ambientAudioRef = useRef<HTMLAudioElement | null>(null);

  const pageVariants = {
    initial: { opacity: 0, scale: 0.98 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.98 },
  };

  const goToPage = (idx: number) => {
    sounds.playPop();
    setPage(idx);
  };

  const handleStartCelebration = () => {
    if (ambientAudioRef.current && !isAmbientPlaying) {
      ambientAudioRef.current
        .play()
        .then(() => setIsAmbientPlaying(true))
        .catch(() => {});
    }
    goToPage(1);
  };

  // Toggle background ambient music
  const toggleAmbientMusic = () => {
    sounds.playPop();
    if (!ambientAudioRef.current) return;
    if (isAmbientPlaying) {
      ambientAudioRef.current.pause();
      setIsAmbientPlaying(false);
    } else {
      ambientAudioRef.current
        .play()
        .then(() => setIsAmbientPlaying(true))
        .catch(() => setIsAmbientPlaying(false));
    }
  };

  // Auto-pause ambient music on playlist page to avoid double audio playing
  useEffect(() => {
    if (page === 5 && ambientAudioRef.current && isAmbientPlaying) {
      ambientAudioRef.current.pause();
      setIsAmbientPlaying(false);
    }
  }, [page, isAmbientPlaying]);

  // Keyboard arrow navigation (← and →)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === "ArrowRight") {
        setPage((prev) => {
          const next = Math.min(prev + 1, TOTAL_PAGES - 1);
          if (next !== prev) sounds.playPop();
          return next;
        });
      } else if (e.key === "ArrowLeft") {
        setPage((prev) => {
          const next = Math.max(prev - 1, 0);
          if (next !== prev) sounds.playPop();
          return next;
        });
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Mobile Touch Swipe Gesture
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const target = e.target as HTMLElement;
    if (target.closest("input") || target.closest("button")) {
      touchStartX.current = null;
      touchStartY.current = null;
      return;
    }
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    const diffY = touchStartY.current - e.changedTouches[0].clientY;

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
      if (diffX > 0) {
        // Swiped left -> Next page
        setPage((prev) => {
          const next = Math.min(prev + 1, TOTAL_PAGES - 1);
          if (next !== prev) sounds.playPop();
          return next;
        });
      } else {
        // Swiped right -> Prev page
        setPage((prev) => {
          const next = Math.max(prev - 1, 0);
          if (next !== prev) sounds.playPop();
          return next;
        });
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="h-[100dvh] max-h-[100dvh] w-screen overflow-hidden bg-grid-system text-[#2c2c2c] relative flex flex-col justify-between select-none"
    >
      {/* Hidden audio element for ambient background music */}
      <audio ref={ambientAudioRef} src={ambientMusic} loop preload="auto" />

      {/* Animated Light Dots running along the grid lines */}
      <GridRunners />

      {/* Floating Ambient Music Controller (Top-Right) */}
      <div className="fixed top-1.5 right-2 sm:top-2.5 sm:right-6 z-50">
        <button
          onClick={toggleAmbientMusic}
          aria-label="Toggle background music"
          className={`flex items-center gap-1 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-semibold shadow-sm border transition-all duration-200 backdrop-blur-md ${
            isAmbientPlaying
              ? "bg-[#fff0f3] border-[#f5b8c9] text-[#c03d4a]"
              : "bg-white/85 border-[#edd7d3] text-[#7a6460] hover:bg-[#fff0f3]"
          }`}
        >
          <span>{isAmbientPlaying ? "🔊" : "🔈"}</span>
          <span className="hidden sm:inline">
            {isAmbientPlaying ? "Music ♪" : textConfig.ui.audioHint}
          </span>
        </button>
      </div>

      {/* --- PAGE CONTENT ROUTER (ZERO-SCROLL 100VH) --- */}
      <main className="flex-1 h-full w-full overflow-hidden flex flex-col justify-center py-1">
        <AnimatePresence mode="wait">
          {page === 0 && (
            <motion.div
              key="cover"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="w-full h-full flex flex-col justify-center overflow-hidden"
            >
              <MagazineCover onNext={handleStartCelebration} />
            </motion.div>
          )}

          {page === 1 && (
            <motion.div
              key="countdown"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="w-full h-full flex flex-col justify-center overflow-hidden"
            >
              <BirthdayCountdown
                onBack={() => goToPage(0)}
                onNext={() => goToPage(2)}
              />
            </motion.div>
          )}

          {page === 2 && (
            <motion.div
              key="polaroid"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="w-full h-full flex flex-col justify-center overflow-hidden"
            >
              <BirthdayPolaroidBoard
                onBack={() => goToPage(1)}
                onNext={() => goToPage(3)}
              />
            </motion.div>
          )}

          {page === 3 && (
            <motion.div
              key="letter"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="w-full h-full flex flex-col justify-center overflow-hidden"
            >
              <LoveLetter
                onBack={() => goToPage(2)}
                onNext={() => goToPage(4)}
              />
            </motion.div>
          )}

          {page === 4 && (
            <motion.div
              key="wheel"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="w-full h-full flex flex-col justify-center overflow-hidden"
            >
              <BirthdayFortuneWheel
                onBack={() => goToPage(3)}
                onNext={() => goToPage(5)}
              />
            </motion.div>
          )}

          {page === 5 && (
            <motion.div
              key="playlist"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="w-full h-full flex flex-col justify-center overflow-hidden"
            >
              <PlaylistPage
                onBack={() => goToPage(4)}
                onNext={() => goToPage(6)}
              />
            </motion.div>
          )}

          {page === 6 && (
            <motion.div
              key="thankyou"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="w-full h-full flex flex-col justify-center overflow-hidden"
            >
              <ThankYouPage
                onBack={() => goToPage(5)}
                onRestart={() => goToPage(0)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
