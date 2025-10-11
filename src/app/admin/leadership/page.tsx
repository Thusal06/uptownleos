"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  UserPlus,
  Crown,
  Shield,
} from "lucide-react";
import Image from "next/image";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeading } from "@/components/ui/section-heading";

interface Officer {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  avatar: string;
  isActive: boolean;
}

const mockOfficers: Officer[] = [
  {
    id: "1",
    name: "Club President",
    role: "President",
    email: "president@llccue.org",
    phone: "+94 77 000 0001",
    avatar: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=150&h=150&fit=facearea",
    isActive: true,
  },
  {
    id: "2",
    name: "Club Secretary",
    role: "Secretary",
    email: "secretary@llccue.org",
    phone: "+94 77 000 0002",
    avatar: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=150&h=150&fit=facearea",
    isActive: true,
  },
  {
    id: "3",
    name: "Club Treasurer",
    role: "Treasurer",
    email: "treasurer@llccue.org",
    phone: "+94 77 000 0003",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&h=150&fit=facearea",
    isActive: true,
  },
  {
    id: "4",
    name: "Club Vice President",
    role: "Vice President",
    email: "vicepresident@llccue.org",
    phone: "+94 77 000 0004",
    avatar: "https://images.unsplash.com/photo-1541534401786-2077eed87a75?w=150&h=150&fit=facearea",
    isActive: true,
  },
];

const roleIcons: { [key: string]: React.ReactNode } = {
  President: <Crown className="h-4 w-4 text-yellow-400" />,
  Secretary: <Shield className="h-4 w-4 text-blue-400" />,
  Treasurer: <Shield className="h-4 w-4 text-green-400" />,
  "Vice President": <Crown className="h-4 w-4 text-yellow-400/70" />,
};

export default function LeadershipManagement() {
  const [officers, setOfficers] = useState<Officer[]>(mockOfficers);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredOfficers = officers.filter(
    (officer) =>
      officer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      officer.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setOfficers(officers.filter((officer) => officer.id !== id));
  };

  const handleToggleActive = (id: string) => {
    setOfficers(
      officers.map((officer) =>
        officer.id === id
          ? { ...officer, isActive: !officer.isActive }
          : officer
      )
    );
  };

  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <SectionHeading
          eyebrow="Leadership Team"
          title="Manage Officers"
          subtitle="Add, edit, and manage leadership team members"
        />
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 rounded-full border border-sky-500/40 bg-sky-500/20 px-6 py-3 text-sm font-semibold text-sky-200 transition hover:border-sky-400/80 hover:bg-sky-500/30"
        >
          <Plus className="h-4 w-4" />
          Add Officer
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search officers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-slate-900/70 pl-12 pr-4 py-3 text-sm text-slate-100 placeholder-slate-400 transition focus:border-sky-500/70 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
          />
        </div>
      </div>

      {/* Officers Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredOfficers.map((officer, index) => (
          <motion.div
            key={officer.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <GlassCard className="group">
              <div className="relative">
                <div className="flex items-start justify-between p-6">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Image
                        src={officer.avatar}
                        alt={officer.name}
                        width={64}
                        height={64}
                        className="h-16 w-16 rounded-full border-2 border-sky-500/30"
                      />
                      <div className="absolute -bottom-1 -right-1 rounded-full bg-slate-900 p-1">
                        {roleIcons[officer.role] || <UserPlus className="h-3 w-3 text-slate-400" />}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-100">
                        {officer.name}
                      </h3>
                      <p className="text-sm text-sky-300/80">{officer.role}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
                            officer.isActive
                              ? "bg-green-500/20 text-green-300"
                              : "bg-slate-500/20 text-slate-400"
                          }`}
                        >
                          <div
                            className={`h-1.5 w-1.5 rounded-full ${
                              officer.isActive ? "bg-green-400" : "bg-slate-400"
                            }`}
                          />
                          {officer.isActive ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6">
                  <div className="space-y-2 text-sm text-slate-300/70">
                    <p>📧 {officer.email}</p>
                    <p>📱 {officer.phone}</p>
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    <button
                      onClick={() => handleToggleActive(officer.id)}
                      className="flex-1 rounded-lg border border-white/10 bg-slate-900/70 px-3 py-2 text-xs font-medium text-slate-300 transition hover:border-sky-400/60 hover:bg-slate-900/80"
                    >
                      {officer.isActive ? "Deactivate" : "Activate"}
                    </button>
                    <button className="rounded-lg border border-white/10 bg-slate-900/70 p-2 text-slate-300 transition hover:border-blue-400/60 hover:bg-slate-900/80">
                      <Edit className="h-3 w-3" />
                    </button>
                    <button
                      onClick={() => handleDelete(officer.id)}
                      className="rounded-lg border border-white/10 bg-slate-900/70 p-2 text-slate-300 transition hover:border-red-400/60 hover:bg-slate-900/80"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Add Officer Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm">
          <GlassCard className="w-full max-w-md">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-slate-100 mb-4">
                Add New Officer
              </h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-white/10 bg-slate-900/70 px-4 py-2 text-sm text-slate-100 transition focus:border-sky-500/70 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
                    placeholder="Enter officer name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Role
                  </label>
                  <select className="w-full rounded-lg border border-white/10 bg-slate-900/70 px-4 py-2 text-sm text-slate-100 transition focus:border-sky-500/70 focus:outline-none focus:ring-2 focus:ring-sky-500/40">
                    <option value="">Select role</option>
                    <option value="President">President</option>
                    <option value="Vice President">Vice President</option>
                    <option value="Secretary">Secretary</option>
                    <option value="Treasurer">Treasurer</option>
                    <option value="Director">Director</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full rounded-lg border border-white/10 bg-slate-900/70 px-4 py-2 text-sm text-slate-100 transition focus:border-sky-500/70 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
                    placeholder="Enter email address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    className="w-full rounded-lg border border-white/10 bg-slate-900/70 px-4 py-2 text-sm text-slate-100 transition focus:border-sky-500/70 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
                    placeholder="Enter phone number"
                  />
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
                    Add Officer
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