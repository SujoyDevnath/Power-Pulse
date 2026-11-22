# PowerPulse: Product Requirements Document (PRD)

**Project Name:** PowerPulse – Smart Electricity Outage Intelligence & Management Platform  
**Academic Context:** Department of Cyber Security Engineering, University of Frontier Technology, Bangladesh (UFTB)  
**Course:** Android and Web Application Development Sessional (Course Code: PROG 212)  
**Project Leads:** Md. Tarikul Islam (2404030), Sujoy Devnath (2404020)  
**Document Status:** Approved for Implementation (Web Application Phase)  
**Last Updated:** November 2026  

---

## 1. Executive Summary & Vision

Electricity outages in developing power grids cause significant friction for residential consumers, academic institutions, and businesses. When power fails, consumers lack transparency: they cannot tell if an outage is localized to their home breaker, their building, or widespread across their municipal zone; they do not know whether the interruption is a planned load-shedding event or an unexpected fault; and utility providers receive scattered, redundant complaints without structured correlation.

**PowerPulse** transforms electricity outage management from reactive, isolated complaints into an **intelligent, community-driven, confidence-scored platform**. By crowdsourcing OFF/BACK reports, calculating a real-time Confidence Score, aggregating reports into single verified **Incident Records**, and connecting them to automated complaint lifecycles and technician dispatching, PowerPulse provides full transparency to consumers and actionable operational control to grid administrators.

---

## 2. Target Audience & Roles

PowerPulse defines three primary role profiles. In this phase, the **Web Application** delivers full-featured operational capability for Administrators and Field Technicians, while providing web-accessible views for Consumer oversight.

```
+-------------------------------------------------------------------------+
|                               PowerPulse Roles                          |
+-------------------+-----------------------------+-----------------------+
|  Role             | Interface                   | Primary Function      |
+-------------------+-----------------------------+-----------------------+
| 1. Administrator  | Web Admin Portal (Desktop)  | Incident verification,|
|                   |                             | technician dispatch,  |
|                   |                             | planned outages, stats|
+-------------------+-----------------------------+-----------------------+
| 2. Technician     | Web Tech Portal (Responsive)| Task acceptance,      |
|                   |                             | repair progression,   |
|                   |                             | field remarks         |
+-------------------+-----------------------------+-----------------------+
| 3. Consumer       | Android App & Web Portal    | Outage reporting,     |
|                   |                             | complaint submission, |
|                   |                             | outage tracking       |
+-------------------+-----------------------------+-----------------------+
```

---

## 3. Scope & Phasing

### 3.1 Immediate Focus: Web Application & Backend Foundation
The current implementation sprint focuses on delivering a production-ready **Full-Stack Web Application** and the **Core API & Database Engine**:
1. **Node.js + Express Backend API** with JWT authentication, Role-Based Access Control (RBAC), and database pooling.
2. **MySQL Relational Database** with complete 12-table schema, referential integrity, and seed data.
3. **Core Confidence Score Engine (`services/confidence.js`)** to cluster reports into incidents.
4. **React Admin Portal**:
   - Executive Dashboard with real-time KPI metrics and status distribution.
   - Live Incident Management Table with color-coded confidence levels and manual override (Confirm/Dismiss).
   - Complaint & Dispatch Desk to assign issues to available technicians.
   - Planned Load-Shedding Scheduler.
   - User, Technician, and Location Management.
   - Visual Analytics (Recharts) covering outage trends, duration, and complaint resolutions.
   - Audit Log Viewer for security event tracking.
5. **React Technician Portal**:
   - Dedicated mobile-responsive web dashboard for field technicians.
   - Assignment queue with active complaint details and customer location.
   - Multi-stage repair status progression: `Assigned -> Investigating -> Repairing -> Resolved`.
   - Field remarks and problem diagnosis logger.

### 3.2 Deferred to Phase 2: Android Consumer Application
- Kotlin Android Native App with Jetpack Compose / XML Views.
- Room SQLite offline storage and WorkManager sync engine for zero-connectivity reporting.
- Native mobile push notifications.

### 3.3 Explicitly Out-of-Scope (Academic Boundary)
- Direct physical IoT smart meter hardware integration (simulated via software tables).
- Proprietary electrical utility SCADA / grid switching hardware control.
- Commercial payment gateway merchant contracts (simulated via demo transaction generator).

---

## 4. Key Problem Statements & Solutions Matrix

