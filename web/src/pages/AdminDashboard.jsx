import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { MetricCard } from '../components/MetricCard';
import { ConfidenceBadge } from '../components/ConfidenceBadge';
import { StatusBadge } from '../components/StatusBadge';
import { 
  AlertOctagon, Clock, MessageSquareWarning, Users, 
  ArrowUpRight, RefreshCw, ZapOff, CheckCircle2 
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell 
} from 'recharts';

export const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [activeIncidents, setActiveIncidents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [analyticsRes, incidentsRes] = await Promise.all([
        api.get('/admin/analytics'),
        api.get('/incidents/active')
      ]);
      setAnalytics(analyticsRes.data);
      setActiveIncidents(incidentsRes.data.incidents || []);
    } catch (err) {
      console.error('Error fetching admin dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatDuration = (mins) => {
    if (!mins) return 'N/A';
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    if (h === 0) return `${m}m`;
    return `${h}h ${m}m`;
  };

  if (loading && !analytics) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const kpi = analytics?.kpi || {};

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Executive Grid Dashboard</h2>
          <p className="text-xs text-slate-500 mt-1">Real-time outage detection, confidence scoring, and dispatch overview</p>
        </div>
        <button
          onClick={fetchData}
          className="inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm transition"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Data</span>
        </button>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <MetricCard
          title="Active Outages"
          value={kpi.activeOutages || 0}
          subtext="Unresolved community incidents"
          icon={ZapOff}
          color="red"
        />
        <MetricCard
          title="Pending Complaints"
          value={kpi.pendingComplaints || 0}
          subtext="Requires field technician dispatch"
          icon={MessageSquareWarning}
          color="amber"
        />
        <MetricCard
          title="Avg Outage Duration"
          value={formatDuration(kpi.avgDurationMinutes)}
          subtext="Calculated across restored incidents"
          icon={Clock}
          color="blue"
        />
        <MetricCard
          title="Active Technicians"
          value={`${kpi.activeTechs || 0} Ready`}
          subtext="Available for rapid dispatch"
          icon={Users}
          color="emerald"
        />
      </div>

      {/* Two Column Layout: Active Incidents & Area Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Live Active Incidents */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
              <h3 className="text-sm font-bold text-slate-900">Active Detected Incidents</h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-red-700 border border-red-200">
                {activeIncidents.length} LIVE
              </span>
            </div>
            <Link
              to="/admin/incidents"
              className="text-xs font-semibold text-sky-600 hover:text-sky-700 inline-flex items-center gap-1"
            >
              <span>Manage Incidents</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {activeIncidents.length === 0 ? (
            <div className="p-8 text-center">
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-700">Grid Operating Normally</p>
              <p className="text-xs text-slate-400 mt-1">No community outages currently detected or active.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-100">
                  <tr>
                    <th className="py-3 px-4">Incident ID</th>
                    <th className="py-3 px-4">Area / Location</th>
                    <th className="py-3 px-4">Confidence Level</th>
                    <th className="py-3 px-4">Signals</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {activeIncidents.map((incident) => (
                    <tr key={incident.incident_id} className="hover:bg-slate-50/80 transition">
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                        #{incident.incident_id}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-900">{incident.area}</div>
                        <div className="text-[11px] text-slate-400">{incident.district} ({incident.zone})</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <ConfidenceBadge
                          score={incident.confidence_score}
                          classification={incident.classification}
                        />
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-slate-900">{incident.total_reports}</span> reports /{' '}
                        <span className="font-semibold text-slate-900">{incident.reporting_users}</span> users
                      </td>
                      <td className="py-3.5 px-4">
                        <StatusBadge status={incident.type} />
                      </td>
                      <td className="py-3.5 px-4">
                        <Link
                          to="/admin/incidents"
                          className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-sky-50 text-sky-700 hover:bg-sky-100 transition"
                        >
                          Review
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Right Column: Outage Frequency by Area Chart */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-slate-900">Area Outage Distribution</h3>
            <p className="text-[11px] text-slate-400 mt-0.5">Top municipal zones experiencing disruptions</p>
          </div>

          <div className="flex-1 min-h-[260px] w-full">
            {analytics?.areaWiseOutages && analytics.areaWiseOutages.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analytics.areaWiseOutages.slice(0, 5)} layout="vertical" margin={{ left: 10, right: 10 }}>
                  <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11 }} />
                  <YAxis type="category" dataKey="area" width={80} tick={{ fontSize: 11 }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', fontSize: '12px', border: '1px solid #e2e8f0' }}
                  />
                  <Bar dataKey="incident_count" fill="#0284c7" radius={[0, 4, 4, 0]}>
                    {analytics.areaWiseOutages.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 ? '#ef4444' : '#0284c7'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-xs text-slate-400">
                No historical area data logged
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
