"use client";

import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Showcase from "@/components/sections/showcase";
import Projects from "@/components/sections/projects";
import LionOfMonth from "@/components/sections/lion-of-month";
import Leadership from "@/components/sections/leadership";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <About />

      {/* Showcase Section */}
      <Showcase />

      {/* Leadership Section */}
      <Leadership />

      {/* Projects Section */}
      <Projects />

      {/* Lion of the Month Section */}
      <LionOfMonth />

      {/* Footer */}
      <Footer />
    </main>
  );
}
