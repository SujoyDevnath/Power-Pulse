import React, { useState, useEffect, useMemo } from 'react';
import api from '../services/api';
import { StatusBadge } from '../components/StatusBadge';
import { History, Clock, CheckCircle2, RefreshCw, Calendar, Search } from 'lucide-react';

export const ConsumerOutageHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const res = await api.get('/incidents/history?limit=100');
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

  const filteredHistory = useMemo(() => {
    return history.filter(item => {
      if (typeFilter !== 'all' && (item.type || '').toLowerCase() !== typeFilter.toLowerCase()) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchId = String(item.incident_id || '').toLowerCase().includes(q);
        const matchArea = (item.area || '').toLowerCase().includes(q);
        const matchZone = (item.zone || '').toLowerCase().includes(q);
        const matchDistrict = (item.district || '').toLowerCase().includes(q);
        if (!matchId && !matchArea && !matchZone && !matchDistrict) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.start_time) - new Date(a.start_time);
      if (sortBy === 'oldest') return new Date(a.start_time) - new Date(b.start_time);
      if (sortBy === 'duration-desc') return (b.duration_minutes || 0) - (a.duration_minutes || 0);
      if (sortBy === 'duration-asc') return (a.duration_minutes || 0) - (b.duration_minutes || 0);
      return 0;
    });
  }, [history, searchQuery, typeFilter, sortBy]);

  const hasActiveFilters = searchQuery.trim() !== '' || typeFilter !== 'all' || sortBy !== 'newest';

  const clearFilters = () => {
    setSearchQuery('');
    setTypeFilter('all');
    setSortBy('newest');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Outage Incident History</h2>
          <p className="text-xs text-slate-500 mt-0.5">Historical record of resolved community power interruptions</p>
        </div>
        <button
          onClick={fetchHistory}
          className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition flex items-center gap-2 text-xs font-semibold shadow-sm self-start sm:self-auto"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by ID, area, zone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition"
            />
          </div>

          <div>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-700 font-medium transition"
            >
              <option value="all">All Outage Types</option>
              <option value="unexpected">Unexpected Grid Tripping</option>
              <option value="planned">Planned Load-Shedding</option>
            </select>
          </div>

          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-700 font-medium transition"
            >
              <option value="newest">Newest Incidents First</option>
              <option value="oldest">Oldest Incidents First</option>
              <option value="duration-desc">Longest Outages</option>
              <option value="duration-asc">Shortest Outages</option>
            </select>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold text-xs transition whitespace-nowrap"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Result Counter */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>Showing <strong>{filteredHistory.length}</strong> of <strong>{history.length}</strong> incidents</span>
        {hasActiveFilters && <span className="text-sky-600 font-medium">Filters active</span>}
      </div>

      {filteredHistory.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 text-center border border-slate-200 shadow-sm">
          <CheckCircle2 className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <h3 className="font-bold text-slate-900 text-sm">No Incidents Found</h3>
          <p className="text-xs text-slate-400 mt-1">
            {hasActiveFilters ? 'No outages match your filter criteria. Try resetting filters.' : 'There are no archived power outages logged for your area.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3.5">
          {filteredHistory.map((item) => (
            <div
              key={item.incident_id}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-300 transition"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-slate-400">#{item.incident_id}</span>
                  <h3 className="font-bold text-slate-900 text-sm">{item.area} ({item.zone})</h3>
                  <StatusBadge status={item.status} />
                  {item.type && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600 capitalize">
                      {item.type}
                    </span>
                  )}
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
