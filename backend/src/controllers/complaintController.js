const db = require('../config/db');
const logAudit = require('../utils/auditLogger');
const { sendNotification } = require('../utils/notificationService');

exports.createComplaint = (req, res) => {
    try {
        const { category, description, incident_id } = req.body;
        const userId = req.user.user_id;

        const allowedCategories = ['power_outage', 'low_voltage', 'transformer', 'damaged_wire', 'pole', 'other'];
        if (!category || !allowedCategories.includes(category)) {
            return res.status(400).json({ error: `Category must be one of: ${allowedCategories.join(', ')}` });
        }

        const stmt = db.prepare(`
            INSERT INTO complaints (user_id, incident_id, category, description, status)
            VALUES (?, ?, ?, ?, 'pending')
        `);

        const result = stmt.run(userId, incident_id || null, category, description || null);
        const complaintId = result.lastInsertRowid;

        logAudit(userId, 'CREATE_COMPLAINT', `User filed complaint #${complaintId} (${category})`);

        // Notify user about successful submission
        try {
            sendNotification(
                userId,
                '📝 Complaint Registered',
                `Your ticket #${complaintId} regarding "${category.replace('_', ' ')}" has been received and queued for technician review.`
            );
        } catch (notifErr) {
            console.error('[Complaints] Notification error:', notifErr.message);
        }

        res.status(201).json({
            message: 'Complaint submitted successfully',
            complaint_id: complaintId
        });
    } catch (err) {
        console.error('[Complaints] Create error:', err);
        res.status(500).json({ error: 'Failed to submit complaint' });
    }
};

exports.getMyComplaints = (req, res) => {
    try {
        const complaints = db.prepare(`
            SELECT c.*, a.status as assignment_status, a.remarks as tech_remarks,
                   t_user.name as technician_name, t_user.phone as technician_phone
            FROM complaints c
            LEFT JOIN assignments a ON c.complaint_id = a.complaint_id
            LEFT JOIN technicians t ON a.technician_id = t.technician_id
            LEFT JOIN users t_user ON t.user_id = t_user.user_id
            WHERE c.user_id = ?
            ORDER BY c.created_at DESC
        `).all(req.user.user_id);

        res.json({ complaints });
    } catch (err) {
        console.error('[Complaints] Get mine error:', err);
        res.status(500).json({ error: 'Failed to fetch complaints' });
    }
};

exports.getAllComplaints = (req, res) => {
    try {
        const { status, category, limit = 100 } = req.query;
        let query = `
            SELECT c.*, u.name as consumer_name, u.email as consumer_email, u.phone as consumer_phone,
                   l.area, l.district, l.zone,
                   a.assignment_id, a.technician_id, a.remarks as technician_remarks,
                   tech_user.name as technician_name
            FROM complaints c
            JOIN users u ON c.user_id = u.user_id
            LEFT JOIN locations l ON u.location_id = l.location_id
            LEFT JOIN assignments a ON c.complaint_id = a.complaint_id
            LEFT JOIN technicians tech ON a.technician_id = tech.technician_id
            LEFT JOIN users tech_user ON tech.user_id = tech_user.user_id
            WHERE 1=1
        `;
        const params = [];

        if (status) {
            query += ' AND c.status = ?';
            params.push(status);
        }
        if (category) {
            query += ' AND c.category = ?';
            params.push(category);
        }

        query += ' ORDER BY c.created_at DESC LIMIT ?';
        params.push(parseInt(limit, 10));

        const complaints = db.prepare(query).all(...params);
        res.json({ complaints });
    } catch (err) {
        console.error('[Complaints] Get all error:', err);
        res.status(500).json({ error: 'Failed to retrieve complaints' });
    }
};

exports.assignTechnician = (req, res) => {
    try {
        const { id } = req.params;
        const { technician_id, remarks } = req.body;

        if (!technician_id) {
            return res.status(400).json({ error: 'technician_id is required' });
        }

        const tech = db.prepare('SELECT * FROM technicians WHERE technician_id = ?').get(technician_id);
        if (!tech) {
            return res.status(404).json({ error: 'Technician not found' });
        }

        const complaint = db.prepare('SELECT * FROM complaints WHERE complaint_id = ?').get(id);
        if (!complaint) {
            return res.status(404).json({ error: 'Complaint not found' });
        }

        // Upsert assignment record
        const existingAssignment = db.prepare('SELECT assignment_id FROM assignments WHERE complaint_id = ?').get(id);
        if (existingAssignment) {
            db.prepare(`
                UPDATE assignments
                SET technician_id = ?, status = 'assigned', remarks = ?, updated_at = datetime('now')
                WHERE complaint_id = ?
            `).run(technician_id, remarks || 'Reassigned by administrator', id);
        } else {
            db.prepare(`
                INSERT INTO assignments (complaint_id, technician_id, status, remarks)
                VALUES (?, ?, 'assigned', ?)
            `).run(id, technician_id, remarks || 'Assigned by administrator');
        }

        // Update complaint status to 'assigned'
        db.prepare(`UPDATE complaints SET status = 'assigned' WHERE complaint_id = ?`).run(id);

        // Update technician status to 'busy'
        db.prepare(`UPDATE technicians SET availability_status = 'busy' WHERE technician_id = ?`).run(technician_id);

        logAudit(req.user.user_id, 'ASSIGN_TECHNICIAN', `Assigned technician #${technician_id} to complaint #${id}`);

        // Notify complainant about assigned technician
        try {
            const techUser = db.prepare('SELECT name, phone FROM users WHERE user_id = ?').get(tech.user_id);
            const techName = techUser?.name || `Technician #${technician_id}`;
            const techPhone = techUser?.phone ? ` (${techUser.phone})` : '';
            sendNotification(
                complaint.user_id,
                '🔧 Technician Dispatched',
                `${techName}${techPhone} has been assigned to your complaint #${id} (${complaint.category.replace('_', ' ')}). Field inspection scheduled.`
            );
        } catch (notifErr) {
            console.error('[Complaints] Assign notification error:', notifErr.message);
        }

        res.json({ message: 'Technician assigned successfully', complaint_id: id, technician_id });
    } catch (err) {
        console.error('[Complaints] Assign error:', err);
        res.status(500).json({ error: 'Failed to assign technician' });
    }
};
