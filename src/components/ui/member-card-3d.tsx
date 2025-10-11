"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Award, X, Mail, Calendar, Quote, BookOpen } from "lucide-react";
import { createPortal } from "react-dom";

interface Officer3D {
  name: string;
  role: string;
  avatar: string;
  biography: string;
  background: string;
  achievements: string[];
  joinedYear: string;
  email: string;
  quote: string;
}

interface MemberCard3DProps {
  officer: Officer3D;
  index: number;
}

function AnimatedMemberCard({ officer, index }: MemberCard3DProps) {
  const [hovered, setHovered] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [showProfile, setShowProfile] = useState(false);

  // Removed continuous rotation animation for performance

  return (
    <motion.div
      className="relative h-96 w-full"
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.div
        className="absolute inset-0 rounded-3xl border border-sky-500/30 bg-gradient-to-br from-slate-900/80 via-slate-800/60 to-slate-900/80 backdrop-blur-xl overflow-hidden cursor-pointer"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transformStyle: "preserve-3d",
          boxShadow: hovered
            ? "0 25px 80px rgba(56, 189, 248, 0.4), 0 0 120px rgba(56, 189, 248, 0.2)"
            : "0 20px 60px rgba(15, 118, 255, 0.18)",
        }}
        animate={{
          rotateX: hovered ? [-2, 2, -2] : 0,
          rotateY: hovered ? [-2, 2, -2] : 0,
        }}
        transition={{
          duration: hovered ? 3 : 0,
          repeat: hovered ? Infinity : 0,
          ease: "easeInOut",
        }}
        onClick={() => setShowProfile(true)}
      >
        {/* Holographic overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(45deg, transparent 30%, rgba(56, 189, 248, 0.1) 50%, transparent 70%),
              linear-gradient(-45deg, transparent 30%, rgba(168, 85, 247, 0.1) 50%, transparent 70%)
            `,
            backgroundPosition: "200% 0%",
            animation: "shimmer 3s ease-in-out infinite",
          }}
        />

        {/* Glowing border */}
        <div
          className="absolute inset-0 rounded-3xl"
          style={{
            padding: "2px",
            backgroundImage: hovered
              ? "linear-gradient(45deg, #3b82f6, #8b5cf6, #06b6d4, #3b82f6)"
              : "linear-gradient(45deg, #1e40af, #1e3a8a, #1e40af)",
            backgroundSize: hovered ? "200% 200%" : "100% 100%",
            backgroundPosition: hovered ? "0% 50%" : "0% 0%",
            animation: hovered ? "gradient-shift 2s ease infinite" : "none",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col">
          {/* Large Image */}
          <div className="flex-1 relative overflow-hidden rounded-3xl">
            <Image
              src={officer.avatar}
              alt={officer.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />

            {/* Gradient Overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

            {/* Text at bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <motion.h3
                className="text-xl font-bold text-white mb-1"
                animate={{
                  textShadow: hovered ? "0 0 20px rgba(56, 189, 248, 0.8)" : "none",
                }}
              >
                {officer.name}
              </motion.h3>
              <p className="text-sm text-sky-300 font-medium">{officer.role}</p>
            </div>
          </div>
        </div>

              </motion.div>

      {/* Profile Modal */}
      {showProfile && createPortal(
        <div
          className="fixed inset-0 z-50 w-screen h-screen bg-slate-950/90 backdrop-blur-md"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowProfile(false);
            }
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-6xl max-h-[90vh] overflow-hidden rounded-3xl border border-white/10 bg-slate-900/95 shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative border-b border-white/10 pb-4">
              <button
                onClick={() => setShowProfile(false)}
                className="absolute top-0 right-0 p-3 rounded-full border border-white/10 bg-white/10 text-slate-300 hover:border-sky-400/60 hover:bg-white/20 transition-colors z-10"
              >
                <X className="h-6 w-6" />
              </button>

              <div className="text-center pr-12">
                <h2 className="text-3xl font-bold text-white mb-2">{officer.name}</h2>
                <p className="text-xl text-sky-300">{officer.role}</p>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-8 modal-scrollbar">
              {/* Profile Header with Image */}
              <div className="flex flex-col sm:flex-row items-center gap-6 mb-10">
                <div className="relative flex-shrink-0">
                  <Image
                    src={officer.avatar}
                    alt={officer.name}
                    width={200}
                    height={200}
                    className="rounded-3xl border-2 border-sky-500/30 shadow-xl w-32 h-32 sm:w-48 sm:h-48 lg:w-56 lg:h-56"
                  />
                  <div className="absolute -bottom-3 -right-3 h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-green-400 border-3 border-slate-900 animate-pulse" />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-slate-300 mb-4">
                    <div className="flex items-center justify-center sm:justify-start gap-2">
                      <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-sky-400" />
                      <span className="text-sm sm:text-base">{officer.email}</span>
                    </div>
                    <div className="flex items-center justify-center sm:justify-start gap-2">
                      <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-sky-400" />
                      <span className="text-sm sm:text-base">Member since {officer.joinedYear}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quote Section */}
              <div className="mb-10 p-8 bg-gradient-to-r from-sky-500/15 to-blue-500/15 rounded-3xl border border-sky-500/30">
                <div className="flex items-start gap-4">
                  <Quote className="h-8 w-8 text-sky-400 flex-shrink-0" />
                  <p className="text-xl text-slate-200 italic leading-relaxed">&ldquo;{officer.quote}&rdquo;</p>
                </div>
              </div>

              {/* Biography Section */}
              <div className="mb-10">
                <h3 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
                  <BookOpen className="h-6 w-6 text-sky-400" />
                  Biography
                </h3>
                <p className="text-lg text-slate-300 leading-relaxed">{officer.biography}</p>
              </div>

              {/* Background Section */}
              <div className="mb-10">
                <h3 className="text-2xl font-semibold text-white mb-4">Professional Background</h3>
                <p className="text-lg text-slate-300 leading-relaxed">{officer.background}</p>
              </div>

              {/* Achievements Section */}
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
                  <Award className="h-6 w-6 text-sky-400" />
                  Achievements & Recognition
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {officer.achievements.map((achievement, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-white/10 to-white/5 border border-white/20 hover:border-sky-500/40 transition-colors"
                    >
                      <div className="h-3 w-3 rounded-full bg-gradient-to-r from-sky-400 to-blue-500 flex-shrink-0" />
                      <span className="text-slate-200 font-medium">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>,
        document.body
      )}
    </motion.div>
  );
}

export default function FuturisticMemberCard({ officer, index }: MemberCard3DProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="relative"
    >
      <AnimatedMemberCard officer={officer} index={index} />
    </motion.div>
  );
}