import React from 'react';
import { MessageSquarePlus } from 'lucide-react';

/**
 * 📝 Feature: Electrical Complaint Filing Card
 * ----------------------------------------------------
 * What this does:
 * Allows a citizen to report specific neighborhood electrical hazards:
 * - Low voltage
 * - Transformer sparks/smoke
 * - Damaged or hanging live cables
 * - Broken electric poles
 *
 * Analogy for beginners:
 * Think of this as the "Doctor's Appointment Form" for the electrical grid.
 * Citizens describe what hurts (sparks, loose wire), and the system sends a technician!
 */
export const ComplaintFilingCard = ({
  category,
  onCategoryChange,
  description,
  onDescriptionChange,
  submitting,
  successMessage,
  onSubmit
}) => {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
      <div>
        <h3 className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-2">
          <MessageSquarePlus className="w-4 h-4 text-sky-600" />
          <span>Submit Electrical Complaint</span>
        </h3>
        <p className="text-xs text-slate-500 mb-4">
          File low voltage, transformer sparks, or damaged wiring issues
        </p>

        {successMessage && (
          <div className="mb-4 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs">
            {successMessage}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Issue Category *
            </label>
            <select
              value={category}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium"
            >
              <option value="power_outage">Power Outage</option>
              <option value="low_voltage">Low Voltage</option>
              <option value="transformer">Transformer Sparks / Smoke</option>
              <option value="damaged_wire">Damaged / Hanging Cable</option>
              <option value="pole">Electric Pole Damaged</option>
              <option value="other">Other Concern</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Description / Landmark *
            </label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => onDescriptionChange(e.target.value)}
              placeholder="e.g. Near House 12, Road 4. The pole transformer is emitting sparks."
              className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold shadow-sm transition disabled:opacity-50"
          >
            {submitting ? 'Submitting...' : 'File Ticket'}
          </button>
        </form>
      </div>
    </div>
  );
};
