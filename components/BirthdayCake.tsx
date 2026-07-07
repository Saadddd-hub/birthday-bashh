"use client";

import { useState, useEffect } from "react";
import { countdownDate } from "@/lib/data";
import SectionTitle from "./SectionTitle";

const NUM_CANDLES = 5;

/**
 * BirthdayCake — Redesigned romantic birthday cake.
 * Unlocks automatically when countdown reaches zero.
 * Supports double-tapping the cake or clicking a button to blow out all candles.
 * Includes floating sparkles, custom candles, and confetti.
 */
export default function BirthdayCake() {
  const [isLocked, setIsLocked] = useState(true);
  const [blown, setBlown] = useState<boolean[]>(Array(NUM_CANDLES).fill(false));
  const [celebrating, setCelebrating] = useState(false);
  const [confettiPieces, setConfettiPieces] = useState<
    { id: number; x: number; color: string; delay: number; size: number; duration: number }[]
  >([]);
  const [sparkles, setSparkles] = useState<
    { id: number; left: number; top: number; delay: number; size: number }[]
  >([]);
  const [mounted, setMounted] = useState(false);

  const allBlown = blown.every(Boolean);

  // Check lock state and mounting
  useEffect(() => {
    setMounted(true);
    const checkLock = () => {
      const targetTime = new Date(countdownDate).getTime();
      setIsLocked(Date.now() < targetTime);
    };

    checkLock();
    const interval = setInterval(checkLock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Generate floating sparkles around the cake
  useEffect(() => {
    if (mounted && !isLocked) {
      const items = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        left: Math.random() * 80 + 10,
        top: Math.random() * 80 + 10,
        delay: Math.random() * 3,
        size: Math.random() * 5 + 3,
      }));
      setSparkles(items);
    }
  }, [mounted, isLocked]);

  // Handle blow triggers
  const handleBlowAll = () => {
    setBlown(Array(NUM_CANDLES).fill(true));
    triggerCelebration();
  };

  const triggerCelebration = () => {
    if (!celebrating) {
      setCelebrating(true);
      // Spawn confetti
      const pieces = Array.from({ length: 80 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: ["#F9A8D4", "#C4B5FD", "#FBBF24", "#34D399", "#60A5FA", "#F87171"][
          Math.floor(Math.random() * 6)
        ],
        delay: Math.random() * 1.5,
        size: Math.random() * 8 + 6,
        duration: 2.2 + Math.random() * 1.8,
      }));
      setConfettiPieces(pieces);

      // Auto scroll to Finale after a short delay
      setTimeout(() => {
        document.getElementById("finale")?.scrollIntoView({ behavior: "smooth" });
      }, 3500);
    }
  };

  const resetCake = () => {
    setBlown(Array(NUM_CANDLES).fill(false));
    setCelebrating(false);
    setConfettiPieces([]);
  };

  if (!mounted) return null;

  return (
    <section id="cake" className="relative py-24 overflow-hidden min-h-screen flex flex-col justify-center">
      {/* Confetti Container */}
      <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden">
        {confettiPieces.map((piece) => (
          <div
            key={piece.id}
            style={{
              position: "absolute",
              left: `${piece.x}%`,
              top: "-20px",
              width: `${piece.size}px`,
              height: `${piece.size}px`,
              background: piece.color,
              borderRadius: piece.id % 2 === 0 ? "50%" : "2px",
              opacity: 0,
              transform: "translateY(0) rotate(0deg)",
              animation: `cake-confetti-fall ${piece.duration}s linear ${piece.delay}s forwards`,
            }}
          />
        ))}
      </div>

      <style jsx global>{`
        @keyframes cake-confetti-fall {
          0% { transform: translateY(-10px) rotate(0deg); opacity: 1; }
          85% { opacity: 1; }
          100% { transform: translateY(105vh) rotate(540deg); opacity: 0; }
        }
        @keyframes sparkle-float {
          0%, 100% { transform: translateY(0) scale(0.6); opacity: 0.3; }
          50% { transform: translateY(-15px) scale(1.1); opacity: 0.9; }
        }
      `}</style>

      {/* Main Section Header */}
      <div className="section-container">
        <SectionTitle
          title="Make a Wish"
          subtitle="Double-tap the cake or use the button below to blow out all candles!"
          emoji="🎂"
        />

        <div className="relative max-w-lg mx-auto mt-12 flex flex-col items-center justify-center min-h-[460px] px-4">
          
          {/* LOCKED STATE OVERLAY */}
          {isLocked ? (
            <div
              className="absolute inset-0 z-30 rounded-3xl flex flex-col items-center justify-center p-8 text-center"
              style={{
                background: "rgba(15, 10, 35, 0.75)",
                border: "2px dashed rgba(249, 168, 212, 0.3)",
                backdropFilter: "blur(18px)",
                boxShadow: "0 15px 35px rgba(0,0,0,0.5)",
              }}
            >
              <div
                className="text-6xl mb-6"
                style={{ animation: "float-bob 3s ease-in-out infinite" }}
              >
                🔒🎂
              </div>
              <h3 className="font-display text-2xl font-bold text-white mb-3">
                Locked with Love
              </h3>
              <p className="text-pink-200/70 text-sm max-w-xs mx-auto leading-relaxed">
                Patience, my love... Something sweet is baking! This section unlocks automatically when the countdown reaches zero.
              </p>
            </div>
          ) : (
            // UNLOCKED CAKE WRAPPER
            <div className="flex flex-col items-center justify-center w-full relative z-10 mount-scale-in">
              
              {/* Sparkles around cake */}
              {sparkles.map((sp) => (
                <div
                  key={sp.id}
                  className="absolute text-pink-300 pointer-events-none select-none text-sm"
                  style={{
                    left: `${sp.left}%`,
                    top: `${sp.top}%`,
                    animation: `sparkle-float 2.5s ease-in-out infinite`,
                    animationDelay: `${sp.delay}s`,
                  }}
                >
                  ✨
                </div>
              ))}

              {/* Cake Illustration with Double Tap support */}
              <div
                onDoubleClick={handleBlowAll}
                className="relative cursor-pointer select-none group"
                style={{ width: "320px", height: "260px" }}
                title="Double-tap the cake to blow out candles!"
              >
                {/* Plate base */}
                <div
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-80 h-5 rounded-full"
                  style={{
                    background: "rgba(249, 168, 212, 0.15)",
                    border: "1px solid rgba(249, 168, 212, 0.25)",
                    filter: "blur(2px)",
                  }}
                />

                {/* Cake body wrapper */}
                <div className="relative w-full h-full flex flex-col justify-end items-center pb-1">
                  
                  {/* Tier 1 (Top Layer) */}
                  <div
                    className="w-44 h-16 rounded-t-2xl relative overflow-hidden flex items-end justify-center pb-1.5 z-20"
                    style={{
                      background: "linear-gradient(135deg, #FBBF24, #F9A8D4)",
                      boxShadow: "inset 0 -4px 8px rgba(0,0,0,0.15)",
                    }}
                  >
                    {/* Drips frosting line */}
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute top-0 w-3.5 rounded-b-full bg-white/60"
                        style={{
                          left: `${10 + i * 15}%`,
                          height: `${[14, 20, 12, 18, 11, 22][i]}px`,
                        }}
                      />
                    ))}
                  </div>

                  {/* Tier 2 (Middle Layer) */}
                  <div
                    className="w-56 h-20 relative overflow-hidden flex items-center justify-center z-10"
                    style={{
                      background: "linear-gradient(135deg, #EC4899, #8B5CF6)",
                      boxShadow: "inset 0 -4px 8px rgba(0,0,0,0.2)",
                    }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-white/25 font-display text-base italic select-none">Sweet Love</p>
                    </div>
                    {/* Polka dots */}
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-2.5 h-2.5 rounded-full bg-white/20"
                        style={{
                          left: `${8 + i * 12}%`,
                          top: `${20 + (i % 2) * 35}%`,
                        }}
                      />
                    ))}
                  </div>

                  {/* Tier 3 (Base Layer) */}
                  <div
                    className="w-64 h-24 rounded-b-xl relative overflow-hidden"
                    style={{
                      background: "linear-gradient(135deg, #7C3AED, #4C1D95)",
                      boxShadow: "inset 0 -4px 10px rgba(0,0,0,0.25)",
                    }}
                  >
                    {/* Frosting line */}
                    <div
                      className="absolute top-0 left-0 right-0 h-3"
                      style={{
                        background: "linear-gradient(135deg, #C4B5FD, #F9A8D4)",
                      }}
                    />
                    {/* Heart sprinkles decor */}
                    <div className="absolute inset-0 flex items-center justify-center gap-5 text-lg opacity-25 select-none">
                      {["❤️", "🌸", "❤️", "🌸", "❤️"].map((e, i) => (
                        <span key={i}>{e}</span>
                      ))}
                    </div>
                  </div>

                  {/* Candles list */}
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex gap-5 z-30">
                    {blown.map((isBlown, idx) => (
                      <div key={idx} className="flex flex-col items-center">
                        
                        {/* Flame with flicker */}
                        <div
                          style={{
                            transform: isBlown ? "scale(0) translateY(-8px)" : "scale(1)",
                            opacity: isBlown ? 0 : 1,
                            transition: "transform 0.3s ease, opacity 0.3s ease",
                            height: "20px",
                          }}
                        >
                          <div
                            className="w-3.5 h-5 rounded-t-full rounded-b-sm"
                            style={{
                              background: "linear-gradient(to top, #FCD34D, #F97316, rgba(239,68,68,0.8))",
                              boxShadow: "0 0 10px rgba(252,211,77,0.8), 0 0 20px rgba(249,115,22,0.4)",
                              animation: "flicker 0.25s ease-in-out infinite alternate",
                            }}
                          />
                        </div>

                        {/* Candle Wax stick */}
                        <div
                          className="w-3.5 h-9 rounded-sm"
                          style={{
                            background: isBlown
                              ? "rgba(100,80,120,0.6)"
                              : [
                                  "linear-gradient(180deg, #F9A8D4, #EC4899)",
                                  "linear-gradient(180deg, #C4B5FD, #8B5CF6)",
                                  "linear-gradient(180deg, #FCD34D, #F59E0B)",
                                  "linear-gradient(180deg, #86EFAC, #22C55E)",
                                  "linear-gradient(180deg, #93C5FD, #3B82F6)",
                                ][idx],
                            boxShadow: isBlown ? "none" : "0 0 6px rgba(249,168,212,0.3)",
                          }}
                        />
                      </div>
                    ))}
                  </div>

                </div>
              </div>

              {/* Text hint details */}
              <p className="text-pink-300/40 text-xs mt-3 select-none tracking-wide animate-pulse">
                Hint: Double-tap the cake to blow out all candles! 🎂
              </p>

              {/* Action Buttons panel */}
              <div className="mt-8 text-center z-20">
                {allBlown ? (
                  <div className="mount-fade-up space-y-3">
                    <p className="text-5xl">🎉✨🌸</p>
                    <h3 className="font-display text-3xl font-bold shimmer-text leading-tight">
                      Wish Made With Love!
                    </h3>
                    <p className="text-pink-200/80 text-sm max-w-sm mx-auto leading-relaxed">
                      All candles blown! Your beautiful wish is drifting away to the stars. Let&apos;s see the finale... ❤️
                    </p>
                    <button
                      onClick={resetCake}
                      className="px-6 py-2.5 rounded-full text-xs font-semibold text-pink-300 border border-pink-400/30 bg-pink-500/10 hover:bg-pink-500/20 btn-hover"
                      style={{ cursor: "pointer" }}
                      id="reset-candles-btn"
                    >
                      Light Candles Again 🕯️
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleBlowAll}
                    className="px-8 py-3.5 rounded-full font-bold text-white btn-hover text-sm tracking-wide"
                    style={{
                      background: "linear-gradient(135deg, #EC4899, #8B5CF6)",
                      boxShadow: "0 4px 15px rgba(236,72,153,0.3)",
                      cursor: "pointer",
                    }}
                    id="blow-all-btn"
                  >
                    Blow Out All Candles 🕯️💨
                  </button>
                )}
              </div>

            </div>
          )}

        </div>
      </div>
    </section>
  );
}
