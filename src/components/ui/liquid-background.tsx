"use client";

import { motion } from "framer-motion";

export default function LiquidBackground() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-obsidian pointer-events-none">
      {/* Deepest Background Layer */}
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-[#050B14] to-obsidian opacity-90" />

      {/* Blob 1: Royal Blue - Top Left */}
      <motion.div
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -50, 50, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-royal-blue/20 blur-[120px] mix-blend-screen"
      />

      {/* Blob 2: Eminence Gold - Bottom Right */}
      <motion.div
        animate={{
          x: [0, -100, 50, 0],
          y: [0, 50, -50, 0],
          scale: [1, 1.3, 0.8, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-eminence-gold/10 blur-[100px] mix-blend-screen"
      />

      {/* Blob 3: Accent Blue - Center */}
      <motion.div
        animate={{
          x: [0, 50, -50, 0],
          y: [0, 30, -30, 0],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
        className="absolute top-[30%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-royal-blue-glow/15 blur-[90px] mix-blend-overlay"
      />
    </div>
  );
}
