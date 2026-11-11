import React, { useEffect, useRef } from "react";

const GRID_SIZE = 32;

// Aesthetic celebratory palette matching the pink & gold grid theme
const GLOW_COLORS = [
  "#ff4d6d", // Hot pink
  "#ff758c", // Soft rose
  "#f72585", // Berry magenta
  "#ffd166", // Champagne gold
  "#ff85a2", // Pastel blush
  "#06d6a0", // Mint sparkle
  "#e76077", // Coral crimson
];

// Speeds that divide 32 evenly so particles ALWAYS land on exact grid intersections
const VALID_SPEEDS = [1, 2, 2, 2, 4];

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

interface DotParticle {
  x: number;
  y: number;
  dir: Direction;
  speed: number;
  color: string;
  size: number;
  trail: { x: number; y: number }[];
  maxTrail: number;
  life: number;
  maxLife: number;
}

export default function GridRunners() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Number of active dots (fewer on mobile for peak performance)
    const isMobile = width < 768;
    const PARTICLE_COUNT = isMobile ? 16 : 30;

    const createParticle = (spawnRandomLocation = true): DotParticle => {
      const maxCols = Math.max(1, Math.floor(width / GRID_SIZE));
      const maxRows = Math.max(1, Math.floor(height / GRID_SIZE));

      // Choose an exact grid line coordinate
      const col = Math.floor(Math.random() * maxCols);
      const row = Math.floor(Math.random() * maxRows);

      const dirs: Direction[] = ["UP", "DOWN", "LEFT", "RIGHT"];
      const dir = dirs[Math.floor(Math.random() * dirs.length)];
      const speed = VALID_SPEEDS[Math.floor(Math.random() * VALID_SPEEDS.length)];
      const color = GLOW_COLORS[Math.floor(Math.random() * GLOW_COLORS.length)];
      const maxLife = 180 + Math.floor(Math.random() * 220); // 3 to 7 seconds

      return {
        x: spawnRandomLocation ? col * GRID_SIZE : 0,
        y: spawnRandomLocation ? row * GRID_SIZE : 0,
        dir,
        speed,
        color,
        size: Math.random() > 0.6 ? 3.5 : 2.5,
        trail: [],
        maxTrail: 10 + Math.floor(Math.random() * 12),
        life: maxLife,
        maxLife,
      };
    };

    // Initialize particles
    const particles: DotParticle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(createParticle(true));
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p, idx) => {
        // Calculate fade opacity
        const fadeRatio = p.life / p.maxLife;
        let alpha = 1;
        if (fadeRatio > 0.85) {
          alpha = (1 - fadeRatio) / 0.15; // Fade in
        } else if (fadeRatio < 0.2) {
          alpha = fadeRatio / 0.2; // Fade out
        }
        alpha = Math.max(0, Math.min(1, alpha));

        // Save current point in trail
        p.trail.unshift({ x: p.x, y: p.y });
        if (p.trail.length > p.maxTrail) {
          p.trail.pop();
        }

        // Draw light trail along the grid line
        if (p.trail.length > 1) {
          ctx.beginPath();
          ctx.moveTo(p.trail[0].x, p.trail[0].y);
          for (let i = 1; i < p.trail.length; i++) {
            ctx.lineTo(p.trail[i].x, p.trail[i].y);
          }
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 1.8;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.globalAlpha = alpha * 0.45;
          ctx.stroke();
        }

        // Draw glowing head dot
        ctx.save();
        ctx.globalAlpha = alpha * 0.9;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 10;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Inner bright white spark for high-tech jewel glow
        ctx.shadowBlur = 2;
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Move particle along current direction
        switch (p.dir) {
          case "RIGHT":
            p.x += p.speed;
            break;
          case "LEFT":
            p.x -= p.speed;
            break;
          case "DOWN":
            p.y += p.speed;
            break;
          case "UP":
            p.y -= p.speed;
            break;
        }

        // Check if currently at a grid intersection
        const isAtIntersection = p.x % GRID_SIZE === 0 && p.y % GRID_SIZE === 0;

        if (isAtIntersection) {
          // 25% chance to make a sharp 90-degree turn along the grid!
          if (Math.random() < 0.25) {
            if (p.dir === "LEFT" || p.dir === "RIGHT") {
              p.dir = Math.random() > 0.5 ? "UP" : "DOWN";
            } else {
              p.dir = Math.random() > 0.5 ? "LEFT" : "RIGHT";
            }
          }
        }

        // Screen boundaries - reverse direction or turn
        if (p.x <= 0) {
          p.x = 0;
          p.dir = "RIGHT";
        } else if (p.x >= width) {
          p.x = width;
          p.dir = "LEFT";
        }
        if (p.y <= 0) {
          p.y = 0;
          p.dir = "DOWN";
        } else if (p.y >= height) {
          p.y = height;
          p.dir = "UP";
        }

        // Decrease life
        p.life -= 1;
        if (p.life <= 0) {
          // Respawn anew
          particles[idx] = createParticle(true);
        }
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 w-full h-full"
    />
  );
}
