import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { StatusBadge } from '../components/StatusBadge';
import { Modal } from '../components/Modal';
import { 
  Wrench, CheckCircle2, Clock, Phone, MapPin, 
  AlertTriangle, RefreshCw, Send, Check, Search, 
  RotateCcw, ArrowRight, ShieldAlert, Sparkles, SlidersHorizontal
} from 'lucide-react';

export const TechnicianDashboard = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Status transition modal state
  const [activeTask, setActiveTask] = useState(null);
  const [remarks, setRemarks] = useState('');
  const [targetStatus, setTargetStatus] = useState('');
  const [isRollback, setIsRollback] = useState(false);
  const [updating, setUpdating] = useState(false);

  // Undo System (Temporary banner for instant accidental rollback)
  const [recentAction, setRecentAction] = useState(null);
  const undoTimeoutRef = useRef(null);

  const fetchAssignments = async () => {
    try {
      setLoading(true);
      const res = await api.get('/technician/assignments');
      setAssignments(res.data.assignments || []);
    } catch (err) {
      console.error('Error fetching technician tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignments();
    return () => {
      if (undoTimeoutRef.current) clearTimeout(undoTimeoutRef.current);
    };
  }, []);

  const availableCategories = useMemo(() => {
    return Array.from(new Set(assignments.map(a => a.category).filter(Boolean)));
  }, [assignments]);

  const filteredAssignments = useMemo(() => {
    return assignments.filter(task => {
      if (statusFilter !== 'all' && task.status !== statusFilter) return false;
      if (categoryFilter !== 'all' && task.category !== categoryFilter) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchId = String(task.complaint_id || '').toLowerCase().includes(q);
        const matchDesc = (task.description || '').toLowerCase().includes(q);
        const matchArea = (task.area || '').toLowerCase().includes(q);
        const matchConsumer = (task.consumer_name || '').toLowerCase().includes(q);
        const matchCategory = (task.category || '').toLowerCase().includes(q);
        if (!matchId && !matchDesc && !matchArea && !matchConsumer && !matchCategory) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.created_at || b.assigned_at || 0) - new Date(a.created_at || a.assigned_at || 0);
      if (sortBy === 'oldest') return new Date(a.created_at || a.assigned_at || 0) - new Date(b.created_at || b.assigned_at || 0);
      if (sortBy === 'consumer') return (a.consumer_name || '').localeCompare(b.consumer_name || '');
      if (sortBy === 'status') return (a.status || '').localeCompare(b.status || '');
      return 0;
    });
  }, [assignments, searchQuery, statusFilter, categoryFilter, sortBy]);

  const hasActiveFilters = searchQuery.trim() !== '' || statusFilter !== 'all' || categoryFilter !== 'all' || sortBy !== 'newest';

  const clearFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setCategoryFilter('all');
    setSortBy('newest');
  };

  const openStatusModal = (task, newStatus, rollback = false) => {
    setActiveTask(task);
    setTargetStatus(newStatus);
    setIsRollback(rollback);
    if (rollback) {
      setRemarks(`Rollback to ${newStatus}: Accidental status advance corrected.`);
    } else {
      setRemarks(task.remarks || '');
    }
  };

  const submitStatusUpdate = async (e) => {
    e.preventDefault();
    if (!activeTask || !targetStatus) return;

    const previousStatus = activeTask.status;
    const previousRemarks = activeTask.remarks || '';
    const assignmentId = activeTask.assignment_id;
    const complaintId = activeTask.complaint_id;

    try {
      setUpdating(true);
      await api.patch(`/technician/assignments/${assignmentId}`, {
        status: targetStatus,
        remarks: remarks || `Status transitioned to ${targetStatus}`
      });

      // Set Undo Toast
      if (undoTimeoutRef.current) clearTimeout(undoTimeoutRef.current);
      setRecentAction({
        assignmentId,
        complaintId,
        previousStatus,
        previousRemarks,
        newStatus: targetStatus
      });

      // Auto dismiss undo after 14 seconds
      undoTimeoutRef.current = setTimeout(() => {
        setRecentAction(null);
      }, 14000);

      setActiveTask(null);
      fetchAssignments();
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to update task status');
    } finally {
      setUpdating(false);
    }
  };

  // Instant 1-click Undo Handler
  const handleInstantUndo = async () => {
    if (!recentAction) return;
    try {
      setUpdating(true);
      await api.patch(`/technician/assignments/${recentAction.assignmentId}`, {
        status: recentAction.previousStatus,
        remarks: `[Accidental click reverted] Restored to ${recentAction.previousStatus}. ${recentAction.previousRemarks || ''}`
      });
      setRecentAction(null);
      fetchAssignments();
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to undo status change');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Assigned Field Work Orders</h2>
          <p className="text-xs text-slate-500 mt-0.5">Accept dispatched tickets, log diagnostic remarks, and resolve or rollback faults</p>
        </div>
        <button
          onClick={fetchAssignments}
          className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition flex items-center gap-2 text-xs font-semibold shadow-sm self-start sm:self-auto"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Accidental Click Instant Undo Toast Banner */}
      {recentAction && (
        <div className="p-3.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-2xl shadow-lg flex items-center justify-between gap-4 animate-fadeIn border border-amber-400">
          <div className="flex items-center gap-2.5 text-xs">
            <span className="p-1.5 bg-white/20 rounded-xl">
              <RotateCcw className="w-4 h-4 animate-spin" />
            </span>
            <div>
              <p className="font-bold">
                Task #CMP-{recentAction.complaintId} changed to [{recentAction.newStatus.toUpperCase()}]
              </p>
              <p className="text-[11px] text-amber-100">
                Was this a misclick? You can revert back to [{recentAction.previousStatus.toUpperCase()}] immediately.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleInstantUndo}
              disabled={updating}
              className="px-3.5 py-1.5 bg-white text-amber-900 hover:bg-amber-50 rounded-xl text-xs font-bold transition shadow-sm flex items-center gap-1.5 shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{updating ? 'Reverting...' : 'Undo Status Change'}</span>
            </button>
            <button
              onClick={() => setRecentAction(null)}
              className="p-1 hover:bg-white/20 rounded-lg text-white/80 hover:text-white text-xs"
              title="Dismiss"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search ID, consumer, area, fault..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition"
            />
          </div>

          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-700 font-medium capitalize transition"
            >
              <option value="all">All Task Statuses</option>
              <option value="assigned">Assigned</option>
              <option value="investigating">Investigating</option>
              <option value="repairing">Repairing</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>

          <div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-700 font-medium capitalize transition"
            >
              <option value="all">All Fault Categories</option>
              {availableCategories.map(cat => (
                <option key={cat} value={cat}>{cat.replace('_', ' ')}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-700 font-medium transition"
            >
              <option value="newest">Newest Dispatched</option>
              <option value="oldest">Oldest Dispatched</option>
              <option value="consumer">Consumer Name (A-Z)</option>
              <option value="status">Status Stage</option>
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
        <span>Showing <strong>{filteredAssignments.length}</strong> of <strong>{assignments.length}</strong> assignments</span>
        {hasActiveFilters && <span className="text-amber-600 font-medium">Filters active</span>}
      </div>

      {/* Task Queue Cards */}
      {assignments.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm">
          <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-900">All Field Tasks Cleared!</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            You currently have no pending assignments. You will be notified when a new complaint is dispatched to your zone.
          </p>
        </div>
      ) : filteredAssignments.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 text-center border border-slate-200 shadow-sm">
          <p className="font-semibold text-slate-600 mb-0.5 text-xs">No tasks match your filter criteria</p>
          <p className="text-[11px] text-slate-400">Try adjusting your search query, status or reset filters.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAssignments.map((task) => (
            <div
              key={task.assignment_id}
              className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm space-y-4 hover:border-slate-300 transition"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-500">
                      #CMP-{task.complaint_id}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 uppercase tracking-wider">
                      {task.category.replace('_', ' ')}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm mt-1">
                    {task.description || 'Emergency field repair required'}
                  </h3>
                </div>
                <StatusBadge status={task.status} />
              </div>

              {/* Location & Contact Meta */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2 text-slate-700">
                  <MapPin className="w-4 h-4 text-sky-600 shrink-0" />
                  <span className="font-medium">{task.area} ({task.district} • {task.zone})</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Consumer: <strong>{task.consumer_name}</strong> ({task.consumer_phone || 'No phone'})</span>
                </div>
              </div>

              {/* Remarks History */}
              {task.remarks && (
                <div className="text-xs text-slate-600 bg-amber-50/40 p-3 rounded-xl border border-amber-100">
                  <p className="font-semibold text-slate-800 text-[11px] uppercase tracking-wider mb-1">
                    Dispatch & Field Notes:
                  </p>
                  <p className="italic">"{task.remarks}"</p>
                </div>
              )}

              {/* Action Buttons: Forward Progress + Undo/Rollback Flexibility */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100">
                <Link
                  to={`/tech/assignments/${task.assignment_id}`}
                  className="text-xs font-semibold text-sky-600 hover:text-sky-700 underline flex items-center gap-1"
                >
                  <span>Work Order Details & Diagnostic Log</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <div className="flex items-center gap-2 flex-wrap">
                  {/* Assigned -> Advance to Investigating */}
                  {task.status === 'assigned' && (
                    <button
                      onClick={() => openStatusModal(task, 'investigating', false)}
                      className="px-3.5 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs shadow-sm transition"
                    >
                      Start Investigation
                    </button>
                  )}

                  {/* Investigating -> Forward to Repairing OR Undo back to Assigned */}
                  {task.status === 'investigating' && (
                    <>
                      <button
                        onClick={() => openStatusModal(task, 'assigned', true)}
                        className="px-3 py-1.5 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold text-xs transition flex items-center gap-1"
                        title="Mistakenly clicked? Revert to assigned"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Undo / Revert to Assigned</span>
                      </button>
                      <button
                        onClick={() => openStatusModal(task, 'repairing', false)}
                        className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs shadow-sm transition"
                      >
                        Commence Repair
                      </button>
                    </>
                  )}

                  {/* Repairing -> Forward to Resolved OR Undo back to Investigating */}
                  {task.status === 'repairing' && (
                    <>
                      <button
                        onClick={() => openStatusModal(task, 'investigating', true)}
                        className="px-3 py-1.5 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-800 font-semibold text-xs transition flex items-center gap-1"
                        title="Need to re-evaluate inspection? Revert to investigating"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Undo to Investigating</span>
                      </button>
                      <button
                        onClick={() => openStatusModal(task, 'resolved', false)}
                        className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-sm transition inline-flex items-center gap-1.5"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Complete & Resolve</span>
                      </button>
                    </>
                  )}

                  {/* Resolved -> Reopen / Undo back to Repairing */}
                  {task.status === 'resolved' && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1 mr-1">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Resolved</span>
                      </span>
                      <button
                        onClick={() => openStatusModal(task, 'repairing', true)}
                        className="px-3 py-1.5 rounded-xl border border-rose-300 bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold text-xs transition flex items-center gap-1 shadow-sm"
                        title="Mistakenly marked resolved or fault reoccurred? Reopen work order"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Reopen / Undo Resolution</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Confirmation & Status Transition Modal */}
      <Modal
        isOpen={Boolean(activeTask)}
        onClose={() => setActiveTask(null)}
        title={
          isRollback
            ? `⚠️ Rollback Work Order #${activeTask?.complaint_id} to [${targetStatus?.toUpperCase()}]`
            : `Update Task #${activeTask?.complaint_id} ➔ [${targetStatus?.toUpperCase()}]`
        }
      >
        <form onSubmit={submitStatusUpdate} className="space-y-4 text-xs">
          {/* Transition Visualizer */}
          <div className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 ${
            isRollback ? 'bg-rose-50/70 border-rose-200 text-rose-900' : 'bg-sky-50/70 border-sky-200 text-sky-900'
          }`}>
            <div className="text-center">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Current Stage</span>
              <span className="px-2.5 py-1 bg-white border rounded-lg font-bold text-xs uppercase mt-1 inline-block">
                {activeTask?.status}
              </span>
            </div>

            <ArrowRight className={`w-5 h-5 ${isRollback ? 'text-rose-500 rotate-180' : 'text-sky-500'}`} />

            <div className="text-center">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">
                {isRollback ? 'Revert Target' : 'New Stage'}
              </span>
              <span className={`px-2.5 py-1 border rounded-lg font-bold text-xs uppercase mt-1 inline-block ${
                isRollback ? 'bg-rose-600 text-white border-rose-700' : 'bg-sky-600 text-white border-sky-700'
              }`}>
                {targetStatus}
              </span>
            </div>
          </div>

          {isRollback ? (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="leading-snug">
                <strong>Status Rollback Notice:</strong> Reverting this status will notify the citizen that the work order is being re-evaluated or reopened.
              </p>
            </div>
          ) : (
            <p className="text-slate-600 leading-snug">
              Please document your field findings, parts replaced, or diagnostic notes before proceeding:
            </p>
          )}

          <div>
            <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Field Remarks / Diagnostic Notes *
            </label>
            <textarea
              required
              rows={4}
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder={isRollback 
                ? "State the reason for reverting this status (e.g. Accidental status click / Further sparking observed)..."
                : "e.g. Replaced burnt drop-out fuse at Pole #12. Voltage verified at 230V."
              }
              className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 text-xs"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setActiveTask(null)}
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={updating}
              className={`px-4 py-2 rounded-xl text-white font-semibold shadow-sm transition disabled:opacity-50 flex items-center gap-1.5 ${
                isRollback ? 'bg-rose-600 hover:bg-rose-500' : 'bg-sky-600 hover:bg-sky-500'
              }`}
            >
              {isRollback ? <RotateCcw className="w-3.5 h-3.5" /> : <Check className="w-3.5 h-3.5" />}
              <span>{updating ? 'Saving...' : isRollback ? 'Confirm Status Rollback' : 'Confirm Status Advance'}</span>
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
