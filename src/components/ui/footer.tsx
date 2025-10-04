"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const socialLinks = [
  { icon: Facebook, href: "https://www.facebook.com/share/1WZWZwmFBX/?mibextid=wwXIfr", label: "Facebook" },
  { icon: Instagram, href: "https://www.instagram.com/uptown.emi_leolions", label: "Instagram" },
  { icon: Linkedin, href: "https://www.linkedin.com/company/leo-lions-club-of-colombo-uptown-eminence/", label: "LinkedIn" },
];

const contactInfo = [
  { icon: Mail, text: "colombouptowneminence@gmail.com", href: "mailto:colombouptowneminence@gmail.com" },
  { icon: Phone, text: "+94 11 234 5678", href: "tel:+94112345678" },
  { icon: MapPin, text: "Colombo, Sri Lanka", href: "#" },
];

export default function Footer() {
  return (
    <footer className="relative bg-slate-950 border-t border-white/10">
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-950 to-slate-950" />

      <div className="relative mx-auto max-w-6xl px-6 py-16 md:px-12">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Club Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <Link href="/" className="inline-flex items-center gap-3 group">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Image
                  src="/logo.png"
                  alt="Leo Lions Club of Colombo Uptown Eminence"
                  width={48}
                  height={48}
                  className="h-12 w-12 drop-shadow-lg"
                />
              </motion.div>
              <div>
                <div className="text-lg font-bold text-slate-100 group-hover:text-sky-300 transition-colors">
                  LLCCUE
                </div>
                <div className="text-sm text-slate-400 group-hover:text-sky-400 transition-colors">
                  Uptown Eminence
                </div>
              </div>
            </Link>

            <p className="text-sm text-slate-300/70 leading-relaxed">
              A futuristic Leo club igniting youth leadership through technology, creativity, and immersive service impact.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-slate-100">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { label: "About Us", href: "#about" },
                { label: "Leadership", href: "#leadership" },
                { label: "Projects", href: "#projects" },
                { label: "Events", href: "#events" },
                { label: "Join Us", href: "#join" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-300/70 hover:text-sky-300 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-slate-100">Contact</h3>
            <ul className="space-y-3">
              {contactInfo.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-3 text-sm text-slate-300/70 hover:text-sky-300 transition-colors"
                  >
                    <item.icon className="h-4 w-4 text-sky-400" />
                    <span>{item.text}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-slate-100">Follow Us</h3>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:border-sky-400/60 hover:bg-sky-500/20 hover:text-sky-300"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </Link>
              ))}
            </div>

            <div className="pt-4">
              <Link
                href="#join"
                className="neon-button px-6 py-2 text-sm font-semibold"
              >
                <span>Join Our Mission</span>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 border-t border-white/10 pt-8 text-center"
        >
          <p className="text-sm text-slate-400">
            © 2024 Leo Lions Club of Colombo Uptown Eminence. All rights reserved.
          </p>
          <p className="text-xs text-slate-500 mt-2">
            Part of Lions Clubs International | District 306 C1
          </p>
        </motion.div>
      </div>
    </footer>
  );
}