import { Capacitor } from '@capacitor/core';
import { Network } from '@capacitor/network';

/**
 * 🌐 PowerPulse Real-Time Connectivity Detector
 * -----------------------------------------------------------------
 * Detects real-world network connectivity on Mobile (Capacitor Network)
 * and Web (navigator.onLine + probe).
 */

let isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;
let checkInProgress = false;
const listeners = new Set();

const notifyListeners = () => {
  listeners.forEach((callback) => {
    try {
      callback({
        online: isOnline,
        rawNavigatorOnline: typeof navigator !== 'undefined' ? navigator.onLine : true
      });
    } catch (e) {
      console.error('[Connectivity] Error in listener callback:', e);
    }
  });
};

/**
 * Actively verify internet reachability via Native Network status or probe
 */
export const checkRealInternet = async () => {
  // If running as native mobile app, trust Capacitor Network plugin
  if (Capacitor.isNativePlatform()) {
    try {
      const status = await Network.getStatus();
      const connected = Boolean(status.connected);
      if (isOnline !== connected) {
        isOnline = connected;
        notifyListeners();
      }
      return connected;
    } catch (err) {
      // Fallback to true if native status check fails
      if (!isOnline) {
        isOnline = true;
        notifyListeners();
      }
      return true;
    }
  }

  // 1. If browser natively reports offline
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    if (isOnline !== false) {
      isOnline = false;
      notifyListeners();
    }
    return false;
  }

  if (checkInProgress) return isOnline;
  checkInProgress = true;

  let hasInternet = false;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);

    // Lightweight probe to Google 204
    await fetch(`https://connectivitycheck.gstatic.com/generate_204?_t=${Date.now()}`, {
      mode: 'no-cors',
      cache: 'no-store',
      signal: controller.signal
    });

    clearTimeout(timeoutId);
    hasInternet = true;
  } catch (err) {
    // If external probe fails, assume online if navigator.onLine is true
    hasInternet = typeof navigator !== 'undefined' ? navigator.onLine : true;
  } finally {
    checkInProgress = false;
  }

  if (isOnline !== hasInternet) {
    isOnline = hasInternet;
    notifyListeners();
  }

  return hasInternet;
};

/**
 * Returns current cached online status
 */
export const isAppOnline = () => {
  return isOnline;
};

/**
 * Subscribe to connectivity status updates
 */
export const subscribeConnectivity = (callback) => {
  listeners.add(callback);
  callback({
    online: isOnline,
    rawNavigatorOnline: typeof navigator !== 'undefined' ? navigator.onLine : true
  });

  return () => {
    listeners.delete(callback);
  };
};

// Initialize background lifecycle listeners for automatic detection
if (typeof window !== 'undefined') {
  // 1. Native Capacitor network listener
  if (Capacitor.isNativePlatform()) {
    Network.addListener('networkStatusChange', (status) => {
      isOnline = Boolean(status.connected);
      notifyListeners();
    });
  }

  // 2. Initial check
  checkRealInternet();

  // 3. Browser native events
  window.addEventListener('online', () => {
    isOnline = true;
    notifyListeners();
    checkRealInternet();
  });

  window.addEventListener('offline', () => {
    isOnline = false;
    notifyListeners();
  });

  window.addEventListener('focus', () => {
    checkRealInternet();
  });

  if (typeof document !== 'undefined') {
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        checkRealInternet();
      }
    });
  }

  // 4. Periodic heartbeat (every 5 seconds)
  setInterval(() => {
    checkRealInternet();
  }, 5000);
}
