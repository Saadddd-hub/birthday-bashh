"use client";

import { useInView } from "@/lib/hooks";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  emoji?: string;
}

export default function SectionTitle({ title, subtitle, emoji }: SectionTitleProps) {
  const [ref, inView] = useInView();

  return (
    <div
      ref={ref}
      className={`text-center mb-12 md:mb-16 ${inView ? "in-view-fade-up" : ""}`}
      style={{ opacity: inView ? undefined : 0 }}
    >
      {emoji && (
        <div className="text-5xl mb-4 inline-block float-bob">{emoji}</div>
      )}
      <h2
        className="font-display text-4xl md:text-5xl lg:text-6xl font-bold gradient-text mb-4"
        style={{ lineHeight: 1.2 }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg md:text-xl text-pink-200/70 max-w-xl mx-auto font-light">
          {subtitle}
        </p>
      )}
      {/* Decorative line */}
      <div
        className={`flex items-center justify-center gap-3 mt-6 ${inView ? "in-view-fade-in d-3" : ""}`}
        style={{ opacity: inView ? undefined : 0 }}
      >
        <div className="h-px w-16 bg-gradient-to-r from-transparent to-pink-400" />
        <div className="w-2 h-2 rounded-full bg-pink-400" />
        <div className="h-px w-32 bg-gradient-to-r from-pink-400 to-violet-400" />
        <div className="w-2 h-2 rounded-full bg-violet-400" />
        <div className="h-px w-16 bg-gradient-to-r from-violet-400 to-transparent" />
      </div>
    </div>
  );
}
