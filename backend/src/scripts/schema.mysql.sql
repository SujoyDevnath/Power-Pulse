-- ============================================================================
-- PowerPulse: Official MySQL Database Schema (MySQL 8.0+ / MariaDB / Cloud DB)
-- Smart Electricity Outage Intelligence & Management Platform
-- ============================================================================

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS blacklisted_tokens;
DROP TABLE IF EXISTS refresh_tokens;
DROP TABLE IF EXISTS audit_logs;
DROP TABLE IF EXISTS notifications;
DROP TABLE IF EXISTS meter_readings;
DROP TABLE IF EXISTS smart_meter_bills;
DROP TABLE IF EXISTS planned_outages;
DROP TABLE IF EXISTS assignments;
DROP TABLE IF EXISTS complaints;
DROP TABLE IF EXISTS reports;
DROP TABLE IF EXISTS incidents;
DROP TABLE IF EXISTS technicians;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS locations;
SET FOREIGN_KEY_CHECKS = 1;

-- 1. Locations
CREATE TABLE locations (
    location_id INT AUTO_INCREMENT PRIMARY KEY,
    district VARCHAR(100) NOT NULL,
    area VARCHAR(100) NOT NULL,
    zone VARCHAR(100) NOT NULL,
    latitude DECIMAL(10, 8) NULL,
    longitude DECIMAL(11, 8) NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Users (Consumers, Admins, Technicians)
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(191) NOT NULL UNIQUE,
    phone VARCHAR(50) NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('consumer', 'admin', 'technician') NOT NULL DEFAULT 'consumer',
    location_id INT NULL,
    reliability_score DECIMAL(4, 2) NOT NULL DEFAULT 0.50,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_users_location FOREIGN KEY (location_id) REFERENCES locations(location_id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Technicians (Profile linked to Users)
CREATE TABLE technicians (
    technician_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL UNIQUE,
    availability_status ENUM('available', 'busy', 'on_leave', 'offline') NOT NULL DEFAULT 'available',
    CONSTRAINT fk_technicians_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Outage Incidents (Aggregated Area Events)
CREATE TABLE incidents (
    incident_id INT AUTO_INCREMENT PRIMARY KEY,
    location_id INT NOT NULL,
    confidence_score INT NOT NULL DEFAULT 0,
    classification ENUM('low', 'possible', 'probable', 'confirmed') NOT NULL DEFAULT 'low',
    type ENUM('unexpected', 'planned') NOT NULL DEFAULT 'unexpected',
    status ENUM('open', 'restored', 'dismissed') NOT NULL DEFAULT 'open',
    start_time DATETIME NOT NULL,
    end_time DATETIME NULL,
    duration_minutes INT NULL,
    manually_reviewed TINYINT(1) NOT NULL DEFAULT 0,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_incidents_location FOREIGN KEY (location_id) REFERENCES locations(location_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Individual OFF/BACK Reports
CREATE TABLE reports (
    report_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    location_id INT NOT NULL,
    incident_id INT NULL,
    type ENUM('OFF', 'BACK') NOT NULL,
    reported_at DATETIME NOT NULL,
    received_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    sync_status ENUM('synced', 'pending') NOT NULL DEFAULT 'synced',
    is_duplicate TINYINT(1) NOT NULL DEFAULT 0,
    is_spam TINYINT(1) NOT NULL DEFAULT 0,
    client_uuid VARCHAR(191) NULL UNIQUE,
    CONSTRAINT fk_reports_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    CONSTRAINT fk_reports_location FOREIGN KEY (location_id) REFERENCES locations(location_id) ON DELETE CASCADE,
    CONSTRAINT fk_reports_incident FOREIGN KEY (incident_id) REFERENCES incidents(incident_id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. Consumer Complaints
CREATE TABLE complaints (
    complaint_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    incident_id INT NULL,
    category ENUM('power_outage', 'low_voltage', 'transformer', 'damaged_wire', 'pole', 'other') NOT NULL,
    description TEXT NULL,
    status ENUM('pending', 'assigned', 'investigating', 'repairing', 'resolved') NOT NULL DEFAULT 'pending',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_complaints_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    CONSTRAINT fk_complaints_incident FOREIGN KEY (incident_id) REFERENCES incidents(incident_id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. Technician Assignments
CREATE TABLE assignments (
    assignment_id INT AUTO_INCREMENT PRIMARY KEY,
    complaint_id INT NOT NULL,
    technician_id INT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'assigned',
    remarks TEXT NULL,
    assigned_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_assignments_complaint FOREIGN KEY (complaint_id) REFERENCES complaints(complaint_id) ON DELETE CASCADE,
    CONSTRAINT fk_assignments_technician FOREIGN KEY (technician_id) REFERENCES technicians(technician_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. Planned Outages / Scheduled Load Shedding
CREATE TABLE planned_outages (
    planned_id INT AUTO_INCREMENT PRIMARY KEY,
    location_id INT NOT NULL,
    outage_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    reason TEXT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_planned_location FOREIGN KEY (location_id) REFERENCES locations(location_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 9. Smart Meter Bills
CREATE TABLE smart_meter_bills (
    bill_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    month VARCHAR(20) NOT NULL,
    consumption_kwh DECIMAL(10, 2) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    status ENUM('unpaid', 'paid') NOT NULL DEFAULT 'unpaid',
    transaction_id VARCHAR(100) NULL,
    paid_at DATETIME NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_bills_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 10. Smart Meter Hourly/Periodic Readings
CREATE TABLE meter_readings (
    reading_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    reading_time DATETIME NOT NULL,
    kwh DECIMAL(10, 2) NOT NULL,
    CONSTRAINT fk_readings_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 11. System & In-App Notifications
CREATE TABLE notifications (
    notification_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    is_read TINYINT(1) NOT NULL DEFAULT 0,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_notifications_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 12. Security Audit Logs
CREATE TABLE audit_logs (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NULL,
    action VARCHAR(100) NOT NULL,
    details TEXT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_audit_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 13. JWT Refresh Tokens (Dual-token rotation)
CREATE TABLE refresh_tokens (
    token_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    token VARCHAR(512) NOT NULL,
    expires_at DATETIME NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_refresh_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 14. Server-Side Token Blacklist (Safe Logout & Revocation)
CREATE TABLE blacklisted_tokens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    token VARCHAR(512) NOT NULL,
    blacklisted_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    expires_at DATETIME NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Performance Indexes (High-Traffic Query Acceleration)
CREATE INDEX idx_reports_location_time ON reports(location_id, reported_at);
CREATE INDEX idx_reports_user_time ON reports(user_id, reported_at);
CREATE INDEX idx_reports_user_received ON reports(user_id, received_at);
CREATE INDEX idx_incidents_location_status ON incidents(location_id, status);
CREATE INDEX idx_complaints_user_status ON complaints(user_id, status);
CREATE INDEX idx_assignments_tech ON assignments(technician_id, status);
CREATE INDEX idx_notifications_user_unread ON notifications(user_id, is_read, created_at);
CREATE INDEX idx_meter_readings_user_time ON meter_readings(user_id, reading_time DESC);
CREATE INDEX idx_bills_user_status ON smart_meter_bills(user_id, status);
CREATE INDEX idx_audit_user_time ON audit_logs(user_id, created_at);
CREATE INDEX idx_planned_location_date ON planned_outages(location_id, outage_date);
CREATE INDEX idx_refresh_tokens_token ON refresh_tokens(token(191));
CREATE INDEX idx_blacklisted_tokens_token ON blacklisted_tokens(token(191));
