"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Calendar,
  MapPin,
  Users,
  Eye,
  EyeOff,
} from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeading } from "@/components/ui/section-heading";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  capacity: number;
  registered: number;
  isPublished: boolean;
  isUpcoming: boolean;
}

const mockEvents: Event[] = [
  {
    id: "1",
    title: "Aurum'25 Charter Installation",
    date: "2025-07-12",
    time: "18:00",
    location: "Colombo Hilton",
    description: "A luminous evening celebrating leadership ascension with synchronized light shows and immersive storytelling.",
    capacity: 200,
    registered: 156,
    isPublished: true,
    isUpcoming: true,
  },
  {
    id: "2",
    title: "Neon Pulse Service Week",
    date: "2025-08-18",
    time: "09:00",
    location: "Multiple Locations",
    description: "A full week of rapid-fire service missions supported by data dashboards and live impact tracking.",
    capacity: 500,
    registered: 89,
    isPublished: true,
    isUpcoming: true,
  },
  {
    id: "3",
    title: "Quantum Impact Summit",
    date: "2025-10-03",
    time: "10:00",
    location: "BMICH",
    description: "Hybrid summit merging youth leaders, AI, and social innovation pioneers to design future solutions.",
    capacity: 300,
    registered: 45,
    isPublished: false,
    isUpcoming: true,
  },
  {
    id: "4",
    title: "Leadership Workshop 2024",
    date: "2024-12-15",
    time: "14:00",
    location: "LLCCUE Hub",
    description: "Annual leadership development workshop for team members and prospective leaders.",
    capacity: 50,
    registered: 48,
    isPublished: true,
    isUpcoming: false,
  },
];

