"use client";

import {
  ArrowUpRight,
  CalendarRange,
  Globe2,
  MessageSquare,
  Settings,
  Sparkle,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  type MotionProps,
  type MotionValue,
  type Variants,
  type Easing,
} from "framer-motion";
import { useMemo, useState } from "react";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/section-heading";
import { GlassCard } from "@/components/ui/glass-card";
import FuturisticMemberCard from "@/components/ui/member-card-3d";
import InteractiveImpactDashboard from "@/components/ui/impact-dashboard";
import EnhancedParticles, { ServiceImpactParticles } from "@/components/ui/enhanced-particles";
import AIProjectMatcher from "@/components/ui/ai-project-matcher";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import { officers } from "@/data/officers";
import Link from "next/link";


type ProjectCategory = {
  name: string;
  icon: string;
  description: string;
  image: string;
};

type Event = {
  title: string;
  date: string;
  description: string;
  cta: string;
};


const panoramaUrl = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=80&sat=-15`;

const cardUrl = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80&sat=-10`;


const projectCategories: ProjectCategory[] = [
  {
    name: "Environmental Conservation",
    icon: "🌊",
    description: "Wellawatta Beach Cleanup and environmental awareness campaigns to protect Sri Lanka's coastal ecosystems.",
    image: cardUrl("photo-1552667466-07770ae110d0"),
  },
  {
    name: "Digital Marketing & Entrepreneurship",
    icon: "💡",
    description: "BRANDBOOST360 - Digital Marketing Basics for Youth Entrepreneurs program in collaboration with other Leo clubs.",
    image: cardUrl("photo-1460925895917-afdab827c52f"),
  },
  {
    name: "Leadership Development",
    icon: "🎓",
    description: "Club Officers Workshops and training programs facilitated by Zone Chairperson Lion Lakisha Perera.",
    image: cardUrl("photo-1526498460520-4c246339dccb"),
  },
  {
    name: "Community Service",
    icon: "🤝",
    description: "Service projects aligned with District Governor's 7-Point Program, including hospital and community outreach.",
    image: cardUrl("photo-1529336953121-497c3c8685f8"),
  },
];

const events: Event[] = [
  {
    title: "Aurum&apos;25 - Charter Installation Ceremony",
    date: "July 24, 2025",
    description:
      "A landmark event that officially chartered LLCCUE under Lions International. Installation of club officers, unveiling of the official club banner, and commencement of the club&apos;s journey.",
    cta: "View Gallery",
  },
  {
    title: "BRANDBOOST360 - Digital Marketing Workshop",
    date: "August 27, 2025",
    description:
      "Digital Marketing Basics for Youth Entrepreneurs organized in collaboration with Leo Club of St. Joseph&apos;s College Anuradhapura and Lions Club of Anuradhapura City.",
    cta: "Watch Recording",
  },
  {
    title: "Wellawatta Beach Cleanup",
    date: "September 2025",
    description:
      "Environmental cleanup campaign conducted as part of the club&apos;s environmental initiatives, with live updates and community engagement.",
    cta: "Join Next Cleanup",
  },
];

const newsItems = [
  {
    title: "LLCCUE wins global innovation grant",
    excerpt:
      "Our immersive service lab secured international recognition for its sustainable AI initiative.",
    image: cardUrl("photo-1500530855697-b586d89ba3ee"),
    href: "#",
  },
  {
    title: "Lionism 4.0 workshop empowers 120 youth",
    excerpt:
      "A transformative session blending leadership micro-learning with interactive holographic stories.",
    image: cardUrl("photo-1529336953121-497c3c8685f8"),
    href: "#",
  },
  {
    title: "Project Aurora lights up communities",
    excerpt:
      "Smart solar pods and ambient tech art installations redefining community spaces.",
    image: cardUrl("photo-1489515217757-5fd1be406fef"),
    href: "#",
  },
];

