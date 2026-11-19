import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';

// Public Auth Pages
import { Login } from './pages/Login';
import { Register } from './pages/Register';

// Admin Pages
import { AdminLayout } from './components/AdminLayout';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminIncidents } from './pages/AdminIncidents';
import { AdminReports } from './pages/AdminReports';
import { AdminComplaints } from './pages/AdminComplaints';
import { AdminLocations } from './pages/AdminLocations';
import { AdminPlanned } from './pages/AdminPlanned';
import { AdminAnalytics } from './pages/AdminAnalytics';
import { AdminUsers } from './pages/AdminUsers';
import { AdminAuditLogs } from './pages/AdminAuditLogs';

// Technician Pages
import { TechLayout } from './components/TechLayout';
import { TechnicianDashboard } from './pages/TechnicianDashboard';
import { TechnicianTaskDetail } from './pages/TechnicianTaskDetail';

// Consumer Pages
import { ConsumerLayout } from './components/ConsumerLayout';
import { ConsumerPortal } from './pages/ConsumerPortal';
import { ConsumerActiveOutages } from './pages/ConsumerActiveOutages';
import { ConsumerOutageHistory } from './pages/ConsumerOutageHistory';
import { ConsumerNotifications } from './pages/ConsumerNotifications';
import { ConsumerProfile } from './pages/ConsumerProfile';

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* 10 Admin Pages (Source §8.2) */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="incidents" element={<AdminIncidents />} />
            <Route path="reports" element={<AdminReports />} />
            <Route path="complaints" element={<AdminComplaints />} />
            <Route path="locations" element={<AdminLocations />} />
            <Route path="planned" element={<AdminPlanned />} />
            <Route path="analytics" element={<AdminAnalytics />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="audit-logs" element={<AdminAuditLogs />} />
          </Route>

          {/* 3 Technician Pages (Source §8.3) */}
          <Route
            path="/tech"
            element={
              <ProtectedRoute allowedRoles={['technician']}>
                <TechLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<TechnicianDashboard />} />
            <Route path="assignments/:id" element={<TechnicianTaskDetail />} />
          </Route>

          {/* 13 Consumer Screens in Dedicated Tabs (Source §9.3) */}
          <Route
            path="/consumer"
            element={
              <ProtectedRoute allowedRoles={['consumer', 'admin']}>
                <ConsumerLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<ConsumerPortal />} />
            <Route path="outages" element={<ConsumerActiveOutages />} />
            <Route path="history" element={<ConsumerOutageHistory />} />
            <Route path="notifications" element={<ConsumerNotifications />} />
            <Route path="profile" element={<ConsumerProfile />} />
          </Route>

          {/* Root Fallback */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
