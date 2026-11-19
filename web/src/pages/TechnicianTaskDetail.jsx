import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { StatusBadge } from '../components/StatusBadge';
import { 
  ArrowLeft, Wrench, CheckCircle2, Clock, Phone, MapPin, 
  Send, AlertTriangle, ShieldCheck, User 
} from 'lucide-react';

export const TechnicianTaskDetail = () => {
  const { id } = useParams(); // assignment_id
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [remarks, setRemarks] = useState('');
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState('');

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
  }, [id]);

  const handleUpdateStatus = async (newStatus) => {
    try {
      setUpdating(true);
      await api.patch(`/technician/assignments/${id}`, {
        status: newStatus,
        remarks: remarks || `Field state progressed to ${newStatus}`
      });
      setMessage(`Work order #${id} successfully updated to [${newStatus.toUpperCase()}].`);
      fetchTask();
      setTimeout(() => setMessage(''), 4000);
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to update work order');
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
            style={{ width: `${(currentIndex / (steps.length - 1)) * 100}%` }}
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

        {/* Action Progression Buttons */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-end gap-3">
          {task.status === 'assigned' && (
            <button
              type="button"
              disabled={updating}
              onClick={() => handleUpdateStatus('investigating')}
              className="py-2.5 px-5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-md transition disabled:opacity-50"
            >
              {updating ? 'Updating...' : 'Start Investigation'}
            </button>
          )}

          {task.status === 'investigating' && (
            <button
              type="button"
              disabled={updating}
              onClick={() => handleUpdateStatus('repairing')}
              className="py-2.5 px-5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-md transition disabled:opacity-50"
            >
              {updating ? 'Updating...' : 'Commence Field Repair'}
            </button>
          )}

          {task.status === 'repairing' && (
            <button
              type="button"
              disabled={updating}
              onClick={() => handleUpdateStatus('resolved')}
              className="py-2.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition disabled:opacity-50 flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{updating ? 'Updating...' : 'Complete & Mark Restored'}</span>
            </button>
          )}

          {task.status === 'resolved' && (
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Work Order Closed & Resolved</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
