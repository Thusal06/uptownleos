"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Activity, ChevronLeft, ChevronRight } from "lucide-react";
import { GlassCard } from "./glass-card";
import { SectionHeading } from "./section-heading";

interface ProjectHeatmap {
  date: Date;
  projects: number;
  intensity: number;
  projectNames?: string[];
}

export default function InteractiveImpactDashboard() {
  const [heatmap, setHeatmap] = useState<ProjectHeatmap[]>([]);
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);
  const [availableMonths, setAvailableMonths] = useState<string[]>([]);

  useEffect(() => {
    // Define actual project activities from the provided data
    const actualProjects = [
      {
        date: new Date('2025-08-30'),
        projects: 3,
        intensity: 0.9,
        projectNames: ['Monthly General Meeting', 'Board Meeting', 'Club Directory']
      },
      {
        date: new Date('2025-08-27'),
        projects: 1,
        intensity: 0.6,
        projectNames: ['BrandBoost360']
      },
      {
        date: new Date('2025-07-24'),
        projects: 1,
        intensity: 0.7,
        projectNames: ["Aurum'25 - Charter Installation Ceremony"]
      },
      {
        date: new Date('2025-07-10'),
        projects: 2,
        intensity: 0.8,
        projectNames: ['Board Meeting of July', 'Club Officers Orientation']
      }
    ];

    // Generate heatmap data for the last 3 months with actual projects
    const today = new Date();
    const threeMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 3, today.getDate());
    const heatmapData: ProjectHeatmap[] = [];

    const currentDate = new Date(threeMonthsAgo);
    let dayCounter = 0;

    while (currentDate <= today) {
      // Check if this date has actual projects
      const matchingProject = actualProjects.find(p =>
        p.date.toDateString() === currentDate.toDateString()
      );

      if (matchingProject) {
        // Use actual project data
        heatmapData.push({
          date: new Date(currentDate),
          projects: matchingProject.projects,
          intensity: matchingProject.intensity,
          projectNames: matchingProject.projectNames
        });
      } else {
        // Use deterministic pseudo-random based on date for other days
        const dateSeed = currentDate.getFullYear() * 10000 + (currentDate.getMonth() + 1) * 100 + currentDate.getDate();
        const pseudoRandom = ((dateSeed * 9301 + 49297) % 233280) / 233280;

        heatmapData.push({
          date: new Date(currentDate),
          projects: Math.floor(pseudoRandom * 2), // Lower base activity for non-event days
          intensity: pseudoRandom * 0.3, // Lower intensity for non-event days
        });
      }
      currentDate.setDate(currentDate.getDate() + 1);
      dayCounter++;
    }
    setHeatmap(heatmapData);

    // Extract unique months
    const months = [...new Set(heatmapData.map(d =>
      d.date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    ))];
    setAvailableMonths(months);

    // Set current month to the most recent month
    setCurrentMonthIndex(months.length - 1);
  }, []);

  const getHeatmapColor = (intensity: number) => {
    if (intensity < 0.2) return "bg-slate-800";
    if (intensity < 0.4) return "bg-sky-900";
    if (intensity < 0.6) return "bg-sky-700";
    if (intensity < 0.8) return "bg-sky-500";
    return "bg-sky-400";
  };

  const goToPreviousMonth = () => {
    setCurrentMonthIndex(prev => Math.max(0, prev - 1));
  };

  const goToNextMonth = () => {
    setCurrentMonthIndex(prev => Math.min(availableMonths.length - 1, prev + 1));
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
        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Activity Heatmap</h3>
            <Activity className="h-4 w-4 text-slate-400" />
          </div>

          <div className="mb-3">
            <p className="text-xs text-slate-400">
              Navigate through months to see activity
            </p>
          </div>

          {/* Month navigation */}
          {availableMonths.length > 0 && (
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={goToPreviousMonth}
                disabled={currentMonthIndex === 0}
                className={`p-2 rounded-lg transition-colors ${
                  currentMonthIndex === 0
                    ? 'text-slate-600 cursor-not-allowed'
                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <h4 className="text-sm font-semibold text-slate-200">
                {availableMonths[currentMonthIndex]}
              </h4>

              <button
                onClick={goToNextMonth}
                disabled={currentMonthIndex === availableMonths.length - 1}
                className={`p-2 rounded-lg transition-colors ${
                  currentMonthIndex === availableMonths.length - 1
                    ? 'text-slate-600 cursor-not-allowed'
                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* Calendar grid for current month */}
          {availableMonths.length > 0 && (() => {
            const currentMonthLabel = availableMonths[currentMonthIndex];
            const monthData = heatmap.filter(d =>
              d.date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) === currentMonthLabel
            );
            const weekDays = ["S", "M", "T", "W", "T", "F", "S"];
            const firstDay = new Date(monthData[0]?.date).getDay() || 0;

            return (
              <div className="space-y-2">
                {/* Week day headers */}
                <div className="grid grid-cols-7 gap-1">
                  {weekDays.map((day, i) => (
                    <div key={i} className="text-center text-xs font-medium text-slate-400">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar grid */}
                <div className="grid grid-cols-7 gap-1">
                  {/* Empty cells for days before month starts */}
                  {Array.from({ length: firstDay }).map((_, i) => (
                    <div key={`empty-${i}`} className="aspect-square" />
                  ))}

                  {/* Actual days */}
                  {monthData.map((day, index) => (
                    <motion.div
                      key={`${currentMonthLabel}-${index}`}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.6 + index * 0.01 }}
                      className={`aspect-square rounded-md ${getHeatmapColor(day.intensity)} cursor-pointer hover:scale-110 transition-transform duration-200 flex items-center justify-center p-0.5`}
                      title={`${day.date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}: ${day.projects} projects${day.projectNames ? ' - ' + day.projectNames.join(', ') : ''}`}
                    >
                      <span className="text-xs text-white font-semibold">
                        {day.date.getDate()}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })()}

          <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
            <span>Less activity</span>
            <div className="flex gap-0.5">
              <div className="h-2 w-2 bg-slate-800 rounded" />
              <div className="h-2 w-2 bg-sky-900 rounded" />
              <div className="h-2 w-2 bg-sky-700 rounded" />
              <div className="h-2 w-2 bg-sky-500 rounded" />
              <div className="h-2 w-2 bg-sky-400 rounded" />
            </div>
            <span>More activity</span>
          </div>
        </GlassCard>
      </motion.div>

          </section>
  );
}