import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

  useEffect(() => {
    const savedToken = localStorage.getItem('powerpulse_token');
    const savedRefreshToken = localStorage.getItem('powerpulse_refresh_token');
    const savedUser = localStorage.getItem('powerpulse_user');
    const savedLoginTime = localStorage.getItem('powerpulse_login_time');

    // Check if session has exceeded 7 days; if so, reset cleanly
    if (savedLoginTime && (Date.now() - Number(savedLoginTime) > SEVEN_DAYS_MS)) {
      console.log('[Auth] 7-day session expired. Resetting session.');
      localStorage.removeItem('powerpulse_token');
      localStorage.removeItem('powerpulse_refresh_token');
      localStorage.removeItem('powerpulse_user');
      localStorage.removeItem('powerpulse_login_time');
      setLoading(false);
      return;
    }

    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setRefreshToken(savedRefreshToken);
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('powerpulse_token');
        localStorage.removeItem('powerpulse_refresh_token');
        localStorage.removeItem('powerpulse_user');
        localStorage.removeItem('powerpulse_login_time');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    const { 
      accessToken, 
      refreshToken: receivedRefreshToken, 
      token: receivedLegacyToken, 
      user: receivedUser 
    } = response.data;

    const finalAccessToken = accessToken || receivedLegacyToken;

    setToken(finalAccessToken);
    setRefreshToken(receivedRefreshToken);
    setUser(receivedUser);

    localStorage.setItem('powerpulse_token', finalAccessToken);
    if (receivedRefreshToken) {
      localStorage.setItem('powerpulse_refresh_token', receivedRefreshToken);
    }
    localStorage.setItem('powerpulse_user', JSON.stringify(receivedUser));
    localStorage.setItem('powerpulse_login_time', Date.now().toString());

    return receivedUser;
  };

  const logout = async () => {
    try {
      const savedRefreshToken = localStorage.getItem('powerpulse_refresh_token');
      // Notify backend to blacklist access token and delete refresh token
      await api.post('/auth/logout', { refreshToken: savedRefreshToken });
    } catch (e) {
      console.warn('[Auth] Remote logout notification failed:', e.message);
    } finally {
      setToken(null);
      setRefreshToken(null);
      setUser(null);
      localStorage.removeItem('powerpulse_token');
      localStorage.removeItem('powerpulse_refresh_token');
      localStorage.removeItem('powerpulse_user');
      localStorage.removeItem('powerpulse_login_time');
    }
  };

  const updateUser = (updatedFields) => {
    setUser(prev => {
      const merged = { ...prev, ...updatedFields };
      localStorage.setItem('powerpulse_user', JSON.stringify(merged));
      return merged;
    });
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      refreshToken, 
      role: user?.role, 
      login, 
      logout, 
      updateUser,
      loading 
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
