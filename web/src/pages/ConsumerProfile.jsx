import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { 
  User, ShieldCheck, MapPin, Mail, Phone, Calendar, 
  Award, Edit3, Save, CheckCircle2, Lock, Eye, EyeOff, X 
} from 'lucide-react';

export const ConsumerProfile = () => {
  const { user, updateUser } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [locations, setLocations] = useState([]);
  
  // Form fields
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [locationId, setLocationId] = useState(user?.location_id || '');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setName(user?.name || '');
    setPhone(user?.phone || '');
    setLocationId(user?.location_id || '');
  }, [user]);

  // Load locations for zone selector dropdown
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await api.get('/locations');
        setLocations(res.data.locations || []);
      } catch (err) {
        console.error('Failed to load locations:', err);
      }
    };
    fetchLocations();
  }, []);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      setSaving(true);
      const payload = {
        name: name.trim(),
        phone: phone.trim() || null,
        location_id: locationId ? Number(locationId) : null
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
        setMessage('Profile updated successfully!');
        setTimeout(() => setMessage(''), 4000);
      }
    } catch (err) {
      console.error('Update profile error:', err);
      setError(err.response?.data?.error || 'Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const getReliabilityTier = (score) => {
    if (score >= 0.9) return { label: 'Elite Verified Reporter', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
    if (score >= 0.7) return { label: 'Trusted Community Contributor', color: 'text-sky-700 bg-sky-50 border-sky-200' };
    if (score >= 0.4) return { label: 'Standard Reporter', color: 'text-slate-700 bg-slate-100 border-slate-200' };
    return { label: 'Probation / Low Reliability', color: 'text-rose-700 bg-rose-50 border-rose-200' };
  };

  const tier = getReliabilityTier(user?.reliability_score || 0.5);

  return (
    <div className="space-y-6 animate-fadeIn max-w-2xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Consumer Account Profile</h2>
          <p className="text-xs text-slate-500 mt-0.5">Manage your personal credentials, residential feeder zone, and account security</p>
        </div>
        <button
          onClick={() => { setIsEditing(!isEditing); setError(''); }}
          className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition shadow-xs border ${
            isEditing 
              ? 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200' 
              : 'bg-white text-sky-700 border-sky-200 hover:bg-sky-50'
          }`}
        >
          {isEditing ? <X className="w-3.5 h-3.5" /> : <Edit3 className="w-3.5 h-3.5" />}
          <span>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</span>
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

      {/* Main Profile Card */}
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

        {/* Edit Form or View Grid */}
        {isEditing ? (
          <form onSubmit={handleSaveProfile} className="space-y-4 text-xs animate-fadeIn p-4 rounded-xl bg-slate-50 border border-slate-200">
            <p className="font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-2">Update Account Details</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Mobile Phone Number</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 01712-345678"
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Residential Zone / Feeder *</label>
                <select
                  value={locationId}
                  onChange={(e) => setLocationId(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 capitalize"
                >
                  <option value="">Select your area</option>
                  {locations.map((loc) => (
                    <option key={loc.location_id} value={loc.location_id}>
                      {loc.area} ({loc.district} • {loc.zone})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Change Password (Leave blank to keep current)</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="New password (min 6 chars)"
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 pr-9"
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
                className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold flex items-center gap-1.5 transition shadow-xs disabled:opacity-50"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{saving ? 'Saving...' : 'Save Profile Changes'}</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
              <Mail className="w-4 h-4 text-slate-400" />
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Email Address</p>
                <p className="font-semibold text-slate-900">{user?.email}</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
              <Phone className="w-4 h-4 text-slate-400" />
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Phone Contact</p>
                <p className="font-semibold text-slate-900">{user?.phone || 'Not provided'}</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
              <MapPin className="w-4 h-4 text-slate-400" />
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Residential Area</p>
                <p className="font-semibold text-slate-900">{user?.area || 'Mirpur-10'}</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
              <Calendar className="w-4 h-4 text-slate-400" />
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">District & Zone</p>
                <p className="font-semibold text-slate-900">{user?.district || 'Dhaka'} • {user?.zone || 'Zone A'}</p>
              </div>
            </div>
          </div>
        )}

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
