"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard,
  Users,
  Calendar,
  Newspaper,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const navItems = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Leadership",
    href: "/admin/leadership",
    icon: Users,
  },
  {
    label: "Events",
    href: "/admin/events",
    icon: Calendar,
  },
  {
    label: "News & Media",
    href: "/admin/news",
    icon: Newspaper,
  },
  {
    label: "Applications",
    href: "/admin/applications",
    icon: FileText,
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function AdminNav() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-lg border border-white/10 bg-white/10 backdrop-blur-xl text-slate-100"
        >
          {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 transform border-r border-white/10 bg-slate-950/90 backdrop-blur-xl transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between px-6 border-b border-white/10">
            <Link href="/" className="flex items-center gap-3 group">
              <Image
                src="/logo.png"
                alt="Leo Lions Club of Colombo Uptown Eminence"
                width={32}
                height={32}
                className="h-8 w-8 drop-shadow-lg"
              />
              <div>
                <div className="text-lg font-semibold text-slate-100 group-hover:text-sky-300 transition-colors">
                  LLCCUE
                </div>
                <div className="text-xs text-slate-400">Admin Panel</div>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-sky-500/20 text-sky-300 border border-sky-500/30"
                      : "text-slate-300 hover:bg-white/10 hover:text-slate-100"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* User Section */}
          <div className="border-t border-white/10 p-4">
            <div className="flex items-center gap-3 rounded-lg px-4 py-3">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-slate-400 to-slate-600" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-100 truncate">
                  Admin User
                </p>
                <p className="text-xs text-slate-400 truncate">admin@llccue.org</p>
              </div>
            </div>
            <button className="flex items-center gap-3 w-full rounded-lg px-4 py-3 text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors mt-2">
              <LogOut className="h-5 w-5" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-950/80 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main content margin for desktop */}
      <div className="hidden lg:block lg:w-64" />
    </>
  );
}