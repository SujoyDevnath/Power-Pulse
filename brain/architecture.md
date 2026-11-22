# PowerPulse: System Architecture Document

**Project:** PowerPulse – Smart Electricity Outage Intelligence & Management Platform  
**Target:** Full-Stack Web Platform (Admin Portal, Technician Panel, Backend API, MySQL)  
**Status:** Architectural Specification Baseline  

---

## 1. High-Level System Topology

PowerPulse follows a decoupled client-server architecture. All frontend clients (Admin Web Portal, Technician Web Portal, and future Android native clients) interact strictly with a unified Node.js REST API server. No client connects directly to the MySQL database.

```mermaid
graph TD
    subgraph Clients["Presentation Layer"]
        AdminWeb["Admin Web Dashboard<br/>(React + Vite + Tailwind)"]
        TechWeb["Technician Web Panel<br/>(React + Mobile Responsive)"]
        ConsumerApp["Consumer App<br/>(Android Kotlin / Future)"]
    end

    subgraph Gateway["API & Security Boundary"]
        ReverseProxy["Express Server (Port 5000)"]
        CORS["CORS & Helmet"]
        RateLimit["Rate Limiter (Express-Rate-Limit)"]
        JWTAuth["JWT Auth & RBAC Middleware"]
    end

    subgraph CoreServices["Backend Application Layer"]
        AuthService["Auth Controller & Service"]
        ConfidenceEngine["Confidence Score Engine<br/>(services/confidence.js)"]
        IncidentManager["Incident & Outage Service"]
        ComplaintManager["Complaint & Dispatch Service"]
        AnalyticsEngine["Analytics & Audit Service"]
    end

    subgraph DataLayer["Persistence Layer"]
        MySQL[("MySQL Relational Database<br/>(powerpulse)")]
        ConnectionPool["mysql2 Connection Pool"]
    end

    AdminWeb -->|HTTPS / JSON REST| ReverseProxy
    TechWeb -->|HTTPS / JSON REST| ReverseProxy
    ConsumerApp -.->|HTTPS / JSON REST| ReverseProxy

    ReverseProxy --> CORS
    CORS --> RateLimit
    RateLimit --> JWTAuth
    JWTAuth --> CoreServices

    AuthService --> ConnectionPool
    ConfidenceEngine --> ConnectionPool
    IncidentManager --> ConnectionPool
    ComplaintManager --> ConnectionPool
    AnalyticsEngine --> ConnectionPool

    ConnectionPool --> MySQL
```

---

## 2. Technology Stack Selection

| Component | Technology | Rationale |
|-----------|------------|-----------|
| **Web Frontend** | **React 18 / 19 + Vite** | Blazing-fast development, Hot Module Replacement (HMR), component-driven UI for dashboard widgets. |
| **Styling & Design** | **Tailwind CSS + Lucide Icons** | Utility-first responsive design, modern dark/slate utility styling, accessible icons. |
| **Routing** | **React Router DOM v6** | Declarative client-side routing with role-based `<ProtectedRoute>` wrappers. |
| **Charts & Visuals** | **Recharts** | Declarative, SVG-based responsive charts for outage frequency, area metrics, and resolution rates. |
| **Map Rendering** | **Leaflet + OpenStreetMap** | Open-source, no external API keys required, lightweight interactive map for location tagging. |
| **Backend Runtime** | **Node.js (LTS) + Express.js** | Non-blocking asynchronous I/O, rich ecosystem, straightforward REST API routing. |
| **Database** | **MySQL 8.0+** | Strict relational schemas, foreign keys, transaction support for audit logs and incident states. |
| **Database Driver** | **`mysql2/promise`** | Connection pooling, Promise-based async/await syntax, native prepared statement support. |
| **Authentication** | **JSON Web Token (JWT) + bcrypt** | Stateless authentication with signed claims (`userId`, `role`), salted hashing for passwords. |
| **Validation & Security** | **express-validator, helmet, cors** | Strict request sanitization and standard HTTP security headers. |

---

## 3. Database Schema Architecture

The database is named `powerpulse`. It implements 12 interconnected tables enforcing referential integrity.

### 3.1 Entity-Relationship (ER) Diagram

