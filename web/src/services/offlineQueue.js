/**
 * ⚡ PowerPulse Offline Outage Queue & Synchronization Service
 * -------------------------------------------------------------
 * When a citizen loses internet during an electrical blackout,
 * their browser caches reports in localStorage with a unique client UUID.
 *
 * Once connectivity is restored, reports are seamlessly synced
 * to the backend database (/api/reports/sync) without losing timestamps
 * or duplicating records.
 */

import { isAppOnline } from './connectivity';

const OFFLINE_QUEUE_KEY = 'powerpulse_offline_reports';
let isSyncing = false;

/**
 * Generates a RFC4122 compliant UUID or resilient fallback
 */
export const generateUUID = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return 'pp_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 9);
};

/**
 * Retrieve all queued reports from localStorage
 */
export const getOfflineReports = () => {
  try {
    const raw = localStorage.getItem(OFFLINE_QUEUE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('[OfflineQueue] Failed to read reports from localStorage:', err);
    return [];
  }
};

/**
 * Get the total count of pending offline reports
 */
export const getOfflineQueueCount = () => {
  return getOfflineReports().length;
};

/**
 * Save an outage signal ('OFF' or 'BACK') into the offline queue
 */
export const saveReportOffline = (report) => {
  try {
    const currentQueue = getOfflineReports();
    const newEntry = {
      type: report.type,
      location_id: report.location_id,
      client_uuid: report.client_uuid || generateUUID(),
      reported_at: report.reported_at || new Date().toISOString(),
      queued_at: new Date().toISOString()
    };

    const updatedQueue = [...currentQueue, newEntry];
    localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(updatedQueue));

    // Dispatch global event so UI components (banner, counter) can react immediately
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('powerpulse:queue-change', {
          detail: { count: updatedQueue.length, report: newEntry }
        })
      );
    }

    return newEntry;
  } catch (err) {
    console.error('[OfflineQueue] Failed to save report offline:', err);
    throw err;
  }
};

/**
 * Clear the offline queue from localStorage
 */
export const clearOfflineQueue = () => {
  try {
    localStorage.removeItem(OFFLINE_QUEUE_KEY);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('powerpulse:queue-change', { detail: { count: 0 } })
      );
    }
  } catch (err) {
    console.error('[OfflineQueue] Failed to clear offline queue:', err);
  }
};

/**
 * Synchronize all queued reports to the central backend API
 * @param {import('axios').AxiosInstance} api - Axios instance
 * @returns {Promise<{ success: boolean, syncedCount?: number, error?: any }>}
 */
export const syncOfflineReports = async (api) => {
  if (isSyncing) {
    return { success: false, reason: 'Sync already in progress' };
  }

  if (!isAppOnline()) {
    return { success: false, reason: 'Device is currently offline' };
  }

  const queue = getOfflineReports();
  if (queue.length === 0) {
    return { success: true, syncedCount: 0 };
  }

  try {
    isSyncing = true;
    console.log(`[OfflineQueue] Initiating sync for ${queue.length} pending report(s)...`);

    const res = await api.post('/reports/sync', { reports: queue });

    // Successfully synced to backend, clear the local queue
    clearOfflineQueue();

    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('powerpulse:queue-synced', {
          detail: {
            insertedCount: res.data.insertedCount,
            totalBatch: res.data.totalBatch,
            message: res.data.message
          }
        })
      );
    }

    return {
      success: true,
      syncedCount: res.data.insertedCount,
      totalBatch: res.data.totalBatch
    };
  } catch (err) {
    console.error('[OfflineQueue] Failed to sync reports to backend:', err);
    return {
      success: false,
      error: err.response?.data?.error || err.message || 'Sync failed'
    };
  } finally {
    isSyncing = false;
  }
};
