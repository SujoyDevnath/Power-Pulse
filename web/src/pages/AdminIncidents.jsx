import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { ConfidenceBadge } from '../components/ConfidenceBadge';
import { StatusBadge } from '../components/StatusBadge';
import { Modal } from '../components/Modal';
import { 
  AlertOctagon, Check, X, RefreshCw, Eye, 
  Clock, ShieldCheck, User, MapPin, AlertCircle 
} from 'lucide-react';

export const AdminIncidents = () => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [incidentDetails, setIncidentDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [actionMessage, setActionMessage] = useState('');

  const fetchIncidents = async () => {
    try {
      setLoading(true);
      const [activeRes, historyRes] = await Promise.all([
        api.get('/incidents/active'),
        api.get('/incidents/history?limit=100')
      ]);

      const all = [
        ...(activeRes.data.incidents || []),
        ...(historyRes.data.incidents || [])
      ];

      // Remove duplicates by incident_id
      const unique = Array.from(new Map(all.map(item => [item.incident_id, item])).values());
      setIncidents(unique);
    } catch (err) {
      console.error('Error fetching incidents:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncidents();
  }, []);

  const openDetails = async (incident) => {
    setSelectedIncident(incident);
    setDetailsLoading(true);
    try {
      const res = await api.get(`/incidents/${incident.incident_id}`);
      setIncidentDetails(res.data);
    } catch (err) {
      console.error('Error fetching incident details:', err);
    } finally {
      setDetailsLoading(false);
    }
  };

  const handleAction = async (incidentId, action) => {
    try {
      let res;
      if (action === 'confirm') {
        res = await api.patch(`/incidents/${incidentId}/confirm`);
        setActionMessage(`Incident #${incidentId} confirmed to 100% confidence.`);
      } else if (action === 'dismiss') {
        res = await api.patch(`/incidents/${incidentId}/dismiss`);
        setActionMessage(`Incident #${incidentId} dismissed as false alarm.`);
      } else if (action === 'restore') {
        res = await api.patch(`/incidents/${incidentId}/restore`);
        setActionMessage(`Incident #${incidentId} marked as restored.`);
      }
      setSelectedIncident(null);
      fetchIncidents();
      setTimeout(() => setActionMessage(''), 4000);
    } catch (err) {
      alert(err.response?.data?.error || `Failed to ${action} incident`);
    }
  };

  const filtered = incidents.filter(i => {
    if (statusFilter !== 'all' && i.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Incident Intelligence Desk</h2>
          <p className="text-xs text-slate-500 mt-1">Review corroboration signals, manually verify, or dismiss false alarms</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex rounded-xl bg-slate-200/80 p-1 text-xs font-semibold text-slate-700">
            {['all', 'open', 'restored', 'dismissed'].map(s => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-lg capitalize transition ${
                  statusFilter === s ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <button
            onClick={fetchIncidents}
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {actionMessage && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
          <ShieldCheck className="w-4 h-4" />
          <span>{actionMessage}</span>
        </div>
      )}

      {/* Main Incidents Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-100">
              <tr>
                <th className="py-3 px-4">ID</th>
                <th className="py-3 px-4">Area / Location</th>
                <th className="py-3 px-4">Confidence Score</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Detected At</th>
                <th className="py-3 px-4">Duration</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filtered.map((item) => (
                <tr key={item.incident_id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                    #{item.incident_id}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-900">{item.area}</div>
                    <div className="text-[11px] text-slate-400">{item.district} ({item.zone})</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <ConfidenceBadge score={item.confidence_score} classification={item.classification} />
                  </td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="capitalize font-medium text-slate-600">{item.type}</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">
                    {new Date(item.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td className="py-3.5 px-4 font-mono">
                    {item.duration_minutes ? `${item.duration_minutes} min` : 'Ongoing'}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      <button
                        onClick={() => openDetails(item)}
                        className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
                        title="Inspect Signals & Reports"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      {item.status === 'open' && (
                        <>
                          <button
                            onClick={() => handleAction(item.incident_id, 'confirm')}
                            className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 transition"
                            title="Confirm (100% Score)"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleAction(item.incident_id, 'restore')}
                            className="px-2 py-1 text-[11px] font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-500 transition"
                          >
                            Restore
                          </button>
                          <button
                            onClick={() => handleAction(item.incident_id, 'dismiss')}
                            className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition"
                            title="Dismiss False Alarm"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Incident Deep Inspection Modal */}
      <Modal
        isOpen={Boolean(selectedIncident)}
        onClose={() => setSelectedIncident(null)}
        title={`Incident #${selectedIncident?.incident_id} Forensic Audit`}
      >
        {detailsLoading ? (
          <div className="flex items-center justify-center p-8">
            <RefreshCw className="w-6 h-6 animate-spin text-sky-600" />
          </div>
        ) : incidentDetails ? (
          <div className="space-y-5 text-xs">
            {/* Summary Header */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
              <div>
                <p className="font-bold text-sm text-slate-900">{incidentDetails.incident.area}</p>
                <p className="text-slate-500 mt-0.5">{incidentDetails.incident.district} • {incidentDetails.incident.zone}</p>
              </div>
              <ConfidenceBadge
                score={incidentDetails.incident.confidence_score}
                classification={incidentDetails.incident.classification}
              />
            </div>

            {/* Contributing User Reports */}
            <div>
              <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                <User className="w-4 h-4 text-sky-600" />
                <span>Contributing Consumer Signals ({incidentDetails.reports.length})</span>
              </h4>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {incidentDetails.reports.map((r) => (
                  <div key={r.report_id} className="p-2.5 rounded-lg border border-slate-200 bg-white flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-slate-900">{r.user_name}</p>
                      <p className="text-[11px] text-slate-500">Reported at: {new Date(r.reported_at).toLocaleTimeString()}</p>
                    </div>
                    <div className="text-right">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                        Reliability: {r.reliability_score}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions in Modal */}
            {incidentDetails.incident.status === 'open' && (
              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  onClick={() => handleAction(incidentDetails.incident.incident_id, 'dismiss')}
                  className="px-3 py-1.5 rounded-lg border border-rose-300 text-rose-700 hover:bg-rose-50 font-semibold"
                >
                  Dismiss False Alarm
                </button>
                <button
                  onClick={() => handleAction(incidentDetails.incident.incident_id, 'confirm')}
                  className="px-3 py-1.5 rounded-lg bg-sky-600 text-white hover:bg-sky-500 font-semibold"
                >
                  Confirm Incident (100%)
                </button>
                <button
                  onClick={() => handleAction(incidentDetails.incident.incident_id, 'restore')}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-500 font-semibold"
                >
                  Confirm Restored
                </button>
              </div>
            )}
          </div>
        ) : null}
      </Modal>
    </div>
  );
};
