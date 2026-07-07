"use client";

import { useState } from "react";

// Background layers
import StarsBackground from "@/components/StarsBackground";
import FloatingHearts from "@/components/FloatingHearts";

// UI
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import MusicPlayer from "@/components/MusicPlayer";

// Sections
import Hero from "@/components/Hero";
import Timeline from "@/components/Timeline";
import PhotoGallery from "@/components/PhotoGallery";
import ReasonsCarousel from "@/components/ReasonsCarousel";
import LetterSection from "@/components/LetterSection";
import GiftBoxes from "@/components/GiftBoxes";
import MiniGame from "@/components/MiniGame";
import Countdown from "@/components/Countdown";
import BirthdayCake from "@/components/BirthdayCake";
import FinalSurprise from "@/components/FinalSurprise";

/**
 * Home page — the full interactive birthday love story.
 */
export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {/* Loading screen — fades out via CSS transition */}
      <LoadingScreen loading={loading} onComplete={() => setLoading(false)} />

      {/* Main site */}
      <div
        style={{
          opacity: loading ? 0 : 1,
          transition: "opacity 0.6s ease",
          pointerEvents: loading ? "none" : "auto",
        }}
      >
        {/* Fixed background layers */}
        <StarsBackground />
        <FloatingHearts />

        {/* Floating UI */}
        <Navbar />
        <MusicPlayer />

        {/* Page sections */}
        <main>
          <Hero />
          <div className="section-divider" />
          <Timeline />
          <div className="section-divider" />
          <PhotoGallery />
          <div className="section-divider" />
          <ReasonsCarousel />
          <div className="section-divider" />
          <LetterSection />
          <div className="section-divider" />
          <GiftBoxes />
          <div className="section-divider" />
          <MiniGame />
          <div className="section-divider" />
          <Countdown />
          <div className="section-divider" />
          <BirthdayCake />
          <div className="section-divider" />
          <FinalSurprise />
        </main>

        <footer className="text-center py-8 text-pink-300/30 text-sm">
          <p>Made with ❤️, just for you</p>
        </footer>
      </div>
    </>
  );
}
