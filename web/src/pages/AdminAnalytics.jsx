import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { 
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, 
  Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { BarChart3, PieChart as PieIcon, RefreshCw, Sparkles } from 'lucide-react';

export const AdminAnalytics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/analytics');
      setData(res.data);
    } catch (err) {
      console.error('Error fetching analytics:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const COLORS = ['#0284c7', '#ef4444', '#f59e0b', '#10b981', '#8b5cf6', '#ec4899'];

  if (loading && !data) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const kpi = data?.kpi || {};

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Grid Telemetry & Analytics</h2>
          <p className="text-xs text-slate-500 mt-1">Aggregated historical insights, reliability rates, and fault distributions</p>
        </div>
        <button
          onClick={fetchAnalytics}
          className="inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Grid of Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chart 1: Outages by Area */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-sky-600" />
                <span>Outages by Municipal Zone</span>
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Total incidents detected per municipal area</p>
            </div>
          </div>

          <div className="h-72 w-full">
            {data?.areaWiseOutages && data.areaWiseOutages.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.areaWiseOutages} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                  <XAxis dataKey="area" tick={{ fontSize: 10 }} interval={0} angle={-25} textAnchor="end" />
                  <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ borderRadius: '8px', fontSize: '12px' }} />
                  <Bar dataKey="incident_count" fill="#0284c7" radius={[4, 4, 0, 0]} name="Incidents">
                    {data.areaWiseOutages.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-xs text-slate-400">No data available</div>
            )}
          </div>
        </div>

        {/* Chart 2: Complaints by Category */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <PieIcon className="w-4 h-4 text-amber-600" />
                <span>Consumer Fault Breakdown</span>
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Distribution of consumer complaints across fault categories</p>
            </div>
          </div>

          <div className="h-72 w-full flex items-center justify-center">
            {data?.complaintsByCategory && data.complaintsByCategory.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.complaintsByCategory}
                    dataKey="count"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    outerRadius={85}
                    innerRadius={50}
                    paddingAngle={3}
                    label={({ name, percent }) => `${(name || '').replace('_', ' ')} (${(percent * 100).toFixed(0)}%)`}
                    labelLine={false}
                  >
                    {data.complaintsByCategory.map((_, index) => (
                      <Cell key={`cell-pie-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '8px', fontSize: '12px' }} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-xs text-slate-400">No complaints filed yet</div>
            )}
          </div>
        </div>
      </div>

      {/* Grid Performance Summary Card */}
      <div className="bg-gradient-to-r from-sky-900 to-slate-900 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center gap-2 mb-2 text-sky-400 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Automated Algorithm Evaluation Note</span>
        </div>
        <h4 className="text-lg font-bold">Reliability & False-Positive Mitigation</h4>
        <p className="text-xs text-slate-300 mt-2 max-w-2xl leading-relaxed">
          PowerPulse uses iterative crowd corroboration. Single-user breaker trips or isolated residential wiring faults are automatically classified as <strong>Low Confidence (0–39%)</strong> and do not trigger municipal grid alerts. Only when at least 2 distinct accounts corroborate within a 30-minute window does the engine escalate to candidate incident status.
        </p>
      </div>
    </div>
  );
};
