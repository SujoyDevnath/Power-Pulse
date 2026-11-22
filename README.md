# PowerPulse: Smart Electricity Outage Intelligence & Management Platform

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.21-lightgrey.svg)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6-purple.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC.svg)](https://tailwindcss.com/)
[![SQLite](https://img.shields.io/badge/SQLite-3-003B57.svg)](https://www.sqlite.org/)

> **Course**: PROG 212 AWAD (Advanced Web Application Development)  
> **Institution**: University of Fundamental Technology & Business (UFTB)  
> **Authors**: Md. Tarikul Islam & Sujoy Devnath

---

## ⚡ Overview

**PowerPulse** is a full-stack, data-driven electricity outage monitoring and response system built for urban electrical grids (modeled after Dhaka municipal power zones including Dhanmondi, Gulshan, Mirpur, and Uttara).

It eliminates manual call-center bottlenecks by combining:
1. **Crowdsourced Citizen Outage Reporting** with offline queue caching (`localStorage`).
2. **Automated Confidence Scoring Algorithm** (§6 of specification) to filter out fake or isolated reports.
3. **Smart Meter IoT Heartbeat Simulation** with real-time usage graphs and bKash/Nagad mock bill payment.
4. **Three Dedicated User Portals**:
   - **Consumer Portal**: One-tap outage reporting, nearby incident alerts, feeder reliability index, billing, and complaints.
   - **Field Technician Portal**: Real-time work order dispatch, GPS navigation trigger, 4-stage job lifecycle (Assigned &rarr; In Progress &rarr; Work Done &rarr; Resolved), and incident escalation.
   - **Admin Command Center**: City-wide incident triage, live confidence metrics, zone & feeder management, raw report inspection, technician assignment, scheduled load-shedding broadcast, and audit logs.

---

## 🏗️ Architecture & Tech Stack

```
PowerPulse/
├── backend/                  # Node.js + Express REST API Server
│   ├── server.js             # API entrypoint, security middlewares & route mounting
│   ├── src/
│   │   ├── config/           # Database connection (better-sqlite3) & env loader
│   │   ├── controllers/      # Business logic handlers (auth, reports, incidents, etc.)
│   │   ├── middleware/       # JWT auth, RBAC role guard, rate limiters, validation
│   │   ├── routes/           # REST endpoints
│   │   ├── services/         # Outage lifecycle & confidence scoring algorithm
│   │   └── scripts/          # DB init, seeding, and confidence algorithm simulator
│   └── .env.example          # Safe development environment template
├── web/                      # React 19 Single Page Application (Vite + Tailwind CSS)
│   ├── src/
│   │   ├── components/       # Shared UI, Navbar, Footers, ProtectedRoute, OfflineBanner
│   │   ├── context/          # AuthContext (JWT + LocalStorage session)
│   │   ├── pages/            # Consumer (13), Admin (10), and Tech (3) page views
│   │   └── services/         # Axios API client with automatic token interceptor
│   └── .env.example          # Frontend API endpoint template
├── brain/                    # Architecture, PRD, ADR decisions & todo checklist
└── Source/                   # Original course problem statements & specification PDFs
```

---

## 🚀 Getting Started (Setup for Collaborators)

### 1. Prerequisites
- **Node.js** (v18.x or v20.x recommended)
- **npm** (comes with Node.js)
- **Git**

### 2. Clone the Repository
```bash
git clone https://github.com/Avishekdevnath/PowerPulse.git
cd PowerPulse
```

---

### 3. Backend Setup

```bash
# Navigate to backend folder
cd backend

# Copy sample environment configuration
cp .env.example .env

# Install backend dependencies
npm install

# Initialize and seed the SQLite database with sample Dhaka locations and users
npm run db:reset

# Start backend server (starts on http://localhost:5000)
npm start
```

> **Tip:** You can run the confidence scoring simulation script to verify algorithmic verification:
> ```bash
> npm run simulate
> ```

---

### 4. Frontend Web Setup

Open a new terminal window:

```bash
# Navigate to web folder
cd web

# Copy sample environment configuration
cp .env.example .env

# Install web dependencies
npm install

# Start Vite development server (starts on http://localhost:5173)
npm run dev
```

Open your browser at **`http://localhost:5173`**.

---

## 👥 Demo Login Credentials

The database is pre-seeded with accounts across all three user roles:

| Role | Email | Password | Access / Landing Page |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@powerpulse.bd` | `Admin@123` | `/admin/dashboard` |
| **Field Technician** | `tech.rahim@powerpulse.bd` | `Tech@123` | `/tech/assignments` |
| **Field Technician** | `tech.karim@powerpulse.bd` | `Tech@123` | `/tech/assignments` |
| **Consumer (Citizen)** | `rahim@gmail.com` | `User@123` | `/` (Home & Consumer Features) |
| **Consumer (Citizen)** | `karim@gmail.com` | `User@123` | `/` (Home & Consumer Features) |

---

## 🧠 Core Confidence Scoring Engine

When citizens submit power outage reports, the engine calculates a **Confidence Score (0% to 100%)** before auto-triggering an incident:

$$\text{Confidence} = C_{\text{count}} + C_{\text{smart\_meter}} + C_{\text{density}} + C_{\text{time}} + C_{\text{reliability}} - P_{\text{contradiction}}$$

| Metric | Range / Criteria | Score Component |
| :--- | :--- | :--- |
| **Report Density** | 1 report = 10%, 2-4 reports = 25%, 5-9 = 40%, 10+ = 50% | Up to 50 pts |
| **Smart Meter Heartbeat** | $\ge 2$ offline meters in same zone | +30 pts |
| **Spatial Proximity** | Reports within 500m radius of feeder | +10 pts |
| **Temporal Velocity** | $\ge 3$ reports within 10 minutes | +10 pts |
| **Consumer Reliability** | Average trust score of reporting users | Scaled factor |
| **Contradictory Signal** | Citizen reports "Power Back" while outage active | -20 pts penalty |

- **Score $\ge 70\%$**: System automatically promotes reports to **ACTIVE INCIDENT**, notifies the admin, and dispatches field technicians.
- **Score $40\% - 69\%$**: System marks as **PENDING VERIFICATION**.
- **Score $< 40\%$**: Logged as an isolated or suspicious report.

---

## 🔒 Security Best Practices

1. **Passwords**: Salted and hashed using `bcryptjs` with 10 salt rounds.
2. **Environment Variables**: `.env` files are strictly excluded from version control via `.gitignore`.
3. **HTTP Headers**: Enforced via `helmet`.
4. **CORS**: Restricted to configured client origin.
5. **Rate Limiting**: Configured on `/api/auth` and `/api/reports` to prevent spam and brute-force attacks.

---

## 📜 License
This project was developed for academic evaluation under course **PROG 212 AWAD** at **UFTB**.
All rights reserved.
