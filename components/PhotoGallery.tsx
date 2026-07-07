"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { gallery } from "@/lib/data";
import MemoryCard from "./MemoryCard";
import SectionTitle from "./SectionTitle";

export default function PhotoGallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const open = (i: number) => setLightboxIndex(i);
  const close = () => setLightboxIndex(null);
  const prev = () => setLightboxIndex((i) => (i !== null ? (i - 1 + gallery.length) % gallery.length : null));
  const next = () => setLightboxIndex((i) => (i !== null ? (i + 1) % gallery.length : null));

  const isOpen = lightboxIndex !== null;

  if (!mounted) return null;

  return (
    <section id="gallery" className="relative py-24 overflow-hidden">
      {/* Decorative background blur */}
      <div
        className="absolute bottom-0 right-0 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(249,168,212,0.07) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      <div className="section-container">
        <SectionTitle
          title="Our Gallery"
          subtitle="Every photo tells a piece of our story"
          emoji="📸"
        />

        {/* Responsive Grid with Centered Content (Restored) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto justify-center place-items-center">
          {gallery.map((photo, i) => (
            <div
              key={photo.id}
              className={`${
                i >= 3 ? "lg:col-span-1 lg:translate-x-[50%]" : ""
              } flex justify-center`}
              style={{ width: "100%" }}
            >
              <div className="w-full max-w-[320px]">
                <MemoryCard
                  src={photo.src}
                  alt={photo.alt}
                  index={i}
                  onClick={() => open(i)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <div
        className="fixed inset-0 z-[80] flex items-center justify-center p-4"
        style={{
          background: "rgba(5,2,16,0.95)",
          backdropFilter: isOpen ? "blur(20px)" : "none",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity 0.3s ease",
        }}
        onClick={close}
      >
        <div
          style={{
            transform: isOpen ? "scale(1) translateY(0)" : "scale(0.88) translateY(20px)",
            opacity: isOpen ? 1 : 0,
            transition: "transform 0.35s cubic-bezier(.34,1.56,.64,1), opacity 0.3s ease",
            maxWidth: 500,
            width: "100%",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {lightboxIndex !== null && (
            <div
              className="bg-white p-4 pb-14 rounded-2xl mx-auto relative"
              style={{
                boxShadow: "0 0 60px rgba(249,168,212,0.3), 0 30px 80px rgba(0,0,0,0.6)",
              }}
            >
              <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-purple-950">
                <Image
                  src={gallery[lightboxIndex].src}
                  alt={gallery[lightboxIndex].alt}
                  fill
                  className="object-cover"
                  sizes="500px"
                  priority
                />
              </div>
              <p className="absolute bottom-4 left-0 right-0 text-center text-gray-700 text-base font-display italic font-semibold select-none">
                {gallery[lightboxIndex].alt}
              </p>
            </div>
          )}
        </div>

        {/* Prev / Next controls */}
        <button
          className="fixed left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center text-pink-300 border border-pink-400/30 btn-hover"
          style={{ background: "rgba(249,168,212,0.15)", cursor: "pointer" }}
          onClick={(e) => {
            e.stopPropagation();
            prev();
          }}
          aria-label="Previous photo"
        >
          ←
        </button>
        <button
          className="fixed right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center text-pink-300 border border-pink-400/30 btn-hover"
          style={{ background: "rgba(249,168,212,0.15)", cursor: "pointer" }}
          onClick={(e) => {
            e.stopPropagation();
            next();
          }}
          aria-label="Next photo"
        >
          →
        </button>

        {/* Close */}
        <button
          className="fixed top-6 right-6 w-11 h-11 rounded-full flex items-center justify-center text-white border border-white/10 btn-hover"
          style={{ background: "rgba(255,255,255,0.1)", cursor: "pointer" }}
          onClick={close}
          aria-label="Close lightbox"
        >
          ✕
        </button>

        {lightboxIndex !== null && (
          <div
            className="fixed bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full text-xs font-semibold text-pink-300"
            style={{
              background: "rgba(30,27,75,0.85)",
              border: "1px solid rgba(249,168,212,0.25)",
            }}
          >
            {lightboxIndex + 1} / {gallery.length}
          </div>
        )}
      </div>
    </section>
  );
}
