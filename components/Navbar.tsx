"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { music } from "@/lib/data";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Story", href: "#story" },
  { label: "Gallery", href: "#gallery" },
  { label: "Letters", href: "#letters" },
  { label: "Gifts", href: "#gifts" },
  { label: "Game", href: "#game" },
  { label: "Countdown", href: "#countdown" },
  { label: "Cake", href: "#cake" },
  { label: "Finale", href: "#finale" },
];

export default function Navbar() {
  const [active, setActive] = useState("#home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  // Audio player states
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [hasAudio, setHasAudio] = useState(false);

  useEffect(() => {
    // Slide in after a short delay
    const t = setTimeout(() => setVisible(true), 600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = NAV_LINKS.map((l) => l.href.replace("#", ""));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActive(`#${id}`);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Autoplay/Play on first page interaction (click/tap)
  useEffect(() => {
    const startAudio = () => {
      const audio = audioRef.current;
      if (audio && !playing) {
        audio.play()
          .then(() => {
            setPlaying(true);
            removeListeners();
          })
          .catch(() => {});
      }
    };

    const removeListeners = () => {
      document.removeEventListener("click", startAudio);
      document.removeEventListener("touchstart", startAudio);
    };

    document.addEventListener("click", startAudio);
    document.addEventListener("touchstart", startAudio);

    return () => {
      removeListeners();
    };
  }, [playing]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.onerror = () => setHasAudio(false);
    audio.oncanplay = () => setHasAudio(true);

    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
        setCurrentTime(audio.currentTime);
      }
    };

    const setDur = () => setDuration(audio.duration);
    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", setDur);
    audio.addEventListener("ended", () => setPlaying(false));

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", setDur);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    audio.currentTime = pct * audio.duration;
  };

  const handleNavClick = (href: string) => {
    setActive(href);
    setMenuOpen(false);
    document.getElementById(href.replace("#", ""))?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <audio ref={audioRef} src={music.src} preload="none" />

      {/* Desktop Unified Header */}
      <nav
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 hidden lg:block w-[95%] max-w-7xl"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(-30px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        <div
          className="flex items-center justify-between px-6 py-3 rounded-full glass-card"
          style={{
            background: scrolled ? "rgba(30,27,75,0.85)" : "rgba(30,27,75,0.5)",
            border: "1px solid rgba(249,168,212,0.25)",
            boxShadow: scrolled
              ? "0 10px 30px rgba(0,0,0,0.5), 0 0 20px rgba(249,168,212,0.15)"
              : "0 4px 20px rgba(0,0,0,0.2)",
            transition: "all 0.3s ease",
          }}
        >
          {/* Brand Logo */}
          <div className="flex items-center gap-2">
            <span className="text-xl font-display font-bold gradient-text tracking-wide select-none">
              With Love ❤️
            </span>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="relative px-4 py-2 text-xs font-semibold rounded-full transition-all duration-300 hover:text-pink-300"
                style={{
                  color: active === link.href ? "#F9A8D4" : "rgba(255,255,255,0.7)",
                  background: active === link.href ? "rgba(249,168,212,0.12)" : "transparent",
                  border: active === link.href ? "1px solid rgba(249,168,212,0.25)" : "1px solid transparent",
                  cursor: "pointer",
                }}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Integrated Mini Music Player */}
          <div
            className="flex items-center gap-3 px-4 py-1.5 rounded-full"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(249, 168, 212, 0.15)",
            }}
          >
            {/* Album Cover & Track Title */}
            <div className="flex items-center gap-2">
              <div
                className="relative w-8 h-8 rounded-full overflow-hidden"
                style={{
                  border: "1px solid rgba(249, 168, 212, 0.3)",
                  animation: playing ? "spin-vinyl 4s linear infinite" : "none",
                }}
              >
                <Image
                  src={music.cover}
                  alt="Album cover"
                  fill
                  className="object-cover"
                  sizes="32px"
                />
              </div>
              <div className="text-left leading-none">
                <p className="text-white text-[11px] font-bold tracking-tight select-none">
                  {music.title}
                </p>
                <p className="text-pink-300/60 text-[9px] select-none">
                  {playing ? "Playing" : "Paused"}
                </p>
              </div>
            </div>

            {/* Micro progress bar */}
            <div
              className="w-16 h-1 rounded-full cursor-pointer relative overflow-hidden bg-white/10"
              onClick={handleProgressClick}
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-pink-300 to-lavender"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Audio Controls */}
            <div className="flex items-center gap-1.5">
              {/* Play / Pause */}
              <button
                onClick={togglePlay}
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs bg-pink-500/20 text-pink-300 border border-pink-400/30 btn-hover"
                style={{ cursor: "pointer" }}
                aria-label={playing ? "Pause" : "Play"}
              >
                {playing ? "⏸" : "▶"}
              </button>
              {/* Mute / Unmute */}
              <button
                onClick={toggleMute}
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs bg-white/5 text-white/70 border border-white/10 btn-hover"
                style={{ cursor: "pointer" }}
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? "🔇" : "🔊"}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sticky Floating Header & Hamburg Toggle */}
      <div
        className="fixed top-4 left-4 right-4 z-50 flex items-center justify-between lg:hidden"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 0.6s ease",
        }}
      >
        {/* Mobile branding background bar */}
        <div
          className="flex items-center justify-between w-full px-4 py-2.5 rounded-full"
          style={{
            background: "rgba(30, 27, 75, 0.85)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(249, 168, 212, 0.2)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
          }}
        >
          <span className="text-sm font-display font-bold gradient-text">
            With Love ❤️
          </span>

          {/* Compact audio control */}
          <div className="flex items-center gap-2">
            <button
              onClick={togglePlay}
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs bg-pink-500/20 text-pink-300 border border-pink-400/30"
              style={{ cursor: "pointer" }}
            >
              {playing ? "⏸" : "▶"}
            </button>
            
            {/* Hamburger button */}
            <button
              className="w-8 h-8 flex flex-col items-center justify-center gap-1 bg-white/5 rounded-full border border-white/10"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle navigation menu"
              style={{ cursor: "pointer" }}
            >
              <div
                className="w-4 h-0.5 rounded-full bg-pink-300"
                style={{
                  transform: menuOpen ? "rotate(45deg) translate(2.5px, 4px)" : "none",
                  transition: "transform 0.25s ease",
                }}
              />
              <div
                className="w-4 h-0.5 rounded-full bg-pink-300"
                style={{
                  opacity: menuOpen ? 0 : 1,
                  transition: "opacity 0.2s ease",
                }}
              />
              <div
                className="w-4 h-0.5 rounded-full bg-pink-300"
                style={{
                  transform: menuOpen ? "rotate(-45deg) translate(2.5px, -4px)" : "none",
                  transition: "transform 0.25s ease",
                }}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Full Screen overlay menu dropdown */}
      <div
        className="fixed inset-x-4 top-20 z-40 lg:hidden rounded-2xl p-5"
        style={{
          background: "rgba(15,10,35,0.96)",
          backdropFilter: "blur(24px)",
          border: "1px solid rgba(249, 168, 212, 0.25)",
          boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
          opacity: menuOpen ? 1 : 0,
          transform: menuOpen ? "translateY(0) scale(1)" : "translateY(-12px) scale(0.96)",
          pointerEvents: menuOpen ? "auto" : "none",
          transition: "opacity 0.25s ease, transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div className="grid grid-cols-3 gap-2.5 mb-4">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="px-3 py-3 rounded-xl text-[13px] font-bold text-center"
              style={{
                background: active === link.href ? "rgba(249, 168, 212, 0.2)" : "rgba(255,255,255,0.04)",
                color: active === link.href ? "#F9A8D4" : "rgba(255,255,255,0.7)",
                border: active === link.href ? "1px solid rgba(249, 168, 212, 0.3)" : "1px solid transparent",
                transition: "all 0.2s ease",
                cursor: "pointer",
              }}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Music Player status panel inside mobile menu */}
        <div
          className="p-3 rounded-xl flex items-center justify-between"
          style={{
            background: "rgba(255, 255, 255, 0.03)",
            border: "1px solid rgba(249, 168, 212, 0.1)",
          }}
        >
          <div className="flex items-center gap-2.5">
            <div
              className="relative w-8 h-8 rounded-full overflow-hidden"
              style={{
                animation: playing ? "spin-vinyl 4s linear infinite" : "none",
              }}
            >
              <Image
                src={music.cover}
                alt="Album cover"
                fill
                className="object-cover"
              />
            </div>
            <div className="text-left leading-tight">
              <p className="text-white text-xs font-bold">{music.title}</p>
              <p className="text-pink-300/60 text-[10px]">{music.artist}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={togglePlay}
              className="px-5 py-2 rounded-full text-xs font-bold bg-pink-500/20 text-pink-300 border border-pink-400/30"
              style={{ cursor: "pointer" }}
            >
              {playing ? "Pause" : "Play"}
            </button>
            <button
              onClick={toggleMute}
              className="p-2.5 rounded-full bg-white/5 text-white/70 text-xs border border-white/10"
              style={{ cursor: "pointer" }}
            >
              {isMuted ? "🔇" : "🔊"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
