"use client";

import { motion } from "framer-motion";
import data from "@/site-data.json";

const { about } = data;

export default function About() {
  return (
    <section id="about" className="relative py-32 px-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-eminence-gold font-bold tracking-widest uppercase text-sm mb-4 block">
            Who We Are
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white leading-tight">
            Defining the Future of <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal-blue-glow to-eminence-gold">
              Service Leadership
            </span>
          </h2>
          
          <div className="space-y-8">
            <div className="glass-panel p-6 rounded-2xl hover:bg-white/5 transition-colors">
              <h3 className="text-xl font-bold text-white mb-2">Our Mission</h3>
              <p className="text-slate-400 leading-relaxed">{about.mission}</p>
            </div>
            
            <div className="glass-panel p-6 rounded-2xl hover:bg-white/5 transition-colors">
              <h3 className="text-xl font-bold text-white mb-2">Our Vision</h3>
              <p className="text-slate-400 leading-relaxed">{about.vision}</p>
            </div>
          </div>
        </motion.div>

        {/* Visual / Stats */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="absolute -inset-4 bg-gradient-to-r from-royal-blue to-eminence-gold opacity-20 blur-3xl rounded-full" />
          <div className="relative glass-panel rounded-3xl p-8 md:p-12 border border-white/10 text-center">
            <h3 className="text-8xl md:text-9xl font-bold text-white/10 mb-2">2025</h3>
            <p className="text-2xl font-light text-white mb-8">
              The Year of <span className="text-eminence-gold font-bold">Aurum</span>
            </p>
            <p className="text-slate-400 mb-8">
              &quot;We Lead. We Serve. We Uplift.&quot;
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 rounded-xl">
                <span className="block text-3xl font-bold text-white">50+</span>
                <span className="text-xs text-slate-500 uppercase tracking-wider">Members</span>
              </div>
              <div className="p-4 bg-white/5 rounded-xl">
                <span className="block text-3xl font-bold text-white">10+</span>
                <span className="text-xs text-slate-500 uppercase tracking-wider">Projects</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}