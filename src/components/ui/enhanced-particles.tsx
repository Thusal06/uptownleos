"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
  pulseSpeed: number;
  pulsePhase: number;
}

interface EnhancedParticlesProps {
  count?: number;
  interactive?: boolean;
  connectionDistance?: number;
  colors?: string[];
}

export default function EnhancedParticles({
  count = 100,
  interactive = true,
  connectionDistance = 150,
  colors = ["#3b82f6", "#60a5fa", "#38bdf8", "#0ea5e9"],
}: EnhancedParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>(0);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [paused, setPaused] = useState(false);

  // Initialize dimensions and visibility listeners
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };

    const onVisibility = () => setPaused(document.hidden);

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.removeEventListener("resize", updateDimensions);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  // Initialize particles (respect reduced motion)
  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;

    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const effectiveCount = prefersReduced ? Math.min(10, count) : count;

    const particles: Particle[] = [];
    for (let i = 0; i < effectiveCount; i++) {
      particles.push({
        id: i,
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        size: Math.random() * 2.5 + 0.8,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4,
        opacity: Math.random() * 0.5 + 0.25,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }
    particlesRef.current = particles;
  }, [count, dimensions, colors]);

  // Mouse interaction
  useEffect(() => {
    if (!interactive) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [interactive]);

  // Animation loop with FPS cap and DPR scaling
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.style.width = `${dimensions.width}px`;
    canvas.style.height = `${dimensions.height}px`;
    canvas.width = Math.floor(dimensions.width * dpr);
    canvas.height = Math.floor(dimensions.height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const targetFPS = interactive ? 45 : 30;
    const frameInterval = 1000 / targetFPS;
    let lastTime = performance.now();

    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      const now = performance.now();
      const delta = now - lastTime;
      if (delta < frameInterval || paused) return;
      lastTime = now - (delta % frameInterval);

      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;
      const time = now * 0.001;

      for (let index = 0; index < particles.length; index++) {
        const particle = particles[index];
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap around edges
        if (particle.x < 0) particle.x = dimensions.width;
        if (particle.x > dimensions.width) particle.x = 0;
        if (particle.y < 0) particle.y = dimensions.height;
        if (particle.y > dimensions.height) particle.y = 0;

        // Mouse interaction
        if (interactive) {
          const dx = mouse.x - particle.x;
          const dy = mouse.y - particle.y;
          const distance = Math.hypot(dx, dy);
          if (distance < 100 && distance > 0.0001) {
            const force = (100 - distance) / 100;
            particle.x -= (dx / distance) * force * 2;
            particle.y -= (dy / distance) * force * 2;
          }
        }

        // Pulsing effect
        const pulse = Math.sin(time * 2 * particle.pulseSpeed + particle.pulsePhase) * 0.25 + 1;
        const currentSize = particle.size * pulse;
        const currentOpacity = particle.opacity * pulse;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, currentSize, 0, Math.PI * 2);
        ctx.fillStyle = particle.color + Math.floor(currentOpacity * 255).toString(16).padStart(2, "0");
        ctx.fill();

        // Lightweight connections (skip if few particles)
        if (particles.length > 8) {
          for (let j = index + 1; j < Math.min(index + 3, particles.length); j++) {
            const other = particles[j];
            const dx = other.x - particle.x;
            const dy = other.y - particle.y;
            const distance = Math.hypot(dx, dy);
            if (distance < connectionDistance * 0.5) {
              const opacity = (1 - distance / (connectionDistance * 0.5)) * 0.18;
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(other.x, other.y);
              ctx.strokeStyle = particle.color + Math.floor(opacity * 255).toString(16).padStart(2, "0");
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [dimensions, interactive, connectionDistance, paused]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ mixBlendMode: "screen" }}
    />
  );
}

// Service Impact Particles Component
export function ServiceImpactParticles() {
  const [impactEvents, setImpactEvents] = useState<Array<{
    id: number;
    x: number;
    y: number;
    type: "service" | "donation" | "member" | "project";
    timestamp: number;
  }>>([]);

  useEffect(() => {
    // Simulate impact events
    const interval = setInterval(() => {
      const types: Array<"service" | "donation" | "member" | "project"> = [
        "service",
        "donation",
        "member",
        "project",
      ];

      setImpactEvents((prev) => [
        ...prev.slice(-10), // Keep only last 10 events
        {
          id: Date.now(),
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          type: types[Math.floor(Math.random() * types.length)],
          timestamp: Date.now(),
        },
      ]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getEventColor = (type: string) => {
    switch (type) {
      case "service":
        return "#ef4444";
      case "donation":
        return "#22c55e";
      case "member":
        return "#3b82f6";
      case "project":
        return "#f59e0b";
      default:
        return "#8b5cf6";
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case "service":
        return "❤️";
      case "donation":
        return "💰";
      case "member":
        return "👤";
      case "project":
        return "🎯";
      default:
        return "✨";
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none">
      {impactEvents.map((event) => (
        <motion.div
          key={event.id}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.5, 1], opacity: [0, 1, 0] }}
          transition={{ duration: 3, ease: "easeOut" }}
          className="absolute"
          style={{
            left: event.x,
            top: event.y,
            color: getEventColor(event.type),
          }}
        >
          <div className="relative">
            <div className="text-2xl animate-ping absolute inset-0">
              {getEventIcon(event.type)}
            </div>
            <div className="text-2xl relative">
              {getEventIcon(event.type)}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}