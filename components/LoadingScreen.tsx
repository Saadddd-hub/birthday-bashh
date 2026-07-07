"use client";

import { useEffect, useState } from "react";

/**
 * LoadingScreen — CSS-only animated loading with progress bar.
 * Accepts a `loading` prop; fades itself out via CSS transition.
 */
export default function LoadingScreen({
  loading,
  onComplete,
}: {
  loading: boolean;
  onComplete: () => void;
}) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = p + Math.random() * 12 + 4;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setDone(true);
            onComplete();
          }, 350);
          return 100;
        }
        return next;
      });
    }, 90);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #050210 0%, #1E1B4B 50%, #0a0518 100%)",
        opacity: done ? 0 : 1,
        pointerEvents: done ? "none" : "auto",
        transition: "opacity 0.6s ease",
      }}
    >
      {/* Decorative hearts */}
      {Array.from({ length: 8 }, (_, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            left: `${(i / 8) * 100}%`,
            bottom: "-5%",
            fontSize: `${[12, 16, 20, 14, 18, 15, 22, 13][i]}px`,
            animation: `float-up ${6 + i}s ease-in ${i * 0.5}s infinite`,
            opacity: 0,
            pointerEvents: "none",
          }}
        >
          {["❤️", "💕", "💖", "💗"][i % 4]}
        </span>
      ))}

      {/* Content */}
      <div className="text-center space-y-8 z-10 mount-fade-up">
        {/* Spinning rings */}
        <div className="relative w-24 h-24 mx-auto">
          <div
            className="absolute inset-0 rounded-full border-2 border-transparent"
            style={{
              borderTopColor: "#F9A8D4",
              borderRightColor: "#C4B5FD",
              animation: "spin-slow 1.5s linear infinite",
            }}
          />
          <div
            className="absolute inset-3 rounded-full border-2 border-transparent"
            style={{
              borderBottomColor: "#F9A8D4",
              borderLeftColor: "#C4B5FD",
              animation: "spin-slow 1s linear infinite reverse",
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center text-3xl">❤️</div>
        </div>

        <div>
          <h1 className="font-display text-3xl md:text-4xl font-bold shimmer-text mb-2">
            Preparing something special...
          </h1>
          <p className="text-pink-300/70 text-sm">Made with love, just for you</p>
        </div>

        {/* Progress bar */}
        <div className="w-64 mx-auto">
          <div
            className="h-1 rounded-full overflow-hidden"
            style={{ background: "rgba(255,255,255,0.1)" }}
          >
            <div
              className="h-full rounded-full"
              style={{
                background: "linear-gradient(90deg, #F9A8D4, #C4B5FD)",
                width: `${Math.min(progress, 100)}%`,
                transition: "width 0.1s ease",
              }}
            />
          </div>
          <p className="text-center text-pink-300/50 text-xs mt-2">
            {Math.min(Math.round(progress), 100)}%
          </p>
        </div>
      </div>
    </div>
  );
}
