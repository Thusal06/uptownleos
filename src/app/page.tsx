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
import { SectionHeading } from "@/components/ui/section-heading";
import { GlassCard } from "@/components/ui/glass-card";
import FuturisticMemberCard from "@/components/ui/member-card-3d";
import InteractiveImpactDashboard from "@/components/ui/impact-dashboard";
import EnhancedParticles, { ServiceImpactParticles } from "@/components/ui/enhanced-particles";
import AIProjectMatcher from "@/components/ui/ai-project-matcher";
import Image from "next/image";
import Link from "next/link";

type Officer = {
  name: string;
  role: string;
  avatar: string;
  biography: string;
  background: string;
  achievements: string[];
  joinedYear: string;
  email: string;
  quote: string;
};

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

const officers: Officer[] = [
  {
    name: "Anuk Nisalitha",
    role: "President",
    avatar: "/board/anuk.jpg",
    biography: "Visionary leader with exceptional organizational skills and a passion for youth development. Dedicated to empowering young leaders through innovative service initiatives that create lasting community impact.",
    background: "Graduated with honors in Business Administration from University of Colombo. Previously served as Vice President and has led multiple award-winning service projects in leadership development.",
    achievements: ["Leadership Excellence Award 2024", "Innovation in Service", "Community Impact Champion"],
    joinedYear: "2021",
    email: "anuk@llccue.org",
    quote: "Leadership is not about being in charge. It's about taking care of those in your charge.",
  },
  {
    name: "Vihandu Wanniarachchi",
    role: "Vice President",
    avatar: "/board/vihandu.jpg",
    biography: "Strategic leader specializing in community outreach and member engagement. Excels at bridging the gap between leadership and members to foster a collaborative environment.",
    background: "Background in social work with extensive experience in community development programs. Previously led outreach initiatives for various NGOs and community organizations.",
    achievements: ["Community Outreach Excellence", "Member Engagement Award", "Mentorship Champion"],
    joinedYear: "2021",
    email: "vihandu@llccue.org",
    quote: "Together we can achieve what alone we cannot imagine.",
  },
  {
    name: "Thusal Ranawaka",
    role: "Secretary",
    avatar: "/board/thusal.jpg",
    biography: "Detail-oriented administrator with a passion for organization and efficiency. Ensures smooth operations and effective communication within the club leadership.",
    background: "Information Technology specialist with Project Management expertise. Brings digital innovation and systematic approaches to traditional service methods and club administration.",
    achievements: ["Digital Transformation Award", "Service Dedication", "Administrative Excellence"],
    joinedYear: "2021",
    email: "thusal@llccue.org",
    quote: "Excellence in administration enables excellence in service delivery.",
  },
  {
    name: "Rinoshi Nihara",
    role: "Treasurer",
    avatar: "/board/rinoshi.jpg",
    biography: "Financial expert with exceptional attention to detail and commitment to transparency. Manages club finances with integrity and strategic planning for sustainable growth.",
    background: "Professional accountant with extensive experience in non-profit financial management. Certified in financial governance and compliance best practices.",
    achievements: ["Financial Excellence Award", "Transparency Champion", "Strategic Planning"],
    joinedYear: "2022",
    email: "rinoshi@llccue.org",
    quote: "Financial transparency builds trust and strengthens our mission.",
  },
  {
    name: "Savindu Pahasara",
    role: "2nd Vice President",
    avatar: "/board/savindu.jpg",
    biography: "Dynamic leader with expertise in program coordination and team motivation. Brings fresh perspectives to vice presidential responsibilities and member development.",
    background: "Experienced in program management with a strong background in youth leadership development. Has successfully coordinated multiple large-scale service initiatives.",
    achievements: ["Program Coordination Excellence", "Youth Leadership Award", "Team Motivation Champion"],
    joinedYear: "2022",
    email: "savindu@llccue.org",
    quote: "Great leaders don't set out to be a leader. They set out to make a difference.",
  },
  {
    name: "Yohani Gunathilaka",
    role: "Assistant Secretary",
    avatar: "/board/yohani.jpg",
    biography: "Organized and efficient administrator supporting the Secretary in club operations. Ensures accurate record-keeping and smooth administrative processes.",
    background: "Background in office administration with experience in non-profit organizations. Brings systematic approaches to club documentation and communication.",
    achievements: ["Administrative Support Excellence", "Record Management Award", "Communication Skills"],
    joinedYear: "2022",
    email: "yohani@llccue.org",
    quote: "Attention to detail in administration creates excellence in service.",
  },
  {
    name: "Senuri Kawya",
    role: "Assistant Treasurer",
    avatar: "/board/senuri.jpg",
    biography: "Detail-oriented financial professional supporting the Treasurer in financial management and reporting. Ensures accuracy and compliance in all financial operations.",
    background: "Background in accounting and financial analysis with experience in supporting non-profit financial systems. Brings expertise in financial documentation.",
    achievements: ["Financial Support Excellence", "Reporting Accuracy Award", "Compliance Champion"],
    joinedYear: "2023",
    email: "senuri@llccue.org",
    quote: "Precision in financial management builds trust in our service mission.",
  },
  {
    name: "Sasira Vihanga",
    role: "Editor",
    avatar: "/board/sasira.jpg",
    biography: "Creative communications specialist responsible for club publications and media content. Ensures professional presentation of club activities and achievements.",
    background: "Background in journalism and content creation with experience in non-profit communications. Expert in storytelling and visual presentation.",
    achievements: ["Communication Excellence Award", "Creative Content Champion", "Media Relations"],
    joinedYear: "2022",
    email: "sasira@llccue.org",
    quote: "Great stories inspire great action and meaningful service.",
  },
  {
    name: "Ruchika Roshani",
    role: "Project Coordinator",
    avatar: "/board/ruchika.jpg",
    biography: "Organized project manager specializing in service project coordination and execution. Ensures successful implementation of club initiatives from planning to completion.",
    background: "Experience in project management with expertise in community service projects. Coordinates multiple stakeholders and ensures timely project delivery.",
    achievements: ["Project Management Excellence", "Service Implementation Award", "Stakeholder Coordination"],
    joinedYear: "2022",
    email: "ruchika@llccue.org",
    quote: "Successful projects start with excellent coordination and end with meaningful impact.",
  },
  {
    name: "Gayan Danasiri",
    role: "Project Coordinator",
    avatar: "/board/gayan.jpg",
    biography: "Strategic project coordinator focused on innovative service initiatives. Develops creative solutions to community challenges and ensures project sustainability.",
    background: "Background in community development with expertise in project planning and evaluation. Brings innovative approaches to traditional service projects.",
    achievements: ["Innovation in Project Management", "Sustainability Award", "Community Impact"],
    joinedYear: "2023",
    email: "gayan@llccue.org",
    quote: "Innovation in service delivery creates lasting community transformation.",
  },
  {
    name: "Seyara Bimdulee",
    role: "GST",
    avatar: "/board/seyara.jpg",
    biography: "Specialized leader responsible for Guiding Service Transition and member development. Ensures smooth integration of new members into the Leo movement.",
    background: "Background in educational leadership with experience in youth mentorship programs. Expert in member development and training initiatives.",
    achievements: ["Member Development Excellence", "Mentorship Award", "Integration Champion"],
    joinedYear: "2022",
    email: "seyara@llccue.org",
    quote: "Guiding new members creates the foundation for future leaders.",
  },
  {
    name: "Devnaka Lakvidu",
    role: "Lion Twister",
    avatar: "/board/devnaka.jpg",
    biography: "Youth engagement specialist responsible for connecting Leos with the broader Lions movement. Creates meaningful interactions between youth and senior members.",
    background: "Background in youth leadership with experience in intergenerational programs. Expert in creating engaging experiences that bridge age gaps.",
    achievements: ["Youth Engagement Excellence", "Interconnection Award", "Program Innovation"],
    joinedYear: "2023",
    email: "devnaka@llccue.org",
    quote: "Connecting generations strengthens our collective service impact.",
  },
  {
    name: "Methira Gunathilaka",
    role: "Lion Tamer",
    avatar: "/board/methira.jpg",
    biography: "Leadership development specialist focused on nurturing young leaders within the Leo movement. Designs and implements leadership training programs and mentorship opportunities.",
    background: "Background in educational psychology with expertise in youth leadership development. Experienced in creating structured leadership pathways.",
    achievements: ["Leadership Development Excellence", "Mentorship Programs Award", "Youth Empowerment"],
    joinedYear: "2022",
    email: "methira@llccue.org",
    quote: "Nurturing young leaders today creates service champions tomorrow.",
  },
  {
    name: "Hesani Withanage",
    role: "LCIF Coordinator",
    avatar: "/board/hesani.jpg",
    biography: "Grants and funding specialist responsible for managing Lions Clubs International Foundation projects. Ensures access to global funding opportunities for local initiatives.",
    background: "Background in grant management and non-profit funding with experience in international development programs. Expert in LCIF processes and requirements.",
    achievements: ["Grant Management Excellence", "Funding Success Award", "Global Partnership"],
    joinedYear: "2023",
    email: "hesani@llccue.org",
    quote: "Access to global resources amplifies our local service impact.",
  },
  {
    name: "Thesara Nethdulee",
    role: "GLT",
    avatar: "/board/thesara.jpg",
    biography: "Global Leadership Team representative connecting LLCCUE with the broader Leo movement. Ensures participation in international initiatives and global service projects.",
    background: "Background in international relations with experience in cross-cultural collaboration. Facilitates global partnerships and exchange programs.",
    achievements: ["Global Leadership Award", "International Partnership Success", "Cross-Cultural Exchange"],
    joinedYear: "2022",
    email: "thesara@llccue.org",
    quote: "Global connections create local impact with international reach.",
  },
  {
    name: "Tharuja Wanaguru",
    role: "GMT",
    avatar: "/board/tharuja.jpg",
    biography: "Global Membership Team member supporting membership growth and development initiatives. Coordinates with global membership programs and best practices.",
    background: "Background in membership management with experience in recruitment and retention strategies. Contributes to membership growth and engagement programs.",
    achievements: ["Membership Growth Award", "Engagement Programs Success", "Recruitment Excellence"],
    joinedYear: "2023",
    email: "tharuja@llccue.org",
    quote: "Growing our membership expands our capacity for service.",
  },
  {
    name: "Ranudi Perera",
    role: "GMCT",
    avatar: "/board/ranudi.jpg",
    biography: "Global Membership Chair Team representative coordinating global membership initiatives at the club level. Implements international membership strategies and programs.",
    background: "Experience in international program coordination with expertise in global Lions and Leo programs. Facilitates global membership campaigns and initiatives.",
    achievements: ["Global Coordination Excellence", "International Programs Success", "Global Campaigns"],
    joinedYear: "2022",
    email: "ranudi@llccue.org",
    quote: "Global collaboration creates stronger local service communities.",
  },
];

