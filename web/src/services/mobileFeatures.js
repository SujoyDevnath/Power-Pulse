import { Geolocation } from '@capacitor/geolocation';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Network } from '@capacitor/network';
import { Capacitor } from '@capacitor/core';

/**
 * 📍 Auto-GPS Detection
 * Gets user's exact current latitude and longitude
 */
export const getAutoGpsLocation = async () => {
  try {
    if (Capacitor.isNativePlatform()) {
      const perm = await Geolocation.requestPermissions();
      if (perm.location === 'granted' || perm.coarseLocation === 'granted') {
        const pos = await Geolocation.getCurrentPosition({ enableHighAccuracy: true, timeout: 6000 });
        return {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          source: 'Native GPS'
        };
      }
    }
  } catch (err) {
    console.warn('[GPS] Native geolocation error:', err.message);
  }

  // Fallback to Web Geolocation
  if (typeof navigator !== 'undefined' && navigator.geolocation) {
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          resolve({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
            source: 'Browser GPS'
          });
        },
        () => {
          resolve(null);
        },
        { timeout: 4000 }
      );
    });
  }

  return null;
};

/**
 * 🔔 Native Mobile Push / Local Notification Alert
 */
export const triggerAppNotification = async (title, body) => {
  try {
    if (Capacitor.isNativePlatform()) {
      const perm = await LocalNotifications.requestPermissions();
      if (perm.display === 'granted') {
        await LocalNotifications.schedule({
          notifications: [
            {
              title,
              body,
              id: Math.floor(Math.random() * 100000),
              schedule: { at: new Date(Date.now() + 200) }
            }
          ]
        });
        return;
      }
    }
  } catch (e) {
    console.warn('[Notification] Local notification error:', e.message);
  }

  // Web Notification fallback
  if (typeof window !== 'undefined' && 'Notification' in window) {
    try {
      if (Notification.permission === 'granted') {
        new Notification(title, { body });
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then((p) => {
          if (p === 'granted') new Notification(title, { body });
        });
      }
    } catch (_) {}
  }
};

/**
 * 🗺️ Google Maps Navigation Trigger (Opens Android Google Maps App)
 */
export const openGoogleMapsNavigation = (area, district, lat, lng) => {
  let url = '';
  if (lat && lng) {
    // Open exact GPS point
    url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  } else {
    // Open by Area/District text query
    const query = encodeURIComponent(`${area || 'Mirpur'}, ${district || 'Dhaka'}, Bangladesh`);
    url = `https://www.google.com/maps/dir/?api=1&destination=${query}`;
  }

  if (typeof window !== 'undefined') {
    window.open(url, '_system');
  }
};
