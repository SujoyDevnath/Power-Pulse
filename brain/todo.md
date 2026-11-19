# PowerPulse: Project To-Do List & Implementation Roadmap

**Current Focus:** Web Application & Core Backend Engine  
**Milestone Target:** Full Working Demonstration (Admin Portal, Technician Panel, REST API, SQLite, Outage Simulator, Vercel Ready)  
**Status Legend:**  
- `[ ]` Not Started  
- `[/]` In Progress  
- `[x]` Completed  

---

## Phase 1: Project Setup & Workspace Structure

- [x] Create project documentation and engineering standards in `brain/`:
  - [x] Product Requirements Document (`brain/prd.md`)
  - [x] System Architecture (`brain/architecture.md`)
  - [x] Web Application Design Specifications (`brain/design.md`)
  - [x] Architecture Decision Records (`brain/decisions.md`)
  - [x] Actionable Roadmap & To-Do List (`brain/todo.md`)
- [x] Initialize `PowerPulse/backend` directory via CLI commands:
  - [x] Initialize `package.json` with dependencies (`express`, `better-sqlite3`, `cors`, `dotenv`, `jsonwebtoken`, `bcryptjs`, `express-validator`, `express-rate-limit`, `helmet`, `morgan`, `uuid`).
  - [x] Create `.env.example` and `.env` template.
  - [x] Scaffold folder structure (`src/config`, `src/middleware`, `src/controllers`, `src/routes`, `src/services`, `src/scripts`, `src/utils`).
- [x] Initialize `PowerPulse/web` directory via CLI commands:
  - [x] Scaffold Vite + React application (`npm create vite@latest web -- --template react`).
  - [x] Install dependencies (`axios`, `react-router-dom`, `recharts`, `lucide-react`, `leaflet`, `react-leaflet`).
  - [x] Configure Tailwind CSS and PostCSS (`tailwind.config.js`, `postcss.config.js`, `vercel.json`).

---

## Phase 2: Local Database Schema & Seed Data (SQLite Local / Neon Postgres Cloud)

- [x] Author SQLite schema script (`backend/src/scripts/schema.sql`):
  - [x] Table 1: `locations` (district, area, zone, coordinates).
  - [x] Table 2: `users` (name, email, phone, password_hash, role, location_id, reliability_score).
  - [x] Table 3: `technicians` (user_id, availability_status).
  - [x] Table 4: `incidents` (location_id, confidence_score, classification, type, status, start/end time, duration).
  - [x] Table 5: `reports` (user_id, location_id, incident_id, type, reported_at, sync_status, is_duplicate, is_spam, client_uuid).
  - [x] Table 6: `complaints` (user_id, incident_id, category, description, status).
  - [x] Table 7: `assignments` (complaint_id, technician_id, status, remarks).
  - [x] Table 8: `planned_outages` (location_id, outage_date, start_time, end_time, reason).
  - [x] Table 9: `smart_meter_bills` (user_id, month, consumption_kwh, amount, status, transaction_id).
  - [x] Table 10: `meter_readings` (user_id, reading_time, kwh).
  - [x] Table 11: `notifications` (user_id, title, message, is_read).
  - [x] Table 12: `audit_logs` (user_id, action, details).
- [x] Author `backend/src/scripts/seed.js`:
  - [x] Seed Bangladeshi administrative areas (Dhaka - Dhanmondi, Mirpur-10, Uttara, Gulshan, Banani).
  - [x] Seed default Admin account (`admin@powerpulse.com` / `Admin@123`).
  - [x] Seed default Technicians (`rahim.tech@powerpulse.com`, `karim.tech@powerpulse.com`, `salma.tech@powerpulse.com`).
  - [x] Seed demo Consumers (10 verified users with varied reliability scores).
  - [x] Seed sample complaints and planned outage schedule.
  - [x] Verify database initialization creates `backend/powerpulse.db`.

---

## Phase 3: Express Backend API & Security Layer

- [x] Database Connection:
  - [x] Implement `backend/src/config/db.js` using `better-sqlite3` with WAL mode and foreign keys enabled.
  - [x] Health-check route `/api/health`.
