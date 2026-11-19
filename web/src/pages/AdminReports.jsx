import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { FileText, RefreshCw, AlertTriangle, ShieldAlert, CheckCircle2, Filter } from 'lucide-react';

export const AdminReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState('all');
  const [flagFilter, setFlagFilter] = useState('all');

  const fetchReports = async () => {
    try {
      setLoading(true);
      const res = await api.get('/reports?limit=200');
      setReports(res.data.reports || []);
    } catch (err) {
      console.error('Error fetching raw reports:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const filtered = reports.filter(r => {
    if (typeFilter !== 'all' && r.type !== typeFilter) return false;
    if (flagFilter === 'duplicate' && !r.is_duplicate) return false;
    if (flagFilter === 'spam' && !r.is_spam) return false;
    if (flagFilter === 'clean' && (r.is_duplicate || r.is_spam)) return false;
    return true;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Raw Consumer Reports Stream</h2>
          <p className="text-xs text-slate-500 mt-1">Audit individual incoming OFF/BACK signals, spam detections, and duplicate penalties</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="all">All Signals (OFF & BACK)</option>
            <option value="OFF">Power OFF Signals Only</option>
            <option value="BACK">Power BACK Signals Only</option>
          </select>

          {/* Flag Filter */}
          <select
            value={flagFilter}
            onChange={(e) => setFlagFilter(e.target.value)}
            className="px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="all">All Audit Statuses</option>
            <option value="clean">Valid Signals Only</option>
            <option value="duplicate">Flagged Duplicates</option>
            <option value="spam">Flagged Spam</option>
          </select>

          <button
            onClick={fetchReports}
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition"
            title="Refresh"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-100">
              <tr>
                <th className="py-3 px-4">Report ID</th>
                <th className="py-3 px-4">Reporting Consumer</th>
                <th className="py-3 px-4">Area / District</th>
                <th className="py-3 px-4">Signal Type</th>
                <th className="py-3 px-4">Spam Flag</th>
                <th className="py-3 px-4">Duplicate Flag</th>
                <th className="py-3 px-4">Reported Time</th>
                <th className="py-3 px-4">Client UUID</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-400">
                    No reports match the selected filters.
                  </td>
                </tr>
              ) : (
                filtered.map((r) => (
                  <tr key={r.report_id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                      #{r.report_id}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900">{r.user_name}</div>
                      <div className="text-[11px] text-slate-400">Reliability: {r.reliability_score}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-medium text-slate-900">{r.area}</span>
                      <span className="block text-[11px] text-slate-400">{r.district} ({r.zone})</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        r.type === 'OFF'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}>
                        Power {r.type}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      {r.is_spam ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-200">
                          <ShieldAlert className="w-3 h-3" />
                          <span>SPAM</span>
                        </span>
                      ) : (
                        <span className="text-slate-400 font-mono text-[11px]">—</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      {r.is_duplicate ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                          <AlertTriangle className="w-3 h-3" />
                          <span>DUPLICATE</span>
                        </span>
                      ) : (
                        <span className="text-slate-400 font-mono text-[11px]">—</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 font-mono">
                      {new Date(r.reported_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[10px] text-slate-400 max-w-[120px] truncate" title={r.client_uuid}>
                      {r.client_uuid || 'N/A'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
