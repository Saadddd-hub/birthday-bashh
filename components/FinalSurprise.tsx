"use client";

import { useState, useEffect } from "react";
import { useInView } from "@/lib/hooks";

interface Firework {
  id: number;
  x: number;
  y: number;
  color: string;
  particles: { angle: number; distance: number }[];
}

interface ExplosionHeart {
  id: number;
  emoji: string;
  x: number;
  y: number;
  delay: number;
}

/**
 * FinalSurprise — Dark sky finale with fireworks, floating hearts,
 * glowing message, and a heart explosion "One Last Surprise".
 * Replaced framer-motion with pure React + CSS transitions.
 */
export default function FinalSurprise() {
  const [fireworks, setFireworks] = useState<Firework[]>([]);
  const [fwCounter, setFwCounter] = useState(0);
  const [showFinal, setShowFinal] = useState(false);
  const [heartExplosion, setHeartExplosion] = useState(false);
  const [explosionHearts, setExplosionHearts] = useState<ExplosionHeart[]>([]);
  const [mounted, setMounted] = useState(false);
  const [ref, inView] = useInView();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Spawn fireworks automatically client-side only
  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(() => {
      setFwCounter((c) => {
        const newId = c + 1;
        const colors = ["#F9A8D4", "#C4B5FD", "#FBBF24", "#34D399", "#60A5FA", "#F87171", "#A78BFA"];
        const firework: Firework = {
          id: newId,
          x: Math.random() * 80 + 10,
          y: Math.random() * 50 + 10,
          color: colors[Math.floor(Math.random() * colors.length)],
          particles: Array.from({ length: 12 }, (_, i) => ({
            angle: (i / 12) * Math.PI * 2,
            distance: Math.random() * 60 + 40,
          })),
        };
        setFireworks((prev) => [...prev.slice(-6), firework]);
        return newId;
      });
    }, 1800);

    return () => clearInterval(interval);
  }, [mounted]);

  const handleLastSurprise = () => {
    setHeartExplosion(true);
    
    // Generate explosion hearts client-side
    const hearts = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      emoji: ["❤️", "💕", "💖", "💗", "💓"][i % 5],
      x: (Math.random() - 0.5) * (typeof window !== "undefined" ? window.innerWidth * 0.8 : 400),
      y: (Math.random() - 0.5) * (typeof window !== "undefined" ? window.innerHeight * 0.8 : 300),
      delay: Math.random() * 0.3,
    }));
    setExplosionHearts(hearts);

    setTimeout(() => setShowFinal(true), 800);
  };

  if (!mounted) return null;

  return (
    <section
      id="finale"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-24"
      style={{
        background: "linear-gradient(180deg, #020008 0%, #0a0518 40%, #1E1B4B 100%)",
      }}
    >
      {/* Fireworks canvas */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {fireworks.map((fw) => (
          <div
            key={fw.id}
            className="absolute"
            style={{ left: `${fw.x}%`, top: `${fw.y}%` }}
          >
            {/* Center flash */}
            <div
              className="absolute w-3 h-3 rounded-full -translate-x-1/2 -translate-y-1/2"
              style={{
                background: fw.color,
                animation: "firework-flash 0.6s ease-out forwards",
              }}
            />
            {/* Particles */}
            {fw.particles.map((p, i) => (
              <div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full"
                style={{
                  background: fw.color,
                  boxShadow: `0 0 6px ${fw.color}`,
                  animation: "firework-particle 1.2s ease-out forwards",
                  // Set custom properties for CSS variables
                  transform: `translate(${Math.cos(p.angle) * p.distance}px, ${Math.sin(p.angle) * p.distance + 30}px) scale(0)`,
                  opacity: 0,
                }}
              />
            ))}
          </div>
        ))}
      </div>

      <style jsx global>{`
        @keyframes firework-flash {
          0% { transform: scale(0); opacity: 1; }
          50% { transform: scale(2.5); opacity: 0.8; }
          100% { transform: scale(0); opacity: 0; }
        }
        @keyframes firework-particle {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes heart-burst-particle {
          0% { transform: translate(0, 0) scale(0); opacity: 1; }
          100% { opacity: 0; transform: var(--explode-dest) scale(1.5); }
        }
      `}</style>

      {/* Floating hearts in background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <span
            key={i}
            style={{
              position: "absolute",
              left: `${(i / 12) * 100}%`,
              bottom: "-5%",
              fontSize: `${[16, 22, 14, 20, 15, 24, 18, 26, 13, 21, 17, 23][i]}px`,
              animation: `float-up ${[8, 11, 7, 10, 9, 12, 8, 13, 9, 11, 10, 12][i]}s ease-in ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11][i]}s infinite`,
              opacity: 0,
            }}
          >
            {["❤️", "💕", "💖", "✨"][i % 4]}
          </span>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
        {/* Heart explosion overlay */}
        {heartExplosion && (
          <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
            {explosionHearts.map((heart) => (
              <div
                key={heart.id}
                className="absolute text-4xl"
                style={{
                  left: "50%",
                  top: "50%",
                  margin: "-20px 0 0 -20px",
                  // Pass variable to CSS keyframe
                  "--explode-dest": `translate(${heart.x}px, ${heart.y}px)`,
                  animation: `heart-burst-particle 1.2s ease-out ${heart.delay}s forwards`,
                } as React.CSSProperties}
              >
                {heart.emoji}
              </div>
            ))}
          </div>
        )}

        {/* Main glowing text */}
        <div
          ref={ref}
          className={`space-y-6 ${inView ? "in-view-fade-up" : ""}`}
          style={{ opacity: inView ? undefined : 0 }}
        >
          <p
            className="font-display text-6xl md:text-8xl font-black"
            style={{
              textShadow: "0 0 40px rgba(249,168,212,0.5), 0 0 80px rgba(196,181,253,0.3)",
              animation: "text-glow-pulse 3s ease-in-out infinite",
            }}
          >
            <span className="shimmer-text">Happy Birthday</span>
            <br />
            <span className="text-5xl md:text-7xl">❤️</span>
          </p>

          <p
            className="text-xl md:text-2xl text-pink-100/70 font-light leading-relaxed mount-fade-in d-4"
          >
            Thank you for being in my life.
            <br />
            <span className="text-pink-200/50">You make every day brighter.</span>
          </p>

          {/* Final surprise button */}
          {!showFinal ? (
            <button
              onClick={handleLastSurprise}
              className="mt-4 px-12 py-6 rounded-full font-semibold text-lg text-white btn-hover btn-glow mount-scale-in d-8"
              style={{
                background: "linear-gradient(135deg, #EC4899, #8B5CF6)",
                cursor: "pointer",
              }}
              id="one-last-surprise-btn"
            >
              One Last Surprise 💝
            </button>
          ) : (
            <div
              className="mt-4 space-y-4 mount-scale-in"
              style={{ transition: "all 0.5s ease" }}
            >
              <div
                className="inline-block px-10 py-6 rounded-2xl"
                style={{
                  background: "rgba(249,168,212,0.1)",
                  border: "1px solid rgba(249,168,212,0.3)",
                  backdropFilter: "blur(20px)",
                }}
              >
                <p className="font-display text-3xl md:text-4xl font-bold shimmer-text mb-2">
                  Forever Yours ❤️
                </p>
                <p className="text-pink-200/60 text-base">
                  Always and in every lifetime.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Decorative floating elements */}
        <div className="absolute inset-0 pointer-events-none">
          {["💫", "⭐", "✨", "💫", "⭐"].map((e, i) => (
            <span
              key={i}
              className="absolute text-2xl float-bob"
              style={{
                left: `${10 + i * 20}%`,
                top: `${20 + (i % 2) * 50}%`,
                animationDelay: `${i * 0.4}s`,
                opacity: 0.6,
              }}
            >
              {e}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
