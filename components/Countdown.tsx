"use client";

import { useState, useEffect } from "react";
import { countdownDate } from "@/lib/data";
import SectionTitle from "./SectionTitle";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(target: string): TimeLeft {
  const diff = new Date(target).getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

interface FlipCardProps {
  value: number;
  label: string;
}

function FlipCard({ value, label }: FlipCardProps) {
  return (
    <div
      className="flex flex-col items-center gap-2 btn-hover"
      style={{ transition: "transform 0.25s ease" }}
    >
      <div
        className="relative w-20 h-20 md:w-28 md:h-28 rounded-2xl flex items-center justify-center overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(249,168,212,0.15), rgba(196,181,253,0.2))",
          border: "1px solid rgba(249,168,212,0.25)",
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Top half */}
        <div
          className="absolute top-0 left-0 right-0 h-1/2 flex items-end justify-center pb-0.5 overflow-hidden"
          style={{
            background: "rgba(0,0,0,0.15)",
            borderBottom: "1px solid rgba(0,0,0,0.3)",
          }}
        >
          <span className="font-display text-3xl md:text-5xl font-black gradient-text leading-none">
            {String(value).padStart(2, "0")}
          </span>
        </div>
        {/* Bottom half */}
        <div className="absolute bottom-0 left-0 right-0 h-1/2 flex items-start justify-center pt-0.5 overflow-hidden">
          <span className="font-display text-3xl md:text-5xl font-black gradient-text leading-none">
            {String(value).padStart(2, "0")}
          </span>
        </div>

        {/* Glow overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(249,168,212,0.1), transparent 70%)",
          }}
        />
      </div>
      <span className="text-pink-300/70 text-xs md:text-sm uppercase tracking-widest font-medium">
        {label}
      </span>
    </div>
  );
}

/**
 * Countdown — Animated countdown to the target birthday date set in data.ts.
 */
export default function Countdown() {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isBirthday, setIsBirthday] = useState(false);

  useEffect(() => {
    setMounted(true);
    const initialTl = calculateTimeLeft(countdownDate);
    setTimeLeft(initialTl);
    if (initialTl.days === 0 && initialTl.hours === 0 && initialTl.minutes === 0 && initialTl.seconds === 0) {
      setIsBirthday(true);
    }

    const interval = setInterval(() => {
      const tl = calculateTimeLeft(countdownDate);
      setTimeLeft(tl);
      if (tl.days === 0 && tl.hours === 0 && tl.minutes === 0 && tl.seconds === 0) {
        setIsBirthday(true);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="countdown" className="relative py-24 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, rgba(249,168,212,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="section-container">
        <SectionTitle
          title="Counting Down"
          subtitle="Every second brings you closer to your special day"
          emoji="⏰"
        />

        {!mounted ? (
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 opacity-50">
            <FlipCard value={0} label="Days" />
            <div className="text-4xl font-bold gradient-text pb-6">:</div>
            <FlipCard value={0} label="Hours" />
            <div className="text-4xl font-bold gradient-text pb-6">:</div>
            <FlipCard value={0} label="Minutes" />
            <div className="text-4xl font-bold gradient-text pb-6">:</div>
            <FlipCard value={0} label="Seconds" />
          </div>
        ) : isBirthday ? (
          <div
            className="text-center mount-scale-in"
            style={{ transition: "transform 0.5s ease" }}
          >
            <p className="text-6xl mb-4">🎉🎂🎉</p>
            <h3 className="font-display text-4xl font-bold shimmer-text">
              It&apos;s Your Birthday!
            </h3>
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
            <FlipCard value={timeLeft.days} label="Days" />
            <div className="text-4xl font-bold gradient-text pb-6">:</div>
            <FlipCard value={timeLeft.hours} label="Hours" />
            <div className="text-4xl font-bold gradient-text pb-6">:</div>
            <FlipCard value={timeLeft.minutes} label="Minutes" />
            <div className="text-4xl font-bold gradient-text pb-6">:</div>
            <FlipCard value={timeLeft.seconds} label="Seconds" />
          </div>
        )}

        {/* Date display */}
        <p
          className="text-center text-pink-300/50 text-sm mt-8 mount-fade-in d-5"
        >
          Counting down to{" "}
          <span className="text-pink-300">
            {new Date(countdownDate).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </p>
      </div>
    </section>
  );
}
