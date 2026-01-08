"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame
} from "framer-motion";
import { wrap } from "@motionone/utils";
import Image from "next/image";

// Image Paths (Hardcoded based on filesystem)
const images = [
  "/projects/aurum/WhatsApp Image 2025-08-01 at 11.01.17 AM.jpeg",
  "/projects/beachcleanup/00db8c9d61661d50ef61f74bcb76b6e6.jpg",
  "/projects/brandboost/0bd12c0caf70ee59c54d28c63c8ee713.jpg",
  "/projects/suwadivi/7be4e95f1b7649249144940bbf38d103.jpg",
  "/projects/ashirwadapooja/790e29afdf7e7be317617c82a6b33d9c.jpg",
  "/projects/aurum/WhatsApp Image 2025-08-01 at 11.01.25 AM.jpeg",
  "/projects/beachcleanup/61a2690a3f913516a9e9dfc4ecf3f8c9.jpg",
  "/projects/brandboost/0e19c6a1ac3a9289afd04b951e8b3d3c.jpg"
];

interface ParallaxProps {
  children: React.ReactNode;
  baseVelocity: number;
}

function ParallaxText({ children, baseVelocity = 100 }: ParallaxProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden m-0 whitespace-nowrap flex flex-nowrap">
      <motion.div className="flex flex-nowrap gap-4 md:gap-8" style={{ x }}>
        <div className="flex gap-4 md:gap-8">{children}</div>
        <div className="flex gap-4 md:gap-8">{children}</div>
        <div className="flex gap-4 md:gap-8">{children}</div>
        <div className="flex gap-4 md:gap-8">{children}</div>
      </motion.div>
    </div>
  );
}

export default function Showcase() {
  return (
    <section className="relative py-20 bg-obsidian overflow-hidden">
       {/* Background Glow */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[40vw] bg-eminence-gold/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="mb-12 text-center relative z-10 px-4">
        <h3 className="text-eminence-gold font-bold tracking-[0.2em] uppercase text-sm mb-2">
          Our Impact in Motion
        </h3>
        <p className="text-slate-400 max-w-lg mx-auto">
          A glimpse into the moments that define our service.
        </p>
      </div>

      <div className="flex flex-col gap-4 md:gap-8">
        {/* Row 1: Left to Right */}
        <ParallaxText baseVelocity={-0.5}>
          {images.map((src, i) => (
            <div key={i} className="relative w-[300px] h-[200px] md:w-[450px] md:h-[300px] flex-shrink-0 rounded-2xl overflow-hidden glass-panel border border-white/5 grayscale hover:grayscale-0 transition-all duration-500 hover:scale-[1.02]">
              <Image
                src={src}
                alt={`Gallery image ${i}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 300px, 450px"
              />
              <div className="absolute inset-0 bg-royal-blue/10 mix-blend-overlay" />
            </div>
          ))}
        </ParallaxText>

        {/* Row 2: Right to Left */}
        <ParallaxText baseVelocity={0.5}>
           {images.slice().reverse().map((src, i) => (
            <div key={i} className="relative w-[300px] h-[200px] md:w-[450px] md:h-[300px] flex-shrink-0 rounded-2xl overflow-hidden glass-panel border border-white/5 grayscale hover:grayscale-0 transition-all duration-500 hover:scale-[1.02]">
              <Image
                src={src}
                alt={`Gallery image ${i}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 300px, 450px"
              />
               <div className="absolute inset-0 bg-eminence-gold/10 mix-blend-overlay" />
            </div>
          ))}
        </ParallaxText>
      </div>
    </section>
  );
}
