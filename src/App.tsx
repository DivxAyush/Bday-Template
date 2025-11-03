import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MagazineCover from "./components/MagazineCover";
import TicTacLove from "./components/TicTacLove";
import LoveLetter from "./components/LoveLetter";
import CutePhotoGallery from "./components/CutePhotoGallery";
import PlaylistPage from "./components/PlaylistPage";
import ThankYouPage from "./components/ThankYouPage";

// Import your photos
import photo1 from "./images/pic1.jpg";
import photo2 from "./images/pic2.gif";
import photo3 from "./images/pic3.jpg";

function App() {
  const [page, setPage] = useState(0);

  const photos = [photo1, photo2, photo3];

  const myCaptions = [
    "Some Flowers For You",
    "I <3 You Card",
    "Hehe",
  ];

  const pageVariants = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };

  return (
    <div className="min-h-screen bg-[#FBF5F4]">
      <AnimatePresence mode="wait">
        {page === 0 && (
          <motion.div
            key="cover"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="w-full h-full"
          >
            <MagazineCover onNext={() => setPage(1)} />
          </motion.div>
        )}

        {page === 1 && (
          <motion.div
            key="tictac"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="w-full h-full"
          >
            <TicTacLove 
              onBack={() => setPage(0)}
              onNext={() => setPage(2)}
            />
          </motion.div>
        )}

        {page === 2 && (
          <motion.div
            key="letter"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="w-full h-full"
          >
            <LoveLetter 
              onBack={() => setPage(1)} 
              onNext={() => setPage(3)}
            />
          </motion.div>
        )}

        {page === 3 && (
          <motion.div
            key="gallery"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="w-full h-full"
          >
            <CutePhotoGallery 
              title="Special Cards" 
              photos={photos}
              captions={myCaptions}
              onBack={() => setPage(2)}
              onNext={() => setPage(4)}
            />
          </motion.div>
        )}

        {page === 4 && (
          <motion.div
            key="playlist"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="w-full h-full"
          >
            <PlaylistPage 
              onBack={() => setPage(3)}
              onNext={() => setPage(5)}
            />
          </motion.div>
        )}

        {page === 5 && (
          <motion.div
            key="thankyou"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="w-full h-full"
          >
            <ThankYouPage 
              onBack={() => setPage(4)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;