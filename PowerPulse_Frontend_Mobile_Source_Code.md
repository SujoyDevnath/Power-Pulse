# ⚡ PowerPulse: Frontend & Android Mobile Application Source Code

> **Course:** PROG 212 - Android and Web Application Development Sessional  
> **Project:** PowerPulse – Smart Electricity Outage Intelligence & Field Dispatch  
> **Presenter:** **Sujoy (ID: 20)** – *Frontend Architecture & Mobile App Engineer*  

**Total Source Code Files in this Part:** 64 files  
**Total Source Lines in this Part:** 9,803 lines  

---

## 📑 Table of Contents

### SECTION 1: FRONTEND ROOT & BUILD CONFIGURATION
*React 19 SPA configuration, Vite build tooling, Tailwind CSS system, and Capacitor Android settings.*

- `01.` **[web/package.json](#file-1)** (40 lines)
- `02.` **[web/vite.config.js](#file-2)** (8 lines)
- `03.` **[web/tailwind.config.js](#file-3)** (29 lines)
- `04.` **[web/postcss.config.js](#file-4)** (7 lines)
- `05.` **[web/capacitor.config.json](#file-5)** (17 lines)
- `06.` **[web/.env.example](#file-6)** (7 lines)
- `07.` **[web/index.html](#file-7)** (14 lines)
- `08.` **[web/src/main.jsx](#file-8)** (11 lines)
- `09.` **[web/src/App.jsx](#file-9)** (110 lines)
- `10.` **[web/src/index.css](#file-10)** (97 lines)
- `11.` **[web/src/App.css](#file-11)** (185 lines)

### SECTION 2: FRONTEND AUTH CONTEXT & CLIENT SERVICES
*State management for user auth & reliability score, Tri-Host auto-healing Axios network service, and offline queue.*

- `12.` **[web/src/context/AuthContext.jsx](#file-12)** (120 lines)
- `13.` **[web/src/services/api.js](#file-13)** (191 lines)
- `14.` **[web/src/services/connectivity.js](#file-14)** (158 lines)
- `15.` **[web/src/services/mobileFeatures.js](#file-15)** (106 lines)
- `16.` **[web/src/services/offlineQueue.js](#file-16)** (153 lines)

### SECTION 3: FRONTEND LAYOUTS & REUSABLE UI COMPONENTS
*Role-based protected route wrappers, portal navigation layouts (Consumer, Admin, Tech), Leaflet maps, and status badges.*

- `17.` **[web/src/components/ProtectedRoute.jsx](#file-17)** (21 lines)
- `18.` **[web/src/components/ConsumerLayout.jsx](#file-18)** (253 lines)
- `19.` **[web/src/components/AdminLayout.jsx](#file-19)** (192 lines)
- `20.` **[web/src/components/TechLayout.jsx](#file-20)** (193 lines)
- `21.` **[web/src/components/MetricCard.jsx](#file-21)** (29 lines)
- `22.` **[web/src/components/Modal.jsx](#file-22)** (40 lines)
- `23.` **[web/src/components/StatusBadge.jsx](#file-23)** (31 lines)
- `24.` **[web/src/components/ConfidenceBadge.jsx](#file-24)** (32 lines)
- `25.` **[web/src/components/OfflineBanner.jsx](#file-25)** (176 lines)
- `26.` **[web/src/components/ErrorBoundary.jsx](#file-26)** (62 lines)
- `27.` **[web/src/components/OutageMap.jsx](#file-27)** (266 lines)

### SECTION 4: FRONTEND PAGES (AUTH, CONSUMER, ADMIN, TECH)
*All 20 full application pages for authentication, citizen reporting, executive dashboard, and field technician dispatch.*

- `28.` **[web/src/pages/Login.jsx](#file-28)** (431 lines)
- `29.` **[web/src/pages/Register.jsx](#file-29)** (11 lines)
- `30.` **[web/src/pages/ConsumerPortal.jsx](#file-30)** (441 lines)
- `31.` **[web/src/pages/ConsumerActiveOutages.jsx](#file-31)** (266 lines)
- `32.` **[web/src/pages/ConsumerOutageHistory.jsx](#file-32)** (201 lines)
- `33.` **[web/src/pages/ConsumerNotifications.jsx](#file-33)** (233 lines)
- `34.` **[web/src/pages/ConsumerProfile.jsx](#file-34)** (292 lines)
- `35.` **[web/src/pages/AdminDashboard.jsx](#file-35)** (220 lines)
- `36.` **[web/src/pages/AdminIncidents.jsx](#file-36)** (419 lines)
- `37.` **[web/src/pages/AdminReports.jsx](#file-37)** (243 lines)
- `38.` **[web/src/pages/AdminComplaints.jsx](#file-38)** (353 lines)
- `39.` **[web/src/pages/AdminLocations.jsx](#file-39)** (366 lines)
- `40.` **[web/src/pages/AdminPlanned.jsx](#file-40)** (337 lines)
- `41.` **[web/src/pages/AdminAnalytics.jsx](#file-41)** (147 lines)
- `42.` **[web/src/pages/AdminUsers.jsx](#file-42)** (282 lines)
- `43.` **[web/src/pages/AdminAuditLogs.jsx](#file-43)** (191 lines)
- `44.` **[web/src/pages/AdminProfile.jsx](#file-44)** (248 lines)
- `45.` **[web/src/pages/TechnicianDashboard.jsx](#file-45)** (519 lines)
- `46.` **[web/src/pages/TechnicianTaskDetail.jsx](#file-46)** (453 lines)
- `47.` **[web/src/pages/TechnicianProfile.jsx](#file-47)** (395 lines)

### SECTION 5: CONSUMER FEATURE COMPONENTS (MOBILE-FIRST)
*1-tap emergency outage button, camera photo hazard attachment, smart meter kWh breakdown, and bKash pay modal.*

- `48.` **[web/src/features/consumer/components/index.js](#file-48)** (7 lines)
- `49.` **[web/src/features/consumer/components/OutageReportingCard.jsx](#file-49)** (269 lines)
- `50.` **[web/src/features/consumer/components/ComplaintFilingCard.jsx](#file-50)** (149 lines)
- `51.` **[web/src/features/consumer/components/ComplaintHistoryCard.jsx](#file-51)** (160 lines)
- `52.` **[web/src/features/consumer/components/PlannedOutagesCard.jsx](#file-52)** (51 lines)
- `53.` **[web/src/features/consumer/components/SmartMeterCard.jsx](#file-53)** (111 lines)
- `54.` **[web/src/features/consumer/components/BillPaymentModal.jsx](#file-54)** (230 lines)

### SECTION 6: ANDROID NATIVE INTEGRATION (CAPACITOR & GRADLE)
*Native Android app manifest (Camera/GPS permissions), Java MainActivity bridge, and Gradle build configurations.*

- `55.` **[web/android/app/src/main/AndroidManifest.xml](#file-55)** (48 lines)
- `56.` **[web/android/app/src/main/java/com/powerpulse/app/MainActivity.java](#file-56)** (6 lines)
- `57.` **[web/android/app/build.gradle](#file-57)** (55 lines)
- `58.` **[web/android/build.gradle](#file-58)** (30 lines)
- `59.` **[web/android/settings.gradle](#file-59)** (5 lines)
- `60.` **[web/android/variables.gradle](#file-60)** (16 lines)
- `61.` **[web/android/capacitor.settings.gradle](#file-61)** (16 lines)
- `62.` **[web/android/gradle.properties](#file-62)** (24 lines)
- `63.` **[web/android/app/src/main/res/values/strings.xml](#file-63)** (8 lines)
- `64.` **[web/android/app/src/main/res/values/styles.xml](#file-64)** (22 lines)

---


# SECTION 1: FRONTEND ROOT & BUILD CONFIGURATION
_React 19 SPA configuration, Vite build tooling, Tailwind CSS system, and Capacitor Android settings._

---

## <a id="file-1"></a>[01] `web/package.json`

- **Path:** `Power-Pulse-main/web/package.json`  
- **Language:** `json`  
- **Lines of Code:** `40` lines  

```json
{
  "name": "web",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "node ./node_modules/vite/bin/vite.js",
    "build": "node ./node_modules/vite/bin/vite.js build",
    "lint": "node ./node_modules/oxlint/bin/oxlint.js",
    "preview": "node ./node_modules/vite/bin/vite.js preview"
  },
  "dependencies": {
    "@capacitor/android": "^8.6.2",
    "@capacitor/camera": "^8.2.6",
    "@capacitor/cli": "^8.6.2",
    "@capacitor/core": "^8.6.2",
    "@capacitor/geolocation": "^8.2.5",
    "@capacitor/local-notifications": "^8.3.1",
    "@capacitor/network": "^8.0.1",
    "autoprefixer": "^10.6.2",
    "axios": "^1.21.1",
    "leaflet": "^1.9.4",
    "lucide-react": "^1.76.0",
    "postcss": "^8.5.33",
    "react": "^19.3.1",
    "react-dom": "^19.3.1",
    "react-leaflet": "^5.0.0",
    "react-router-dom": "^7.18.6",
    "recharts": "^3.11.0",
    "tailwindcss": "^3.4.17"
  },
  "devDependencies": {
    "@types/react": "^19.3.0",
    "@types/react-dom": "^19.3.0",
    "@vitejs/plugin-react": "^6.1.2",
    "oxlint": "^1.90.0",
    "vite": "^8.3.6"
  }
}
```

---

## <a id="file-2"></a>[02] `web/vite.config.js`

- **Path:** `Power-Pulse-main/web/vite.config.js`  
- **Language:** `javascript`  
- **Lines of Code:** `8` lines  

```javascript
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
```

---

## <a id="file-3"></a>[03] `web/tailwind.config.js`

- **Path:** `Power-Pulse-main/web/tailwind.config.js`  
- **Language:** `javascript`  
- **Lines of Code:** `29` lines  

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          900: '#0c4a6e',
        },
        outage: {
          red: '#ef4444',
          amber: '#f59e0b',
          yellow: '#eab308',
          green: '#10b981'
        }
      }
    },
  },
  plugins: [],
}
```

---

## <a id="file-4"></a>[04] `web/postcss.config.js`

- **Path:** `Power-Pulse-main/web/postcss.config.js`  
- **Language:** `javascript`  
- **Lines of Code:** `7` lines  

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

---

## <a id="file-5"></a>[05] `web/capacitor.config.json`

- **Path:** `Power-Pulse-main/web/capacitor.config.json`  
- **Language:** `json`  
- **Lines of Code:** `17` lines  

```json
{
  "appId": "com.powerpulse.app",
  "appName": "PowerPulse",
  "webDir": "dist",
  "bundledWebRuntime": false,
  "server": {
    "cleartext": true,
    "androidScheme": "http"
  },
  "plugins": {
    "LocalNotifications": {
      "smallIcon": "ic_launcher_foreground",
      "iconColor": "#0284c7"
    }
  }
}
```

---

## <a id="file-6"></a>[06] `web/.env.example`

- **Path:** `Power-Pulse-main/web/.env.example`  
- **Language:** ``  
- **Lines of Code:** `7` lines  

```
# PowerPulse Web Application Environment Variables
# Local Development:
# VITE_API_URL=http://localhost:5000/api

# Production Live API (Render):
VITE_API_URL=https://powerpulse-api-j8oc.onrender.com/api
```

---

## <a id="file-7"></a>[07] `web/index.html`

- **Path:** `Power-Pulse-main/web/index.html`  
- **Language:** `html`  
- **Lines of Code:** `14` lines  

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>PowerPulse - Smart Electricity Outage Intelligence & Management Platform</title>
  </head>
  <body class="bg-slate-50 text-slate-900 antialiased font-sans">
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

---

## <a id="file-8"></a>[08] `web/src/main.jsx`

- **Path:** `Power-Pulse-main/web/src/main.jsx`  
- **Language:** `jsx`  
- **Lines of Code:** `11` lines  

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

---

## <a id="file-9"></a>[09] `web/src/App.jsx`

- **Path:** `Power-Pulse-main/web/src/App.jsx`  
- **Language:** `jsx`  
- **Lines of Code:** `110` lines  

```jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ErrorBoundary } from './components/ErrorBoundary';

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
import { AdminProfile } from './pages/AdminProfile';

// Technician Pages
import { TechLayout } from './components/TechLayout';
import { TechnicianDashboard } from './pages/TechnicianDashboard';
import { TechnicianTaskDetail } from './pages/TechnicianTaskDetail';
import { TechnicianProfile } from './pages/TechnicianProfile';

// Consumer Pages
import { ConsumerLayout } from './components/ConsumerLayout';
import { ConsumerPortal } from './pages/ConsumerPortal';
import { ConsumerActiveOutages } from './pages/ConsumerActiveOutages';
import { ConsumerOutageHistory } from './pages/ConsumerOutageHistory';
import { ConsumerNotifications } from './pages/ConsumerNotifications';
import { ConsumerProfile } from './pages/ConsumerProfile';

export function App() {
  return (
    <ErrorBoundary>
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
            <Route path="profile" element={<AdminProfile />} />
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
            <Route path="profile" element={<TechnicianProfile />} />
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
  </ErrorBoundary>
);
}

export default App;
```

---

## <a id="file-10"></a>[10] `web/src/index.css`

- **Path:** `Power-Pulse-main/web/src/index.css`  
- **Language:** `css`  
- **Lines of Code:** `97` lines  

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-slate-50 text-slate-900 antialiased font-sans;
  }
}

/* Custom scrollbars for tables and panels */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Hide scrollbar for clean mobile tabs & horizontal sliders */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

@keyframes slideRight {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

.animate-slideRight {
  animation: slideRight 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* Leaflet Custom Marker & Popup Modern Styling */
.leaflet-container {
  width: 100% !important;
  height: 100% !important;
  z-index: 1 !important;
  background-color: #f1f5f9 !important;
}

.custom-outage-marker,
.custom-online-marker {
  background: transparent !important;
  border: none !important;
}

/* Permanent Area Labels below markers */
.leaflet-tooltip.powerpulse-area-tooltip {
  background-color: rgba(255, 255, 255, 0.95) !important;
  border: 1px solid #cbd5e1 !important;
  border-radius: 8px !important;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.12) !important;
  padding: 2px 7px !important;
  font-size: 11px !important;
  color: #1e293b !important;
}

.leaflet-tooltip-bottom:before {
  border-bottom-color: #cbd5e1 !important;
}

.leaflet-popup-content-wrapper {
  border-radius: 16px !important;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1) !important;
  padding: 6px !important;
  border: 1px solid #e2e8f0 !important;
}

.leaflet-popup-content {
  margin: 8px 12px !important;
  line-height: 1.4 !important;
}

.leaflet-popup-tip {
  background: #ffffff !important;
  box-shadow: none !important;
}
```

---

## <a id="file-11"></a>[11] `web/src/App.css`

- **Path:** `Power-Pulse-main/web/src/App.css`  
- **Language:** `css`  
- **Lines of Code:** `185` lines  

```css
.counter {
  font-size: 16px;
  padding: 5px 10px;
  border-radius: 5px;
  color: var(--accent);
  background: var(--accent-bg);
  border: 2px solid transparent;
  transition: border-color 0.3s;
  margin-bottom: 24px;

  &:hover {
    border-color: var(--accent-border);
  }
  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
}

.hero {
  position: relative;

  .base,
  .framework,
  .vite {
    inset-inline: 0;
    margin: 0 auto;
  }

  .base {
    width: 170px;
    position: relative;
    z-index: 0;
  }

  .framework,
  .vite {
    position: absolute;
  }

  .framework {
    z-index: 1;
    top: 34px;
    height: 28px;
    transform: perspective(2000px) rotateZ(300deg) rotateX(44deg) rotateY(39deg)
      scale(1.4);
  }

  .vite {
    z-index: 0;
    top: 107px;
    height: 26px;
    width: auto;
    transform: perspective(2000px) rotateZ(300deg) rotateX(40deg) rotateY(39deg)
      scale(0.8);
  }
}

#center {
  display: flex;
  flex-direction: column;
  gap: 25px;
  place-content: center;
  place-items: center;
  flex-grow: 1;

  @media (max-width: 1024px) {
    padding: 32px 20px 24px;
    gap: 18px;
  }
}

#next-steps {
  display: flex;
  border-top: 1px solid var(--border);
  text-align: left;

  & > div {
    flex: 1 1 0;
    padding: 32px;
    @media (max-width: 1024px) {
      padding: 24px 20px;
    }
  }

  .icon {
    margin-bottom: 16px;
    width: 22px;
    height: 22px;
  }

  @media (max-width: 1024px) {
    flex-direction: column;
    text-align: center;
  }
}

#docs {
  border-right: 1px solid var(--border);

  @media (max-width: 1024px) {
    border-right: none;
    border-bottom: 1px solid var(--border);
  }
}

#next-steps ul {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 8px;
  margin: 32px 0 0;

  .logo {
    height: 18px;
  }

  a {
    color: var(--text-h);
    font-size: 16px;
    border-radius: 6px;
    background: var(--social-bg);
    display: flex;
    padding: 6px 12px;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    transition: box-shadow 0.3s;

    &:hover {
      box-shadow: var(--shadow);
    }
    .button-icon {
      height: 18px;
      width: 18px;
    }
  }

  @media (max-width: 1024px) {
    margin-top: 20px;
    flex-wrap: wrap;
    justify-content: center;

    li {
      flex: 1 1 calc(50% - 8px);
    }

    a {
      width: 100%;
      justify-content: center;
      box-sizing: border-box;
    }
  }
}

#spacer {
  height: 88px;
  border-top: 1px solid var(--border);
  @media (max-width: 1024px) {
    height: 48px;
  }
}

.ticks {
  position: relative;
  width: 100%;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: -4.5px;
    border: 5px solid transparent;
  }

  &::before {
    left: 0;
    border-left-color: var(--border);
  }
  &::after {
    right: 0;
    border-right-color: var(--border);
  }
}
```

---


# SECTION 2: FRONTEND AUTH CONTEXT & CLIENT SERVICES
_State management for user auth & reliability score, Tri-Host auto-healing Axios network service, and offline queue._

---

## <a id="file-12"></a>[12] `web/src/context/AuthContext.jsx`

- **Path:** `Power-Pulse-main/web/src/context/AuthContext.jsx`  
- **Language:** `jsx`  
- **Lines of Code:** `120` lines  

```jsx
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
```

---

## <a id="file-13"></a>[13] `web/src/services/api.js`

- **Path:** `Power-Pulse-main/web/src/services/api.js`  
- **Language:** `javascript`  
- **Lines of Code:** `191` lines  

```javascript
import axios from 'axios';
import { Capacitor } from '@capacitor/core';

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
      return customHost.startsWith('http') ? customHost : `http://${customHost}:5000/api`;
    }
    const cachedHost = localStorage.getItem('powerpulse_working_host');
    if (cachedHost) {
      return `http://${cachedHost}:5000/api`;
    }
    // Default to Mobile Hotspot IP
    return 'http://192.168.137.1:5000/api';
  }
  return (
    import.meta.env.VITE_API_URL ||
    (import.meta.env.PROD
      ? 'https://powerpulse-api-j8oc.onrender.com/api'
      : 'http://localhost:5000/api')
  );
};

const API_BASE_URL = getInitialBaseUrl();

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Auto-detect reachable local host on native mobile launch
if (Capacitor.isNativePlatform() && !localStorage.getItem('powerpulse_server_ip')) {
  (async () => {
    for (const host of CANDIDATE_HOSTS) {
      try {
        const controller = new AbortController();
        const tid = setTimeout(() => controller.abort(), 1200);
        const res = await fetch(`http://${host}:5000/api/health`, { 
          signal: controller.signal,
          cache: 'no-store'
        });
        clearTimeout(tid);
        if (res.ok) {
          api.defaults.baseURL = `http://${host}:5000/api`;
          localStorage.setItem('powerpulse_working_host', host);
          break;
        }
      } catch (e) {
        // Continue probing next host
      }
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

    // Self-healing: If network failed on native mobile, auto-switch to another working candidate host
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
            const tid = setTimeout(() => controller.abort(), 1200);
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
        const res = await axios.post(`${api.defaults.baseURL}/auth/refresh`, {
          refreshToken
        });

        const { token: newToken, refreshToken: newRefreshToken } = res.data;
        localStorage.setItem('powerpulse_token', newToken);
        if (newRefreshToken) {
          localStorage.setItem('powerpulse_refresh_token', newRefreshToken);
        }

        api.defaults.headers.common.Authorization = `Bearer ${newToken}`;
        processQueue(null, newToken);
        return api(originalRequest);
      } catch (refreshErr) {
        processQueue(refreshErr, null);
        localStorage.removeItem('powerpulse_token');
        localStorage.removeItem('powerpulse_refresh_token');
        localStorage.removeItem('powerpulse_user');
        window.location.href = '/login';
        return Promise.reject(refreshErr);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
```

---

## <a id="file-14"></a>[14] `web/src/services/connectivity.js`

- **Path:** `Power-Pulse-main/web/src/services/connectivity.js`  
- **Language:** `javascript`  
- **Lines of Code:** `158` lines  

```javascript
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
```

---

## <a id="file-15"></a>[15] `web/src/services/mobileFeatures.js`

- **Path:** `Power-Pulse-main/web/src/services/mobileFeatures.js`  
- **Language:** `javascript`  
- **Lines of Code:** `106` lines  

```javascript
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
```

---

## <a id="file-16"></a>[16] `web/src/services/offlineQueue.js`

- **Path:** `Power-Pulse-main/web/src/services/offlineQueue.js`  
- **Language:** `javascript`  
- **Lines of Code:** `153` lines  

```javascript
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
```

---


# SECTION 3: FRONTEND LAYOUTS & REUSABLE UI COMPONENTS
_Role-based protected route wrappers, portal navigation layouts (Consumer, Admin, Tech), Leaflet maps, and status badges._

---

## <a id="file-17"></a>[17] `web/src/components/ProtectedRoute.jsx`

- **Path:** `Power-Pulse-main/web/src/components/ProtectedRoute.jsx`  
- **Language:** `jsx`  
- **Lines of Code:** `21` lines  

```jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, token } = useAuth();

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect to their default portal based on their actual role
    if (user.role === 'admin') return <Navigate to="/admin" replace />;
    if (user.role === 'technician') return <Navigate to="/tech" replace />;
    return <Navigate to="/consumer" replace />;
  }

  return children;
};
```

---

## <a id="file-18"></a>[18] `web/src/components/ConsumerLayout.jsx`

- **Path:** `Power-Pulse-main/web/src/components/ConsumerLayout.jsx`  
- **Language:** `jsx`  
- **Lines of Code:** `253` lines  

```jsx
import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { 
  Zap, Bell, User, Clock, AlertOctagon, 
  LogOut, MapPin, ArrowLeft, MessageSquarePlus,
  ClipboardList, CreditCard, ShieldCheck
} from 'lucide-react';
import { OfflineBanner } from './OfflineBanner';

export const ConsumerLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [unreadCount, setUnreadCount] = useState(0);

  const isNotifPage = location.pathname.startsWith('/consumer/notifications');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const fetchUnreadCount = async () => {
    if (location.pathname.startsWith('/consumer/notifications')) {
      setUnreadCount(0);
      return;
    }
    try {
      const res = await api.get('/notifications/unread-count');
      if (res.data && typeof res.data.unread_count === 'number') {
        setUnreadCount(res.data.unread_count);
      }
    } catch (err) {
      // Silently catch
    }
  };

  useEffect(() => {
    if (isNotifPage) {
      setUnreadCount(0);
    }
  }, [location.pathname, isNotifPage]);

  useEffect(() => {
    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 15000);

    const handleNotifUpdate = (e) => {
      if (e?.detail && typeof e.detail.unreadCount === 'number') {
        setUnreadCount(e.detail.unreadCount);
      } else {
        fetchUnreadCount();
      }
    };

    window.addEventListener('powerpulse-notifications-changed', handleNotifUpdate);

    return () => {
      clearInterval(interval);
      window.removeEventListener('powerpulse-notifications-changed', handleNotifUpdate);
    };
  }, [location.pathname]);

  const tabs = [
    { name: 'Grid & Reporting', path: '/consumer', end: true },
    { name: 'Active Outages Nearby', path: '/consumer/outages' },
    { name: 'Outage History', path: '/consumer/history' },
    { name: 'Notifications', path: '/consumer/notifications' },
    { name: 'My Profile', path: '/consumer/profile' }
  ];

  const showBadge = unreadCount > 0 && !isNotifPage;

  // Check which tab is active for bottom navigation
  const searchParams = new URLSearchParams(location.search);
  const activeSubTab = searchParams.get('tab') || 'outage';

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans pb-20 sm:pb-0">
      {/* Offline Connectivity Notification Banner */}
      <OfflineBanner />

      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="p-2 bg-gradient-to-tr from-sky-600 to-cyan-500 text-white rounded-xl shrink-0 shadow-sm">
              <Zap className="w-5 h-5 fill-white" />
            </div>
            <div className="min-w-0">
              <h1 className="font-bold text-xs sm:text-sm text-slate-900 tracking-tight truncate flex items-center gap-1.5">
                <span>PowerPulse</span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold bg-sky-50 text-sky-700 border border-sky-200">
                  Citizen Portal
                </span>
              </h1>
              <p className="text-[10px] sm:text-[11px] text-slate-500 flex items-center gap-1 truncate">
                <MapPin className="w-3 h-3 text-sky-600 shrink-0" />
                <span className="truncate">{user?.area || 'Dhaka Area'} • {user?.district || 'Dhaka'}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {/* Quick Notification Bell in Header */}
            <NavLink
              to="/consumer/notifications"
              className="relative p-2 text-slate-500 hover:text-sky-600 hover:bg-slate-100 rounded-xl transition"
              title={showBadge ? `${unreadCount} unread notification(s)` : 'Notifications'}
            >
              <Bell className="w-4 h-4" />
              {showBadge && (
                <span className="absolute top-1 right-1 flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-rose-500 text-[9px] font-extrabold text-white ring-2 ring-white animate-pulse">
                  {unreadCount > 99 ? '99+' : unreadCount}
                </span>
              )}
            </NavLink>

            {/* If logged in user is admin, show Return to Admin button */}
            {user?.role === 'admin' ? (
              <NavLink
                to="/admin"
                className="inline-flex items-center gap-1 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs shadow-sm transition"
                title="Return to Grid Admin Portal"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Admin Portal</span>
                <span className="sm:hidden">Admin</span>
              </NavLink>
            ) : (
              <span className="hidden sm:inline-block px-2.5 py-1 text-xs font-semibold rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                Score: {user?.reliability_score ?? '0.97'}
              </span>
            )}

            <button
              onClick={handleLogout}
              className="p-2 text-slate-400 hover:text-rose-600 hover:bg-slate-100 rounded-xl transition"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Navigation (Desktop / Tablet) */}
        <div className="max-w-4xl mx-auto px-2 sm:px-4 flex items-center gap-1 overflow-x-auto border-t border-slate-100 no-scrollbar">
          {tabs.map((tab) => {
            const isNotifTab = tab.path === '/consumer/notifications';
            return (
              <NavLink
                key={tab.path}
                to={tab.path}
                end={tab.end}
                className={({ isActive }) =>
                  `px-3 py-2.5 sm:px-3.5 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 shrink-0 ${
                    isActive
                      ? 'border-sky-600 text-sky-600 font-bold'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`
                }
              >
                {isNotifTab && <Bell className="w-3.5 h-3.5 shrink-0" />}
                <span>{tab.name}</span>
                {isNotifTab && showBadge && (
                  <span className="px-1.5 py-0.5 text-[10px] font-extrabold rounded-full bg-rose-500 text-white leading-none shadow-xs animate-bounce">
                    {unreadCount > 99 ? '99+' : unreadCount}
                  </span>
                )}
              </NavLink>
            );
          })}
        </div>
      </header>

      {/* Main Outlet */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-3 sm:p-6">
        <Outlet />
      </main>

      {/* 📱 Mobile Native Bottom Navigation Bar (Shown on small screens / Android App) */}
      <nav aria-label="Mobile Navigation" className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 shadow-lg flex items-center justify-around">
        {/* 1. Outage */}
        <button
          onClick={() => navigate('/consumer?tab=outage')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition ${
            location.pathname === '/consumer' && activeSubTab === 'outage'
              ? 'text-sky-600 font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Zap className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Outage</span>
        </button>

        {/* 2. Complaint */}
        <button
          onClick={() => navigate('/consumer?tab=complaint')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition ${
            location.pathname === '/consumer' && activeSubTab === 'complaint'
              ? 'text-amber-600 font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <MessageSquarePlus className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Complaint</span>
        </button>

        {/* 3. Tracking */}
        <button
          onClick={() => navigate('/consumer?tab=tracking')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition ${
            location.pathname === '/consumer' && activeSubTab === 'tracking'
              ? 'text-indigo-600 font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <ClipboardList className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Tracking</span>
        </button>

        {/* 4. Billing */}
        <button
          onClick={() => navigate('/consumer?tab=billing')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition ${
            location.pathname === '/consumer' && activeSubTab === 'billing'
              ? 'text-emerald-600 font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <CreditCard className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Bills</span>
        </button>

        {/* 5. Profile */}
        <button
          onClick={() => navigate('/consumer/profile')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition ${
            location.pathname.startsWith('/consumer/profile')
              ? 'text-sky-600 font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <User className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Profile</span>
        </button>
      </nav>
    </div>
  );
};
```

---

## <a id="file-19"></a>[19] `web/src/components/AdminLayout.jsx`

- **Path:** `Power-Pulse-main/web/src/components/AdminLayout.jsx`  
- **Language:** `jsx`  
- **Lines of Code:** `192` lines  

```jsx
import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Zap, LayoutDashboard, AlertOctagon, MessageSquareWarning, 
  CalendarClock, BarChart3, Users, ShieldAlert, LogOut, ExternalLink,
  FileText, MapPin, User, Menu, X
} from 'lucide-react';
import { OfflineBanner } from './OfflineBanner';

export const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile sidebar automatically whenever location changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard, end: true },
    { name: 'Incidents & Outages', path: '/admin/incidents', icon: AlertOctagon },
    { name: 'Raw Consumer Reports', path: '/admin/reports', icon: FileText },
    { name: 'Complaints Desk', path: '/admin/complaints', icon: MessageSquareWarning },
    { name: 'Locations & Zones', path: '/admin/locations', icon: MapPin },
    { name: 'Planned Outages', path: '/admin/planned', icon: CalendarClock },
    { name: 'Analytics & Trends', path: '/admin/analytics', icon: BarChart3 },
    { name: 'Users & Technicians', path: '/admin/users', icon: Users },
    { name: 'Security Audit Logs', path: '/admin/audit-logs', icon: ShieldAlert },
    { name: 'Admin Profile', path: '/admin/profile', icon: User },
  ];

  const renderNavLinks = () => (
    <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-sky-600 text-white shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`
            }
          >
            <Icon className="w-4 h-4 shrink-0" />
            <span className="truncate">{item.name}</span>
          </NavLink>
        );
      })}
    </nav>
  );

  const renderSidebarFooter = () => (
    <div className="p-4 border-t border-slate-800 space-y-3 shrink-0">
      <NavLink
        to="/consumer"
        onClick={() => setMobileMenuOpen(false)}
        className="flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-400 hover:text-white bg-slate-800/80 rounded-lg transition-colors"
      >
        <span>Switch to Consumer View</span>
        <ExternalLink className="w-3.5 h-3.5 shrink-0" />
      </NavLink>

      <div className="flex items-center justify-between pt-1">
        <NavLink 
          to="/admin/profile" 
          onClick={() => setMobileMenuOpen(false)} 
          className="min-w-0 flex-1 hover:opacity-80 transition group"
        >
          <p className="text-xs font-semibold text-white truncate group-hover:text-purple-300">{user?.name}</p>
          <p className="text-[10px] text-slate-400 truncate">{user?.email}</p>
        </NavLink>
        <button
          onClick={handleLogout}
          title="Logout"
          className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors ml-1 shrink-0"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans">
      {/* 1. Mobile Drawer Navigation Overlay (< lg) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity animate-fadeIn"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Slide-out Drawer */}
          <aside className="relative flex flex-col w-72 max-w-[85vw] bg-slate-900 text-slate-300 z-50 h-full border-r border-slate-800 shadow-2xl animate-slideRight">
            <div className="h-16 flex items-center justify-between px-5 border-b border-slate-800 shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-sky-500/20 text-sky-400 rounded-lg">
                  <Zap className="w-5 h-5 fill-sky-400" />
                </div>
                <div>
                  <h1 className="font-bold text-white text-sm tracking-tight">PowerPulse</h1>
                  <p className="text-[10px] text-sky-400 font-semibold tracking-wider uppercase">Grid Admin Portal</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {renderNavLinks()}
            {renderSidebarFooter()}
          </aside>
        </div>
      )}

      {/* 2. Desktop Permanent Sidebar (hidden on mobile, visible on lg+) */}
      <aside className="hidden lg:flex w-64 bg-slate-900 text-slate-300 flex-col shrink-0 border-r border-slate-800 h-screen sticky top-0">
        <div className="h-16 flex items-center px-6 gap-3 border-b border-slate-800 shrink-0">
          <div className="p-2 bg-sky-500/20 text-sky-400 rounded-lg">
            <Zap className="w-6 h-6 fill-sky-400" />
          </div>
          <div>
            <h1 className="font-bold text-white text-base tracking-tight">PowerPulse</h1>
            <p className="text-[10px] text-sky-400 font-semibold tracking-wider uppercase">Grid Admin Portal</p>
          </div>
        </div>

        {renderNavLinks()}
        {renderSidebarFooter()}
      </aside>

      {/* 3. Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 min-h-screen overflow-y-auto">
        <OfflineBanner />

        {/* Top Header Bar */}
        <header className="h-16 bg-white border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-20 shadow-xs">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            {/* Hamburger button on mobile */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 -ml-1 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl lg:hidden transition shrink-0"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 min-w-0">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
              <span className="text-xs font-medium text-slate-600 truncate">
                Grid Monitoring Active: Dhaka Central Utility
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-sky-50 text-sky-700 border border-sky-200">
              <span className="hidden sm:inline">Role: </span>Admin
            </span>
          </div>
        </header>

        {/* Page Container */}
        <div className="p-4 sm:p-6 lg:p-8 flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
```

---

## <a id="file-20"></a>[20] `web/src/components/TechLayout.jsx`

- **Path:** `Power-Pulse-main/web/src/components/TechLayout.jsx`  
- **Language:** `jsx`  
- **Lines of Code:** `193` lines  

```jsx
import React, { useState } from 'react';
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { 
  Wrench, LogOut, CheckCircle2, Clock, User, 
  ClipboardList, ChevronDown, AlertCircle, Coffee 
} from 'lucide-react';
import { OfflineBanner } from './OfflineBanner';

export const TechLayout = () => {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const currentStatus = user?.availability_status || 'available';

  const statusConfigs = {
    available: {
      label: 'Available',
      badgeClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20',
      dotClass: 'bg-emerald-400 ring-emerald-400/30',
      description: 'Ready to receive new field tasks'
    },
    busy: {
      label: 'Busy on Site',
      badgeClass: 'bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500/20',
      dotClass: 'bg-amber-400 ring-amber-400/30',
      description: 'Currently working on active repairs'
    },
    on_leave: {
      label: 'On Leave',
      badgeClass: 'bg-orange-500/10 text-orange-400 border-orange-500/20 hover:bg-orange-500/20',
      dotClass: 'bg-orange-400 ring-orange-400/30',
      description: 'Temporarily unavailable for dispatch'
    },
    offline: {
      label: 'Offline',
      badgeClass: 'bg-slate-500/10 text-slate-300 border-slate-500/20 hover:bg-slate-500/20',
      dotClass: 'bg-slate-400 ring-slate-400/30',
      description: 'Off-shift or shift concluded'
    }
  };

  const handleStatusChange = async (newStatus) => {
    if (newStatus === currentStatus) {
      setStatusDropdownOpen(false);
      return;
    }
    try {
      setUpdatingStatus(true);
      await api.patch('/technician/status', { status: newStatus });
      updateUser({ availability_status: newStatus });
      setStatusDropdownOpen(false);
    } catch (err) {
      console.error('Failed to update status:', err);
      alert(err.response?.data?.error || 'Failed to update availability status');
    } finally {
      setUpdatingStatus(false);
    }
  };

  const isProfileActive = location.pathname.startsWith('/tech/profile');
  const isOrdersActive = !isProfileActive;

  const currentCfg = statusConfigs[currentStatus] || statusConfigs.available;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      <OfflineBanner />
      <header className="bg-slate-900 text-white sticky top-0 z-30 shadow-md border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="p-2 bg-amber-500/20 text-amber-400 rounded-xl border border-amber-500/30 shadow-inner shrink-0">
              <Wrench className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <h1 className="font-bold text-xs sm:text-sm tracking-tight text-white truncate">PowerPulse Tech</h1>
                <span className="text-[9px] sm:text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded-full font-mono border border-slate-700 shrink-0">
                  #{user?.technician_id || 'TECH'}
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-400 truncate">{user?.name} • {user?.area || 'Field Base'}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Interactive Availability Toggle Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
                className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-full border transition shadow-sm ${currentCfg.badgeClass}`}
                title="Click to change your duty availability"
              >
                <span className={`w-2 h-2 rounded-full ring-4 ${currentCfg.dotClass} animate-pulse shrink-0`}></span>
                <span className="truncate max-w-[80px] sm:max-w-none">{currentCfg.label}</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70 shrink-0" />
              </button>

              {statusDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setStatusDropdownOpen(false)}
                  ></div>
                  <div className="absolute right-0 mt-2 w-56 sm:w-64 max-w-[90vw] bg-slate-800 border border-slate-700 rounded-2xl shadow-xl p-2 z-50 text-xs animate-fadeIn">
                    <p className="px-3 py-1.5 text-[10px] uppercase font-bold text-slate-400 tracking-wider border-b border-slate-700/60 mb-1">
                      Set Duty Availability
                    </p>
                    {Object.entries(statusConfigs).map(([key, cfg]) => {
                      const isSelected = currentStatus === key;
                      return (
                        <button
                          key={key}
                          type="button"
                          disabled={updatingStatus}
                          onClick={() => handleStatusChange(key)}
                          className={`w-full flex items-start gap-2.5 p-2.5 rounded-xl transition text-left ${
                            isSelected
                              ? 'bg-slate-700/80 text-white font-semibold'
                              : 'text-slate-300 hover:bg-slate-700/40 hover:text-white'
                          }`}
                        >
                          <span className={`w-2.5 h-2.5 rounded-full mt-1 shrink-0 ${cfg.dotClass}`}></span>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-xs">{cfg.label}</span>
                              {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                            </div>
                            <p className="text-[10px] text-slate-400 mt-0.5">{cfg.description}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>

            <button
              onClick={handleLogout}
              className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-xl transition shrink-0"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="max-w-4xl mx-auto px-3 sm:px-4 flex items-center gap-1 border-t border-slate-800/80 overflow-x-auto no-scrollbar">
          <Link
            to="/tech"
            className={`flex items-center gap-2 px-3 sm:px-4 py-2.5 text-xs font-semibold border-b-2 transition shrink-0 ${
              isOrdersActive
                ? 'border-amber-400 text-amber-400 bg-slate-800/40'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/20'
            }`}
          >
            <ClipboardList className="w-4 h-4" />
            <span>Field Work Orders</span>
          </Link>

          <Link
            to="/tech/profile"
            className={`flex items-center gap-2 px-3 sm:px-4 py-2.5 text-xs font-semibold border-b-2 transition shrink-0 ${
              isProfileActive
                ? 'border-amber-400 text-amber-400 bg-slate-800/40'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/20'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Technician Profile</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-4xl w-full mx-auto p-3 sm:p-6">
        <Outlet />
      </main>
    </div>
  );
};
```

---

## <a id="file-21"></a>[21] `web/src/components/MetricCard.jsx`

- **Path:** `Power-Pulse-main/web/src/components/MetricCard.jsx`  
- **Language:** `jsx`  
- **Lines of Code:** `29` lines  

```jsx
import React from 'react';

export const MetricCard = ({ title, value, subtext, icon: Icon, color = 'blue' }) => {
  const colorMap = {
    red: 'bg-red-50 text-red-600 border-red-200',
    amber: 'bg-amber-50 text-amber-600 border-amber-200',
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    blue: 'bg-sky-50 text-sky-600 border-sky-200',
    purple: 'bg-purple-50 text-purple-600 border-purple-200'
  };

  return (
    <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-sm hover:shadow transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{title}</p>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">{value}</h3>
          {subtext && <p className="text-xs text-slate-500 mt-1">{subtext}</p>}
        </div>
        {Icon && (
          <div className={`p-3 rounded-lg border ${colorMap[color] || colorMap.blue}`}>
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>
    </div>
  );
};
```

---

## <a id="file-22"></a>[22] `web/src/components/Modal.jsx`

- **Path:** `Power-Pulse-main/web/src/components/Modal.jsx`  
- **Language:** `jsx`  
- **Lines of Code:** `40` lines  

```jsx
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

export const Modal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200">
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-slate-100">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 truncate pr-2">{title}</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4 sm:p-6">{children}</div>
      </div>
    </div>,
    document.body
  );
};
```

---

## <a id="file-23"></a>[23] `web/src/components/StatusBadge.jsx`

- **Path:** `Power-Pulse-main/web/src/components/StatusBadge.jsx`  
- **Language:** `jsx`  
- **Lines of Code:** `31` lines  

```jsx
import React from 'react';

export const StatusBadge = ({ status }) => {
  const s = (status || '').toLowerCase();

  const styles = {
    open: 'bg-red-50 text-red-700 border-red-200',
    active: 'bg-red-50 text-red-700 border-red-200',
    restored: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    dismissed: 'bg-slate-100 text-slate-600 border-slate-200',
    pending: 'bg-amber-50 text-amber-700 border-amber-200',
    assigned: 'bg-blue-50 text-blue-700 border-blue-200',
    investigating: 'bg-purple-50 text-purple-700 border-purple-200',
    repairing: 'bg-orange-50 text-orange-700 border-orange-200',
    resolved: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    available: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    busy: 'bg-amber-50 text-amber-700 border-amber-200',
    off: 'bg-slate-100 text-slate-500 border-slate-200',
    paid: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    unpaid: 'bg-red-50 text-red-700 border-red-200',
  };

  const currentStyle = styles[s] || 'bg-slate-100 text-slate-700 border-slate-200';

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border uppercase tracking-wider ${currentStyle}`}>
      {status}
    </span>
  );
};
```

---

## <a id="file-24"></a>[24] `web/src/components/ConfidenceBadge.jsx`

- **Path:** `Power-Pulse-main/web/src/components/ConfidenceBadge.jsx`  
- **Language:** `jsx`  
- **Lines of Code:** `32` lines  

```jsx
import React from 'react';
import { AlertTriangle, CheckCircle, HelpCircle, ShieldAlert } from 'lucide-react';

export const ConfidenceBadge = ({ score, classification }) => {
  const normalizedClass = (classification || 'low').toLowerCase();

  let badgeStyle = 'bg-slate-100 text-slate-700 border-slate-300';
  let Icon = HelpCircle;
  let label = 'Low Confidence';

  if (normalizedClass === 'confirmed' || score >= 90) {
    badgeStyle = 'bg-red-50 text-red-700 border-red-300 ring-1 ring-red-400/30';
    Icon = ShieldAlert;
    label = 'Confirmed Outage';
  } else if (normalizedClass === 'probable' || score >= 70) {
    badgeStyle = 'bg-amber-50 text-amber-700 border-amber-300';
    Icon = AlertTriangle;
    label = 'Probable Outage';
  } else if (normalizedClass === 'possible' || score >= 40) {
    badgeStyle = 'bg-yellow-50 text-yellow-800 border-yellow-300';
    Icon = AlertTriangle;
    label = 'Possible Outage';
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${badgeStyle}`}>
      <Icon className="w-3.5 h-3.5" />
      <span>{label} ({score}%)</span>
    </span>
  );
};
```

---

## <a id="file-25"></a>[25] `web/src/components/OfflineBanner.jsx`

- **Path:** `Power-Pulse-main/web/src/components/OfflineBanner.jsx`  
- **Language:** `jsx`  
- **Lines of Code:** `176` lines  

```jsx
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
```

---

## <a id="file-26"></a>[26] `web/src/components/ErrorBoundary.jsx`

- **Path:** `Power-Pulse-main/web/src/components/ErrorBoundary.jsx`  
- **Language:** `jsx`  
- **Lines of Code:** `62` lines  

```jsx
import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

/**
 * 🛡️ Error Boundary Component
 * Prevents the application from crashing into a blank white screen if any
 * child component throws an unhandled error during rendering.
 */
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[PowerPulse ErrorBoundary Caught]:', error, errorInfo);
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full border border-slate-200 shadow-xl text-center space-y-4">
            <div className="p-3 bg-rose-50 text-rose-600 rounded-2xl w-14 h-14 mx-auto flex items-center justify-center">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Something went wrong</h2>
              <p className="text-xs text-slate-500 mt-1">
                An unexpected error occurred while rendering this view.
              </p>
            </div>
            {this.state.error && (
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-left text-[11px] font-mono text-slate-700 max-h-32 overflow-y-auto">
                {this.state.error.message || String(this.state.error)}
              </div>
            )}
            <button
              onClick={this.handleReload}
              className="w-full py-2.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs transition flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reload Page</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
```

---

## <a id="file-27"></a>[27] `web/src/components/OutageMap.jsx`

- **Path:** `Power-Pulse-main/web/src/components/OutageMap.jsx`  
- **Language:** `jsx`  
- **Lines of Code:** `266` lines  

```jsx
import React, { useMemo, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ConfidenceBadge } from './ConfidenceBadge';

/**
 * 🗺️ OutageMap Component (Interactive Leaflet Map)
 * ============================================================================
 * Key Enhancements:
 * 1. ESRI World Street Map: Clean, high-definition English typography without font/box (tofu) errors.
 * 2. AutoFitBounds: Automatically zooms and centers the viewport to frame all Dhaka locations perfectly.
 * 3. Permanent Area Labels: Every marker displays its area name (e.g. "Mirpur-10", "Dhanmondi 32")
 *    directly on the map so users never have to guess or click to see the area name.
 * 4. Pulsing Red Pin with Confidence Score for blackouts vs Green Pin for online feeders.
 * ============================================================================
 */

// Helper component: Automatically frames the map to fit all locations comfortably
function AutoFitBounds({ locations = [] }) {
  const map = useMap();
  useEffect(() => {
    map.invalidateSize();
    const valid = locations.filter((l) => !isNaN(parseFloat(l.latitude)) && !isNaN(parseFloat(l.longitude)));
    if (valid.length > 0) {
      const bounds = L.latLngBounds(valid.map((l) => [parseFloat(l.latitude), parseFloat(l.longitude)]));
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
    }
  }, [locations, map]);
  return null;
}

// Helper to create modern SVG HTML markers
const createCustomMarker = (hasOutage, confidenceScore = 0) => {
  if (hasOutage) {
    // 🔴 1. Critical Blackout / Confirmed Outage (> 80%)
    if (confidenceScore > 80) {
      return L.divIcon({
        className: 'custom-outage-marker-red',
        html: `
          <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 42px; height: 42px;">
            <!-- Pulsing Wave Animation Red -->
            <span style="position: absolute; width: 100%; height: 100%; border-radius: 50%; background-color: rgba(239, 68, 68, 0.45); animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></span>
            <!-- Center Pin Icon Red -->
            <div style="position: relative; width: 30px; height: 30px; border-radius: 50%; background: linear-gradient(135deg, #ef4444, #b91c1c); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(239, 68, 68, 0.5); border: 2.5px solid #ffffff; color: white;">
              <svg style="width: 16px; height: 16px;" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
              </svg>
            </div>
            <!-- Score Pill Red -->
            <span style="position: absolute; top: -8px; background-color: #ef4444; color: #ffffff; font-size: 10px; font-weight: 800; padding: 1px 5px; border-radius: 9999px; border: 1.5px solid #ffffff; box-shadow: 0 2px 4px rgba(0,0,0,0.2); white-space: nowrap;">
              ${confidenceScore}%
            </span>
          </div>
        `,
        iconSize: [42, 42],
        iconAnchor: [21, 21],
        popupAnchor: [0, -22]
      });
    }

    // 🟡 2. Warning / Potential Outage (<= 80%)
    return L.divIcon({
      className: 'custom-outage-marker-warning',
      html: `
        <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 42px; height: 42px;">
          <!-- Pulsing Wave Animation Amber/Warning -->
          <span style="position: absolute; width: 100%; height: 100%; border-radius: 50%; background-color: rgba(245, 158, 11, 0.45); animation: ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite;"></span>
          <!-- Center Pin Icon Amber -->
          <div style="position: relative; width: 30px; height: 30px; border-radius: 50%; background: linear-gradient(135deg, #f59e0b, #d97706); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(245, 158, 11, 0.5); border: 2.5px solid #ffffff; color: white;">
            <svg style="width: 16px; height: 16px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </div>
          <!-- Score Pill Amber/Warning -->
          <span style="position: absolute; top: -8px; background-color: #f59e0b; color: #ffffff; font-size: 10px; font-weight: 800; padding: 1px 5px; border-radius: 9999px; border: 1.5px solid #ffffff; box-shadow: 0 2px 4px rgba(0,0,0,0.2); white-space: nowrap;">
            ${confidenceScore}%
          </span>
        </div>
      `,
      iconSize: [42, 42],
      iconAnchor: [21, 21],
      popupAnchor: [0, -22]
    });
  }

  // 🟢 3. Normal / Online Pin
  return L.divIcon({
    className: 'custom-online-marker',
    html: `
      <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 32px; height: 32px;">
        <div style="width: 24px; height: 24px; border-radius: 50%; background: linear-gradient(135deg, #10b981, #047857); display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 6px rgba(16, 185, 129, 0.4); border: 2px solid #ffffff; color: white;">
          <svg style="width: 14px; height: 14px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16]
  });
};

export const OutageMap = ({
  locations = [],
  activeIncidents = [],
  height = '440px',
  center = [23.785, 90.395], // Dhaka center
  zoom = 13
}) => {
  // Map incident lookup by location_id
  const incidentByLocation = useMemo(() => {
    const map = new Map();
    activeIncidents.forEach((inc) => {
      map.set(Number(inc.location_id), inc);
    });
    return map;
  }, [activeIncidents]);

  return (
    <div
      style={{ height, width: '100%' }}
      className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm relative z-0"
    >
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <AutoFitBounds locations={locations} />

        {/* 🗺️ High-Resolution ESRI World Street Map (Clean English typography, no boxes/tofu, no watermark) */}
        <TileLayer
          attribution='Tiles &copy; Esri &mdash; Street Map'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
          maxZoom={18}
        />

        {locations.map((loc) => {
          const lat = parseFloat(loc.latitude);
          const lng = parseFloat(loc.longitude);
          if (isNaN(lat) || isNaN(lng)) return null;

          const activeOutage = incidentByLocation.get(Number(loc.location_id));
          const hasOutage = Boolean(activeOutage);
          const score = Number(activeOutage?.confidence_score || 0);
          const isCriticalOutage = hasOutage && score > 80;
          const isWarningOutage = hasOutage && score <= 80;
          const icon = createCustomMarker(hasOutage, score);

          return (
            <Marker
              key={loc.location_id}
              position={[lat, lng]}
              icon={icon}
            >
              {/* 🏷️ Permanent Area Name Tag on the Map */}
              <Tooltip
                permanent
                direction="bottom"
                offset={[0, 14]}
                className="powerpulse-area-tooltip"
              >
                <div className="flex items-center gap-1">
                  {hasOutage && (
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isCriticalOutage ? 'bg-red-500' : 'bg-amber-500'
                      } animate-pulse`}
                    ></span>
                  )}
                  <span
                    className={
                      !hasOutage
                        ? 'text-slate-800 font-semibold'
                        : isCriticalOutage
                        ? 'text-red-700 font-bold'
                        : 'text-amber-700 font-bold'
                    }
                  >
                    {loc.area}
                  </span>
                </div>
              </Tooltip>

              <Popup className="powerpulse-map-popup">
                <div className="p-1 space-y-2 text-xs" style={{ minWidth: '190px' }}>
                  <div className="border-b border-slate-100 pb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {loc.district} • {loc.zone}
                    </span>
                    <h4 className="font-bold text-sm text-slate-900 mt-0.5">
                      {loc.area}
                    </h4>
                  </div>

                  {hasOutage ? (
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span
                          className={`${
                            isCriticalOutage ? 'text-red-600' : 'text-amber-600'
                          } font-bold flex items-center gap-1`}
                        >
                          <span
                            className={`w-2 h-2 rounded-full ${
                              isCriticalOutage ? 'bg-red-500' : 'bg-amber-500'
                            } animate-pulse`}
                          ></span>
                          {isCriticalOutage ? 'Confirmed Outage' : 'Potential Outage / Warning'}
                        </span>
                        <span className="font-mono text-[10px] text-slate-500">
                          #{activeOutage.incident_id}
                        </span>
                      </div>
                      <div className="pt-1">
                        <ConfidenceBadge
                          score={activeOutage.confidence_score}
                          classification={activeOutage.classification}
                        />
                      </div>
                      <p className="text-[11px] text-slate-600">
                        {activeOutage.total_reports || 0} reports from {activeOutage.reporting_users || 0} residents.
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-emerald-700 font-semibold py-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      <span>Power Grid Normal & Online</span>
                    </div>
                  )}

                  <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-100 flex justify-between font-mono">
                    <span>{lat.toFixed(4)}°N</span>
                    <span>{lng.toFixed(4)}°E</span>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* Floating Map Legend */}
      <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 z-[1000] bg-white/95 backdrop-blur-md px-2.5 py-1.5 sm:px-3.5 sm:py-2.5 rounded-xl border border-slate-200/90 shadow-md text-[10px] sm:text-[11px] space-y-1 sm:space-y-1.5 max-w-[85vw] pointer-events-auto">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-500 animate-pulse shrink-0"></span>
          <span className="font-bold text-red-700">Confirmed (&gt; 80%)</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-amber-500 animate-pulse shrink-0"></span>
          <span className="font-semibold text-amber-700">Warning (&le; 80%)</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-500 shrink-0"></span>
          <span className="font-medium text-slate-700">Grid Normal</span>
        </div>
      </div>
    </div>
  );
};
```

---


# SECTION 4: FRONTEND PAGES (AUTH, CONSUMER, ADMIN, TECH)
_All 20 full application pages for authentication, citizen reporting, executive dashboard, and field technician dispatch._

---

## <a id="file-28"></a>[28] `web/src/pages/Login.jsx`

- **Path:** `Power-Pulse-main/web/src/pages/Login.jsx`  
- **Language:** `jsx`  
- **Lines of Code:** `431` lines  

```jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { 
  Zap, User, AlertCircle, 
  ArrowRight, Eye, EyeOff, UserPlus, CheckCircle2,
  Lock, Mail, Phone
} from 'lucide-react';

export const Login = ({ initialMode = 'login' }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();

  // Mode: 'login' or 'register'
  const isRegisterRoute = location.pathname === '/register' || initialMode === 'register';
  const [mode, setMode] = useState(isRegisterRoute ? 'register' : 'login');

  // Keep mode in sync if user navigates via browser back/forward
  useEffect(() => {
    if (location.pathname === '/register') {
      setMode('register');
    } else if (location.pathname === '/login') {
      setMode('login');
    }
  }, [location.pathname]);

  // --- Login State ---
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // --- Registration State ---
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regLocationId, setRegLocationId] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [locations, setLocations] = useState([]);

  // Shared state
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch municipal locations for registration dropdown
  useEffect(() => {
    api.get('/locations')
      .then(res => {
        const locs = res.data.locations || [];
        setLocations(locs);
        if (locs.length > 0 && !regLocationId) {
          setRegLocationId(locs[0].location_id);
        }
      })
      .catch(err => console.error('Error fetching locations:', err));
  }, []);

  // Switch between Sign In and Create Account tabs
  const handleTabSwitch = (newMode) => {
    setMode(newMode);
    setError('');
    setSuccessMsg('');
    if (newMode === 'register') {
      navigate('/register', { replace: true });
    } else {
      navigate('/login', { replace: true });
    }
  };

  const handleConfigServerIp = () => {
    const current = localStorage.getItem('powerpulse_server_ip') || '192.168.0.181';
    const newIp = window.prompt('PowerPulse Backend Server IP (Laptop Wi-Fi IP):', current);
    if (newIp && newIp.trim()) {
      localStorage.setItem('powerpulse_server_ip', newIp.trim());
      window.location.reload();
    }
  };

  // Handle Login submission
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user = await login(loginEmail, loginPassword);
      if (user.role === 'admin') {
        navigate('/admin');
      } else if (user.role === 'technician') {
        navigate('/tech');
      } else {
        navigate('/consumer');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Register submission
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (regPassword !== regConfirmPassword) {
      setError('Passwords do not match. Please re-enter.');
      return;
    }

    if (regPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);

    try {
      await api.post('/auth/register', {
        name: regName.trim(),
        email: regEmail.trim(),
        phone: regPhone.trim() || null,
        password: regPassword,
        location_id: regLocationId || 1
      });

      setSuccessMsg('Account created successfully! Logging you in...');
      
      // Automatically log the newly registered consumer in
      await login(regEmail.trim(), regPassword);
      navigate('/consumer');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Please check your details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full my-6">
        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-sky-500/20 text-sky-400 rounded-2xl mb-3 border border-sky-500/30 shadow-lg shadow-sky-500/10">
            <Zap className="w-8 h-8 fill-sky-400" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">PowerPulse</h1>
          <p className="text-xs text-slate-400 mt-1">
            Smart Electricity Outage Intelligence & Grid Management
          </p>
          <span className="inline-block mt-2 px-3 py-0.5 rounded-full text-[11px] font-medium bg-slate-800/80 text-sky-400 border border-slate-700/80">
            Official Utility & Consumer Access Portal
          </span>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200">
          {/* Segmented Mode Switcher (Sign In vs Create Account) */}
          <div className="flex p-1 bg-slate-100 rounded-2xl mb-6">
            <button
              type="button"
              onClick={() => handleTabSwitch('login')}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                mode === 'login'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
            <button
              type="button"
              onClick={() => handleTabSwitch('register')}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                mode === 'register'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Create Account</span>
            </button>
          </div>

          {/* Feedback Alerts */}
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* ========================================= */}
          {/* TAB 1: SIGN IN FORM                       */}
          {/* ========================================= */}
          {mode === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="e.g. tanvir@gmail.com"
                    className="w-full pl-9 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showLoginPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-10 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition p-1"
                    title={showLoginPassword ? 'Hide password' : 'Show password'}
                    tabIndex={-1}
                  >
                    {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-sm shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 disabled:opacity-50 mt-2 cursor-pointer"
              >
                <span>{loading ? 'Signing In...' : 'Sign In to Portal'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => handleTabSwitch('register')}
                  className="text-xs text-slate-500 hover:text-slate-800 transition cursor-pointer"
                >
                  Don't have an account yet? <span className="text-sky-600 font-semibold underline">Create one now</span>
                </button>
              </div>
            </form>
          ) : (
            /* ========================================= */
            /* TAB 2: CREATE CITIZEN ACCOUNT FORM        */
            /* ========================================= */
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="e.g. Tanvir Ahmed"
                    className="w-full pl-9 pr-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="e.g. tanvir@gmail.com"
                    className="w-full pl-9 pr-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="tel"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      placeholder="017xxxxxxxx"
                      className="w-full pl-9 pr-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Municipal Zone *
                  </label>
                  <select
                    required
                    value={regLocationId}
                    onChange={(e) => setRegLocationId(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition bg-white"
                  >
                    {locations.map((loc) => (
                      <option key={loc.location_id} value={loc.location_id}>
                        {loc.area} ({loc.district})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Password *
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showRegPassword ? 'text' : 'password'}
                      required
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="Min 6 characters"
                      className="w-full pl-9 pr-8 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowRegPassword(!showRegPassword)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition p-1"
                      tabIndex={-1}
                    >
                      {showRegPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showRegPassword ? 'text' : 'password'}
                      required
                      value={regConfirmPassword}
                      onChange={(e) => setRegConfirmPassword(e.target.value)}
                      placeholder="Re-enter password"
                      className="w-full pl-9 pr-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-sm shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 disabled:opacity-50 mt-1 cursor-pointer"
              >
                <span>{loading ? 'Registering...' : 'Complete Citizen Registration'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={() => handleTabSwitch('login')}
                  className="text-xs text-slate-500 hover:text-slate-800 transition cursor-pointer"
                >
                  Already have an account? <span className="text-sky-600 font-semibold underline">Sign In</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-[11px] text-slate-500 mt-6">
          Authorized Municipal & Consumer Grid Access • PowerPulse Utility Operations
        </p>
        <p className="text-center mt-2">
          <button 
            type="button" 
            onClick={handleConfigServerIp} 
            className="text-[10px] text-slate-500 hover:text-sky-400 transition underline cursor-pointer"
          >
            Server IP: {localStorage.getItem('powerpulse_server_ip') || '192.168.0.181'} (tap to change)
          </button>
        </p>
      </div>
    </div>
  );
};
```

---

## <a id="file-29"></a>[29] `web/src/pages/Register.jsx`

- **Path:** `Power-Pulse-main/web/src/pages/Register.jsx`  
- **Language:** `jsx`  
- **Lines of Code:** `11` lines  

```jsx
import React from 'react';
import { Login } from './Login';

/**
 * Register Page
 * Re-uses the unified, tabbed authentication portal with 'register' mode pre-selected.
 */
export const Register = () => {
  return <Login initialMode="register" />;
};
```

---

## <a id="file-30"></a>[30] `web/src/pages/ConsumerPortal.jsx`

- **Path:** `Power-Pulse-main/web/src/pages/ConsumerPortal.jsx`  
- **Language:** `jsx`  
- **Lines of Code:** `441` lines  

```jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { saveReportOffline, generateUUID } from '../services/offlineQueue';
import { checkRealInternet } from '../services/connectivity';
import { getAutoGpsLocation, triggerAppNotification } from '../services/mobileFeatures';
import {
  OutageReportingCard,
  ComplaintFilingCard,
  PlannedOutagesCard,
  ComplaintHistoryCard,
  SmartMeterCard,
  BillPaymentModal
} from '../features/consumer/components';
import { 
  Zap, 
  MessageSquarePlus, 
  ClipboardList, 
  CreditCard, 
  CalendarClock,
  Sparkles,
  ArrowRight
} from 'lucide-react';

/**
 * 🏠 ConsumerPortal Page Orchestrator (Modular Admin-style 4-Menu Architecture)
 * -----------------------------------------------------------------------------
 * Organizes the citizen experience into 4 dedicated, clutter-free modules:
 * 1. ⚡ Outage & Grid Center (Power OFF / Power Back with Auto-GPS & Scheduled Load-Shedding)
 * 2. 📝 File Complaint (Hazard Photo Proof with Camera, Description, Category)
 * 3. 📋 Track Complaints (Live ticket tracking, status badges, assigned tech)
 * 4. 💳 Smart Meter & Bills (Live IoT usage, bKash/Nagad mock payment)
 */
export const ConsumerPortal = () => {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  // Active Menu: 'outage', 'complaint', 'tracking', 'billing'
  const currentTab = searchParams.get('tab') || 'outage';
  const [activeTab, setActiveTab] = useState(currentTab);

  useEffect(() => {
    const tabFromUrl = searchParams.get('tab') || 'outage';
    setActiveTab(tabFromUrl);
  }, [searchParams]);

  const switchTab = (tabId) => {
    setActiveTab(tabId);
    setSearchParams({ tab: tabId }, { replace: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- State: Live Outage, Complaints, Maintenance Schedules ---
  const [activeOutage, setActiveOutage] = useState(null);
  const [myComplaints, setMyComplaints] = useState([]);
  const [plannedOutages, setPlannedOutages] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- State: Reporting Action & Real-time Evaluation Result ---
  const [reporting, setReporting] = useState(false);
  const [reportResult, setReportResult] = useState(null);
  const [lastReportType, setLastReportType] = useState(null);

  // --- State: Complaint Submission Form ---
  const [category, setCategory] = useState('power_outage');
  const [description, setDescription] = useState('');
  const [complaintSubmitting, setComplaintSubmitting] = useState(false);
  const [complaintMessage, setComplaintMessage] = useState('');

  // --- State: Smart Meter & Simulated Bill Payment ---
  const [bill, setBill] = useState(null);
  const [meterUsage, setMeterUsage] = useState(null);
  const [paying, setPaying] = useState(false);
  const [paymentResult, setPaymentResult] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  /**
   * Fetch all initial dashboard data in parallel
   */
  const fetchConsumerData = async () => {
    try {
      setLoading(true);
      const [incidentRes, complaintRes, plannedRes, billRes, meterRes, myReportsRes] = await Promise.all([
        api.get(`/incidents/active?location_id=${user?.location_id || 1}`).catch(() => ({ data: { incidents: [] } })),
        api.get('/complaints/mine').catch(() => ({ data: { complaints: [] } })),
        api.get(`/planned?location_id=${user?.location_id || 1}`).catch(() => ({ data: { planned: [] } })),
        api.get('/bills/current').catch(() => ({ data: { bill: null } })),
        api.get('/meter/usage').catch(() => ({ data: null })),
        api.get('/reports/mine').catch(() => ({ data: { reports: [] } }))
      ]);

      const active = incidentRes.data.incidents?.[0] || null;
      setActiveOutage(active);
      setMyComplaints(complaintRes.data.complaints || []);
      setPlannedOutages(plannedRes.data.planned || []);
      setBill(billRes.data.bill || null);
      setMeterUsage(meterRes.data || null);

      const recentReport = myReportsRes.data?.reports?.[0];
      if (recentReport) {
        setLastReportType(recentReport.type);
      }
    } catch (err) {
      console.error('Error fetching consumer data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConsumerData();
  }, [user]);

  /**
   * Handle Power OFF / Power Restored Action with Mobile GPS
   */
  const handleReport = async (type) => {
    try {
      setReporting(true);
      setReportResult(null);

      // Auto-capture GPS coordinates on mobile
      const gps = await getAutoGpsLocation();

      // Check real connectivity
      const online = await checkRealInternet();
      if (!online) {
        saveReportOffline({
          type,
          location_id: user?.location_id || 1,
          latitude: gps?.latitude,
          longitude: gps?.longitude
        });
        setReportResult({
          type,
          message: 'Saved to offline queue. Will auto-sync when network returns.',
          isOffline: true,
          gps,
          queuedAt: new Date().toLocaleTimeString()
        });
        triggerAppNotification('⚡ Offline Outage Saved', 'Report queued locally. Will auto-sync when internet returns.');
        return;
      }

      // Online submission with unique client UUID
      const clientUuid = generateUUID();
      const res = await api.post('/reports', {
        type,
        location_id: user?.location_id || 1,
        client_uuid: clientUuid,
        reported_at: new Date().toISOString(),
        latitude: gps?.latitude,
        longitude: gps?.longitude
      });

      setLastReportType(type);

      setReportResult({
        type,
        message: res.data.message,
        isDuplicate: res.data.isDuplicate,
        isSpam: res.data.isSpam,
        evaluation: res.data.evaluation,
        gps
      });

      triggerAppNotification(
        type === 'OFF' ? '⚠️ Power Failure Reported' : '💡 Power Restored Signal',
        `Status recorded for ${user?.area || 'your area'}. Auto-verifying with community grid.`
      );

      fetchConsumerData();
    } catch (err) {
      if (!err.response || err.code === 'ERR_NETWORK') {
        saveReportOffline({
          type,
          location_id: user?.location_id || 1
        });
        setReportResult({
          type,
          message: 'Network dropped during submission. Report saved safely to offline queue.',
          isOffline: true,
          queuedAt: new Date().toLocaleTimeString()
        });
      } else {
        alert(err.response?.data?.error || 'Failed to submit report');
      }
    } finally {
      setReporting(false);
    }
  };

  /**
   * Handle Electrical Hazard Ticket Submission
   */
  const handleComplaintSubmit = async (e) => {
    e.preventDefault();
    try {
      setComplaintSubmitting(true);
      await api.post('/complaints', {
        category,
        description,
        incident_id: activeOutage?.incident_id || null
      });

      setComplaintMessage('Complaint filed successfully. A field technician will be assigned.');
      setDescription('');
      fetchConsumerData();
      setTimeout(() => setComplaintMessage(''), 4000);
      
      // Auto-redirect to tracking tab to see the new ticket
      setTimeout(() => switchTab('tracking'), 1500);
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to submit complaint');
    } finally {
      setComplaintSubmitting(false);
    }
  };

  /**
   * Handle bKash Utility Bill Payment via TrxID
   */
  const handlePayBill = async ({ transaction_id, sender_phone }) => {
    if (!bill) return;
    try {
      setPaying(true);
      const res = await api.post(`/bills/${bill.bill_id}/pay`, {
        transaction_id,
        sender_phone,
        payment_method: 'bKash'
      });
      setPaymentResult(res.data);
      setShowPaymentModal(false);
      fetchConsumerData();
    } catch (err) {
      alert(err.response?.data?.error || 'Payment failed');
    } finally {
      setPaying(false);
    }
  };

  // Menu Definition
  const menuItems = [
    {
      id: 'outage',
      title: 'Outage Center',
      subtitle: 'Power OFF / BACK & Grid Status',
      icon: Zap,
      badge: activeOutage ? 'Outage Active' : 'Grid Normal',
      badgeColor: activeOutage ? 'bg-rose-500/20 text-rose-400 border-rose-500/30' : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      activeGradient: 'from-sky-600 to-blue-600 text-white'
    },
    {
      id: 'complaint',
      title: 'File Complaint',
      subtitle: 'Photo Proof & Hazard Reports',
      icon: MessageSquarePlus,
      badge: 'Camera Enabled',
      badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
      activeGradient: 'from-amber-600 to-orange-600 text-white'
    },
    {
      id: 'tracking',
      title: 'Track Tickets',
      subtitle: 'Live Status & Technician',
      icon: ClipboardList,
      badge: `${myComplaints.length} Tickets`,
      badgeColor: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
      activeGradient: 'from-indigo-600 to-purple-600 text-white'
    },
    {
      id: 'billing',
      title: 'Smart Meter & Pay',
      subtitle: 'IoT Usage & Instant Top-up',
      icon: CreditCard,
      badge: bill ? `Due: ৳${bill.amount}` : 'Paid',
      badgeColor: bill && bill.status !== 'PAID' ? 'bg-rose-500/20 text-rose-400 border-rose-500/30' : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      activeGradient: 'from-emerald-600 to-teal-600 text-white'
    }
  ];

  return (
    <div className="space-y-6 animate-fadeIn pb-16 sm:pb-8">
      
      {/* 🧭 Admin-Style Segmented Navigation Cards (4 Clean Modular Menus) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => switchTab(item.id)}
              className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer relative overflow-hidden group shadow-xs ${
                isActive
                  ? `bg-gradient-to-br ${item.activeGradient} shadow-md border-transparent scale-[1.01]`
                  : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-xl transition ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700 group-hover:bg-slate-200'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                  isActive ? 'bg-white/25 text-white border-white/30' : item.badgeColor
                }`}>
                  {item.badge}
                </span>
              </div>
              <h3 className={`font-bold text-xs sm:text-sm tracking-tight truncate ${
                isActive ? 'text-white' : 'text-slate-900'
              }`}>
                {item.title}
              </h3>
              <p className={`text-[11px] truncate mt-0.5 ${
                isActive ? 'text-white/80' : 'text-slate-500'
              }`}>
                {item.subtitle}
              </p>
            </button>
          );
        })}
      </div>

      {/* ======================================================== */}
      {/* TAB 1: OUTAGE & GRID CENTER                              */}
      {/* ======================================================== */}
      {activeTab === 'outage' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Main Power ON / OFF Reporting Card */}
          <OutageReportingCard
            activeOutage={activeOutage}
            reporting={reporting}
            reportResult={reportResult}
            onReport={handleReport}
            lastReportType={lastReportType}
          />

          {/* Scheduled Load-Shedding & Grid Maintenance */}
          <PlannedOutagesCard plannedOutages={plannedOutages} />

          {/* Quick Action Suggestion Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-50 to-indigo-50 border border-sky-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-sky-500/20 text-sky-600 rounded-xl shrink-0">
                <MessageSquarePlus className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Facing physical electrical damage or spark?</p>
                <p className="text-[11px] text-slate-500">File an instant hazard ticket with camera photo proof for field technicians.</p>
              </div>
            </div>
            <button
              onClick={() => switchTab('complaint')}
              className="px-3.5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs transition flex items-center gap-1.5 shadow-xs shrink-0 cursor-pointer"
            >
              <span>File Complaint</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: FILE ELECTRICAL COMPLAINT WITH CAMERA             */}
      {/* ======================================================== */}
      {activeTab === 'complaint' && (
        <div className="space-y-6 animate-fadeIn max-w-2xl mx-auto">
          <div className="bg-sky-50 border border-sky-200/80 rounded-2xl p-4 flex items-center gap-3 text-sky-900 text-xs">
            <Sparkles className="w-5 h-5 text-sky-600 shrink-0" />
            <div>
              <span className="font-bold">Mobile Camera Feature Active:</span> You can take a real-time photo of burnt wires, transformer sparks, or low-voltage meters to give field technicians visual evidence!
            </div>
          </div>

          <ComplaintFilingCard
            category={category}
            onCategoryChange={setCategory}
            description={description}
            onDescriptionChange={setDescription}
            submitting={complaintSubmitting}
            successMessage={complaintMessage}
            onSubmit={handleComplaintSubmit}
          />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 3: TICKET TRACKING & HISTORY                         */}
      {/* ======================================================== */}
      {activeTab === 'tracking' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-base font-bold text-slate-900 tracking-tight">Complaint Tracking Desk</h2>
              <p className="text-xs text-slate-500">Real-time status of all your reported electrical tickets & dispatched technicians.</p>
            </div>
            <button
              onClick={() => switchTab('complaint')}
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
            >
              <MessageSquarePlus className="w-3.5 h-3.5" />
              <span>+ New Complaint</span>
            </button>
          </div>

          <ComplaintHistoryCard complaints={myComplaints} />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 4: SMART METER & BILL PAYMENT (bKash/Nagad)          */}
      {/* ======================================================== */}
      {activeTab === 'billing' && (
        <div className="space-y-6 animate-fadeIn max-w-2xl mx-auto">
          <SmartMeterCard
            bill={bill}
            paymentResult={paymentResult}
            onOpenPaymentModal={() => setShowPaymentModal(true)}
          />

          {/* bKash Bill Payment Modal */}
          {showPaymentModal && (
            <BillPaymentModal
              bill={bill}
              paying={paying}
              onPay={handlePayBill}
              onClose={() => setShowPaymentModal(false)}
            />
          )}
        </div>
      )}

    </div>
  );
};
```

---

## <a id="file-31"></a>[31] `web/src/pages/ConsumerActiveOutages.jsx`

- **Path:** `Power-Pulse-main/web/src/pages/ConsumerActiveOutages.jsx`  
- **Language:** `jsx`  
- **Lines of Code:** `266` lines  

```jsx
import React, { useState, useEffect, useMemo } from 'react';
import api from '../services/api';
import { ConfidenceBadge } from '../components/ConfidenceBadge';
import { StatusBadge } from '../components/StatusBadge';
import { OutageMap } from '../components/OutageMap';
import { 
  AlertOctagon, RefreshCw, CheckCircle2, Clock, 
  MapPin, Users, Map as MapIcon, LayoutGrid, Search
} from 'lucide-react';

export const ConsumerActiveOutages = () => {
  const [incidents, setIncidents] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('both'); // 'both', 'map', 'list'

  const [searchQuery, setSearchQuery] = useState('');
  const [classFilter, setClassFilter] = useState('all');
  const [sortBy, setSortBy] = useState('confidence-desc');

  const fetchData = async () => {
    try {
      setLoading(true);
      const [incRes, locRes] = await Promise.all([
        api.get('/incidents/active'),
        api.get('/locations')
      ]);
      setIncidents(incRes.data.incidents || []);
      setLocations(locRes.data.locations || []);
    } catch (err) {
      console.error('Error fetching active outages:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredIncidents = useMemo(() => {
    return incidents.filter(i => {
      if (classFilter !== 'all' && (i.classification || '').toLowerCase() !== classFilter.toLowerCase()) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchId = String(i.incident_id || '').toLowerCase().includes(q);
        const matchArea = (i.area || '').toLowerCase().includes(q);
        const matchDistrict = (i.district || '').toLowerCase().includes(q);
        const matchZone = (i.zone || '').toLowerCase().includes(q);
        if (!matchId && !matchArea && !matchDistrict && !matchZone) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'confidence-desc') return (b.confidence_score || 0) - (a.confidence_score || 0);
      if (sortBy === 'reports-desc') return (b.total_reports || 0) - (a.total_reports || 0);
      if (sortBy === 'newest') return new Date(b.start_time) - new Date(a.start_time);
      if (sortBy === 'area-asc') return (a.area || '').localeCompare(b.area || '');
      return 0;
    });
  }, [incidents, searchQuery, classFilter, sortBy]);

  const hasActiveFilters = searchQuery.trim() !== '' || classFilter !== 'all' || sortBy !== 'confidence-desc';

  const clearFilters = () => {
    setSearchQuery('');
    setClassFilter('all');
    setSortBy('confidence-desc');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Header & View Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Active Outages Nearby</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time interactive municipal map of corroborated power failures across Dhaka
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* View Mode Toggle Buttons */}
          <div className="flex items-center p-1 bg-white border border-slate-200 rounded-xl shadow-xs text-xs font-semibold text-slate-600">
            <button
              onClick={() => setViewMode('both')}
              className={`px-2.5 py-1.5 rounded-lg transition ${
                viewMode === 'both' ? 'bg-sky-50 text-sky-700 font-bold' : 'hover:text-slate-900'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition ${
                viewMode === 'map' ? 'bg-sky-50 text-sky-700 font-bold' : 'hover:text-slate-900'
              }`}
            >
              <MapIcon className="w-3.5 h-3.5" />
              <span>Map</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition ${
                viewMode === 'list' ? 'bg-sky-50 text-sky-700 font-bold' : 'hover:text-slate-900'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Cards</span>
            </button>
          </div>

          <button
            onClick={fetchData}
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-xs transition"
            title="Refresh Grid Data"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* 🗺️ 1. Interactive Leaflet Map View */}
      {(viewMode === 'both' || viewMode === 'map') && (
        <div className="space-y-2">
          <OutageMap
            locations={locations}
            activeIncidents={incidents}
            height="390px"
          />
        </div>
      )}

      {/* 📋 2. Incidents Cards Grid */}
      {(viewMode === 'both' || viewMode === 'list') && (
        <div className="space-y-4">
          {incidents.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
              <h3 className="font-bold text-slate-900 text-base">All Municipal Zones Online</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                There are currently no active community-wide electricity outages detected across Dhaka.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Filter & Search Bar */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search by area, district, zone..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition"
                    />
                  </div>

                  <div>
                    <select
                      value={classFilter}
                      onChange={(e) => setClassFilter(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-700 capitalize font-medium transition"
                    >
                      <option value="all">All Classifications</option>
                      <option value="confirmed">Confirmed Outages</option>
                      <option value="probable">Probable Outages</option>
                      <option value="possible">Possible Outages</option>
                      <option value="low">Low Severity</option>
                    </select>
                  </div>

                  <div className="flex gap-2">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-700 font-medium transition"
                    >
                      <option value="confidence-desc">Highest Confidence</option>
                      <option value="reports-desc">Most Reports</option>
                      <option value="newest">Recently Detected</option>
                      <option value="area-asc">Area (A-Z)</option>
                    </select>

                    {hasActiveFilters && (
                      <button
                        onClick={clearFilters}
                        className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold text-xs transition whitespace-nowrap"
                      >
                        Reset
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 px-1">
                <span>Showing <strong>{filteredIncidents.length}</strong> of <strong>{incidents.length}</strong> active outages</span>
                {hasActiveFilters && <span className="text-sky-600 font-medium">Filters active</span>}
              </div>

              {filteredIncidents.length === 0 ? (
                <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 shadow-sm">
                  <p className="font-semibold text-slate-600 mb-0.5 text-xs">No active outages match your filter</p>
                  <p className="text-[11px] text-slate-400">Try adjusting your search query or reset the filters.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredIncidents.map((incident) => (
                    <div
                      key={incident.incident_id}
                      className="bg-white rounded-2xl p-5 border border-red-200/80 shadow-sm space-y-4 hover:border-red-300 transition"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <div className="p-2 bg-rose-50 text-rose-600 rounded-xl">
                            <AlertOctagon className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-900 text-sm">{incident.area}</h3>
                            <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                              <MapPin className="w-3 h-3 text-slate-400" />
                              <span>{incident.district} • {incident.zone}</span>
                            </p>
                          </div>
                        </div>
                        <StatusBadge status={incident.type} />
                      </div>

                      <div className="pt-2">
                        <ConfidenceBadge
                          score={incident.confidence_score}
                          classification={incident.classification}
                        />
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                        <span className="flex items-center gap-1.5 font-medium">
                          <Users className="w-4 h-4 text-sky-600" />
                          <span>{incident.total_reports} reports ({incident.reporting_users} users)</span>
                        </span>
                        <span className="flex items-center gap-1.5 font-mono text-[11px] text-slate-500">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>
                            Started:{' '}
                            {new Date(incident.start_time).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
```

---

## <a id="file-32"></a>[32] `web/src/pages/ConsumerOutageHistory.jsx`

- **Path:** `Power-Pulse-main/web/src/pages/ConsumerOutageHistory.jsx`  
- **Language:** `jsx`  
- **Lines of Code:** `201` lines  

```jsx
import React, { useState, useEffect, useMemo } from 'react';
import api from '../services/api';
import { StatusBadge } from '../components/StatusBadge';
import { History, Clock, CheckCircle2, RefreshCw, Calendar, Search } from 'lucide-react';

export const ConsumerOutageHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const res = await api.get('/incidents/history?limit=100');
      setHistory(res.data.incidents || []);
    } catch (err) {
      console.error('Error fetching outage history:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const formatDuration = (mins) => {
    if (!mins) return 'N/A';
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    if (h === 0) return `${m} minutes`;
    return `${h}h ${m}m`;
  };

  const filteredHistory = useMemo(() => {
    return history.filter(item => {
      if (typeFilter !== 'all' && (item.type || '').toLowerCase() !== typeFilter.toLowerCase()) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchId = String(item.incident_id || '').toLowerCase().includes(q);
        const matchArea = (item.area || '').toLowerCase().includes(q);
        const matchZone = (item.zone || '').toLowerCase().includes(q);
        const matchDistrict = (item.district || '').toLowerCase().includes(q);
        if (!matchId && !matchArea && !matchZone && !matchDistrict) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.start_time) - new Date(a.start_time);
      if (sortBy === 'oldest') return new Date(a.start_time) - new Date(b.start_time);
      if (sortBy === 'duration-desc') return (b.duration_minutes || 0) - (a.duration_minutes || 0);
      if (sortBy === 'duration-asc') return (a.duration_minutes || 0) - (b.duration_minutes || 0);
      return 0;
    });
  }, [history, searchQuery, typeFilter, sortBy]);

  const hasActiveFilters = searchQuery.trim() !== '' || typeFilter !== 'all' || sortBy !== 'newest';

  const clearFilters = () => {
    setSearchQuery('');
    setTypeFilter('all');
    setSortBy('newest');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Outage Incident History</h2>
          <p className="text-xs text-slate-500 mt-0.5">Historical record of resolved community power interruptions</p>
        </div>
        <button
          onClick={fetchHistory}
          className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition flex items-center gap-2 text-xs font-semibold shadow-sm self-start sm:self-auto"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by ID, area, zone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition"
            />
          </div>

          <div>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-700 font-medium transition"
            >
              <option value="all">All Outage Types</option>
              <option value="unexpected">Unexpected Grid Tripping</option>
              <option value="planned">Planned Load-Shedding</option>
            </select>
          </div>

          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-700 font-medium transition"
            >
              <option value="newest">Newest Incidents First</option>
              <option value="oldest">Oldest Incidents First</option>
              <option value="duration-desc">Longest Outages</option>
              <option value="duration-asc">Shortest Outages</option>
            </select>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold text-xs transition whitespace-nowrap"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Result Counter */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>Showing <strong>{filteredHistory.length}</strong> of <strong>{history.length}</strong> incidents</span>
        {hasActiveFilters && <span className="text-sky-600 font-medium">Filters active</span>}
      </div>

      {filteredHistory.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 text-center border border-slate-200 shadow-sm">
          <CheckCircle2 className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <h3 className="font-bold text-slate-900 text-sm">No Incidents Found</h3>
          <p className="text-xs text-slate-400 mt-1">
            {hasActiveFilters ? 'No outages match your filter criteria. Try resetting filters.' : 'There are no archived power outages logged for your area.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3.5">
          {filteredHistory.map((item) => (
            <div
              key={item.incident_id}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-300 transition"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-slate-400">#{item.incident_id}</span>
                  <h3 className="font-bold text-slate-900 text-sm">{item.area} ({item.zone})</h3>
                  <StatusBadge status={item.status} />
                  {item.type && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600 capitalize">
                      {item.type}
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-1">
                  <span className="flex items-center gap-1 font-mono">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{new Date(item.start_time).toLocaleDateString()}</span>
                  </span>
                  <span>•</span>
                  <span>
                    Started: <strong>{new Date(item.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</strong>
                  </span>
                  {item.end_time && (
                    <>
                      <span>•</span>
                      <span>
                        Restored: <strong>{new Date(item.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</strong>
                      </span>
                    </>
                  )}
                </div>
              </div>

              <div className="sm:text-right shrink-0">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-100 text-slate-800 font-mono text-xs font-bold">
                  <Clock className="w-3.5 h-3.5 text-sky-600" />
                  <span>Duration: {formatDuration(item.duration_minutes)}</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Corroborated by {item.total_reports || 1} reports
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
```

---

## <a id="file-33"></a>[33] `web/src/pages/ConsumerNotifications.jsx`

- **Path:** `Power-Pulse-main/web/src/pages/ConsumerNotifications.jsx`  
- **Language:** `jsx`  
- **Lines of Code:** `233` lines  

```jsx
import React, { useState, useEffect, useMemo } from 'react';
import api from '../services/api';
import { Bell, Check, RefreshCw, CheckCircle2, ShieldAlert, Search } from 'lucide-react';

export const ConsumerNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [readFilter, setReadFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const fetchNotifications = async (autoMarkSeen = true) => {
    try {
      setLoading(true);
      const res = await api.get('/notifications');
      const items = res.data.notifications || [];

      // If user enters notifications section, automatically mark all as seen/read in backend
      const hasUnread = items.some(n => !n.is_read);
      if (autoMarkSeen && hasUnread) {
        api.patch('/notifications/read-all').catch(err => {
          console.warn('Auto mark-read failed:', err.message);
        });
        // Settle local items as read
        setNotifications(items.map(n => ({ ...n, is_read: 1 })));
        window.dispatchEvent(new CustomEvent('powerpulse-notifications-changed', {
          detail: { unreadCount: 0 }
        }));
      } else {
        setNotifications(items);
      }
    } catch (err) {
      console.error('Error fetching notifications:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications(true);
  }, []);

  // Broadcast unread count changes to ConsumerLayout in real-time
  useEffect(() => {
    const unread = notifications.filter(n => !n.is_read).length;
    window.dispatchEvent(new CustomEvent('powerpulse-notifications-changed', {
      detail: { unreadCount: unread }
    }));
  }, [notifications]);

  const markAsRead = async (id) => {
    try {
      await api.patch(`/notifications/${id}/read`);
      setNotifications(prev =>
        prev.map(n => n.notification_id === id ? { ...n, is_read: 1 } : n)
      );
    } catch (err) {
      console.error('Error marking read:', err);
    }
  };

  const markAllAsRead = async () => {
    try {
      await api.patch('/notifications/read-all');
      setNotifications(prev => prev.map(n => ({ ...n, is_read: 1 })));
    } catch (err) {
      console.error('Error marking all as read:', err);
    }
  };

  const unreadCount = notifications.filter(n => !n.is_read).length;

  const filteredNotifications = useMemo(() => {
    return notifications.filter(n => {
      if (readFilter === 'unread' && n.is_read) return false;
      if (readFilter === 'read' && !n.is_read) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = (n.title || '').toLowerCase().includes(q);
        const matchMsg = (n.message || '').toLowerCase().includes(q);
        if (!matchTitle && !matchMsg) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.created_at) - new Date(a.created_at);
      if (sortBy === 'oldest') return new Date(a.created_at) - new Date(b.created_at);
      return 0;
    });
  }, [notifications, searchQuery, readFilter, sortBy]);

  const hasActiveFilters = searchQuery.trim() !== '' || readFilter !== 'all' || sortBy !== 'newest';

  const clearFilters = () => {
    setSearchQuery('');
    setReadFilter('all');
    setSortBy('newest');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">System & In-App Notifications</h2>
          <p className="text-xs text-slate-500 mt-0.5">Real-time alerts regarding community grid disruptions and ticket updates</p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="px-3 py-2 rounded-xl bg-sky-50 border border-sky-200 text-sky-700 hover:bg-sky-100 transition flex items-center gap-1.5 text-xs font-semibold shadow-sm"
            >
              <CheckCircle2 className="w-4 h-4 text-sky-600" />
              <span>Mark all read ({unreadCount})</span>
            </button>
          )}
          <button
            onClick={fetchNotifications}
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition flex items-center gap-2 text-xs font-semibold shadow-sm"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search notifications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition"
            />
          </div>

          <div>
            <select
              value={readFilter}
              onChange={(e) => setReadFilter(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-700 font-medium transition"
            >
              <option value="all">All Notifications</option>
              <option value="unread">Unread Only</option>
              <option value="read">Read Only</option>
            </select>
          </div>

          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-700 font-medium transition"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold text-xs transition whitespace-nowrap"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>Showing <strong>{filteredNotifications.length}</strong> of <strong>{notifications.length}</strong> notifications</span>
        {hasActiveFilters && <span className="text-sky-600 font-medium">Filters active</span>}
      </div>

      {notifications.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 text-center border border-slate-200 shadow-sm">
          <Bell className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <h3 className="font-bold text-slate-900 text-sm">No Notifications Yet</h3>
          <p className="text-xs text-slate-400 mt-1">You will receive notifications when outages or repair updates occur in your area.</p>
        </div>
      ) : filteredNotifications.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 shadow-sm">
          <p className="font-semibold text-slate-600 mb-0.5 text-xs">No notifications match your filters</p>
          <p className="text-[11px] text-slate-400">Try adjusting your search query or reset the filters.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredNotifications.map((n) => (
            <div
              key={n.notification_id}
              className={`p-4 rounded-2xl border transition flex items-start justify-between gap-3 ${
                n.is_read
                  ? 'bg-white border-slate-200/80 text-slate-600'
                  : 'bg-sky-50/60 border-sky-200 text-slate-900 ring-1 ring-sky-300/40'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-xl mt-0.5 ${
                  n.is_read ? 'bg-slate-100 text-slate-500' : 'bg-sky-500 text-white shadow-sm'
                }`}>
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{n.title}</h4>
                  <p className="text-xs text-slate-600 mt-0.5">{n.message}</p>
                  <span className="block text-[11px] text-slate-400 mt-2 font-mono">
                    {new Date(n.created_at).toLocaleString()}
                  </span>
                </div>
              </div>

              {!n.is_read && (
                <button
                  onClick={() => markAsRead(n.notification_id)}
                  className="p-1.5 rounded-lg text-sky-600 hover:bg-sky-100 transition shrink-0"
                  title="Mark as Read"
                >
                  <Check className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
```

---

## <a id="file-34"></a>[34] `web/src/pages/ConsumerProfile.jsx`

- **Path:** `Power-Pulse-main/web/src/pages/ConsumerProfile.jsx`  
- **Language:** `jsx`  
- **Lines of Code:** `292` lines  

```jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { 
  User, ShieldCheck, MapPin, Mail, Phone, Calendar, 
  Award, Edit3, Save, CheckCircle2, Lock, Eye, EyeOff, X 
} from 'lucide-react';

export const ConsumerProfile = () => {
  const { user, updateUser } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [locations, setLocations] = useState([]);
  
  // Form fields
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [locationId, setLocationId] = useState(user?.location_id || '');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setName(user?.name || '');
    setPhone(user?.phone || '');
    setLocationId(user?.location_id || '');
  }, [user]);

  // Load locations for zone selector dropdown
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await api.get('/locations');
        setLocations(res.data.locations || []);
      } catch (err) {
        console.error('Failed to load locations:', err);
      }
    };
    fetchLocations();
  }, []);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      setSaving(true);
      const payload = {
        name: name.trim(),
        phone: phone.trim() || null,
        location_id: locationId ? Number(locationId) : null
      };

      if (password) {
        if (password.length < 6) {
          setError('New password must be at least 6 characters');
          setSaving(false);
          return;
        }
        payload.password = password;
      }

      const res = await api.patch('/auth/profile', payload);

      if (res.data?.user) {
        updateUser(res.data.user);
        setIsEditing(false);
        setPassword('');
        setMessage('Profile updated successfully!');
        setTimeout(() => setMessage(''), 4000);
      }
    } catch (err) {
      console.error('Update profile error:', err);
      setError(err.response?.data?.error || 'Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const getReliabilityTier = (score) => {
    if (score >= 0.9) return { label: 'Elite Verified Reporter', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
    if (score >= 0.7) return { label: 'Trusted Community Contributor', color: 'text-sky-700 bg-sky-50 border-sky-200' };
    if (score >= 0.4) return { label: 'Standard Reporter', color: 'text-slate-700 bg-slate-100 border-slate-200' };
    return { label: 'Probation / Low Reliability', color: 'text-rose-700 bg-rose-50 border-rose-200' };
  };

  const tier = getReliabilityTier(user?.reliability_score || 0.5);

  return (
    <div className="space-y-6 animate-fadeIn max-w-2xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Consumer Account Profile</h2>
          <p className="text-xs text-slate-500 mt-0.5">Manage your personal credentials, residential feeder zone, and account security</p>
        </div>
        <button
          onClick={() => { setIsEditing(!isEditing); setError(''); }}
          className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition shadow-xs border ${
            isEditing 
              ? 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200' 
              : 'bg-white text-sky-700 border-sky-200 hover:bg-sky-50'
          }`}
        >
          {isEditing ? <X className="w-3.5 h-3.5" /> : <Edit3 className="w-3.5 h-3.5" />}
          <span>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</span>
        </button>
      </div>

      {message && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {error && (
        <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-center gap-2 animate-fadeIn">
          <span>{error}</span>
        </div>
      )}

      {/* Main Profile Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-600 to-sky-400 text-white flex items-center justify-center font-bold text-2xl shadow-md">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">{user?.name}</h3>
            <p className="text-xs text-slate-500">{user?.email}</p>
            <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border capitalize bg-slate-50 text-slate-700 border-slate-200">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
              <span>Role: {user?.role}</span>
            </div>
          </div>
        </div>

        {/* Edit Form or View Grid */}
        {isEditing ? (
          <form onSubmit={handleSaveProfile} className="space-y-4 text-xs animate-fadeIn p-4 rounded-xl bg-slate-50 border border-slate-200">
            <p className="font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-2">Update Account Details</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Mobile Phone Number</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 01712-345678"
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Residential Zone / Feeder *</label>
                <select
                  value={locationId}
                  onChange={(e) => setLocationId(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 capitalize"
                >
                  <option value="">Select your area</option>
                  {locations.map((loc) => (
                    <option key={loc.location_id} value={loc.location_id}>
                      {loc.area} ({loc.district} • {loc.zone})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Change Password (Leave blank to keep current)</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="New password (min 6 chars)"
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 pr-9"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-slate-600 hover:bg-slate-100 font-semibold transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold flex items-center gap-1.5 transition shadow-xs disabled:opacity-50"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{saving ? 'Saving...' : 'Save Profile Changes'}</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
              <Mail className="w-4 h-4 text-slate-400" />
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Email Address</p>
                <p className="font-semibold text-slate-900">{user?.email}</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
              <Phone className="w-4 h-4 text-slate-400" />
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Phone Contact</p>
                <p className="font-semibold text-slate-900">{user?.phone || 'Not provided'}</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
              <MapPin className="w-4 h-4 text-slate-400" />
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Residential Area</p>
                <p className="font-semibold text-slate-900">{user?.area || 'Mirpur-10'}</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
              <Calendar className="w-4 h-4 text-slate-400" />
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">District & Zone</p>
                <p className="font-semibold text-slate-900">{user?.district || 'Dhaka'} • {user?.zone || 'Zone A'}</p>
              </div>
            </div>
          </div>
        )}

        {/* Reliability Score Card */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-md">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              <h4 className="font-bold text-sm">Reporter Reliability Score</h4>
            </div>
            <span className="font-mono text-2xl font-bold text-amber-400">
              {user?.reliability_score || 0.5} / 1.0
            </span>
          </div>

          <div className="w-full bg-slate-700 h-2.5 rounded-full overflow-hidden mb-3">
            <div
              className="bg-amber-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${(user?.reliability_score || 0.5) * 100}%` }}
            ></div>
          </div>

          <div className={`p-2.5 rounded-xl text-xs font-semibold border ${tier.color} text-center`}>
            {tier.label}
          </div>

          <p className="text-[11px] text-slate-400 mt-3 leading-relaxed">
            Your reliability score powers the PowerPulse crowd algorithm. Verified accurate OFF/BACK signals grant <strong className="text-white">+0.02</strong> reputation. False alarms or spam decrease reputation by <strong className="text-rose-400">-0.05</strong>.
          </p>
        </div>
      </div>
    </div>
  );
};
```

---

## <a id="file-35"></a>[35] `web/src/pages/AdminDashboard.jsx`

- **Path:** `Power-Pulse-main/web/src/pages/AdminDashboard.jsx`  
- **Language:** `jsx`  
- **Lines of Code:** `220` lines  

```jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { MetricCard } from '../components/MetricCard';
import { ConfidenceBadge } from '../components/ConfidenceBadge';
import { StatusBadge } from '../components/StatusBadge';
import { 
  AlertOctagon, Clock, MessageSquareWarning, Users, 
  ArrowUpRight, RefreshCw, ZapOff, CheckCircle2 
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell 
} from 'recharts';

export const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [activeIncidents, setActiveIncidents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [analyticsRes, incidentsRes] = await Promise.all([
        api.get('/admin/analytics'),
        api.get('/incidents/active')
      ]);
      setAnalytics(analyticsRes.data);
      setActiveIncidents(incidentsRes.data.incidents || []);
    } catch (err) {
      console.error('Error fetching admin dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatDuration = (mins) => {
    if (!mins) return 'N/A';
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    if (h === 0) return `${m}m`;
    return `${h}h ${m}m`;
  };

  if (loading && !analytics) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const kpi = analytics?.kpi || {};

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Executive Grid Dashboard</h2>
          <p className="text-xs text-slate-500 mt-1">Real-time outage detection, confidence scoring, and dispatch overview</p>
        </div>
        <button
          onClick={fetchData}
          className="inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm transition"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Data</span>
        </button>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <MetricCard
          title="Active Outages"
          value={kpi.activeOutages || 0}
          subtext="Unresolved community incidents"
          icon={ZapOff}
          color="red"
        />
        <MetricCard
          title="Pending Complaints"
          value={kpi.pendingComplaints || 0}
          subtext="Requires field technician dispatch"
          icon={MessageSquareWarning}
          color="amber"
        />
        <MetricCard
          title="Avg Outage Duration"
          value={formatDuration(kpi.avgDurationMinutes)}
          subtext="Calculated across restored incidents"
          icon={Clock}
          color="blue"
        />
        <MetricCard
          title="Active Technicians"
          value={`${kpi.activeTechs || 0} Ready`}
          subtext="Available for rapid dispatch"
          icon={Users}
          color="emerald"
        />
      </div>

      {/* Two Column Layout: Active Incidents & Area Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Live Active Incidents */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
              <h3 className="text-sm font-bold text-slate-900">Active Detected Incidents</h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-red-700 border border-red-200">
                {activeIncidents.length} LIVE
              </span>
            </div>
            <Link
              to="/admin/incidents"
              className="text-xs font-semibold text-sky-600 hover:text-sky-700 inline-flex items-center gap-1"
            >
              <span>Manage Incidents</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {activeIncidents.length === 0 ? (
            <div className="p-8 text-center">
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-700">Grid Operating Normally</p>
              <p className="text-xs text-slate-400 mt-1">No community outages currently detected or active.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-100">
                  <tr>
                    <th className="py-3 px-4">Incident ID</th>
                    <th className="py-3 px-4">Area / Location</th>
                    <th className="py-3 px-4">Confidence Level</th>
                    <th className="py-3 px-4">Signals</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {activeIncidents.map((incident) => (
                    <tr key={incident.incident_id} className="hover:bg-slate-50/80 transition">
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                        #{incident.incident_id}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-900">{incident.area}</div>
                        <div className="text-[11px] text-slate-400">{incident.district} ({incident.zone})</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <ConfidenceBadge
                          score={incident.confidence_score}
                          classification={incident.classification}
                        />
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-slate-900">{incident.total_reports}</span> reports /{' '}
                        <span className="font-semibold text-slate-900">{incident.reporting_users}</span> users
                      </td>
                      <td className="py-3.5 px-4">
                        <StatusBadge status={incident.type} />
                      </td>
                      <td className="py-3.5 px-4">
                        <Link
                          to="/admin/incidents"
                          className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-sky-50 text-sky-700 hover:bg-sky-100 transition"
                        >
                          Review
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Right Column: Outage Frequency by Area Chart */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-slate-900">Area Outage Distribution</h3>
            <p className="text-[11px] text-slate-400 mt-0.5">Top municipal zones experiencing disruptions</p>
          </div>

          <div className="flex-1 min-h-[260px] w-full">
            {analytics?.areaWiseOutages && analytics.areaWiseOutages.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analytics.areaWiseOutages.slice(0, 5)} layout="vertical" margin={{ left: 10, right: 10 }}>
                  <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11 }} />
                  <YAxis type="category" dataKey="area" width={80} tick={{ fontSize: 11 }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', fontSize: '12px', border: '1px solid #e2e8f0' }}
                  />
                  <Bar dataKey="incident_count" fill="#0284c7" radius={[0, 4, 4, 0]}>
                    {analytics.areaWiseOutages.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 ? '#ef4444' : '#0284c7'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-xs text-slate-400">
                No historical area data logged
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
```

---

## <a id="file-36"></a>[36] `web/src/pages/AdminIncidents.jsx`

- **Path:** `Power-Pulse-main/web/src/pages/AdminIncidents.jsx`  
- **Language:** `jsx`  
- **Lines of Code:** `419` lines  

```jsx
import React, { useState, useEffect, useMemo } from 'react';
import api from '../services/api';
import { ConfidenceBadge } from '../components/ConfidenceBadge';
import { StatusBadge } from '../components/StatusBadge';
import { Modal } from '../components/Modal';
import { 
  AlertOctagon, Check, X, RefreshCw, Eye, 
  Clock, ShieldCheck, User, MapPin, AlertCircle,
  Search, SlidersHorizontal
} from 'lucide-react';

export const AdminIncidents = () => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [classificationFilter, setClassificationFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const [selectedIncident, setSelectedIncident] = useState(null);
  const [incidentDetails, setIncidentDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [actionMessage, setActionMessage] = useState('');

  const fetchIncidents = async () => {
    try {
      setLoading(true);
      const [activeRes, historyRes] = await Promise.all([
        api.get('/incidents/active'),
        api.get('/incidents/history?limit=100')
      ]);

      const all = [
        ...(activeRes.data.incidents || []),
        ...(historyRes.data.incidents || [])
      ];

      // Remove duplicates by incident_id
      const unique = Array.from(new Map(all.map(item => [item.incident_id, item])).values());
      setIncidents(unique);
    } catch (err) {
      console.error('Error fetching incidents:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncidents();
  }, []);

  const openDetails = async (incident) => {
    setSelectedIncident(incident);
    setDetailsLoading(true);
    try {
      const res = await api.get(`/incidents/${incident.incident_id}`);
      setIncidentDetails(res.data);
    } catch (err) {
      console.error('Error fetching incident details:', err);
    } finally {
      setDetailsLoading(false);
    }
  };

  const handleAction = async (incidentId, action) => {
    try {
      let res;
      if (action === 'confirm') {
        res = await api.patch(`/incidents/${incidentId}/confirm`);
        setActionMessage(`Incident #${incidentId} confirmed to 100% confidence.`);
      } else if (action === 'dismiss') {
        res = await api.patch(`/incidents/${incidentId}/dismiss`);
        setActionMessage(`Incident #${incidentId} dismissed as false alarm.`);
      } else if (action === 'restore') {
        res = await api.patch(`/incidents/${incidentId}/restore`);
        setActionMessage(`Incident #${incidentId} marked as restored.`);
      }
      setSelectedIncident(null);
      fetchIncidents();
      setTimeout(() => setActionMessage(''), 4000);
    } catch (err) {
      alert(err.response?.data?.error || `Failed to ${action} incident`);
    }
  };

  const filtered = useMemo(() => {
    return incidents.filter(i => {
      if (statusFilter !== 'all' && i.status !== statusFilter) return false;
      if (classificationFilter !== 'all' && (i.classification || '').toLowerCase() !== classificationFilter.toLowerCase()) return false;
      if (typeFilter !== 'all' && (i.type || '').toLowerCase() !== typeFilter.toLowerCase()) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchId = String(i.incident_id || '').toLowerCase().includes(q);
        const matchArea = (i.area || '').toLowerCase().includes(q);
        const matchDistrict = (i.district || '').toLowerCase().includes(q);
        const matchZone = (i.zone || '').toLowerCase().includes(q);
        const matchClass = (i.classification || '').toLowerCase().includes(q);
        const matchType = (i.type || '').toLowerCase().includes(q);

        if (!matchId && !matchArea && !matchDistrict && !matchZone && !matchClass && !matchType) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.start_time) - new Date(a.start_time);
      if (sortBy === 'oldest') return new Date(a.start_time) - new Date(b.start_time);
      if (sortBy === 'confidence-desc') return (b.confidence_score || 0) - (a.confidence_score || 0);
      if (sortBy === 'confidence-asc') return (a.confidence_score || 0) - (b.confidence_score || 0);
      if (sortBy === 'duration-desc') return (b.duration_minutes || 99999) - (a.duration_minutes || 99999);
      return 0;
    });
  }, [incidents, searchQuery, statusFilter, classificationFilter, typeFilter, sortBy]);

  const hasActiveFilters = searchQuery.trim() !== '' || statusFilter !== 'all' || classificationFilter !== 'all' || typeFilter !== 'all' || sortBy !== 'newest';

  const clearFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setClassificationFilter('all');
    setTypeFilter('all');
    setSortBy('newest');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Incident Intelligence Desk</h2>
          <p className="text-xs text-slate-500 mt-1">Review corroboration signals, manually verify, or dismiss false alarms</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchIncidents}
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition flex items-center gap-2 text-xs font-semibold shadow-sm"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {actionMessage && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
          <ShieldCheck className="w-4 h-4" />
          <span>{actionMessage}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Search Box */}
          <div className="relative lg:col-span-2">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by ID, area, district, zone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition"
            />
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-700 capitalize font-medium transition"
            >
              <option value="all">All Statuses</option>
              <option value="open">Open (Active)</option>
              <option value="restored">Restored</option>
              <option value="dismissed">Dismissed</option>
            </select>
          </div>

          {/* Classification Filter */}
          <div>
            <select
              value={classificationFilter}
              onChange={(e) => setClassificationFilter(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-700 capitalize font-medium transition"
            >
              <option value="all">All Classifications</option>
              <option value="confirmed">Confirmed</option>
              <option value="probable">Probable</option>
              <option value="possible">Possible</option>
              <option value="low">Low</option>
            </select>
          </div>

          {/* Sort By */}
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-700 font-medium transition"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="confidence-desc">Highest Confidence</option>
              <option value="confidence-asc">Lowest Confidence</option>
              <option value="duration-desc">Longest Duration</option>
            </select>
          </div>
        </div>

        {/* Secondary Row for Type & Clear */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-medium">Type:</span>
            <div className="inline-flex rounded-lg bg-slate-100 p-0.5 font-semibold text-slate-600">
              {['all', 'unexpected', 'planned'].map(t => (
                <button
                  key={t}
                  onClick={() => setTypeFilter(t)}
                  className={`px-2.5 py-1 rounded-md capitalize transition text-[11px] ${
                    typeFilter === t ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold transition"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Result Counter */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>Showing <strong>{filtered.length}</strong> of <strong>{incidents.length}</strong> incidents</span>
        {hasActiveFilters && <span className="text-sky-600 font-medium">Filters active</span>}
      </div>

      {/* Main Incidents Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-100">
              <tr>
                <th className="py-3 px-4">ID</th>
                <th className="py-3 px-4">Area / Location</th>
                <th className="py-3 px-4">Confidence Score</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Detected At</th>
                <th className="py-3 px-4">Duration</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    <p className="font-semibold text-slate-600 mb-1">No incidents matched your criteria</p>
                    <p className="text-xs text-slate-400">Try adjusting your search terms, status, classification, or reset filters.</p>
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                <tr key={item.incident_id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                    #{item.incident_id}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-900">{item.area}</div>
                    <div className="text-[11px] text-slate-400">{item.district} ({item.zone})</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <ConfidenceBadge score={item.confidence_score} classification={item.classification} />
                  </td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="capitalize font-medium text-slate-600">{item.type}</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">
                    {new Date(item.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td className="py-3.5 px-4 font-mono">
                    {item.duration_minutes ? `${item.duration_minutes} min` : 'Ongoing'}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      <button
                        onClick={() => openDetails(item)}
                        className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
                        title="Inspect Signals & Reports"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      {item.status === 'open' && (
                        <>
                          <button
                            onClick={() => handleAction(item.incident_id, 'confirm')}
                            className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 transition"
                            title="Confirm (100% Score)"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleAction(item.incident_id, 'restore')}
                            className="px-2 py-1 text-[11px] font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-500 transition"
                          >
                            Restore
                          </button>
                          <button
                            onClick={() => handleAction(item.incident_id, 'dismiss')}
                            className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition"
                            title="Dismiss False Alarm"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              )))
            }
            </tbody>
          </table>
        </div>
      </div>

      {/* Incident Deep Inspection Modal */}
      <Modal
        isOpen={Boolean(selectedIncident)}
        onClose={() => setSelectedIncident(null)}
        title={`Incident #${selectedIncident?.incident_id} Forensic Audit`}
      >
        {detailsLoading ? (
          <div className="flex items-center justify-center p-8">
            <RefreshCw className="w-6 h-6 animate-spin text-sky-600" />
          </div>
        ) : incidentDetails ? (
          <div className="space-y-5 text-xs">
            {/* Summary Header */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
              <div>
                <p className="font-bold text-sm text-slate-900">{incidentDetails.incident.area}</p>
                <p className="text-slate-500 mt-0.5">{incidentDetails.incident.district} • {incidentDetails.incident.zone}</p>
              </div>
              <ConfidenceBadge
                score={incidentDetails.incident.confidence_score}
                classification={incidentDetails.incident.classification}
              />
            </div>

            {/* Contributing User Reports */}
            <div>
              <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                <User className="w-4 h-4 text-sky-600" />
                <span>Contributing Consumer Signals ({incidentDetails.reports.length})</span>
              </h4>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {incidentDetails.reports.map((r) => (
                  <div key={r.report_id} className="p-2.5 rounded-lg border border-slate-200 bg-white flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-slate-900">{r.user_name}</p>
                      <p className="text-[11px] text-slate-500">Reported at: {new Date(r.reported_at).toLocaleTimeString()}</p>
                    </div>
                    <div className="text-right">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                        Reliability: {r.reliability_score}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions in Modal */}
            {incidentDetails.incident.status === 'open' && (
              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  onClick={() => handleAction(incidentDetails.incident.incident_id, 'dismiss')}
                  className="px-3 py-1.5 rounded-lg border border-rose-300 text-rose-700 hover:bg-rose-50 font-semibold"
                >
                  Dismiss False Alarm
                </button>
                <button
                  onClick={() => handleAction(incidentDetails.incident.incident_id, 'confirm')}
                  className="px-3 py-1.5 rounded-lg bg-sky-600 text-white hover:bg-sky-500 font-semibold"
                >
                  Confirm Incident (100%)
                </button>
                <button
                  onClick={() => handleAction(incidentDetails.incident.incident_id, 'restore')}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-500 font-semibold"
                >
                  Confirm Restored
                </button>
              </div>
            )}
          </div>
        ) : null}
      </Modal>
    </div>
  );
};
```

---

## <a id="file-37"></a>[37] `web/src/pages/AdminReports.jsx`

- **Path:** `Power-Pulse-main/web/src/pages/AdminReports.jsx`  
- **Language:** `jsx`  
- **Lines of Code:** `243` lines  

```jsx
import React, { useState, useEffect, useMemo } from 'react';
import api from '../services/api';
import { FileText, RefreshCw, AlertTriangle, ShieldAlert, CheckCircle2, Filter, Search } from 'lucide-react';

export const AdminReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [flagFilter, setFlagFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const fetchReports = async () => {
    try {
      setLoading(true);
      const res = await api.get('/reports?limit=200');
      setReports(res.data.reports || []);
    } catch (err) {
      console.error('Error fetching raw reports:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const filtered = useMemo(() => {
    return reports.filter(r => {
      if (typeFilter !== 'all' && r.type !== typeFilter) return false;
      if (flagFilter === 'duplicate' && !r.is_duplicate) return false;
      if (flagFilter === 'spam' && !r.is_spam) return false;
      if (flagFilter === 'clean' && (r.is_duplicate || r.is_spam)) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchId = String(r.report_id || '').toLowerCase().includes(q);
        const matchUser = (r.user_name || '').toLowerCase().includes(q);
        const matchArea = (r.area || '').toLowerCase().includes(q);
        const matchDistrict = (r.district || '').toLowerCase().includes(q);
        const matchZone = (r.zone || '').toLowerCase().includes(q);
        const matchUuid = (r.client_uuid || '').toLowerCase().includes(q);

        if (!matchId && !matchUser && !matchArea && !matchDistrict && !matchZone && !matchUuid) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.reported_at) - new Date(a.reported_at);
      if (sortBy === 'oldest') return new Date(a.reported_at) - new Date(b.reported_at);
      if (sortBy === 'reliability-desc') return (b.reliability_score || 0) - (a.reliability_score || 0);
      if (sortBy === 'reliability-asc') return (a.reliability_score || 0) - (b.reliability_score || 0);
      return 0;
    });
  }, [reports, searchQuery, typeFilter, flagFilter, sortBy]);

  const hasActiveFilters = searchQuery.trim() !== '' || typeFilter !== 'all' || flagFilter !== 'all' || sortBy !== 'newest';

  const clearFilters = () => {
    setSearchQuery('');
    setTypeFilter('all');
    setFlagFilter('all');
    setSortBy('newest');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Raw Consumer Reports Stream</h2>
          <p className="text-xs text-slate-500 mt-1">Audit individual incoming OFF/BACK signals, spam detections, and duplicate penalties</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchReports}
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition flex items-center gap-2 text-xs font-semibold shadow-sm"
            title="Refresh"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by ID, user, area, UUID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition"
            />
          </div>

          {/* Type Filter */}
          <div>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-700 font-medium transition"
            >
              <option value="all">All Signals (OFF & BACK)</option>
              <option value="OFF">Power OFF Signals Only</option>
              <option value="BACK">Power BACK Signals Only</option>
            </select>
          </div>

          {/* Flag Filter */}
          <div>
            <select
              value={flagFilter}
              onChange={(e) => setFlagFilter(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-700 font-medium transition"
            >
              <option value="all">All Audit Statuses</option>
              <option value="clean">Valid Signals Only</option>
              <option value="duplicate">Flagged Duplicates</option>
              <option value="spam">Flagged Spam</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-700 font-medium transition"
            >
              <option value="newest">Newest Reported</option>
              <option value="oldest">Oldest Reported</option>
              <option value="reliability-desc">Highest Reliability</option>
              <option value="reliability-asc">Lowest Reliability</option>
            </select>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold text-xs transition whitespace-nowrap"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Result Counter */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>Showing <strong>{filtered.length}</strong> of <strong>{reports.length}</strong> raw reports</span>
        {hasActiveFilters && <span className="text-sky-600 font-medium">Filters active</span>}
      </div>

      {/* Reports Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-100">
              <tr>
                <th className="py-3 px-4">Report ID</th>
                <th className="py-3 px-4">Reporting Consumer</th>
                <th className="py-3 px-4">Area / District</th>
                <th className="py-3 px-4">Signal Type</th>
                <th className="py-3 px-4">Spam Flag</th>
                <th className="py-3 px-4">Duplicate Flag</th>
                <th className="py-3 px-4">Reported Time</th>
                <th className="py-3 px-4">Client UUID</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-400">
                    No reports match the selected filters.
                  </td>
                </tr>
              ) : (
                filtered.map((r) => (
                  <tr key={r.report_id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                      #{r.report_id}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900">{r.user_name}</div>
                      <div className="text-[11px] text-slate-400">Reliability: {r.reliability_score}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-medium text-slate-900">{r.area}</span>
                      <span className="block text-[11px] text-slate-400">{r.district} ({r.zone})</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        r.type === 'OFF'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}>
                        Power {r.type}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      {r.is_spam ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-200">
                          <ShieldAlert className="w-3 h-3" />
                          <span>SPAM</span>
                        </span>
                      ) : (
                        <span className="text-slate-400 font-mono text-[11px]">—</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      {r.is_duplicate ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                          <AlertTriangle className="w-3 h-3" />
                          <span>DUPLICATE</span>
                        </span>
                      ) : (
                        <span className="text-slate-400 font-mono text-[11px]">—</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 font-mono">
                      {new Date(r.reported_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[10px] text-slate-400 max-w-[120px] truncate" title={r.client_uuid}>
                      {r.client_uuid || 'N/A'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
```

---

## <a id="file-38"></a>[38] `web/src/pages/AdminComplaints.jsx`

- **Path:** `Power-Pulse-main/web/src/pages/AdminComplaints.jsx`  
- **Language:** `jsx`  
- **Lines of Code:** `353` lines  

```jsx
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { StatusBadge } from '../components/StatusBadge';
import { Modal } from '../components/Modal';
import { 
  MessageSquareWarning, UserCheck, RefreshCw, 
  Search, CheckCircle2, Clock, Wrench, Filter, ArrowUpDown, X
} from 'lucide-react';

export const AdminComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [selectedTechId, setSelectedTechId] = useState('');
  const [assignRemarks, setAssignRemarks] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [assigning, setAssigning] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [compRes, techRes] = await Promise.all([
        api.get('/complaints'),
        api.get('/technician/list')
      ]);
      setComplaints(compRes.data.complaints || []);
      setTechnicians(techRes.data.technicians || []);
    } catch (err) {
      console.error('Error fetching complaints data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openAssignModal = (complaint) => {
    setSelectedComplaint(complaint);
    setSelectedTechId(complaint.technician_id || '');
    setAssignRemarks(complaint.technician_remarks || '');
  };

  const handleAssign = async (e) => {
    e.preventDefault();
    if (!selectedTechId) {
      alert('Please select a technician');
      return;
    }

    try {
      setAssigning(true);
      await api.patch(`/complaints/${selectedComplaint.complaint_id}/assign`, {
        technician_id: selectedTechId,
        remarks: assignRemarks
      });
      setSelectedComplaint(null);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to assign technician');
    } finally {
      setAssigning(false);
    }
  };

  const filtered = complaints
    .filter(c => {
      if (statusFilter !== 'all' && c.status !== statusFilter) return false;
      if (categoryFilter !== 'all' && c.category !== categoryFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchId = String(c.complaint_id).includes(q);
        const matchName = (c.user_name || '').toLowerCase().includes(q);
        const matchEmail = (c.user_email || '').toLowerCase().includes(q);
        const matchArea = (c.area || '').toLowerCase().includes(q);
        const matchDesc = (c.description || '').toLowerCase().includes(q);
        const matchTech = (c.technician_name || '').toLowerCase().includes(q);
        if (!matchId && !matchName && !matchEmail && !matchArea && !matchDesc && !matchTech) return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'oldest') {
        return new Date(a.created_at) - new Date(b.created_at);
      }
      if (sortBy === 'category') {
        return (a.category || '').localeCompare(b.category || '');
      }
      if (sortBy === 'status') {
        return (a.status || '').localeCompare(b.status || '');
      }
      // default 'newest'
      return new Date(b.created_at) - new Date(a.created_at);
    });

  const hasActiveFilters = searchQuery || statusFilter !== 'all' || categoryFilter !== 'all' || sortBy !== 'newest';

  const clearFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setCategoryFilter('all');
    setSortBy('newest');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Complaint & Dispatch Desk</h2>
          <p className="text-xs text-slate-500 mt-1">Review consumer tickets, categorize faults, and dispatch field technicians</p>
        </div>

        <button
          onClick={fetchData}
          className="self-end sm:self-auto p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition shadow-xs"
          title="Refresh table"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Search, Filter & Sort Controls Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[220px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by ticket #, citizen, area, or technician..."
            className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-700 placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 font-medium rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="assigned">Assigned</option>
            <option value="investigating">Investigating</option>
            <option value="repairing">Repairing</option>
            <option value="resolved">Resolved</option>
          </select>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 font-medium rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="all">All Faults</option>
            <option value="power_outage">Power Outage</option>
            <option value="low_voltage">Low Voltage</option>
            <option value="transformer">Transformer Fault</option>
            <option value="damaged_wire">Damaged Wire</option>
            <option value="pole">Electric Pole Risk</option>
            <option value="other">Other Hazards</option>
          </select>

          {/* Sort By */}
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 font-medium">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent focus:outline-none text-slate-700 font-medium"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="category">Category (A-Z)</option>
              <option value="status">Status</option>
            </select>
          </div>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold transition"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Showing count indicator */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>Showing <strong>{filtered.length}</strong> of <strong>{complaints.length}</strong> complaints</span>
        {hasActiveFilters && <span className="text-sky-600 font-medium">Filters active</span>}
      </div>

      {/* Complaints Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-100">
              <tr>
                <th className="py-3 px-4">Ticket ID</th>
                <th className="py-3 px-4">Consumer</th>
                <th className="py-3 px-4">Area</th>
                <th className="py-3 px-4">Fault Category</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Assigned Tech</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filtered.map((c) => (
                <tr key={c.complaint_id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                    #CMP-{c.complaint_id}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-900">{c.consumer_name}</div>
                    <div className="text-[11px] text-slate-400">{c.consumer_phone || c.consumer_email}</div>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-900">
                    {c.area || 'N/A'}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700 capitalize">
                      {c.category.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 max-w-xs truncate text-slate-600" title={c.description}>
                    {c.description || 'No description provided'}
                  </td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={c.status} />
                  </td>
                  <td className="py-3.5 px-4">
                    {c.technician_name ? (
                      <span className="font-semibold text-slate-900">{c.technician_name}</span>
                    ) : (
                      <span className="text-slate-400 italic">Unassigned</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => openAssignModal(c)}
                      className="px-3 py-1 text-xs font-semibold rounded-lg bg-sky-50 text-sky-700 hover:bg-sky-100 transition inline-flex items-center gap-1.5"
                    >
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>{c.technician_name ? 'Reassign' : 'Dispatch'}</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Technician Assignment Modal */}
      <Modal
        isOpen={Boolean(selectedComplaint)}
        onClose={() => setSelectedComplaint(null)}
        title={`Dispatch Field Technician - Ticket #CMP-${selectedComplaint?.complaint_id}`}
      >
        <form onSubmit={handleAssign} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Select Field Technician
            </label>
            <div className="space-y-2 mt-2">
              {technicians.map((t) => (
                <label
                  key={t.technician_id}
                  className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition ${
                    selectedTechId == t.technician_id
                      ? 'border-sky-500 bg-sky-50/50 ring-1 ring-sky-500'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="technician"
                      value={t.technician_id}
                      checked={selectedTechId == t.technician_id}
                      onChange={(e) => setSelectedTechId(e.target.value)}
                      className="text-sky-600 focus:ring-sky-500"
                    />
                    <div>
                      <p className="font-bold text-slate-900">{t.name}</p>
                      <p className="text-[11px] text-slate-400">Base: {t.base_area} • Phone: {t.phone}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <StatusBadge status={t.availability_status} />
                    <p className="text-[10px] text-slate-400 mt-1">{t.active_tasks} active task(s)</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Dispatch Instructions / Remarks
            </label>
            <textarea
              rows={3}
              value={assignRemarks}
              onChange={(e) => setAssignRemarks(e.target.value)}
              placeholder="e.g. Check pole transformer fuse at North Corner."
              className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setSelectedComplaint(null)}
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={assigning}
              className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold shadow-sm transition disabled:opacity-50"
            >
              {assigning ? 'Dispatching...' : 'Confirm Dispatch'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
```

---

## <a id="file-39"></a>[39] `web/src/pages/AdminLocations.jsx`

- **Path:** `Power-Pulse-main/web/src/pages/AdminLocations.jsx`  
- **Language:** `jsx`  
- **Lines of Code:** `366` lines  

```jsx
import React, { useState, useEffect, useMemo } from 'react';
import api from '../services/api';
import { OutageMap } from '../components/OutageMap';
import { MapPin, Plus, RefreshCw, CheckCircle2, AlertOctagon, Search } from 'lucide-react';

export const AdminLocations = () => {
  const [locations, setLocations] = useState([]);
  const [activeIncidents, setActiveIncidents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search & Filter state for table
  const [searchQuery, setSearchQuery] = useState('');
  const [zoneFilter, setZoneFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('area-asc');

  const [district, setDistrict] = useState('Dhaka');
  const [area, setArea] = useState('');
  const [zone, setZone] = useState('Zone A');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const fetchLocations = async () => {
    try {
      setLoading(true);
      const [locRes, incRes] = await Promise.all([
        api.get('/locations'),
        api.get('/incidents/active')
      ]);
      setLocations(locRes.data.locations || []);
      setActiveIncidents(incRes.data.incidents || []);
    } catch (err) {
      console.error('Error fetching locations:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!area.trim() || !zone.trim()) {
      alert('Area and zone are required');
      return;
    }

    try {
      setSubmitting(true);
      await api.post('/locations', {
        district: district.trim(),
        area: area.trim(),
        zone: zone.trim(),
        latitude: latitude ? parseFloat(latitude) : null,
        longitude: longitude ? parseFloat(longitude) : null
      });

      setMessage(`Location '${area}' added successfully.`);
      setArea('');
      setLatitude('');
      setLongitude('');
      fetchLocations();
      setTimeout(() => setMessage(''), 4000);
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to add location');
    } finally {
      setSubmitting(false);
    }
  };

  const availableZones = useMemo(() => {
    return Array.from(new Set(locations.map(l => l.zone).filter(Boolean)));
  }, [locations]);

  const filteredLocations = useMemo(() => {
    return locations.filter(loc => {
      if (zoneFilter !== 'all' && loc.zone !== zoneFilter) return false;
      if (statusFilter === 'outage' && (loc.active_outages || 0) <= 0) return false;
      if (statusFilter === 'normal' && (loc.active_outages || 0) > 0) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchId = String(loc.location_id || '').toLowerCase().includes(q);
        const matchArea = (loc.area || '').toLowerCase().includes(q);
        const matchDistrict = (loc.district || '').toLowerCase().includes(q);
        const matchZone = (loc.zone || '').toLowerCase().includes(q);
        if (!matchId && !matchArea && !matchDistrict && !matchZone) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'area-asc') return (a.area || '').localeCompare(b.area || '');
      if (sortBy === 'area-desc') return (b.area || '').localeCompare(a.area || '');
      if (sortBy === 'outages-desc') return (b.active_outages || 0) - (a.active_outages || 0);
      if (sortBy === 'id-asc') return (a.location_id || 0) - (b.location_id || 0);
      return 0;
    });
  }, [locations, searchQuery, zoneFilter, statusFilter, sortBy]);

  const hasActiveFilters = searchQuery.trim() !== '' || zoneFilter !== 'all' || statusFilter !== 'all' || sortBy !== 'area-asc';

  const clearFilters = () => {
    setSearchQuery('');
    setZoneFilter('all');
    setStatusFilter('all');
    setSortBy('area-asc');
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Municipal Locations & Grid Zones</h2>
        <p className="text-xs text-slate-500 mt-1">Configure municipal sectors, districts, and substation zones for crowd clustering</p>
      </div>

      {/* 🗺️ Live Dhaka Substation & Grid Feeder Map */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Dhaka Municipal Grid Topology (OpenStreetMap)
          </span>
          <span className="text-[11px] text-slate-400">
            {locations.length} Registered Locations • {activeIncidents.length} Active Incidents
          </span>
        </div>
        <OutageMap
          locations={locations}
          activeIncidents={activeIncidents}
          height="360px"
        />
      </div>

      {message && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{message}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Form */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Plus className="w-4 h-4 text-sky-600" />
            <span>Add New Municipal Zone</span>
          </h3>

          <form onSubmit={handleCreate} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">
                District Name *
              </label>
              <input
                type="text"
                required
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                placeholder="e.g. Dhaka"
                className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Area / Sector Name *
              </label>
              <input
                type="text"
                required
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="e.g. Gulshan-2 or Badda"
                className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Substation Grid Zone *
              </label>
              <select
                value={zone}
                onChange={(e) => setZone(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium"
              >
                <option value="Zone A">Zone A (North-West Feeder)</option>
                <option value="Zone B">Zone B (Central-South Feeder)</option>
                <option value="Zone C">Zone C (North Substation)</option>
                <option value="Zone D">Zone D (East Substation)</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Latitude
                </label>
                <input
                  type="number"
                  step="0.0001"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  placeholder="e.g. 23.8103"
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Longitude
                </label>
                <input
                  type="number"
                  step="0.0001"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  placeholder="e.g. 90.4125"
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold shadow-sm transition disabled:opacity-50"
            >
              {submitting ? 'Registering Location...' : 'Add Location to System'}
            </button>
          </form>
        </div>

        {/* Right Column: Locations Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Registered Municipal Sectors</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Showing {filteredLocations.length} of {locations.length} locations</p>
            </div>
            <div className="flex items-center gap-2">
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold transition"
                >
                  Reset
                </button>
              )}
              <button
                onClick={fetchLocations}
                className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-900"
                title="Refresh locations"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          {/* Table Filters */}
          <div className="p-4 bg-slate-50/70 border-b border-slate-100 grid grid-cols-1 sm:grid-cols-4 gap-2.5">
            <div className="relative sm:col-span-2">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search area, district, ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition"
              />
            </div>

            <div>
              <select
                value={zoneFilter}
                onChange={(e) => setZoneFilter(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-700 font-medium transition"
              >
                <option value="all">All Zones</option>
                {availableZones.map(z => (
                  <option key={z} value={z}>{z}</option>
                ))}
              </select>
            </div>

            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-700 font-medium transition"
              >
                <option value="area-asc">Area (A-Z)</option>
                <option value="area-desc">Area (Z-A)</option>
                <option value="outages-desc">Most Active Outages</option>
                <option value="id-asc">Location ID</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-100">
                <tr>
                  <th className="py-3 px-4">Loc ID</th>
                  <th className="py-3 px-4">Area / Sector</th>
                  <th className="py-3 px-4">District</th>
                  <th className="py-3 px-4">Grid Zone</th>
                  <th className="py-3 px-4">Coordinates</th>
                  <th className="py-3 px-4 text-right">Active Outages</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredLocations.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-10 text-center text-slate-400">
                      <p className="font-semibold text-slate-600 mb-0.5">No municipal sectors found</p>
                      <p className="text-[11px] text-slate-400">Try adjusting your search criteria or register a new location.</p>
                    </td>
                  </tr>
                ) : (
                  filteredLocations.map((loc) => (
                  <tr key={loc.location_id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                      #{loc.location_id}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-900">
                      {loc.area}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-600">
                      {loc.district}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-800">
                        {loc.zone}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-slate-400">
                      {loc.latitude ? `${loc.latitude}, ${loc.longitude}` : 'N/A'}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {loc.active_outages > 0 ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
                          <AlertOctagon className="w-3.5 h-3.5" />
                          <span>{loc.active_outages} ACTIVE</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-emerald-600 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Normal</span>
                        </span>
                      )}
                    </td>
                  </tr>
                )))
              }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
```

---

## <a id="file-40"></a>[40] `web/src/pages/AdminPlanned.jsx`

- **Path:** `Power-Pulse-main/web/src/pages/AdminPlanned.jsx`  
- **Language:** `jsx`  
- **Lines of Code:** `337` lines  

```jsx
import React, { useState, useEffect, useMemo } from 'react';
import api from '../services/api';
import { CalendarClock, Plus, Trash2, RefreshCw, AlertCircle, CheckCircle2, Search } from 'lucide-react';

export const AdminPlanned = () => {
  const [plannedList, setPlannedList] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  // Table filter & search state
  const [searchQuery, setSearchQuery] = useState('');
  const [zoneFilter, setZoneFilter] = useState('all');
  const [sortBy, setSortBy] = useState('soonest');

  // Form State
  const [locationId, setLocationId] = useState('');
  const [outageDate, setOutageDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [reason, setReason] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      const [plannedRes, locRes] = await Promise.all([
        api.get('/planned'),
        api.get('/locations')
      ]);
      setPlannedList(plannedRes.data.planned || []);
      setLocations(locRes.data.locations || []);
      if (locRes.data.locations?.length > 0 && !locationId) {
        setLocationId(locRes.data.locations[0].location_id);
      }
    } catch (err) {
      console.error('Error fetching planned outages:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!locationId || !outageDate || !startTime || !endTime) {
      alert('Please fill out all required schedule fields');
      return;
    }

    try {
      setSubmitting(true);
      await api.post('/planned', {
        location_id: locationId,
        outage_date: outageDate,
        start_time: startTime,
        end_time: endTime,
        reason: reason || 'Scheduled substation feeder maintenance'
      });

      setMessage('Planned load-shedding published successfully.');
      setReason('');
      fetchData();
      setTimeout(() => setMessage(''), 4000);
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to publish planned outage');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this scheduled outage?')) return;
    try {
      await api.delete(`/planned/${id}`);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to delete schedule');
    }
  };

  const availableZones = useMemo(() => {
    return Array.from(new Set(locations.map(l => l.zone).filter(Boolean)));
  }, [locations]);

  const filteredPlanned = useMemo(() => {
    return plannedList.filter(p => {
      if (zoneFilter !== 'all') {
        const loc = locations.find(l => l.location_id === p.location_id || l.area === p.area);
        if (loc && loc.zone !== zoneFilter) return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchArea = (p.area || '').toLowerCase().includes(q);
        const matchDistrict = (p.district || '').toLowerCase().includes(q);
        const matchReason = (p.reason || '').toLowerCase().includes(q);
        if (!matchArea && !matchDistrict && !matchReason) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'soonest') return new Date(`${a.outage_date}T${a.start_time || '00:00'}`) - new Date(`${b.outage_date}T${b.start_time || '00:00'}`);
      if (sortBy === 'latest') return new Date(`${b.outage_date}T${b.start_time || '00:00'}`) - new Date(`${a.outage_date}T${a.start_time || '00:00'}`);
      if (sortBy === 'area') return (a.area || '').localeCompare(b.area || '');
      return 0;
    });
  }, [plannedList, locations, searchQuery, zoneFilter, sortBy]);

  const hasActiveFilters = searchQuery.trim() !== '' || zoneFilter !== 'all' || sortBy !== 'soonest';

  const clearFilters = () => {
    setSearchQuery('');
    setZoneFilter('all');
    setSortBy('soonest');
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Planned Load-Shedding Scheduler</h2>
        <p className="text-xs text-slate-500 mt-1">
          Announce scheduled maintenance in advance to prevent false emergency alarm triggering
        </p>
      </div>

      {message && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{message}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Form */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Plus className="w-4 h-4 text-sky-600" />
            <span>Schedule New Load-Shedding</span>
          </h3>

          <form onSubmit={handleCreate} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Affected Municipal Area *
              </label>
              <select
                value={locationId}
                onChange={(e) => setLocationId(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium"
              >
                {locations.map((loc) => (
                  <option key={loc.location_id} value={loc.location_id}>
                    {loc.area} ({loc.district} • {loc.zone})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Scheduled Date *
              </label>
              <input
                type="date"
                required
                value={outageDate}
                onChange={(e) => setOutageDate(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Start Time *
                </label>
                <input
                  type="time"
                  required
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  End Time *
                </label>
                <input
                  type="time"
                  required
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Maintenance Reason / Details
              </label>
              <textarea
                rows={3}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="e.g. Substation 33kV transformer maintenance and overhead cable trimming."
                className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold shadow-sm transition disabled:opacity-50"
            >
              {submitting ? 'Publishing...' : 'Publish Scheduled Outage'}
            </button>
          </form>
        </div>

        {/* Right Column: Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Upcoming Published Schedules</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Showing {filteredPlanned.length} of {plannedList.length} scheduled</p>
            </div>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold transition self-start sm:self-auto"
              >
                Reset Filters
              </button>
            )}
          </div>

          {/* Table Filters */}
          <div className="p-4 bg-slate-50/70 border-b border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search area, district, reason..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition"
              />
            </div>

            <div>
              <select
                value={zoneFilter}
                onChange={(e) => setZoneFilter(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-700 font-medium transition"
              >
                <option value="all">All Zones</option>
                {availableZones.map(z => (
                  <option key={z} value={z}>{z}</option>
                ))}
              </select>
            </div>

            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-700 font-medium transition"
              >
                <option value="soonest">Soonest Date First</option>
                <option value="latest">Latest Date First</option>
                <option value="area">Area Name (A-Z)</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-100">
                <tr>
                  <th className="py-3 px-4">Area</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Window Time</th>
                  <th className="py-3 px-4">Reason</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredPlanned.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-10 text-center text-slate-400">
                      <p className="font-semibold text-slate-600 mb-0.5">No planned schedules found</p>
                      <p className="text-[11px] text-slate-400">Try adjusting your search criteria or schedule a new outage.</p>
                    </td>
                  </tr>
                ) : (
                  filteredPlanned.map((p) => (
                    <tr key={p.planned_id} className="hover:bg-slate-50/80 transition">
                      <td className="py-3.5 px-4 font-semibold text-slate-900">
                        {p.area}
                        <span className="block text-[11px] font-normal text-slate-400">{p.district}</span>
                      </td>
                      <td className="py-3.5 px-4 font-medium">
                        {p.outage_date}
                      </td>
                      <td className="py-3.5 px-4 font-mono font-medium text-sky-700">
                        {p.start_time} - {p.end_time}
                      </td>
                      <td className="py-3.5 px-4 max-w-xs text-slate-600 truncate" title={p.reason}>
                        {p.reason}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => handleDelete(p.planned_id)}
                          className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition"
                          title="Cancel schedule"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
```

---

## <a id="file-41"></a>[41] `web/src/pages/AdminAnalytics.jsx`

- **Path:** `Power-Pulse-main/web/src/pages/AdminAnalytics.jsx`  
- **Language:** `jsx`  
- **Lines of Code:** `147` lines  

```jsx
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { 
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, 
  Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { BarChart3, PieChart as PieIcon, RefreshCw, Sparkles } from 'lucide-react';

export const AdminAnalytics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/analytics');
      setData(res.data);
    } catch (err) {
      console.error('Error fetching analytics:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const COLORS = ['#0284c7', '#ef4444', '#f59e0b', '#10b981', '#8b5cf6', '#ec4899'];

  if (loading && !data) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const kpi = data?.kpi || {};

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Grid Telemetry & Analytics</h2>
          <p className="text-xs text-slate-500 mt-1">Aggregated historical insights, reliability rates, and fault distributions</p>
        </div>
        <button
          onClick={fetchAnalytics}
          className="inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Grid of Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chart 1: Outages by Area */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-sky-600" />
                <span>Outages by Municipal Zone</span>
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Total incidents detected per municipal area</p>
            </div>
          </div>

          <div className="h-72 w-full">
            {data?.areaWiseOutages && data.areaWiseOutages.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.areaWiseOutages} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                  <XAxis dataKey="area" tick={{ fontSize: 10 }} interval={0} angle={-25} textAnchor="end" />
                  <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ borderRadius: '8px', fontSize: '12px' }} />
                  <Bar dataKey="incident_count" fill="#0284c7" radius={[4, 4, 0, 0]} name="Incidents">
                    {data.areaWiseOutages.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-xs text-slate-400">No data available</div>
            )}
          </div>
        </div>

        {/* Chart 2: Complaints by Category */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <PieIcon className="w-4 h-4 text-amber-600" />
                <span>Consumer Fault Breakdown</span>
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Distribution of consumer complaints across fault categories</p>
            </div>
          </div>

          <div className="h-72 w-full flex items-center justify-center">
            {data?.complaintsByCategory && data.complaintsByCategory.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.complaintsByCategory}
                    dataKey="count"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    outerRadius={85}
                    innerRadius={50}
                    paddingAngle={3}
                    label={({ name, percent }) => `${(name || '').replace('_', ' ')} (${(percent * 100).toFixed(0)}%)`}
                    labelLine={false}
                  >
                    {data.complaintsByCategory.map((_, index) => (
                      <Cell key={`cell-pie-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '8px', fontSize: '12px' }} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-xs text-slate-400">No complaints filed yet</div>
            )}
          </div>
        </div>
      </div>

      {/* Grid Performance Summary Card */}
      <div className="bg-gradient-to-r from-sky-900 to-slate-900 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center gap-2 mb-2 text-sky-400 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Automated Algorithm Evaluation Note</span>
        </div>
        <h4 className="text-lg font-bold">Reliability & False-Positive Mitigation</h4>
        <p className="text-xs text-slate-300 mt-2 max-w-2xl leading-relaxed">
          PowerPulse uses iterative crowd corroboration. Single-user breaker trips or isolated residential wiring faults are automatically classified as <strong>Low Confidence (0–39%)</strong> and do not trigger municipal grid alerts. Only when at least 2 distinct accounts corroborate within a 30-minute window does the engine escalate to candidate incident status.
        </p>
      </div>
    </div>
  );
};
```

---

## <a id="file-42"></a>[42] `web/src/pages/AdminUsers.jsx`

- **Path:** `Power-Pulse-main/web/src/pages/AdminUsers.jsx`  
- **Language:** `jsx`  
- **Lines of Code:** `282` lines  

```jsx
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { StatusBadge } from '../components/StatusBadge';
import { Users, Shield, Wrench, RefreshCw, Edit2, Check, Search, ArrowUpDown, X } from 'lucide-react';

export const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editRole, setEditRole] = useState('');
  const [editReliability, setEditReliability] = useState(0.5);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [sortBy, setSortBy] = useState('id-desc');

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/users');
      setUsers(res.data.users || []);
    } catch (err) {
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const startEdit = (user) => {
    setEditingUserId(user.user_id);
    setEditRole(user.role);
    setEditReliability(user.reliability_score);
  };

  const saveEdit = async (userId) => {
    try {
      await api.patch(`/admin/users/${userId}`, {
        role: editRole,
        reliability_score: editReliability
      });
      setEditingUserId(null);
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to update user');
    }
  };

  const filteredUsers = users
    .filter((u) => {
      if (roleFilter !== 'all' && u.role !== roleFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchId = String(u.user_id).includes(q);
        const matchName = (u.name || '').toLowerCase().includes(q);
        const matchEmail = (u.email || '').toLowerCase().includes(q);
        const matchPhone = (u.phone || '').toLowerCase().includes(q);
        const matchArea = (u.area || '').toLowerCase().includes(q);
        if (!matchId && !matchName && !matchEmail && !matchPhone && !matchArea) return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'reliability-desc') {
        return (b.reliability_score || 0) - (a.reliability_score || 0);
      }
      if (sortBy === 'reliability-asc') {
        return (a.reliability_score || 0) - (b.reliability_score || 0);
      }
      if (sortBy === 'name') {
        return (a.name || '').localeCompare(b.name || '');
      }
      if (sortBy === 'id-asc') {
        return a.user_id - b.user_id;
      }
      // default id-desc
      return b.user_id - a.user_id;
    });

  const hasActiveFilters = searchQuery || roleFilter !== 'all' || sortBy !== 'id-desc';

  const clearFilters = () => {
    setSearchQuery('');
    setRoleFilter('all');
    setSortBy('id-desc');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">User & Technician Directory</h2>
          <p className="text-xs text-slate-500 mt-1">Manage user accounts, roles (RBAC), and reporter reliability scores</p>
        </div>
        <button
          onClick={fetchUsers}
          className="self-end sm:self-auto p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition shadow-xs"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Search, Filter & Sort Controls */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, email, phone, or location..."
            className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-700 placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Role Filter */}
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3 py-2 font-medium rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="all">All Roles</option>
            <option value="consumer">Citizens (Consumer)</option>
            <option value="technician">Field Technicians</option>
            <option value="admin">Administrators</option>
          </select>

          {/* Sort By */}
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 font-medium">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent focus:outline-none text-slate-700 font-medium"
            >
              <option value="id-desc">Newest First</option>
              <option value="id-asc">Oldest First</option>
              <option value="reliability-desc">Highest Reliability</option>
              <option value="reliability-asc">Lowest Reliability</option>
              <option value="name">Name (A-Z)</option>
            </select>
          </div>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold transition"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Result Counter */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>Showing <strong>{filteredUsers.length}</strong> of <strong>{users.length}</strong> registered users</span>
        {hasActiveFilters && <span className="text-sky-600 font-medium">Filters active</span>}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-100">
              <tr>
                <th className="py-3 px-4">User ID</th>
                <th className="py-3 px-4">Name & Email</th>
                <th className="py-3 px-4">Phone</th>
                <th className="py-3 px-4">Area</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Reliability Score</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <p className="font-semibold text-slate-600 mb-1">No users matched your search/filters</p>
                    <p className="text-xs text-slate-400">Try adjusting your search query, role filter, or reset filters.</p>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => {
                const isEditing = editingUserId === u.user_id;

                return (
                  <tr key={u.user_id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                      #{u.user_id}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900">{u.name}</div>
                      <div className="text-[11px] text-slate-400">{u.email}</div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 font-mono">
                      {u.phone || 'N/A'}
                    </td>
                    <td className="py-3.5 px-4 font-medium">
                      {u.area ? `${u.area} (${u.zone})` : 'Unassigned'}
                    </td>
                    <td className="py-3.5 px-4">
                      {isEditing ? (
                        <select
                          value={editRole}
                          onChange={(e) => setEditRole(e.target.value)}
                          className="p-1 border border-slate-300 rounded text-xs"
                        >
                          <option value="consumer">Consumer</option>
                          <option value="technician">Technician</option>
                          <option value="admin">Admin</option>
                        </select>
                      ) : (
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${
                          u.role === 'admin' 
                            ? 'bg-purple-50 text-purple-700 border border-purple-200'
                            : u.role === 'technician'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-slate-100 text-slate-700'
                        }`}>
                          {u.role}
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      {isEditing ? (
                        <input
                          type="number"
                          step="0.05"
                          min="0.05"
                          max="1.00"
                          value={editReliability}
                          onChange={(e) => setEditReliability(e.target.value)}
                          className="w-16 p-1 border border-slate-300 rounded text-xs font-mono"
                        />
                      ) : (
                        <span className="font-mono font-bold text-slate-900">
                          {u.reliability_score}
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {isEditing ? (
                        <button
                          onClick={() => saveEdit(u.user_id)}
                          className="p-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-500 transition"
                          title="Save Changes"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <button
                          onClick={() => startEdit(u)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition"
                          title="Edit User"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </td>
                  </tr>
                );
              }))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
```

---

## <a id="file-43"></a>[43] `web/src/pages/AdminAuditLogs.jsx`

- **Path:** `Power-Pulse-main/web/src/pages/AdminAuditLogs.jsx`  
- **Language:** `jsx`  
- **Lines of Code:** `191` lines  

```jsx
import React, { useState, useEffect, useMemo } from 'react';
import api from '../services/api';
import { ShieldAlert, RefreshCw, Clock, Search } from 'lucide-react';

export const AdminAuditLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [actionFilter, setActionFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/audit-logs?limit=200');
      setLogs(res.data.logs || []);
    } catch (err) {
      console.error('Error fetching audit logs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const availableActions = useMemo(() => {
    return Array.from(new Set(logs.map(l => l.action).filter(Boolean)));
  }, [logs]);

  const filteredLogs = useMemo(() => {
    return logs.filter(log => {
      if (actionFilter !== 'all' && log.action !== actionFilter) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchId = String(log.log_id || '').toLowerCase().includes(q);
        const matchAction = (log.action || '').toLowerCase().includes(q);
        const matchUser = (log.user_name || '').toLowerCase().includes(q);
        const matchRole = (log.user_role || '').toLowerCase().includes(q);
        const matchDetails = (log.details || '').toLowerCase().includes(q);

        if (!matchId && !matchAction && !matchUser && !matchRole && !matchDetails) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.created_at) - new Date(a.created_at);
      if (sortBy === 'oldest') return new Date(a.created_at) - new Date(b.created_at);
      if (sortBy === 'action-asc') return (a.action || '').localeCompare(b.action || '');
      return 0;
    });
  }, [logs, searchQuery, actionFilter, sortBy]);

  const hasActiveFilters = searchQuery.trim() !== '' || actionFilter !== 'all' || sortBy !== 'newest';

  const clearFilters = () => {
    setSearchQuery('');
    setActionFilter('all');
    setSortBy('newest');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Security & Operation Audit Logs</h2>
          <p className="text-xs text-slate-500 mt-1">Immutable audit trail of administrator, technician, and system events</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchLogs}
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition flex items-center gap-2 text-xs font-semibold shadow-sm"
            title="Refresh logs"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by action, user, details, log ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition"
            />
          </div>

          <div>
            <select
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-700 font-medium transition"
            >
              <option value="all">All Action Events</option>
              {availableActions.map(act => (
                <option key={act} value={act}>{act}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-700 font-medium transition"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="action-asc">Action (A-Z)</option>
            </select>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold text-xs transition whitespace-nowrap"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Result Counter */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>Showing <strong>{filteredLogs.length}</strong> of <strong>{logs.length}</strong> audit records</span>
        {hasActiveFilters && <span className="text-sky-600 font-medium">Filters active</span>}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-100">
              <tr>
                <th className="py-3 px-4">Log ID</th>
                <th className="py-3 px-4">Action Event</th>
                <th className="py-3 px-4">Triggered By</th>
                <th className="py-3 px-4">Event Details</th>
                <th className="py-3 px-4">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-mono">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400 font-sans">
                    <p className="font-semibold text-slate-600 mb-1">No audit logs matched your query</p>
                    <p className="text-xs text-slate-400">Try adjusting your search criteria or resetting filters.</p>
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr key={log.log_id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      #{log.log_id}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-100 text-slate-800">
                        {log.action}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-sans">
                      <div className="font-semibold text-slate-900">{log.user_name || 'System / Anonymous'}</div>
                      <div className="text-[10px] text-slate-400 capitalize">{log.user_role || 'System'}</div>
                    </td>
                    <td className="py-3.5 px-4 max-w-md font-sans text-slate-600 truncate" title={log.details}>
                      {log.details}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 font-sans">
                      {new Date(log.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
```

---

## <a id="file-44"></a>[44] `web/src/pages/AdminProfile.jsx`

- **Path:** `Power-Pulse-main/web/src/pages/AdminProfile.jsx`  
- **Language:** `jsx`  
- **Lines of Code:** `248` lines  

```jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { 
  ShieldCheck, Mail, Phone, Calendar, 
  Edit3, Save, CheckCircle2, Lock, Eye, EyeOff, X, 
  Key, ShieldAlert, Activity, ArrowRight, User
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminProfile = () => {
  const { user, updateUser } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setName(user?.name || '');
    setPhone(user?.phone || '');
  }, [user]);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      setSaving(true);
      const payload = {
        name: name.trim(),
        phone: phone.trim() || null
      };

      if (password) {
        if (password.length < 6) {
          setError('New password must be at least 6 characters');
          setSaving(false);
          return;
        }
        payload.password = password;
      }

      const res = await api.patch('/auth/profile', payload);

      if (res.data?.user) {
        updateUser(res.data.user);
        setIsEditing(false);
        setPassword('');
        setMessage('Administrator profile updated successfully!');
        setTimeout(() => setMessage(''), 4000);
      }
    } catch (err) {
      console.error('Admin update profile error:', err);
      setError(err.response?.data?.error || 'Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-3xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Administrator Account & Credentials</h2>
          <p className="text-xs text-slate-500 mt-0.5">Manage root administrator profile, contact info, and security credentials</p>
        </div>
        <button
          onClick={() => { setIsEditing(!isEditing); setError(''); }}
          className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition shadow-xs border ${
            isEditing 
              ? 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200' 
              : 'bg-white text-purple-700 border-purple-200 hover:bg-purple-50'
          }`}
        >
          {isEditing ? <X className="w-3.5 h-3.5" /> : <Edit3 className="w-3.5 h-3.5" />}
          <span>{isEditing ? 'Cancel Edit' : 'Edit Credentials'}</span>
        </button>
      </div>

      {message && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {error && (
        <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-center gap-2 animate-fadeIn">
          <span>{error}</span>
        </div>
      )}

      {/* Profile Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-700 to-indigo-600 text-white flex items-center justify-center font-bold text-2xl shadow-md border border-purple-300">
            {user?.name?.charAt(0) || 'A'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-slate-900">{user?.name}</h3>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-purple-100 text-purple-800 border border-purple-200">
                Super Admin
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">{user?.email}</p>
            <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-50 text-slate-700 border border-slate-200">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
              <span>Full System Root Control</span>
            </div>
          </div>
        </div>

        {/* Edit Form or View Grid */}
        {isEditing ? (
          <form onSubmit={handleSaveProfile} className="space-y-4 text-xs animate-fadeIn p-4 rounded-xl bg-slate-50 border border-slate-200">
            <p className="font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-2">Update Administrator Info</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Administrator Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Official Mobile Phone</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 01711-000001"
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold text-slate-700 mb-1">Change Admin Password (Leave blank to keep unchanged)</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="New admin password (minimum 6 characters)"
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 pr-9"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-slate-600 hover:bg-slate-100 font-semibold transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold flex items-center gap-1.5 transition shadow-xs disabled:opacity-50"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{saving ? 'Saving...' : 'Save Credentials'}</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
              <Mail className="w-4 h-4 text-slate-400" />
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Admin Email</p>
                <p className="font-semibold text-slate-900">{user?.email}</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
              <Phone className="w-4 h-4 text-slate-400" />
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Official Phone Contact</p>
                <p className="font-semibold text-slate-900">{user?.phone || '01711000001'}</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
              <Key className="w-4 h-4 text-purple-600" />
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Access Level</p>
                <p className="font-semibold text-slate-900">Level 1 - Root Dispatch Authority</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
              <Activity className="w-4 h-4 text-emerald-600" />
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Audit Logging</p>
                <p className="font-semibold text-slate-900">Immutable Logging Enabled</p>
              </div>
            </div>
          </div>
        )}

        {/* Security & Quick Actions */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-md space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-purple-400" />
              <h4 className="font-bold text-sm">Security & Audit Governance</h4>
            </div>
            <Link
              to="/admin/audit-logs"
              className="text-xs font-semibold text-purple-300 hover:text-white flex items-center gap-1"
            >
              <span>View Audit Trail</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed">
            All administrative actions including technician dispatches, outage schedule modifications, and security updates are cryptographically hashed and recorded to the immutable audit log table.
          </p>
        </div>
      </div>
    </div>
  );
};
```

---

## <a id="file-45"></a>[45] `web/src/pages/TechnicianDashboard.jsx`

- **Path:** `Power-Pulse-main/web/src/pages/TechnicianDashboard.jsx`  
- **Language:** `jsx`  
- **Lines of Code:** `519` lines  

```jsx
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { StatusBadge } from '../components/StatusBadge';
import { Modal } from '../components/Modal';
import { 
  Wrench, CheckCircle2, Clock, Phone, MapPin, 
  AlertTriangle, RefreshCw, Send, Check, Search, 
  RotateCcw, ArrowRight, ShieldAlert, Sparkles, SlidersHorizontal
} from 'lucide-react';

export const TechnicianDashboard = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Status transition modal state
  const [activeTask, setActiveTask] = useState(null);
  const [remarks, setRemarks] = useState('');
  const [targetStatus, setTargetStatus] = useState('');
  const [isRollback, setIsRollback] = useState(false);
  const [updating, setUpdating] = useState(false);

  // Undo System (Temporary banner for instant accidental rollback)
  const [recentAction, setRecentAction] = useState(null);
  const undoTimeoutRef = useRef(null);

  const fetchAssignments = async () => {
    try {
      setLoading(true);
      const res = await api.get('/technician/assignments');
      setAssignments(res.data.assignments || []);
    } catch (err) {
      console.error('Error fetching technician tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignments();
    return () => {
      if (undoTimeoutRef.current) clearTimeout(undoTimeoutRef.current);
    };
  }, []);

  const availableCategories = useMemo(() => {
    return Array.from(new Set(assignments.map(a => a.category).filter(Boolean)));
  }, [assignments]);

  const filteredAssignments = useMemo(() => {
    return assignments.filter(task => {
      if (statusFilter !== 'all' && task.status !== statusFilter) return false;
      if (categoryFilter !== 'all' && task.category !== categoryFilter) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchId = String(task.complaint_id || '').toLowerCase().includes(q);
        const matchDesc = (task.description || '').toLowerCase().includes(q);
        const matchArea = (task.area || '').toLowerCase().includes(q);
        const matchConsumer = (task.consumer_name || '').toLowerCase().includes(q);
        const matchCategory = (task.category || '').toLowerCase().includes(q);
        if (!matchId && !matchDesc && !matchArea && !matchConsumer && !matchCategory) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.created_at || b.assigned_at || 0) - new Date(a.created_at || a.assigned_at || 0);
      if (sortBy === 'oldest') return new Date(a.created_at || a.assigned_at || 0) - new Date(b.created_at || b.assigned_at || 0);
      if (sortBy === 'consumer') return (a.consumer_name || '').localeCompare(b.consumer_name || '');
      if (sortBy === 'status') return (a.status || '').localeCompare(b.status || '');
      return 0;
    });
  }, [assignments, searchQuery, statusFilter, categoryFilter, sortBy]);

  const hasActiveFilters = searchQuery.trim() !== '' || statusFilter !== 'all' || categoryFilter !== 'all' || sortBy !== 'newest';

  const clearFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setCategoryFilter('all');
    setSortBy('newest');
  };

  const openStatusModal = (task, newStatus, rollback = false) => {
    setActiveTask(task);
    setTargetStatus(newStatus);
    setIsRollback(rollback);
    if (rollback) {
      setRemarks(`Rollback to ${newStatus}: Accidental status advance corrected.`);
    } else {
      setRemarks(task.remarks || '');
    }
  };

  const submitStatusUpdate = async (e) => {
    e.preventDefault();
    if (!activeTask || !targetStatus) return;

    const previousStatus = activeTask.status;
    const previousRemarks = activeTask.remarks || '';
    const assignmentId = activeTask.assignment_id;
    const complaintId = activeTask.complaint_id;

    try {
      setUpdating(true);
      await api.patch(`/technician/assignments/${assignmentId}`, {
        status: targetStatus,
        remarks: remarks || `Status transitioned to ${targetStatus}`
      });

      // Set Undo Toast
      if (undoTimeoutRef.current) clearTimeout(undoTimeoutRef.current);
      setRecentAction({
        assignmentId,
        complaintId,
        previousStatus,
        previousRemarks,
        newStatus: targetStatus
      });

      // Auto dismiss undo after 14 seconds
      undoTimeoutRef.current = setTimeout(() => {
        setRecentAction(null);
      }, 14000);

      setActiveTask(null);
      fetchAssignments();
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to update task status');
    } finally {
      setUpdating(false);
    }
  };

  // Instant 1-click Undo Handler
  const handleInstantUndo = async () => {
    if (!recentAction) return;
    try {
      setUpdating(true);
      await api.patch(`/technician/assignments/${recentAction.assignmentId}`, {
        status: recentAction.previousStatus,
        remarks: `[Accidental click reverted] Restored to ${recentAction.previousStatus}. ${recentAction.previousRemarks || ''}`
      });
      setRecentAction(null);
      fetchAssignments();
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to undo status change');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Assigned Field Work Orders</h2>
          <p className="text-xs text-slate-500 mt-0.5">Accept dispatched tickets, log diagnostic remarks, and resolve or rollback faults</p>
        </div>
        <button
          onClick={fetchAssignments}
          className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition flex items-center gap-2 text-xs font-semibold shadow-sm self-start sm:self-auto"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Accidental Click Instant Undo Toast Banner */}
      {recentAction && (
        <div className="p-3.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-2xl shadow-lg flex items-center justify-between gap-4 animate-fadeIn border border-amber-400">
          <div className="flex items-center gap-2.5 text-xs">
            <span className="p-1.5 bg-white/20 rounded-xl">
              <RotateCcw className="w-4 h-4 animate-spin" />
            </span>
            <div>
              <p className="font-bold">
                Task #CMP-{recentAction.complaintId} changed to [{recentAction.newStatus.toUpperCase()}]
              </p>
              <p className="text-[11px] text-amber-100">
                Was this a misclick? You can revert back to [{recentAction.previousStatus.toUpperCase()}] immediately.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleInstantUndo}
              disabled={updating}
              className="px-3.5 py-1.5 bg-white text-amber-900 hover:bg-amber-50 rounded-xl text-xs font-bold transition shadow-sm flex items-center gap-1.5 shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{updating ? 'Reverting...' : 'Undo Status Change'}</span>
            </button>
            <button
              onClick={() => setRecentAction(null)}
              className="p-1 hover:bg-white/20 rounded-lg text-white/80 hover:text-white text-xs"
              title="Dismiss"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search ID, consumer, area, fault..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition"
            />
          </div>

          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-700 font-medium capitalize transition"
            >
              <option value="all">All Task Statuses</option>
              <option value="assigned">Assigned</option>
              <option value="investigating">Investigating</option>
              <option value="repairing">Repairing</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>

          <div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-700 font-medium capitalize transition"
            >
              <option value="all">All Fault Categories</option>
              {availableCategories.map(cat => (
                <option key={cat} value={cat}>{cat.replace('_', ' ')}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-700 font-medium transition"
            >
              <option value="newest">Newest Dispatched</option>
              <option value="oldest">Oldest Dispatched</option>
              <option value="consumer">Consumer Name (A-Z)</option>
              <option value="status">Status Stage</option>
            </select>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold text-xs transition whitespace-nowrap"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Result Counter */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>Showing <strong>{filteredAssignments.length}</strong> of <strong>{assignments.length}</strong> assignments</span>
        {hasActiveFilters && <span className="text-amber-600 font-medium">Filters active</span>}
      </div>

      {/* Task Queue Cards */}
      {assignments.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm">
          <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-900">All Field Tasks Cleared!</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            You currently have no pending assignments. You will be notified when a new complaint is dispatched to your zone.
          </p>
        </div>
      ) : filteredAssignments.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 text-center border border-slate-200 shadow-sm">
          <p className="font-semibold text-slate-600 mb-0.5 text-xs">No tasks match your filter criteria</p>
          <p className="text-[11px] text-slate-400">Try adjusting your search query, status or reset filters.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAssignments.map((task) => (
            <div
              key={task.assignment_id}
              className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm space-y-4 hover:border-slate-300 transition"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-500">
                      #CMP-{task.complaint_id}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 uppercase tracking-wider">
                      {task.category.replace('_', ' ')}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm mt-1">
                    {task.description || 'Emergency field repair required'}
                  </h3>
                </div>
                <StatusBadge status={task.status} />
              </div>

              {/* Location & Contact Meta */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2 text-slate-700">
                  <MapPin className="w-4 h-4 text-sky-600 shrink-0" />
                  <span className="font-medium">{task.area} ({task.district} • {task.zone})</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Consumer: <strong>{task.consumer_name}</strong> ({task.consumer_phone || 'No phone'})</span>
                </div>
              </div>

              {/* Remarks History */}
              {task.remarks && (
                <div className="text-xs text-slate-600 bg-amber-50/40 p-3 rounded-xl border border-amber-100">
                  <p className="font-semibold text-slate-800 text-[11px] uppercase tracking-wider mb-1">
                    Dispatch & Field Notes:
                  </p>
                  <p className="italic">"{task.remarks}"</p>
                </div>
              )}

              {/* Action Buttons: Forward Progress + Undo/Rollback Flexibility */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100">
                <Link
                  to={`/tech/assignments/${task.assignment_id}`}
                  className="text-xs font-semibold text-sky-600 hover:text-sky-700 underline flex items-center gap-1"
                >
                  <span>Work Order Details & Diagnostic Log</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <div className="flex items-center gap-2 flex-wrap">
                  {/* Assigned -> Advance to Investigating */}
                  {task.status === 'assigned' && (
                    <button
                      onClick={() => openStatusModal(task, 'investigating', false)}
                      className="px-3.5 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs shadow-sm transition"
                    >
                      Start Investigation
                    </button>
                  )}

                  {/* Investigating -> Forward to Repairing OR Undo back to Assigned */}
                  {task.status === 'investigating' && (
                    <>
                      <button
                        onClick={() => openStatusModal(task, 'assigned', true)}
                        className="px-3 py-1.5 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold text-xs transition flex items-center gap-1"
                        title="Mistakenly clicked? Revert to assigned"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Undo / Revert to Assigned</span>
                      </button>
                      <button
                        onClick={() => openStatusModal(task, 'repairing', false)}
                        className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs shadow-sm transition"
                      >
                        Commence Repair
                      </button>
                    </>
                  )}

                  {/* Repairing -> Forward to Resolved OR Undo back to Investigating */}
                  {task.status === 'repairing' && (
                    <>
                      <button
                        onClick={() => openStatusModal(task, 'investigating', true)}
                        className="px-3 py-1.5 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-800 font-semibold text-xs transition flex items-center gap-1"
                        title="Need to re-evaluate inspection? Revert to investigating"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Undo to Investigating</span>
                      </button>
                      <button
                        onClick={() => openStatusModal(task, 'resolved', false)}
                        className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-sm transition inline-flex items-center gap-1.5"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Complete & Resolve</span>
                      </button>
                    </>
                  )}

                  {/* Resolved -> Reopen / Undo back to Repairing */}
                  {task.status === 'resolved' && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1 mr-1">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Resolved</span>
                      </span>
                      <button
                        onClick={() => openStatusModal(task, 'repairing', true)}
                        className="px-3 py-1.5 rounded-xl border border-rose-300 bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold text-xs transition flex items-center gap-1 shadow-sm"
                        title="Mistakenly marked resolved or fault reoccurred? Reopen work order"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Reopen / Undo Resolution</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Confirmation & Status Transition Modal */}
      <Modal
        isOpen={Boolean(activeTask)}
        onClose={() => setActiveTask(null)}
        title={
          isRollback
            ? `⚠️ Rollback Work Order #${activeTask?.complaint_id} to [${targetStatus?.toUpperCase()}]`
            : `Update Task #${activeTask?.complaint_id} ➔ [${targetStatus?.toUpperCase()}]`
        }
      >
        <form onSubmit={submitStatusUpdate} className="space-y-4 text-xs">
          {/* Transition Visualizer */}
          <div className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 ${
            isRollback ? 'bg-rose-50/70 border-rose-200 text-rose-900' : 'bg-sky-50/70 border-sky-200 text-sky-900'
          }`}>
            <div className="text-center">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Current Stage</span>
              <span className="px-2.5 py-1 bg-white border rounded-lg font-bold text-xs uppercase mt-1 inline-block">
                {activeTask?.status}
              </span>
            </div>

            <ArrowRight className={`w-5 h-5 ${isRollback ? 'text-rose-500 rotate-180' : 'text-sky-500'}`} />

            <div className="text-center">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">
                {isRollback ? 'Revert Target' : 'New Stage'}
              </span>
              <span className={`px-2.5 py-1 border rounded-lg font-bold text-xs uppercase mt-1 inline-block ${
                isRollback ? 'bg-rose-600 text-white border-rose-700' : 'bg-sky-600 text-white border-sky-700'
              }`}>
                {targetStatus}
              </span>
            </div>
          </div>

          {isRollback ? (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="leading-snug">
                <strong>Status Rollback Notice:</strong> Reverting this status will notify the citizen that the work order is being re-evaluated or reopened.
              </p>
            </div>
          ) : (
            <p className="text-slate-600 leading-snug">
              Please document your field findings, parts replaced, or diagnostic notes before proceeding:
            </p>
          )}

          <div>
            <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Field Remarks / Diagnostic Notes *
            </label>
            <textarea
              required
              rows={4}
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder={isRollback 
                ? "State the reason for reverting this status (e.g. Accidental status click / Further sparking observed)..."
                : "e.g. Replaced burnt drop-out fuse at Pole #12. Voltage verified at 230V."
              }
              className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 text-xs"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setActiveTask(null)}
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={updating}
              className={`px-4 py-2 rounded-xl text-white font-semibold shadow-sm transition disabled:opacity-50 flex items-center gap-1.5 ${
                isRollback ? 'bg-rose-600 hover:bg-rose-500' : 'bg-sky-600 hover:bg-sky-500'
              }`}
            >
              {isRollback ? <RotateCcw className="w-3.5 h-3.5" /> : <Check className="w-3.5 h-3.5" />}
              <span>{updating ? 'Saving...' : isRollback ? 'Confirm Status Rollback' : 'Confirm Status Advance'}</span>
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
```

---

## <a id="file-46"></a>[46] `web/src/pages/TechnicianTaskDetail.jsx`

- **Path:** `Power-Pulse-main/web/src/pages/TechnicianTaskDetail.jsx`  
- **Language:** `jsx`  
- **Lines of Code:** `453` lines  

```jsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { StatusBadge } from '../components/StatusBadge';
import { Modal } from '../components/Modal';
import { 
  ArrowLeft, Wrench, CheckCircle2, Clock, Phone, MapPin, 
  Send, AlertTriangle, ShieldCheck, User, RotateCcw, 
  Check, SlidersHorizontal, ArrowRight
} from 'lucide-react';

export const TechnicianTaskDetail = () => {
  const { id } = useParams(); // assignment_id
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [remarks, setRemarks] = useState('');
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState('');

  // Confirmation Modal State (prevents accidental misclicks)
  const [modalOpen, setModalOpen] = useState(false);
  const [targetStatus, setTargetStatus] = useState('');
  const [isRollback, setIsRollback] = useState(false);

  // Undo System state
  const [recentAction, setRecentAction] = useState(null);
  const undoTimeoutRef = useRef(null);

  const fetchTask = async () => {
    try {
      setLoading(true);
      const res = await api.get('/technician/assignments');
      const found = (res.data.assignments || []).find(a => String(a.assignment_id) === String(id));
      if (!found) {
        alert('Work order not found');
        navigate('/tech');
        return;
      }
      setTask(found);
      setRemarks(found.remarks || '');
    } catch (err) {
      console.error('Error fetching assignment detail:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTask();
    return () => {
      if (undoTimeoutRef.current) clearTimeout(undoTimeoutRef.current);
    };
  }, [id]);

  const promptStatusChange = (newStatus, rollback = false) => {
    setTargetStatus(newStatus);
    setIsRollback(rollback);
    setModalOpen(true);
  };

  const confirmStatusUpdate = async (e) => {
    e.preventDefault();
    if (!targetStatus) return;

    const previousStatus = task.status;
    const previousRemarks = task.remarks || '';

    try {
      setUpdating(true);
      await api.patch(`/technician/assignments/${id}`, {
        status: targetStatus,
        remarks: remarks || `Field state progressed to ${targetStatus}`
      });

      setMessage(`Work order #${id} successfully updated to [${targetStatus.toUpperCase()}].`);
      setModalOpen(false);

      // Setup Undo Toast
      if (undoTimeoutRef.current) clearTimeout(undoTimeoutRef.current);
      setRecentAction({
        assignmentId: id,
        previousStatus,
        previousRemarks,
        newStatus: targetStatus
      });

      undoTimeoutRef.current = setTimeout(() => {
        setRecentAction(null);
      }, 14000);

      fetchTask();
      setTimeout(() => setMessage(''), 4000);
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to update work order');
    } finally {
      setUpdating(false);
    }
  };

  const handleInstantUndo = async () => {
    if (!recentAction) return;
    try {
      setUpdating(true);
      await api.patch(`/technician/assignments/${id}`, {
        status: recentAction.previousStatus,
        remarks: `[Accidental click reverted] Restored to ${recentAction.previousStatus}. ${recentAction.previousRemarks || ''}`
      });
      setMessage(`Status reverted back to [${recentAction.previousStatus.toUpperCase()}].`);
      setRecentAction(null);
      fetchTask();
      setTimeout(() => setMessage(''), 4000);
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to undo status change');
    } finally {
      setUpdating(false);
    }
  };

  if (loading || !task) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const steps = ['assigned', 'investigating', 'repairing', 'resolved'];
  const currentIndex = steps.indexOf(task.status);

  return (
    <div className="space-y-6 animate-fadeIn max-w-3xl mx-auto">
      {/* Back button */}
      <div>
        <Link
          to="/tech"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 transition mb-3"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Assignments</span>
        </Link>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Work Order #CMP-{task.complaint_id}</h2>
          <StatusBadge status={task.status} />
        </div>
      </div>

      {/* Undo Banner if action was just executed */}
      {recentAction && (
        <div className="p-3.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-2xl shadow-lg flex items-center justify-between gap-4 animate-fadeIn border border-amber-400 text-xs">
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 bg-white/20 rounded-xl">
              <RotateCcw className="w-4 h-4 animate-spin" />
            </span>
            <div>
              <p className="font-bold">
                Status updated to [{recentAction.newStatus.toUpperCase()}].
              </p>
              <p className="text-[11px] text-amber-100">
                Accidental click? You can rollback to [{recentAction.previousStatus.toUpperCase()}].
              </p>
            </div>
          </div>
          <button
            onClick={handleInstantUndo}
            disabled={updating}
            className="px-3 py-1.5 bg-white text-amber-900 hover:bg-amber-50 rounded-xl text-xs font-bold transition shadow-sm flex items-center gap-1.5 shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{updating ? 'Reverting...' : 'Undo Status Change'}</span>
          </button>
        </div>
      )}

      {message && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{message}</span>
        </div>
      )}

      {/* Lifecycle Progress Bar */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
        <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-4">Job Progression Lifecycle</p>
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-slate-200 w-full z-0"></div>
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-amber-500 transition-all duration-500 z-0"
            style={{ width: `${(Math.max(0, currentIndex) / (steps.length - 1)) * 100}%` }}
          ></div>

          {steps.map((s, idx) => {
            const isCompleted = idx <= currentIndex;
            const isCurrent = idx === currentIndex;
            return (
              <div key={s} className="flex flex-col items-center relative z-10">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border-2 transition ${
                    isCurrent
                      ? 'bg-amber-500 border-amber-600 text-white shadow-md ring-4 ring-amber-100'
                      : isCompleted
                      ? 'bg-emerald-500 border-emerald-600 text-white'
                      : 'bg-white border-slate-300 text-slate-400'
                  }`}
                >
                  {idx + 1}
                </div>
                <span className={`text-[10px] font-semibold mt-1.5 capitalize ${
                  isCurrent ? 'text-amber-700 font-bold' : isCompleted ? 'text-slate-800' : 'text-slate-400'
                }`}>
                  {s}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Details Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5 text-xs">
        <div>
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 uppercase tracking-wider">
            {task.category.replace('_', ' ')}
          </span>
          <h3 className="text-base font-bold text-slate-900 mt-2">{task.description}</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-100">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] text-slate-400 uppercase font-semibold flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-sky-600" />
              <span>Job Site Location</span>
            </span>
            <p className="font-bold text-slate-900 text-sm mt-1">{task.area}</p>
            <p className="text-slate-500 text-[11px]">{task.district} • {task.zone}</p>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(task.area + ', ' + task.district + ', Dhaka, Bangladesh')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2.5 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-sm transition w-full"
            >
              <MapPin className="w-3.5 h-3.5 text-white" />
              <span>🗺️ Navigate (Google Maps)</span>
            </a>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] text-slate-400 uppercase font-semibold flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span>Consumer Contact</span>
            </span>
            <p className="font-bold text-slate-900 text-sm mt-1">{task.consumer_name}</p>
            <p className="text-slate-500 text-[11px]">{task.consumer_phone || 'No phone recorded'}</p>
          </div>
        </div>

        {/* Remarks Section */}
        <div>
          <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Field Diagnostic Remarks & Parts Log *
          </label>
          <textarea
            rows={4}
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            placeholder="Document fuse replacement, cable splicing, line clearance, or transformer inspection..."
            className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-xs"
          />
        </div>

        {/* Action Buttons: Forward Progress + Undo/Rollback Flexibility */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          {/* Quick status selector (arbitrary corrections) */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-500 font-semibold">Change to:</span>
            <select
              value={task.status}
              onChange={(e) => {
                const newSt = e.target.value;
                if (newSt !== task.status) {
                  promptStatusChange(newSt, steps.indexOf(newSt) < currentIndex);
                }
              }}
              className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500 capitalize"
            >
              <option value="assigned">Assigned</option>
              <option value="investigating">Investigating</option>
              <option value="repairing">Repairing</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* If assigned -> advance to investigating */}
            {task.status === 'assigned' && (
              <button
                type="button"
                onClick={() => promptStatusChange('investigating', false)}
                className="py-2.5 px-5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-md transition"
              >
                Start Investigation
              </button>
            )}

            {/* If investigating -> Rollback to assigned OR Advance to repairing */}
            {task.status === 'investigating' && (
              <>
                <button
                  type="button"
                  onClick={() => promptStatusChange('assigned', true)}
                  className="py-2.5 px-3.5 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs transition flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Undo to Assigned</span>
                </button>
                <button
                  type="button"
                  onClick={() => promptStatusChange('repairing', false)}
                  className="py-2.5 px-5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-md transition"
                >
                  Commence Field Repair
                </button>
              </>
            )}

            {/* If repairing -> Rollback to investigating OR Advance to resolved */}
            {task.status === 'repairing' && (
              <>
                <button
                  type="button"
                  onClick={() => promptStatusChange('investigating', true)}
                  className="py-2.5 px-3.5 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold text-xs transition flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Undo to Investigating</span>
                </button>
                <button
                  type="button"
                  onClick={() => promptStatusChange('resolved', false)}
                  className="py-2.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Complete & Mark Restored</span>
                </button>
              </>
            )}

            {/* If resolved -> Reopen / Rollback work order */}
            {task.status === 'resolved' && (
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5 mr-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Work Order Resolved</span>
                </span>
                <button
                  type="button"
                  onClick={() => promptStatusChange('repairing', true)}
                  className="py-2.5 px-4 rounded-xl border border-rose-300 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs transition flex items-center gap-1.5 shadow-sm"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reopen / Undo Resolution</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Modal to prevent accidental clicks */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={
          isRollback 
            ? `⚠️ Confirm Rollback: Revert Work Order to [${targetStatus?.toUpperCase()}]`
            : `Confirm Status Advance to [${targetStatus?.toUpperCase()}]`
        }
      >
        <form onSubmit={confirmStatusUpdate} className="space-y-4 text-xs">
          <div className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 ${
            isRollback ? 'bg-rose-50/70 border-rose-200 text-rose-900' : 'bg-sky-50/70 border-sky-200 text-sky-900'
          }`}>
            <div className="text-center">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Current</span>
              <span className="px-2.5 py-1 bg-white border rounded-lg font-bold text-xs uppercase mt-1 inline-block">
                {task.status}
              </span>
            </div>

            <ArrowRight className={`w-5 h-5 ${isRollback ? 'text-rose-500 rotate-180' : 'text-sky-500'}`} />

            <div className="text-center">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Target</span>
              <span className={`px-2.5 py-1 border rounded-lg font-bold text-xs uppercase mt-1 inline-block ${
                isRollback ? 'bg-rose-600 text-white border-rose-700' : 'bg-sky-600 text-white border-sky-700'
              }`}>
                {targetStatus}
              </span>
            </div>
          </div>

          {isRollback ? (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="leading-snug">
                <strong>Status Rollback:</strong> You are undoing or reverting this work order. The citizen will be notified of this change.
              </p>
            </div>
          ) : (
            <p className="text-slate-600">
              Are you sure you want to transition this work order to <strong>[{targetStatus?.toUpperCase()}]</strong>?
            </p>
          )}

          <div>
            <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Field Notes / Remarks *
            </label>
            <textarea
              required
              rows={3}
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="State reason or resolution details..."
              className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 text-xs"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={updating}
              className={`px-4 py-2 rounded-xl text-white font-semibold shadow-sm transition disabled:opacity-50 flex items-center gap-1.5 ${
                isRollback ? 'bg-rose-600 hover:bg-rose-500' : 'bg-sky-600 hover:bg-sky-500'
              }`}
            >
              {isRollback ? <RotateCcw className="w-3.5 h-3.5" /> : <Check className="w-3.5 h-3.5" />}
              <span>{updating ? 'Saving...' : isRollback ? 'Confirm Rollback' : 'Confirm Status Update'}</span>
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
```

---

## <a id="file-47"></a>[47] `web/src/pages/TechnicianProfile.jsx`

- **Path:** `Power-Pulse-main/web/src/pages/TechnicianProfile.jsx`  
- **Language:** `jsx`  
- **Lines of Code:** `395` lines  

```jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { 
  User, ShieldCheck, MapPin, Mail, Phone, Calendar, 
  Award, Wrench, CheckCircle2, Clock, AlertTriangle, 
  Check, RefreshCw, Edit3, Save, ArrowRight
} from 'lucide-react';

export const TechnicianProfile = () => {
  const { user, updateUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  // Status state
  const [statusUpdating, setStatusUpdating] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  // Edit contact info state
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [savingInfo, setSavingInfo] = useState(false);
  const [infoMessage, setInfoMessage] = useState('');

  const fetchProfile = async () => {
    try {
      const res = await api.get('/technician/profile');
      if (res.data?.profile) {
        setProfile(res.data.profile);
        setEditName(res.data.profile.name || '');
        setEditPhone(res.data.profile.phone || '');
        // Keep AuthContext in sync
        updateUser({
          name: res.data.profile.name,
          phone: res.data.profile.phone,
          availability_status: res.data.profile.availability_status
        });
      }
    } catch (err) {
      console.error('Error fetching technician profile:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleStatusChange = async (newStatus) => {
    try {
      setStatusUpdating(true);
      await api.patch('/technician/status', { status: newStatus });
      setProfile(prev => ({ ...prev, availability_status: newStatus }));
      updateUser({ availability_status: newStatus });
      setStatusMessage(`Duty status changed to [${newStatus.replace('_', ' ').toUpperCase()}].`);
      setTimeout(() => setStatusMessage(''), 4000);
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to update duty status');
    } finally {
      setStatusUpdating(false);
    }
  };

  const handleSaveContact = async (e) => {
    e.preventDefault();
    try {
      setSavingInfo(true);
      const res = await api.patch('/technician/profile', {
        name: editName,
        phone: editPhone
      });
      if (res.data?.user) {
        setProfile(prev => ({
          ...prev,
          name: res.data.user.name,
          phone: res.data.user.phone
        }));
        updateUser({
          name: res.data.user.name,
          phone: res.data.user.phone
        });
        setIsEditing(false);
        setInfoMessage('Contact details updated successfully.');
        setTimeout(() => setInfoMessage(''), 4000);
      }
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to update profile info');
    } finally {
      setSavingInfo(false);
    }
  };

  const currentStatus = profile?.availability_status || user?.availability_status || 'available';

  const statusOptions = [
    {
      id: 'available',
      label: 'Available (On Duty)',
      color: 'border-emerald-500 bg-emerald-50 text-emerald-900',
      dot: 'bg-emerald-500 ring-emerald-300',
      desc: 'Ready for emergency dispatch & routine maintenance.'
    },
    {
      id: 'busy',
      label: 'Busy on Site',
      color: 'border-amber-500 bg-amber-50 text-amber-900',
      dot: 'bg-amber-500 ring-amber-300',
      desc: 'Actively performing inspection or repair on a work order.'
    },
    {
      id: 'on_leave',
      label: 'On Leave',
      color: 'border-orange-500 bg-orange-50 text-orange-900',
      dot: 'bg-orange-500 ring-orange-300',
      desc: 'Off duty, vacation, or scheduled rest day.'
    },
    {
      id: 'offline',
      label: 'Offline',
      color: 'border-slate-400 bg-slate-100 text-slate-800',
      dot: 'bg-slate-400 ring-slate-300',
      desc: 'Shift concluded. Not accepting work orders.'
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const stats = profile?.stats || {
    total_tasks: 0,
    active_tasks: 0,
    resolved_tasks: 0,
    completion_rate: 100
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-3xl mx-auto">
      {/* Title & Refresh */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Technician Profile & Duty Console</h2>
          <p className="text-xs text-slate-500 mt-0.5">Manage your duty availability, municipal zone base, and field metrics</p>
        </div>
        <button
          onClick={() => { setRefreshing(true); fetchProfile(); }}
          className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition flex items-center gap-2 text-xs font-semibold shadow-sm self-start sm:self-auto"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {statusMessage && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}

      {infoMessage && (
        <div className="p-3 bg-sky-50 border border-sky-200 text-sky-800 text-xs rounded-xl flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
          <span>{infoMessage}</span>
        </div>
      )}

      {/* Main Profile Header Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-400 text-white flex items-center justify-center font-bold text-2xl shadow-md border border-amber-300">
              {profile?.name?.charAt(0) || 'T'}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg font-bold text-slate-900">{profile?.name}</h3>
                <span className="px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-200 rounded-full font-mono text-xs font-bold">
                  Tech ID #{profile?.technician_id}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">{profile?.email}</p>
              <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-50 text-slate-700 border border-slate-200">
                <Wrench className="w-3.5 h-3.5 text-amber-600" />
                <span>Field Service Engineer</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-2 transition shadow-sm"
          >
            <Edit3 className="w-3.5 h-3.5 text-slate-500" />
            <span>{isEditing ? 'Cancel Edit' : 'Edit Contact Info'}</span>
          </button>
        </div>

        {/* Edit Form or View Grid */}
        {isEditing ? (
          <form onSubmit={handleSaveContact} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-4 text-xs animate-fadeIn">
            <p className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">Update Contact Credentials</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-600 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-600 mb-1">Mobile Contact Number</label>
                <input
                  type="text"
                  required
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  placeholder="e.g. 01712-345678"
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-3.5 py-1.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={savingInfo}
                className="px-4 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold flex items-center gap-1.5 transition disabled:opacity-50"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{savingInfo ? 'Saving...' : 'Save Profile Changes'}</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
              <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Phone Contact</p>
                <p className="font-semibold text-slate-900">{profile?.phone || 'Not provided'}</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
              <MapPin className="w-4 h-4 text-sky-600 shrink-0" />
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Base Area & Zone</p>
                <p className="font-semibold text-slate-900">{profile?.area || 'Mirpur-10'}</p>
                <p className="text-[10px] text-slate-500">{profile?.district} • {profile?.zone}</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
              <Mail className="w-4 h-4 text-purple-600 shrink-0" />
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">System Email</p>
                <p className="font-semibold text-slate-900 truncate max-w-[150px]">{profile?.email}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Duty Availability Selector Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div>
          <h3 className="font-bold text-slate-900 text-sm tracking-tight flex items-center gap-2">
            <span>Duty Availability Status</span>
            <span className="text-[11px] font-normal text-slate-500">(Click to switch anytime)</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Admins and automated dispatch engines use this status to assign urgent grid faults and line repairs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {statusOptions.map((opt) => {
            const isSelected = currentStatus === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                disabled={statusUpdating}
                onClick={() => handleStatusChange(opt.id)}
                className={`p-3.5 rounded-2xl border-2 text-left transition flex items-start gap-3 relative ${
                  isSelected 
                    ? `${opt.color} shadow-sm ring-2 ring-offset-1 ring-slate-400/20` 
                    : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                }`}
              >
                <span className={`w-3 h-3 rounded-full mt-0.5 shrink-0 ring-4 ${opt.dot}`}></span>
                <div className="flex-1 pr-6">
                  <span className="font-bold text-xs block">{opt.label}</span>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{opt.desc}</p>
                </div>
                {isSelected && (
                  <CheckCircle2 className="w-4 h-4 absolute right-3.5 top-3.5 text-current shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Performance Metrics Dashboard */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-sm tracking-tight">Work Order Performance & Statistics</h3>
            <p className="text-xs text-slate-500 mt-0.5">Summary of field assignments and fault resolution efficiency</p>
          </div>
          <Link
            to="/tech"
            className="text-xs font-semibold text-amber-600 hover:text-amber-700 inline-flex items-center gap-1"
          >
            <span>Open Tasks</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 4 Stat Boxes */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Assigned</span>
            <span className="text-xl font-extrabold text-slate-900 mt-1 block">{stats.total_tasks}</span>
            <span className="text-[10px] text-slate-500">Lifetime jobs</span>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-100">
            <span className="text-[10px] uppercase font-bold text-amber-700 block">Active Tasks</span>
            <span className="text-xl font-extrabold text-amber-900 mt-1 block">{stats.active_tasks}</span>
            <span className="text-[10px] text-amber-700/80">Pending repair</span>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-100">
            <span className="text-[10px] uppercase font-bold text-emerald-700 block">Resolved</span>
            <span className="text-xl font-extrabold text-emerald-900 mt-1 block">{stats.resolved_tasks}</span>
            <span className="text-[10px] text-emerald-700/80">Successfully restored</span>
          </div>

          <div className="p-3.5 rounded-xl bg-purple-50/60 border border-purple-100">
            <span className="text-[10px] uppercase font-bold text-purple-700 block">Completion</span>
            <span className="text-xl font-extrabold text-purple-900 mt-1 block">{stats.completion_rate}%</span>
            <span className="text-[10px] text-purple-700/80">Resolution rate</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="p-4 rounded-xl bg-slate-900 text-white space-y-3">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span className="font-bold">Fault Resolution Rate</span>
            </div>
            <span className="font-mono font-bold text-amber-400">{stats.completion_rate}%</span>
          </div>

          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-amber-500 to-emerald-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${stats.completion_rate}%` }}
            ></div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
            <span>Assigned: {stats.assigned_tasks || 0}</span>
            <span>Investigating: {stats.investigating_tasks || 0}</span>
            <span>Repairing: {stats.repairing_tasks || 0}</span>
            <span className="text-emerald-400 font-semibold">Resolved: {stats.resolved_tasks || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
```

---


# SECTION 5: CONSUMER FEATURE COMPONENTS (MOBILE-FIRST)
_1-tap emergency outage button, camera photo hazard attachment, smart meter kWh breakdown, and bKash pay modal._

---

## <a id="file-48"></a>[48] `web/src/features/consumer/components/index.js`

- **Path:** `Power-Pulse-main/web/src/features/consumer/components/index.js`  
- **Language:** `javascript`  
- **Lines of Code:** `7` lines  

```javascript
export { OutageReportingCard } from './OutageReportingCard';
export { ComplaintFilingCard } from './ComplaintFilingCard';
export { PlannedOutagesCard } from './PlannedOutagesCard';
export { ComplaintHistoryCard } from './ComplaintHistoryCard';
export { SmartMeterCard } from './SmartMeterCard';
export { BillPaymentModal } from './BillPaymentModal';
```

---

## <a id="file-49"></a>[49] `web/src/features/consumer/components/OutageReportingCard.jsx`

- **Path:** `Power-Pulse-main/web/src/features/consumer/components/OutageReportingCard.jsx`  
- **Language:** `jsx`  
- **Lines of Code:** `269` lines  

```jsx
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

  const isOutageConfirmed = Boolean(activeOutage);
  const isPersonalOutageReported = !isOutageConfirmed && lastReportType === 'OFF';
  const isGridNormal = !isOutageConfirmed && lastReportType !== 'OFF';

  return (
    <div className="space-y-4">
      {/* 1. Main Status Banner */}
      <div
        className={`rounded-2xl p-6 border shadow-sm transition ${
          isOutageConfirmed
            ? 'bg-red-50/70 border-red-200'
            : isPersonalOutageReported
            ? 'bg-rose-50/80 border-rose-300'
            : 'bg-emerald-50/70 border-emerald-200'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div
              className={`p-3 rounded-2xl ${
                isOutageConfirmed || isPersonalOutageReported
                  ? 'bg-red-500 text-white'
                  : 'bg-emerald-500 text-white'
              }`}
            >
              {isOutageConfirmed || isPersonalOutageReported ? (
                <ZapOff className="w-7 h-7" />
              ) : (
                <Zap className="w-7 h-7 fill-white" />
              )}
            </div>
            <div>
              <span
                className={`text-[11px] font-bold uppercase tracking-wider ${
                  isOutageConfirmed || isPersonalOutageReported ? 'text-red-700' : 'text-emerald-700'
                }`}
              >
                {isPersonalOutageReported ? 'Your Outage Signal Active' : 'Current Area Grid Status'}
              </span>
              <h2 className="text-xl font-bold text-slate-900 mt-0.5">
                {isOutageConfirmed
                  ? 'Electricity Outage Detected in Your Area'
                  : isPersonalOutageReported
                  ? 'Power Outage Reported by You'
                  : 'Power Grid Active & Online'}
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                {isOutageConfirmed
                  ? `Incident #${activeOutage.incident_id} detected with ${activeOutage.total_reports} corroborating reports.`
                  : isPersonalOutageReported
                  ? 'Your electricity failure report is logged. Monitoring neighborhood signals for community grid confirmation.'
                  : 'No grid disruptions reported in your neighborhood.'}
              </p>
            </div>
          </div>

          {isOutageConfirmed && (
            <ConfidenceBadge
              score={activeOutage.confidence_score}
              classification={activeOutage.classification}
            />
          )}

          {isPersonalOutageReported && (
            <span className="self-start sm:self-center px-3 py-1.5 rounded-full bg-rose-100 text-rose-700 font-bold text-xs border border-rose-200 flex items-center gap-1.5 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
              Signal Logged
            </span>
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
              {reportResult.gps && (
                <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-sky-100 text-sky-800 text-[11px] font-semibold">
                  <span>📍 Auto-GPS Verified: {reportResult.gps.latitude?.toFixed(4)}°N, {reportResult.gps.longitude?.toFixed(4)}°E ({reportResult.gps.source})</span>
                </div>
              )}
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
```

---

## <a id="file-50"></a>[50] `web/src/features/consumer/components/ComplaintFilingCard.jsx`

- **Path:** `Power-Pulse-main/web/src/features/consumer/components/ComplaintFilingCard.jsx`  
- **Language:** `jsx`  
- **Lines of Code:** `149` lines  

```jsx
import React, { useState, useRef } from 'react';
import { MessageSquarePlus, Camera, Image, X, CheckCircle2 } from 'lucide-react';

/**
 * 📝 Feature: Electrical Complaint Filing Card with Camera Photo Proof
 */
export const ComplaintFilingCard = ({
  category,
  onCategoryChange,
  description,
  onDescriptionChange,
  submitting,
  successMessage,
  onSubmit
}) => {
  const [photoPreview, setPhotoPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setPhotoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
    if (!submitting) {
      setTimeout(() => setPhotoPreview(null), 1000);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
      <div>
        <h3 className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-2">
          <MessageSquarePlus className="w-4 h-4 text-sky-600" />
          <span>Submit Electrical Complaint</span>
        </h3>
        <p className="text-xs text-slate-500 mb-4">
          File low voltage, transformer sparks, or damaged wiring issues
        </p>

        {successMessage && (
          <div className="mb-4 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        <form onSubmit={handleFormSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Issue Category *
            </label>
            <select
              value={category}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium"
            >
              <option value="power_outage">Power Outage</option>
              <option value="low_voltage">Low Voltage</option>
              <option value="transformer">Transformer Sparks / Smoke</option>
              <option value="damaged_wire">Damaged / Hanging Cable</option>
              <option value="pole">Electric Pole Damaged</option>
              <option value="other">Other Concern</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Description / Landmark *
            </label>
            <textarea
              required
              rows={2}
              value={description}
              onChange={(e) => onDescriptionChange(e.target.value)}
              placeholder="e.g. Near House 12, Road 4. The pole transformer is emitting sparks."
              className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* 📸 Camera Photo Proof Feature */}
          <div>
            <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Hazard Photo Proof (Camera / Gallery)
            </label>
            <input
              type="file"
              accept="image/*"
              capture="environment"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
            {photoPreview ? (
              <div className="relative rounded-xl overflow-hidden border border-slate-300 bg-slate-100 max-h-36">
                <img
                  src={photoPreview}
                  alt="Incident Proof"
                  className="w-full h-32 object-cover"
                />
                <button
                  type="button"
                  onClick={removePhoto}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 hover:bg-black text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
                <div className="absolute bottom-1 left-2 text-[10px] text-white bg-black/50 px-2 py-0.5 rounded">
                  📸 Photo Attached
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-2 px-3 border border-dashed border-sky-400 bg-sky-50/50 hover:bg-sky-50 text-sky-700 rounded-xl font-medium flex items-center justify-center gap-2 transition"
              >
                <Camera className="w-4 h-4 text-sky-600" />
                <span>Take Photo / Attach Hazard Image</span>
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold shadow-sm transition disabled:opacity-50"
          >
            {submitting ? 'Submitting...' : 'File Ticket'}
          </button>
        </form>
      </div>
    </div>
  );
};
```

---

## <a id="file-51"></a>[51] `web/src/features/consumer/components/ComplaintHistoryCard.jsx`

- **Path:** `Power-Pulse-main/web/src/features/consumer/components/ComplaintHistoryCard.jsx`  
- **Language:** `jsx`  
- **Lines of Code:** `160` lines  

```jsx
import React, { useState, useMemo } from 'react';
import { StatusBadge } from '../../../components/StatusBadge';
import { Search } from 'lucide-react';

/**
 * 📋 Feature: Citizen Complaint Tracking History
 * ----------------------------------------------------
 * What this does:
 * Displays all tickets filed by this citizen, showing:
 * 1. The complaint ticket ID (#CMP-XX)
 * 2. Status badge (Pending, Dispatched, Resolved)
 * 3. The name and phone of the assigned field technician
 * 4. Diagnostic notes left by the technician after visiting
 * 5. Full search, filter, and sorting capabilities
 */
export const ComplaintHistoryCard = ({ complaints = [] }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const filteredComplaints = useMemo(() => {
    return complaints.filter((c) => {
      if (statusFilter !== 'all' && c.status !== statusFilter) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchId = String(c.complaint_id || '').toLowerCase().includes(q);
        const matchCat = (c.category || '').toLowerCase().includes(q);
        const matchDesc = (c.description || '').toLowerCase().includes(q);
        const matchTech = (c.technician_name || '').toLowerCase().includes(q);
        if (!matchId && !matchCat && !matchDesc && !matchTech) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'newest') return (b.complaint_id || 0) - (a.complaint_id || 0);
      if (sortBy === 'oldest') return (a.complaint_id || 0) - (b.complaint_id || 0);
      return 0;
    });
  }, [complaints, searchQuery, statusFilter, sortBy]);

  const hasActiveFilters = searchQuery.trim() !== '' || statusFilter !== 'all' || sortBy !== 'newest';

  const clearFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setSortBy('newest');
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <h3 className="text-sm font-bold text-slate-900">
          My Complaint Tracking History
        </h3>
        {complaints.length > 0 && (
          <span className="text-xs text-slate-400">
            {filteredComplaints.length} of {complaints.length} tickets
          </span>
        )}
      </div>

      {complaints.length === 0 ? (
        <p className="text-xs text-slate-400">
          You have not submitted any complaints yet.
        </p>
      ) : (
        <>
          {/* Search & Filter controls */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search ticket, category, notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition"
              />
            </div>

            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-700 capitalize font-medium transition"
              >
                <option value="all">All Ticket Statuses</option>
                <option value="pending">Pending Dispatch</option>
                <option value="assigned">Assigned</option>
                <option value="investigating">Investigating</option>
                <option value="repairing">Repairing</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>

            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-700 font-medium transition"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold text-xs transition whitespace-nowrap"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          {filteredComplaints.length === 0 ? (
            <p className="text-xs text-slate-400 py-3 text-center">
              No complaint tickets match your search.
            </p>
          ) : (
            <div className="space-y-3">
              {filteredComplaints.map((c) => (
                <div
                  key={c.complaint_id}
                  className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs hover:border-slate-300 transition"
                >
                  <div>
                    <div className="flex items-center gap-2 font-bold text-slate-900">
                      <span>#CMP-{c.complaint_id}</span>
                      <span className="capitalize px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-200 text-slate-800">
                        {c.category?.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-slate-600 mt-1">{c.description}</p>
                    {c.technician_name && (
                      <p className="text-[11px] text-sky-700 mt-1">
                        Assigned Tech: <strong>{c.technician_name}</strong> (
                        {c.technician_phone})
                      </p>
                    )}
                    {c.tech_remarks && (
                      <p className="text-[11px] text-slate-500 italic mt-0.5">
                        Note: "{c.tech_remarks}"
                      </p>
                    )}
                  </div>
                  <div className="shrink-0">
                    <StatusBadge status={c.status} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};
```

---

## <a id="file-52"></a>[52] `web/src/features/consumer/components/PlannedOutagesCard.jsx`

- **Path:** `Power-Pulse-main/web/src/features/consumer/components/PlannedOutagesCard.jsx`  
- **Language:** `jsx`  
- **Lines of Code:** `51` lines  

```jsx
import React from 'react';
import { Clock } from 'lucide-react';

/**
 * 📅 Feature: Scheduled Load-Shedding & Maintenance Card
 * ----------------------------------------------------
 * What this does:
 * Shows citizens upcoming power maintenance or planned load-shedding
 * announced in advance by the city utility company (e.g. DPDC / DESCO).
 *
 * Analogy for beginners:
 * Think of this as the "School Calendar". It tells you ahead of time when
 * the power will take a planned nap so engineers can fix the wires!
 */
export const PlannedOutagesCard = ({ plannedOutages = [] }) => {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col">
      <h3 className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-2">
        <Clock className="w-4 h-4 text-amber-600" />
        <span>Upcoming Scheduled Load-Shedding</span>
      </h3>
      <p className="text-xs text-slate-500 mb-4">
        Official maintenance windows announced by utility administration
      </p>

      <div className="flex-1 space-y-3 overflow-y-auto max-h-64">
        {plannedOutages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-xs text-slate-400 italic py-8">
            No upcoming maintenance scheduled for your zone.
          </div>
        ) : (
          plannedOutages.map((p) => (
            <div
              key={p.planned_id}
              className="p-3 rounded-xl border border-slate-100 bg-slate-50 text-xs"
            >
              <div className="flex items-center justify-between font-bold text-slate-900">
                <span>{p.outage_date}</span>
                <span className="text-sky-700 font-mono">
                  {p.start_time} - {p.end_time}
                </span>
              </div>
              <p className="text-slate-600 mt-1">{p.reason}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
```

---

## <a id="file-53"></a>[53] `web/src/features/consumer/components/SmartMeterCard.jsx`

- **Path:** `Power-Pulse-main/web/src/features/consumer/components/SmartMeterCard.jsx`  
- **Language:** `jsx`  
- **Lines of Code:** `111` lines  

```jsx
import React from 'react';
import { CreditCard } from 'lucide-react';
import { StatusBadge } from '../../../components/StatusBadge';

/**
 * 📟 Feature: Smart Meter & Electricity Bill Module
 * ----------------------------------------------------
 * What this does:
 * 1. Simulates an IoT Smart Meter reading energy consumption in kWh.
 * 2. Displays the citizen's current electricity bill amount (in BDT).
 * 3. Shows if the bill is Paid or Unpaid.
 * 4. Lets the user click "PAY BILL" to test mobile banking payment.
 *
 * Analogy for beginners:
 * Think of this as the "Odometer in a Car". It counts every unit of electricity
 * used by lights, fans, and computers, and calculates the pocket money needed to pay!
 */
export const SmartMeterCard = ({
  bill,
  paymentResult,
  onOpenPaymentModal
}) => {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-sky-600" />
            <span>Smart Meter & Electricity Bill (Simulation Module)</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Track real-time energy consumption and test simulated utility payments
          </p>
        </div>
        {bill && <StatusBadge status={bill.status} />}
      </div>

      {/* Metric Counters: Consumption, Daily Average, Bill Amount */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
          <span className="text-[11px] text-slate-500 font-semibold uppercase">
            Current Consumption
          </span>
          <p className="text-xl font-bold text-slate-900 mt-1">
            {bill?.consumption_kwh || 143.2}{' '}
            <span className="text-xs font-normal text-slate-500">kWh</span>
          </p>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
          <span className="text-[11px] text-slate-500 font-semibold uppercase">
            Daily Average
          </span>
          <p className="text-xl font-bold text-slate-900 mt-1">
            4.8 <span className="text-xs font-normal text-slate-500">kWh/day</span>
          </p>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
          <span className="text-[11px] text-slate-500 font-semibold uppercase">
            Current Bill Amount
          </span>
          <p className="text-xl font-bold text-sky-600 mt-1">
            Tk {bill?.amount || '1,280'}
          </p>
        </div>
      </div>

      {/* Success banner if just paid */}
      {paymentResult && (
        <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800">
          <p className="font-bold">Payment Successful ✓</p>
          <p className="mt-0.5 font-mono">
            Transaction ID: {paymentResult.transaction_id} • Status: PAID
          </p>
        </div>
      )}

      {/* Pay Bill button or Paid Confirmation */}
      {bill?.status === 'unpaid' ? (
        <button
          onClick={onOpenPaymentModal}
          className="w-full py-3 rounded-2xl bg-[#E2136E] hover:bg-[#c90f61] text-white font-bold text-sm shadow-md shadow-pink-500/20 transition-all flex items-center justify-center gap-2"
        >
          <span>Pay Bill via bKash (৳ {bill.amount})</span>
        </button>
      ) : (
        <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl text-xs text-emerald-800 space-y-1">
          <div className="flex items-center justify-between font-bold">
            <span className="flex items-center gap-1.5 text-emerald-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Bill Paid via bKash</span>
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px]">
              CONFIRMED
            </span>
          </div>
          {bill?.transaction_id && (
            <p className="font-mono text-[11px] text-emerald-900 pt-1">
              bKash TrxID: <strong>{bill.transaction_id}</strong>
            </p>
          )}
          {bill?.paid_at && (
            <p className="text-[10px] text-emerald-600">
              Payment Confirmed: {new Date(bill.paid_at).toLocaleString()}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
```

---

## <a id="file-54"></a>[54] `web/src/features/consumer/components/BillPaymentModal.jsx`

- **Path:** `Power-Pulse-main/web/src/features/consumer/components/BillPaymentModal.jsx`  
- **Language:** `jsx`  
- **Lines of Code:** `230` lines  

```jsx
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Zap, Copy, Check, Sparkles, Smartphone, ShieldCheck, ArrowRight } from 'lucide-react';

/**
 * 💳 Feature: bKash Manual / TrxID Bill Payment Modal
 * ----------------------------------------------------
 * Allows citizens to pay utility bills by transferring to the official
 * bKash merchant account and submitting their bKash Transaction ID (TrxID).
 */
export const BillPaymentModal = ({
  bill,
  paying,
  onPay,
  onClose
}) => {
  const [senderPhone, setSenderPhone] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const BKASH_MERCHANT_NUMBER = '01712-345678';

  // Lock body scroll and handle Escape key while modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const copyMerchantNumber = () => {
    navigator.clipboard.writeText('01712345678');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAutoFillDemo = () => {
    // Generates realistic bKash TrxID (e.g. BK8J92Q4LP)
    const randomChars = Math.random().toString(36).substring(2, 10).toUpperCase();
    const demoTrx = `BK${randomChars}`;
    setTransactionId(demoTrx);
    if (!senderPhone) {
      setSenderPhone('01712998877');
    }
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const cleanTrx = transactionId.trim().toUpperCase();
    if (!cleanTrx) {
      setError('Please enter your bKash Transaction ID (TrxID).');
      return;
    }

    if (cleanTrx.length < 6) {
      setError('Transaction ID must be at least 6 alphanumeric characters.');
      return;
    }

    onPay({
      transaction_id: cleanTrx,
      sender_phone: senderPhone.trim() || null
    });
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden text-xs">
        {/* bKash Signature Header */}
        <div className="bg-[#E2136E] p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center border border-white/30 shadow-xs">
              <Zap className="w-5 h-5 fill-white text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm tracking-tight">bKash</span>
                <span className="text-[10px] uppercase font-bold tracking-wider bg-white/20 px-2 py-0.5 rounded-full">Bill Pay</span>
              </div>
              <p className="text-[11px] text-pink-100 font-medium">PowerPulse Grid Utility Billing</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white text-sm font-bold p-1 rounded-lg hover:bg-white/10 transition"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Bill Overview Card */}
          <div className="p-3.5 rounded-2xl bg-pink-50/60 border border-pink-100 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-pink-600 uppercase tracking-wider block">Total Payable Amount</span>
              <span className="text-xl font-extrabold text-slate-900">৳ {bill?.amount || '1,280'}</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 font-medium block">Consumption</span>
              <span className="font-bold text-slate-700">{bill?.consumption_kwh || '143.2'} kWh</span>
            </div>
          </div>

          {/* Payment Instructions & Merchant Details */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                Official bKash Account
              </span>
              <button
                type="button"
                onClick={copyMerchantNumber}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-pink-600 hover:text-pink-700"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied!' : 'Copy Number'}</span>
              </button>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200 font-mono text-sm font-bold text-slate-900">
              <span>{BKASH_MERCHANT_NUMBER}</span>
              <span className="text-[10px] font-sans font-semibold text-slate-400 uppercase">Merchant</span>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed">
              1. Open bKash app → <strong>Send Money</strong> or <strong>Make Payment</strong> to the number above.<br />
              2. Use Reference: <strong className="font-mono text-slate-800">PP{bill?.bill_id || '1'}</strong>.<br />
              3. Enter your bKash Mobile No. and received <strong>Transaction ID (TrxID)</strong> below.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-[11px] font-medium">
              {error}
            </div>
          )}

          {/* Input Fields */}
          <div className="space-y-3">
            <div>
              <label className="block font-bold text-slate-700 text-[11px] uppercase tracking-wider mb-1">
                Your bKash Mobile Number (Optional)
              </label>
              <div className="relative">
                <Smartphone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="tel"
                  placeholder="e.g. 017XXXXXXXX"
                  value={senderPhone}
                  onChange={(e) => setSenderPhone(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-mono focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-bold text-slate-700 text-[11px] uppercase tracking-wider">
                  bKash Transaction ID (TrxID) *
                </label>
                <button
                  type="button"
                  onClick={handleAutoFillDemo}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-pink-600 hover:text-pink-700 transition"
                  title="Generate a realistic demo TrxID for instant testing"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Auto-Fill Demo TrxID</span>
                </button>
              </div>

              <input
                type="text"
                required
                placeholder="e.g. BKG89X12KL"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value.toUpperCase())}
                className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-xl text-sm font-mono font-bold tracking-widest text-slate-900 uppercase focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">
                Found in your bKash payment confirmation SMS or statement.
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <button
              type="submit"
              disabled={paying}
              className="w-full py-3 rounded-xl bg-[#E2136E] hover:bg-[#c90f61] text-white font-bold text-xs shadow-md shadow-pink-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {paying ? (
                <span>Verifying bKash Transaction...</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verify & Confirm Payment</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onClose}
              disabled={paying}
              className="w-full py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};
```

---


# SECTION 6: ANDROID NATIVE INTEGRATION (CAPACITOR & GRADLE)
_Native Android app manifest (Camera/GPS permissions), Java MainActivity bridge, and Gradle build configurations._

---

## <a id="file-55"></a>[55] `web/android/app/src/main/AndroidManifest.xml`

- **Path:** `Power-Pulse-main/web/android/app/src/main/AndroidManifest.xml`  
- **Language:** `xml`  
- **Lines of Code:** `48` lines  

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:usesCleartextTraffic="true"
        android:theme="@style/AppTheme">

        <activity
            android:configChanges="orientation|keyboardHidden|keyboard|screenSize|locale|smallestScreenSize|screenLayout|uiMode|navigation|density"
            android:name=".MainActivity"
            android:label="@string/title_activity_main"
            android:theme="@style/AppTheme.NoActionBarLaunch"
            android:launchMode="singleTask"
            android:exported="true">

            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>

        </activity>

        <provider
            android:name="androidx.core.content.FileProvider"
            android:authorities="${applicationId}.fileprovider"
            android:exported="false"
            android:grantUriPermissions="true">
            <meta-data
                android:name="android.support.FILE_PROVIDER_PATHS"
                android:resource="@xml/file_paths"></meta-data>
        </provider>
    </application>

    <!-- Permissions -->
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    <uses-feature android:name="android.hardware.location.gps" android:required="false" />
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-feature android:name="android.hardware.camera" android:required="false" />
</manifest>
```

---

## <a id="file-56"></a>[56] `web/android/app/src/main/java/com/powerpulse/app/MainActivity.java`

- **Path:** `Power-Pulse-main/web/android/app/src/main/java/com/powerpulse/app/MainActivity.java`  
- **Language:** `java`  
- **Lines of Code:** `6` lines  

```java
package com.powerpulse.app;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {}
```

---

## <a id="file-57"></a>[57] `web/android/app/build.gradle`

- **Path:** `Power-Pulse-main/web/android/app/build.gradle`  
- **Language:** `groovy`  
- **Lines of Code:** `55` lines  

```groovy
apply plugin: 'com.android.application'

android {
    namespace = "com.powerpulse.app"
    compileSdk = rootProject.ext.compileSdkVersion
    defaultConfig {
        applicationId "com.powerpulse.app"
        minSdkVersion rootProject.ext.minSdkVersion
        targetSdkVersion rootProject.ext.targetSdkVersion
        versionCode 1
        versionName "1.0"
        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
        aaptOptions {
             // Files and dirs to omit from the packaged assets dir, modified to accommodate modern web apps.
             // Default: https://android.googlesource.com/platform/frameworks/base/+/282e181b58cf72b6ca770dc7ca5f91f135444502/tools/aapt/AaptAssets.cpp#61
            ignoreAssetsPattern = '!.svn:!.git:!.ds_store:!*.scc:.*:!CVS:!thumbs.db:!picasa.ini:!*~'
        }
    }
    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}

repositories {
    flatDir{
        dirs '../capacitor-cordova-android-plugins/src/main/libs', 'libs'
    }
}

dependencies {
    implementation fileTree(include: ['*.jar'], dir: 'libs')
    implementation "androidx.appcompat:appcompat:$androidxAppCompatVersion"
    implementation "androidx.coordinatorlayout:coordinatorlayout:$androidxCoordinatorLayoutVersion"
    implementation "androidx.core:core-splashscreen:$coreSplashScreenVersion"
    implementation project(':capacitor-android')
    testImplementation "junit:junit:$junitVersion"
    androidTestImplementation "androidx.test.ext:junit:$androidxJunitVersion"
    androidTestImplementation "androidx.test.espresso:espresso-core:$androidxEspressoCoreVersion"
    implementation project(':capacitor-cordova-android-plugins')
}

apply from: 'capacitor.build.gradle'

try {
    def servicesJSON = file('google-services.json')
    if (servicesJSON.text) {
        apply plugin: 'com.google.gms.google-services'
    }
} catch(Exception e) {
    logger.info("google-services.json not found, google-services plugin not applied. Push Notifications won't work")
}
```

---

## <a id="file-58"></a>[58] `web/android/build.gradle`

- **Path:** `Power-Pulse-main/web/android/build.gradle`  
- **Language:** `groovy`  
- **Lines of Code:** `30` lines  

```groovy
// Top-level build file where you can add configuration options common to all sub-projects/modules.

buildscript {
    
    repositories {
        google()
        mavenCentral()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:8.13.0'
        classpath 'com.google.gms:google-services:4.4.4'

        // NOTE: Do not place your application dependencies here; they belong
        // in the individual module build.gradle files
    }
}

apply from: "variables.gradle"

allprojects {
    repositories {
        google()
        mavenCentral()
    }
}

task clean(type: Delete) {
    delete rootProject.buildDir
}
```

---

## <a id="file-59"></a>[59] `web/android/settings.gradle`

- **Path:** `Power-Pulse-main/web/android/settings.gradle`  
- **Language:** `groovy`  
- **Lines of Code:** `5` lines  

```groovy
include ':app'
include ':capacitor-cordova-android-plugins'
project(':capacitor-cordova-android-plugins').projectDir = new File('./capacitor-cordova-android-plugins/')

apply from: 'capacitor.settings.gradle'
```

---

## <a id="file-60"></a>[60] `web/android/variables.gradle`

- **Path:** `Power-Pulse-main/web/android/variables.gradle`  
- **Language:** `groovy`  
- **Lines of Code:** `16` lines  

```groovy
ext {
    minSdkVersion = 24
    compileSdkVersion = 36
    targetSdkVersion = 36
    androidxActivityVersion = '1.11.0'
    androidxAppCompatVersion = '1.7.1'
    androidxCoordinatorLayoutVersion = '1.3.0'
    androidxCoreVersion = '1.17.0'
    androidxFragmentVersion = '1.8.9'
    coreSplashScreenVersion = '1.2.0'
    androidxWebkitVersion = '1.14.0'
    junitVersion = '4.13.2'
    androidxJunitVersion = '1.3.0'
    androidxEspressoCoreVersion = '3.7.0'
    cordovaAndroidVersion = '14.0.1'
}
```

---

## <a id="file-61"></a>[61] `web/android/capacitor.settings.gradle`

- **Path:** `Power-Pulse-main/web/android/capacitor.settings.gradle`  
- **Language:** `groovy`  
- **Lines of Code:** `16` lines  

```groovy
// DO NOT EDIT THIS FILE! IT IS GENERATED EACH TIME "capacitor update" IS RUN
include ':capacitor-android'
project(':capacitor-android').projectDir = new File('../node_modules/@capacitor/android/capacitor')

include ':capacitor-camera'
project(':capacitor-camera').projectDir = new File('../node_modules/@capacitor/camera/android')

include ':capacitor-geolocation'
project(':capacitor-geolocation').projectDir = new File('../node_modules/@capacitor/geolocation/android')

include ':capacitor-local-notifications'
project(':capacitor-local-notifications').projectDir = new File('../node_modules/@capacitor/local-notifications/android')

include ':capacitor-network'
project(':capacitor-network').projectDir = new File('../node_modules/@capacitor/network/android')
```

---

## <a id="file-62"></a>[62] `web/android/gradle.properties`

- **Path:** `Power-Pulse-main/web/android/gradle.properties`  
- **Language:** `properties`  
- **Lines of Code:** `24` lines  

```properties
# Project-wide Gradle settings.
org.gradle.java.home=C:/Users/Lenovo/.jdks/jbr-21.0.11

# IDE (e.g. Android Studio) users:
# Gradle settings configured through the IDE *will override*
# any settings specified in this file.

# For more details on how to configure your build environment visit
# http://www.gradle.org/docs/current/userguide/build_environment.html

# Specifies the JVM arguments used for the daemon process.
# The setting is particularly useful for tweaking memory settings.
org.gradle.jvmargs=-Xmx1536m

# When configured, Gradle will run in incubating parallel mode.
# This option should only be used with decoupled projects. More details, visit
# http://www.gradle.org/docs/current/userguide/multi_project_builds.html#sec:decoupled_projects
# org.gradle.parallel=true

# AndroidX package structure to make it clearer which packages are bundled with the
# Android operating system, and which are packaged with your app's APK
# https://developer.android.com/topic/libraries/support-library/androidx-rn
android.useAndroidX=true
```

---

## <a id="file-63"></a>[63] `web/android/app/src/main/res/values/strings.xml`

- **Path:** `Power-Pulse-main/web/android/app/src/main/res/values/strings.xml`  
- **Language:** `xml`  
- **Lines of Code:** `8` lines  

```xml
<?xml version='1.0' encoding='utf-8'?>
<resources>
    <string name="app_name">PowerPulse</string>
    <string name="title_activity_main">PowerPulse</string>
    <string name="package_name">com.powerpulse.app</string>
    <string name="custom_url_scheme">com.powerpulse.app</string>
</resources>
```

---

## <a id="file-64"></a>[64] `web/android/app/src/main/res/values/styles.xml`

- **Path:** `Power-Pulse-main/web/android/app/src/main/res/values/styles.xml`  
- **Language:** `xml`  
- **Lines of Code:** `22` lines  

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>

    <!-- Base application theme. -->
    <style name="AppTheme" parent="Theme.AppCompat.Light.DarkActionBar">
        <!-- Customize your theme here. -->
        <item name="colorPrimary">@color/colorPrimary</item>
        <item name="colorPrimaryDark">@color/colorPrimaryDark</item>
        <item name="colorAccent">@color/colorAccent</item>
    </style>

    <style name="AppTheme.NoActionBar" parent="Theme.AppCompat.DayNight.NoActionBar">
        <item name="windowActionBar">false</item>
        <item name="windowNoTitle">true</item>
        <item name="android:background">@null</item>
    </style>


    <style name="AppTheme.NoActionBarLaunch" parent="Theme.SplashScreen">
        <item name="android:background">@drawable/splash</item>
    </style>
</resources>
```

---

