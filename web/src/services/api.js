import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

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

// 2. Interceptor for 401 Unauthorized with Silent Auto-Refresh Queue
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Do not attempt refresh on non-401 or auth endpoints (login, refresh)
    if (
      !error.response ||
      error.response.status !== 401 ||
      originalRequest.url?.includes('/auth/login') ||
      originalRequest.url?.includes('/auth/refresh')
    ) {
      return Promise.reject(error);
    }

    if (originalRequest._retry) {
      // Already tried refresh once and still failed
      localStorage.removeItem('powerpulse_token');
      localStorage.removeItem('powerpulse_refresh_token');
      localStorage.removeItem('powerpulse_user');
      if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }

    const refreshToken = localStorage.getItem('powerpulse_refresh_token');
    if (!refreshToken) {
      localStorage.removeItem('powerpulse_token');
      localStorage.removeItem('powerpulse_user');
      if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }

    if (isRefreshing) {
      // If a refresh is already in-flight, queue this request
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      // Use clean standalone axios instance to prevent interceptor recursion
      const res = await axios.post(`${baseURL}/auth/refresh`, { refreshToken });
      const newAccessToken = res.data.accessToken || res.data.token;
      const newRefreshToken = res.data.refreshToken;

      localStorage.setItem('powerpulse_token', newAccessToken);
      if (newRefreshToken) {
        localStorage.setItem('powerpulse_refresh_token', newRefreshToken);
      }

      api.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      processQueue(null, newAccessToken);
      return api(originalRequest);
    } catch (refreshErr) {
      processQueue(refreshErr, null);
      localStorage.removeItem('powerpulse_token');
      localStorage.removeItem('powerpulse_refresh_token');
      localStorage.removeItem('powerpulse_user');
      if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
      return Promise.reject(refreshErr);
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;
