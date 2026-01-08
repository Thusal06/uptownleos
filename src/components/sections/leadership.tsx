"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import data from "@/site-data.json";
import BioModal from "@/components/ui/bio-modal";

const { clubCouncil, districtOfficials } = data;

// Shared Interface
interface Member {
  id: string;
  name: string;
  role: string;
  avatar: string;
  biography?: string;
  background?: string;
  achievements?: string[];
}

export default function Leadership() {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  // Filter key roles for the main bento grid (Club Council)
  const keyRoles = [
    "President",
    "Secretary",
    "Treasurer",
    "Vice President"
  ];

  const mainBoard = clubCouncil.filter(member => keyRoles.some(role => member.role.includes(role)));
  const otherBoard = clubCouncil.filter(member => !keyRoles.some(role => member.role.includes(role)));

  const handleMemberClick = (member: Member) => {
    // Logic: Allow modal for ALL District Officials OR Top 4 Club Council
    // We can identify District Officials by checking if they are in the districtOfficials array
    const isDistrictOfficial = districtOfficials.some(m => m.id === member.id);
    const isTopCouncil = keyRoles.some(role => member.role.includes(role));

    if (isDistrictOfficial || isTopCouncil) {
      setSelectedMember(member);
    }
  };

  return (
    <section id="leadership" className="relative py-32 px-4 max-w-7xl mx-auto">
      <BioModal 
        member={selectedMember} 
        isOpen={!!selectedMember} 
        onClose={() => setSelectedMember(null)} 
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-16 text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
          Our Leadership
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          The visionaries steering the Leo Lions Club of Colombo Uptown Eminence towards new horizons.
        </p>
      </motion.div>

      {/* --- SUBSECTION 1: Lions District Officials --- */}
      <div className="mb-24">
        <div className="flex items-center gap-4 mb-8">
           <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white/10" />
           <h3 className="text-xl md:text-2xl font-bold text-eminence-gold uppercase tracking-widest text-center">
             Lions District Officials
           </h3>
           <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-white/10" />
        </div>

        <div className="flex flex-col gap-8">
          {/* Row 1: International President & LCIF Chairperson */}
          <div className="flex flex-wrap justify-center gap-6">
            {districtOfficials.slice(0, 2).map((official) => (
              <BentoCard 
                key={official.id} 
                member={official} 
                className="w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(25%-1.5rem)] min-h-[350px]"
                isOfficial
                onClick={() => handleMemberClick(official)}
              />
            ))}
          </div>

          {/* Row 2: MCC */}
          <div className="flex justify-center">
            {districtOfficials.slice(2, 3).map((official) => (
              <BentoCard 
                key={official.id} 
                member={official} 
                className="w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(25%-1.5rem)] min-h-[350px]"
                isOfficial
                onClick={() => handleMemberClick(official)}
              />
            ))}
          </div>

          {/* Row 3: District Governor Team */}
          <div className="flex flex-wrap justify-center gap-6">
            {districtOfficials.slice(3).map((official) => (
              <BentoCard 
                key={official.id} 
                member={official} 
                className="w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(25%-1.5rem)] min-h-[350px]"
                isOfficial
                onClick={() => handleMemberClick(official)}
              />
            ))}
          </div>
        </div>
      </div>


      {/* --- SUBSECTION 2: Club Council --- */}
      <div>
        <div className="flex items-center gap-4 mb-8">
           <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white/10" />
           <h3 className="text-xl md:text-2xl font-bold text-eminence-gold uppercase tracking-widest text-center">
             Club Council
           </h3>
           <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-white/10" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[minmax(300px,auto)]">
          {/* President Card - Large */}
          {mainBoard.find(m => m.role === "President") && (
            <BentoCard 
              member={mainBoard.find(m => m.role === "President")!} 
              className="md:col-span-2 md:row-span-2 h-full min-h-[500px]"
              priority
              onClick={() => handleMemberClick(mainBoard.find(m => m.role === "President")!)}
            />
          )}

          {/* Other Key Board Members */}
          {mainBoard.filter(m => m.role !== "President").map((member) => (
            <BentoCard 
              key={member.id} 
              member={member} 
              className="md:col-span-1 md:row-span-1" 
              onClick={() => handleMemberClick(member)}
            />
          ))}

          {/* Remaining Board Members - Condensed Grid (No Click) */}
           {otherBoard.map((member) => (
            <BentoCard key={member.id} member={member} className="md:col-span-1 min-h-[250px]" />
          ))}
        </div>
      </div>
    </section>
  );
}

function BentoCard({ 
  member, 
  className = "", 
  priority = false, 
  isOfficial = false,
  onClick 
}: { 
  member: Member, 
  className?: string, 
  priority?: boolean, 
  isOfficial?: boolean,
  onClick?: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      onClick={onClick}
      className={`group relative overflow-hidden rounded-3xl glass-panel border border-white/5 p-6 flex flex-col justify-end transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(0,51,102,0.3)] ${className} ${onClick ? 'cursor-pointer hover:border-eminence-gold/50' : ''}`}
    >
      {/* Background Gradient/Glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 z-10 transition-opacity duration-500 group-hover:opacity-90" />
      
      {/* Hover Liquid Effect */}
      <div className="absolute -inset-full top-0 block z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-radial from-royal-blue/30 to-transparent blur-2xl" />

      {/* Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={member.avatar}
          alt={member.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 translate-y-2 transition-transform duration-300 group-hover:translate-y-0">
        <span className={`inline-block px-3 py-1 mb-2 text-[10px] md:text-xs font-bold tracking-wider uppercase rounded-full ${isOfficial ? 'bg-royal-blue text-white' : 'bg-eminence-gold/90 text-white'}`}>
          {member.role}
        </span>
        <h3 className="font-bold text-white mb-1 text-xl md:text-2xl leading-tight">
          {member.name}
        </h3>
      </div>
    </motion.div>
  );
}