```mermaid
erDiagram
    LOCATIONS ||--o{ USERS : "resides in"
    LOCATIONS ||--o{ REPORTS : "originates from"
    LOCATIONS ||--o{ INCIDENTS : "occurs in"
    LOCATIONS ||--o{ PLANNED_OUTAGES : "scheduled for"
    
    USERS ||--o{ REPORTS : "submits"
    USERS ||--o{ COMPLAINTS : "files"
    USERS ||--o| TECHNICIANS : "profile"
    USERS ||--o{ NOTIFICATIONS : "receives"
    USERS ||--o{ SMART_METER_BILLS : "billed to"
    USERS ||--o{ METER_READINGS : "measures"
    USERS ||--o{ AUDIT_LOGS : "triggered by"

    INCIDENTS ||--o{ REPORTS : "clusters"
    INCIDENTS ||--o{ COMPLAINTS : "links to"

    COMPLAINTS ||--o{ ASSIGNMENTS : "dispatched via"
    TECHNICIANS ||--o{ ASSIGNMENTS : "assigned to"

    LOCATIONS {
        int location_id PK
        string district
        string area
        string zone
        decimal latitude
        decimal longitude
    }

    USERS {
        int user_id PK
        string name
        string email
        string phone
        string password_hash
        enum role
        int location_id FK
        decimal reliability_score
        timestamp created_at
    }

    TECHNICIANS {
        int technician_id PK
        int user_id FK
        enum availability_status
    }

    INCIDENTS {
        int incident_id PK
        int location_id FK
        int confidence_score
        enum classification
        enum type
        enum status
        datetime start_time
        datetime end_time
        int duration_minutes
        tinyint manually_reviewed
    }

    REPORTS {
        int report_id PK
        int user_id FK
        int location_id FK
        int incident_id FK
        enum type
        datetime reported_at
        timestamp received_at
        enum sync_status
        tinyint is_duplicate
        tinyint is_spam
        string client_uuid
    }

    COMPLAINTS {
        int complaint_id PK
        int user_id FK
        int incident_id FK
        enum category
        text description
        enum status
        timestamp created_at
    }

    ASSIGNMENTS {
        int assignment_id PK
        int complaint_id FK
        int technician_id FK
        string status
        text remarks
        timestamp assigned_at
    }

    PLANNED_OUTAGES {
        int planned_id PK
        int location_id FK
        date outage_date
        time start_time
        time end_time
        string reason
    }

    SMART_METER_BILLS {
        int bill_id PK
        int user_id FK
        string month
        decimal consumption_kwh
        decimal amount
        enum status
        string transaction_id
        datetime paid_at
    }

    METER_READINGS {
        int reading_id PK
        int user_id FK
        datetime reading_time
        decimal kwh
    }

    NOTIFICATIONS {
        int notification_id PK
        int user_id FK
        string title
        string message
        tinyint is_read
        timestamp created_at
    }

    AUDIT_LOGS {
        int log_id PK
        int user_id FK
        string action
        text details
        timestamp created_at
    }
```

---

## 4. Core Algorithm Architecture: Outage Confidence Engine

The distinguishing innovation of PowerPulse is its mathematical clustering algorithm (`backend/src/services/confidence.js`). Raw consumer reports are transformed into high-confidence incidents.

```mermaid
sequenceDiagram
    autonumber
    actor Consumer as Consumer / Simulated Reporter
    participant API as /api/reports Endpoint
    participant Val as Validator & Spam Filter
    participant Engine as Confidence Engine
    participant DB as MySQL Database
    participant Admin as Admin Web Dashboard

    Consumer->>API: POST /api/reports (type: OFF, location_id: 12)
    API->>Val: Check rate limit & recent duplicate (last 10m)
    alt Duplicate or Rapid Spam Detected
        Val-->>DB: Save with is_duplicate=1 / is_spam=1
        Val-->>API: Reject or reduce user reliability
    else Valid Report
        Val->>DB: Insert into reports table
        API->>Engine: evaluateLocationOutage(location_id)
        Engine->>DB: Query OFF reports in last 30 minutes
        Engine->>Engine: Calculate Factors (Report, Unique User, Time, Reliability)
        Engine->>Engine: Clamp Score [0 - 100]
        alt Score >= 40 AND Unique Users >= 2
            Engine->>DB: Upsert Active Incident (classification, score)
            Engine->>DB: Link reports to incident_id
            Engine-->>Admin: Real-time Incident Alert (Score updated)
        else Score < 40
            Engine-->>API: Stored as unconfirmed single report
        end
    end
```

### 4.1 Mathematical Scoring Formulation

$$\text{Confidence Score} = \text{ReportFactor} + \text{UniqueUserFactor} + \text{TimeClusterFactor} + \text{ReliabilityFactor} - \text{Penalty}$$

1. **Report Factor (Max 30 pts):**
   $$\min(N_{\text{valid OFF reports}} \times 3, 30)$$
2. **Unique User Factor (Max 40 pts):**
   $$\min(N_{\text{distinct users}} \times 8, 40)$$
3. **Time Clustering Factor (Max 20 pts):**
   - $20\text{ pts}$ if all reports fall within 10 minutes.
   - $10\text{ pts}$ if all reports fall within 30 minutes.
   - $0\text{ pts}$ otherwise.
4. **User Reliability Factor (Max 10 pts):**
   $$\text{Avg}(\text{reliability\_score}) \times 10 \quad \text{where } \text{reliability\_score} \in [0.0, 1.0]$$
5. **Penalties:**
   $$\text{Penalty} = (N_{\text{duplicate}} \times 5) + (N_{\text{spam}} \times 10)$$

$$\text{Final Score} = \max(0, \min(100, \text{Raw Score}))$$

---

## 5. Directory Structure Baseline

```
PowerPulse/
├── brain/                   # Architecture, PRD, Decisions, Design, Todo
│   ├── prd.md
│   ├── architecture.md
│   ├── design.md
│   ├── decisions.md
│   └── todo.md
├── backend/                 # Node.js + Express API Server
│   ├── package.json
│   ├── .env.example
│   ├── server.js            # Entry point
│   └── src/
│       ├── config/          # db.js (MySQL pool connection)
│       ├── middleware/      # auth.js, role.js, rateLimit.js
│       ├── controllers/     # auth, incident, complaint, admin, tech controllers
│       ├── routes/          # REST route endpoints
│       ├── services/        # confidence.js, outageService.js
│       ├── scripts/         # schema.sql, seed.js, simulate.js
│       └── utils/           # helper functions, logger
├── web/                     # React + Vite Frontend Application
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── index.html
│   └── src/
│       ├── assets/
│       ├── components/      # Navbar, Sidebar, KPI Cards, StatusBadges, Modal
│       ├── context/         # AuthContext.jsx
│       ├── pages/           # Login, AdminDashboard, Incidents, Complaints,
│       │                    # PlannedOutages, Analytics, TechDashboard
│       ├── services/        # api.js (Axios instance with bearer interceptors)
│       └── App.jsx
├── android/                 # (Phase 2 Native Consumer App)
└── docs/                    # Proposals, defense slides, evaluation logs
```
