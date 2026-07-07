"use client";

import { useState } from "react";
import { reasons } from "@/lib/data";
import SectionTitle from "./SectionTitle";

const REASON_EMOJIS = [
  "💖", // 1
  "🗣️", // 2
  "👀", // 3
  "🛡️", // 4
  "🌸", // 5
  "✨", // 6
  "🫂", // 7
  "🌍", // 8
  "🧠", // 9
  "🔥", // 10
];

export default function ReasonsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState<boolean[]>(reasons.map(() => false));

  const goTo = (idx: number) => {
    setCurrentIndex(idx);
  };
  const prev = () => goTo((currentIndex - 1 + reasons.length) % reasons.length);
  const next = () => goTo((currentIndex + 1) % reasons.length);

  const toggleFlip = (idx: number) => {
    setFlipped((p) => {
      const u = [...p];
      u[idx] = !u[idx];
      return u;
    });
  };

  const visibleIndices = [
    (currentIndex - 1 + reasons.length) % reasons.length,
    currentIndex,
    (currentIndex + 1) % reasons.length,
  ];

  return (
    <section id="reasons" className="relative py-24 overflow-hidden">
      {/* Background decoration */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(196,181,253,0.07) 0%, transparent 70%)",
        }}
      />
      <div className="section-container">
        <SectionTitle
          title="Why You're Amazing"
          subtitle="10 beautiful reasons — though there are truly infinite"
          emoji="💫"
        />

        {/* Swipeable / Clickable flip deck */}
        <div className="relative flex items-center justify-center gap-4 md:gap-8 h-80 md:h-96 max-w-4xl mx-auto">
          {visibleIndices.map((absIdx, pos) => {
            const isCenter = pos === 1;
            return (
              <div
                key={absIdx}
                onClick={() => (isCenter ? toggleFlip(absIdx) : pos === 0 ? prev() : next())}
                style={{
                  width: isCenter ? "320px" : "220px",
                  height: isCenter ? "280px" : "220px",
                  perspective: "1000px",
                  opacity: isCenter ? 1 : 0.4,
                  transform: isCenter ? "scale(1)" : "scale(0.85)",
                  filter: isCenter ? "none" : "blur(1.5px)",
                  cursor: "pointer",
                  transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                  zIndex: isCenter ? 2 : 1,
                }}
                className="relative hidden sm:block"
              >
                {/* 3D Flip Card */}
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    transformStyle: "preserve-3d",
                    transform: flipped[absIdx] ? "rotateY(180deg)" : "rotateY(0deg)",
                    transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  {/* Front Side */}
                  <div
                    className="absolute inset-0 backface-hidden rounded-2xl flex flex-col items-center justify-center p-6 text-center"
                    style={{
                      background: "linear-gradient(135deg, rgba(249,168,212,0.15), rgba(196,181,253,0.2))",
                      border: "1px solid rgba(249,168,212,0.3)",
                      backdropFilter: "blur(20px)",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                    }}
                  >
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mb-4 text-3xl"
                      style={{
                        background: "rgba(249,168,212,0.18)",
                        border: "1px solid rgba(249,168,212,0.3)",
                      }}
                    >
                      {REASON_EMOJIS[absIdx % REASON_EMOJIS.length]}
                    </div>
                    <span className="font-display text-2xl font-bold gradient-text mb-1">
                      Reason #{absIdx + 1}
                    </span>
                    {isCenter && (
                      <p className="text-pink-200/50 text-[11px] mt-4 tracking-wider uppercase animate-pulse select-none">
                        Click to Flip ✨
                      </p>
                    )}
                  </div>

                  {/* Back Side */}
                  <div
                    className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl flex flex-col items-center justify-center p-6 text-center"
                    style={{
                      background: "linear-gradient(135deg, rgba(196,181,253,0.2), rgba(249,168,212,0.15))",
                      border: "1px solid rgba(196,181,253,0.35)",
                      backdropFilter: "blur(20px)",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                    }}
                  >
                    <div className="text-2xl mb-3">💝</div>
                    <p className="text-white text-base md:text-lg leading-relaxed font-medium select-none">
                      {reasons[absIdx].text}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Mobile view (Single centered card layout, no side previews) */}
          <div
            onClick={() => toggleFlip(currentIndex)}
            style={{
              width: "290px",
              height: "260px",
              perspective: "1000px",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            className="block sm:hidden"
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                transformStyle: "preserve-3d",
                transform: flipped[currentIndex] ? "rotateY(180deg)" : "rotateY(0deg)",
                transition: "transform 0.6s ease",
              }}
            >
              {/* Mobile Front */}
              <div
                className="absolute inset-0 backface-hidden rounded-2xl flex flex-col items-center justify-center p-5 text-center"
                style={{
                  background: "linear-gradient(135deg, rgba(249,168,212,0.15), rgba(196,181,253,0.2))",
                  border: "1px solid rgba(249,168,212,0.3)",
                  backdropFilter: "blur(20px)",
                }}
              >
                <div className="w-14 h-14 rounded-full flex items-center justify-center mb-3 text-2xl bg-pink-300/10 border border-pink-300/20">
                  {REASON_EMOJIS[currentIndex % REASON_EMOJIS.length]}
                </div>
                <span className="font-display text-xl font-bold gradient-text mb-1">
                  Reason #{currentIndex + 1}
                </span>
                <p className="text-pink-200/50 text-[10px] mt-2 animate-pulse select-none">
                  Tap to Reveal ✨
                </p>
              </div>

              {/* Mobile Back */}
              <div
                className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl flex flex-col items-center justify-center p-5 text-center"
                style={{
                  background: "linear-gradient(135deg, rgba(196,181,253,0.2), rgba(249,168,212,0.15))",
                  border: "1px solid rgba(196,181,253,0.3)",
                  backdropFilter: "blur(20px)",
                }}
              >
                <div className="text-xl mb-2">💝</div>
                <p className="text-white text-sm leading-relaxed font-medium">
                  {reasons[currentIndex].text}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation controllers */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <button
            onClick={prev}
            className="w-12 h-12 rounded-full flex items-center justify-center text-pink-300 btn-hover"
            style={{
              background: "rgba(249,168,212,0.12)",
              border: "1px solid rgba(249,168,212,0.25)",
              cursor: "pointer",
            }}
            aria-label="Previous reason"
          >
            ←
          </button>
          <div className="flex gap-1.5">
            {reasons.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="rounded-full"
                style={{
                  width: i === currentIndex ? 20 : 8,
                  height: 8,
                  background:
                    i === currentIndex
                      ? "linear-gradient(90deg, #F9A8D4, #C4B5FD)"
                      : "rgba(255,255,255,0.2)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
                aria-label={`Go to reason ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="w-12 h-12 rounded-full flex items-center justify-center text-pink-300 btn-hover"
            style={{
              background: "rgba(249,168,212,0.12)",
              border: "1px solid rgba(249,168,212,0.25)",
              cursor: "pointer",
            }}
            aria-label="Next reason"
          >
            →
          </button>
        </div>
        <p className="text-center text-pink-300/50 text-sm mt-4 select-none">
          {currentIndex + 1} of {reasons.length} reasons
        </p>
      </div>
    </section>
  );
}