const galleryItems = [
  panoramaUrl("photo-1519681393784-d120267933ba"),
  panoramaUrl("photo-1498050108023-c5249f4df085"),
  panoramaUrl("photo-1521737604893-d14cc237f11d"),
  panoramaUrl("photo-1521737604893-ff3c681f0f21"),
  panoramaUrl("photo-1498050108023-c5249f4df085"),
  panoramaUrl("photo-1545239351-1141bd82e8a6"),
];

const easeCurve: Easing = [0.25, 0.8, 0.25, 1];
const chatEase: Easing = [0.4, 0, 0.2, 1];
const floatEase: Easing = [0.45, 0, 0.55, 1];

const useParallax = (): MotionValue<number> => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -300]);
  return y;
};

const floatingVariants: Variants = {
  initial: { y: 0 },
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: floatEase,
    },
  },
};

const fadeInUp = (delay = 0): MotionProps => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.35 },
  transition: {
    duration: 0.6,
    delay,
    ease: easeCurve,
  },
});

export default function Home() {
  const parallaxY = useParallax();

  
  return (
    <div className="relative flex flex-col">
      <div className="noise-overlay" />
      <EnhancedParticles count={15} interactive={false} />

      <Navigation />

      <main className="relative overflow-hidden">
        <Hero parallaxY={parallaxY} />
        <InteractiveImpactDashboard />
        <About />
        <Leadership />
        <Projects />
        <AIProjectMatcher />
        <Events />
        <Media />
        <Join />
        <Contact />
      </main>

      <Footer />

      <ChatWidget />
      <AdminButton />
    </div>
  );
}

