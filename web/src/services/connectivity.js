/**
 * 🌐 PowerPulse Real-Time Connectivity Detector
 * -----------------------------------------------------------------
 * Detects real-world network connectivity (Wi-Fi on/off, Ethernet)
 * via Google's global connectivitycheck.gstatic.com probe and native events.
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
 * Actively verify internet reachability via Google's 204 connectivity check
 */
export const checkRealInternet = async () => {
  // 1. If browser natively reports offline (DevTools "Offline" or Airplane mode)
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
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    // Global lightweight probe to Google 204
    await fetch(`https://connectivitycheck.gstatic.com/generate_204?_t=${Date.now()}`, {
      mode: 'no-cors',
      cache: 'no-store',
      signal: controller.signal
    });

    clearTimeout(timeoutId);
    hasInternet = true;
  } catch (err) {
    // Physical Wi-Fi disconnected or no internet route
    hasInternet = false;
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
  // 1. Initial check
  checkRealInternet();

  // 2. Browser native events
  window.addEventListener('online', () => {
    isOnline = true;
    notifyListeners();
    checkRealInternet();
  });

  window.addEventListener('offline', () => {
    isOnline = false;
    notifyListeners();
  });

  // 3. User switches back to browser tab after turning off/on Wi-Fi in Windows
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

  // 4. Ultra-responsive periodic heartbeat (every 2.5 seconds)
  setInterval(() => {
    checkRealInternet();
  }, 2500);
}
