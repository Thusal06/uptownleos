"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { MouseEvent } from "react";
import Image from "next/image";

export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 pb-32"
    >
      {/* Dynamic Spotlight Effect Wrapper */}
      <div
        className="group relative max-w-5xl w-full mx-auto px-4 perspective-1000"
        onMouseMove={handleMouseMove}
      >
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 glass-panel rounded-3xl p-12 md:p-20 text-center overflow-hidden border border-white/5"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {/* Spotlight Gradient */}
          <motion.div
            className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
            style={{
              background: useMotionTemplate`
                radial-gradient(
                  650px circle at ${mouseX}px ${mouseY}px,
                  rgba(255, 255, 255, 0.1),
                  transparent 80%
                )
              `,
            }}
          />

          {/* Logo / Badge */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center mb-8"
          >
             <div className="relative w-24 h-24 md:w-32 md:h-32 drop-shadow-[0_0_35px_rgba(14,165,233,0.4)]">
               <Image 
                 src="/logo.png" 
                 alt="LLCCUE Logo" 
                 fill 
                 className="object-contain"
                 priority
               />
             </div>
          </motion.div>

          {/* Main Title */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/50 mb-6 drop-shadow-2xl">
            LEAD.
            <br className="md:hidden" /> <span className="text-eminence-gold/90">SERVE.</span>
            <br className="md:hidden" /> UPLIFT.
          </h1>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 font-light leading-relaxed mb-10">
            Leo Lions Club of Colombo Uptown Eminence <br/>
            <span className="text-slate-300">Amplify youth leadership through immersive service ecosystems.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#leadership"
              className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white font-medium transition-all duration-300 hover:scale-105 backdrop-blur-md"
            >
              Explore Leadership
            </a>
            <a
              href="#projects"
              className="px-8 py-4 bg-royal-blue/20 hover:bg-royal-blue/30 border border-royal-blue/30 rounded-full text-blue-200 font-medium transition-all duration-300 hover:scale-105 backdrop-blur-md"
            >
              View Projects
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs uppercase tracking-[0.2em] text-slate-500">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-12 bg-gradient-to-b from-transparent via-eminence-gold to-transparent"
        />
      </motion.div>
    </section>
  );
}