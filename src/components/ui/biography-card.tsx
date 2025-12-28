"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, Calendar, Quote, Award } from "lucide-react";
import { useState } from "react";

export interface OfficerBio {
  _id?: string;
  name: string;
  role: string;
  avatar: string;
  biography: string;
  background: string;
  achievements: string[];
  joinedYear: string;
  email: string;
  quote: string;
}

export function BiographyCard({ officer, index = 0 }: { officer: OfficerBio; index?: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70 shadow-[0_20px_60px_rgba(59,130,246,0.18)]"
    >
      {/* Banner */}
      <div className="relative h-40 w-full overflow-hidden">
        <Image
          src={officer.avatar}
          alt={officer.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/10 to-transparent" />
      </div>

      {/* Top section */}
      <div className="relative -mt-10 px-6">
        <div className="flex items-end gap-4">
          <div className="relative h-20 w-20 overflow-hidden rounded-2xl border border-white/15 shadow-xl">
            <Image src={officer.avatar} alt={officer.name} fill className="object-cover" />
          </div>
          <div className="pb-1">
            <h3 className="text-lg md:text-xl font-semibold text-slate-50">{officer.name}</h3>
            <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-sky-300/80">{officer.role}</p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="px-6 pb-6 pt-4 grid gap-4">
        {/* Quote */}
        {officer.quote ? (
          <div className="rounded-2xl border border-sky-500/30 bg-sky-500/10 p-4">
            <div className="flex items-start gap-3 text-sky-200">
              <Quote className="h-4 w-4 mt-0.5" />
              <p className="text-sm italic">“{officer.quote}”</p>
            </div>
          </div>
        ) : null}

        {/* Bio summary */}
        <p className={`text-sm text-slate-300 ${expanded ? "" : "line-clamp-3"}`}>
          {officer.biography}
        </p>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
          <div className="inline-flex items-center gap-2">
            <Mail className="h-4 w-4 text-sky-300" />
            <span>{officer.email}</span>
          </div>
          <div className="inline-flex items-center gap-2">
            <Calendar className="h-4 w-4 text-sky-300" />
            <span>Since {officer.joinedYear}</span>
          </div>
        </div>

        {/* Expandable details */}
        {expanded ? (
          <div className="grid gap-4 pt-2">
            <div>
              <h4 className="text-sm font-semibold text-slate-200 mb-2">Background</h4>
              <p className="text-sm text-slate-300/90 leading-relaxed">{officer.background}</p>
            </div>

            {officer.achievements?.length ? (
              <div>
                <h4 className="text-sm font-semibold text-slate-200 mb-2 flex items-center gap-2">
                  <Award className="h-4 w-4 text-sky-300" /> Achievements
                </h4>
                <ul className="grid gap-2">
                  {officer.achievements.map((a, i) => (
                    <li key={i} className="text-sm text-slate-300/90">
                      • {a}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        ) : null}

        <div className="pt-2">
          <button
            onClick={() => setExpanded((e) => !e)}
            className="neon-button px-5 py-2 text-xs uppercase tracking-[0.3em]"
          >
            <span>{expanded ? "Show less" : "Read full bio"}</span>
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export default BiographyCard;
