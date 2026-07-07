// ============================================================
// lib/data.ts — Single source of truth for all website content
// Change values here to update the entire website automatically
// ============================================================

export interface TimelineEvent {
  id: number;
  date: string;
  title: string;
  description: string;
  image: string;
  emoji: string;
}

export interface GalleryPhoto {
  id: number;
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Letter {
  id: number;
  occasion: string;
  content: string;
  color: string;
  emoji: string;
}

export interface Reason {
  id: number;
  text: string;
}

export interface Gift {
  id: number;
  title: string;
  color: string;
  ribbonColor: string;
  image: string;
  memory: string;
  emoji: string;
}

export interface Music {
  title: string;
  artist: string;
  src: string;
  cover: string;
}

// ============================================================
// TIMELINE — Our Story (Reduced to remaining cards)
// ============================================================
export const timeline: TimelineEvent[] = [
  {
    id: 1,
    date: "A Little Later",
    title: "First Conversation",
    description:
      "We talked for hours and hours, and time just disappeared. Every word you said made me want to know more about you.",
    image: "/images/gallery/gallery-6.png",
    emoji: "💬",
  },
  {
    id: 2,
    date: "A Memory Forever",
    title: "First Picture Together",
    description:
      "The first time we captured us — a tiny square of proof that this was real and beautiful and ours.",
    image: "/images/gallery/gallery-1.jpeg",
    emoji: "📸",
  },
];

// ============================================================
// GALLERY — Photo Collection (Reduced to 5 photo cards)
// ============================================================
export const gallery: GalleryPhoto[] = [
  { id: 1, src: "/images/gallery/gallery-1.jpeg", alt: "A beautiful moment together", width: 400, height: 400 },
  { id: 2, src: "/images/gallery/gallery-2.jpeg", alt: "Laughing and happy", width: 400, height: 500 },
  { id: 3, src: "/images/gallery/gallery-3.jpeg", alt: "Stargazing together", width: 400, height: 350 },
  { id: 4, src: "/images/gallery/gallery-4.jpeg", alt: "Our favourite place", width: 400, height: 450 },
  { id: 5, src: "/images/gallery/gallery-5.jpeg", alt: "A candid moment", width: 400, height: 400 },
];

// ============================================================
// LETTERS — Open When... (One handwritten letter experience config)
// ============================================================
export const letters: Letter[] = [
  {
    id: 1,
    occasion: "A Handwritten Letter For You",
    content:
      "My Dearest,\n\nI wanted to take a moment to write something truly special, just for you. From the moment we started talking, my world became brighter and infinitely more beautiful. Your laugh, your kindness, and the way you look at the world inspires me every day.\n\nThank you for being my constant source of joy, my comfort in difficult times, and my favorite adventure. I am so incredibly grateful to have you in my life.\n\nI love you, now and always.\n\nForever Yours ❤️",
    color: "from-pink-300 to-rose-400",
    emoji: "✉️",
  },
];

// ============================================================
// REASONS — Why You're Amazing (Reduced to 10 reasons)
// ============================================================
export const reasons: Reason[] = [
  { id: 1, text: "Your laugh is the most contagious and beautiful sound in the universe." },
  { id: 2, text: "You make everyone around you feel genuinely seen, valued, and heard." },
  { id: 3, text: "The way your eyes light up with pure passion when you talk about things you love." },
  { id: 4, text: "You are braver than you think and stronger than you will ever know." },
  { id: 5, text: "Your kindness is not a weakness — it is your most beautiful superpower." },
  { id: 6, text: "You have a unique ability to find magic and beauty in the most ordinary moments." },
  { id: 7, text: "The way you care for the people you love, fiercely, unconditionally, and completely." },
  { id: 8, text: "You make the world a genuinely warmer and better place just by being in it." },
  { id: 9, text: "Your mind is endlessly fascinating, brilliant, creative, and beautiful." },
  { id: 10, text: "You never give up on what matters, even when things get unbelievably hard." },
];

// ============================================================
// GIFTS — Gift Boxes (Reduced to 3 gift boxes)
// ============================================================
export const gifts: Gift[] = [
  {
    id: 1,
    title: "Mandi Party",
    color: "from-pink-400 to-rose-500",
    ribbonColor: "#fff",
    image: "/images/gifts/gift-1.svg",
    memory: "Get ready for the best Mandi feast ever! A delicious celebration of us. 🍛😋",
    emoji: "🎁",
  },
  {
    id: 2,
    title: "You'll Get Ice Creams",
    color: "from-violet-500 to-purple-700",
    ribbonColor: "#F9A8D4",
    image: "/images/gifts/gift-2.svg",
    memory: "A sweet treat for a sweet day. You'll get your favorite ice creams! 🍦🍨",
    emoji: "💝",
  },
  {
    id: 3,
    title: "Lots of Kisses",
    color: "from-rose-400 to-pink-600",
    ribbonColor: "#C4B5FD",
    image: "/images/gifts/gift-3.svg",
    memory: "The sweetest gift of all — lots and lots of warm kisses! 😘💋",
    emoji: "🌹",
  },
];

// ============================================================
// COUNTDOWN — Target Date (Changed to 08 July 2026)
// ============================================================
export const countdownDate = "2026-07-08T00:00:00";

// ============================================================
// MUSIC — Player Configuration
// Add your audio file to public/audio/song.mp3
// ============================================================
export const music: Music = {
  title: "Salvatore",
  artist: "Lana Del Rey",
  src: "/audio/song.mp3",
  cover: "/images/hero/hero-1.svg",
};