const projectCategories: ProjectCategory[] = [
  {
    name: "Environment",
    icon: "🌱",
    description: "Reimagining sustainability through smart eco-initiatives and green labs.",
    image: cardUrl("photo-1469474968028-56623f02e42e"),
  },
  {
    name: "Innovation",
    icon: "💡",
    description: "Design thinking, hackathons, and digital accelerators for positive change.",
    image: cardUrl("photo-1526498460520-4c246339dccb"),
  },
  {
    name: "Health",
    icon: "❤️",
    description:
      "Augmented health camps, wellness tech, and mindful programs for communities.",
    image: cardUrl("photo-1512406926046-631bb0abf902"),
  },
  {
    name: "Education",
    icon: "📘",
    description:
      "Immersive learning experiences, future skills workshops, and mentorship initiatives.",
    image: cardUrl("photo-1498050108023-c5249f4df085"),
  },
];

const events: Event[] = [
  {
    title: "Aurum&apos;25 Charter Installation",
    date: "July 12, 2025",
    description:
      "A luminous evening celebrating leadership ascension with synchronized light shows and immersive storytelling.",
    cta: "RSVP Now",
  },
  {
    title: "Neon Pulse Service Week",
    date: "August 18–24, 2025",
    description:
      "A full week of rapid-fire service missions supported by data dashboards and live impact tracking.",
    cta: "Join the Missions",
  },
  {
    title: "Quantum Impact Summit",
    date: "October 3, 2025",
    description:
      "Hybrid summit merging youth leaders, AI, and social innovation pioneers to design future solutions.",
    cta: "Request an Invite",
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
      <EnhancedParticles count={50} interactive={true} />
      <ServiceImpactParticles />
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
      <ChatWidget />
      <AdminButton />
    </div>
  );
}

