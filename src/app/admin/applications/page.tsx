"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  User,
  Mail,
  Phone,
  Calendar,
  Check,
  X,
  MessageSquare,
  Eye,
  Download,
} from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeading } from "@/components/ui/section-heading";

interface Application {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  message: string;
  submittedAt: string;
  status: "pending" | "approved" | "rejected";
  experience: string;
  motivation: string;
}

const mockApplications: Application[] = [
  {
    id: "1",
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    phone: "+94 77 123 4567",
    role: "General Member",
    message: "I'm passionate about community service and would love to join LLCCUE to make a positive impact.",
    submittedAt: "2024-12-15T10:30:00Z",
    status: "pending",
    experience: "3 years of volunteer work at local NGOs",
    motivation: "Want to develop leadership skills while serving the community",
  },
  {
    id: "2",
    name: "Sarah Williams",
    email: "sarah.williams@email.com",
    phone: "+94 77 234 5678",
    role: "Project Lead",
    message: "Experienced project manager looking to contribute to meaningful initiatives.",
    submittedAt: "2024-12-14T15:45:00Z",
    status: "approved",
    experience: "5 years in project management",
    motivation: "Believe in the power of youth-led community service",
  },
  {
    id: "3",
    name: "Michael Chen",
    email: "michael.chen@email.com",
    phone: "+94 77 345 6789",
    role: "Marketing Coordinator",
    message: "Digital marketing specialist interested in helping LLCCUE grow its reach.",
    submittedAt: "2024-12-13T09:20:00Z",
    status: "pending",
    experience: "4 years in digital marketing and social media management",
    motivation: "Want to apply marketing skills for social good",
  },
  {
    id: "4",
    name: "Emma Davis",
    email: "emma.davis@email.com",
    phone: "+94 77 456 7890",
    role: "General Member",
    message: "University student eager to contribute to community service projects.",
    submittedAt: "2024-12-12T14:15:00Z",
    status: "rejected",
    experience: "Volunteer work at university clubs",
    motivation: "Looking to gain experience and make a difference",
  },
];

