import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Zap, ShieldCheck, Wrench, User, AlertCircle, ArrowRight } from 'lucide-react';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user = await login(email, password);
      if (user.role === 'admin') {
        navigate('/admin');
      } else if (user.role === 'technician') {
        navigate('/tech');
      } else {
        navigate('/consumer');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const quickFill = (userEmail, userPass) => {
    setEmail(userEmail);
    setPassword(userPass);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-sky-500/20 text-sky-400 rounded-2xl mb-3 border border-sky-500/30 shadow-lg shadow-sky-500/10">
            <Zap className="w-8 h-8 fill-sky-400" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">PowerPulse</h1>
          <p className="text-sm text-slate-400 mt-1">
            Smart Electricity Outage Intelligence & Management
          </p>
          <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-800 text-sky-400 border border-slate-700">
            UFTB | PROG 212 AWAD
          </span>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-2xl border border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-1">Sign In</h2>
          <p className="text-xs text-slate-500 mb-6">Enter your credentials or use a quick-demo account below</p>

          {error && (
            <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@powerpulse.com"
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-sm shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In to Portal'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="text-center text-xs text-slate-500 mt-4">
            Need an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="font-semibold text-sky-600 hover:text-sky-500"
            >
              Register as Consumer
            </button>
          </p>

          {/* Quick-Demo Auto-Fill Buttons */}
          <div className="mt-6 pt-6 border-t border-slate-100">
            <p className="text-center text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-3">
              1-Click Demo Profiles (For Evaluation)
            </p>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => quickFill('admin@powerpulse.com', 'Admin@123')}
                className="p-2.5 rounded-xl border border-sky-100 bg-sky-50/50 hover:bg-sky-100/60 text-sky-800 text-xs font-medium text-center flex flex-col items-center gap-1 transition"
              >
                <ShieldCheck className="w-4 h-4 text-sky-600" />
                <span>Admin</span>
              </button>

              <button
                type="button"
                onClick={() => quickFill('rahim.tech@powerpulse.com', 'Tech@123')}
                className="p-2.5 rounded-xl border border-amber-100 bg-amber-50/50 hover:bg-amber-100/60 text-amber-800 text-xs font-medium text-center flex flex-col items-center gap-1 transition"
              >
                <Wrench className="w-4 h-4 text-amber-600" />
                <span>Technician</span>
              </button>

              <button
                type="button"
                onClick={() => quickFill('tanvir@gmail.com', 'User@123')}
                className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-medium text-center flex flex-col items-center gap-1 transition"
              >
                <User className="w-4 h-4 text-slate-600" />
                <span>Consumer</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