function Hero({ parallaxY }: { parallaxY: MotionValue<number> }) {
  return (
    <section className="relative flex min-h-[90vh] items-center justify-center px-6 pb-24 pt-32 md:px-12">
      <motion.div
        style={{ y: parallaxY }}
        className="absolute inset-0 -z-10 overflow-hidden"
        aria-hidden
      >
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950/60 to-slate-900" />
        <motion.div
          className="absolute -left-24 top-10 h-[520px] w-[520px] rounded-full bg-sky-500/25 blur-3xl"
          animate={{ opacity: [0.25, 0.45, 0.25], scale: [1, 1.15, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-10 bottom-0 h-[460px] w-[460px] rounded-full bg-cyan-400/20 blur-3xl"
          animate={{ opacity: [0.2, 0.4, 0.2], scale: [1.1, 0.95, 1.1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute left-1/2 top-1/2 h-[680px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-500/20" 
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
          <Link
            href="#join"
            className="flex items-center gap-2 rounded-full border border-sky-500/40 bg-white/5 px-8 py-3 text-sm font-semibold text-sky-200 transition hover:border-sky-400/80 hover:bg-white/10"
          >
            Join the Movement
            <ArrowUpRight className="h-4 w-4" />
          </Link>
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
      new Array(42).fill(0).map((_, idx) => ({
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

      <div className="relative mt-16 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
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

      <div className="mt-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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
        className="mt-16 grid gap-8 sm:grid-cols-2"
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
      <div className="mt-16 grid gap-6 md:grid-cols-[0.6fr_1.4fr]">
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
          <Link
            href="#join"
            className="neon-button mt-8 inline-flex px-6 py-2"
          >
            <span>RSVP / Register</span>
          </Link>
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
          "Explore our digital magazine, immersive galleries, and story capsules capturing every pulse of LLCCUE."
        }
        align="center"
      />

      <div className="mt-16 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <motion.div
          {...fadeInUp()}
          className="grid gap-6 sm:grid-cols-2"
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
  const fields = [
    { label: "Full name", name: "name", type: "text" },
    { label: "Email", name: "email", type: "email" },
    { label: "Phone", name: "phone", type: "tel" },
    { label: "Current role", name: "role", type: "text" },
  ];

  return (
    <form className="grid gap-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {fields.map((field) => (
          <div key={field.name} className="floating-label relative">
            <input
              id={field.name}
              type={field.type}
              name={field.name}
              placeholder=" "
              className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-slate-100 shadow-[0_0_35px_rgba(59,130,246,0.16)] transition focus:border-sky-500/70 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
              required
            />
            <label
              htmlFor={field.name}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-xs uppercase tracking-[0.35em] text-slate-400/80"
            >
              {field.label}
            </label>
          </div>
        ))}
      </div>
      <div className="floating-label relative">
        <textarea
          id="message"
          name="message"
          placeholder=" "
          rows={4}
          className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-slate-100 shadow-[0_0_35px_rgba(59,130,246,0.16)] transition focus:border-sky-500/70 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
        />
        <label
          htmlFor="message"
          className="absolute left-4 top-4 text-xs uppercase tracking-[0.35em] text-slate-400/80"
        >
          Tell us about your spark
        </label>
      </div>
      <button type="submit" className="neon-button px-8 py-3">
        <span>Submit</span>
      </button>
    </form>
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
                <p className="mt-2 text-base text-slate-100">connect@llccue.org</p>
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
      <Footer />
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative mt-24 rounded-3xl border border-white/10 bg-slate-950/80 p-10 text-center">
      <div className="flex flex-col items-center gap-4">
        <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/10 px-6 py-3 backdrop-blur-xl">
          <Sparkle className="h-5 w-5 text-sky-300" />
          <span className="text-sm tracking-[0.3em] uppercase text-slate-100/75">
            LLCCUE
          </span>
        </div>
        <p className="text-sm uppercase tracking-[0.35em] text-slate-400/80">
          Lead. Serve. Uplift.
        </p>
        <p className="text-xs text-slate-500">
          © {new Date().getFullYear()} Leo Lions Club of Colombo Uptown Eminence. Crafted for the future of Lionism.
        </p>
      </div>
    </footer>
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
            <Link
              href="#join"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-sky-400/40 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.35em] text-sky-200 transition hover:border-sky-400/80 hover:bg-white/10"
            >
              Launch Full Chatbot
              <ArrowUpRight className="h-3 w-3" />
            </Link>
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
