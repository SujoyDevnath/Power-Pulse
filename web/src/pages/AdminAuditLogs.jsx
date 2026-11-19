import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { ShieldAlert, RefreshCw, Clock } from 'lucide-react';

export const AdminAuditLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/audit-logs?limit=100');
      setLogs(res.data.logs || []);
    } catch (err) {
      console.error('Error fetching audit logs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Security & Operation Audit Logs</h2>
          <p className="text-xs text-slate-500 mt-1">Immutable audit trail of administrator, technician, and system events</p>
        </div>
        <button
          onClick={fetchLogs}
          className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-100">
              <tr>
                <th className="py-3 px-4">Log ID</th>
                <th className="py-3 px-4">Action Event</th>
                <th className="py-3 px-4">Triggered By</th>
                <th className="py-3 px-4">Event Details</th>
                <th className="py-3 px-4">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-mono">
              {logs.map((log) => (
                <tr key={log.log_id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    #{log.log_id}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-100 text-slate-800">
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-sans">
                    <div className="font-semibold text-slate-900">{log.user_name || 'System / Anonymous'}</div>
                    <div className="text-[10px] text-slate-400 capitalize">{log.user_role || 'System'}</div>
                  </td>
                  <td className="py-3.5 px-4 max-w-md font-sans text-slate-600 truncate" title={log.details}>
                    {log.details}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 font-sans">
                    {new Date(log.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
