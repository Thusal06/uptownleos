"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Leadership", href: "#leadership" },
  { label: "Projects", href: "#projects" },
  { label: "Events", href: "#events" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/90 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image
                src="/logo.png"
                alt="Leo Lions Club of Colombo Uptown Eminence"
                width={40}
                height={40}
                className="h-10 w-10 drop-shadow-lg"
              />
            </motion.div>
            <div className="hidden md:block">
              <div className="text-sm font-bold text-slate-100 group-hover:text-sky-300 transition-colors">
                LLCCUE
              </div>
              <div className="text-xs text-slate-400 group-hover:text-sky-400 transition-colors">
                Uptown Eminence
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="relative text-slate-300 hover:text-sky-300 transition-colors group"
              >
                <span className="text-sm font-medium">{item.label}</span>
                <motion.div
                  className="absolute -bottom-1 left-0 h-0.5 bg-sky-400"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ type: "spring", stiffness: 400 }}
                />
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <a
              href="https://forms.gle/sQYfyG5Vu2ZEb7y47"
              target="_blank"
              rel="noopener noreferrer"
              className="neon-button px-6 py-2 text-sm font-semibold inline-flex items-center gap-2 group"
            >
              <span>Join Us</span>
              <ArrowUpRight className="h-3 w-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 text-slate-300 hover:text-sky-300 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isOpen ? 1 : 0,
            height: isOpen ? "auto" : 0,
          }}
          className="lg:hidden overflow-hidden"
        >
          <div className="py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block px-4 py-3 text-slate-300 hover:text-sky-300 hover:bg-white/5 rounded-lg transition-all"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <a
              href="https://forms.gle/sQYfyG5Vu2ZEb7y47"
              target="_blank"
              rel="noopener noreferrer"
              className="block mx-4 mt-4 neon-button px-6 py-3 text-center text-sm font-semibold inline-flex items-center justify-center gap-2 group"
              onClick={() => setIsOpen(false)}
            >
              <span>Join Us</span>
              <ArrowUpRight className="h-3 w-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}