function Hero({ parallaxY }: { parallaxY: MotionValue<number> }) {
  return (
    <section id="home" className="relative flex min-h-[90vh] items-center justify-center px-6 pb-24 pt-32 md:px-12">
      <motion.div
        style={{ y: parallaxY }}
        className="absolute inset-0 -z-10 overflow-hidden"
        aria-hidden
      >
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950/60 to-slate-900" />
        <motion.div
          className="absolute -left-24 top-10 h-[320px] w-[320px] sm:h-[420px] sm:w-[420px] lg:h-[520px] lg:w-[520px] rounded-full bg-sky-500/25 blur-3xl"
          animate={{ opacity: [0.25, 0.45, 0.25], scale: [1, 1.15, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-10 bottom-0 h-[280px] w-[280px] sm:h-[360px] sm:w-[360px] lg:h-[460px] lg:w-[460px] rounded-full bg-cyan-400/20 blur-3xl"
          animate={{ opacity: [0.2, 0.4, 0.2], scale: [1.1, 0.95, 1.1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute left-1/2 top-1/2 h-[480px] w-[480px] sm:h-[580px] sm:w-[580px] lg:h-[680px] lg:w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-500/20 hidden sm:block"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
          style={{ boxShadow: "0 0 120px rgba(56, 189, 248, 0.25)" }}
        />
        <ParticleField />
      </motion.div>

      <motion.div
        className="mx-auto flex max-w-5xl flex-col items-center text-center"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: easeCurve }}
      >
        {/* Club Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <Image
            src="/logo.png"
            alt="Leo Lions Club of Colombo Uptown Eminence"
            width={120}
            height={120}
            className="h-24 w-24 md:h-32 md:w-32 drop-shadow-2xl"
          />
        </motion.div>

        <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/10 px-6 py-3 backdrop-blur-xl">
          <Sparkle className="h-5 w-5 text-sky-300" />
          <span className="text-sm tracking-[0.3em] uppercase text-slate-100/75">
            Lead. Serve. Uplift.
          </span>
        </div>

        <h1 className="text-balance text-4xl font-semibold leading-tight text-slate-50 sm:text-5xl md:text-7xl">
          A New Era of Leo Lions
        </h1>
        <p className="mt-8 max-w-3xl text-lg text-slate-200/80 md:text-xl">
          Welcome to the futuristic service collective of Leo Lions Club of Colombo Uptown
          Eminence. We ignite youth leadership with technology, creativity, and immersive impact.
        </p>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <Link href="#about" className="neon-button px-8 py-3">
            <span>Discover Us</span>
          </Link>
          <a
            href="https://forms.gle/TjHd3bw3H8S53fGj6"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-sky-500/40 bg-white/5 px-8 py-3 text-sm font-semibold text-sky-200 transition hover:border-sky-400/80 hover:bg-white/10 group"
          >
            Join the Movement
            <ArrowUpRight className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>
      </motion.div>

      <div className="absolute inset-x-0 bottom-8 flex justify-center">
        <motion.span
          className="flex h-14 w-24 items-center justify-center rounded-full border border-sky-500/40 bg-white/5 text-slate-200/60 backdrop-blur-xl"
          variants={floatingVariants}
          initial="initial"
          animate="animate"
        >
          Scroll
        </motion.span>
      </div>
    </section>
  );
}

function ParticleField() {
  const particles = useMemo(
    () =>
      new Array(15).fill(0).map((_, idx) => ({
        id: idx,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: Math.random() * 4 + 1,
        duration: Math.random() * 10 + 6,
        delay: Math.random() * 5,
      })),
    []
  );

  return (
    <div className="absolute inset-0">
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute rounded-full bg-sky-400/30 blur-[1px]"
          style={{
            width: particle.size,
            height: particle.size,
            left: particle.left,
            top: particle.top,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function About() {
  return (
    <section id="about" className="relative z-10 mx-auto max-w-6xl px-6 pb-24">
      <SectionHeading
        eyebrow="Our Story"
        title={"Immersive storytelling that redefines Lionism"}
        subtitle={
          "From a visionary charter to a living service lab, we craft experiences that merge empathy with innovation across Colombo, Sri Lanka, and beyond."
        }
        align="center"
      />

      <div className="relative mt-20 grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        <GlassCard className="group overflow-hidden">
          <motion.div
            {...fadeInUp()}
            className="grid gap-10 text-left md:grid-cols-2 md:gap-12"
          >
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-slate-50">
                The pulse of LLCCUE
              </h3>
              <p className="text-base leading-relaxed text-slate-300/80">
                We are a collective of future-forward Leos engineering transformative pathways for
                young leaders. Our blueprint fuses community-first values with immersive technology,
                building a responsive club culture that anticipates tomorrow&apos;s challenges today.
              </p>
              <p className="text-base leading-relaxed text-slate-300/80">
                Through interactive storytelling, data-informed service, and emotion-led design, we
                expand the Leo legacy into an evolving, blended reality of impact.
              </p>
            </div>
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/10">
              <Image
                src={cardUrl("photo-1512406926046-631bb0abf902")}
                alt="Immersive LLCCUE experience"
                width={720}
                height={900}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/30 to-sky-400/20" />
            </div>
          </motion.div>
        </GlassCard>

        <motion.div
          {...fadeInUp(0.2)}
          className="grid gap-6 rounded-3xl border border-white/10 bg-gradient-to-br from-sky-500/10 via-slate-900/80 to-slate-950/90 p-8 backdrop-blur-lg"
        >
          <div className="grid gap-6 text-left">
            <div>
              <h4 className="text-lg font-semibold text-sky-200">
                Mission
              </h4>
              <p className="mt-2 text-slate-300/80">
                Amplify youth leadership through immersive service ecosystems that inspire courage,
                collaboration, and phenomenal impact.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-sky-200">
                Vision
              </h4>
              <p className="mt-2 text-slate-300/80">
                To become Sri Lanka&apos;s most future-ready Leo club, catalyzing innovation within
                Lionism and empowering the next generation of changemakers.
              </p>
            </div>
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-sky-400/40 to-transparent" />
          <Timeline />
        </motion.div>
      </div>
    </section>
  );
}

function Timeline() {
  const timelineItems = [
    {
      year: "2023",
      title: "Charter sparks",
      description:
        "LLCCUE is chartered with a bold mission to design immersive service experiences in Colombo Uptown.",
    },
    {
      year: "2024",
      title: "Digital dawn",
      description:
        "Launched our first mixed-reality project labs, empowering virtual volunteering and data-driven outcomes.",
    },
    {
      year: "2025",
      title: "Global resonance",
      description:
        "Expanded into international collaborations with global Leo clubs, co-creating scalable service tech."
    }
  ];

  return (
    <div className="relative">
      <div className="flex items-center justify-between gap-3 pb-4 text-xs uppercase tracking-[0.6em] text-slate-400">
        <span>Then</span>
        <span>Now</span>
        <span>Next</span>
      </div>
      <div className="relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 sm:flex-row">
        {timelineItems.map((item, index) => (
          <motion.div
            key={item.year}
            className="flex flex-1 flex-col gap-3 rounded-2xl border border-white/10 bg-slate-900/60 p-5 shadow-[0_20px_60px_rgba(59,130,246,0.2)]"
            {...fadeInUp(index * 0.15)}
          >
            <span className="text-xs font-semibold tracking-[0.5em] text-sky-300/80">
              {item.year}
            </span>
            <h5 className="text-xl font-semibold text-slate-100">{item.title}</h5>
            <p className="text-sm text-slate-300/75">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function Leadership() {
  return (
    <section id="leadership" className="relative mx-auto max-w-6xl px-6 pb-24">
      <SectionHeading
        eyebrow="Faces of the Club"
        title={"Leadership in 3D"}
        subtitle={
          "Experience our team through interactive 3D profiles showcasing service hours, projects, and achievements."
        }
        align="center"
      />

      <div className="mt-20">
        <div className="grid gap-12 md:grid-cols-2 xl:grid-cols-3">
          {officers.flat().map((officer, idx) => (
            <FuturisticMemberCard key={officer.name} officer={officer} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-6 pb-24">
      <SectionHeading
        eyebrow="Projects"
        title={"Immersive initiatives across dimensions"}
        subtitle={
          "Each initiative is a portal to experiential service — blending environment, innovation, health, and education into transformative realities."
        }
        align="center"
      />

      <motion.div
        {...fadeInUp()}
        className="mt-20 grid gap-12 sm:grid-cols-2"
      >
        {projectCategories.map((category) => (
          <ProjectCard key={category.name} category={category} />
        ))}
      </motion.div>
    </section>
  );
}

function ProjectCard({ category }: { category: ProjectCategory }) {
  return (
    <motion.article
      whileHover={{ scale: 1.02 }}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 shadow-[0_30px_120px_rgba(15,118,255,0.18)]"
    >
      <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
        <Image
          src={category.image}
          alt={category.name}
          width={960}
          height={720}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-sky-500/40 to-transparent" />
      </div>
      <div className="relative z-10 flex flex-col gap-4 p-8">
        <span className="text-4xl">{category.icon}</span>
        <h3 className="text-2xl font-semibold text-slate-100">{category.name}</h3>
        <p className="text-sm text-slate-200/70">{category.description}</p>
        <button className="neon-button mt-6 w-max px-6 py-2 text-xs uppercase tracking-[0.35em] text-slate-100">
          <span>Explore</span>
        </button>
      </div>
    </motion.article>
  );
}

function Events() {
  return (
    <section id="events" className="relative mx-auto max-w-6xl px-6 pb-24">
      <SectionHeading
        eyebrow="Events"
        title={"A kinetic calendar of experiences"}
        subtitle={
          "From flagship installations to dynamic service sprints, our events fuse spectacle with purpose and invite you to co-create."
        }
        align="center"
      />
      <div className="mt-20 grid gap-12 md:grid-cols-[0.6fr_1.4fr]">
        <motion.div
          {...fadeInUp()}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/10 p-6 text-slate-200 backdrop-blur-xl"
        >
          <h3 className="text-lg font-semibold uppercase tracking-[0.4em] text-sky-300/75">
            Aurum&apos;25
          </h3>
          <p className="mt-2 text-3xl font-semibold text-slate-50">
            Charter Installation
          </p>
          <div className="mt-6 flex items-center gap-3 text-sky-200/80">
            <CalendarRange className="h-5 w-5" />
            <span>July 12, 2025 · Colombo</span>
          </div>
          <p className="mt-6 text-sm text-slate-200/70">
            Immerse in a night of synchronized light, sonic storytelling, and the ceremonial unveiling of our next leadership constellation.
          </p>
          <a
            href="https://forms.gle/TjHd3bw3H8S53fGj6"
            target="_blank"
            rel="noopener noreferrer"
            className="neon-button mt-8 inline-flex px-6 py-2 items-center gap-2 group"
          >
            <span>RSVP / Register</span>
            <ArrowUpRight className="h-3 w-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </motion.div>
        <motion.div
          {...fadeInUp(0.1)}
          className="relative overflow-hidden rounded-3xl border border-sky-500/30 bg-slate-900/60 p-6"
        >
          <div className="grid gap-6 md:grid-cols-3">
            {events.map((event) => (
              <div
                key={event.title}
                className="group rounded-2xl border border-white/10 bg-slate-900/70 p-4 transition hover:border-sky-400/70 hover:bg-slate-900/80"
              >
                <h4 className="text-sm uppercase tracking-[0.35em] text-sky-300/70">
                  {event.date}
                </h4>
                <p className="mt-3 text-lg font-semibold text-slate-100">
                  {event.title}
                </p>
                <p className="mt-3 text-sm text-slate-300/75">{event.description}</p>
                <button className="mt-4 flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-sky-200/80 transition hover:text-sky-200">
                  {event.cta}
                  <ArrowUpRight className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Media() {
  return (
    <section id="media" className="relative mx-auto max-w-6xl px-6 pb-24">
      <SectionHeading
        eyebrow="Media Hub"
        title={"A living archive of light"}
        subtitle={
          "Explore our immersive galleries and story capsules capturing every pulse of LLCCUE. Digital magazine coming soon!"
        }
        align="center"
      />

      <div className="mt-20 grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        <motion.div
          {...fadeInUp()}
          className="grid gap-8 sm:grid-cols-2"
        >
          {newsItems.map((item) => (
            <article
              key={item.title}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={640}
                  height={480}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/10 via-sky-500/20 to-slate-900/60" />
              </div>
              <div className="relative z-10 flex flex-col gap-3 p-6">
                <h3 className="text-xl font-semibold text-slate-100">{item.title}</h3>
                <p className="text-sm text-slate-300/75">{item.excerpt}</p>
                <Link
                  href={item.href}
                  className="mt-4 flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-sky-200/80 transition hover:text-sky-200"
                >
                  Dive deeper
                  <ArrowUpRight className="h-3 w-3" />
                </Link>
              </div>
            </article>
          ))}
        </motion.div>
        <motion.div
          {...fadeInUp(0.15)}
          className="grid h-full gap-4 rounded-3xl border border-sky-500/30 bg-slate-900/60 p-4"
        >
          {galleryItems.map((src, idx) => (
            <motion.div
              key={src}
              className="group relative h-40 overflow-hidden rounded-2xl border border-white/10"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.4 }}
            >
              <Image
                src={src}
                alt={`Gallery item ${idx + 1}`}
                width={640}
                height={360}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900/30 via-transparent to-sky-400/20" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Join() {
  const benefits = [
    {
      title: "Immersive leadership journeys",
      description: "Experience multi-sensory programs that elevate your Leo journey beyond expectation.",
    },
    {
      title: "Innovation-first mindset",
      description: "Co-create projects with access to design sprints, digital labs, and mentorship pods.",
    },
    {
      title: "Global collaborations",
      description: "Plug into cross-border alliances and futuristic lionism experiences around the world.",
    },
  ];

  return (
    <section id="join" className="relative mx-auto max-w-6xl px-6 pb-24">
      <GlassCard className="overflow-hidden">
        <motion.div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8">
            <SectionHeading
              eyebrow="Join Us"
              title={"Be part of the future of Lionism"}
              subtitle={
                "Transform your service journey with LLCCUE's immersive ecosystems, leadership catalysts, and global collaborations."
              }
            />
            <div className="grid gap-6 md:grid-cols-3">
              {benefits.map((benefit, idx) => (
                <motion.div
                  key={benefit.title}
                  {...fadeInUp(idx * 0.15)}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6"
                >
                  <h4 className="text-sm uppercase tracking-[0.35em] text-sky-300/75">
                    {benefit.title}
                  </h4>
                  <p className="mt-4 text-sm text-slate-200/80">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
            <SoundInstruction />
          </div>

          <motion.div
            {...fadeInUp(0.2)}
            className="relative rounded-3xl border border-white/10 bg-slate-900/60 p-6"
          >
            <JoinForm />
          </motion.div>
        </motion.div>
      </GlassCard>
    </section>
  );
}

function JoinForm() {
  return (
    <div className="grid gap-6">
      <div className="text-center space-y-4">
        <h3 className="text-2xl font-semibold text-slate-50">
          Ready to Join LLCCUE?
        </h3>
        <p className="text-slate-300/80 leading-relaxed">
          Become part of Sri Lanka&apos;s most future-ready Leo club.
          Fill out our membership application form to start your journey with us.
        </p>
      </div>

      <div className="space-y-4">
        <a
          href="https://forms.gle/TjHd3bw3H8S53fGj6"
          target="_blank"
          rel="noopener noreferrer"
          className="neon-button w-full px-8 py-4 text-center inline-flex items-center justify-center gap-3 group"
        >
          <span>Join LLCCUE Today</span>
          <ArrowUpRight className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </a>

        <div className="p-4 rounded-2xl border border-sky-500/30 bg-slate-900/60">
          <p className="text-sm text-slate-300/70 text-center">
            📋 Application takes 5 minutes •
            🎯 Join 18+ passionate members •
            🌟 Start your leadership journey
          </p>
        </div>

        <div className="text-center space-y-2">
          <p className="text-xs text-slate-400/60">
            Questions? Email us at
            <a
              href="mailto:colombouptowneminence@gmail.com"
              className="text-sky-400 hover:text-sky-300 transition-colors ml-1"
            >
              colombouptowneminence@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

function SoundInstruction() {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-sky-500/30 bg-slate-900/60 px-4 py-3 text-xs uppercase tracking-[0.3em] text-sky-200/80">
      <MessageSquare className="h-4 w-4" />
      Hover to experience subtle soundscapes
    </div>
  );
}

function Contact() {
  return (
    <section id="contact" className="relative mx-auto max-w-6xl px-6 pb-24">
      <GlassCard className="overflow-hidden">
        <motion.div {...fadeInUp()} className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div className="space-y-6">
            <SectionHeading
              eyebrow="Contact"
              title={"Let's craft tomorrow together"}
              subtitle={
                "Ping us for collaborations, membership, or AI-augmented initiatives that elevate Lionism."
              }
            />
            <div className="grid gap-4 text-sm text-slate-200/80">
              <div>
                <span className="text-xs uppercase tracking-[0.35em] text-sky-300/70">
                  Headquarters
                </span>
                <p className="mt-2 text-base text-slate-100">
                  Colombo Uptown Hub, Sri Lanka
                </p>
              </div>
              <div>
                <span className="text-xs uppercase tracking-[0.35em] text-sky-300/70">
                  Email
                </span>
                <p className="mt-2 text-base text-slate-100">colombouptowneminence@gmail.com</p>
              </div>
              <div>
                <span className="text-xs uppercase tracking-[0.35em] text-sky-300/70">
                  Phone
                </span>
                <p className="mt-2 text-base text-slate-100">+94 77 000 0000</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="#"
                className="group flex h-12 w-12 items-center justify-center rounded-full border border-sky-400/40 bg-white/5 transition hover:border-sky-400/80 hover:bg-white/10"
                aria-label="Visit our global page"
              >
                <Globe2 className="h-5 w-5 text-sky-200" />
              </Link>
              <Link
                href="#"
                className="group flex h-12 w-12 items-center justify-center rounded-full border border-sky-400/40 bg-white/5 transition hover:border-sky-400/80 hover:bg-white/10"
                aria-label="Message us"
              >
                <MessageSquare className="h-5 w-5 text-sky-200" />
              </Link>
              <Link
                href="#"
                className="group flex h-12 w-12 items-center justify-center rounded-full border border-sky-400/40 bg-white/5 transition hover:border-sky-400/80 hover:bg-white/10"
                aria-label="Follow our updates"
              >
                <Sparkle className="h-5 w-5 text-sky-200" />
              </Link>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-white/10">
            <Image
              src={panoramaUrl("photo-1519681393784-d120267933ba")}
              alt="Map of Colombo Uptown"
              width={960}
              height={720}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950/5 via-sky-500/20 to-slate-900/60" />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="flex h-24 w-24 items-center justify-center rounded-full border border-sky-400/60 bg-sky-500/40 text-slate-50 backdrop-blur-md"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                LLCCUE
              </motion.div>
            </div>
          </div>
        </motion.div>
      </GlassCard>
    </section>
  );
}

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            key="chat-panel"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.45, ease: chatEase }}
            className="pointer-events-auto glass-panel relative w-[320px] max-w-sm overflow-hidden rounded-3xl border border-white/15 bg-slate-950/85 p-6 text-left"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-sky-300/80">AI Liaison</p>
                <h4 className="mt-2 text-lg font-semibold text-slate-50">LLCCUE Nova</h4>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.3em] text-slate-300/80 transition hover:border-sky-400/60 hover:text-sky-200"
              >
                Close
              </button>
            </div>
            <p className="mt-4 text-sm text-slate-300/80">
              Ask about membership, upcoming innovations, or how to collaborate with Leo Lions Club of Colombo Uptown Eminence.
            </p>
            <div className="mt-5 grid gap-3 text-xs">
              <button className="flex justify-between rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-left text-slate-200/85 transition hover:border-sky-400/60 hover:text-sky-100">
                What is Aurum&apos;25?
              </button>
              <button className="flex justify-between rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-left text-slate-200/85 transition hover:border-sky-400/60 hover:text-sky-100">
                How can I join LLCCUE?
              </button>
              <button className="flex justify-between rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-left text-slate-200/85 transition hover:border-sky-400/60 hover:text-sky-100">
                Share our latest innovation projects
              </button>
            </div>
            <div className="mt-6 flex flex-col gap-3">
              <a
                href="https://forms.gle/TjHd3bw3H8S53fGj6"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-sky-400/40 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.35em] text-sky-200 transition hover:border-sky-400/80 hover:bg-white/10 group"
              >
                Join LLCCUE
                <ArrowUpRight className="h-3 w-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              <Link
                href="#join"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.35em] text-slate-200/60 transition hover:border-white/40 hover:bg-white/10"
              >
                Learn More
                <ArrowUpRight className="h-3 w-3" />
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.button
        key="chat-toggle"
        onClick={() => setIsOpen((open) => !open)}
        className="pointer-events-auto inline-flex h-14 w-14 items-center justify-center rounded-full border border-sky-500/40 bg-sky-500/30 text-slate-100 shadow-[0_20px_60px_rgba(56,189,248,0.35)] backdrop-blur-xl transition hover:border-sky-400/80 hover:bg-sky-500/40"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        aria-label="Toggle LLCCUE AI chat"
      >
        <MessageSquare className="h-6 w-6" />
      </motion.button>
    </div>
  );
}

function AdminButton() {
  return (
    <div className="fixed bottom-6 left-6 z-40">
      <Link
        href="/admin"
        className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-500/40 bg-slate-500/20 text-slate-300 shadow-[0_20px_60px_rgba(148,163,184,0.25)] backdrop-blur-xl transition hover:border-slate-400/80 hover:bg-slate-500/30"
        aria-label="Access admin panel"
      >
        <Settings className="h-5 w-5" />
      </Link>
    </div>
  );
}