- [x] Security & Middleware:
  - [x] Implement JWT authentication middleware (`middleware/auth.js`).
  - [x] Implement Role-Based Access Control (`middleware/role.js`).
  - [x] Configure Rate Limiting (`middleware/rateLimit.js`).
  - [x] Configure Helmet, CORS, and Morgan request logging.
  - [x] Centralized error handling middleware.
- [x] Route & Controller Implementation:
  - [x] **Auth**: `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me`.
  - [x] **Locations**: `GET /api/locations` (public), `POST /api/locations` (admin).
  - [x] **Reports**: `POST /api/reports` (OFF/BACK submission), `GET /api/reports/mine`, `GET /api/reports` (admin raw list).
  - [x] **Incidents**: `GET /api/incidents/active`, `GET /api/incidents/history`, `PATCH /api/incidents/:id/confirm`, `PATCH /api/incidents/:id/dismiss`, `PATCH /api/incidents/:id/restore`.
  - [x] **Complaints**: `POST /api/complaints`, `GET /api/complaints/mine`, `GET /api/complaints` (admin with filters), `PATCH /api/complaints/:id/assign`.
  - [x] **Technician**: `GET /api/technician/assignments` (assigned to logged-in tech), `PATCH /api/technician/assignments/:id` (status & remarks), `GET /api/technician/list`.
  - [x] **Planned Outages**: `GET /api/planned`, `POST /api/planned`, `DELETE /api/planned/:id`.
  - [x] **Analytics & Logs**: `GET /api/admin/analytics`, `GET /api/admin/users`, `PATCH /api/admin/users/:id`, `GET /api/admin/audit-logs`.

---

## Phase 4: Core Confidence Scoring Algorithm

- [x] Implement `backend/src/services/confidence.js`:
  - [x] Report Factor calculation (count of valid OFF reports in 30-min window $\times 3$, max 30).
  - [x] Unique User Factor calculation (distinct users $\times 8$, max 40).
  - [x] Time Clustering Factor (all reports $\le 10$ min = 20 pts; $\le 30$ min = 10 pts; else 0).
  - [x] Reporter Reliability Factor (average reliability $\times 10$, max 10).
  - [x] Penalty deduction (duplicates $\times 5$ + spam $\times 10$).
  - [x] Score clamping ($[0, 100]$) and Classification mapping (`low`, `possible`, `probable`, `confirmed`).
- [x] Implement Outage Lifecycle Handling (`backend/src/services/outageService.js`):
  - [x] Candidate Incident creation upon $\ge 2$ unique users and Score $\ge 40$.
  - [x] Duration tracking on BACK report reception (`duration_minutes = end_time - start_time`).
  - [x] Reporter reliability feedback loop (+0.02 on confirmed, -0.05 on dismissed).

---

## Phase 5: Web Application Core & Styling (React + Vite + Tailwind)

- [x] Frontend Architecture:
  - [x] Set up Axios API client (`web/src/services/api.js`) with automatic JWT Bearer token injection.
  - [x] Implement `AuthContext.jsx` for persistent login state and role information.
  - [x] Build `<ProtectedRoute allowedRoles={[...]} />` component.
  - [x] Create shared layout components:
    - [x] `AdminLayout.jsx` (Sidebar navigation, Top Navbar, User info, Logout).
    - [x] `TechLayout.jsx` (Mobile-friendly field header, Availability badge, Logout).
    - [x] Common components: `MetricCard`, `ConfidenceBadge`, `StatusBadge`, `Modal`.

---

## Phase 6: Admin Web Dashboard Pages (All 10 Source Pages §8.2 Complete)

- [x] **1. Admin Login Screen (`/login`)**:
  - [x] Form with email & password, error handling, 1-click quick-fill demo credentials buttons.
- [x] **2. Executive Dashboard (`/admin`)**:
  - [x] KPI summary row (Active Outages, Pending Complaints, Avg Duration, Active Techs).
  - [x] Active Outage live table with confidence badges.
  - [x] Outage distribution preview chart.
- [x] **3. Incident Management (`/admin/incidents`)**:
  - [x] Filterable table of all incidents (Active, Restored, Dismissed).
  - [x] Modal to inspect incident reports and contributing users.
  - [x] Action buttons: `[Confirm]`, `[Dismiss]`, `[Restore]`.
