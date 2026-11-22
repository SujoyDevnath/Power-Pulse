import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Zap, Bell, User, Clock, AlertOctagon, 
  LogOut, MapPin, ArrowLeft
} from 'lucide-react';
import { OfflineBanner } from './OfflineBanner';

export const ConsumerLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const tabs = [
    { name: 'Grid & Reporting', path: '/consumer', end: true },
    { name: 'Active Outages Nearby', path: '/consumer/outages' },
    { name: 'Outage History', path: '/consumer/history' },
    { name: 'Notifications', path: '/consumer/notifications' },
    { name: 'My Profile', path: '/consumer/profile' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Offline Connectivity Notification Banner */}
      <OfflineBanner />

      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-sky-500/20 text-sky-600 rounded-xl">
              <Zap className="w-5 h-5 fill-sky-500" />
            </div>
            <div>
              <h1 className="font-bold text-sm text-slate-900 tracking-tight">PowerPulse Consumer Portal</h1>
              <p className="text-[11px] text-slate-500 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-sky-600" />
                <span>{user?.area || 'Dhaka Area'} • {user?.district || 'Dhaka'}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* If logged in user is admin, show Return to Admin button */}
            {user?.role === 'admin' ? (
              <NavLink
                to="/admin"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs shadow-sm transition"
                title="Return to Grid Admin Portal"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Admin Portal</span>
              </NavLink>
            ) : (
              <span className="hidden sm:inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full bg-slate-100 text-slate-700">
                Reliability: {user?.reliability_score}
              </span>
            )}

            <button
              onClick={handleLogout}
              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-slate-100 rounded-lg transition"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-4xl mx-auto px-4 flex items-center gap-1 overflow-x-auto border-t border-slate-100">
          {tabs.map((tab) => (
            <NavLink
              key={tab.path}
              to={tab.path}
              end={tab.end}
              className={({ isActive }) =>
                `px-3.5 py-2.5 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors ${
                  isActive
                    ? 'border-sky-600 text-sky-600 font-bold'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`
              }
            >
              {tab.name}
            </NavLink>
          ))}
        </div>
      </header>

      {/* Main Outlet */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6">
        <Outlet />
      </main>
    </div>
  );
};
