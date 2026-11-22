import React from 'react';
import { Zap, ZapOff, WifiOff, CheckCircle2 } from 'lucide-react';
import { ConfidenceBadge } from '../../../components/ConfidenceBadge';

/**
 * ⚡ Feature: Outage Reporting & Status Card
 * ----------------------------------------------------
 * What this does:
 * 1. Shows the citizen if their neighborhood's power is ON (green) or OFF (red).
 * 2. Provides two big, easy-to-tap buttons to report "Power OFF" or "Power BACK".
 * 3. Shows the Confidence Score badge if an outage incident is actively confirmed.
 * 4. Displays real-time feedback (e.g. "We received your report!", "Duplicate report ignored").
 *
 * Analogy for beginners:
 * Think of this as the "Neighborhood Watch Alarm". When power goes out,
 * citizens tap the red button to alert the central control room.
 */
export const OutageReportingCard = ({
  activeOutage,
  reporting,
  reportResult,
  onReport,
  lastReportType
}) => {
  const isRedDisabled = reporting || lastReportType === 'OFF';
  const isGreenDisabled = reporting || lastReportType === 'BACK' || (!activeOutage && !lastReportType);

  return (
    <div className="space-y-4">
      {/* 1. Main Status Banner */}
      <div
        className={`rounded-2xl p-6 border shadow-sm transition ${
          activeOutage
            ? 'bg-red-50/70 border-red-200'
            : 'bg-emerald-50/70 border-emerald-200'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div
              className={`p-3 rounded-2xl ${
                activeOutage ? 'bg-red-500 text-white' : 'bg-emerald-500 text-white'
              }`}
            >
              {activeOutage ? (
                <ZapOff className="w-7 h-7" />
              ) : (
                <Zap className="w-7 h-7 fill-white" />
              )}
            </div>
            <div>
              <span
                className={`text-[11px] font-bold uppercase tracking-wider ${
                  activeOutage ? 'text-red-700' : 'text-emerald-700'
                }`}
              >
                Current Area Grid Status
              </span>
              <h2 className="text-xl font-bold text-slate-900 mt-0.5">
                {activeOutage
                  ? 'Electricity Outage Detected in Your Area'
                  : 'Power Grid Active & Online'}
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                {activeOutage
                  ? `Incident #${activeOutage.incident_id} detected with ${activeOutage.total_reports} corroborating reports.`
                  : 'No grid disruptions reported in your neighborhood.'}
              </p>
            </div>
          </div>

          {activeOutage && (
            <ConfidenceBadge
              score={activeOutage.confidence_score}
              classification={activeOutage.classification}
            />
          )}
        </div>

        {/* 2. Action Buttons: One-Click Toggle & Anti-Spam Protection */}
        <div className="mt-6 pt-5 border-t border-slate-200/80">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Red Button: Report OFF */}
            {lastReportType === 'OFF' ? (
              <button
                type="button"
                disabled
                className="py-4 px-6 rounded-2xl bg-rose-50 border-2 border-rose-200 text-rose-600 font-bold text-base flex items-center justify-center gap-2.5 cursor-not-allowed shadow-none transition"
                title="You have already reported power outage. Click 'Report Electricity BACK' when power returns."
              >
                <CheckCircle2 className="w-5 h-5 text-rose-500 shrink-0" />
                <span>Electricity OFF Reported ✓</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => onReport('OFF')}
                disabled={isRedDisabled}
                className="py-4 px-6 rounded-2xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-base shadow-lg shadow-red-500/20 flex items-center justify-center gap-3 transition transform active:scale-98 disabled:opacity-50 cursor-pointer"
              >
                <ZapOff className="w-6 h-6 shrink-0" />
                <span>Report Electricity OFF</span>
              </button>
            )}

            {/* Green Button: Report BACK */}
            {isGreenDisabled ? (
              <button
                type="button"
                disabled
                className="py-4 px-6 rounded-2xl bg-emerald-50/70 border-2 border-emerald-200/80 text-emerald-600 font-bold text-base flex items-center justify-center gap-2.5 cursor-not-allowed shadow-none transition"
                title={lastReportType === 'BACK' ? "You have already confirmed power restored." : "Power grid is currently normal."}
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>{lastReportType === 'BACK' ? 'Power Restored ✓' : 'Grid Online & Normal ✓'}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => onReport('BACK')}
                disabled={reporting}
                className="py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-base shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-3 transition transform active:scale-98 disabled:opacity-50 cursor-pointer ring-2 ring-emerald-400/30"
              >
                <Zap className="w-6 h-6 fill-white shrink-0" />
                <span>Report Electricity BACK</span>
              </button>
            )}
          </div>

          {/* User Guidance Micro-text */}
          <div className="mt-3 flex items-center justify-between text-[11px] px-1">
            {lastReportType === 'OFF' ? (
              <span className="text-rose-600 font-medium flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                Your outage signal is registered. When power returns to your building, click &quot;Report Electricity BACK&quot;.
              </span>
            ) : lastReportType === 'BACK' ? (
              <span className="text-emerald-700 font-medium flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                Your power line is marked normal. Click &quot;Report Electricity OFF&quot; if your power goes out.
              </span>
            ) : (
              <span className="text-slate-500 font-medium">
                Click &quot;Report Electricity OFF&quot; if you experience a blackout in your area.
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 3. Feedback Banner after submitting a report */}
      {reportResult && (
        <div
          className={`p-4 rounded-2xl border text-xs animate-fadeIn ${
            reportResult.isSynced
              ? 'bg-emerald-50/90 border-emerald-300 text-emerald-900 shadow-sm'
              : reportResult.isOffline
              ? 'bg-amber-50/90 border-amber-300 text-amber-900 shadow-sm'
              : reportResult.isSpam
              ? 'bg-rose-50 border-rose-300 text-rose-800'
              : reportResult.isDuplicate
              ? 'bg-amber-50 border-amber-300 text-amber-800'
              : 'bg-sky-50 border-sky-300 text-sky-800'
          }`}
        >
          {reportResult.isSynced ? (
            <div className="flex items-start gap-3">
              <div className="p-2 bg-emerald-100 rounded-xl text-emerald-700 shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-bold text-sm text-emerald-950">
                    Offline Signal Synchronized with Grid
                  </p>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-200 text-emerald-900 uppercase">
                    Synced Live
                  </span>
                </div>
                <p className="mt-1 text-emerald-800 leading-relaxed">
                  {reportResult.message}
                </p>
                <div className="mt-2 pt-2 border-t border-emerald-200/80 flex flex-wrap items-center gap-4 text-[11px] text-emerald-800 font-medium">
                  <span>⚡ Signal: Power <strong>{reportResult.type}</strong></span>
                  <span>🕒 Synced: {reportResult.syncedAt || 'Just now'}</span>
                </div>
              </div>
            </div>
          ) : reportResult.isOffline ? (
            <div className="flex items-start gap-3">
              <div className="p-2 bg-amber-200/60 rounded-xl text-amber-800 shrink-0">
                <WifiOff className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-bold text-sm text-amber-950">
                    Offline Signal Saved in Browser Queue
                  </p>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-200 text-amber-900 uppercase">
                    Queued Offline
                  </span>
                </div>
                <p className="mt-1 text-amber-900 leading-relaxed">
                  {reportResult.message}
                </p>
                <div className="mt-2 pt-2 border-t border-amber-200/80 flex flex-wrap items-center gap-4 text-[11px] text-amber-800 font-medium">
                  <span>⚡ Signal: Power <strong>{reportResult.type}</strong></span>
                  <span>🕒 Logged: {reportResult.queuedAt || 'Just now'}</span>
                  <span>🔄 Auto-sync will run automatically when reconnected</span>
                </div>
              </div>
            </div>
          ) : (
            <>
              <p className="font-bold text-sm">Signal Processed: {reportResult.message}</p>
              {reportResult.isDuplicate && (
                <p className="mt-1">Duplicate note: You previously reported within 10 minutes.</p>
              )}
              {reportResult.isSpam && (
                <p className="mt-1">Spam note: Too many rapid reports; reliability penalized.</p>
              )}
              {/* Feedback for 'OFF' reports */}
              {reportResult.type === 'OFF' && reportResult.evaluation && (
                <p className="mt-1 font-semibold">
                  Updated Area Confidence: {reportResult.evaluation.score ?? 0}% (
                  {(reportResult.evaluation.classification || 'Evaluating').toUpperCase()})
                </p>
              )}

              {/* Feedback for 'BACK' reports (Power Restored) */}
              {reportResult.type === 'BACK' && reportResult.evaluation && (
                <p className="mt-1 font-semibold text-emerald-900">
                  {reportResult.evaluation.status === 'restored'
                    ? `⚡ Power Restoration Confirmed! Grid incident resolved (Duration: ${reportResult.evaluation.durationMinutes || 0} mins).`
                    : reportResult.evaluation.message || 'Restoration signal logged. Awaiting corroboration from neighboring consumers.'}
                </p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};
