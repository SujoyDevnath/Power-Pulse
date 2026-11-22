import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Zap, LayoutDashboard, AlertOctagon, MessageSquareWarning, 
  CalendarClock, BarChart3, Users, ShieldAlert, LogOut, ExternalLink,
  FileText, MapPin, User
} from 'lucide-react';
import { OfflineBanner } from './OfflineBanner';

export const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard, end: true },
    { name: 'Incidents & Outages', path: '/admin/incidents', icon: AlertOctagon },
    { name: 'Raw Consumer Reports', path: '/admin/reports', icon: FileText },
    { name: 'Complaints Desk', path: '/admin/complaints', icon: MessageSquareWarning },
    { name: 'Locations & Zones', path: '/admin/locations', icon: MapPin },
    { name: 'Planned Outages', path: '/admin/planned', icon: CalendarClock },
    { name: 'Analytics & Trends', path: '/admin/analytics', icon: BarChart3 },
    { name: 'Users & Technicians', path: '/admin/users', icon: Users },
    { name: 'Security Audit Logs', path: '/admin/audit-logs', icon: ShieldAlert },
    { name: 'Admin Profile', path: '/admin/profile', icon: User },
  ];

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0 border-r border-slate-800">
        <div className="h-16 flex items-center px-6 gap-3 border-b border-slate-800">
          <div className="p-2 bg-sky-500/20 text-sky-400 rounded-lg">
            <Zap className="w-6 h-6 fill-sky-400" />
          </div>
          <div>
            <h1 className="font-bold text-white text-base tracking-tight">PowerPulse</h1>
            <p className="text-[10px] text-sky-400 font-semibold tracking-wider uppercase">Grid Admin Portal</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-sky-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Quick Portal Switch & User info */}
        <div className="p-4 border-t border-slate-800 space-y-3">
          <NavLink
            to="/consumer"
            className="flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-400 hover:text-white bg-slate-800/80 rounded-lg transition-colors"
          >
            <span>Switch to Consumer View</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </NavLink>

          <div className="flex items-center justify-between pt-2">
            <NavLink to="/admin/profile" className="min-w-0 flex-1 hover:opacity-80 transition group">
              <p className="text-xs font-semibold text-white truncate group-hover:text-purple-300">{user?.name}</p>
              <p className="text-[10px] text-slate-400 truncate">{user?.email}</p>
            </NavLink>
            <button
              onClick={handleLogout}
              title="Logout"
              className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors ml-1"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <OfflineBanner />
        <header className="h-16 bg-white border-b border-slate-200/80 px-8 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-medium text-slate-600">Grid Monitoring Active: Dhaka Central Utility</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-sky-50 text-sky-700 border border-sky-200">
              Role: Administrator
            </span>
          </div>
        </header>

        <div className="p-8 flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
