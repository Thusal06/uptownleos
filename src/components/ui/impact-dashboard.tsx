"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Activity } from "lucide-react";
import { GlassCard } from "./glass-card";
import { SectionHeading } from "./section-heading";

interface ProjectHeatmap {
  date: Date;
  projects: number;
  intensity: number;
}

export default function InteractiveImpactDashboard() {
  const [heatmap, setHeatmap] = useState<ProjectHeatmap[]>([]);

  useEffect(() => {
    // Generate heatmap data for the last 3 months
    const today = new Date();
    const threeMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 3, today.getDate());
    const heatmapData: ProjectHeatmap[] = [];

    const currentDate = new Date(threeMonthsAgo);
    while (currentDate <= today) {
      heatmapData.push({
        date: new Date(currentDate),
        projects: Math.floor(Math.random() * 5),
        intensity: Math.random(),
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    setHeatmap(heatmapData);
  }, []);

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
        title="Community Activity Overview"
        subtitle="Track our service activities and see how we're making a difference in the community"
        align="center"
      />

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

          <div className="mb-4">
            <p className="text-sm text-slate-400">
              Showing activity for the past 3 months
            </p>
          </div>

          {/* Month labels and calendar grid */}
          <div className="space-y-6">
            {(() => {
              const months = [...new Set(heatmap.map(d => d.date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })))];
              const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

              return months.map((monthLabel) => {
                const monthData = heatmap.filter(d =>
                  d.date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) === monthLabel
                );
                const firstDay = new Date(monthData[0]?.date).getDay() || 0;

                return (
                  <div key={monthLabel} className="space-y-4">
                    <h4 className="text-base font-semibold text-slate-200 mb-4">{monthLabel}</h4>

                    {/* Week day headers */}
                    <div className="grid grid-cols-7 gap-2">
                      {weekDays.map((day, i) => (
                        <div key={i} className="text-center text-sm font-medium text-slate-400">
                          {day}
                        </div>
                      ))}
                    </div>

                    {/* Calendar grid */}
                    <div className="grid grid-cols-7 gap-2">
                      {/* Empty cells for days before month starts */}
                      {Array.from({ length: firstDay }).map((_, i) => (
                        <div key={`empty-${i}`} className="aspect-square" />
                      ))}

                      {/* Actual days */}
                      {monthData.map((day, index) => (
                        <motion.div
                          key={`${monthLabel}-${index}`}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.3, delay: 0.6 + index * 0.01 }}
                          className={`aspect-square rounded-lg ${getHeatmapColor(day.intensity)} cursor-pointer hover:scale-110 transition-transform duration-200 flex items-center justify-center p-1`}
                          title={`${day.date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}: ${day.projects} projects`}
                        >
                          <span className="text-sm text-white font-semibold">
                            {day.date.getDate()}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                );
              });
            })()}
          </div>

          <div className="mt-8 flex items-center justify-between text-xs text-slate-400">
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

          </section>
  );
}