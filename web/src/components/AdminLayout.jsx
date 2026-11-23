import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Zap, LayoutDashboard, AlertOctagon, MessageSquareWarning, 
  CalendarClock, BarChart3, Users, ShieldAlert, LogOut, ExternalLink,
  FileText, MapPin, User, Menu, X
} from 'lucide-react';
import { OfflineBanner } from './OfflineBanner';

export const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile sidebar automatically whenever location changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

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

  const renderNavLinks = () => (
    <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-sky-600 text-white shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`
            }
          >
            <Icon className="w-4 h-4 shrink-0" />
            <span className="truncate">{item.name}</span>
          </NavLink>
        );
      })}
    </nav>
  );

  const renderSidebarFooter = () => (
    <div className="p-4 border-t border-slate-800 space-y-3 shrink-0">
      <NavLink
        to="/consumer"
        onClick={() => setMobileMenuOpen(false)}
        className="flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-400 hover:text-white bg-slate-800/80 rounded-lg transition-colors"
      >
        <span>Switch to Consumer View</span>
        <ExternalLink className="w-3.5 h-3.5 shrink-0" />
      </NavLink>

      <div className="flex items-center justify-between pt-1">
        <NavLink 
          to="/admin/profile" 
          onClick={() => setMobileMenuOpen(false)} 
          className="min-w-0 flex-1 hover:opacity-80 transition group"
        >
          <p className="text-xs font-semibold text-white truncate group-hover:text-purple-300">{user?.name}</p>
          <p className="text-[10px] text-slate-400 truncate">{user?.email}</p>
        </NavLink>
        <button
          onClick={handleLogout}
          title="Logout"
          className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors ml-1 shrink-0"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans">
      {/* 1. Mobile Drawer Navigation Overlay (< lg) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity animate-fadeIn"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Slide-out Drawer */}
          <aside className="relative flex flex-col w-72 max-w-[85vw] bg-slate-900 text-slate-300 z-50 h-full border-r border-slate-800 shadow-2xl animate-slideRight">
            <div className="h-16 flex items-center justify-between px-5 border-b border-slate-800 shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-sky-500/20 text-sky-400 rounded-lg">
                  <Zap className="w-5 h-5 fill-sky-400" />
                </div>
                <div>
                  <h1 className="font-bold text-white text-sm tracking-tight">PowerPulse</h1>
                  <p className="text-[10px] text-sky-400 font-semibold tracking-wider uppercase">Grid Admin Portal</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {renderNavLinks()}
            {renderSidebarFooter()}
          </aside>
        </div>
      )}

      {/* 2. Desktop Permanent Sidebar (hidden on mobile, visible on lg+) */}
      <aside className="hidden lg:flex w-64 bg-slate-900 text-slate-300 flex-col shrink-0 border-r border-slate-800 h-screen sticky top-0">
        <div className="h-16 flex items-center px-6 gap-3 border-b border-slate-800 shrink-0">
          <div className="p-2 bg-sky-500/20 text-sky-400 rounded-lg">
            <Zap className="w-6 h-6 fill-sky-400" />
          </div>
          <div>
            <h1 className="font-bold text-white text-base tracking-tight">PowerPulse</h1>
            <p className="text-[10px] text-sky-400 font-semibold tracking-wider uppercase">Grid Admin Portal</p>
          </div>
        </div>

        {renderNavLinks()}
        {renderSidebarFooter()}
      </aside>

      {/* 3. Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 min-h-screen overflow-y-auto">
        <OfflineBanner />

        {/* Top Header Bar */}
        <header className="h-16 bg-white border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-20 shadow-xs">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            {/* Hamburger button on mobile */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 -ml-1 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl lg:hidden transition shrink-0"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 min-w-0">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
              <span className="text-xs font-medium text-slate-600 truncate">
                Grid Monitoring Active: Dhaka Central Utility
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-sky-50 text-sky-700 border border-sky-200">
              <span className="hidden sm:inline">Role: </span>Admin
            </span>
          </div>
        </header>

        {/* Page Container */}
        <div className="p-4 sm:p-6 lg:p-8 flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
