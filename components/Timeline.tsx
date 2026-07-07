"use client";

import Image from "next/image";
import { timeline } from "@/lib/data";
import { useInView } from "@/lib/hooks";
import SectionTitle from "./SectionTitle";

export default function Timeline() {
  const [timelineRef, timelineInView] = useInView({ threshold: 0.05 });

  return (
    <section id="story" className="relative py-24 overflow-hidden">
      {/* Background decoration */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(196,181,253,0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="section-container">
        <SectionTitle
          title="Our Story"
          subtitle="Every chapter of us, written in stardust"
          emoji="📖"
        />

        {/* Vertical Timeline container */}
        <div ref={timelineRef} className="relative max-w-4xl mx-auto mt-16 px-4">
          {/* Vertical glowing center line */}
          <div
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 pointer-events-none"
            style={{
              background: "linear-gradient(180deg, transparent, rgba(249,168,212,0.6) 20%, rgba(196,181,253,0.6) 80%, transparent)",
              boxShadow: "0 0 10px rgba(249,168,212,0.4)",
            }}
          />

          {timeline.map((event, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={event.id}
                className={`relative flex flex-col md:flex-row items-start md:items-center justify-between mb-16 last:mb-0`}
              >
                {/* Node dot on the line */}
                <div
                  className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full -translate-x-1/2 bg-gradient-to-r from-pink-300 to-lavender z-10 top-6 md:top-1/2 md:-translate-y-1/2"
                  style={{
                    boxShadow: "0 0 12px rgba(249, 168, 212, 0.8)",
                  }}
                />

                {/* Left block (Desktop empty spacer or card) */}
                <div
                  className={`w-full md:w-[45%] pl-10 md:pl-0 ${
                    isEven ? "md:text-right md:order-1" : "md:order-2"
                  } ${timelineInView ? "in-view-fade-up" : ""}`}
                  style={{
                    opacity: timelineInView ? 1 : 0,
                    animationDelay: `${index * 0.2}s`,
                    transition: "opacity 0.6s ease",
                  }}
                >
                  <div
                    className="glass-card overflow-hidden card-hover"
                    style={{
                      border: "1px solid rgba(249, 168, 212, 0.2)",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                    }}
                  >
                    {/* Event image */}
                    <div className="relative h-56 w-full overflow-hidden">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 400px"
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background: "linear-gradient(to top, rgba(15,10,35,0.85) 10%, transparent)",
                        }}
                      />
                      <div
                        className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-xl"
                        style={{
                          background: "rgba(30,27,75,0.8)",
                          backdropFilter: "blur(8px)",
                          border: "1px solid rgba(255,255,255,0.1)",
                        }}
                      >
                        {event.emoji}
                      </div>
                    </div>

                    {/* Card text body */}
                    <div className="p-6 text-left">
                      <span
                        className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3"
                        style={{
                          background: "rgba(249,168,212,0.12)",
                          color: "#F9A8D4",
                          border: "1px solid rgba(249,168,212,0.2)",
                        }}
                      >
                        {event.date}
                      </span>
                      <h3 className="font-display text-2xl font-bold text-white mb-2 leading-tight">
                        {event.title}
                      </h3>
                      <p className="text-pink-100/70 text-sm leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right empty spacer (Desktop only) */}
                <div className="hidden md:block w-[45%] md:order-2" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
