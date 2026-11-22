import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { StatusBadge } from '../components/StatusBadge';
import { Modal } from '../components/Modal';
import { 
  ArrowLeft, Wrench, CheckCircle2, Clock, Phone, MapPin, 
  Send, AlertTriangle, ShieldCheck, User, RotateCcw, 
  Check, SlidersHorizontal, ArrowRight
} from 'lucide-react';

export const TechnicianTaskDetail = () => {
  const { id } = useParams(); // assignment_id
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [remarks, setRemarks] = useState('');
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState('');

  // Confirmation Modal State (prevents accidental misclicks)
  const [modalOpen, setModalOpen] = useState(false);
  const [targetStatus, setTargetStatus] = useState('');
  const [isRollback, setIsRollback] = useState(false);

  // Undo System state
  const [recentAction, setRecentAction] = useState(null);
  const undoTimeoutRef = useRef(null);

  const fetchTask = async () => {
    try {
      setLoading(true);
      const res = await api.get('/technician/assignments');
      const found = (res.data.assignments || []).find(a => String(a.assignment_id) === String(id));
      if (!found) {
        alert('Work order not found');
        navigate('/tech');
        return;
      }
      setTask(found);
      setRemarks(found.remarks || '');
    } catch (err) {
      console.error('Error fetching assignment detail:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTask();
    return () => {
      if (undoTimeoutRef.current) clearTimeout(undoTimeoutRef.current);
    };
  }, [id]);

  const promptStatusChange = (newStatus, rollback = false) => {
    setTargetStatus(newStatus);
    setIsRollback(rollback);
    setModalOpen(true);
  };

  const confirmStatusUpdate = async (e) => {
    e.preventDefault();
    if (!targetStatus) return;

    const previousStatus = task.status;
    const previousRemarks = task.remarks || '';

    try {
      setUpdating(true);
      await api.patch(`/technician/assignments/${id}`, {
        status: targetStatus,
        remarks: remarks || `Field state progressed to ${targetStatus}`
      });

      setMessage(`Work order #${id} successfully updated to [${targetStatus.toUpperCase()}].`);
      setModalOpen(false);

      // Setup Undo Toast
      if (undoTimeoutRef.current) clearTimeout(undoTimeoutRef.current);
      setRecentAction({
        assignmentId: id,
        previousStatus,
        previousRemarks,
        newStatus: targetStatus
      });

      undoTimeoutRef.current = setTimeout(() => {
        setRecentAction(null);
      }, 14000);

      fetchTask();
      setTimeout(() => setMessage(''), 4000);
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to update work order');
    } finally {
      setUpdating(false);
    }
  };

  const handleInstantUndo = async () => {
    if (!recentAction) return;
    try {
      setUpdating(true);
      await api.patch(`/technician/assignments/${id}`, {
        status: recentAction.previousStatus,
        remarks: `[Accidental click reverted] Restored to ${recentAction.previousStatus}. ${recentAction.previousRemarks || ''}`
      });
      setMessage(`Status reverted back to [${recentAction.previousStatus.toUpperCase()}].`);
      setRecentAction(null);
      fetchTask();
      setTimeout(() => setMessage(''), 4000);
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to undo status change');
    } finally {
      setUpdating(false);
    }
  };

  if (loading || !task) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const steps = ['assigned', 'investigating', 'repairing', 'resolved'];
  const currentIndex = steps.indexOf(task.status);

  return (
    <div className="space-y-6 animate-fadeIn max-w-3xl mx-auto">
      {/* Back button */}
      <div>
        <Link
          to="/tech"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 transition mb-3"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Assignments</span>
        </Link>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Work Order #CMP-{task.complaint_id}</h2>
          <StatusBadge status={task.status} />
        </div>
      </div>

      {/* Undo Banner if action was just executed */}
      {recentAction && (
        <div className="p-3.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-2xl shadow-lg flex items-center justify-between gap-4 animate-fadeIn border border-amber-400 text-xs">
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 bg-white/20 rounded-xl">
              <RotateCcw className="w-4 h-4 animate-spin" />
            </span>
            <div>
              <p className="font-bold">
                Status updated to [{recentAction.newStatus.toUpperCase()}].
              </p>
              <p className="text-[11px] text-amber-100">
                Accidental click? You can rollback to [{recentAction.previousStatus.toUpperCase()}].
              </p>
            </div>
          </div>
          <button
            onClick={handleInstantUndo}
            disabled={updating}
            className="px-3 py-1.5 bg-white text-amber-900 hover:bg-amber-50 rounded-xl text-xs font-bold transition shadow-sm flex items-center gap-1.5 shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{updating ? 'Reverting...' : 'Undo Status Change'}</span>
          </button>
        </div>
      )}

      {message && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{message}</span>
        </div>
      )}

      {/* Lifecycle Progress Bar */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
        <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-4">Job Progression Lifecycle</p>
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-slate-200 w-full z-0"></div>
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-amber-500 transition-all duration-500 z-0"
            style={{ width: `${(Math.max(0, currentIndex) / (steps.length - 1)) * 100}%` }}
          ></div>

          {steps.map((s, idx) => {
            const isCompleted = idx <= currentIndex;
            const isCurrent = idx === currentIndex;
            return (
              <div key={s} className="flex flex-col items-center relative z-10">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border-2 transition ${
                    isCurrent
                      ? 'bg-amber-500 border-amber-600 text-white shadow-md ring-4 ring-amber-100'
                      : isCompleted
                      ? 'bg-emerald-500 border-emerald-600 text-white'
                      : 'bg-white border-slate-300 text-slate-400'
                  }`}
                >
                  {idx + 1}
                </div>
                <span className={`text-[10px] font-semibold mt-1.5 capitalize ${
                  isCurrent ? 'text-amber-700 font-bold' : isCompleted ? 'text-slate-800' : 'text-slate-400'
                }`}>
                  {s}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Details Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5 text-xs">
        <div>
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 uppercase tracking-wider">
            {task.category.replace('_', ' ')}
          </span>
          <h3 className="text-base font-bold text-slate-900 mt-2">{task.description}</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-100">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] text-slate-400 uppercase font-semibold flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-sky-600" />
              <span>Job Site Location</span>
            </span>
            <p className="font-bold text-slate-900 text-sm mt-1">{task.area}</p>
            <p className="text-slate-500 text-[11px]">{task.district} • {task.zone}</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] text-slate-400 uppercase font-semibold flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span>Consumer Contact</span>
            </span>
            <p className="font-bold text-slate-900 text-sm mt-1">{task.consumer_name}</p>
            <p className="text-slate-500 text-[11px]">{task.consumer_phone || 'No phone recorded'}</p>
          </div>
        </div>

        {/* Remarks Section */}
        <div>
          <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Field Diagnostic Remarks & Parts Log *
          </label>
          <textarea
            rows={4}
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            placeholder="Document fuse replacement, cable splicing, line clearance, or transformer inspection..."
            className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-xs"
          />
        </div>

        {/* Action Buttons: Forward Progress + Undo/Rollback Flexibility */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          {/* Quick status selector (arbitrary corrections) */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-500 font-semibold">Change to:</span>
            <select
              value={task.status}
              onChange={(e) => {
                const newSt = e.target.value;
                if (newSt !== task.status) {
                  promptStatusChange(newSt, steps.indexOf(newSt) < currentIndex);
                }
              }}
              className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500 capitalize"
            >
              <option value="assigned">Assigned</option>
              <option value="investigating">Investigating</option>
              <option value="repairing">Repairing</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* If assigned -> advance to investigating */}
            {task.status === 'assigned' && (
              <button
                type="button"
                onClick={() => promptStatusChange('investigating', false)}
                className="py-2.5 px-5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-md transition"
              >
                Start Investigation
              </button>
            )}

            {/* If investigating -> Rollback to assigned OR Advance to repairing */}
            {task.status === 'investigating' && (
              <>
                <button
                  type="button"
                  onClick={() => promptStatusChange('assigned', true)}
                  className="py-2.5 px-3.5 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs transition flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Undo to Assigned</span>
                </button>
                <button
                  type="button"
                  onClick={() => promptStatusChange('repairing', false)}
                  className="py-2.5 px-5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-md transition"
                >
                  Commence Field Repair
                </button>
              </>
            )}

            {/* If repairing -> Rollback to investigating OR Advance to resolved */}
            {task.status === 'repairing' && (
              <>
                <button
                  type="button"
                  onClick={() => promptStatusChange('investigating', true)}
                  className="py-2.5 px-3.5 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold text-xs transition flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Undo to Investigating</span>
                </button>
                <button
                  type="button"
                  onClick={() => promptStatusChange('resolved', false)}
                  className="py-2.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Complete & Mark Restored</span>
                </button>
              </>
            )}

            {/* If resolved -> Reopen / Rollback work order */}
            {task.status === 'resolved' && (
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5 mr-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Work Order Resolved</span>
                </span>
                <button
                  type="button"
                  onClick={() => promptStatusChange('repairing', true)}
                  className="py-2.5 px-4 rounded-xl border border-rose-300 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs transition flex items-center gap-1.5 shadow-sm"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reopen / Undo Resolution</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Modal to prevent accidental clicks */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={
          isRollback 
            ? `⚠️ Confirm Rollback: Revert Work Order to [${targetStatus?.toUpperCase()}]`
            : `Confirm Status Advance to [${targetStatus?.toUpperCase()}]`
        }
      >
        <form onSubmit={confirmStatusUpdate} className="space-y-4 text-xs">
          <div className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 ${
            isRollback ? 'bg-rose-50/70 border-rose-200 text-rose-900' : 'bg-sky-50/70 border-sky-200 text-sky-900'
          }`}>
            <div className="text-center">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Current</span>
              <span className="px-2.5 py-1 bg-white border rounded-lg font-bold text-xs uppercase mt-1 inline-block">
                {task.status}
              </span>
            </div>

            <ArrowRight className={`w-5 h-5 ${isRollback ? 'text-rose-500 rotate-180' : 'text-sky-500'}`} />

            <div className="text-center">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Target</span>
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
                <strong>Status Rollback:</strong> You are undoing or reverting this work order. The citizen will be notified of this change.
              </p>
            </div>
          ) : (
            <p className="text-slate-600">
              Are you sure you want to transition this work order to <strong>[{targetStatus?.toUpperCase()}]</strong>?
            </p>
          )}

          <div>
            <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Field Notes / Remarks *
            </label>
            <textarea
              required
              rows={3}
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="State reason or resolution details..."
              className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 text-xs"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold"
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
              <span>{updating ? 'Saving...' : isRollback ? 'Confirm Rollback' : 'Confirm Status Update'}</span>
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
