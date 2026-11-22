import React, { useState, useMemo } from 'react';
import { StatusBadge } from '../../../components/StatusBadge';
import { Search } from 'lucide-react';

/**
 * 📋 Feature: Citizen Complaint Tracking History
 * ----------------------------------------------------
 * What this does:
 * Displays all tickets filed by this citizen, showing:
 * 1. The complaint ticket ID (#CMP-XX)
 * 2. Status badge (Pending, Dispatched, Resolved)
 * 3. The name and phone of the assigned field technician
 * 4. Diagnostic notes left by the technician after visiting
 * 5. Full search, filter, and sorting capabilities
 */
export const ComplaintHistoryCard = ({ complaints = [] }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const filteredComplaints = useMemo(() => {
    return complaints.filter((c) => {
      if (statusFilter !== 'all' && c.status !== statusFilter) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchId = String(c.complaint_id || '').toLowerCase().includes(q);
        const matchCat = (c.category || '').toLowerCase().includes(q);
        const matchDesc = (c.description || '').toLowerCase().includes(q);
        const matchTech = (c.technician_name || '').toLowerCase().includes(q);
        if (!matchId && !matchCat && !matchDesc && !matchTech) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'newest') return (b.complaint_id || 0) - (a.complaint_id || 0);
      if (sortBy === 'oldest') return (a.complaint_id || 0) - (b.complaint_id || 0);
      return 0;
    });
  }, [complaints, searchQuery, statusFilter, sortBy]);

  const hasActiveFilters = searchQuery.trim() !== '' || statusFilter !== 'all' || sortBy !== 'newest';

  const clearFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setSortBy('newest');
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <h3 className="text-sm font-bold text-slate-900">
          My Complaint Tracking History
        </h3>
        {complaints.length > 0 && (
          <span className="text-xs text-slate-400">
            {filteredComplaints.length} of {complaints.length} tickets
          </span>
        )}
      </div>

      {complaints.length === 0 ? (
        <p className="text-xs text-slate-400">
          You have not submitted any complaints yet.
        </p>
      ) : (
        <>
          {/* Search & Filter controls */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search ticket, category, notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition"
              />
            </div>

            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-700 capitalize font-medium transition"
              >
                <option value="all">All Ticket Statuses</option>
                <option value="pending">Pending Dispatch</option>
                <option value="assigned">Assigned</option>
                <option value="investigating">Investigating</option>
                <option value="repairing">Repairing</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>

            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-700 font-medium transition"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold text-xs transition whitespace-nowrap"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          {filteredComplaints.length === 0 ? (
            <p className="text-xs text-slate-400 py-3 text-center">
              No complaint tickets match your search.
            </p>
          ) : (
            <div className="space-y-3">
              {filteredComplaints.map((c) => (
                <div
                  key={c.complaint_id}
                  className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs hover:border-slate-300 transition"
                >
                  <div>
                    <div className="flex items-center gap-2 font-bold text-slate-900">
                      <span>#CMP-{c.complaint_id}</span>
                      <span className="capitalize px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-200 text-slate-800">
                        {c.category?.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-slate-600 mt-1">{c.description}</p>
                    {c.technician_name && (
                      <p className="text-[11px] text-sky-700 mt-1">
                        Assigned Tech: <strong>{c.technician_name}</strong> (
                        {c.technician_phone})
                      </p>
                    )}
                    {c.tech_remarks && (
                      <p className="text-[11px] text-slate-500 italic mt-0.5">
                        Note: "{c.tech_remarks}"
                      </p>
                    )}
                  </div>
                  <div className="shrink-0">
                    <StatusBadge status={c.status} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};
