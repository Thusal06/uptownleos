"use client";

import data from "@/site-data.json";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case "facebook":
        return <Facebook size={18} />;
      case "instagram":
        return <Instagram size={18} />;
      case "linkedin":
        return <Linkedin size={18} />;
      default:
        return null;
    }
  };
  
  return (
    <footer className="relative z-10 pt-20 pb-32 overflow-hidden border-t border-white/5 bg-obsidian/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand & Social */}
          <div className="col-span-1 lg:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-6 tracking-tight">
              LEO LIONS CLUB OF <br />
              <span className="text-eminence-gold">COLOMBO UPTOWN EMINENCE</span>
            </h2>
            <p className="text-slate-400 max-w-md mb-8">
              Igniting youth leadership through service, creativity, and meaningful impact. 
              Join the movement.
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-4 mb-10">
              {Object.entries(data.social).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-eminence-gold hover:text-white transition-all duration-300 border border-white/5 hover:border-eminence-gold/50"
                >
                  {getSocialIcon(platform)}
                </a>
              ))}
            </div>

            {/* Logo Bar */}
            <div className="flex items-center opacity-80 grayscale hover:grayscale-0 transition-all duration-500 max-w-md">
              <div className="relative w-full h-24">
                <Image 
                  src="/logo bar.png" 
                  alt="Partner Logos" 
                  fill 
                  className="object-contain object-left" 
                />
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-6">Explore</h3>
            <ul className="space-y-4">
              {['Home', 'About', 'Leadership', 'Projects', 'Meetings'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="text-slate-300 hover:text-eminence-gold transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div id="contact">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-6">Contact</h3>
            <ul className="space-y-4 text-slate-400">
              <li>{data.contact.email}</li>
              <li>{data.contact.location}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            &copy; {currentYear} LLCCUE. All rights reserved.
          </p>
          <p className="text-slate-600 text-xs">
            Designed with <span className="text-eminence-gold">♥</span> by LLCCUE Tech
          </p>
        </div>
      </div>
    </footer>
  );
}