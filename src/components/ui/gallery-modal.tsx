"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Project {
  id: string;
  name: string;
  title: string;
  description: string;
  image: string;
  category: string;
  gallery?: string[];
}

interface GalleryModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function GalleryModal({ project, isOpen, onClose }: GalleryModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setCurrentIndex(0); // Reset index on open
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!project || !project.gallery || project.gallery.length === 0) return null;

  const images = project.gallery;

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-obsidian/95 backdrop-blur-xl">
          {/* Backdrop (Click to close) */}
          <div className="absolute inset-0" onClick={onClose} />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative z-10 w-full max-w-6xl h-full max-h-[90vh] flex flex-col gap-4 pointer-events-none" 
          >
            {/* Header / Close Button */}
            <div className="flex justify-end pointer-events-auto">
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Main Image Container */}
            <div className="relative flex-1 min-h-0 rounded-2xl overflow-hidden glass-panel border border-white/10 shadow-2xl pointer-events-auto group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={images[currentIndex]}
                    alt={`${project.title} - Image ${currentIndex + 1}`}
                    fill
                    className="object-contain"
                    priority
                  />
                  
                  {/* Image Counter / Caption Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-obsidian/90 to-transparent text-center">
                    <p className="text-white font-bold">{project.title}</p>
                    <p className="text-slate-400 text-xs">{currentIndex + 1} / {images.length}</p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows */}
              <button
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full bg-black/40 hover:bg-black/60 text-white transition-all backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 md:opacity-100"
              >
                <ChevronLeft size={24} />
              </button>
              
              <button
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full bg-black/40 hover:bg-black/60 text-white transition-all backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 md:opacity-100"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Thumbnails */}
            <div className="h-16 md:h-20 shrink-0 flex justify-center gap-2 overflow-x-auto py-1 px-4 pointer-events-auto">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`relative w-14 h-14 md:w-16 md:h-16 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${idx === currentIndex ? 'border-eminence-gold scale-105' : 'border-transparent opacity-50 hover:opacity-100'}`}
                >
                  <Image src={img} alt="thumb" fill className="object-cover" />
                </button>
              ))}
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}