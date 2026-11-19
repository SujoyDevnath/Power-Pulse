import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { ConfidenceBadge } from '../components/ConfidenceBadge';
import { StatusBadge } from '../components/StatusBadge';
import { AlertOctagon, RefreshCw, CheckCircle2, Clock, MapPin, Users } from 'lucide-react';

export const ConsumerActiveOutages = () => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchActive = async () => {
    try {
      setLoading(true);
      const res = await api.get('/incidents/active');
      setIncidents(res.data.incidents || []);
    } catch (err) {
      console.error('Error fetching active outages:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActive();
  }, []);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Active Outages Nearby</h2>
          <p className="text-xs text-slate-500 mt-0.5">Real-time municipal map of corroborated power failures across Dhaka</p>
        </div>
        <button
          onClick={fetchActive}
          className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {incidents.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm">
          <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
          <h3 className="font-bold text-slate-900 text-base">All Municipal Zones Online</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            There are currently no active community-wide electricity outages detected across Dhaka.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {incidents.map((incident) => (
            <div
              key={incident.incident_id}
              className="bg-white rounded-2xl p-5 border border-red-200/80 shadow-sm space-y-4 hover:border-red-300 transition"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-rose-50 text-rose-600 rounded-xl">
                    <AlertOctagon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{incident.area}</h3>
                    <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>{incident.district} • {incident.zone}</span>
                    </p>
                  </div>
                </div>
                <StatusBadge status={incident.type} />
              </div>

              <div className="pt-2">
                <ConfidenceBadge
                  score={incident.confidence_score}
                  classification={incident.classification}
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                <span className="flex items-center gap-1.5 font-medium">
                  <Users className="w-4 h-4 text-sky-600" />
                  <span>{incident.total_reports} reports ({incident.reporting_users} users)</span>
                </span>
                <span className="flex items-center gap-1.5 font-mono text-[11px] text-slate-500">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Started: {new Date(incident.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
