import React, { useEffect, useRef } from "react";

const GRID_SIZE = 32;

// Romantic & celebratory heart color palette
const HEART_COLORS = [
  "#ff4d6d", // Vibrant rose
  "#ff758f", // Soft petal pink
  "#f72585", // Berry magenta
  "#ff5c8a", // Romantic blush
  "#ff85a1", // Pastel blossom
  "#ffb703", // Champagne golden heart
  "#e75480", // Classic deep pink
];

// Slower, graceful speeds that divide 32 evenly (64, 40, or 32 frames per grid cell)
const VALID_SPEEDS = [0.5, 0.8, 1.0];

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

interface HeartParticle {
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
  pulseOffset: number;
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

    // Number of active hearts
    const isMobile = width < 768;
    const PARTICLE_COUNT = isMobile ? 14 : 26;

    const createHeart = (spawnRandomLocation = true): HeartParticle => {
      const maxCols = Math.max(1, Math.floor(width / GRID_SIZE));
      const maxRows = Math.max(1, Math.floor(height / GRID_SIZE));

      const col = Math.floor(Math.random() * maxCols);
      const row = Math.floor(Math.random() * maxRows);

      const dirs: Direction[] = ["UP", "DOWN", "LEFT", "RIGHT"];
      const dir = dirs[Math.floor(Math.random() * dirs.length)];
      const speed = VALID_SPEEDS[Math.floor(Math.random() * VALID_SPEEDS.length)];
      const color = HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)];
      const maxLife = 260 + Math.floor(Math.random() * 260); // 4 to 8 seconds

      return {
        x: spawnRandomLocation ? col * GRID_SIZE : 0,
        y: spawnRandomLocation ? row * GRID_SIZE : 0,
        dir,
        speed,
        color,
        size: isMobile ? 4.5 : 5.5,
        trail: [],
        maxTrail: 10 + Math.floor(Math.random() * 10),
        life: maxLife,
        maxLife,
        pulseOffset: Math.random() * Math.PI * 2,
      };
    };

    const particles: HeartParticle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(createHeart(true));
    }

    // Draw a neat symmetrical heart centered at (0, 0)
    const drawHeart = (
      c: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      scale: number,
      color: string,
      alpha: number
    ) => {
      c.save();
      c.translate(cx, cy);
      c.globalAlpha = alpha;
      c.shadowColor = color;
      c.shadowBlur = 8;
      c.fillStyle = color;

      const s = scale * 0.25;
      c.beginPath();
      c.moveTo(0, -1.2 * s);
      // Left curve
      c.bezierCurveTo(-2.8 * s, -4.8 * s, -6 * s, -1.2 * s, 0, 5 * s);
      // Right curve
      c.bezierCurveTo(6 * s, -1.2 * s, 2.8 * s, -4.8 * s, 0, -1.2 * s);
      c.fill();

      // Tiny inner sparkle highlight
      c.shadowBlur = 1;
      c.fillStyle = "#ffffff";
      c.globalAlpha = alpha * 0.7;
      c.beginPath();
      c.arc(0, -0.4 * s, s * 0.75, 0, Math.PI * 2);
      c.fill();

      c.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p, idx) => {
        // Calculate smooth fade-in and fade-out
        const fadeRatio = p.life / p.maxLife;
        let alpha = 1;
        if (fadeRatio > 0.85) {
          alpha = (1 - fadeRatio) / 0.15;
        } else if (fadeRatio < 0.18) {
          alpha = fadeRatio / 0.18;
        }
        alpha = Math.max(0, Math.min(1, alpha));

        // Save position in trail
        p.trail.unshift({ x: p.x, y: p.y });
        if (p.trail.length > p.maxTrail) {
          p.trail.pop();
        }

        // Draw soft fading trail along the grid line
        if (p.trail.length > 1) {
          ctx.beginPath();
          ctx.moveTo(p.trail[0].x, p.trail[0].y);
          for (let i = 1; i < p.trail.length; i++) {
            ctx.lineTo(p.trail[i].x, p.trail[i].y);
          }
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 1.6;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.globalAlpha = alpha * 0.35;
          ctx.stroke();
        }

        // Heart gentle pulse scale
        const pulse = 1 + 0.15 * Math.sin(p.life * 0.08 + p.pulseOffset);
        const currentSize = p.size * pulse;

        // Draw the heart
        drawHeart(ctx, p.x, p.y, currentSize, p.color, alpha * 0.9);

        // Move heart along the grid line (slow and gentle)
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

        // Check if at a 32px grid intersection (with floating precision check)
        const nearGridX = Math.abs(p.x - Math.round(p.x / GRID_SIZE) * GRID_SIZE) < 0.05;
        const nearGridY = Math.abs(p.y - Math.round(p.y / GRID_SIZE) * GRID_SIZE) < 0.05;

        if (nearGridX && nearGridY) {
          // Snap strictly to the intersection line
          p.x = Math.round(p.x / GRID_SIZE) * GRID_SIZE;
          p.y = Math.round(p.y / GRID_SIZE) * GRID_SIZE;

          // 28% chance to turn at corners
          if (Math.random() < 0.28) {
            if (p.dir === "LEFT" || p.dir === "RIGHT") {
              p.dir = Math.random() > 0.5 ? "UP" : "DOWN";
            } else {
              p.dir = Math.random() > 0.5 ? "LEFT" : "RIGHT";
            }
          }
        }

        // Screen boundary checks
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

        // Lifecycle
        p.life -= 1;
        if (p.life <= 0) {
          particles[idx] = createHeart(true);
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
