"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Leadership", id: "leadership" },
  { label: "Projects", id: "projects" },
];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        if (
          section &&
          section.offsetTop <= scrollPosition &&
          section.offsetTop + section.offsetHeight > scrollPosition
        ) {
          setActiveSection(section.id);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-[95vw] sm:max-w-fit">
      <motion.nav
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.8, type: "spring" }}
        className="glass-panel flex items-center justify-between sm:justify-center gap-1 sm:gap-2 rounded-full p-2 px-3 sm:px-4 backdrop-blur-2xl bg-obsidian/40 border-white/10 shadow-2xl shadow-black/50 overflow-x-auto no-scrollbar"
      >
        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => scrollToSection(e, item.id)}
                className="relative px-3 py-2 text-xs sm:text-sm font-medium transition-colors duration-300 whitespace-nowrap"
              >
                <span className={cn(
                  "relative z-10 transition-colors duration-300",
                  isActive ? "text-white" : "text-slate-400 hover:text-slate-200"
                )}>
                  {item.label}
                </span>
                
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 rounded-full bg-white/10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </a>
            );
          })}
        </div>
        
        <div className="w-[1px] h-5 sm:h-6 bg-white/10 mx-1 sm:mx-2 shrink-0" />
        
        <a
          href="https://forms.gle/TjHd3bw3H8S53fGj6"
          target="_blank"
          rel="noopener noreferrer"
          className="relative px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-eminence-gold rounded-full hover:bg-eminence-gold-light transition-all shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_30px_rgba(14,165,233,0.5)] whitespace-nowrap shrink-0"
        >
          Join Us
        </a>
      </motion.nav>
    </div>
  );
}
