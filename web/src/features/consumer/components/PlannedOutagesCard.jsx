import React from 'react';
import { Clock } from 'lucide-react';

/**
 * 📅 Feature: Scheduled Load-Shedding & Maintenance Card
 * ----------------------------------------------------
 * What this does:
 * Shows citizens upcoming power maintenance or planned load-shedding
 * announced in advance by the city utility company (e.g. DPDC / DESCO).
 *
 * Analogy for beginners:
 * Think of this as the "School Calendar". It tells you ahead of time when
 * the power will take a planned nap so engineers can fix the wires!
 */
export const PlannedOutagesCard = ({ plannedOutages = [] }) => {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col">
      <h3 className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-2">
        <Clock className="w-4 h-4 text-amber-600" />
        <span>Upcoming Scheduled Load-Shedding</span>
      </h3>
      <p className="text-xs text-slate-500 mb-4">
        Official maintenance windows announced by utility administration
      </p>

      <div className="flex-1 space-y-3 overflow-y-auto max-h-64">
        {plannedOutages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-xs text-slate-400 italic py-8">
            No upcoming maintenance scheduled for your zone.
          </div>
        ) : (
          plannedOutages.map((p) => (
            <div
              key={p.planned_id}
              className="p-3 rounded-xl border border-slate-100 bg-slate-50 text-xs"
            >
              <div className="flex items-center justify-between font-bold text-slate-900">
                <span>{p.outage_date}</span>
                <span className="text-sky-700 font-mono">
                  {p.start_time} - {p.end_time}
                </span>
              </div>
              <p className="text-slate-600 mt-1">{p.reason}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
