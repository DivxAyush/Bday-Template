// =========================================================================
// 🎂 BIRTHDAY WEBSITE CONFIGURATION
// You can edit values here, OR simply set them in your `.env` file!
// e.g.:
// VITE_RECIPIENT_NAME=uknown 1
// VITE_NICKNAME=uknown
// VITE_SENDER_NAME=Ayush
// =========================================================================

// Read dynamic environment variables from .env
const envRecipient = (typeof import.meta !== "undefined" && import.meta.env?.VITE_RECIPIENT_NAME) || "uknown 1";
const envNickname = (typeof import.meta !== "undefined" && import.meta.env?.VITE_NICKNAME) || "uknown";
const envSender = (typeof import.meta !== "undefined" && import.meta.env?.VITE_SENDER_NAME) || "Ayush";
const envYear = (typeof import.meta !== "undefined" && import.meta.env?.VITE_BIRTHDAY_YEAR) || "2026";
const envPrevAge = (typeof import.meta !== "undefined" && import.meta.env?.VITE_PREV_AGE) || "22";
const envNewAge = (typeof import.meta !== "undefined" && import.meta.env?.VITE_NEW_AGE) || "23";

// Helper to format spaced-out nickname for Magazine Cover (e.g. "U K N O W N ✦")
const formatSpacedName = (str) => {
  if (!str) return "U K N O W N ✦";
  return str.trim().toUpperCase().split(/\s+/).map((word) => word.split("").join(" ")).join("   ") + " ✦";
};