export default function ApplicationsManagement() {
  const [applications, setApplications] = useState<Application[]>(mockApplications);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

  const filteredApplications = applications.filter((application) => {
    const matchesSearch =
      application.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.role.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterStatus === "all" || application.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  const handleStatusChange = (id: string, newStatus: Application["status"]) => {
    setApplications(
      applications.map((app) =>
        app.id === id ? { ...app, status: newStatus } : app
      )
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status: Application["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30";
      case "approved":
        return "bg-green-500/20 text-green-300 border border-green-500/30";
      case "rejected":
        return "bg-red-500/20 text-red-300 border border-red-500/30";
      default:
        return "bg-slate-500/20 text-slate-300 border border-slate-500/30";
    }
  };

  const statusCounts = {
    total: applications.length,
    pending: applications.filter(app => app.status === "pending").length,
    approved: applications.filter(app => app.status === "approved").length,
    rejected: applications.filter(app => app.status === "rejected").length,
  };

  return (
    <div className="p-6 md:p-8">
      <SectionHeading
        eyebrow="Membership Applications"
        title="Manage Applications"
        subtitle="Review and respond to membership applications"
      />

      {/* Stats Cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Object.entries(statusCounts).map(([key, count]) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <GlassCard className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-slate-100">{count}</p>
                <p className="text-sm text-slate-400 capitalize">{key}</p>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search applications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-slate-900/70 pl-12 pr-4 py-3 text-sm text-slate-100 placeholder-slate-400 transition focus:border-sky-500/70 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
          />
        </div>
        <div className="flex gap-2">
          {["all", "pending", "approved", "rejected"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status as "all" | "pending" | "approved" | "rejected")}
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
        <button className="flex items-center gap-2 rounded-lg border border-white/10 bg-slate-900/70 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-sky-400/60 hover:bg-slate-900/80">
          <Download className="h-4 w-4" />
          Export
        </button>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {filteredApplications.map((application, index) => (
          <motion.div
            key={application.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <GlassCard>
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-slate-100">
                        {application.name}
                      </h3>
                      <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(application.status)}`}>
                        {application.status}
                      </span>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-4">
                      <div className="flex items-center gap-2 text-sm text-slate-300">
                        <Mail className="h-4 w-4 text-slate-400" />
                        <span>{application.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-300">
                        <Phone className="h-4 w-4 text-slate-400" />
                        <span>{application.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-300">
                        <User className="h-4 w-4 text-slate-400" />
                        <span>{application.role}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-300">
                        <Calendar className="h-4 w-4 text-slate-400" />
                        <span>{formatDate(application.submittedAt)}</span>
                      </div>
                    </div>

                    <p className="text-sm text-slate-300/80 mb-4 line-clamp-2">
                      {application.message}
                    </p>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedApplication(application)}
                        className="flex items-center gap-2 rounded-lg border border-white/10 bg-slate-900/70 px-4 py-2 text-xs font-medium text-slate-300 transition hover:border-sky-400/60 hover:bg-slate-900/80"
                      >
                        <Eye className="h-3 w-3" />
                        View Details
                      </button>

                      {application.status === "pending" && (
                        <>
                          <button
                            onClick={() => handleStatusChange(application.id, "approved")}
                            className="flex items-center gap-2 rounded-lg border border-green-500/40 bg-green-500/20 px-4 py-2 text-xs font-medium text-green-300 transition hover:border-green-400/80 hover:bg-green-500/30"
                          >
                            <Check className="h-3 w-3" />
                            Approve
                          </button>
                          <button
                            onClick={() => handleStatusChange(application.id, "rejected")}
                            className="flex items-center gap-2 rounded-lg border border-red-500/40 bg-red-500/20 px-4 py-2 text-xs font-medium text-red-300 transition hover:border-red-400/80 hover:bg-red-500/30"
                          >
                            <X className="h-3 w-3" />
                            Reject
                          </button>
                        </>
                      )}

                      <button className="flex items-center gap-2 rounded-lg border border-white/10 bg-slate-900/70 px-4 py-2 text-xs font-medium text-slate-300 transition hover:border-blue-400/60 hover:bg-slate-900/80">
                        <MessageSquare className="h-3 w-3" />
                        Contact
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Application Detail Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm">
          <GlassCard className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-slate-100 mb-2">
                    {selectedApplication.name}
                  </h3>
                  <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium ${getStatusColor(selectedApplication.status)}`}>
                    {selectedApplication.status}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedApplication(null)}
                  className="rounded-lg border border-white/10 bg-slate-900/70 p-2 text-slate-300 transition hover:border-slate-400/60 hover:bg-slate-900/80"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <h4 className="text-sm font-medium text-slate-400 mb-1">Email</h4>
                    <p className="text-slate-200">{selectedApplication.email}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-slate-400 mb-1">Phone</h4>
                    <p className="text-slate-200">{selectedApplication.phone}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-slate-400 mb-1">Applied Role</h4>
                    <p className="text-slate-200">{selectedApplication.role}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-slate-400 mb-1">Submitted</h4>
                    <p className="text-slate-200">{formatDate(selectedApplication.submittedAt)}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-slate-400 mb-2">Experience</h4>
                  <p className="text-slate-200">{selectedApplication.experience}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-slate-400 mb-2">Motivation</h4>
                  <p className="text-slate-200">{selectedApplication.motivation}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-slate-400 mb-2">Message</h4>
                  <p className="text-slate-200">{selectedApplication.message}</p>
                </div>

                <div className="flex gap-3 pt-4 border-t border-white/10">
                  {selectedApplication.status === "pending" && (
                    <>
                      <button
                        onClick={() => {
                          handleStatusChange(selectedApplication.id, "approved");
                          setSelectedApplication(null);
                        }}
                        className="flex-1 rounded-lg border border-green-500/40 bg-green-500/20 px-4 py-2 text-sm font-medium text-green-300 transition hover:border-green-400/80 hover:bg-green-500/30"
                      >
                        <Check className="h-4 w-4 inline mr-2" />
                        Approve Application
                      </button>
                      <button
                        onClick={() => {
                          handleStatusChange(selectedApplication.id, "rejected");
                          setSelectedApplication(null);
                        }}
                        className="flex-1 rounded-lg border border-red-500/40 bg-red-500/20 px-4 py-2 text-sm font-medium text-red-300 transition hover:border-red-400/80 hover:bg-red-500/30"
                      >
                        <X className="h-4 w-4 inline mr-2" />
                        Reject Application
                      </button>
                    </>
                  )}
                  <button className="flex-1 rounded-lg border border-white/10 bg-slate-900/70 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-blue-400/60 hover:bg-slate-900/80">
                    <MessageSquare className="h-4 w-4 inline mr-2" />
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
}