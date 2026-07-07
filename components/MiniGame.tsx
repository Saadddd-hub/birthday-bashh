"use client";

import { useState, useEffect } from "react";
import SectionTitle from "./SectionTitle";

const GAME_DURATION = 20;
const SPAWN_INTERVAL = 600;
const HEARTS = ["❤️", "💕", "💖", "💗", "💓"];

interface FallingHeart {
  id: number;
  x: number;
  emoji: string;
  speed: number;
  y: number;
}

interface CollectedPop {
  id: number;
  x: number;
  y: number;
}

/**
 * MiniGame — Catch the Hearts game.
 * Optimized with 60fps physics rendering for buttery-smooth heart descents,
 * clean responsive sizing, and high-fidelity button paddings.
 */
export default function MiniGame() {
  const [phase, setPhase] = useState<"idle" | "playing" | "won">("idle");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [hearts, setHearts] = useState<FallingHeart[]>([]);
  const [collected, setCollected] = useState<CollectedPop[]>([]);
  const [idCounter, setIdCounter] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const startGame = () => {
    setPhase("playing");
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setHearts([]);
    setCollected([]);
  };

  // Countdown timer (1s interval)
  useEffect(() => {
    if (phase !== "playing") return;
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timer);
          setPhase("won");
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [phase]);

  // Spawn falling hearts (600ms interval)
  useEffect(() => {
    if (phase !== "playing") return;
    const spawnTimer = setInterval(() => {
      setIdCounter((c) => {
        const newId = c + 1;
        setHearts((prev) => [
          ...prev.slice(-20), // Max 20 hearts
          {
            id: newId,
            x: Math.random() * 86 + 7, // padding left/right
            emoji: HEARTS[Math.floor(Math.random() * HEARTS.length)],
            speed: Math.random() * 0.4 + 0.35, // 60fps speed multiplier
            y: -10, // start above canvas
          },
        ]);
        return newId;
      });
    }, SPAWN_INTERVAL);
    return () => clearInterval(spawnTimer);
  }, [phase]);

  // BUTTERY SMOOTH 60fps physics updater (16ms interval)
  useEffect(() => {
    if (phase !== "playing") return;
    const physicsTimer = setInterval(() => {
      setHearts((prev) =>
        prev
          .map((h) => ({ ...h, y: h.y + h.speed }))
          .filter((h) => h.y < 105)
      );
    }, 16);
    return () => clearInterval(physicsTimer);
  }, [phase]);

  const catchHeart = (id: number, x: number, y: number) => {
    setHearts((prev) => prev.filter((h) => h.id !== id));
    setScore((s) => s + 1);
    
    // Add temporary collect text popup
    const popId = Date.now();
    setCollected((prev) => [...prev, { id: popId, x, y }]);
    setTimeout(() => {
      setCollected((prev) => prev.filter((item) => item.id !== popId));
    }, 450);
  };

  const timerColor =
    timeLeft > 10 ? "#F9A8D4" : timeLeft > 5 ? "#FBBF24" : "#EF4444";

  if (!mounted) return null;

  return (
    <section id="game" className="relative py-24 overflow-hidden">
      <div className="section-container">
        <SectionTitle
          title="Catch the Hearts"
          subtitle="Tap the falling hearts before they escape!"
          emoji="🎮"
        />

        {/* Center-aligned Game Wrapper */}
        <div className="flex flex-col items-center justify-center gap-8 max-w-2xl mx-auto mt-16 mb-20 px-4">
          
          {/* Top Info HUD */}
          {phase === "playing" && (
            <div className="flex items-center justify-between w-full max-w-md px-6 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md mount-fade-in">
              <div className="text-left">
                <p className="text-pink-300/60 text-[10px] uppercase tracking-widest font-semibold">Score</p>
                <p className="text-2xl font-bold gradient-text">{score}</p>
              </div>

              {/* Progress Circle Timer */}
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold"
                style={{
                  background: `conic-gradient(${timerColor} ${(timeLeft / GAME_DURATION) * 360}deg, rgba(255,255,255,0.08) 0deg)`,
                  transition: "background 0.3s ease",
                }}
              >
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{ background: "#0a0518", color: timerColor }}
                >
                  {timeLeft}s
                </div>
              </div>

              <div className="text-right">
                <p className="text-pink-300/60 text-[10px] uppercase tracking-widest font-semibold">Goal</p>
                <p className="text-2xl font-bold text-white">❤️ {score}</p>
              </div>
            </div>
          )}

          {/* Core Game Canvas */}
          <div
            className="relative w-full rounded-2xl overflow-hidden shadow-2xl"
            style={{
              height: 400,
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(249, 168, 212, 0.2)",
              backdropFilter: "blur(12px)",
            }}
          >
            {/* Idle state */}
            {phase === "idle" && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 mount-fade-in px-6">
                <div
                  className="text-6xl"
                  style={{
                    animation: "float-bob 3s ease-in-out infinite",
                  }}
                >
                  ❤️
                </div>
                <div className="text-center space-y-1.5">
                  <h3 className="text-white text-lg font-bold">Collect My Love!</h3>
                  <p className="text-white/60 text-sm max-w-xs mx-auto leading-relaxed">
                    Hearts are dropping from the sky. Click or tap to catch as many as you can before the time expires.
                  </p>
                </div>
                <button
                  onClick={startGame}
                  className="px-10 py-4.5 rounded-full font-bold text-white btn-hover text-sm tracking-wide"
                  style={{
                    background: "linear-gradient(135deg, #EC4899, #8B5CF6)",
                    boxShadow: "0 4px 15px rgba(236,72,153,0.3)",
                    cursor: "pointer",
                  }}
                  id="start-game-btn"
                >
                  Start Catching ❤️
                </button>
              </div>
            )}

            {/* Playing state — falling hearts */}
            {phase === "playing" && (
              <>
                {hearts.map((heart) => (
                  <button
                    key={heart.id}
                    className="absolute text-4xl cursor-pointer select-none border-none outline-none p-0 bg-transparent active:scale-125"
                    style={{
                      left: `${heart.x}%`,
                      top: `${heart.y}%`,
                      transform: "translate(-50%, -50%)",
                      filter: "drop-shadow(0 0 10px rgba(249,168,212,0.8))",
                      cursor: "pointer",
                      transition: "transform 0.1s ease",
                    }}
                    onClick={() => catchHeart(heart.id, heart.x, heart.y)}
                    aria-label="Catch heart"
                  >
                    {heart.emoji}
                  </button>
                ))}
                
                {/* Popups */}
                {collected.map((item) => (
                  <div
                    key={item.id}
                    className="absolute text-base pointer-events-none font-bold select-none text-pink-300"
                    style={{
                      left: `${item.x}%`,
                      top: `${item.y}%`,
                      transform: "translate(-50%, -50%)",
                      animation: "collect-pop 0.45s ease-out forwards",
                    }}
                  >
                    +1 ❤️
                  </div>
                ))}
              </>
            )}

            {/* Won / Finish state */}
            {phase === "won" && (
              <div
                className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center p-8 mount-scale-in"
                style={{ transition: "all 0.5s ease" }}
              >
                <div className="text-6xl animate-bounce">🎉</div>
                <h3 className="font-display text-3xl font-bold gradient-text">
                  {score >= 20 ? "Perfect Score! ❤️" : score >= 10 ? "You Did Wonderful!" : "Sweet Catch! 🌸"}
                </h3>
                <p className="text-white/80 text-lg">
                  You caught <span className="text-pink-300 font-bold">{score} hearts</span>
                </p>
                <p className="text-pink-200/60 text-sm max-w-sm leading-relaxed">
                  &ldquo;You&apos;ve collected all my love ❤️&rdquo;
                </p>
                <button
                  onClick={startGame}
                  className="mt-2 px-10 py-4 rounded-full font-semibold text-white btn-hover text-sm"
                  style={{
                    background: "linear-gradient(135deg, #EC4899, #8B5CF6)",
                    cursor: "pointer",
                    boxShadow: "0 4px 15px rgba(236,72,153,0.3)",
                  }}
                  id="play-again-btn"
                >
                  Play Again 🔄
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