- [x] **4. Raw Consumer Reports Desk (`/admin/reports`)**:
  - [x] Dedicated table of all incoming OFF/BACK signals.
  - [x] Explicit badges for duplicate reports and spam penalties.
- [x] **5. Complaint & Dispatch Desk (`/admin/complaints`)**:
  - [x] Filterable list by category and lifecycle status.
  - [x] Assign Technician modal with technician availability indicators.
- [x] **6. User & Technician Management (`/admin/users`)**:
  - [x] Directory of consumers and technicians.
  - [x] Role modifier and technician status toggle.
- [x] **7. Locations & Grid Zones (`/admin/locations`)**:
  - [x] Table of registered municipal sectors with active outage indicators.
  - [x] Form to add and configure new municipal areas and substation feeder zones.
- [x] **8. Planned Outage Scheduler (`/admin/planned`)**:
  - [x] Form to schedule planned load-shedding.
  - [x] List of upcoming schedules with delete/cancel actions.
- [x] **9. Analytics & Statistics (`/admin/analytics`)**:
  - [x] Recharts visualizations: Area-wise outage bar chart, Complaint category breakdown pie chart.
- [x] **10. Audit Log Inspector (`/admin/audit-logs`)**:
  - [x] Chronological table of administrative and operational actions.

---

## Phase 7: Technician Mobile-Web Panel (All 3 Source Pages §8.3 Complete)

- [x] **1. Technician Login Portal**: Authenticates via `/login` and redirects to `/tech`.
- [x] **2. My Assignments List (`/tech`)**:
  - [x] Queue of active and historical tickets dispatched to the logged-in technician.
- [x] **3. Dedicated Work Order Detail Page (`/tech/assignments/:id`)**:
  - [x] Visual 4-stage lifecycle progression bar (`Assigned` $\to$ `Investigating` $\to$ `Repairing` $\to$ `Resolved`).
  - [x] Job site location, consumer contact details, and field diagnostic remarks logger.

---

## Phase 8: Consumer Web Experience (All 13 Screens §9.3 Complete)

- [x] **1. Splash & Brand Landing**
- [x] **2. Registration Screen (`/register`)**: New account sign-up with municipal area selector.
- [x] **3. Location Selector**: Cascading area dropdown.
- [x] **4. Home Grid Status (`/consumer`)**: Real-time status banner, large **Power OFF** and **Power BACK** buttons.
- [x] **5. Active Outages Nearby (`/consumer/outages`)**: Card view of all active municipal blackouts across Dhaka.
- [x] **6. Submit Complaint Desk**: 6 fault categories with landmark notes.
- [x] **7. My Complaints Tracker**: Personal ticket tracking with live status chips.
- [x] **8. Outage History Page (`/consumer/history`)**: Archived timeline of restored area incidents with duration.
- [x] **9. Planned Load-Shedding Schedule**: Upcoming maintenance announcements.
- [x] **10. In-App Notifications Inbox (`/consumer/notifications`)**: Alert feed with mark-as-read actions.
- [x] **11. Smart Meter Simulation**: Real-time kWh consumption and daily average metrics.
- [x] **12. Demo Bill Payment**: bKash, Nagad, and Card payment flow generating `PP...` transaction IDs.
- [x] **13. Consumer Profile Page (`/consumer/profile`)**: Account details and live **Reporter Reliability Rating** badge.

---

## Phase 8: Outage Simulator & Lab Defense Readiness

- [x] Build Outage Simulator CLI (`backend/src/scripts/simulate.js`):
  - [x] **Scenario 1 - Single False Alarm**: 1 user reports OFF; verified score remains low (25%) and no incident created.
  - [x] **Scenario 2 - Community Outage Burst**: 4 distinct users in Dhanmondi report OFF; verified incident auto-created with 72% confidence.
  - [x] **Scenario 3 - Duplicate & Spam Flood**: User sends rapid reports; verified penalty applied (-45 pts) and spam flagged.
  - [x] **Scenario 4 - Power Restoration**: 2 users submit BACK reports; verified incident closed with automated duration calculation.
- [x] Verified full production bundle build: `npm run build` completed in 2.23s with 0 errors.
