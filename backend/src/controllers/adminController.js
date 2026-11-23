const db = require('../config/db');
const logAudit = require('../utils/auditLogger');

exports.getAnalytics = async (req, res) => {
    try {
        // 1. KPI Counts
        const activeOutagesRow = await db.prepare("SELECT COUNT(*) as count FROM incidents WHERE status = 'open'").get();
        const activeOutages = activeOutagesRow ? activeOutagesRow.count : 0;

        const totalOutagesRow = await db.prepare("SELECT COUNT(*) as count FROM incidents").get();
        const totalOutages = totalOutagesRow ? totalOutagesRow.count : 0;

        const pendingComplaintsRow = await db.prepare("SELECT COUNT(*) as count FROM complaints WHERE status != 'resolved'").get();
        const pendingComplaints = pendingComplaintsRow ? pendingComplaintsRow.count : 0;

        const totalUsersRow = await db.prepare("SELECT COUNT(*) as count FROM users WHERE role = 'consumer'").get();
        const totalUsers = totalUsersRow ? totalUsersRow.count : 0;

        const activeTechsRow = await db.prepare("SELECT COUNT(*) as count FROM technicians WHERE availability_status != 'off'").get();
        const activeTechs = activeTechsRow ? activeTechsRow.count : 0;

        // Average duration of restored outages
        const avgDurationRow = await db.prepare(`
            SELECT AVG(duration_minutes) as avg_duration 
            FROM incidents 
            WHERE status = 'restored' AND duration_minutes IS NOT NULL
        `).get();
        const avgDurationMinutes = Math.round(avgDurationRow?.avg_duration || 0);

        // 2. Area-wise Outages (for Bar Chart)
        const areaWiseOutages = await db.prepare(`
            SELECT l.area, COUNT(i.incident_id) as incident_count
            FROM locations l
            LEFT JOIN incidents i ON l.location_id = i.location_id
            GROUP BY l.area
            ORDER BY incident_count DESC
            LIMIT 10
        `).all();

        // 3. Complaint Breakdown by Category (for Pie/Donut Chart)
        const complaintsByCategory = await db.prepare(`
            SELECT category, COUNT(*) as count 
            FROM complaints 
            GROUP BY category
            ORDER BY count DESC
        `).all();

        // 4. Incident Status Distribution
        const incidentsByStatus = await db.prepare(`
            SELECT status, COUNT(*) as count 
            FROM incidents 
            GROUP BY status
        `).all();

        res.json({
            kpi: {
                activeOutages,
                totalOutages,
                pendingComplaints,
                totalUsers,
                activeTechs,
                avgDurationMinutes
            },
            areaWiseOutages,
            complaintsByCategory,
            incidentsByStatus
        });
    } catch (err) {
        console.error('[Admin] Analytics error:', err);
        res.status(500).json({ error: 'Failed to generate analytics' });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await db.prepare(`
            SELECT u.user_id, u.name, u.email, u.phone, u.role, u.reliability_score, u.created_at,
                   l.area, l.district, l.zone,
                   t.technician_id, t.availability_status
            FROM users u
            LEFT JOIN locations l ON u.location_id = l.location_id
            LEFT JOIN technicians t ON u.user_id = t.user_id
            ORDER BY u.created_at DESC
        `).all();

        res.json({ users });
    } catch (err) {
        console.error('[Admin] Get users error:', err);
        res.status(500).json({ error: 'Failed to retrieve users' });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { role, reliability_score, availability_status } = req.body;

        const user = await db.prepare('SELECT * FROM users WHERE user_id = ?').get(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (role) {
            await db.prepare('UPDATE users SET role = ? WHERE user_id = ?').run(role, id);

            // If promoting to technician, ensure technician profile exists
            if (role === 'technician') {
                const techExists = await db.prepare('SELECT technician_id FROM technicians WHERE user_id = ?').get(id);
                if (!techExists) {
                    await db.prepare("INSERT INTO technicians (user_id, availability_status) VALUES (?, 'available')").run(id);
                }
            }
        }

        if (reliability_score !== undefined) {
            const clamped = Math.max(0.05, Math.min(1.00, parseFloat(reliability_score)));
            await db.prepare('UPDATE users SET reliability_score = ? WHERE user_id = ?').run(clamped, id);
        }

        if (availability_status) {
            await db.prepare('UPDATE technicians SET availability_status = ? WHERE user_id = ?').run(availability_status, id);
        }

        await logAudit(req.user.user_id, 'UPDATE_USER', `Admin updated user #${id} attributes`);

        res.json({ message: 'User updated successfully', user_id: id });
    } catch (err) {
        console.error('[Admin] Update user error:', err);
        res.status(500).json({ error: 'Failed to update user' });
    }
};

exports.getAuditLogs = async (req, res) => {
    try {
        const { limit = 100 } = req.query;
        const logs = await db.prepare(`
            SELECT a.*, u.name as user_name, u.email as user_email, u.role as user_role
            FROM audit_logs a
            LEFT JOIN users u ON a.user_id = u.user_id
            ORDER BY a.created_at DESC
            LIMIT ?
        `).all(parseInt(limit, 10));

        res.json({ logs });
    } catch (err) {
        console.error('[Admin] Audit logs error:', err);
        res.status(500).json({ error: 'Failed to retrieve audit logs' });
    }
};
