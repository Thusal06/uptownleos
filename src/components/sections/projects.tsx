"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import data from "@/site-data.json";
import GalleryModal from "@/components/ui/gallery-modal";

const { projects } = data;

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0.1, 0.9], ["1%", "-75%"]);

  return (
    <section id="projects" className="relative bg-obsidian/50 py-20 md:py-0">
      <GalleryModal 
        project={selectedProject} 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />

      {/* Mobile Layout (Vertical List) */}
      <div className="md:hidden px-4 space-y-8">
        <div className="mb-12">
          <h2 className="text-4xl font-black text-white/10 uppercase tracking-tighter mb-2">
            Impact
          </h2>
          <p className="text-lg text-eminence-gold font-medium">
            Our Latest Initiatives
          </p>
        </div>
        
        {projects.map((project) => (
          <div 
            key={project.id} 
            onClick={() => setSelectedProject(project)}
            className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden glass-panel border border-white/10 active:scale-95 transition-transform duration-200"
          >
             <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 w-full">
              <span className="text-xs font-bold uppercase tracking-widest text-eminence-gold mb-2 block">
                {project.category}
              </span>
              <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
              <p className="text-sm text-slate-300 line-clamp-2">{project.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Layout (Horizontal Scroll) */}
      <div ref={targetRef} className="hidden md:block relative h-[300vh]">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          
          {/* Title Overlay */}
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
                onClick={() => setSelectedProject(project)}
              />
            ))}
            
            {/* "See More" Card */}
            <div className="relative h-[60vh] w-[80vw] md:w-[30vw] min-w-[300px] shrink-0 rounded-3xl glass-panel border border-white/5 flex items-center justify-center">
              <h3 className="text-3xl font-bold text-slate-500">More Coming Soon</h3>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, onClick }: { project: typeof projects[0], onClick: () => void }) {
  return (
    <div 
      onClick={onClick}
      className="group relative h-[60vh] w-[85vw] md:w-[45vw] min-w-[350px] shrink-0 overflow-hidden rounded-3xl glass-panel border border-white/10 transition-all duration-500 hover:border-eminence-gold/30 cursor-pointer hover:-translate-y-2 hover:shadow-2xl"
    >
      {/* Image with Parallax Hover */}
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

      {/* Content */}
      <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
        <div className="mb-4 flex items-center gap-3">
          <span className="inline-block h-px w-8 bg-eminence-gold" />
          <span className="text-sm font-bold uppercase tracking-widest text-eminence-gold">
            {project.category || "Project"}
          </span>
        </div>
        
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
