"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { gifts } from "@/lib/data";
import { useInView } from "@/lib/hooks";
import SectionTitle from "./SectionTitle";

function GiftCard({
  gift,
  index,
  opened,
  onClick,
}: {
  gift: typeof gifts[0];
  index: number;
  opened: boolean;
  onClick: () => void;
}) {
  const [ref, inView] = useInView();

  return (
    <div
      ref={ref}
      className={`flex justify-center ${inView ? "in-view-fade-up" : ""}`}
      style={{
        opacity: inView ? 1 : 0,
        animationDelay: `${index * 0.1}s`,
        transition: "opacity 0.6s ease",
        width: "100%",
      }}
    >
      <button
        className="w-full max-w-[220px] aspect-square rounded-2xl flex flex-col items-center justify-center gap-3 relative overflow-hidden group btn-hover"
        style={{
          background: `linear-gradient(135deg, ${
            gift.id === 1 ? "rgba(236,72,153,0.35), rgba(168,85,247,0.35)" :
            gift.id === 2 ? "rgba(124,58,237,0.35), rgba(99,102,241,0.35)" :
            "rgba(219,39,119,0.35), rgba(236,72,153,0.35)"
          })`,
          border: opened
            ? "2px solid rgba(249,168,212,0.6)"
            : "1px solid rgba(255,255,255,0.15)",
          backdropFilter: "blur(20px)",
          cursor: "pointer",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
        }}
        onClick={onClick}
        id={`gift-box-${gift.id}`}
      >
        {/* Ribbon bands */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-full opacity-30 group-hover:opacity-60 transition-opacity duration-300"
          style={{ background: gift.ribbonColor }}
        />
        <div
          className="absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2 opacity-30 group-hover:opacity-60 transition-opacity duration-300"
          style={{ background: gift.ribbonColor }}
        />

        {/* Bow */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 text-3xl pointer-events-none transform group-hover:scale-110 transition-transform">
          🎀
        </div>

        <div className="relative z-10 mt-6 flex flex-col items-center">
          <div className="text-4xl mb-2 animate-bounce" style={{ animationDuration: "2.5s" }}>
            {gift.emoji}
          </div>
          <p className="text-white text-sm font-bold px-2 text-center leading-tight">
            {gift.title}
          </p>
          {opened && (
            <div
              className="mt-1 text-[11px] font-semibold text-center tracking-wide"
              style={{ color: "#F9A8D4" }}
            >
              ✓ Opened
            </div>
          )}
        </div>
      </button>
    </div>
  );
}

/**
 * GiftBoxes — Three clickable gift boxes that pop-reveal a memory.
 */
export default function GiftBoxes() {
  const [openGift, setOpenGift] = useState<number | null>(null);
  const [opened, setOpened] = useState<Set<number>>(new Set());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleOpen = (id: number) => {
    setOpened((prev) => new Set(prev).add(id));
    setOpenGift(id);
  };

  const isOpen = openGift !== null;
  const activeGift = gifts.find((g) => g.id === openGift);

  if (!mounted) return null;

  return (
    <section id="gifts" className="relative py-24 overflow-hidden">
      {/* Decorative center glowing orb */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(196,181,253,0.07) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      <div className="section-container">
        <SectionTitle
          title="Gift Boxes"
          subtitle="Three special surprises, wrapped up just for you"
          emoji="🎁"
        />

        {/* Symmetric 3-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto justify-center px-4">
          {gifts.map((gift, i) => (
            <GiftCard
              key={gift.id}
              gift={gift}
              index={i}
              opened={opened.has(gift.id)}
              onClick={() => handleOpen(gift.id)}
            />
          ))}
        </div>
      </div>

      {/* Gift reveal modal overlay */}
      <div
        className="fixed inset-0 z-[80] flex items-center justify-center p-4"
        style={{
          background: "rgba(5,2,16,0.92)",
          backdropFilter: isOpen ? "blur(20px)" : "none",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity 0.3s ease",
        }}
        onClick={() => setOpenGift(null)}
      >
        {/* Modal Card */}
        <div
          style={{
            maxWidth: 420,
            width: "100%",
            transform: isOpen ? "scale(1) rotate(0deg)" : "scale(0.85) rotate(-5deg)",
            opacity: isOpen ? 1 : 0,
            transition: "transform 0.35s cubic-bezier(.34,1.56,.64,1), opacity 0.3s ease",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {activeGift && (
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: "rgba(15,10,35,0.96)",
                border: "1px solid rgba(249,168,212,0.3)",
                boxShadow: "0 0 80px rgba(249,168,212,0.25), 0 40px 100px rgba(0,0,0,0.6)",
              }}
            >
              {/* Image header */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={activeGift.image}
                  alt={activeGift.title}
                  fill
                  className="object-cover"
                  sizes="420px"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(to top, rgba(15,10,35,0.95), transparent)`,
                  }}
                />
                {/* Gift emoji overlay */}
                <div className="absolute top-4 right-4 text-4xl">
                  {activeGift.emoji}
                </div>
              </div>

              {/* Message card body */}
              <div className="p-8 text-center flex flex-col items-center">
                <h3 className="font-display text-3xl font-bold gradient-text mb-4">
                  {activeGift.title}
                </h3>
                <p className="text-pink-100/90 leading-relaxed text-sm md:text-base max-w-sm">
                  {activeGift.memory}
                </p>

                <button
                  className="mt-6 px-8 py-3 rounded-xl text-white font-bold transition-all hover:opacity-85 btn-hover"
                  style={{
                    background: "linear-gradient(135deg, #EC4899, #8B5CF6)",
                    cursor: "pointer",
                    boxShadow: "0 4px 15px rgba(236,72,153,0.3)",
                  }}
                  onClick={() => setOpenGift(null)}
                >
                  Close Surprises ❤️
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