export const textConfig = {
  // General details
  details: {
    recipientName: envRecipient,
    nickname: `${envNickname} ✦`,
    senderName: envSender,
    birthdayYear: envYear,
  },

  // 1. MAGAZINE COVER PAGE
  cover: {
    issueTag: `THE BIRTHDAY EDITION ✦ VOL. ${envYear}`,
    superHeader: "FOR MY",
    nameHighlight: formatSpacedName(envNickname),
    titleLine1: "HAPPY",
    badgeText: "CELEBRATION TIME",
    titleLine2: "BIRTHDAY",
    blurb:
      "A special edition crafted exclusively for the most wonderful soul in the world. May your day be filled with warm smiles, sweet moments, and unlimited laughter 🎂✨",
    stickers: [
      "★ CERTIFIED QUEEN ★",
      "✦ 100% PURE JOY ✦",
      "AGE +1, VIBES +1000 🌟"
    ],
    nextButton: "Open Birthday Edition →",
  },

  // 2. MIDNIGHT BIRTHDAY COUNTDOWN & AGE CONVERSION SCREEN
  countdown: {
    prevAge: envPrevAge,
    newAge: envNewAge,
    tagline: "MIDNIGHT PROTOCOL",
    subTagline: `TRANSITION TO CHAPTER ${envNewAge}`,
    clockLabel: "OFFICIAL MIDNIGHT CLOCK",
    midnightGreeting: "IT'S OFFICIALLY MIDNIGHT! 🕛✨",
    ageUpgradeTitle: "CHAPTER UPGRADE IN PROGRESS...",
    unlockedBadge: `LEVEL ${envNewAge} UNLOCKED 🔓👑`,
    partyTitle: `HAPPY ${envNewAge}RD BIRTHDAY! 🎉`,
    partyRecipient: envRecipient,
    partyMessage: `Welcome to Chapter ${envNewAge}! May this year bring you endless happiness, radiant success, and magical moments 🎂💖`,
    stickers: [
      `👑 CHAPTER ${envNewAge}`,
      "✦ 100% MAIN CHARACTER ✦",
      "VIBES: INFINITE 🌟",
    ],
    nextButton: "Enter The Birthday Game →",
    replayButton: "↺ Replay Midnight Drop",
  },

  // 3. INTERACTIVE BIRTHDAY GAME (Tic Tac Toe / Match)
  game: {
    header: "Unlock Your Birthday Wishes! 🎈",
    subtext: "Connect three cakes or balloons to unlock the special surprise",
    winHeading: "🎉 YOU WON A YEAR OF HAPPINESS! 🎉",
    winSubtext: "May all your secret wishes and brightest dreams come true this year!",
    nextButton: "Read Birthday Letter →",
  },

  // 3. HEARTFELT BIRTHDAY LETTER
  letter: {
    tagline: "A SPECIAL DELIVERY",
    title: "BIRTHDAY LETTER",
    subtitle: "Written Just For You ✦",
    salutation: `My Dearest ${envRecipient},`,
    paragraphs: [
      "Happy, happiest Birthday to someone who brings genuine warmth, light, and laughter wherever they go. Another trip around the sun, and you continue to shine brighter with every passing year! 🌸",
      "On this special day, I hope you pause and realize how deeply cherished and appreciated you are. May the upcoming year bring you unforgettable adventures, peaceful mornings, big milestones, and moments that take your breath away.",
      "Never forget how truly capable, beautiful, and extraordinary you are. Keep smiling that infectious smile — it really does brighten the world! 💖"
    ],
    closing: "Wishing you the happiest birthday ever,",
    signature: "Yours Always 💌",
    sprinkleButton: "Sprinkle Magic ✨",
    nextButton: "Spin Fortune Wheel →",
  },

  // 4. BIRTHDAY FORTUNE SPIN WHEEL (One-Time Chapter Destiny Prediction)
  wheel: {
    tagline: `CHAPTER ${envNewAge} DESTINY PROTOCOL`,
    title: `Chapter ${envNewAge} Prophecy 🔮`,
    subtitle: `The universe grants only ONE spin for your newly unlocked age! What will define your year ahead?`,
    singleSpinNotice: "⚠️ One Spin Only: Your destiny for this upcoming year will be sealed!",
    spinButton: "SPIN 🎯",
    spinningText: "Aligning the stars...",
    sealedBadge: "DESTINY SEALED 🔒",
    sealedNotice: `Prophecy sealed for Chapter ${envNewAge}! The universe has spoken for 2026 ✨`,
    fortunes: [
      { id: 1, icon: "✨", label: "Major Glow-Up", text: `Chapter ${envNewAge} is your most radiant, confident, and magnetic era yet!` },
      { id: 2, icon: "✈️", label: "Dream Trips", text: `Scenic getaways, new horizons, and unforgettable travel memories await you at Age ${envNewAge}!` },
      { id: 3, icon: "👑", label: "Queen Energy", text: `100% Main Character Energy! Nobody is doing Age ${envNewAge} like you this year.` },
      { id: 4, icon: "💰", label: "Surprise Treats", text: `Unexpected gifts, spontaneous celebrations, and pure abundance heading your way!` },
      { id: 5, icon: "📸", label: "Core Memories", text: `Late night laughs, heartwarming adventures, and moments you'll cherish forever at ${envNewAge}.` },
      { id: 6, icon: "🍀", label: "Pure Luck 24/7", text: `Everything you secretly wish for in Chapter ${envNewAge} will magically fall into place!` },
    ],
    nextButton: "Play Birthday Mixtape →",
  },

  // 5. BIRTHDAY MIXTAPE / PLAYLIST
  playlist: {
    title: "The Birthday Vibes Jukebox 🎵",
    subtitle: "A curated playlist to celebrate your special day",
    statusPlaying: "♪ Now Playing Celebration Tunes ♪",
    statusPaused: "Paused",
    tracks: [
      { id: 1, title: `Finding ${envRecipient} (Celebration Mix)`, tag: "Acoustic" },
      { id: 2, title: "If The World Was Ending", tag: "Favorites" },
      { id: 3, title: "Dil Jo Tumhara Hai", tag: "Melody" },
    ],
    nextButton: "Go To Grand Finale 🎂 →",
  },

  // 6. GRAND FINALE / CAKE & CANDLE BLOWING
  finale: {
    tagline: "TIME TO CELEBRATE ✦",
    title: "Make A Wish!",
    subtitle: "AND BLOW OUT THE CANDLES 🎂",
    instruction: "Tap on each candle flame to blow it out!",
    candlesRemaining: "candles still lit",
    allBlownMessage: "🎉 ALL CANDLES BLOWN! MAKE YOUR SECRET WISH! 🎉",
    birthdayMessage:
      "Wishing you 365 days of good health, boundless laughter, genuine friends, and every dream turned into reality! You deserve the world and so much more. Happy Birthday! 🥂✨",
    confettiButton: "Blast More Confetti! 🎊",
    restartButton: "Replay Celebration ↺",
    credit: "Made with endless love, smiles & sparkles 💖",
  },

  // 7. BONUS: BIRTHDAY COUPONS / PERKS (Claimable Gifts)
  coupons: [
    { id: 1, title: "1x Free Coffee / Treat ☕", desc: "Redeemable anytime at your favorite café" },
    { id: 2, title: "1x Movie Night Pass 🎬", desc: "You pick the movie, popcorn's on me" },
    { id: 3, title: "Zero Drama & Pure Smiles 😊", desc: "Valid for 24 hours of total pampering" },
    { id: 4, title: "1x Giant Bear Hug 🧸", desc: "No expiry date, redeem whenever you need comfort" },
  ],

  // Quick sound & UI settings
  ui: {
    audioHint: "Birthday Music",
  }
};
