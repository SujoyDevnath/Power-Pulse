import React, { useState } from 'react';
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { 
  Wrench, LogOut, CheckCircle2, Clock, User, 
  ClipboardList, ChevronDown, AlertCircle, Coffee 
} from 'lucide-react';
import { OfflineBanner } from './OfflineBanner';

export const TechLayout = () => {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const currentStatus = user?.availability_status || 'available';

  const statusConfigs = {
    available: {
      label: 'Available',
      badgeClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20',
      dotClass: 'bg-emerald-400 ring-emerald-400/30',
      description: 'Ready to receive new field tasks'
    },
    busy: {
      label: 'Busy on Site',
      badgeClass: 'bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500/20',
      dotClass: 'bg-amber-400 ring-amber-400/30',
      description: 'Currently working on active repairs'
    },
    on_leave: {
      label: 'On Leave',
      badgeClass: 'bg-orange-500/10 text-orange-400 border-orange-500/20 hover:bg-orange-500/20',
      dotClass: 'bg-orange-400 ring-orange-400/30',
      description: 'Temporarily unavailable for dispatch'
    },
    offline: {
      label: 'Offline',
      badgeClass: 'bg-slate-500/10 text-slate-300 border-slate-500/20 hover:bg-slate-500/20',
      dotClass: 'bg-slate-400 ring-slate-400/30',
      description: 'Off-shift or shift concluded'
    }
  };

  const handleStatusChange = async (newStatus) => {
    if (newStatus === currentStatus) {
      setStatusDropdownOpen(false);
      return;
    }
    try {
      setUpdatingStatus(true);
      await api.patch('/technician/status', { status: newStatus });
      updateUser({ availability_status: newStatus });
      setStatusDropdownOpen(false);
    } catch (err) {
      console.error('Failed to update status:', err);
      alert(err.response?.data?.error || 'Failed to update availability status');
    } finally {
      setUpdatingStatus(false);
    }
  };

  const isProfileActive = location.pathname.startsWith('/tech/profile');
  const isOrdersActive = !isProfileActive;

  const currentCfg = statusConfigs[currentStatus] || statusConfigs.available;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      <OfflineBanner />
      <header className="bg-slate-900 text-white sticky top-0 z-30 shadow-md border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/20 text-amber-400 rounded-xl border border-amber-500/30 shadow-inner">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-sm tracking-tight text-white">PowerPulse Field Tech</h1>
                <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full font-mono border border-slate-700">
                  ID: #{user?.technician_id || 'TECH'}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">{user?.name} • {user?.area || 'Field Base'}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Interactive Availability Toggle Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
                className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-full border transition shadow-sm ${currentCfg.badgeClass}`}
                title="Click to change your duty availability"
              >
                <span className={`w-2 h-2 rounded-full ring-4 ${currentCfg.dotClass} animate-pulse`}></span>
                <span>{currentCfg.label}</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {statusDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setStatusDropdownOpen(false)}
                  ></div>
                  <div className="absolute right-0 mt-2 w-64 bg-slate-800 border border-slate-700 rounded-2xl shadow-xl p-2 z-50 text-xs animate-fadeIn">
                    <p className="px-3 py-1.5 text-[10px] uppercase font-bold text-slate-400 tracking-wider border-b border-slate-700/60 mb-1">
                      Set Duty Availability
                    </p>
                    {Object.entries(statusConfigs).map(([key, cfg]) => {
                      const isSelected = currentStatus === key;
                      return (
                        <button
                          key={key}
                          type="button"
                          disabled={updatingStatus}
                          onClick={() => handleStatusChange(key)}
                          className={`w-full flex items-start gap-2.5 p-2.5 rounded-xl transition text-left ${
                            isSelected
                              ? 'bg-slate-700/80 text-white font-semibold'
                              : 'text-slate-300 hover:bg-slate-700/40 hover:text-white'
                          }`}
                        >
                          <span className={`w-2.5 h-2.5 rounded-full mt-1 shrink-0 ${cfg.dotClass}`}></span>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-xs">{cfg.label}</span>
                              {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                            </div>
                            <p className="text-[10px] text-slate-400 mt-0.5">{cfg.description}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>

            <button
              onClick={handleLogout}
              className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-xl transition"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="max-w-4xl mx-auto px-4 flex items-center gap-1 border-t border-slate-800/80">
          <Link
            to="/tech"
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition ${
              isOrdersActive
                ? 'border-amber-400 text-amber-400 bg-slate-800/40'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/20'
            }`}
          >
            <ClipboardList className="w-4 h-4" />
            <span>Field Work Orders</span>
          </Link>

          <Link
            to="/tech/profile"
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition ${
              isProfileActive
                ? 'border-amber-400 text-amber-400 bg-slate-800/40'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/20'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Technician Profile</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6">
        <Outlet />
      </main>
    </div>
  );
};
