"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Save,
  Globe,
  Mail,
  Shield,
  Bell,
  Download,
  Upload,
} from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeading } from "@/components/ui/section-heading";

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    siteName: "Leo Lions Club of Colombo Uptown Eminence",
    siteDescription: "Experience the next era of service with the Leo Lions Club of Colombo Uptown Eminence.",
    contactEmail: "connect@llccue.org",
    contactPhone: "+94 77 000 0000",
    address: "Colombo Uptown Hub, Sri Lanka",
    notifications: {
      newApplications: true,
      eventRegistrations: true,
      systemUpdates: false,
    },
    maintenance: false,
  });

  const handleSave = () => {
    // Save settings logic here
    console.log("Settings saved:", settings);
  };

  const handleExportData = () => {
    // Export data logic here
    console.log("Exporting data...");
  };

  const handleImportData = () => {
    // Import data logic here
    console.log("Importing data...");
  };

  return (
    <div className="p-6 md:p-8">
      <SectionHeading
        eyebrow="Settings"
        title="System Configuration"
        subtitle="Manage site settings and preferences"
      />

      <div className="space-y-8">
        {/* General Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <GlassCard>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Globe className="h-5 w-5 text-slate-400" />
                <h3 className="text-lg font-semibold text-slate-100">
                  General Settings
                </h3>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Site Name
                  </label>
                  <input
                    type="text"
                    value={settings.siteName}
                    onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-slate-900/70 px-4 py-2 text-sm text-slate-100 transition focus:border-sky-500/70 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Site Description
                  </label>
                  <textarea
                    rows={3}
                    value={settings.siteDescription}
                    onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-slate-900/70 px-4 py-2 text-sm text-slate-100 transition focus:border-sky-500/70 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
                  />
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Contact Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <GlassCard>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Mail className="h-5 w-5 text-slate-400" />
                <h3 className="text-lg font-semibold text-slate-100">
                  Contact Information
                </h3>
              </div>

              <div className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      value={settings.contactEmail}
                      onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                      className="w-full rounded-lg border border-white/10 bg-slate-900/70 px-4 py-2 text-sm text-slate-100 transition focus:border-sky-500/70 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Contact Phone
                    </label>
                    <input
                      type="tel"
                      value={settings.contactPhone}
                      onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                      className="w-full rounded-lg border border-white/10 bg-slate-900/70 px-4 py-2 text-sm text-slate-100 transition focus:border-sky-500/70 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    value={settings.address}
                    onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-slate-900/70 px-4 py-2 text-sm text-slate-100 transition focus:border-sky-500/70 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
                  />
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Notification Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <GlassCard>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Bell className="h-5 w-5 text-slate-400" />
                <h3 className="text-lg font-semibold text-slate-100">
                  Notification Settings
                </h3>
              </div>

              <div className="space-y-4">
                {Object.entries(settings.notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-200 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </p>
                      <p className="text-xs text-slate-400">
                        {key === 'newApplications' && 'Receive notifications for new membership applications'}
                        {key === 'eventRegistrations' && 'Get notified when someone registers for an event'}
                        {key === 'systemUpdates' && 'Receive system update notifications'}
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => setSettings({
                          ...settings,
                          notifications: {
                            ...settings.notifications,
                            [key]: e.target.checked
                          }
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-500"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* System Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <GlassCard>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="h-5 w-5 text-slate-400" />
                <h3 className="text-lg font-semibold text-slate-100">
                  System Settings
                </h3>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-200">Maintenance Mode</p>
                    <p className="text-xs text-slate-400">
                      Put the site in maintenance mode
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.maintenance}
                      onChange={(e) => setSettings({ ...settings, maintenance: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-500"></div>
                  </label>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleExportData}
                    className="flex items-center gap-2 rounded-lg border border-white/10 bg-slate-900/70 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-green-400/60 hover:bg-slate-900/80"
                  >
                    <Download className="h-4 w-4" />
                    Export Data
                  </button>
                  <button
                    onClick={handleImportData}
                    className="flex items-center gap-2 rounded-lg border border-white/10 bg-slate-900/70 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-blue-400/60 hover:bg-slate-900/80"
                  >
                    <Upload className="h-4 w-4" />
                    Import Data
                  </button>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 rounded-full border border-sky-500/40 bg-sky-500/20 px-8 py-3 text-sm font-semibold text-sky-200 transition hover:border-sky-400/80 hover:bg-sky-500/30"
          >
            <Save className="h-4 w-4" />
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}