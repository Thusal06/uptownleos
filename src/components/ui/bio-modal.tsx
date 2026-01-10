"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import { useLenis } from "@studio-freight/react-lenis";

interface Member {
  id: string;
  name: string;
  role: string;
  avatar: string;
  biography?: string;
  background?: string;
  achievements?: string[];
}

interface BioModalProps {
  member: Member | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function BioModal({ member, isOpen, onClose }: BioModalProps) {
  const lenis = useLenis();

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "auto";
    }
    return () => {
      lenis?.start();
      document.body.style.overflow = "auto";
    };
  }, [isOpen, lenis]);

  if (!member) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-obsidian/90 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-4xl bg-[#0a1120] border border-white/10 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col md:flex-row"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/20 hover:bg-white/10 text-white transition-colors backdrop-blur-md border border-white/5"
            >
              <X size={20} />
            </button>

            {/* Left Side: Avatar & Role (Desktop) */}
            <div className="relative w-full md:w-2/5 h-64 md:h-auto bg-gradient-to-b from-royal-blue/20 to-obsidian/50 flex flex-col items-center justify-center p-8 border-b md:border-b-0 md:border-r border-white/5">
              <div className="relative w-48 h-48 md:w-64 md:h-80 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(14,165,233,0.15)] border border-white/10 glass-panel">
                <Image
                  src={member.avatar}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                 {/* Inner Glow */}
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Right Side: Content */}
            <div 
              className="w-full md:w-3/5 overflow-y-auto custom-scrollbar bg-[#0a1120]/50"
              data-lenis-prevent
            >
               <div className="p-8 md:p-10 space-y-8">
                 
                 {/* Header */}
                 <div>
                    <span className="inline-block px-4 py-1.5 rounded-full bg-eminence-gold/10 text-eminence-gold text-sm font-bold uppercase tracking-wider mb-4 border border-eminence-gold/20">
                      {member.role}
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 leading-tight">
                      {member.name}
                    </h2>
                 </div>

                 <div className="w-full h-[1px] bg-white/5" />

                {/* Bio Content */}
                <div className="space-y-6 text-slate-300 leading-relaxed text-lg">
                  {member.biography && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
                      <p>{member.biography}</p>
                    </div>
                  )}

                  {member.background && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
                      <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-3 text-eminence-gold/80">Background</h3>
                      <p className="text-base text-slate-400">{member.background}</p>
                    </div>
                  )}

                  {member.achievements && member.achievements.length > 0 && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
                      <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-3 text-eminence-gold/80">Key Milestones</h3>
                      <ul className="grid grid-cols-1 gap-3">
                        {member.achievements.map((achievement, i) => (
                          <li key={i} className="flex items-start gap-3 bg-white/5 p-3 rounded-lg border border-white/5">
                            <span className="w-1.5 h-1.5 rounded-full bg-eminence-gold mt-2 shrink-0" />
                            <span className="text-sm text-slate-300">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {!member.biography && !member.background && !member.achievements && (
                    <p className="italic text-slate-500">No additional details available.</p>
                  )}
                </div>
               </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}