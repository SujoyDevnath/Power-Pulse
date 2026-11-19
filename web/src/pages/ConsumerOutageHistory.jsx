import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { StatusBadge } from '../components/StatusBadge';
import { History, Clock, CheckCircle2, RefreshCw, Calendar } from 'lucide-react';

export const ConsumerOutageHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const res = await api.get('/incidents/history?limit=50');
      setHistory(res.data.incidents || []);
    } catch (err) {
      console.error('Error fetching outage history:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const formatDuration = (mins) => {
    if (!mins) return 'N/A';
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    if (h === 0) return `${m} minutes`;
    return `${h}h ${m}m`;
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Outage Incident History</h2>
          <p className="text-xs text-slate-500 mt-0.5">Historical record of resolved community power interruptions</p>
        </div>
        <button
          onClick={fetchHistory}
          className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {history.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 text-center border border-slate-200 shadow-sm">
          <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
          <h3 className="font-bold text-slate-900 text-sm">No Recorded Outages</h3>
          <p className="text-xs text-slate-400 mt-1">There are no archived power outages logged for your area.</p>
        </div>
      ) : (
        <div className="space-y-3.5">
          {history.map((item) => (
            <div
              key={item.incident_id}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-slate-400">#{item.incident_id}</span>
                  <h3 className="font-bold text-slate-900 text-sm">{item.area} ({item.zone})</h3>
                  <StatusBadge status={item.status} />
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-1">
                  <span className="flex items-center gap-1 font-mono">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{new Date(item.start_time).toLocaleDateString()}</span>
                  </span>
                  <span>•</span>
                  <span>
                    Started: <strong>{new Date(item.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</strong>
                  </span>
                  {item.end_time && (
                    <>
                      <span>•</span>
                      <span>
                        Restored: <strong>{new Date(item.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</strong>
                      </span>
                    </>
                  )}
                </div>
              </div>

              <div className="sm:text-right shrink-0">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-100 text-slate-800 font-mono text-xs font-bold">
                  <Clock className="w-3.5 h-3.5 text-sky-600" />
                  <span>Duration: {formatDuration(item.duration_minutes)}</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Corroborated by {item.total_reports || 1} reports
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
