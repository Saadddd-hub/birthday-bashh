"use client";

import { useState } from "react";
import { letters } from "@/lib/data";
import SectionTitle from "./SectionTitle";

export default function LetterSection() {
  const [isOpen, setIsOpen] = useState(false);
  const letter = letters[0]; // Exactly one handwritten letter experience

  return (
    <section id="letters" className="relative py-24 overflow-hidden">
      {/* Decorative gradients */}
      <div
        className="absolute top-0 left-0 w-96 h-96 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(249,168,212,0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="section-container">
        <SectionTitle
          title="Open When..."
          subtitle="A single handwritten envelope waiting for you"
          emoji="💌"
        />

        {/* Centered Envelope Card */}
        <div className="max-w-md mx-auto mt-12 px-4 flex justify-center">
          <button
            onClick={() => setIsOpen(true)}
            className="w-full text-left group relative overflow-hidden rounded-2xl p-8 card-hover"
            style={{
              background: "linear-gradient(135deg, rgba(30,27,75,0.85), rgba(76,29,149,0.55))",
              border: "1px solid rgba(249,168,212,0.3)",
              backdropFilter: "blur(24px)",
              boxShadow: "0 15px 35px rgba(0,0,0,0.4), 0 0 25px rgba(249,168,212,0.1)",
              cursor: "pointer",
            }}
            id="letter-1"
          >
            {/* Envelope flap decor */}
            <div
              className="absolute top-0 left-0 right-0 h-20 opacity-30 group-hover:opacity-50"
              style={{
                background: "linear-gradient(135deg, #F9A8D4, transparent)",
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                transition: "opacity 0.3s ease",
              }}
            />

            {/* Letter Content preview details */}
            <div className="relative z-10 text-center py-6">
              <div
                className="text-6xl mb-6 inline-block"
                style={{ animation: "float-bob 3s ease-in-out infinite" }}
              >
                ✉️
              </div>
              <p
                className="text-xs uppercase tracking-widest font-semibold mb-2"
                style={{ color: "rgba(249,168,212,0.7)" }}
              >
                To My Dearest ❤️
              </p>
              <h3 className="font-display text-2xl font-bold text-white leading-snug">
                {letter?.occasion || "A Handwritten Letter For You"}
              </h3>
              <div
                className="mt-6 inline-flex items-center gap-2 text-sm text-pink-300 border border-pink-400/20 px-5 py-2.5 rounded-full bg-pink-500/10 group-hover:bg-pink-500/20"
                style={{ transition: "all 0.3s ease" }}
              >
                <span>Open Envelope</span>
                <span className="group-hover:translate-x-1" style={{ transition: "transform 0.2s" }}>
                  →
                </span>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Unfolding Handwritten Paper Modal */}
      <div
        className="fixed inset-0 z-[80] flex items-center justify-center p-4"
        style={{
          background: "rgba(5,2,16,0.93)",
          backdropFilter: isOpen ? "blur(20px)" : "none",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity 0.4s ease",
        }}
        onClick={() => setIsOpen(false)}
      >
        <div
          style={{
            maxWidth: 520,
            width: "100%",
            transform: isOpen ? "scale(1) rotate(0deg) translateY(0)" : "scale(0.8) rotate(-8deg) translateY(40px)",
            opacity: isOpen ? 1 : 0,
            transition: "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {letter && (
            <div
              className="rounded-2xl overflow-hidden relative"
              style={{
                background: "linear-gradient(160deg, #FDFBF7, #F5EFEB)",
                boxShadow: "0 40px 100px rgba(0,0,0,0.6), 0 0 60px rgba(249,168,212,0.25)",
                border: "1px solid rgba(0,0,0,0.08)",
              }}
            >
              {/* Paper header decoration (Pink top band + romantic heart ribbon) */}
              <div
                className="h-3 w-full bg-gradient-to-r from-pink-300 via-rose-400 to-lavender"
              />

              {/* Paper Body */}
              <div className="px-8 md:px-12 py-10">
                <div className="text-right text-xs md:text-sm text-gray-400 font-sans mb-6 tracking-wide select-none">
                  {new Date().toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>

                {/* Ruled lines background container */}
                <div className="relative">
                  {/* Subtle paper line rules */}
                  <div className="absolute inset-0 pointer-events-none flex flex-col gap-[32px] pt-[30px]">
                    {[...Array(9)].map((_, i) => (
                      <div
                        key={i}
                        className="w-full border-b border-rose-100/50"
                      />
                    ))}
                  </div>

                  {/* Handwritten Content */}
                  <p
                    className="relative text-gray-800 text-xl md:text-2xl whitespace-pre-line z-10 leading-[32px] font-handwritten select-text"
                    style={{
                      fontFamily: "var(--font-handwritten), cursive, sans-serif",
                    }}
                  >
                    {letter.content}
                  </p>
                </div>

                {/* Signature spacing */}
                <div className="mt-12 text-right">
                  <p
                    className="text-2xl md:text-3xl text-rose-500 font-handwritten italic"
                    style={{
                      fontFamily: "var(--font-handwritten), cursive, sans-serif",
                    }}
                  >
                    Forever Yours ❤️
                  </p>
                </div>
              </div>

              {/* Envelope Close button */}
              <button
                className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:text-rose-500 hover:bg-rose-50 border border-gray-200/50 bg-white/70 btn-hover"
                onClick={() => setIsOpen(false)}
                aria-label="Close letter"
                style={{ cursor: "pointer" }}
              >
                ✕
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