| # | Identified Problem | PowerPulse Web App Solution |
|---|--------------------|-----------------------------|
| 1 | **Unknown Area-Level Outage** | Corroborates reports across zones; shows live active incident badges on map/table. |
| 2 | **Uncertainty: Planned vs Unexpected** | Admin Planned Outage schedule cross-referenced with incident timestamps. |
| 3 | **Duplicate & Fragmented Reports** | Confidence Score clustering groups raw reports into a single consolidated incident. |
| 4 | **No Complaint Tracking Visibility** | Multi-state lifecycle (`Pending` -> `Assigned` -> `Investigating` -> `Repairing` -> `Resolved`). |
| 5 | **Technician Coordination Deficit** | Admin assignment modal linked directly to technician availability and real-time remarks. |
| 6 | **Outage Duration Uncertainty** | Auto-computes duration in minutes and human-friendly format (`1h 17m`) upon restoration. |
| 7 | **Diverse Electrical Faults** | Categorized ticket system (Power Outage, Low Voltage, Transformer, Damaged Wire, Pole, Other). |
| 8 | **Lack of Usage & Billing Clarity** | Simulated Smart Meter portal showing monthly consumption (kWh), bills, and demo payments. |
| 9 | **Lack of Historical Analytics** | Interactive analytical charts displaying area-wise outages, average duration, and complaint trends. |
| 10| **Auditability & Security** | Granular audit logging recording every login, status change, override, and technician assignment. |

---

## 5. Functional Requirements (Web App)

### 5.1 Authentication & Role-Based Access Control (RBAC)
- **FR-AUTH-1**: User login with email and password returning signed JWT containing `userId`, `role`, and `name`.
- **FR-AUTH-2**: Password hashing using `bcrypt` (10 salt rounds minimum).
- **FR-AUTH-3**: Role-based route guards in Express (`allowRoles('admin', 'technician')`) and React route guards (`<ProtectedRoute allowedRoles={[...]} />`).
- **FR-AUTH-4**: Session persistence via `localStorage` or secure auth header with auto-logout on 401 Unauthorized.

### 5.2 Outage Incident Management
- **FR-INC-1**: Group incoming consumer reports within a 30-minute rolling window per `location_id`.
- **FR-INC-2**: Calculate dynamic Confidence Score using the formula:
  $$\text{Score} = \text{ReportFactor} + \text{UniqueUserFactor} + \text{TimeClusterFactor} + \text{ReliabilityFactor} - \text{Penalty}$$
- **FR-INC-3**: Incident classification tiers:
  - `0 - 39%`: **Low** (Informational, unconfirmed)
  - `40 - 69%`: **Possible** (Auto-creates candidate incident in database)
  - `70 - 89%`: **Probable** (System broadcasts notice)
  - `90 - 100%`: **Confirmed** (Verified community-wide outage)
- **FR-INC-4**: Administrator action buttons:
  - `Confirm Incident`: Instantly elevates confidence to 100% and sets status to verified.
  - `Dismiss Incident`: Sets status to `dismissed`, penalizes reporters' reliability score.
- **FR-INC-5**: Auto-close incident when sufficient BACK reports are received or admin marks restored, calculating `duration_minutes = end_time - start_time`.

### 5.3 Complaint & Dispatch Management
- **FR-CMP-1**: List all complaints with filtering by status (`pending`, `assigned`, `investigating`, `repairing`, `resolved`) and category.
- **FR-CMP-2**: Admin technician assignment modal displaying technician availability (`available`, `busy`, `off`).
- **FR-CMP-3**: Technician update portal to update state and log technical remarks.
- **FR-CMP-4**: Audit trail entry generated on every status transition.

### 5.4 Planned Outage Scheduler
- **FR-PLN-1**: Form to publish planned maintenance/load-shedding (Location, Date, Start Time, End Time, Reason).
- **FR-PLN-2**: Public/Consumer visible calendar and table of upcoming scheduled outages.

### 5.5 Analytics & Reporting
- **FR-ANL-1**: Summary KPI cards: Total Outages, Active Outages, Pending Complaints, Avg Outage Duration (hours/mins).
- **FR-ANL-2**: Area-wise outage distribution chart (Bar/Pie chart via Recharts).
- **FR-ANL-3**: Monthly outage frequency chart.
- **FR-ANL-4**: Complaint resolution distribution (Resolved vs In-Progress vs Pending).

---

## 6. Non-Functional Requirements (NFR)

1. **Security**:
   - Zero plain-text passwords stored.
   - Parameterized SQL queries using `mysql2/promise` to eliminate SQL Injection (CWE-89).
   - Rate limiting on authentication routes (max 5 attempts/minute) to mitigate brute force.
   - Sanitized input validation on all POST/PATCH requests via `express-validator`.
2. **Performance & Responsiveness**:
   - Web application built with Vite for sub-second hot module reload and fast bundle load times (< 1.5s).
   - Fully responsive design using modern CSS/Tailwind, operating flawlessly on desktop, tablets, and mobile screens.
3. **Data Integrity & Resiliency**:
   - Strict Foreign Key constraints in MySQL with proper cascading rules.
   - Transactional safety for multi-step operations (e.g., incident resolution + complaint status update).

---

## 7. Success Criteria & Evaluation Metrics

The project will be evaluated using both live demonstration and a simulated dataset:
- **Detection Accuracy**: Out of 20 simulated outage scenarios, correctly identify $\ge 90\%$ without manual intervention.
- **False Positive Rejection**: Single user false reports must never generate a confirmed incident.
- **Spam & Duplicate Handling**: Repeated reports from the same user within 10 minutes must be penalized and flagged.
- **Presentation Readiness**: End-to-end demo flow displaying Admin control, incident detection, complaint dispatch, and resolution.
