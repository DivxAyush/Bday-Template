export interface TextConfig {
  details: {
    recipientName: string;
    nickname: string;
    senderName: string;
    birthdayYear: string;
  };
  cover: {
    issueTag: string;
    superHeader: string;
    nameHighlight: string;
    titleLine1: string;
    badgeText: string;
    titleLine2: string;
    blurb: string;
    stickers: string[];
    nextButton: string;
  };
  countdown: {
    prevAge: string;
    newAge: string;
    tagline: string;
    subTagline: string;
    clockLabel: string;
    midnightGreeting: string;
    ageUpgradeTitle: string;
    unlockedBadge: string;
    partyTitle: string;
    partyRecipient: string;
    partyMessage: string;
    stickers: string[];
    nextButton: string;
    replayButton: string;
  };
  polaroids: {
    tagline: string;
    title: string;
    subtitle: string;
    cards: {
      id: number;
      title: string;
      date: string;
      washiColor: string;
      note: string;
      stamp: string;
    }[];
    revealedNotice: string;
    nextButton: string;
  };
  letter: {
    tagline: string;
    title: string;
    subtitle: string;
    salutation: string;
    paragraphs: string[];
    closing: string;
    signature: string;
    sprinkleButton: string;
    nextButton: string;
  };
  wheel: {
    tagline: string;
    title: string;
    subtitle: string;
    singleSpinNotice: string;
    spinButton: string;
    spinningText: string;
    sealedBadge: string;
    sealedNotice: string;
    fortunes: { id: number; icon: string; label: string; text: string }[];
    nextButton: string;
  };
  playlist: {
    title: string;
    subtitle: string;
    statusPlaying: string;
    statusPaused: string;
    tracks: { id: number; title: string; tag: string }[];
    nextButton: string;
  };
  finale: {
    tagline: string;
    title: string;
    subtitle: string;
    instruction: string;
    candlesRemaining: string;
    allBlownMessage: string;
    birthdayMessage: string;
    confettiButton: string;
    restartButton: string;
    credit: string;
  };
  coupons: { id: number; title: string; desc: string }[];
  ui: {
    audioHint: string;
  };
}

export declare const textConfig: TextConfig;

