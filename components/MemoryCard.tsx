"use client";

import Image from "next/image";
import { useInView } from "@/lib/hooks";

interface MemoryCardProps {
  src: string;
  alt: string;
  index: number;
  onClick: () => void;
}

export default function MemoryCard({ src, alt, index, onClick }: MemoryCardProps) {
  const [ref, inView] = useInView();

  return (
    <div
      ref={ref}
      className={`relative cursor-pointer group rounded-2xl overflow-hidden shadow-lg ${
        inView ? "in-view-fade-up" : ""
      }`}
      style={{
        opacity: inView ? 1 : 0,
        animationDelay: `${index * 0.08}s`,
        transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease",
      }}
      onClick={onClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.04) translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 20px 40px rgba(249, 168, 212, 0.25)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1) translateY(0)";
        e.currentTarget.style.boxShadow = "0 8px 30px rgba(0, 0, 0, 0.3)";
      }}
    >
      {/* Polaroid outer frame */}
      <div className="bg-white p-3 pb-8 h-full flex flex-col rounded-2xl">
        {/* Aspect Ratio locked to perfectly uniform square */}
        <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-purple-950">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 300px"
          />
        </div>

        {/* Text Area */}
        <div className="mt-4 text-center">
          <p className="text-gray-600 text-sm font-display italic font-semibold select-none truncate px-1">
            {alt}
          </p>
        </div>
      </div>

      {/* Subtle overlay border */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          border: "1px solid rgba(255, 255, 255, 0.15)",
        }}
      />
    </div>
  );
}
