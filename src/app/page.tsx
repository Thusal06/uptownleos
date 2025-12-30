"use client";

import { ArrowDown, Calendar, Mail, MapPin, Users, Sparkles, Target, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";

const projects = [
  {
    name: "Aurum'25",
    title: "Charter Installation",
    icon: "🏆",
    description: "Historic milestone marking LLCCUE's official chartering and installation of the inaugural Board of Officials.",
    image: "/projects/aurum/WhatsApp Image 2025-08-01 at 11.01.17 AM.jpeg",
    color: "from-amber-500 to-orange-600",
  },
  {
    name: "BRANDBOOST360",
    title: "Digital Marketing Workshop",
    icon: "💡",
    description: "Digital Marketing Basics for Youth Entrepreneurs workshop equipping young minds with essential digital knowledge.",
    image: "/projects/brandboost/0bd12c0caf70ee59c54d28c63c8ee713.jpg",
    color: "from-blue-500 to-indigo-600",
  },
  {
    name: "Beach Cleanup",
    title: "Environmental Conservation",
    icon: "🌊",
    description: "Environmental sustainability project promoting coastal conservation at Wellawatta Beach.",
    image: "/projects/beachcleanup/00db8c9d61661d50ef61f74bcb76b6e6.jpg",
    color: "from-cyan-500 to-teal-600",
  },
  {
    name: "Ashirwada Pooja",
    title: "Blessings Ceremony",
    icon: "🙏",
    description: "Spiritually enriching ceremony at Asokaramaya Temple to invoke blessings for the club's future endeavors.",
    image: "/projects/ashirwadapooja/790e29afdf7e7be317617c82a6b33d9c.jpg",
    color: "from-purple-500 to-pink-600",
  },
  {
    name: "Project Suwadivi",
    title: "Hospital Renovation",
    icon: "❤️",
    description: "Compassionate initiative renovating the Paralyzed Patients' Ward at Ayurvedic Hospital, Rajagiriya.",
    image: "/projects/suwadivi/7be4e95f1b7649249144940bbf38d103.jpg",
    color: "from-rose-500 to-red-600",
  },
];

const officers = [
  { name: "Thusal Ranawaka", role: "Club President", avatar: "/board/thusal.jpeg" },
  { name: "Yohani Jayasinghe", role: "Club Secretary", avatar: "/board/yohani.jpg" },
  { name: "Vihandu Adikari", role: "Club Treasurer", avatar: "/board/vihandu.jpg" },
  { name: "Ruchika Perera", role: "Board Member", avatar: "/board/ruchika.jpg" },
  { name: "Pahasara Gimhana", role: "Board Member", avatar: "/board/pahasara.jpg" },
  { name: "Senuri Wijesinghe", role: "Board Member", avatar: "/board/senuri.jpg" },
  { name: "Seyara Alahakoon", role: "Board Member", avatar: "/board/seyara.jpg" },
  { name: "Hesani Jayasinghe", role: "Board Member", avatar: "/board/hesani.jpg" },
  { name: "Rinoshi De Silva", role: "Board Member", avatar: "/board/rinoshi.jpg" },
  { name: "Supun Aponsu", role: "Board Member", avatar: "/board/supun.jpg" },
  { name: "Devnaka Methmal", role: "Board Member", avatar: "/board/devnaka.jpg" },
  { name: "Gayan Bandara", role: "Board Member", avatar: "/board/gayan.jpg" },
  { name: "Anuk Piyumal", role: "Board Member", avatar: "/board/anuk.jpeg" },
  { name: "Methira Ranathunga", role: "Board Member", avatar: "/board/methira.jpg" },
  { name: "Ranudi Sathsarani", role: "Board Member", avatar: "/board/ranudi.jpg" },
  { name: "Sasira Dilmith", role: "Board Member", avatar: "/board/sasira.jpg" },
  { name: "Thesara Thirimanna", role: "Board Member", avatar: "/board/thesara.jpg" },
  { name: "Tharuja Abeywardena", role: "Board Member", avatar: "/board/tharuja.jpg" },
];

export default function HomePage() {
  const [activeSection, setActiveSection] = useState("home");
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "leadership", "projects", "contact"];
      for (const id of sections) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(id);
            break;
          }
        }
      }

      // Scroll progress
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = (window.scrollY / documentHeight) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      {/* Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 z-[60] transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      <Navigation activeSection={activeSection} scrollToSection={scrollToSection} />

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-slate-300">Leo Lions Club of Colombo Uptown Eminence</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-6">
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-gradient">
              We Lead.
            </span>
            <span className="block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              We Serve.
            </span>
            <span className="block bg-gradient-to-r from-pink-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
              We Uplift.
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto mb-12">
            Creating transformative change through service, leadership, and compassion.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => scrollToSection("projects")}
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-semibold overflow-hidden transition-all hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
            >
              <span className="relative z-10">Explore Our Work</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <button
              onClick={() => scrollToSection("leadership")}
              className="px-8 py-4 rounded-full font-semibold border-2 border-white/20 hover:border-white/40 hover:bg-white/5 transition-all"
            >
              Meet Our Team
            </button>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <ArrowDown className="h-6 w-6 text-slate-500" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/20 to-transparent" />
        <div className="mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4">
              Who We Are
            </span>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Driven by Purpose
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              The Leo Lions Club of Colombo Uptown Eminence brings together passionate young leaders
              committed to creating meaningful impact in our community through service, innovation, and dedication.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group relative p-8 rounded-3xl bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20 hover:border-blue-500/40 transition-all hover:scale-105">
              <div className="absolute inset-0 bg-blue-500/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-slate-400">To empower youth through leadership development and community service that creates lasting positive change.</p>
              </div>
            </div>

            <div className="group relative p-8 rounded-3xl bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20 hover:border-purple-500/40 transition-all hover:scale-105">
              <div className="absolute inset-0 bg-purple-500/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-6">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p className="text-slate-400">To be the leading youth organization fostering innovation, service, and excellence in everything we do.</p>
              </div>
            </div>

            <div className="group relative p-8 rounded-3xl bg-gradient-to-br from-cyan-500/10 to-transparent border border-cyan-500/20 hover:border-cyan-500/40 transition-all hover:scale-105">
              <div className="absolute inset-0 bg-cyan-500/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Our Values</h3>
                <p className="text-slate-400">Integrity, service, excellence, and collaboration guide every initiative we undertake.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section id="leadership" className="py-32 px-6 relative overflow-hidden">
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl" />
        <div className="mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-4">
              Leadership Team
            </span>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Meet Our Leaders
              </span>
            </h2>
            <p className="text-xl text-slate-400">The dedicated individuals driving our mission forward</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {officers.map((officer, index) => (
              <div
                key={index}
                className="group relative"
              >
                <div className="relative aspect-square rounded-3xl overflow-hidden border-2 border-white/10 group-hover:border-purple-500/50 transition-all duration-300 group-hover:scale-105">
                  <Image
                    src={officer.avatar}
                    alt={officer.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-sm font-semibold text-white">{officer.name}</p>
                    <p className="text-xs text-purple-400">{officer.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/20 to-transparent" />
        <div className="mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-4">
              Our Impact
            </span>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Recent Projects
              </span>
            </h2>
            <p className="text-xl text-slate-400">Transforming ideas into impactful realities</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group relative rounded-3xl overflow-hidden bg-slate-900/50 border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/10"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
                  <div className={`absolute top-4 right-4 px-4 py-2 rounded-full bg-gradient-to-r ${project.color} text-sm font-bold`}>
                    {project.icon}
                  </div>
                </div>
                <div className="p-8">
                  <p className="text-sm font-medium text-slate-400 mb-2">{project.title}</p>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-cyan-400 transition-colors">{project.name}</h3>
                  <p className="text-slate-400 leading-relaxed">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-full blur-3xl" />
        <div className="mx-auto max-w-4xl text-center relative z-10">
          <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/20 text-sm font-medium mb-8">
            Join Our Journey
          </div>
          <h2 className="text-5xl md:text-7xl font-bold mb-8">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Ready to Make an Impact?
            </span>
          </h2>
          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
            Join our community of young leaders and be part of something truly meaningful.
          </p>
          <a
            href="https://forms.gle/TjHd3bw3H8S53fGj6"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-lg font-semibold hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25 transition-all"
          >
            <Mail className="w-5 h-5" />
            Join LLCCUE Today
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
