"use client";

import { motion } from "framer-motion";

interface LiquidLoadingProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function LiquidLoading({ size = "md", className = "" }: LiquidLoadingProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16"
  };

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      {/* Outer liquid blob */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: "linear-gradient(135deg, rgba(59, 130, 246, 0.8), rgba(14, 165, 233, 0.6))",
          filter: "blur(0.5px)"
        }}
        animate={{
          scale: [1, 1.2, 1],
          borderRadius: ["50%", "40% 60% 50% 40%", "50%"],
          rotate: [0, 180, 360]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Inner liquid blob */}
      <motion.div
        className="absolute inset-2 rounded-full"
        style={{
          background: "linear-gradient(135deg, rgba(96, 165, 250, 0.9), rgba(56, 189, 248, 0.7))"
        }}
        animate={{
          scale: [1, 0.8, 1],
          borderRadius: ["50%", "60% 40% 60% 40%", "50%"],
          rotate: [0, -180, -360]
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Core center */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{
          scale: [1, 0.9, 1]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div
          className="rounded-full bg-white"
          style={{
            width: size === "sm" ? "8px" : size === "md" ? "12px" : "16px",
            height: size === "sm" ? "8px" : size === "md" ? "12px" : "16px"
          }}
        />
      </motion.div>
    </div>
  );
}

interface LiquidPulseProps {
  children: React.ReactNode;
  className?: string;
}

export function LiquidPulse({ children, className = "" }: LiquidPulseProps) {
  return (
    <div className={`relative ${className}`}>
      <motion.div
        className="absolute inset-0 rounded-inherit"
        style={{
          background: "linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(14, 165, 233, 0.2))"
        }}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.3, 0.1, 0.3]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <div className="relative">
        {children}
      </div>
    </div>
  );
}

interface LiquidBlobProps {
  className?: string;
  color?: "blue" | "purple" | "green";
}

export function LiquidBlob({ className = "", color = "blue" }: LiquidBlobProps) {
  const colorGradients = {
    blue: "linear-gradient(135deg, rgba(59, 130, 246, 0.6), rgba(14, 165, 233, 0.4))",
    purple: "linear-gradient(135deg, rgba(147, 51, 234, 0.6), rgba(196, 181, 253, 0.4))",
    green: "linear-gradient(135deg, rgba(34, 197, 94, 0.6), rgba(134, 239, 172, 0.4))"
  };

  return (
    <motion.div
      className={`absolute rounded-full ${className}`}
      style={{
        background: colorGradients[color],
        filter: "blur(1px)"
      }}
      animate={{
        scale: [1, 1.3, 0.8, 1.2, 1],
        borderRadius: ["50%", "40% 60% 50% 40%", "60% 40% 60% 40%", "50%"],
        rotate: [0, 90, 180, 270, 360]
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
}