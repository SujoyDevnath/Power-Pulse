import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { 
  ShieldCheck, Mail, Phone, Calendar, 
  Edit3, Save, CheckCircle2, Lock, Eye, EyeOff, X, 
  Key, ShieldAlert, Activity, ArrowRight, User
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminProfile = () => {
  const { user, updateUser } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setName(user?.name || '');
    setPhone(user?.phone || '');
  }, [user]);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      setSaving(true);
      const payload = {
        name: name.trim(),
        phone: phone.trim() || null
      };

      if (password) {
        if (password.length < 6) {
          setError('New password must be at least 6 characters');
          setSaving(false);
          return;
        }
        payload.password = password;
      }

      const res = await api.patch('/auth/profile', payload);

      if (res.data?.user) {
        updateUser(res.data.user);
        setIsEditing(false);
        setPassword('');
        setMessage('Administrator profile updated successfully!');
        setTimeout(() => setMessage(''), 4000);
      }
    } catch (err) {
      console.error('Admin update profile error:', err);
      setError(err.response?.data?.error || 'Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-3xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Administrator Account & Credentials</h2>
          <p className="text-xs text-slate-500 mt-0.5">Manage root administrator profile, contact info, and security credentials</p>
        </div>
        <button
          onClick={() => { setIsEditing(!isEditing); setError(''); }}
          className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition shadow-xs border ${
            isEditing 
              ? 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200' 
              : 'bg-white text-purple-700 border-purple-200 hover:bg-purple-50'
          }`}
        >
          {isEditing ? <X className="w-3.5 h-3.5" /> : <Edit3 className="w-3.5 h-3.5" />}
          <span>{isEditing ? 'Cancel Edit' : 'Edit Credentials'}</span>
        </button>
      </div>

      {message && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {error && (
        <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-center gap-2 animate-fadeIn">
          <span>{error}</span>
        </div>
      )}

      {/* Profile Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-700 to-indigo-600 text-white flex items-center justify-center font-bold text-2xl shadow-md border border-purple-300">
            {user?.name?.charAt(0) || 'A'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-slate-900">{user?.name}</h3>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-purple-100 text-purple-800 border border-purple-200">
                Super Admin
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">{user?.email}</p>
            <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-50 text-slate-700 border border-slate-200">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
              <span>Full System Root Control</span>
            </div>
          </div>
        </div>

        {/* Edit Form or View Grid */}
        {isEditing ? (
          <form onSubmit={handleSaveProfile} className="space-y-4 text-xs animate-fadeIn p-4 rounded-xl bg-slate-50 border border-slate-200">
            <p className="font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-2">Update Administrator Info</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Administrator Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Official Mobile Phone</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 01711-000001"
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold text-slate-700 mb-1">Change Admin Password (Leave blank to keep unchanged)</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="New admin password (minimum 6 characters)"
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 pr-9"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-slate-600 hover:bg-slate-100 font-semibold transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold flex items-center gap-1.5 transition shadow-xs disabled:opacity-50"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{saving ? 'Saving...' : 'Save Credentials'}</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
              <Mail className="w-4 h-4 text-slate-400" />
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Admin Email</p>
                <p className="font-semibold text-slate-900">{user?.email}</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
              <Phone className="w-4 h-4 text-slate-400" />
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Official Phone Contact</p>
                <p className="font-semibold text-slate-900">{user?.phone || '01711000001'}</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
              <Key className="w-4 h-4 text-purple-600" />
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Access Level</p>
                <p className="font-semibold text-slate-900">Level 1 - Root Dispatch Authority</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
              <Activity className="w-4 h-4 text-emerald-600" />
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Audit Logging</p>
                <p className="font-semibold text-slate-900">Immutable Logging Enabled</p>
              </div>
            </div>
          </div>
        )}

        {/* Security & Quick Actions */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-md space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-purple-400" />
              <h4 className="font-bold text-sm">Security & Audit Governance</h4>
            </div>
            <Link
              to="/admin/audit-logs"
              className="text-xs font-semibold text-purple-300 hover:text-white flex items-center gap-1"
            >
              <span>View Audit Trail</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed">
            All administrative actions including technician dispatches, outage schedule modifications, and security updates are cryptographically hashed and recorded to the immutable audit log table.
          </p>
        </div>
      </div>
    </div>
  );
};
