"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import data from "@/site-data.json";
import GalleryModal from "@/components/ui/gallery-modal";

const { projects, meetings } = data;

interface Project {
  id: string;
  name: string;
  title: string;
  description: string;
  image: string;
  category: string;
  gallery?: string[];
  gradient?: string;
}

interface Meeting {
  id: string;
  name: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  chiefGuest: string;
  image: string;
  category: string;
  gallery?: string[];
}

export default function Projects() {
  const [selectedItem, setSelectedItem] = useState<Project | Meeting | null>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0.1, 0.9], ["1%", "-75%"]);

  return (
    <section id="projects" className="relative bg-obsidian/50 py-20 md:py-0">
      <GalleryModal 
        project={selectedItem} 
        isOpen={!!selectedItem} 
        onClose={() => setSelectedItem(null)} 
      />

      {/* --- PROJECTS SECTION --- */}
      {/* Mobile Layout (Vertical List) */}
      <div className="md:hidden px-4 space-y-8 mb-20">
        <div className="mb-12">
          <h2 className="text-4xl font-black text-white/10 uppercase tracking-tighter mb-2">
            Impact
          </h2>
          <p className="text-lg text-eminence-gold font-medium">
            Our Latest Initiatives
          </p>
        </div>
        
        {projects.map((project) => (
          <MobileCard key={project.id} item={project} onClick={() => setSelectedItem(project)} />
        ))}
      </div>

      {/* Desktop Layout (Horizontal Scroll) */}
      <div ref={targetRef} className="hidden md:block relative h-[300vh]">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          
          <div className="absolute top-10 left-10 z-20 md:top-20 md:left-20">
            <h2 className="text-6xl md:text-9xl font-black text-white/5 uppercase tracking-tighter">
              Impact
            </h2>
            <p className="text-xl text-eminence-gold font-medium ml-2 -mt-4 md:-mt-8">
              Our Latest Initiatives
            </p>
          </div>

          <motion.div style={{ x }} className="flex gap-8 px-10 md:px-20">
            {projects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onClick={() => setSelectedItem(project)}
              />
            ))}
            
            <div className="relative h-[60vh] w-[80vw] md:w-[30vw] min-w-[300px] shrink-0 rounded-3xl glass-panel border border-white/5 flex items-center justify-center">
              <h3 className="text-3xl font-bold text-slate-500">More Projects Soon</h3>
            </div>
          </motion.div>
        </div>
      </div>


      {/* --- MEETINGS SECTION --- */}
      <div id="meetings" className="relative py-20">
        <div className="mb-12 text-left pl-10 md:pl-20">
          <h2 className="text-6xl md:text-9xl font-black text-white/5 uppercase tracking-tighter mb-2">
            Gatherings
          </h2>
          <p className="text-lg md:text-xl text-eminence-gold font-medium -mt-4 md:-mt-8 ml-2">
            General Meetings & Assemblies
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {meetings.map((meeting: Meeting) => (
              <div 
                key={meeting.id}
                onClick={() => setSelectedItem(meeting)}
                className="group relative rounded-3xl overflow-hidden glass-panel border border-white/10 cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-eminence-gold/30"
              >
                {/* Image Aspect Ratio */}
                <div className="relative aspect-video w-full overflow-hidden">
                  <Image
                    src={meeting.image}
                    alt={meeting.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-transparent opacity-90" />
                </div>

                {/* Content */}
                <div className="p-8 relative z-10 -mt-16">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-royal-blue/20 border border-royal-blue/30 backdrop-blur-md mb-4">
                    <span className="w-2 h-2 rounded-full bg-royal-blue animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-200">
                      {meeting.category}
                    </span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{meeting.title}</h3>
                  
                  <div className="space-y-2 text-sm text-slate-300 mb-4">
                    <p><span className="text-eminence-gold font-semibold">Date:</span> {meeting.date}</p>
                    <p><span className="text-eminence-gold font-semibold">Venue:</span> {meeting.venue}</p>
                    <p><span className="text-eminence-gold font-semibold">Chief Guest:</span> {meeting.chiefGuest}</p>
                  </div>

                  <p className="text-slate-400 text-sm line-clamp-2">{meeting.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}

// Reusable Mobile Card
function MobileCard({ item, onClick }: { item: Project | Meeting, onClick: () => void }) {
  return (
    <div 
      onClick={onClick}
      className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden glass-panel border border-white/10 active:scale-95 transition-transform duration-200"
    >
       <Image
        src={item.image}
        alt={item.title}
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/20 to-transparent" />
      <div className="absolute bottom-0 left-0 p-6 w-full">
        <span className="text-xs font-bold uppercase tracking-widest text-eminence-gold mb-2 block">
          {item.category}
        </span>
        {item.name && <h4 className="text-white/60 text-sm font-medium mb-1 tracking-wider uppercase">{item.name}</h4>}
        <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
        <p className="text-sm text-slate-300 line-clamp-2">{item.description}</p>
      </div>
    </div>
  );
}

// Desktop Project Card (Existing)
function ProjectCard({ project, onClick }: { project: Project, onClick: () => void }) {
  return (
    <div 
      onClick={onClick}
      className="group relative h-[60vh] w-[85vw] md:w-[45vw] min-w-[350px] shrink-0 overflow-hidden rounded-3xl glass-panel border border-white/10 transition-all duration-500 hover:border-eminence-gold/30 cursor-pointer hover:-translate-y-2 hover:shadow-2xl"
    >
      <div className="absolute inset-0 overflow-hidden">
         <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/50 to-transparent" />
      </div>

      <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
        <div className="mb-4 flex items-center gap-3">
          <span className="inline-block h-px w-8 bg-eminence-gold" />
          <span className="text-sm font-bold uppercase tracking-widest text-eminence-gold">
            {project.category || "Project"}
          </span>
        </div>
        
        <h4 className="text-white/50 text-lg md:text-xl font-medium mb-2 tracking-widest uppercase">{project.name}</h4>
        <h3 className="mb-4 text-3xl md:text-5xl font-bold text-white leading-tight">
          {project.title}
        </h3>
        
        <p className="max-w-md text-slate-300 md:text-lg line-clamp-3">
          {project.description}
        </p>
      </div>
    </div>
  );
}