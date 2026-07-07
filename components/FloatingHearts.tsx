"use client";

import { useEffect, useState } from "react";

interface FloatingHeart {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  emoji: string;
}

const HEART_EMOJIS = ["❤️", "💕", "💖", "💗", "💓", "💝", "🩷", "💘"];

/**
 * FloatingHearts — Continuously spawns floating heart emojis
 * that drift upward and fade out.
 */
export default function FloatingHearts() {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);
  const [idCounter, setIdCounter] = useState(0);

  useEffect(() => {
    // Spawn initial hearts
    const initial = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 16 + 12,
      duration: Math.random() * 8 + 8,
      delay: Math.random() * 6,
      emoji: HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)],
    }));
    setHearts(initial);
    setIdCounter(initial.length);

    // Periodically spawn new hearts
    const interval = setInterval(() => {
      setHearts((prev) => {
        const filtered = prev.filter((h) => h.delay >= 0); // keep all; CSS handles opacity
        if (filtered.length > 20) return filtered;
        return [
          ...filtered,
          {
            id: Date.now(),
            x: Math.random() * 100,
            size: Math.random() * 20 + 10,
            duration: Math.random() * 8 + 8,
            delay: 0,
            emoji: HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)],
          },
        ];
      });
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {hearts.map((heart) => (
        <span
          key={heart.id}
          style={{
            position: "absolute",
            left: `${heart.x}%`,
            bottom: "-10%",
            fontSize: `${heart.size}px`,
            animation: `float-up ${heart.duration}s ease-in ${heart.delay}s infinite`,
            opacity: 0,
            userSelect: "none",
            filter: "drop-shadow(0 0 6px rgba(249, 168, 212, 0.6))",
          }}
        >
          {heart.emoji}
        </span>
      ))}
    </div>
  );
}
