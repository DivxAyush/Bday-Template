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
import { sounds } from "./utils/soundEffects";

// Import music for ambient player
import bgMusic from "./music/bg-music.mp3";

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
    // Start audio if paused, but never restart if already playing
    if (ambientAudioRef.current && ambientAudioRef.current.paused) {
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
      {/* Persistent audio element for background ambient music */}
      <audio
        ref={ambientAudioRef}
        src={bgMusic}
        loop
        preload="auto"
        onPlay={() => setIsAmbientPlaying(true)}
        onPause={() => setIsAmbientPlaying(false)}
      />

      {/* Animated Light Dots running along the grid lines */}
      <GridRunners />

      {/* Floating Ambient Music Controller (Top-Right) */}
      <div className="fixed top-2 right-2.5 sm:top-2.5 sm:right-6 z-50">
        <motion.button
          onClick={toggleAmbientMusic}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.94 }}
          aria-label={isAmbientPlaying ? "Pause music" : "Play music"}
          className={`flex items-center gap-1.5 px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-xs font-semibold shadow-md border transition-all duration-300 backdrop-blur-md cursor-pointer ${
            isAmbientPlaying
              ? "bg-white/95 border-[#f5b8c9] text-[#d84b5a] shadow-[#f5b8c9]/30"
              : "bg-white/85 border-[#e2cdc9] text-[#7a6460] hover:bg-[#fff0f3]"
          }`}
        >
          {/* Animated Equalizer Wave Bars or Muted Speaker */}
          {isAmbientPlaying ? (
            <div className="flex items-end gap-0.5 h-3.5 px-0.5">
              <span className="w-0.5 bg-[#d84b5a] rounded-full animate-eq-1" />
              <span className="w-0.5 bg-[#e76077] rounded-full animate-eq-2" />
              <span className="w-0.5 bg-[#d84b5a] rounded-full animate-eq-3" />
              <span className="w-0.5 bg-[#e76077] rounded-full animate-eq-4" />
            </div>
          ) : (
            <svg
              className="w-3.5 h-3.5 text-[#9c827e]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
            </svg>
          )}

          {/* Label */}
          <span className="text-[10.5px] sm:text-xs font-bold tracking-wide">
            {isAmbientPlaying ? "Music ♪" : "Muted"}
          </span>

          {/* Pulse status indicator */}
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              isAmbientPlaying ? "bg-[#06d6a0] animate-pulse" : "bg-[#c4a9a4]"
            }`}
          />
        </motion.button>
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
