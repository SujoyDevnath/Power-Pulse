import axios from 'axios';
import { Capacitor } from '@capacitor/core';

export const LIVE_CLOUD_API = 'https://powerpulse-api-j8oc.onrender.com/api';

// Candidate IP addresses for local network connectivity
// 192.168.137.1 = Windows Mobile Hotspot default IP (stays fixed anywhere!)
// 192.168.0.181 = Home Wi-Fi Router IP
// 10.0.2.2      = Android Studio Emulator virtual IP
const CANDIDATE_HOSTS = [
  '192.168.137.1',
  '192.168.0.181',
  '10.0.2.2'
];

const getInitialBaseUrl = () => {
  if (Capacitor.isNativePlatform()) {
    const customHost = localStorage.getItem('powerpulse_server_ip');
    if (customHost) {
      if (customHost === 'cloud' || customHost.includes('onrender.com')) {
        return LIVE_CLOUD_API;
      }
      return customHost.startsWith('http') ? customHost : `http://${customHost}:5000/api`;
    }
    const cachedHost = localStorage.getItem('powerpulse_working_host');
    if (cachedHost) {
      return cachedHost.startsWith('http') ? cachedHost : `http://${cachedHost}:5000/api`;
    }
    // Default to Live Cloud API so mobile works everywhere without laptop!
    return LIVE_CLOUD_API;
  }
  return (
    import.meta.env.VITE_API_URL ||
    (import.meta.env.PROD
      ? LIVE_CLOUD_API
      : 'http://localhost:5000/api')
  );
};

const API_BASE_URL = getInitialBaseUrl();

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 12000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Auto-detect reachable local host on native mobile launch
// If local server is running on laptop hotspot or home Wi-Fi, lock onto it
// Otherwise, keep the Live Cloud API active!
if (Capacitor.isNativePlatform() && !localStorage.getItem('powerpulse_server_ip')) {
  (async () => {
    let foundLocal = false;
    for (const host of CANDIDATE_HOSTS) {
      try {
        const controller = new AbortController();
        const tid = setTimeout(() => controller.abort(), 1000);
        const res = await fetch(`http://${host}:5000/api/health`, { 
          signal: controller.signal,
          cache: 'no-store'
        });
        clearTimeout(tid);
        if (res.ok) {
          api.defaults.baseURL = `http://${host}:5000/api`;
          localStorage.setItem('powerpulse_working_host', host);
          foundLocal = true;
          break;
        }
      } catch (e) {
        // Continue probing next host
      }
    }
    // If no local host responded, ensure live cloud API is locked
    if (!foundLocal) {
      api.defaults.baseURL = LIVE_CLOUD_API;
      localStorage.setItem('powerpulse_working_host', LIVE_CLOUD_API);
    }
  })();
}

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// 1. Interceptor to inject JWT Bearer Access Token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('powerpulse_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// 2. Interceptor for self-healing network fallback & token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Self-healing: If network failed on native mobile, auto-switch to another working candidate host or Live Cloud
    if (
      Capacitor.isNativePlatform() && 
      (!error.response || error.code === 'ERR_NETWORK') && 
      !originalRequest._networkRetry &&
      !localStorage.getItem('powerpulse_server_ip')
    ) {
      originalRequest._networkRetry = true;
      for (const host of CANDIDATE_HOSTS) {
        if (!api.defaults.baseURL.includes(host)) {
          try {
            const controller = new AbortController();
            const tid = setTimeout(() => controller.abort(), 1000);
            const check = await fetch(`http://${host}:5000/api/health`, { 
              signal: controller.signal,
              cache: 'no-store' 
            });
            clearTimeout(tid);
            if (check.ok) {
              const newBase = `http://${host}:5000/api`;
              api.defaults.baseURL = newBase;
              localStorage.setItem('powerpulse_working_host', host);
              originalRequest.baseURL = newBase;
              return api(originalRequest);
            }
          } catch (e) {
            // Next
          }
        }
      }

      // If all local candidate hosts failed, fall back to Live Cloud API!
      if (!api.defaults.baseURL.includes('onrender.com')) {
        api.defaults.baseURL = LIVE_CLOUD_API;
        localStorage.setItem('powerpulse_working_host', LIVE_CLOUD_API);
        originalRequest.baseURL = LIVE_CLOUD_API;
        return api(originalRequest);
      }
    }

    // Token Refresh logic for 401 Unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (originalRequest.url.includes('/auth/login') || originalRequest.url.includes('/auth/refresh')) {
        return Promise.reject(error);
      }

      const refreshToken = localStorage.getItem('powerpulse_refresh_token');
      if (!refreshToken) {
        localStorage.removeItem('powerpulse_token');
        localStorage.removeItem('powerpulse_user');
        window.location.href = '/login';
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await axios.post(`${api.defaults.baseURL}/auth/refresh`, {
          refreshToken
        });

        const { accessToken } = response.data;
        localStorage.setItem('powerpulse_token', accessToken);
        api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

        processQueue(null, accessToken);
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        localStorage.removeItem('powerpulse_token');
        localStorage.removeItem('powerpulse_refresh_token');
        localStorage.removeItem('powerpulse_user');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
