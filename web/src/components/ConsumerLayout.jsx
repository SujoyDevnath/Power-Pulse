import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { 
  Zap, Bell, User, Clock, AlertOctagon, 
  LogOut, MapPin, ArrowLeft, MessageSquarePlus,
  ClipboardList, CreditCard, ShieldCheck
} from 'lucide-react';
import { OfflineBanner } from './OfflineBanner';

export const ConsumerLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [unreadCount, setUnreadCount] = useState(0);

  const isNotifPage = location.pathname.startsWith('/consumer/notifications');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const fetchUnreadCount = async () => {
    if (location.pathname.startsWith('/consumer/notifications')) {
      setUnreadCount(0);
      return;
    }
    try {
      const res = await api.get('/notifications/unread-count');
      if (res.data && typeof res.data.unread_count === 'number') {
        setUnreadCount(res.data.unread_count);
      }
    } catch (err) {
      // Silently catch
    }
  };

  useEffect(() => {
    if (isNotifPage) {
      setUnreadCount(0);
    }
  }, [location.pathname, isNotifPage]);

  useEffect(() => {
    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 15000);

    const handleNotifUpdate = (e) => {
      if (e?.detail && typeof e.detail.unreadCount === 'number') {
        setUnreadCount(e.detail.unreadCount);
      } else {
        fetchUnreadCount();
      }
    };

    window.addEventListener('powerpulse-notifications-changed', handleNotifUpdate);

    return () => {
      clearInterval(interval);
      window.removeEventListener('powerpulse-notifications-changed', handleNotifUpdate);
    };
  }, [location.pathname]);

  const tabs = [
    { name: 'Grid & Reporting', path: '/consumer', end: true },
    { name: 'Active Outages Nearby', path: '/consumer/outages' },
    { name: 'Outage History', path: '/consumer/history' },
    { name: 'Notifications', path: '/consumer/notifications' },
    { name: 'My Profile', path: '/consumer/profile' }
  ];

  const showBadge = unreadCount > 0 && !isNotifPage;

  // Check which tab is active for bottom navigation
  const searchParams = new URLSearchParams(location.search);
  const activeSubTab = searchParams.get('tab') || 'outage';

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans pb-20 sm:pb-0">
      {/* Offline Connectivity Notification Banner */}
      <OfflineBanner />

      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="p-2 bg-gradient-to-tr from-sky-600 to-cyan-500 text-white rounded-xl shrink-0 shadow-sm">
              <Zap className="w-5 h-5 fill-white" />
            </div>
            <div className="min-w-0">
              <h1 className="font-bold text-xs sm:text-sm text-slate-900 tracking-tight truncate flex items-center gap-1.5">
                <span>PowerPulse</span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold bg-sky-50 text-sky-700 border border-sky-200">
                  Citizen Portal
                </span>
              </h1>
              <p className="text-[10px] sm:text-[11px] text-slate-500 flex items-center gap-1 truncate">
                <MapPin className="w-3 h-3 text-sky-600 shrink-0" />
                <span className="truncate">{user?.area || 'Dhaka Area'} • {user?.district || 'Dhaka'}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {/* Quick Notification Bell in Header */}
            <NavLink
              to="/consumer/notifications"
              className="relative p-2 text-slate-500 hover:text-sky-600 hover:bg-slate-100 rounded-xl transition"
              title={showBadge ? `${unreadCount} unread notification(s)` : 'Notifications'}
            >
              <Bell className="w-4 h-4" />
              {showBadge && (
                <span className="absolute top-1 right-1 flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-rose-500 text-[9px] font-extrabold text-white ring-2 ring-white animate-pulse">
                  {unreadCount > 99 ? '99+' : unreadCount}
                </span>
              )}
            </NavLink>

            {/* If logged in user is admin, show Return to Admin button */}
            {user?.role === 'admin' ? (
              <NavLink
                to="/admin"
                className="inline-flex items-center gap-1 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs shadow-sm transition"
                title="Return to Grid Admin Portal"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Admin Portal</span>
                <span className="sm:hidden">Admin</span>
              </NavLink>
            ) : (
              <span className="hidden sm:inline-block px-2.5 py-1 text-xs font-semibold rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                Score: {user?.reliability_score ?? '0.97'}
              </span>
            )}

            <button
              onClick={handleLogout}
              className="p-2 text-slate-400 hover:text-rose-600 hover:bg-slate-100 rounded-xl transition"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Navigation (Desktop / Tablet) */}
        <div className="max-w-4xl mx-auto px-2 sm:px-4 flex items-center gap-1 overflow-x-auto border-t border-slate-100 no-scrollbar">
          {tabs.map((tab) => {
            const isNotifTab = tab.path === '/consumer/notifications';
            return (
              <NavLink
                key={tab.path}
                to={tab.path}
                end={tab.end}
                className={({ isActive }) =>
                  `px-3 py-2.5 sm:px-3.5 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 shrink-0 ${
                    isActive
                      ? 'border-sky-600 text-sky-600 font-bold'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`
                }
              >
                {isNotifTab && <Bell className="w-3.5 h-3.5 shrink-0" />}
                <span>{tab.name}</span>
                {isNotifTab && showBadge && (
                  <span className="px-1.5 py-0.5 text-[10px] font-extrabold rounded-full bg-rose-500 text-white leading-none shadow-xs animate-bounce">
                    {unreadCount > 99 ? '99+' : unreadCount}
                  </span>
                )}
              </NavLink>
            );
          })}
        </div>
      </header>

      {/* Main Outlet */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-3 sm:p-6">
        <Outlet />
      </main>

      {/* 📱 Mobile Native Bottom Navigation Bar (Shown on small screens / Android App) */}
      <nav aria-label="Mobile Navigation" className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 shadow-lg flex items-center justify-around">
        {/* 1. Outage */}
        <button
          onClick={() => navigate('/consumer?tab=outage')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition ${
            location.pathname === '/consumer' && activeSubTab === 'outage'
              ? 'text-sky-600 font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Zap className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Outage</span>
        </button>

        {/* 2. Complaint */}
        <button
          onClick={() => navigate('/consumer?tab=complaint')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition ${
            location.pathname === '/consumer' && activeSubTab === 'complaint'
              ? 'text-amber-600 font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <MessageSquarePlus className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Complaint</span>
        </button>

        {/* 3. Tracking */}
        <button
          onClick={() => navigate('/consumer?tab=tracking')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition ${
            location.pathname === '/consumer' && activeSubTab === 'tracking'
              ? 'text-indigo-600 font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <ClipboardList className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Tracking</span>
        </button>

        {/* 4. Billing */}
        <button
          onClick={() => navigate('/consumer?tab=billing')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition ${
            location.pathname === '/consumer' && activeSubTab === 'billing'
              ? 'text-emerald-600 font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <CreditCard className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Bills</span>
        </button>

        {/* 5. Profile */}
        <button
          onClick={() => navigate('/consumer/profile')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition ${
            location.pathname.startsWith('/consumer/profile')
              ? 'text-sky-600 font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <User className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Profile</span>
        </button>
      </nav>
    </div>
  );
};
