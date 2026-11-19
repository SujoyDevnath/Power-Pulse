import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { CalendarClock, Plus, Trash2, RefreshCw, AlertCircle, CheckCircle2 } from 'lucide-react';

export const AdminPlanned = () => {
  const [plannedList, setPlannedList] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  // Form State
  const [locationId, setLocationId] = useState('');
  const [outageDate, setOutageDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [reason, setReason] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      const [plannedRes, locRes] = await Promise.all([
        api.get('/planned'),
        api.get('/locations')
      ]);
      setPlannedList(plannedRes.data.planned || []);
      setLocations(locRes.data.locations || []);
      if (locRes.data.locations?.length > 0 && !locationId) {
        setLocationId(locRes.data.locations[0].location_id);
      }
    } catch (err) {
      console.error('Error fetching planned outages:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!locationId || !outageDate || !startTime || !endTime) {
      alert('Please fill out all required schedule fields');
      return;
    }

    try {
      setSubmitting(true);
      await api.post('/planned', {
        location_id: locationId,
        outage_date: outageDate,
        start_time: startTime,
        end_time: endTime,
        reason: reason || 'Scheduled substation feeder maintenance'
      });

      setMessage('Planned load-shedding published successfully.');
      setReason('');
      fetchData();
      setTimeout(() => setMessage(''), 4000);
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to publish planned outage');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this scheduled outage?')) return;
    try {
      await api.delete(`/planned/${id}`);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to delete schedule');
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Planned Load-Shedding Scheduler</h2>
        <p className="text-xs text-slate-500 mt-1">
          Announce scheduled maintenance in advance to prevent false emergency alarm triggering
        </p>
      </div>

      {message && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{message}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Form */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Plus className="w-4 h-4 text-sky-600" />
            <span>Schedule New Load-Shedding</span>
          </h3>

          <form onSubmit={handleCreate} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Affected Municipal Area *
              </label>
              <select
                value={locationId}
                onChange={(e) => setLocationId(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium"
              >
                {locations.map((loc) => (
                  <option key={loc.location_id} value={loc.location_id}>
                    {loc.area} ({loc.district} • {loc.zone})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Scheduled Date *
              </label>
              <input
                type="date"
                required
                value={outageDate}
                onChange={(e) => setOutageDate(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Start Time *
                </label>
                <input
                  type="time"
                  required
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  End Time *
                </label>
                <input
                  type="time"
                  required
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Maintenance Reason / Details
              </label>
              <textarea
                rows={3}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="e.g. Substation 33kV transformer maintenance and overhead cable trimming."
                className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold shadow-sm transition disabled:opacity-50"
            >
              {submitting ? 'Publishing...' : 'Publish Scheduled Outage'}
            </button>
          </form>
        </div>

        {/* Right Column: Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Upcoming Published Schedules</h3>
            <span className="text-xs text-slate-400">{plannedList.length} scheduled</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-100">
                <tr>
                  <th className="py-3 px-4">Area</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Window Time</th>
                  <th className="py-3 px-4">Reason</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {plannedList.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-400">
                      No upcoming planned load-shedding schedules found.
                    </td>
                  </tr>
                ) : (
                  plannedList.map((p) => (
                    <tr key={p.planned_id} className="hover:bg-slate-50/80 transition">
                      <td className="py-3.5 px-4 font-semibold text-slate-900">
                        {p.area}
                        <span className="block text-[11px] font-normal text-slate-400">{p.district}</span>
                      </td>
                      <td className="py-3.5 px-4 font-medium">
                        {p.outage_date}
                      </td>
                      <td className="py-3.5 px-4 font-mono font-medium text-sky-700">
                        {p.start_time} - {p.end_time}
                      </td>
                      <td className="py-3.5 px-4 max-w-xs text-slate-600 truncate" title={p.reason}>
                        {p.reason}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => handleDelete(p.planned_id)}
                          className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition"
                          title="Cancel schedule"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
