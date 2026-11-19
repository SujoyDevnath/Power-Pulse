-- PowerPulse: Relational Database Schema (SQLite & ANSI Standard)
-- 12 Structured Tables for Smart Electricity Outage Intelligence & Management

PRAGMA foreign_keys = ON;

-- 1. Locations
CREATE TABLE IF NOT EXISTS locations (
    location_id INTEGER PRIMARY KEY AUTOINCREMENT,
    district TEXT NOT NULL,
    area TEXT NOT NULL,
    zone TEXT NOT NULL,
    latitude REAL,
    longitude REAL
);

-- 2. Users (Consumer, Admin, Technician)
CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    password_hash TEXT NOT NULL,
    role TEXT CHECK(role IN ('consumer', 'admin', 'technician')) DEFAULT 'consumer',
    location_id INTEGER,
    reliability_score REAL DEFAULT 0.50,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (location_id) REFERENCES locations(location_id) ON DELETE SET NULL
);

-- 3. Technicians (Profile linked to Users)
CREATE TABLE IF NOT EXISTS technicians (
    technician_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER UNIQUE NOT NULL,
    availability_status TEXT CHECK(availability_status IN ('available', 'busy', 'off')) DEFAULT 'available',
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- 4. Outage Incidents (Aggregated Area Events)
CREATE TABLE IF NOT EXISTS incidents (
    incident_id INTEGER PRIMARY KEY AUTOINCREMENT,
    location_id INTEGER NOT NULL,
    confidence_score INTEGER DEFAULT 0,
    classification TEXT CHECK(classification IN ('low', 'possible', 'probable', 'confirmed')) DEFAULT 'low',
    type TEXT CHECK(type IN ('unexpected', 'planned')) DEFAULT 'unexpected',
    status TEXT CHECK(status IN ('open', 'restored', 'dismissed')) DEFAULT 'open',
    start_time DATETIME NOT NULL,
    end_time DATETIME,
    duration_minutes INTEGER,
    manually_reviewed INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (location_id) REFERENCES locations(location_id) ON DELETE CASCADE
);

-- 5. Individual OFF/BACK Reports
CREATE TABLE IF NOT EXISTS reports (
    report_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    location_id INTEGER NOT NULL,
    incident_id INTEGER,
    type TEXT CHECK(type IN ('OFF', 'BACK')) NOT NULL,
    reported_at DATETIME NOT NULL,
    received_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    sync_status TEXT CHECK(sync_status IN ('synced', 'pending')) DEFAULT 'synced',
    is_duplicate INTEGER DEFAULT 0,
    is_spam INTEGER DEFAULT 0,
    client_uuid TEXT UNIQUE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (location_id) REFERENCES locations(location_id) ON DELETE CASCADE,
    FOREIGN KEY (incident_id) REFERENCES incidents(incident_id) ON DELETE SET NULL
);

-- 6. Consumer Complaints
CREATE TABLE IF NOT EXISTS complaints (
    complaint_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    incident_id INTEGER,
    category TEXT CHECK(category IN ('power_outage', 'low_voltage', 'transformer', 'damaged_wire', 'pole', 'other')) NOT NULL,
    description TEXT,
    status TEXT CHECK(status IN ('pending', 'assigned', 'investigating', 'repairing', 'resolved')) DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (incident_id) REFERENCES incidents(incident_id) ON DELETE SET NULL
);

-- 7. Technician Assignments
CREATE TABLE IF NOT EXISTS assignments (
    assignment_id INTEGER PRIMARY KEY AUTOINCREMENT,
    complaint_id INTEGER NOT NULL,
    technician_id INTEGER NOT NULL,
    status TEXT DEFAULT 'assigned',
    remarks TEXT,
    assigned_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (complaint_id) REFERENCES complaints(complaint_id) ON DELETE CASCADE,
    FOREIGN KEY (technician_id) REFERENCES technicians(technician_id) ON DELETE CASCADE
);

-- 8. Planned Outages / Scheduled Load Shedding
CREATE TABLE IF NOT EXISTS planned_outages (
    planned_id INTEGER PRIMARY KEY AUTOINCREMENT,
    location_id INTEGER NOT NULL,
    outage_date TEXT NOT NULL,
    start_time TEXT NOT NULL,
    end_time TEXT NOT NULL,
    reason TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (location_id) REFERENCES locations(location_id) ON DELETE CASCADE
);

-- 9. Smart Meter Bills (Simulated)
CREATE TABLE IF NOT EXISTS smart_meter_bills (
    bill_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    month TEXT NOT NULL,
    consumption_kwh REAL NOT NULL,
    amount REAL NOT NULL,
    status TEXT CHECK(status IN ('unpaid', 'paid')) DEFAULT 'unpaid',
    transaction_id TEXT,
    paid_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- 10. Smart Meter Hourly/Periodic Readings
CREATE TABLE IF NOT EXISTS meter_readings (
    reading_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    reading_time DATETIME NOT NULL,
    kwh REAL NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- 11. System & In-App Notifications
CREATE TABLE IF NOT EXISTS notifications (
    notification_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    is_read INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- 12. Security Audit Logs
CREATE TABLE IF NOT EXISTS audit_logs (
    log_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    action TEXT NOT NULL,
    details TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL
);

-- Indexes for Query Acceleration
CREATE INDEX IF NOT EXISTS idx_reports_location_time ON reports(location_id, reported_at);
CREATE INDEX IF NOT EXISTS idx_incidents_location_status ON incidents(location_id, status);
CREATE INDEX IF NOT EXISTS idx_complaints_user_status ON complaints(user_id, status);
CREATE INDEX IF NOT EXISTS idx_assignments_tech ON assignments(technician_id, status);
