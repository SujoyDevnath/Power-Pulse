const db = require('../config/db');
const logAudit = require('../utils/auditLogger');

exports.getMyAssignments = (req, res) => {
    try {
        const technicianId = req.user.technician_id;
        if (!technicianId) {
            return res.status(403).json({ error: 'User does not possess a technician profile' });
        }

        const assignments = db.prepare(`
            SELECT a.*, c.category, c.description, c.status as complaint_status, c.created_at as complaint_created_at,
                   u.name as consumer_name, u.phone as consumer_phone,
                   l.area, l.district, l.zone
            FROM assignments a
            JOIN complaints c ON a.complaint_id = c.complaint_id
            JOIN users u ON c.user_id = u.user_id
            LEFT JOIN locations l ON u.location_id = l.location_id
            WHERE a.technician_id = ?
            ORDER BY a.assigned_at DESC
        `).all(technicianId);

        res.json({ assignments });
    } catch (err) {
        console.error('[Technician] Get assignments error:', err);
        res.status(500).json({ error: 'Failed to retrieve assignments' });
    }
};

exports.updateAssignmentStatus = (req, res) => {
    try {
        const { id } = req.params; // assignment_id
        const { status, remarks } = req.body;
        const technicianId = req.user.technician_id;

        const allowedStatuses = ['assigned', 'investigating', 'repairing', 'resolved'];
        if (!status || !allowedStatuses.includes(status)) {
            return res.status(400).json({ error: `Status must be one of: ${allowedStatuses.join(', ')}` });
        }

        // Verify assignment ownership (technician can only modify their own tickets)
        const assignment = db.prepare(`
            SELECT * FROM assignments WHERE assignment_id = ? AND technician_id = ?
        `).get(id, technicianId);

        if (!assignment) {
            return res.status(404).json({ error: 'Assignment not found or does not belong to you' });
        }

        // Update assignment record
        db.prepare(`
            UPDATE assignments 
            SET status = ?, remarks = COALESCE(?, remarks), updated_at = datetime('now')
            WHERE assignment_id = ?
        `).run(status, remarks || null, id);

        // Update corresponding complaint status
        db.prepare(`
            UPDATE complaints
            SET status = ?
            WHERE complaint_id = ?
        `).run(status, assignment.complaint_id);

        // If marked resolved, toggle technician back to 'available' if they have no other ongoing jobs
        if (status === 'resolved') {
            const pendingJobs = db.prepare(`
                SELECT COUNT(*) as count 
                FROM assignments 
                WHERE technician_id = ? AND status != 'resolved' AND assignment_id != ?
            `).get(technicianId, id).count;

            if (pendingJobs === 0) {
                db.prepare(`UPDATE technicians SET availability_status = 'available' WHERE technician_id = ?`).run(technicianId);
            }
        }

        logAudit(req.user.user_id, 'TECH_UPDATE_TASK', `Technician updated assignment #${id} to status: ${status}`);

        res.json({
            message: `Task status updated to ${status}`,
            assignment_id: id,
            status,
            remarks
        });
    } catch (err) {
        console.error('[Technician] Update status error:', err);
        res.status(500).json({ error: 'Failed to update assignment status' });
    }
};

exports.getAllTechnicians = (req, res) => {
    try {
        const technicians = db.prepare(`
            SELECT t.technician_id, t.availability_status, u.user_id, u.name, u.email, u.phone,
                   l.area as base_area,
                   (SELECT COUNT(*) FROM assignments a WHERE a.technician_id = t.technician_id AND a.status != 'resolved') as active_tasks
            FROM technicians t
            JOIN users u ON t.user_id = u.user_id
            LEFT JOIN locations l ON u.location_id = l.location_id
            ORDER BY t.availability_status ASC, u.name ASC
        `).all();

        res.json({ technicians });
    } catch (err) {
        console.error('[Technician] List error:', err);
        res.status(500).json({ error: 'Failed to fetch technicians' });
    }
};
