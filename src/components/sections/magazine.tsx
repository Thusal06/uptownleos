"use client";

import { motion } from "framer-motion";
import data from "@/site-data.json";
import Image from "next/image";
import { useState } from "react";

const { magazine } = data;

export default function Magazine() {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <section id="magazine" className="relative py-32 px-4 overflow-hidden bg-obsidian">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-royal-blue/10 via-transparent to-eminence-gold/5" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-eminence-gold font-bold tracking-widest uppercase text-sm mb-4 block">
            Publication
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {magazine.title}
          </h2>
          <p className="text-xl text-slate-400">{magazine.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Magazine Cover Preview */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-[3/4] max-w-sm mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-royal-blue to-eminence-gold rounded-2xl transform rotate-3" />
              <div className="relative h-full rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={magazine.coverImage}
                  alt={magazine.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-eminence-gold/20 backdrop-blur-sm rounded-xl p-4 border border-eminence-gold/30">
              <p className="text-eminence-gold font-bold text-lg">{magazine.pages} Pages</p>
              <p className="text-slate-400 text-sm">Digital Publication</p>
            </div>
          </motion.div>

          {/* Magazine Info & CTA */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <div className="glass-panel p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-white mb-4">About the Magazine</h3>
              <p className="text-slate-400 leading-relaxed mb-6">
                {magazine.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href={magazine.flipbookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-eminence-gold text-obsidian font-bold rounded-lg hover:bg-eminence-gold/90 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Read Online
                </a>
                <a
                  href={magazine.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-royal-blue text-white font-bold rounded-lg hover:bg-royal-blue/20 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download PDF
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="glass-panel p-4 rounded-xl text-center">
                <p className="text-3xl font-bold text-eminence-gold">{magazine.pages}</p>
                <p className="text-slate-400 text-sm">Pages</p>
              </div>
              <div className="glass-panel p-4 rounded-xl text-center">
                <p className="text-3xl font-bold text-royal-blue">Vol I</p>
                <p className="text-slate-400 text-sm">Volume</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}