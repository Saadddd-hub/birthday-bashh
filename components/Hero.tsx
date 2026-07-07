"use client";

/**
 * Hero — Full-screen landing section.
 * Fixes layout overlaps on mobile/tablet viewports, aligns CTA button perfectly,
 * and adds modern glowing states and refined scroll hint transitions.
 */
export default function Hero() {
  const scrollToStory = () => {
    document.getElementById("story")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-[100vh] flex flex-col items-center justify-between text-center px-4 py-20 overflow-hidden"
    >
      {/* Decorative Orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-72 md:w-96 h-72 md:h-96 rounded-full pointer-events-none float-bob"
        style={{
          background: "radial-gradient(circle, rgba(249,168,212,0.15) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-64 md:w-80 h-64 md:h-80 rounded-full pointer-events-none float-bob"
        style={{
          background: "radial-gradient(circle, rgba(196,181,253,0.15) 0%, transparent 70%)",
          filter: "blur(40px)",
          animationDelay: "1.5s",
        }}
      />

      {/* spacer to push content down slightly to center it */}
      <div className="h-10 md:h-16" />

      {/* Main content area */}
      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center justify-center flex-grow py-8">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-xs md:text-sm font-semibold text-pink-300 mount-fade-up d-3"
          style={{
            background: "rgba(249,168,212,0.12)",
            border: "1px solid rgba(249,168,212,0.25)",
            backdropFilter: "blur(10px)",
          }}
        >
          <span>✨</span>
          <span>Something special awaits</span>
          <span>✨</span>
        </div>

        {/* Headline */}
        <h1
          className="font-display text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight mount-fade-up d-5"
        >
          <span className="shimmer-text">Hey Beautiful</span>
          <br />
          <span className="text-4xl md:text-5xl lg:text-6xl font-bold" style={{ color: "rgba(255,255,255,0.9)" }}>
            ❤️
          </span>
        </h1>

        {/* Sub-headline with secure spacing */}
        <p
          className="text-lg md:text-2xl text-pink-100/70 font-light mb-8 md:mb-12 max-w-md md:max-w-xl mx-auto leading-relaxed mount-fade-up d-8"
        >
          I made something just for you...
          <br />
          <span className="text-sm md:text-base text-pink-200/50 mt-2 block">
            A love story told in pixels and petals
          </span>
        </p>

        {/* Redesigned CTA Button */}
        <div className="mount-scale-in d-10 py-2">
          <button
            onClick={scrollToStory}
            className="group relative inline-flex items-center justify-center gap-3 px-8 md:px-10 py-4 md:py-5 rounded-full font-bold text-base md:text-lg overflow-hidden btn-hover btn-glow text-white"
            style={{
              background: "linear-gradient(135deg, #EC4899, #8B5CF6)",
              boxShadow: "0 0 30px rgba(236, 72, 153, 0.4), 0 0 60px rgba(139, 92, 246, 0.2)",
              border: "1px solid rgba(255,255,255,0.15)",
              cursor: "pointer",
            }}
            id="begin-story-btn"
          >
            {/* Inner shimmer layer */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
              }}
            />
            <span className="relative">Begin Our Story</span>
            {/* Arrow wrapper with alignment */}
            <span className="relative flex items-center justify-center text-lg md:text-xl transform group-hover:translate-x-1.5 transition-transform duration-300">
              →
            </span>
          </button>
        </div>
      </div>

      {/* Scroll indicator with secure spacing below everything */}
      <div
        className="relative z-10 w-full flex flex-col items-center gap-2 text-pink-300/40 text-xs mt-6 mount-fade-in d-20 select-none"
      >
        <span>Scroll to explore</span>
        <div
          className="w-0.5 h-8"
          style={{
            background: "linear-gradient(to bottom, rgba(249,168,212,0.4), transparent)",
            animation: "scroll-indicator 1.8s ease-in-out infinite",
          }}
        />
      </div>

      {/* Custom keyframes injection for scroll animation */}
      <style jsx global>{`
        @keyframes scroll-indicator {
          0% { transform: scaleY(0); transform-origin: top; opacity: 0; }
          40% { transform: scaleY(1); transform-origin: top; opacity: 0.8; }
          80% { transform: scaleY(1); transform-origin: bottom; opacity: 0.8; }
          100% { transform: scaleY(0); transform-origin: bottom; opacity: 0; }
        }
      `}</style>

      {/* Floating background decorations */}
      {[
        { emoji: "💕", left: "8%", top: "25%" },
        { emoji: "✨", left: "28%", top: "12%" },
        { emoji: "🌸", left: "72%", top: "15%" },
        { emoji: "💖", left: "88%", top: "32%" },
        { emoji: "⭐", left: "15%", top: "68%" },
      ].map((item, i) => (
        <span
          key={i}
          className="absolute text-2xl md:text-3xl pointer-events-none float-bob"
          style={{
            left: item.left,
            top: item.top,
            animationDelay: `${i * 0.6}s`,
            opacity: 0.45,
          }}
        >
          {item.emoji}
        </span>
      ))}
    </section>
  );
}
