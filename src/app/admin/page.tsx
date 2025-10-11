"use client";

import { motion } from "framer-motion";
import {
  Users,
  Calendar,
  Newspaper,
  TrendingUp,
  Activity,
  UserPlus,
} from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeading } from "@/components/ui/section-heading";

const stats = [
  {
    label: "Total Members",
    value: "24",
    change: "+12%",
    icon: Users,
    color: "text-blue-400",
  },
  {
    label: "Upcoming Events",
    value: "5",
    change: "+2",
    icon: Calendar,
    color: "text-green-400",
  },
  {
    label: "News Articles",
    value: "18",
    change: "+4",
    icon: Newspaper,
    color: "text-purple-400",
  },
  {
    label: "Applications",
    value: "7",
    change: "+3",
    icon: UserPlus,
    color: "text-orange-400",
  },
];

const recentActivity = [
  {
    action: "New membership application received",
    user: "System",
    time: "2 hours ago",
    type: "application",
  },
  {
    action: "Event details updated",
    user: "Admin",
    time: "5 hours ago",
    type: "event",
  },
  {
    action: "News article published",
    user: "Admin",
    time: "1 day ago",
    type: "news",
  },
  {
    action: "Team member added",
    user: "Admin",
    time: "2 days ago",
    type: "member",
  },
];

export default function AdminDashboard() {
  return (
    <div className="p-6 md:p-8">
      <SectionHeading
        eyebrow="Dashboard"
        title="Admin Overview"
        subtitle="Manage LLCCUE operations and monitor activity"
      />

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <GlassCard className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">{stat.label}</p>
                  <p className="mt-2 text-3xl font-bold text-slate-100">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs text-green-400">{stat.change}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="lg:col-span-2"
        >
          <GlassCard>
            <div className="flex items-center justify-between p-6">
              <h3 className="text-lg font-semibold text-slate-100">
                Recent Activity
              </h3>
              <Activity className="h-5 w-5 text-slate-400" />
            </div>
            <div className="divide-y divide-white/10">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-2 w-2 rounded-full bg-sky-400" />
                    <div>
                      <p className="text-sm text-slate-200">{activity.action}</p>
                      <p className="text-xs text-slate-400">by {activity.user}</p>
                    </div>
                  </div>
                  <span className="text-xs text-slate-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <GlassCard>
            <div className="flex items-center justify-between p-6">
              <h3 className="text-lg font-semibold text-slate-100">Quick Actions</h3>
              <TrendingUp className="h-5 w-5 text-slate-400" />
            </div>
            <div className="p-6 space-y-3">
              <button className="w-full rounded-2xl border border-white/10 bg-slate-900/70 p-3 text-left text-slate-200 hover:border-sky-400/60 hover:bg-slate-900/80 transition-colors">
                Add New Event
              </button>
              <button className="w-full rounded-2xl border border-white/10 bg-slate-900/70 p-3 text-left text-slate-200 hover:border-sky-400/60 hover:bg-slate-900/80 transition-colors">
                Publish News Article
              </button>
              <button className="w-full rounded-2xl border border-white/10 bg-slate-900/70 p-3 text-left text-slate-200 hover:border-sky-400/60 hover:bg-slate-900/80 transition-colors">
                Review Applications
              </button>
              <button className="w-full rounded-2xl border border-white/10 bg-slate-900/70 p-3 text-left text-slate-200 hover:border-sky-400/60 hover:bg-slate-900/80 transition-colors">
                Update Team Members
              </button>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}