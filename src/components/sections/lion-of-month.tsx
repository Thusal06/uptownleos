"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import data from "@/site-data.json";

interface LionOfMonthData {
  id: string;
  name: string;
  month: string;
  year: string;
  avatar: string;
  description: string;
}

// Safely access lionOfMonth even if not in the type definition yet
const lionOfMonth: LionOfMonthData[] = (data as { lionOfMonth?: LionOfMonthData[] }).lionOfMonth || [];

export default function LionOfMonth() {
  if (lionOfMonth.length === 0) return null;

  return (
    <section className="relative py-16 md:py-24 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12 md:mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
          Leo Lion of the <span className="text-eminence-gold">Month</span>
        </h2>
        <p className="text-slate-400">Celebrating excellence and dedication within our pride.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
        {lionOfMonth.map((lion, index) => (
          <motion.div
            key={lion.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            className="relative group"
          >
            {/* Background Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-royal-blue/20 to-eminence-gold/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative glass-panel p-6 md:p-8 rounded-3xl border border-white/10 flex flex-col sm:flex-row items-center gap-4 md:gap-8 transition-transform duration-300 hover:-translate-y-2">
              {/* Image */}
              <div className="relative w-28 h-28 md:w-40 md:h-40 shrink-0">
                <div className="absolute inset-0 rounded-full border-2 border-eminence-gold/30" />
                <Image
                  src={lion.avatar}
                  alt={lion.name}
                  fill
                  className="object-cover rounded-full p-1"
                />
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-eminence-gold text-obsidian text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider whitespace-nowrap shadow-lg">
                  {lion.month}
                </div>
              </div>

              {/* Content */}
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-white mb-1">{lion.name}</h3>
                <p className="text-eminence-gold text-sm font-medium mb-3">{lion.year}</p>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {lion.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
