"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  UserPlus,
  Crown,
  Shield,
  Save,
  X,
} from "lucide-react";
import Image from "next/image";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeading } from "@/components/ui/section-heading";

interface Officer {
  _id: string;
  name: string;
  role: string;
  email: string;
  avatar: string;
  biography: string;
  background: string;
  achievements: string[];
  joinedYear: string;
  quote: string;
  isActive: boolean;
  order: number;
}

const roleIcons: { [key: string]: React.ReactNode } = {
  President: <Crown className="h-4 w-4 text-yellow-400" />,
  Secretary: <Shield className="h-4 w-4 text-blue-400" />,
  Treasurer: <Shield className="h-4 w-4 text-green-400" />,
  "Vice President": <Crown className="h-4 w-4 text-yellow-400/70" />,
};

export default function LeadershipManagement() {
  const [officers, setOfficers] = useState<Officer[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingOfficer, setEditingOfficer] = useState<Officer | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    email: "",
    avatar: "",
    biography: "",
    background: "",
    achievements: "",
    joinedYear: "",
    quote: "",
  });

  useEffect(() => {
    fetchOfficers();
  }, []);

  const fetchOfficers = async () => {
    try {
      const response = await fetch('/api/officers');
      const data = await response.json();
      if (data.success) {
        setOfficers(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch officers:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredOfficers = officers.filter(
    (officer) =>
      officer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      officer.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this officer?')) {
      try {
        const response = await fetch(`/api/officers/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setOfficers(officers.filter((officer) => officer._id !== id));
        }
      } catch (error) {
        console.error('Failed to delete officer:', error);
      }
    }
  };

  const handleToggleActive = async (id: string) => {
    const officer = officers.find(o => o._id === id);
    if (officer) {
      try {
        const response = await fetch(`/api/officers/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ isActive: !officer.isActive }),
        });
        if (response.ok) {
          setOfficers(
            officers.map((officer) =>
              officer._id === id
                ? { ...officer, isActive: !officer.isActive }
                : officer
            )
          );
        }
      } catch (error) {
        console.error('Failed to toggle officer status:', error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        achievements: formData.achievements.split('\n').filter(a => a.trim()),
      };

      const url = editingOfficer ? `/api/officers/${editingOfficer._id}` : '/api/officers';
      const method = editingOfficer ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setShowAddModal(false);
        setEditingOfficer(null);
        resetForm();
        fetchOfficers();
      }
    } catch (error) {
      console.error('Failed to save officer:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      role: "",
      email: "",
      avatar: "",
      biography: "",
      background: "",
      achievements: "",
      joinedYear: "",
      quote: "",
    });
  };

  const openEditModal = (officer: Officer) => {
    setEditingOfficer(officer);
    setFormData({
      name: officer.name,
      role: officer.role,
      email: officer.email,
      avatar: officer.avatar,
      biography: officer.biography,
      background: officer.background,
      achievements: officer.achievements.join('\n'),
      joinedYear: officer.joinedYear,
      quote: officer.quote,
    });
    setShowAddModal(true);
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
            key={officer._id}
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
                    <p>📅 Joined {officer.joinedYear}</p>
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    <button
                      onClick={() => handleToggleActive(officer._id)}
                      className="flex-1 rounded-lg border border-white/10 bg-slate-900/70 px-3 py-2 text-xs font-medium text-slate-300 transition hover:border-sky-400/60 hover:bg-slate-900/80"
                    >
                      {officer.isActive ? "Deactivate" : "Activate"}
                    </button>
                    <button
                      onClick={() => openEditModal(officer)}
                      className="rounded-lg border border-white/10 bg-slate-900/70 p-2 text-slate-300 transition hover:border-blue-400/60 hover:bg-slate-900/80"
                    >
                      <Edit className="h-3 w-3" />
                    </button>
                    <button
                      onClick={() => handleDelete(officer._id)}
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

      {/* Add/Edit Officer Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <GlassCard className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-slate-100">
                  {editingOfficer ? "Edit Officer" : "Add New Officer"}
                </h3>
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingOfficer(null);
                    resetForm();
                  }}
                  className="rounded-lg border border-white/10 bg-slate-900/70 p-2 text-slate-300 transition hover:border-slate-400/60 hover:bg-slate-900/80"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full rounded-lg border border-white/10 bg-slate-900/70 px-4 py-2 text-sm text-slate-100 transition focus:border-sky-500/70 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
                      placeholder="Enter officer name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Role *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.role}
                      onChange={(e) => setFormData({...formData, role: e.target.value})}
                      className="w-full rounded-lg border border-white/10 bg-slate-900/70 px-4 py-2 text-sm text-slate-100 transition focus:border-sky-500/70 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
                      placeholder="e.g., Club President"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full rounded-lg border border-white/10 bg-slate-900/70 px-4 py-2 text-sm text-slate-100 transition focus:border-sky-500/70 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
                      placeholder="Enter email address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Joined Year *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.joinedYear}
                      onChange={(e) => setFormData({...formData, joinedYear: e.target.value})}
                      className="w-full rounded-lg border border-white/10 bg-slate-900/70 px-4 py-2 text-sm text-slate-100 transition focus:border-sky-500/70 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
                      placeholder="e.g., 2025"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Avatar URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={formData.avatar}
                    onChange={(e) => setFormData({...formData, avatar: e.target.value})}
                    className="w-full rounded-lg border border-white/10 bg-slate-900/70 px-4 py-2 text-sm text-slate-100 transition focus:border-sky-500/70 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
                    placeholder="Enter avatar image URL"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Biography *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.biography}
                    onChange={(e) => setFormData({...formData, biography: e.target.value})}
                    className="w-full rounded-lg border border-white/10 bg-slate-900/70 px-4 py-2 text-sm text-slate-100 transition focus:border-sky-500/70 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
                    placeholder="Brief biography"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Background
                  </label>
                  <textarea
                    rows={4}
                    value={formData.background}
                    onChange={(e) => setFormData({...formData, background: e.target.value})}
                    className="w-full rounded-lg border border-white/10 bg-slate-900/70 px-4 py-2 text-sm text-slate-100 transition focus:border-sky-500/70 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
                    placeholder="Detailed background information"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Achievements (one per line)
                  </label>
                  <textarea
                    rows={4}
                    value={formData.achievements}
                    onChange={(e) => setFormData({...formData, achievements: e.target.value})}
                    className="w-full rounded-lg border border-white/10 bg-slate-900/70 px-4 py-2 text-sm text-slate-100 transition focus:border-sky-500/70 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
                    placeholder="Enter achievements, one per line"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Quote
                  </label>
                  <input
                    type="text"
                    value={formData.quote}
                    onChange={(e) => setFormData({...formData, quote: e.target.value})}
                    className="w-full rounded-lg border border-white/10 bg-slate-900/70 px-4 py-2 text-sm text-slate-100 transition focus:border-sky-500/70 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
                    placeholder="Inspirational quote"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModal(false);
                      setEditingOfficer(null);
                      resetForm();
                    }}
                    className="flex-1 rounded-lg border border-white/10 bg-slate-900/70 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-slate-400/60 hover:bg-slate-900/80"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 rounded-lg border border-sky-500/40 bg-sky-500/20 px-4 py-2 text-sm font-medium text-sky-200 transition hover:border-sky-400/80 hover:bg-sky-500/30 flex items-center justify-center gap-2"
                  >
                    <Save className="h-4 w-4" />
                    {editingOfficer ? "Update Officer" : "Add Officer"}
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