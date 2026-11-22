import React, { useState, useEffect, useRef } from 'react';
import { Wifi, WifiOff, RefreshCw, CheckCircle2, X } from 'lucide-react';
import { 
  getOfflineQueueCount, 
  syncOfflineReports 
} from '../services/offlineQueue';
import {
  subscribeConnectivity,
  checkRealInternet
} from '../services/connectivity';
import api from '../services/api';

/**
 * ⚡ OfflineBanner Component
 * -------------------------------------------------------------
 * Displays real-time network connectivity status and offline queue telemetry.
 * Automatically synchronizes cached citizen reports when returning online.
 * Displays an active sync Toast during synchronization and confirms completion.
 */
export const OfflineBanner = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [queueCount, setQueueCount] = useState(0);
  const [syncing, setSyncing] = useState(false);
  const [recentSyncMessage, setRecentSyncMessage] = useState(null);
  const prevOnlineRef = useRef(true);

  useEffect(() => {
    // 1. Initial queue count
    setQueueCount(getOfflineQueueCount());

    // 2. Subscribe to automatic real-time connectivity service
    const unsubscribe = subscribeConnectivity(async (status) => {
      setIsOnline(status.online);

      // Auto-sync whenever online and there are pending items in the queue
      const pending = getOfflineQueueCount();
      if (status.online && pending > 0) {
        setSyncing(true);
        const res = await syncOfflineReports(api);
        setSyncing(false);
        if (res.success) {
          const count = res.totalBatch || res.syncedCount || pending;
          if (count > 0) {
            setRecentSyncMessage(`Auto-synced ${count} cached outage report(s) with central grid.`);
            setTimeout(() => setRecentSyncMessage(null), 5000);
          }
        }
      }
      prevOnlineRef.current = status.online;
    });

    // 3. Custom event listeners for queue updates
    const handleQueueChange = (e) => {
      setQueueCount(e.detail?.count ?? getOfflineQueueCount());
    };

    const handleQueueSynced = (e) => {
      setQueueCount(0);
      const c = e.detail?.totalBatch || e.detail?.insertedCount || 0;
      if (c > 0) {
        setRecentSyncMessage(`Auto-synced ${c} cached outage report(s) with central grid.`);
        setTimeout(() => setRecentSyncMessage(null), 5000);
      }
    };

    window.addEventListener('powerpulse:queue-change', handleQueueChange);
    window.addEventListener('powerpulse:queue-synced', handleQueueSynced);

    return () => {
      unsubscribe();
      window.removeEventListener('powerpulse:queue-change', handleQueueChange);
      window.removeEventListener('powerpulse:queue-synced', handleQueueSynced);
    };
  }, []);

  const handleManualSync = async () => {
    if (!isOnline) {
      alert('Cannot sync while offline. Please verify internet connection.');
      return;
    }
    setSyncing(true);
    const res = await syncOfflineReports(api);
    setSyncing(false);
    if (res.success) {
      setRecentSyncMessage(`Successfully synced ${res.totalBatch || res.syncedCount} queued report(s).`);
      setTimeout(() => setRecentSyncMessage(null), 5000);
    } else {
      alert(res.error || 'Failed to sync offline queue.');
    }
  };

  return (
    <>
      {/* 1. Offline Banner: Sticky warning across top of page when offline */}
      {!isOnline && (
        <aside aria-label="Connectivity status" className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-4 py-2.5 shadow-md sticky top-0 z-50 transition-all">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 bg-black/20 rounded-lg">
                <WifiOff className="w-4 h-4 text-amber-200 animate-pulse" />
              </div>
              <div>
                <p className="font-bold tracking-tight">Offline Mode Active</p>
                <p className="text-[11px] text-amber-100">
                  Internet connection lost. Outage signals will be stored in your browser queue and automatically synced once connection returns.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <span className="px-2.5 py-1 bg-black/25 rounded-full font-mono text-[11px] font-bold text-amber-100 border border-amber-300/30">
                {queueCount} {queueCount === 1 ? 'report' : 'reports'} queued
              </span>
            </div>
          </div>
        </aside>
      )}

      {/* 2. Fallback Banner: Online with pending queue if automatic sync did not fire immediately */}
      {isOnline && queueCount > 0 && !syncing && (
        <aside aria-label="Connectivity status" className="bg-sky-600 text-white px-4 py-2 text-xs shadow-md flex items-center justify-between transition-all">
          <div className="max-w-4xl mx-auto w-full flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Wifi className="w-4 h-4 text-sky-200" />
              <span>
                Connected to network. You have <strong>{queueCount}</strong> unsynced offline report{queueCount > 1 ? 's' : ''}.
              </span>
            </div>
            <button
              onClick={handleManualSync}
              disabled={syncing}
              className="flex items-center gap-1.5 px-3 py-1 bg-white text-sky-700 hover:bg-sky-50 font-bold rounded-lg transition disabled:opacity-50 text-[11px]"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${syncing ? 'animate-spin' : ''}`} />
              <span>Sync Now</span>
            </button>
          </div>
        </aside>
      )}

      {/* 3. Floating Toast: Shows while actively syncing with the backend */}
      {syncing && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3.5 px-5 py-3.5 bg-slate-900/95 text-white rounded-2xl shadow-2xl border border-slate-700 animate-slideUp backdrop-blur-md">
          <div className="p-2 bg-sky-500/20 text-sky-400 rounded-xl">
            <RefreshCw className="w-5 h-5 animate-spin" />
          </div>
          <div>
            <p className="text-xs font-bold text-white tracking-tight">Reconnected to Grid</p>
            <p className="text-[11px] text-slate-300">Synchronizing cached outage reports with server...</p>
          </div>
        </div>
      )}

      {/* 4. Floating Toast: Confirms successful synchronization */}
      {recentSyncMessage && !syncing && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3.5 px-5 py-3.5 bg-slate-900/95 text-white rounded-2xl shadow-2xl border border-emerald-600/60 animate-slideUp backdrop-blur-md">
          <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="pr-2">
            <p className="text-xs font-bold text-white tracking-tight">Synchronization Complete</p>
            <p className="text-[11px] text-slate-300">{recentSyncMessage}</p>
          </div>
          <button
            onClick={() => setRecentSyncMessage(null)}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition"
            title="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </>
  );
};
