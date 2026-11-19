# PowerPulse: Architecture Decision Records (ADRs)

This document records the key architectural, technical, and engineering decisions made for the **PowerPulse** platform, their context, rationale, and consequences.

---

## ADR-001: Prioritizing Web Application & Core Backend First

- **Status:** Accepted
- **Context:** The PowerPulse system encompasses three distinct client interfaces (Admin Web, Technician Web, and Android Consumer App) and a backend service. Building all three clients simultaneously introduces coordination bottlenecks and delays end-to-end testing.
- **Decision:** Prioritize the development of the **Express Backend API**, **MySQL Database**, and the **Web Application (Admin & Technician Portals)** before proceeding to the Android application.
- **Consequences:**
  - *Positive:* Validates the entire data model, authentication flow, and core confidence scoring algorithm immediately.
  - *Positive:* Provides an operational dashboard to view and manipulate incidents, complaints, and users early in development.
  - *Positive:* Provides ready-to-test REST endpoints for the Android client when native development begins.
  - *Trade-off:* Consumer mobile reporting is temporarily simulated via API calls / web test utilities until Android development kicks off.

---

## ADR-002: Frontend Framework — React with Vite & Tailwind CSS

- **Status:** Accepted
- **Context:** The proposal mentions options ranging from plain HTML+CSS+JS to React. The interface requires real-time KPI status badges, interactive charts (Recharts), dynamic tables with search/filter, and modal workflows.
- **Decision:** Adopt **React 18/19** powered by **Vite** and **Tailwind CSS**.
- **Consequences:**
  - *Positive:* Extremely fast development feedback loop through Vite HMR.
  - *Positive:* Component modularity allows reusable status chips, metric cards, and modals across Admin and Technician views.
  - *Positive:* Tailwind provides rapid styling without bloated external UI libraries that are difficult to customize.
  - *Trade-off:* Requires a build step (`npm run build`), which is handled seamlessly by standard Node tooling.

---

## ADR-003: Database Engine & Driver — MySQL with `mysql2/promise`

- **Status:** Accepted
- **Context:** The project requires a relational database to maintain strict referential integrity across 12 tables (locations, users, incidents, reports, complaints, assignments, etc.).
- **Decision:** Use **MySQL 8.0+** with the native Node.js **`mysql2/promise`** connection pooling client, executing raw, parameterized SQL queries instead of a heavy ORM (like Prisma or TypeORM).
- **Consequences:**
  - *Positive:* Complete transparency: queries in the code match the SQL queries submitted in the project report and defense slides.
  - *Positive:* Immunity to SQL injection via native prepared statements (`?` placeholders).
  - *Positive:* Zero ORM abstraction penalty, simple debugging with phpMyAdmin or MySQL Workbench.
  - *Trade-off:* Requires explicit SQL schema migrations and manual column mapping in controllers.

---

## ADR-004: Core Scoring Engine Architecture — Dedicated Service Layer

- **Status:** Accepted
- **Context:** The core academic innovation (USP) of PowerPulse is its **Confidence Score Algorithm**, converting multi-user OFF/BACK signals into verified area incidents.
- **Decision:** Implement the algorithm inside a dedicated backend service module (`backend/src/services/confidence.js`) with isolated pure functions, decoupled from HTTP routing.
- **Consequences:**
  - *Positive:* Easy to unit test against synthetic scenarios (e.g., single report vs 5 clustered reports vs duplicate spam).
  - *Positive:* Weights and penalty factors can be tuned without modifying database schemas or controller endpoints.
  - *Positive:* Clear separation of concerns; simplifies code review and academic explanation to examiners.

---

## ADR-005: Role-Based Access Control (RBAC) Architecture

- **Status:** Accepted
- **Context:** The platform serves three distinct roles with different privilege levels: Administrators, Field Technicians, and Consumers. Technicians must only access assigned tickets; consumers must not access administrative analytics.
- **Decision:** Implement stateless **JWT-based RBAC**. The Express backend validates tokens with an `authenticateToken` middleware and restricts endpoints with `allowRoles(...roles)`. The React web app mirrors this via a `<ProtectedRoute allowedRoles={[...]} />` component.
- **Consequences:**
  - *Positive:* Stateless and scalable; no session database needed.
  - *Positive:* Prevents horizontal and vertical privilege escalation.
  - *Trade-off:* Tokens cannot be invalidated instantly prior to expiry without a token blacklist (acceptable for academic pilot scope; standard 24h expiration utilized).

---

## ADR-006: Map Visualization — Leaflet.js with OpenStreetMap

- **Status:** Accepted
- **Context:** The project proposal includes optional geographical map visualization to display area outage distributions. Proprietary APIs (e.g., Google Maps) require credit cards, billing accounts, and API key restrictions.
- **Decision:** Utilize **Leaflet.js** with open **OpenStreetMap** tile layers.
- **Consequences:**
  - *Positive:* 100% free, open-source, requires zero billing setup or API keys.
  - *Positive:* Lightweight bundle size and easy integration with React via `react-leaflet`.
  - *Trade-off:* Basic satellite view limitations compared to commercial services, which is non-critical for municipal polygon/marker visualization.

---

## ADR-007: Testing & Evaluation — Automated Outage Simulator Script

- **Status:** Accepted
- **Context:** Power grid outages are spontaneous and unpredictable. During classroom presentations or examiner evaluations, the team cannot rely on real live blackouts.
- **Decision:** Build an automated CLI simulator script (`backend/scripts/simulate.js`) capable of mocking multi-user burst reports, duplicate spam, single false alarms, and restoration events in seconds.
- **Consequences:**
  - *Positive:* Flawless, repeatable demonstration for teachers and examiners.
  - *Positive:* Directly generates empirical data for the evaluation metrics table required in Chapter 5 of the thesis/report.


---

## ADR-008: SQLite for Local Development with Seamless Migration to Neon PostgreSQL for Production

- **Status:** Accepted
- **Context:** To ensure rapid, frictionless local prototyping and zero reliance on database servers or cloud credentials while developing on Dipto's laptop, a lightweight local storage solution is required before deploying to Neon DB + Heroku in production.
- **Decision:** Use **SQLite** (via `better-sqlite3`) as the local development database engine stored directly as a file (`backend/powerpulse.db`). Design all schemas and database queries using ANSI SQL standards so that migrating to **Neon DB (Serverless PostgreSQL)** for cloud deployment on Heroku is a drop-in transition.
- **Consequences:**
  - *Positive:* 100% self-contained; runs on any computer with zero database server installation or daemon management.
  - *Positive:* Instant database reset, backup, and inspectability by copying `powerpulse.db`.
  - *Positive:* Blazing-fast local reads and writes with zero network latency.
  - *Positive:* Ready for cloud deployment to Neon DB + Heroku whenever Dipto is ready.
