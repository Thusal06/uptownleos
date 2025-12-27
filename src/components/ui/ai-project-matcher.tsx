"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Brain,
  Target,
  Users,
  MapPin,
  Clock,
  Heart,
  Sparkle,
  Zap,
  CheckCircle,
} from "lucide-react";
import { GlassCard } from "./glass-card";
import { SectionHeading } from "./section-heading";

interface MemberSkills {
  technical: number;
  leadership: number;
  communication: number;
  creativity: number;
  organization: number;
  empathy: number;
}

interface ServiceProject {
  id: string;
  title: string;
  category: string;
  description: string;
  location: string;
  timeCommitment: string;
  requiredSkills: MemberSkills;
  impact: string;
  urgency: "low" | "medium" | "high";
  participants: number;
  maxParticipants: number;
}

interface MatchResult {
  project: ServiceProject;
  matchScore: number;
  reasons: string[];
  skillAlignment: { [key: string]: number };
}

export default function AIProjectMatcher() {
  const [memberProfile, setMemberProfile] = useState<MemberSkills>({
    technical: 50,
    leadership: 50,
    communication: 50,
    creativity: 50,
    organization: 50,
    empathy: 50,
  });

  const [interests, setInterests] = useState<string[]>([]);
  const [availability, setAvailability] = useState<string[]>([]);
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const mockProjects: ServiceProject[] = [
    {
      id: "1",
      title: "Digital Literacy Workshop",
      category: "Education",
      description: "Teach digital skills to underprivileged youth in rural areas",
      location: "Colombo Suburbs",
      timeCommitment: "Weekends",
      requiredSkills: {
        technical: 80,
        leadership: 40,
        communication: 90,
        creativity: 60,
        organization: 70,
        empathy: 80,
      },
      impact: "100+ youth empowered",
      urgency: "high",
      participants: 8,
      maxParticipants: 12,
    },
    {
      id: "2",
      title: "Environmental Cleanup Campaign",
      category: "Environment",
      description: "Lead community cleanup and recycling awareness program",
      location: "Coastal Areas",
      timeCommitment: "Flexible",
      requiredSkills: {
        technical: 20,
        leadership: 90,
        communication: 80,
        creativity: 70,
        organization: 85,
        empathy: 60,
      },
      impact: "5 tons of waste collected",
      urgency: "medium",
      participants: 15,
      maxParticipants: 25,
    },
    {
      id: "3",
      title: "Senior Care Tech Support",
      category: "Health",
      description: "Help elderly citizens with technology and digital connectivity",
      location: "Elderly Homes",
      timeCommitment: "Evenings",
      requiredSkills: {
        technical: 70,
        leadership: 30,
        communication: 85,
        creativity: 40,
        organization: 50,
        empathy: 95,
      },
      impact: "50+ seniors connected",
      urgency: "high",
      participants: 6,
      maxParticipants: 10,
    },
  ];

  const skillCategories = [
    { key: "technical", label: "Technical", icon: "💻", color: "bg-blue-500" },
    { key: "leadership", label: "Leadership", icon: "👑", color: "bg-purple-500" },
    { key: "communication", label: "Communication", icon: "🗣️", color: "bg-green-500" },
    { key: "creativity", label: "Creativity", icon: "🎨", color: "bg-pink-500" },
    { key: "organization", label: "Organization", icon: "📋", color: "bg-yellow-500" },
    { key: "empathy", label: "Empathy", icon: "❤️", color: "bg-red-500" },
  ];

  const interestOptions = [
    "Education", "Environment", "Healthcare", "Technology", "Arts & Culture",
    "Youth Development", "Senior Care", "Animal Welfare", "Disaster Relief",
  ];

  const availabilityOptions = [
    "Weekdays", "Weekends", "Evenings", "Flexible", "Remote", "On-site",
  ];

  const calculateMatches = () => {
    setIsAnalyzing(true);

    // Simulate AI analysis
    setTimeout(() => {
      const results: MatchResult[] = mockProjects.map((project) => {
        let totalScore = 0;
        const reasons: string[] = [];
        const skillAlignment: { [key: string]: number } = {};

        // Calculate skill alignment
        Object.entries(project.requiredSkills).forEach(([skill, required]) => {
          const memberSkill = memberProfile[skill as keyof MemberSkills];
          const alignment = Math.min(memberSkill / required, 1.5) * 100;
          skillAlignment[skill] = alignment;
          totalScore += alignment;

          if (alignment >= 100) {
            reasons.push(`Strong ${skill} alignment`);
          } else if (alignment >= 70) {
            reasons.push(`Good ${skill} match`);
          }
        });

        // Interest matching
        if (interests.includes(project.category)) {
          totalScore += 20;
          reasons.push("Matches your interests");
        }

        // Urgency bonus
        if (project.urgency === "high") {
          totalScore += 15;
          reasons.push("High priority project");
        }

        // Availability matching
        const matchScore = Math.min(totalScore / 6, 100);

        return {
          project,
          matchScore,
          reasons: reasons.slice(0, 3),
          skillAlignment,
        };
      });

      // Sort by match score
      results.sort((a, b) => b.matchScore - a.matchScore);
      setMatches(results.slice(0, 3));
      setIsAnalyzing(false);
    }, 2000);
  };

  const getMatchColor = (score: number) => {
    if (score >= 85) return "text-green-400";
    if (score >= 70) return "text-yellow-400";
    return "text-blue-400";
  };

  const getMatchLabel = (score: number) => {
    if (score >= 85) return "Perfect Match";
    if (score >= 70) return "Great Match";
    return "Good Match";
  };

  return (
    <section className="relative z-10 mx-auto max-w-6xl px-6 pb-24">
      <SectionHeading
        eyebrow="AI Project Matcher"
        title="Find Your Perfect Service Opportunity"
        subtitle="Let our intelligent system match you with projects that align with your skills and passions"
        align="center"
      />

      <div className="mt-16 grid gap-8 lg:grid-cols-2">
        {/* Member Profile Input */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <GlassCard className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <Brain className="h-6 w-6 text-sky-400" />
              <h3 className="text-xl font-semibold text-white">Your Profile</h3>
            </div>

            {/* Skills Assessment */}
            <div className="space-y-4 mb-8">
              <h4 className="text-sm font-medium text-slate-300">Rate Your Skills</h4>
              {skillCategories.map((category) => (
                <div key={category.key} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">
                      {category.icon} {category.label}
                    </span>
                    <span className="text-sm text-white font-medium">
                      {memberProfile[category.key as keyof MemberSkills]}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={memberProfile[category.key as keyof MemberSkills]}
                    onChange={(e) =>
                      setMemberProfile({
                        ...memberProfile,
                        [category.key]: parseInt(e.target.value),
                      })
                    }
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
              ))}
            </div>

            {/* Interests */}
            <div className="mb-8">
              <h4 className="text-sm font-medium text-slate-300 mb-3">Areas of Interest</h4>
              <div className="flex flex-wrap gap-2">
                {interestOptions.map((interest) => (
                  <button
                    key={interest}
                    onClick={() => {
                      if (interests.includes(interest)) {
                        setInterests(interests.filter((i) => i !== interest));
                      } else {
                        setInterests([...interests, interest]);
                      }
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      interests.includes(interest)
                        ? "bg-sky-500/20 text-sky-300 border border-sky-500/40"
                        : "bg-slate-800 text-slate-400 border border-slate-600 hover:border-slate-500"
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="mb-8">
              <h4 className="text-sm font-medium text-slate-300 mb-3">Availability</h4>
              <div className="flex flex-wrap gap-2">
                {availabilityOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      if (availability.includes(option)) {
                        setAvailability(availability.filter((a) => a !== option));
                      } else {
                        setAvailability([...availability, option]);
                      }
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      availability.includes(option)
                        ? "bg-sky-500/20 text-sky-300 border border-sky-500/40"
                        : "bg-slate-800 text-slate-400 border border-slate-600 hover:border-slate-500"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Analyze Button */}
            <button
              onClick={calculateMatches}
              disabled={isAnalyzing}
              className="w-full flex items-center justify-center gap-2 rounded-full border border-sky-500/40 bg-sky-500/20 px-6 py-3 text-sm font-semibold text-sky-200 transition hover:border-sky-400/80 hover:bg-sky-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAnalyzing ? (
                <>
                  <div className="h-4 w-4 border-2 border-sky-300 border-t-transparent rounded-full animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkle className="h-4 w-4" />
                  Find My Matches
                </>
              )}
            </button>
          </GlassCard>
        </motion.div>

        {/* Match Results */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <GlassCard className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <Target className="h-6 w-6 text-sky-400" />
              <h3 className="text-xl font-semibold text-white">Recommended Projects</h3>
            </div>

            {matches.length === 0 ? (
              <div className="text-center py-12">
                <Brain className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400">
                  Complete your profile and click &quot;Find My Matches&quot; to get personalized project recommendations.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {matches.map((match, index) => (
                  <motion.div
                    key={match.project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="border border-white/10 rounded-2xl p-6 hover:border-sky-500/40 transition-colors"
                  >
                    {/* Match Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-1">
                          {match.project.title}
                        </h4>
                        <p className="text-sm text-slate-400">{match.project.category}</p>
                      </div>
                      <div className="text-right">
                        <div className={`text-lg font-bold ${getMatchColor(match.matchScore)}`}>
                          {Math.round(match.matchScore)}%
                        </div>
                        <div className={`text-xs ${getMatchColor(match.matchScore)}`}>
                          {getMatchLabel(match.matchScore)}
                        </div>
                      </div>
                    </div>

                    {/* Project Description */}
                    <p className="text-sm text-slate-300 mb-4">
                      {match.project.description}
                    </p>

                    {/* Project Details */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <MapPin className="h-3 w-3" />
                        {match.project.location}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <Clock className="h-3 w-3" />
                        {match.project.timeCommitment}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <Users className="h-3 w-3" />
                        {match.project.participants}/{match.project.maxParticipants}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <Heart className="h-3 w-3" />
                        {match.project.impact}
                      </div>
                    </div>

                    {/* Match Reasons */}
                    <div className="mb-4">
                      <h5 className="text-xs font-medium text-slate-300 mb-2">Why this matches:</h5>
                      <div className="space-y-1">
                        {match.reasons.map((reason, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <CheckCircle className="h-3 w-3 text-green-400" />
                            <span className="text-xs text-slate-400">{reason}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Skill Alignment */}
                    <div className="mb-4">
                      <h5 className="text-xs font-medium text-slate-300 mb-2">Skill Alignment</h5>
                      <div className="grid grid-cols-3 gap-2">
                        {Object.entries(match.skillAlignment).slice(0, 6).map(([skill, alignment]) => (
                          <div key={skill} className="text-center">
                            <div className="text-lg font-bold text-white">
                              {Math.round(alignment)}%
                            </div>
                            <div className="text-xs text-slate-500 capitalize">
                              {skill.slice(0, 4)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <button className="w-full flex items-center justify-center gap-2 rounded-lg border border-sky-500/40 bg-sky-500/20 px-4 py-2 text-sm font-medium text-sky-200 transition hover:border-sky-400/80 hover:bg-sky-500/30">
                      <Zap className="h-4 w-4" />
                      Join This Project
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}