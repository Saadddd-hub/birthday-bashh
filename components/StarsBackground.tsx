"use client";

import { useEffect, useRef } from "react";

/**
 * StarsBackground — Canvas-based animated starfield.
 * Stars twinkle and gently drift to create depth.
 */
export default function StarsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    // Create stars
    const STAR_COUNT = 200;
    interface Star {
      x: number;
      y: number;
      r: number;
      alpha: number;
      speed: number;
      twinkleSpeed: number;
      twinkleOffset: number;
      drift: number;
    }

    const stars: Star[] = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.5 + 0.5,
      alpha: Math.random(),
      speed: Math.random() * 0.003 + 0.001,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      twinkleOffset: Math.random() * Math.PI * 2,
      drift: (Math.random() - 0.5) * 0.1,
    }));

    // Occasional shooting star
    interface ShootingStar {
      x: number;
      y: number;
      len: number;
      speed: number;
      alpha: number;
      angle: number;
    }
    let shootingStars: ShootingStar[] = [];
    let frame = 0;

    function spawnShootingStar() {
      shootingStars.push({
        x: Math.random() * width,
        y: Math.random() * height * 0.5,
        len: Math.random() * 120 + 60,
        speed: Math.random() * 8 + 4,
        alpha: 1,
        angle: Math.PI / 6,
      });
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height);

      // Background gradient
      const bg = ctx!.createLinearGradient(0, 0, 0, height);
      bg.addColorStop(0, "#050210");
      bg.addColorStop(0.5, "#0a0518");
      bg.addColorStop(1, "#0f0720");
      ctx!.fillStyle = bg;
      ctx!.fillRect(0, 0, width, height);

      // Draw stars
      stars.forEach((star, i) => {
        const alpha = 0.3 + 0.7 * Math.abs(Math.sin(frame * star.twinkleSpeed + star.twinkleOffset));
        star.x += star.drift;
        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;

        ctx!.beginPath();
        ctx!.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        const hue = i % 3 === 0 ? "249, 168, 212" : i % 3 === 1 ? "196, 181, 253" : "255, 255, 255";
        ctx!.fillStyle = `rgba(${hue}, ${alpha})`;
        ctx!.fill();
      });

      // Draw shooting stars
      shootingStars = shootingStars.filter((s) => s.alpha > 0);
      shootingStars.forEach((s) => {
        ctx!.save();
        ctx!.globalAlpha = s.alpha;
        const gradient = ctx!.createLinearGradient(
          s.x, s.y,
          s.x - Math.cos(s.angle) * s.len,
          s.y - Math.sin(s.angle) * s.len
        );
        gradient.addColorStop(0, "rgba(249, 168, 212, 1)");
        gradient.addColorStop(1, "rgba(196, 181, 253, 0)");
        ctx!.strokeStyle = gradient;
        ctx!.lineWidth = 1.5;
        ctx!.beginPath();
        ctx!.moveTo(s.x, s.y);
        ctx!.lineTo(s.x - Math.cos(s.angle) * s.len, s.y - Math.sin(s.angle) * s.len);
        ctx!.stroke();
        ctx!.restore();

        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.alpha -= 0.015;
      });

      // Spawn shooting stars occasionally
      if (frame % 300 === 0 && Math.random() > 0.4) spawnShootingStar();

      frame++;
      animationId = requestAnimationFrame(draw);
    }

    draw();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.9 }}
    />
  );
}
