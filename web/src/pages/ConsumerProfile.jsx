import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, ShieldCheck, MapPin, Mail, Phone, Calendar, Award } from 'lucide-react';

export const ConsumerProfile = () => {
  const { user } = useAuth();

  const getReliabilityTier = (score) => {
    if (score >= 0.9) return { label: 'Elite Verified Reporter', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
    if (score >= 0.7) return { label: 'Trusted Community Contributor', color: 'text-sky-700 bg-sky-50 border-sky-200' };
    if (score >= 0.4) return { label: 'Standard Reporter', color: 'text-slate-700 bg-slate-100 border-slate-200' };
    return { label: 'Probation / Low Reliability', color: 'text-rose-700 bg-rose-50 border-rose-200' };
  };

  const tier = getReliabilityTier(user?.reliability_score || 0.5);

  return (
    <div className="space-y-6 animate-fadeIn max-w-2xl mx-auto">
      <div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">Consumer Account Profile</h2>
        <p className="text-xs text-slate-500 mt-0.5">Manage your credentials, residential zone, and community reporter standing</p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-600 to-sky-400 text-white flex items-center justify-center font-bold text-2xl shadow-md">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">{user?.name}</h3>
            <p className="text-xs text-slate-500">{user?.email}</p>
            <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border capitalize bg-slate-50 text-slate-700 border-slate-200">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
              <span>Role: {user?.role}</span>
            </div>
          </div>
        </div>

        {/* User Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
            <Mail className="w-4 h-4 text-slate-400" />
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Email</p>
              <p className="font-semibold text-slate-900">{user?.email}</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
            <Phone className="w-4 h-4 text-slate-400" />
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Phone</p>
              <p className="font-semibold text-slate-900">{user?.phone || 'Not provided'}</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
            <MapPin className="w-4 h-4 text-slate-400" />
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Municipal Zone</p>
              <p className="font-semibold text-slate-900">{user?.area || 'Dhaka Central'}</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
            <Calendar className="w-4 h-4 text-slate-400" />
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-semibold">District</p>
              <p className="font-semibold text-slate-900">{user?.district || 'Dhaka'}</p>
            </div>
          </div>
        </div>

        {/* Reliability Score Card */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-md">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              <h4 className="font-bold text-sm">Reporter Reliability Score</h4>
            </div>
            <span className="font-mono text-2xl font-bold text-amber-400">
              {user?.reliability_score || 0.5} / 1.0
            </span>
          </div>

          <div className="w-full bg-slate-700 h-2.5 rounded-full overflow-hidden mb-3">
            <div
              className="bg-amber-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${(user?.reliability_score || 0.5) * 100}%` }}
            ></div>
          </div>

          <div className={`p-2.5 rounded-xl text-xs font-semibold border ${tier.color} text-center`}>
            {tier.label}
          </div>

          <p className="text-[11px] text-slate-400 mt-3 leading-relaxed">
            Your reliability score powers the PowerPulse crowd algorithm. Verified accurate OFF/BACK signals grant <strong className="text-white">+0.02</strong> reputation. False alarms or spam decrease reputation by <strong className="text-rose-400">-0.05</strong>.
          </p>
        </div>
      </div>
    </div>
  );
};
