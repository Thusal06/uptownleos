"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const navItems = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Leadership", id: "leadership" },
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" },
];

interface NavigationProps {
  activeSection: string;
  scrollToSection: (id: string) => void;
}

export default function Navigation({ activeSection, scrollToSection }: NavigationProps) {
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
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/90 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Leo Lions Club of Colombo Uptown Eminence"
              width={40}
              height={40}
              className="h-10 w-10"
            />
            <div className="hidden md:block">
              <div className="text-sm font-bold text-slate-100">LLCCUE</div>
              <div className="text-xs text-slate-400">Uptown Eminence</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? "text-blue-400"
                    : "text-slate-300 hover:text-blue-400"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <a
              href="https://forms.gle/TjHd3bw3H8S53fGj6"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-blue-500 px-6 py-2 text-sm font-semibold text-white transition hover:bg-blue-600"
            >
              Join Us
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 text-slate-300 hover:text-blue-400 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  scrollToSection(item.id);
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-4 py-3 rounded-lg transition-all ${
                  activeSection === item.id
                    ? "text-blue-400 bg-white/5"
                    : "text-slate-300 hover:text-blue-400 hover:bg-white/5"
                }`}
              >
                {item.label}
              </button>
            ))}
            <a
              href="https://forms.gle/TjHd3bw3H8S53fGj6"
              target="_blank"
              rel="noopener noreferrer"
              className="block mx-4 mt-4 rounded-full bg-blue-500 px-6 py-3 text-center text-sm font-semibold text-white hover:bg-blue-600"
              onClick={() => setIsOpen(false)}
            >
              Join Us
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
