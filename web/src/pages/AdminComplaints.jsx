import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { StatusBadge } from '../components/StatusBadge';
import { Modal } from '../components/Modal';
import { 
  MessageSquareWarning, UserCheck, RefreshCw, 
  Search, CheckCircle2, Clock, Wrench 
} from 'lucide-react';

export const AdminComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [selectedTechId, setSelectedTechId] = useState('');
  const [assignRemarks, setAssignRemarks] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [assigning, setAssigning] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [compRes, techRes] = await Promise.all([
        api.get('/complaints'),
        api.get('/technician/list')
      ]);
      setComplaints(compRes.data.complaints || []);
      setTechnicians(techRes.data.technicians || []);
    } catch (err) {
      console.error('Error fetching complaints data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openAssignModal = (complaint) => {
    setSelectedComplaint(complaint);
    setSelectedTechId(complaint.technician_id || '');
    setAssignRemarks(complaint.technician_remarks || '');
  };

  const handleAssign = async (e) => {
    e.preventDefault();
    if (!selectedTechId) {
      alert('Please select a technician');
      return;
    }

    try {
      setAssigning(true);
      await api.patch(`/complaints/${selectedComplaint.complaint_id}/assign`, {
        technician_id: selectedTechId,
        remarks: assignRemarks
      });
      setSelectedComplaint(null);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to assign technician');
    } finally {
      setAssigning(false);
    }
  };

  const filtered = complaints.filter(c => {
    if (statusFilter !== 'all' && c.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Complaint & Dispatch Desk</h2>
          <p className="text-xs text-slate-500 mt-1">Review consumer tickets, categorize faults, and dispatch field technicians</p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="assigned">Assigned</option>
            <option value="investigating">Investigating</option>
            <option value="repairing">Repairing</option>
            <option value="resolved">Resolved</option>
          </select>

          <button
            onClick={fetchData}
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Complaints Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-100">
              <tr>
                <th className="py-3 px-4">Ticket ID</th>
                <th className="py-3 px-4">Consumer</th>
                <th className="py-3 px-4">Area</th>
                <th className="py-3 px-4">Fault Category</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Assigned Tech</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filtered.map((c) => (
                <tr key={c.complaint_id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                    #CMP-{c.complaint_id}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-900">{c.consumer_name}</div>
                    <div className="text-[11px] text-slate-400">{c.consumer_phone || c.consumer_email}</div>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-900">
                    {c.area || 'N/A'}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700 capitalize">
                      {c.category.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 max-w-xs truncate text-slate-600" title={c.description}>
                    {c.description || 'No description provided'}
                  </td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={c.status} />
                  </td>
                  <td className="py-3.5 px-4">
                    {c.technician_name ? (
                      <span className="font-semibold text-slate-900">{c.technician_name}</span>
                    ) : (
                      <span className="text-slate-400 italic">Unassigned</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => openAssignModal(c)}
                      className="px-3 py-1 text-xs font-semibold rounded-lg bg-sky-50 text-sky-700 hover:bg-sky-100 transition inline-flex items-center gap-1.5"
                    >
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>{c.technician_name ? 'Reassign' : 'Dispatch'}</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Technician Assignment Modal */}
      <Modal
        isOpen={Boolean(selectedComplaint)}
        onClose={() => setSelectedComplaint(null)}
        title={`Dispatch Field Technician - Ticket #CMP-${selectedComplaint?.complaint_id}`}
      >
        <form onSubmit={handleAssign} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Select Field Technician
            </label>
            <div className="space-y-2 mt-2">
              {technicians.map((t) => (
                <label
                  key={t.technician_id}
                  className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition ${
                    selectedTechId == t.technician_id
                      ? 'border-sky-500 bg-sky-50/50 ring-1 ring-sky-500'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="technician"
                      value={t.technician_id}
                      checked={selectedTechId == t.technician_id}
                      onChange={(e) => setSelectedTechId(e.target.value)}
                      className="text-sky-600 focus:ring-sky-500"
                    />
                    <div>
                      <p className="font-bold text-slate-900">{t.name}</p>
                      <p className="text-[11px] text-slate-400">Base: {t.base_area} • Phone: {t.phone}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <StatusBadge status={t.availability_status} />
                    <p className="text-[10px] text-slate-400 mt-1">{t.active_tasks} active task(s)</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Dispatch Instructions / Remarks
            </label>
            <textarea
              rows={3}
              value={assignRemarks}
              onChange={(e) => setAssignRemarks(e.target.value)}
              placeholder="e.g. Check pole transformer fuse at North Corner."
              className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setSelectedComplaint(null)}
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={assigning}
              className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold shadow-sm transition disabled:opacity-50"
            >
              {assigning ? 'Dispatching...' : 'Confirm Dispatch'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
