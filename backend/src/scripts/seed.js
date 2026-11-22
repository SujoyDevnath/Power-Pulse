const bcrypt = require('bcryptjs');
const db = require('../config/db');
const initDb = require('./initDb');

async function seed() {
    console.log('[PowerPulse] Starting database seeding...');
    initDb(); // Ensure tables exist

    // Clear existing data safely
    const tables = [
        'audit_logs', 'notifications', 'meter_readings', 'smart_meter_bills',
        'assignments', 'complaints', 'reports', 'incidents', 'planned_outages',
        'technicians', 'users', 'locations'
    ];

    db.exec('PRAGMA foreign_keys = OFF;');
    for (const table of tables) {
        db.exec(`DELETE FROM ${table};`);
    }
    try {
        db.exec("DELETE FROM sqlite_sequence;");
    } catch (e) {
        // Table might not exist yet if no autoincrement was triggered
    }
    db.exec('PRAGMA foreign_keys = ON;');

    console.log('[PowerPulse] Cleared previous records.');

    // 1. Seed Locations (Dhaka municipal zones)
    const locations = [
        { district: 'Dhaka', area: 'Mirpur-10', zone: 'Zone A', lat: 23.8071, lng: 90.3686 },
        { district: 'Dhaka', area: 'Mirpur-2', zone: 'Zone A', lat: 23.8010, lng: 90.3620 },
        { district: 'Dhaka', area: 'Dhanmondi 27', zone: 'Zone B', lat: 23.7538, lng: 90.3768 },
        { district: 'Dhaka', area: 'Dhanmondi 32', zone: 'Zone B', lat: 23.7486, lng: 90.3789 },
        { district: 'Dhaka', area: 'Uttara Sector 4', zone: 'Zone C', lat: 23.8712, lng: 90.3980 },
        { district: 'Dhaka', area: 'Uttara Sector 11', zone: 'Zone C', lat: 23.8850, lng: 90.3890 },
        { district: 'Dhaka', area: 'Gulshan-1', zone: 'Zone D', lat: 23.7808, lng: 90.4190 },
        { district: 'Dhaka', area: 'Gulshan-2', zone: 'Zone D', lat: 23.7925, lng: 90.4150 },
        { district: 'Dhaka', area: 'Banani', zone: 'Zone D', lat: 23.7937, lng: 90.4043 },
        { district: 'Dhaka', area: 'Mohammadpur', zone: 'Zone B', lat: 23.7658, lng: 90.3584 }
    ];

    const insertLocation = db.prepare(`
        INSERT INTO locations (district, area, zone, latitude, longitude)
        VALUES (@district, @area, @zone, @lat, @lng)
    `);

    for (const loc of locations) {
        insertLocation.run(loc);
    }
    console.log(`[PowerPulse] Seeded ${locations.length} municipal locations.`);

    // 2. Prepare Passwords
    const adminPasswordHash = await bcrypt.hash('Admin@123', 10);
    const techPasswordHash = await bcrypt.hash('Tech@123', 10);
    const userPasswordHash = await bcrypt.hash('User@123', 10);

    const insertUser = db.prepare(`
        INSERT INTO users (name, email, phone, password_hash, role, location_id, reliability_score)
        VALUES (@name, @email, @phone, @password_hash, @role, @location_id, @reliability_score)
    `);

    // Admin Account
    const adminResult = insertUser.run({
        name: 'Tarikul Islam (Admin)',
        email: 'admin@powerpulse.com',
        phone: '01711000001',
        password_hash: adminPasswordHash,
        role: 'admin',
        location_id: 1,
        reliability_score: 1.0
    });

    // Technicians
    const techs = [
        { name: 'Rahim Ahmed (Lead Field Tech)', email: 'rahim.tech@powerpulse.com', phone: '01811000002', loc: 1, avail: 'available' },
        { name: 'Karim Uddin (Substation Specialist)', email: 'karim.tech@powerpulse.com', phone: '01911000003', loc: 5, avail: 'busy' },
        { name: 'Salma Akter (Linesman Tech)', email: 'salma.tech@powerpulse.com', phone: '01611000004', loc: 3, avail: 'available' }
    ];

    const insertTech = db.prepare(`
        INSERT INTO technicians (user_id, availability_status)
        VALUES (?, ?)
    `);

    for (const t of techs) {
        const u = insertUser.run({
            name: t.name,
            email: t.email,
            phone: t.phone,
            password_hash: techPasswordHash,
            role: 'technician',
            location_id: t.loc,
            reliability_score: 0.95
        });
        insertTech.run(u.lastInsertRowid, t.avail);
    }
    console.log(`[PowerPulse] Seeded Admin and ${techs.length} Technicians.`);

    // Consumers
    const consumers = [
        { name: 'Tanvir Hossain', email: 'tanvir@gmail.com', phone: '01720000010', loc: 1, rel: 0.90 },
        { name: 'Nusrat Jahan', email: 'nusrat@gmail.com', phone: '01720000011', loc: 1, rel: 0.85 },
        { name: 'Sabbir Rahman', email: 'sabbir@gmail.com', phone: '01720000012', loc: 1, rel: 0.80 },
        { name: 'Farzana Chowdhury', email: 'farzana@gmail.com', phone: '01720000013', loc: 1, rel: 0.88 },
        { name: 'Mahmudul Hasan', email: 'mahmud@gmail.com', phone: '01720000014', loc: 3, rel: 0.75 },
        { name: 'Ayesha Siddika', email: 'ayesha@gmail.com', phone: '01720000015', loc: 3, rel: 0.80 },
        { name: 'Kamrul Islam', email: 'kamrul@gmail.com', phone: '01720000016', loc: 5, rel: 0.92 },
        { name: 'Rehana Parvin', email: 'rehana@gmail.com', phone: '01720000017', loc: 5, rel: 0.70 },
        { name: 'Zubair Alom', email: 'zubair@gmail.com', phone: '01720000018', loc: 7, rel: 0.82 },
        { name: 'Sadia Khan', email: 'sadia@gmail.com', phone: '01720000019', loc: 8, rel: 0.86 }
    ];

    for (const c of consumers) {
        insertUser.run({
            name: c.name,
            email: c.email,
            phone: c.phone,
            password_hash: userPasswordHash,
            role: 'consumer',
            location_id: c.loc,
            reliability_score: c.rel
        });
    }
    console.log(`[PowerPulse] Seeded ${consumers.length} verified Consumer accounts.`);

    // 3. Seed an Active Outage Incident in Mirpur-10 (Confidence 86% - Probable)
    const insertIncident = db.prepare(`
        INSERT INTO incidents (location_id, confidence_score, classification, type, status, start_time, duration_minutes)
        VALUES (?, ?, ?, ?, ?, datetime('now', '-25 minutes'), ?)
    `);

    const activeIncident = insertIncident.run(1, 86, 'probable', 'unexpected', 'open', null);
    const incidentId = activeIncident.lastInsertRowid;

    // Seed 4 OFF reports in Mirpur-10 that produced this incident
    const insertReport = db.prepare(`
        INSERT INTO reports (user_id, location_id, incident_id, type, reported_at, sync_status, is_duplicate, is_spam)
        VALUES (?, ?, ?, ?, datetime('now', ?), 'synced', 0, 0)
    `);

    insertReport.run(5, 1, incidentId, 'OFF', '-25 minutes');
    insertReport.run(6, 1, incidentId, 'OFF', '-22 minutes');
    insertReport.run(7, 1, incidentId, 'OFF', '-18 minutes');
    insertReport.run(8, 1, incidentId, 'OFF', '-14 minutes');

    // Seed a Past Restored Outage in Dhanmondi 27 (1h 15m duration)
    const restoredIncident = db.prepare(`
        INSERT INTO incidents (location_id, confidence_score, classification, type, status, start_time, end_time, duration_minutes)
        VALUES (3, 95, 'confirmed', 'unexpected', 'restored', datetime('now', '-5 hours'), datetime('now', '-3 hours 45 minutes'), 75)
    `).run();

    // 4. Seed Consumer Complaints
    const insertComplaint = db.prepare(`
        INSERT INTO complaints (user_id, incident_id, category, description, status, created_at)
        VALUES (?, ?, ?, ?, ?, datetime('now', ?))
    `);

    const c1 = insertComplaint.run(5, incidentId, 'power_outage', 'Entire block around Road 4 has been completely pitch black for 20 mins.', 'assigned', '-20 minutes');
    const c2 = insertComplaint.run(9, null, 'low_voltage', 'Severe low voltage in Dhanmondi 27, AC and refrigerator cannot turn on.', 'pending', '-40 minutes');
    const c3 = insertComplaint.run(11, null, 'transformer', 'Loud spark noise and smoke coming from the pole transformer near Sector 4.', 'investigating', '-1 hour');

    // 5. Seed Technician Assignments
    const insertAssignment = db.prepare(`
        INSERT INTO assignments (complaint_id, technician_id, status, remarks, assigned_at)
        VALUES (?, ?, ?, ?, datetime('now', ?))
    `);

    insertAssignment.run(c1.lastInsertRowid, 1, 'assigned', 'Dispatched to Mirpur-10 substation for feeder breaker inspection.', '-15 minutes');
    insertAssignment.run(c3.lastInsertRowid, 2, 'investigating', 'On-site assessing transformer coil damage with team.', '-45 minutes');

    // 6. Seed Planned Load-Shedding Outages
    const insertPlanned = db.prepare(`
        INSERT INTO planned_outages (location_id, outage_date, start_time, end_time, reason)
        VALUES (?, ?, ?, ?, ?)
    `);

    insertPlanned.run(6, '2026-11-20', '10:00', '12:30', 'Routine 33kV substation feeder maintenance and grid line trimming.');
    insertPlanned.run(8, '2026-11-21', '14:00', '16:00', 'Scheduled power grid transformer capacity upgrade.');

    // 7. Seed Smart Meter Demo Bills & Readings
    const insertBill = db.prepare(`
        INSERT INTO smart_meter_bills (user_id, month, consumption_kwh, amount, status, transaction_id, paid_at)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    insertBill.run(5, '2026-10', 184.50, 1420.00, 'paid', 'PP-TXN-89421', '2026-11-05 14:22:00');
    insertBill.run(5, '2026-11', 142.10, 1136.80, 'unpaid', null, null);

    // 8. Seed Security Audit Logs
    const insertAudit = db.prepare(`
        INSERT INTO audit_logs (user_id, action, details)
        VALUES (?, ?, ?)
    `);

    insertAudit.run(1, 'SYSTEM_INIT', 'Database seeded with default municipal locations, admin, technicians, and demo consumers.');
    insertAudit.run(1, 'ASSIGN_TECHNICIAN', 'Admin dispatched Rahim Ahmed to Complaint #1 (Mirpur-10).');

    console.log('[PowerPulse] Database seeded successfully!');
    console.log('----------------------------------------------------');
    console.log('Login Credentials:');
    console.log('  Admin:      admin@powerpulse.com     / Admin@123');
    console.log('  Technician: rahim.tech@powerpulse.com / Tech@123');
    console.log('  Technician: karim.tech@powerpulse.com / Tech@123');
    console.log('  Consumer:   tanvir@gmail.com         / User@123');
    console.log('----------------------------------------------------');
}

if (require.main === module) {
    seed().then(() => process.exit(0)).catch(err => {
        console.error('[PowerPulse] Seed error:', err);
        process.exit(1);
    });
}

module.exports = seed;
