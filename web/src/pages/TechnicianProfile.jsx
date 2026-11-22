import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { 
  User, ShieldCheck, MapPin, Mail, Phone, Calendar, 
  Award, Wrench, CheckCircle2, Clock, AlertTriangle, 
  Check, RefreshCw, Edit3, Save, ArrowRight
} from 'lucide-react';

export const TechnicianProfile = () => {
  const { user, updateUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  // Status state
  const [statusUpdating, setStatusUpdating] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  // Edit contact info state
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [savingInfo, setSavingInfo] = useState(false);
  const [infoMessage, setInfoMessage] = useState('');

  const fetchProfile = async () => {
    try {
      const res = await api.get('/technician/profile');
      if (res.data?.profile) {
        setProfile(res.data.profile);
        setEditName(res.data.profile.name || '');
        setEditPhone(res.data.profile.phone || '');
        // Keep AuthContext in sync
        updateUser({
          name: res.data.profile.name,
          phone: res.data.profile.phone,
          availability_status: res.data.profile.availability_status
        });
      }
    } catch (err) {
      console.error('Error fetching technician profile:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleStatusChange = async (newStatus) => {
    try {
      setStatusUpdating(true);
      await api.patch('/technician/status', { status: newStatus });
      setProfile(prev => ({ ...prev, availability_status: newStatus }));
      updateUser({ availability_status: newStatus });
      setStatusMessage(`Duty status changed to [${newStatus.replace('_', ' ').toUpperCase()}].`);
      setTimeout(() => setStatusMessage(''), 4000);
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to update duty status');
    } finally {
      setStatusUpdating(false);
    }
  };

  const handleSaveContact = async (e) => {
    e.preventDefault();
    try {
      setSavingInfo(true);
      const res = await api.patch('/technician/profile', {
        name: editName,
        phone: editPhone
      });
      if (res.data?.user) {
        setProfile(prev => ({
          ...prev,
          name: res.data.user.name,
          phone: res.data.user.phone
        }));
        updateUser({
          name: res.data.user.name,
          phone: res.data.user.phone
        });
        setIsEditing(false);
        setInfoMessage('Contact details updated successfully.');
        setTimeout(() => setInfoMessage(''), 4000);
      }
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to update profile info');
    } finally {
      setSavingInfo(false);
    }
  };

  const currentStatus = profile?.availability_status || user?.availability_status || 'available';

  const statusOptions = [
    {
      id: 'available',
      label: 'Available (On Duty)',
      color: 'border-emerald-500 bg-emerald-50 text-emerald-900',
      dot: 'bg-emerald-500 ring-emerald-300',
      desc: 'Ready for emergency dispatch & routine maintenance.'
    },
    {
      id: 'busy',
      label: 'Busy on Site',
      color: 'border-amber-500 bg-amber-50 text-amber-900',
      dot: 'bg-amber-500 ring-amber-300',
      desc: 'Actively performing inspection or repair on a work order.'
    },
    {
      id: 'on_leave',
      label: 'On Leave',
      color: 'border-orange-500 bg-orange-50 text-orange-900',
      dot: 'bg-orange-500 ring-orange-300',
      desc: 'Off duty, vacation, or scheduled rest day.'
    },
    {
      id: 'offline',
      label: 'Offline',
      color: 'border-slate-400 bg-slate-100 text-slate-800',
      dot: 'bg-slate-400 ring-slate-300',
      desc: 'Shift concluded. Not accepting work orders.'
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const stats = profile?.stats || {
    total_tasks: 0,
    active_tasks: 0,
    resolved_tasks: 0,
    completion_rate: 100
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-3xl mx-auto">
      {/* Title & Refresh */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Technician Profile & Duty Console</h2>
          <p className="text-xs text-slate-500 mt-0.5">Manage your duty availability, municipal zone base, and field metrics</p>
        </div>
        <button
          onClick={() => { setRefreshing(true); fetchProfile(); }}
          className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition flex items-center gap-2 text-xs font-semibold shadow-sm self-start sm:self-auto"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {statusMessage && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}

      {infoMessage && (
        <div className="p-3 bg-sky-50 border border-sky-200 text-sky-800 text-xs rounded-xl flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
          <span>{infoMessage}</span>
        </div>
      )}

      {/* Main Profile Header Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-400 text-white flex items-center justify-center font-bold text-2xl shadow-md border border-amber-300">
              {profile?.name?.charAt(0) || 'T'}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg font-bold text-slate-900">{profile?.name}</h3>
                <span className="px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-200 rounded-full font-mono text-xs font-bold">
                  Tech ID #{profile?.technician_id}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">{profile?.email}</p>
              <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-50 text-slate-700 border border-slate-200">
                <Wrench className="w-3.5 h-3.5 text-amber-600" />
                <span>Field Service Engineer</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-2 transition shadow-sm"
          >
            <Edit3 className="w-3.5 h-3.5 text-slate-500" />
            <span>{isEditing ? 'Cancel Edit' : 'Edit Contact Info'}</span>
          </button>
        </div>

        {/* Edit Form or View Grid */}
        {isEditing ? (
          <form onSubmit={handleSaveContact} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-4 text-xs animate-fadeIn">
            <p className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">Update Contact Credentials</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-600 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-600 mb-1">Mobile Contact Number</label>
                <input
                  type="text"
                  required
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  placeholder="e.g. 01712-345678"
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-3.5 py-1.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={savingInfo}
                className="px-4 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold flex items-center gap-1.5 transition disabled:opacity-50"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{savingInfo ? 'Saving...' : 'Save Profile Changes'}</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
              <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Phone Contact</p>
                <p className="font-semibold text-slate-900">{profile?.phone || 'Not provided'}</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
              <MapPin className="w-4 h-4 text-sky-600 shrink-0" />
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Base Area & Zone</p>
                <p className="font-semibold text-slate-900">{profile?.area || 'Mirpur-10'}</p>
                <p className="text-[10px] text-slate-500">{profile?.district} • {profile?.zone}</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
              <Mail className="w-4 h-4 text-purple-600 shrink-0" />
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">System Email</p>
                <p className="font-semibold text-slate-900 truncate max-w-[150px]">{profile?.email}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Duty Availability Selector Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div>
          <h3 className="font-bold text-slate-900 text-sm tracking-tight flex items-center gap-2">
            <span>Duty Availability Status</span>
            <span className="text-[11px] font-normal text-slate-500">(Click to switch anytime)</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Admins and automated dispatch engines use this status to assign urgent grid faults and line repairs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {statusOptions.map((opt) => {
            const isSelected = currentStatus === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                disabled={statusUpdating}
                onClick={() => handleStatusChange(opt.id)}
                className={`p-3.5 rounded-2xl border-2 text-left transition flex items-start gap-3 relative ${
                  isSelected 
                    ? `${opt.color} shadow-sm ring-2 ring-offset-1 ring-slate-400/20` 
                    : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                }`}
              >
                <span className={`w-3 h-3 rounded-full mt-0.5 shrink-0 ring-4 ${opt.dot}`}></span>
                <div className="flex-1 pr-6">
                  <span className="font-bold text-xs block">{opt.label}</span>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{opt.desc}</p>
                </div>
                {isSelected && (
                  <CheckCircle2 className="w-4 h-4 absolute right-3.5 top-3.5 text-current shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Performance Metrics Dashboard */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-sm tracking-tight">Work Order Performance & Statistics</h3>
            <p className="text-xs text-slate-500 mt-0.5">Summary of field assignments and fault resolution efficiency</p>
          </div>
          <Link
            to="/tech"
            className="text-xs font-semibold text-amber-600 hover:text-amber-700 inline-flex items-center gap-1"
          >
            <span>Open Tasks</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 4 Stat Boxes */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Assigned</span>
            <span className="text-xl font-extrabold text-slate-900 mt-1 block">{stats.total_tasks}</span>
            <span className="text-[10px] text-slate-500">Lifetime jobs</span>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-100">
            <span className="text-[10px] uppercase font-bold text-amber-700 block">Active Tasks</span>
            <span className="text-xl font-extrabold text-amber-900 mt-1 block">{stats.active_tasks}</span>
            <span className="text-[10px] text-amber-700/80">Pending repair</span>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-100">
            <span className="text-[10px] uppercase font-bold text-emerald-700 block">Resolved</span>
            <span className="text-xl font-extrabold text-emerald-900 mt-1 block">{stats.resolved_tasks}</span>
            <span className="text-[10px] text-emerald-700/80">Successfully restored</span>
          </div>

          <div className="p-3.5 rounded-xl bg-purple-50/60 border border-purple-100">
            <span className="text-[10px] uppercase font-bold text-purple-700 block">Completion</span>
            <span className="text-xl font-extrabold text-purple-900 mt-1 block">{stats.completion_rate}%</span>
            <span className="text-[10px] text-purple-700/80">Resolution rate</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="p-4 rounded-xl bg-slate-900 text-white space-y-3">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span className="font-bold">Fault Resolution Rate</span>
            </div>
            <span className="font-mono font-bold text-amber-400">{stats.completion_rate}%</span>
          </div>

          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-amber-500 to-emerald-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${stats.completion_rate}%` }}
            ></div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
            <span>Assigned: {stats.assigned_tasks || 0}</span>
            <span>Investigating: {stats.investigating_tasks || 0}</span>
            <span>Repairing: {stats.repairing_tasks || 0}</span>
            <span className="text-emerald-400 font-semibold">Resolved: {stats.resolved_tasks || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
