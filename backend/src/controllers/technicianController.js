const db = require('../config/db');
const logAudit = require('../utils/auditLogger');
const { sendNotification } = require('../utils/notificationService');

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
        } else {
            // If technician was marked 'available', toggle to 'busy' since an active task is underway/reopened
            const currentTech = db.prepare('SELECT availability_status FROM technicians WHERE technician_id = ?').get(technicianId);
            if (currentTech && currentTech.availability_status === 'available') {
                db.prepare(`UPDATE technicians SET availability_status = 'busy' WHERE technician_id = ?`).run(technicianId);
            }
        }

        logAudit(req.user.user_id, 'TECH_UPDATE_TASK', `Technician updated assignment #${id} to status: ${status}`);

        // Notify complainant about technician progress
        try {
            const complaint = db.prepare('SELECT user_id, category FROM complaints WHERE complaint_id = ?').get(assignment.complaint_id);
            if (complaint) {
                let notifTitle = '🔧 Complaint Update';
                let notifMsg = `Your complaint #${assignment.complaint_id} status is now: ${status}.`;
                if (status === 'investigating') {
                    notifTitle = '🔍 Technician Investigating';
                    notifMsg = `Technician has arrived on-site and is investigating complaint #${assignment.complaint_id} (${complaint.category.replace('_', ' ')}). ${remarks ? `Note: "${remarks}"` : ''}`;
                } else if (status === 'repairing') {
                    notifTitle = '🛠️ Repair Work in Progress';
                    notifMsg = `Field repair work has begun on complaint #${assignment.complaint_id} (${complaint.category.replace('_', ' ')}). ${remarks ? `Note: "${remarks}"` : ''}`;
                } else if (status === 'resolved') {
                    notifTitle = '✅ Issue Resolved';
                    notifMsg = `Your complaint #${assignment.complaint_id} (${complaint.category.replace('_', ' ')}) has been resolved. ${remarks ? `Tech remarks: "${remarks}"` : ''}`;
                } else if (status === 'assigned') {
                    notifTitle = '↩️ Task Reverted to Assigned';
                    notifMsg = `Complaint #${assignment.complaint_id} status was rolled back to Assigned for re-evaluation. ${remarks ? `Note: "${remarks}"` : ''}`;
                }
                sendNotification(complaint.user_id, notifTitle, notifMsg.trim());
            }
        } catch (notifErr) {
            console.error('[Technician] Notification dispatch error:', notifErr.message);
        }

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

exports.getProfile = (req, res) => {
    try {
        const technicianId = req.user.technician_id;
        if (!technicianId) {
            return res.status(403).json({ error: 'User does not possess a technician profile' });
        }

        const technician = db.prepare(`
            SELECT t.technician_id, t.availability_status, 
                   u.user_id, u.name, u.email, u.phone, u.role,
                   l.location_id, l.area, l.district, l.zone
            FROM technicians t
            JOIN users u ON t.user_id = u.user_id
            LEFT JOIN locations l ON u.location_id = l.location_id
            WHERE t.technician_id = ?
        `).get(technicianId);

        if (!technician) {
            return res.status(404).json({ error: 'Technician record not found' });
        }

        // Calculate performance metrics
        const stats = db.prepare(`
            SELECT 
                COUNT(*) as total_tasks,
                SUM(CASE WHEN status != 'resolved' THEN 1 ELSE 0 END) as active_tasks,
                SUM(CASE WHEN status = 'resolved' THEN 1 ELSE 0 END) as resolved_tasks,
                SUM(CASE WHEN status = 'assigned' THEN 1 ELSE 0 END) as assigned_tasks,
                SUM(CASE WHEN status = 'investigating' THEN 1 ELSE 0 END) as investigating_tasks,
                SUM(CASE WHEN status = 'repairing' THEN 1 ELSE 0 END) as repairing_tasks
            FROM assignments
            WHERE technician_id = ?
        `).get(technicianId);

        const total = stats.total_tasks || 0;
        const resolved = stats.resolved_tasks || 0;
        const completionRate = total > 0 ? Math.round((resolved / total) * 100) : 100;

        res.json({
            profile: {
                ...technician,
                stats: {
                    total_tasks: total,
                    active_tasks: stats.active_tasks || 0,
                    resolved_tasks: resolved,
                    assigned_tasks: stats.assigned_tasks || 0,
                    investigating_tasks: stats.investigating_tasks || 0,
                    repairing_tasks: stats.repairing_tasks || 0,
                    completion_rate: completionRate
                }
            }
        });
    } catch (err) {
        console.error('[Technician] Get profile error:', err);
        res.status(500).json({ error: 'Failed to retrieve technician profile' });
    }
};

exports.updateAvailabilityStatus = (req, res) => {
    try {
        const technicianId = req.user.technician_id;
        if (!technicianId) {
            return res.status(403).json({ error: 'User does not possess a technician profile' });
        }

        const { status } = req.body;
        const allowed = ['available', 'busy', 'on_leave', 'offline'];
        if (!status || !allowed.includes(status)) {
            return res.status(400).json({ error: `Status must be one of: ${allowed.join(', ')}` });
        }

        db.prepare(`
            UPDATE technicians 
            SET availability_status = ? 
            WHERE technician_id = ?
        `).run(status, technicianId);

        logAudit(req.user.user_id, 'TECH_STATUS_CHANGE', `Technician changed availability status to: ${status}`);

        res.json({
            message: `Availability status updated to ${status}`,
            availability_status: status
        });
    } catch (err) {
        console.error('[Technician] Update availability status error:', err);
        res.status(500).json({ error: 'Failed to update availability status' });
    }
};

exports.updateProfile = (req, res) => {
    try {
        const { name, phone } = req.body;
        const userId = req.user.user_id;

        if (!name && !phone) {
            return res.status(400).json({ error: 'Provide at least name or phone to update' });
        }

        db.prepare(`
            UPDATE users
            SET name = COALESCE(?, name),
                phone = COALESCE(?, phone)
            WHERE user_id = ?
        `).run(name?.trim() || null, phone?.trim() || null, userId);

        logAudit(userId, 'TECH_PROFILE_UPDATE', `Technician updated contact profile (Name: ${name || 'unchanged'}, Phone: ${phone || 'unchanged'})`);

        const updatedUser = db.prepare(`
            SELECT u.user_id, u.name, u.email, u.phone, u.role, 
                   t.technician_id, t.availability_status
            FROM users u
            JOIN technicians t ON u.user_id = t.user_id
            WHERE u.user_id = ?
        `).get(userId);

        res.json({
            message: 'Profile updated successfully',
            user: updatedUser
        });
    } catch (err) {
        console.error('[Technician] Update profile error:', err);
        res.status(500).json({ error: 'Failed to update profile' });
    }
};
