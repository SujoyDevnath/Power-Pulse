import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { StatusBadge } from '../components/StatusBadge';
import { Modal } from '../components/Modal';
import { 
  Wrench, CheckCircle2, Clock, Phone, MapPin, 
  AlertTriangle, RefreshCw, Send, Check 
} from 'lucide-react';

export const TechnicianDashboard = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTask, setActiveTask] = useState(null);
  const [remarks, setRemarks] = useState('');
  const [targetStatus, setTargetStatus] = useState('');
  const [updating, setUpdating] = useState(false);

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
  }, []);

  const openStatusModal = (task, newStatus) => {
    setActiveTask(task);
    setTargetStatus(newStatus);
    setRemarks(task.remarks || '');
  };

  const submitStatusUpdate = async (e) => {
    e.preventDefault();
    try {
      setUpdating(true);
      await api.patch(`/technician/assignments/${activeTask.assignment_id}`, {
        status: targetStatus,
        remarks: remarks || `Status transitioned to ${targetStatus}`
      });
      setActiveTask(null);
      fetchAssignments();
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to update task status');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Assigned Field Work Orders</h2>
          <p className="text-xs text-slate-500 mt-0.5">Accept dispatched tickets, log diagnostic remarks, and resolve faults</p>
        </div>
        <button
          onClick={fetchAssignments}
          className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
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
      ) : (
        <div className="space-y-4">
          {assignments.map((task) => (
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

              {/* Multi-stage Progression Buttons */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100">
                <Link
                  to={`/tech/assignments/${task.assignment_id}`}
                  className="text-xs font-semibold text-sky-600 hover:text-sky-700 underline"
                >
                  View Full Work Order →
                </Link>

                <div className="flex items-center gap-2">
                  {task.status === 'assigned' && (
                    <button
                      onClick={() => openStatusModal(task, 'investigating')}
                      className="px-3.5 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs shadow-sm transition"
                    >
                      Start Investigation
                    </button>
                  )}

                  {task.status === 'investigating' && (
                    <button
                      onClick={() => openStatusModal(task, 'repairing')}
                      className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs shadow-sm transition"
                    >
                      Commence Repair
                    </button>
                  )}

                  {task.status === 'repairing' && (
                    <button
                      onClick={() => openStatusModal(task, 'resolved')}
                      className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-sm transition inline-flex items-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Complete & Resolve</span>
                    </button>
                  )}

                  {task.status === 'resolved' && (
                    <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Resolved</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Status Transition Modal */}
      <Modal
        isOpen={Boolean(activeTask)}
        onClose={() => setActiveTask(null)}
        title={`Update Task #${activeTask?.complaint_id} to [${targetStatus.toUpperCase()}]`}
      >
        <form onSubmit={submitStatusUpdate} className="space-y-4 text-xs">
          <p className="text-slate-600">
            Document your findings, repair actions, or parts replaced before updating the job lifecycle status:
          </p>

          <div>
            <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Field Remarks / Resolution Notes *
            </label>
            <textarea
              required
              rows={4}
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="e.g. Replaced burnt drop-out fuse at Pole #12. Voltage verified at 230V."
              className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setActiveTask(null)}
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={updating}
              className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold shadow-sm transition disabled:opacity-50"
            >
              {updating ? 'Saving...' : 'Confirm Status Update'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
