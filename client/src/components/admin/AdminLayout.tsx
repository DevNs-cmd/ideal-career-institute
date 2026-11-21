import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  BookOpen,
  GraduationCap,
  Award,
  Building,
  Settings,
  Presentation,
  ShieldAlert,
  LogOut,
  ExternalLink,
  Bell,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../lib/api';

interface AdminLayoutProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onViewWebsite: () => void;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  currentTab,
  onSelectTab,
  onViewWebsite,
  children
}) => {
  const { user, logout } = useAuth();
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    async function loadNotifications() {
      try {
        const data = await api.getNotifications();
        setUnreadNotifications(data.unreadCount || 0);
      } catch (e) {
        // quiet error
      }
    }
    loadNotifications();
    const interval = setInterval(loadNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'leads', label: 'Admission CRM', icon: Users, badge: 'Core' },
    { id: 'followups', label: 'Follow-ups', icon: CalendarCheck },
    { id: 'courses', label: 'Course Catalog', icon: BookOpen },
    { id: 'faculty', label: 'Faculty Profiles', icon: GraduationCap },
    { id: 'toppers', label: 'Toppers Gallery', icon: Award },
    { id: 'branches', label: 'Branch Setup', icon: Building },
    { id: 'cms', label: 'Website CMS', icon: Settings },
    { id: 'demo', label: 'Executive Demo', icon: Presentation, badge: 'Journey' },
    { id: 'audit', label: 'Security & Audit', icon: ShieldAlert }
  ];

  const handleNavClick = (id: string) => {
    onSelectTab(id);
    setMobileSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Top Admin Header */}
      <header className="bg-slate-900 text-white h-16 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-40 shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-white"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white p-0.5 flex items-center justify-center">
              <img src="/assets/logo.png" alt="ICI" className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="font-bold text-sm tracking-tight block leading-tight text-white">
                IDEAL CAREER <span className="text-red-500">INSTITUTE</span>
              </span>
              <span className="text-[10px] text-slate-400 font-medium">
                Admin Management Console
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={onViewWebsite}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">View Public Website</span>
          </button>

          <div className="h-5 w-px bg-slate-800 hidden sm:block" />

          {/* User profile & Logout */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-xs font-bold text-white">{user?.fullName || 'Administrator'}</div>
              <div className="text-[10px] text-amber-400 uppercase font-semibold">{user?.role || 'Admin'}</div>
            </div>

            <button
              onClick={logout}
              className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Navigation */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 top-16 z-30 w-64 bg-slate-900 text-slate-300 p-4 space-y-1.5 flex flex-col justify-between border-r border-slate-800 transition-transform duration-300 ${
            mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          <div className="space-y-1">
            <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Operations & CRM
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-red-600 text-white shadow-xs'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md ${
                        isActive ? 'bg-white text-red-600' : 'bg-slate-800 text-amber-400'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Footer inside sidebar */}
          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 text-[11px] space-y-1">
            <div className="text-slate-400 font-semibold">Technology Partner</div>
            <a
              href="https://algoforceaii.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white font-bold hover:text-amber-400 transition-colors block"
            >
              AlgoForce AI Platform
            </a>
            <div className="text-[10px] text-slate-500">algoforceaii.com • Madangir Campus</div>
          </div>
        </aside>

        {/* Main Content View */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};