export default function EventsManagement() {
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "upcoming" | "past">("all");
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterStatus === "all" ||
      (filterStatus === "upcoming" && event.isUpcoming) ||
      (filterStatus === "past" && !event.isUpcoming);

    return matchesSearch && matchesFilter;
  });

  const handleDelete = (id: string) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  const handleTogglePublish = (id: string) => {
    setEvents(
      events.map((event) =>
        event.id === id
          ? { ...event, isPublished: !event.isPublished }
          : event
      )
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getRegistrationProgress = (registered: number, capacity: number) => {
    const percentage = (registered / capacity) * 100;
    return Math.min(percentage, 100);
  };

  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <SectionHeading
          eyebrow="Events Management"
          title="Manage Events"
          subtitle="Create, edit, and manage club events and registrations"
        />
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 rounded-full border border-sky-500/40 bg-sky-500/20 px-6 py-3 text-sm font-semibold text-sky-200 transition hover:border-sky-400/80 hover:bg-sky-500/30"
        >
          <Plus className="h-4 w-4" />
          Create Event
        </button>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-slate-900/70 pl-12 pr-4 py-3 text-sm text-slate-100 placeholder-slate-400 transition focus:border-sky-500/70 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
          />
        </div>
        <div className="flex gap-2">
          {["all", "upcoming", "past"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status as any)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition capitalize ${
                filterStatus === status
                  ? "bg-sky-500/20 text-sky-300 border border-sky-500/30"
                  : "border border-white/10 bg-slate-900/70 text-slate-300 hover:border-sky-400/60"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Events List */}
      <div className="space-y-6">
        {filteredEvents.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <GlassCard>
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-slate-100">
                        {event.title}
                      </h3>
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
                          event.isPublished
                            ? "bg-green-500/20 text-green-300"
                            : "bg-yellow-500/20 text-yellow-300"
                        }`}
                      >
                        {event.isPublished ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                        {event.isPublished ? "Published" : "Draft"}
                      </span>
                      {event.isUpcoming && (
                        <span className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium bg-blue-500/20 text-blue-300">
                          <Calendar className="h-3 w-3" />
                          Upcoming
                        </span>
                      )}
                    </div>

                    <p className="text-slate-300/80 mb-4">{event.description}</p>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-4">
                      <div className="flex items-center gap-2 text-sm text-slate-300">
                        <Calendar className="h-4 w-4 text-slate-400" />
                        <span>{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-300">
                        <span className="text-slate-400">🕐</span>
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-300">
                        <MapPin className="h-4 w-4 text-slate-400" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-300">
                        <Users className="h-4 w-4 text-slate-400" />
                        <span>{event.registered}/{event.capacity} registered</span>
                      </div>
                    </div>

                    {/* Registration Progress */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                        <span>Registration Progress</span>
                        <span>{Math.round(getRegistrationProgress(event.registered, event.capacity))}%</span>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-sky-400 to-blue-500 transition-all duration-500"
                          style={{ width: `${getRegistrationProgress(event.registered, event.capacity)}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleTogglePublish(event.id)}
                        className="rounded-lg border border-white/10 bg-slate-900/70 px-4 py-2 text-xs font-medium text-slate-300 transition hover:border-sky-400/60 hover:bg-slate-900/80"
                      >
                        {event.isPublished ? "Unpublish" : "Publish"}
                      </button>
                      <button className="rounded-lg border border-white/10 bg-slate-900/70 px-4 py-2 text-xs font-medium text-slate-300 transition hover:border-blue-400/60 hover:bg-slate-900/80">
                        <Edit className="h-3 w-3 inline mr-1" />
                        Edit
                      </button>
                      <button className="rounded-lg border border-white/10 bg-slate-900/70 px-4 py-2 text-xs font-medium text-slate-300 transition hover:border-green-400/60 hover:bg-slate-900/80">
                        <Users className="h-3 w-3 inline mr-1" />
                        View Registrations
                      </button>
                      <button
                        onClick={() => handleDelete(event.id)}
                        className="rounded-lg border border-white/10 bg-slate-900/70 px-4 py-2 text-xs font-medium text-red-400 transition hover:border-red-400/60 hover:bg-slate-900/80"
                      >
                        <Trash2 className="h-3 w-3 inline mr-1" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Add Event Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm">
          <GlassCard className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-slate-100 mb-4">
                Create New Event
              </h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Event Title
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-white/10 bg-slate-900/70 px-4 py-2 text-sm text-slate-100 transition focus:border-sky-500/70 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
                    placeholder="Enter event title"
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      className="w-full rounded-lg border border-white/10 bg-slate-900/70 px-4 py-2 text-sm text-slate-100 transition focus:border-sky-500/70 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Time
                    </label>
                    <input
                      type="time"
                      className="w-full rounded-lg border border-white/10 bg-slate-900/70 px-4 py-2 text-sm text-slate-100 transition focus:border-sky-500/70 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-white/10 bg-slate-900/70 px-4 py-2 text-sm text-slate-100 transition focus:border-sky-500/70 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
                    placeholder="Enter event location"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Description
                  </label>
                  <textarea
                    rows={4}
                    className="w-full rounded-lg border border-white/10 bg-slate-900/70 px-4 py-2 text-sm text-slate-100 transition focus:border-sky-500/70 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
                    placeholder="Enter event description"
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Capacity
                    </label>
                    <input
                      type="number"
                      className="w-full rounded-lg border border-white/10 bg-slate-900/70 px-4 py-2 text-sm text-slate-100 transition focus:border-sky-500/70 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
                      placeholder="Maximum attendees"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Registration Type
                    </label>
                    <select className="w-full rounded-lg border border-white/10 bg-slate-900/70 px-4 py-2 text-sm text-slate-100 transition focus:border-sky-500/70 focus:outline-none focus:ring-2 focus:ring-sky-500/40">
                      <option value="free">Free</option>
                      <option value="paid">Paid</option>
                      <option value="invitation">Invitation Only</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 rounded-lg border border-white/10 bg-slate-900/70 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-slate-400/60 hover:bg-slate-900/80"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 rounded-lg border border-sky-500/40 bg-sky-500/20 px-4 py-2 text-sm font-medium text-sky-200 transition hover:border-sky-400/80 hover:bg-sky-500/30"
                  >
                    Create Event
                  </button>
                </div>
              </form>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
}