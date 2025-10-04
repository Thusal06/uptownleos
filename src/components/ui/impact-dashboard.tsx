"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  TrendingUp,
  Users,
  Award,
  Globe,
  Heart,
  Zap,
  Target,
  Activity,
} from "lucide-react";
import { GlassCard } from "./glass-card";
import { SectionHeading } from "./section-heading";

interface ImpactMetric {
  label: string;
  value: number;
  target: number;
  unit: string;
  icon: React.ReactNode;
  color: string;
  trend: number;
}

interface ProjectHeatmap {
  day: number;
  projects: number;
  intensity: number;
}

export default function InteractiveImpactDashboard() {
  const [metrics, setMetrics] = useState<ImpactMetric[]>([
    {
      label: "Service Hours",
      value: 0,
      target: 5000,
      unit: "hours",
      icon: <Heart className="h-5 w-5" />,
      color: "text-red-400",
      trend: 12.5,
    },
    {
      label: "Lives Impacted",
      value: 0,
      target: 10000,
      unit: "people",
      icon: <Users className="h-5 w-5" />,
      color: "text-blue-400",
      trend: 18.2,
    },
    {
      label: "Projects Completed",
      value: 0,
      target: 50,
      unit: "projects",
      icon: <Target className="h-5 w-5" />,
      color: "text-green-400",
      trend: 8.7,
    },
    {
      label: "Funds Raised",
      value: 0,
      target: 50000,
      unit: "LKR",
      icon: <Zap className="h-5 w-5" />,
      color: "text-yellow-400",
      trend: 25.3,
    },
  ]);

  const [heatmap, setHeatmap] = useState<ProjectHeatmap[]>([]);
  const [activeMetric, setActiveMetric] = useState<number | null>(null);

  // Animate metrics on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setMetrics([
        {
          label: "Service Hours",
          value: 3847,
          target: 5000,
          unit: "hours",
          icon: <Heart className="h-5 w-5" />,
          color: "text-red-400",
          trend: 12.5,
        },
        {
          label: "Lives Impacted",
          value: 7823,
          target: 10000,
          unit: "people",
          icon: <Users className="h-5 w-5" />,
          color: "text-blue-400",
          trend: 18.2,
        },
        {
          label: "Projects Completed",
          value: 42,
          target: 50,
          unit: "projects",
          icon: <Target className="h-5 w-5" />,
          color: "text-green-400",
          trend: 8.7,
        },
        {
          label: "Funds Raised",
          value: 38500,
          target: 50000,
          unit: "LKR",
          icon: <Zap className="h-5 w-5" />,
          color: "text-yellow-400",
          trend: 25.3,
        },
      ]);
    }, 500);

    // Generate heatmap data
    const heatmapData = Array.from({ length: 30 }, (_, i) => ({
      day: i + 1,
      projects: Math.floor(Math.random() * 5),
      intensity: Math.random(),
    }));
    setHeatmap(heatmapData);

    return () => clearTimeout(timer);
  }, []);

  const getProgressPercentage = (value: number, target: number) => {
    return Math.min((value / target) * 100, 100);
  };

  const getHeatmapColor = (intensity: number) => {
    if (intensity < 0.2) return "bg-slate-800";
    if (intensity < 0.4) return "bg-sky-900";
    if (intensity < 0.6) return "bg-sky-700";
    if (intensity < 0.8) return "bg-sky-500";
    return "bg-sky-400";
  };

  return (
    <section className="relative z-10 mx-auto max-w-6xl px-6 pb-24">
      <SectionHeading
        eyebrow="Impact Dashboard"
        title="Real-time Community Impact"
        subtitle="Track our service metrics and see how we're making a difference in real-time"
        align="center"
      />

      {/* Main Metrics Grid */}
      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            onMouseEnter={() => setActiveMetric(index)}
            onMouseLeave={() => setActiveMetric(null)}
            className="relative"
          >
            <GlassCard
              className={`p-6 cursor-pointer transition-all duration-300 ${
                activeMetric === index
                  ? "border-sky-400/60 shadow-[0_0_60px_rgba(56,189,248,0.4)] scale-105"
                  : "hover:border-sky-500/40"
              }`}
            >
              {/* Glow Effect */}
              <div
                className={`absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 ${
                  activeMetric === index ? "opacity-20" : ""
                }`}
                style={{
                  background: `radial-gradient(circle at center, ${metric.color.replace('text-', 'rgba(').replace('400', '66, 165, 245, 0.3)')}, transparent)`,
                }}
              />

              <div className="relative z-10">
                {/* Icon */}
                <div className={`flex items-center justify-between mb-4 ${metric.color}`}>
                  {metric.icon}
                  {metric.trend > 0 && (
                    <div className="flex items-center gap-1 text-xs font-medium text-green-400">
                      <TrendingUp className="h-3 w-3" />
                      {metric.trend}%
                    </div>
                  )}
                </div>

                {/* Value */}
                <div className="mb-2">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                    className="text-3xl font-bold text-white"
                  >
                    {metric.value.toLocaleString()}
                  </motion.div>
                  <div className="text-sm text-slate-400">{metric.unit}</div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span>Progress</span>
                    <span>{Math.round(getProgressPercentage(metric.value, metric.target))}%</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${getProgressPercentage(metric.value, metric.target)}%` }}
                      transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                      className={`h-full bg-gradient-to-r ${
                        metric.color === "text-red-400"
                          ? "from-red-500 to-pink-500"
                          : metric.color === "text-blue-400"
                          ? "from-blue-500 to-cyan-500"
                          : metric.color === "text-green-400"
                          ? "from-green-500 to-emerald-500"
                          : "from-yellow-500 to-orange-500"
                      } rounded-full`}
                    />
                  </div>
                  <div className="mt-1 text-xs text-slate-500">
                    Target: {metric.target.toLocaleString()} {metric.unit}
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Activity Heatmap */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-12"
      >
        <GlassCard className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white">Activity Heatmap</h3>
            <Activity className="h-5 w-5 text-slate-400" />
          </div>

          <div className="grid grid-cols-7 gap-2">
            {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
              <div key={i} className="text-center text-xs font-medium text-slate-400 mb-2">
                {day}
              </div>
            ))}

            {heatmap.map((day, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.6 + index * 0.02 }}
                className={`aspect-square rounded ${getHeatmapColor(day.intensity)} cursor-pointer hover:scale-110 transition-transform duration-200`}
                title={`Day ${day.day}: ${day.projects} projects`}
              />
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between text-xs text-slate-400">
            <span>Less activity</span>
            <div className="flex gap-1">
              <div className="h-3 w-3 bg-slate-800 rounded" />
              <div className="h-3 w-3 bg-sky-900 rounded" />
              <div className="h-3 w-3 bg-sky-700 rounded" />
              <div className="h-3 w-3 bg-sky-500 rounded" />
              <div className="h-3 w-3 bg-sky-400 rounded" />
            </div>
            <span>More activity</span>
          </div>
        </GlassCard>
      </motion.div>

      {/* Live Activity Feed */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="mt-12"
      >
        <GlassCard className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white">Live Activity Feed</h3>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs text-green-400">Live</span>
            </div>
          </div>

          <div className="space-y-4">
            {[
              {
                action: "New service project completed",
                detail: "Clean Water Initiative - 250 families served",
                time: "2 minutes ago",
                icon: <Award className="h-4 w-4 text-yellow-400" />,
              },
              {
                action: "Member milestone achieved",
                detail: "Sarah Johnson reached 500 service hours",
                time: "15 minutes ago",
                icon: <Users className="h-4 w-4 text-blue-400" />,
              },
              {
                action: "Fundraising goal met",
                detail: "Education campaign raised LKR 15,000",
                time: "1 hour ago",
                icon: <Zap className="h-4 w-4 text-green-400" />,
              },
              {
                action: "New partnership formed",
                detail: "Collaboration with Colombo City Council",
                time: "3 hours ago",
                icon: <Globe className="h-4 w-4 text-purple-400" />,
              },
            ].map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                className="flex items-start gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
              >
                <div className="flex-shrink-0 mt-1">{activity.icon}</div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">{activity.action}</p>
                  <p className="text-xs text-slate-400 mt-1">{activity.detail}</p>
                </div>
                <span className="text-xs text-slate-500 flex-shrink-0">{activity.time}</span>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </motion.div>
    </section>
  );
}