// This file reads the text configuration and provides it to the app

export const textConfig = {
  greeting: {
    name: "Hieieieieiie",
    message: "I'm Sollyyyyyy"
  },
  
  stickyNotes: [
    "I'm truly sorry!",
    "Forgive me, please.",
    "I regret my mistakes.",
    "Let's start fresh.",
    "My apology is sincere."
  ],
  
  letter: {
    title: "Read My Apology Letter 💌",
    subtitle: "Click to hear my sincere apology",
    recipient: "Dear Pragati Ji",
    paragraphs: [
      "I want to offer my sincerest apologies for the ways I have let you down...",
      "Please forgive me for my mistakes."
    ],
    signature: "Yours sincerely,\nMadam Ji"
  },
  
  game: {
    title: "Play a Game!",
    subtitle: "Catch some hearts to unlock a special message",
    completionMessage: "You've completed the game! ✨ But you can play again if you want!",
    winMessage: "You caught my heart! Just like how you've captured my real heart forever..."
  },
  
  panels: [
    {
      text: "I know I've been distant, and I'm truly sorry...",
      caption: "I hope you can forgive me."
    },
    {
      text: "I regret my careless mistakes and the pain they caused.",
      caption: "I'm truly sorry and promise to do better."
    },
    {
      text: "This is us btw",
      caption: "Don't be angyyyyyyy ."
    }
  ],
  
  poem: {
    title: "My Apology in Verse ✨",
    lines: [
      "I'm sorry for the silent hours,",
      "For the moments I let you down,",
      "Regret fills every passing minute,",
      "In every lost and lonely sound.",
      "",
      "I promise to mend what I have broken,",
      "To cherish you in every way,",
      "Please forgive my thoughtless errors,",
      "And help me find a brighter day."
    ]
  },
  
  ui: {
    musicHint: "Click to Play music 🎵",
    envelopeHint: "Click to open",
    envelopePreview: "💌 A letter for you..."
  }
};

// Instructions for users:
export const INSTRUCTIONS = `
===========================================
HOW TO CUSTOMIZE YOUR SORRY WEBSITE
===========================================

1. Open the file: src/textConfig.js
2. Change any text between the quotes ""
3. Keep all quotes and commas exactly as they are
4. Save the file
5. Refresh your website to see changes

EXAMPLES:
- Change "Dear Kuchupuchu" to "Dear Sarah"
- Change the poem lines to your own verses
- Update sticky notes with your own messages

For more help, check the README.md file!
===========================================
`;