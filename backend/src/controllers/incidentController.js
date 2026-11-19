const db = require('../config/db');
const OutageService = require('../services/outageService');
const logAudit = require('../utils/auditLogger');

exports.getActiveIncidents = (req, res) => {
    try {
        const { location_id } = req.query;
        let query = `
            SELECT i.*, l.district, l.area, l.zone, l.latitude, l.longitude,
                   (SELECT COUNT(*) FROM reports r WHERE r.incident_id = i.incident_id) as total_reports,
                   (SELECT COUNT(DISTINCT r.user_id) FROM reports r WHERE r.incident_id = i.incident_id) as reporting_users
            FROM incidents i
            JOIN locations l ON i.location_id = l.location_id
            WHERE i.status = 'open'
        `;
        const params = [];

        if (location_id) {
            query += ' AND i.location_id = ?';
            params.push(location_id);
        }

        query += ' ORDER BY i.confidence_score DESC, i.start_time DESC';

        const incidents = db.prepare(query).all(...params);
        res.json({ incidents });
    } catch (err) {
        console.error('[Incidents] Active fetch error:', err);
        res.status(500).json({ error: 'Failed to fetch active incidents' });
    }
};

exports.getIncidentHistory = (req, res) => {
    try {
        const { limit = 50 } = req.query;
        const incidents = db.prepare(`
            SELECT i.*, l.district, l.area, l.zone,
                   (SELECT COUNT(*) FROM reports r WHERE r.incident_id = i.incident_id) as total_reports
            FROM incidents i
            JOIN locations l ON i.location_id = l.location_id
            WHERE i.status IN ('restored', 'dismissed')
            ORDER BY i.end_time DESC, i.created_at DESC
            LIMIT ?
        `).all(parseInt(limit, 10));

        res.json({ incidents });
    } catch (err) {
        console.error('[Incidents] History fetch error:', err);
        res.status(500).json({ error: 'Failed to fetch incident history' });
    }
};

exports.getIncidentDetails = (req, res) => {
    try {
        const { id } = req.params;
        const incident = db.prepare(`
            SELECT i.*, l.district, l.area, l.zone, l.latitude, l.longitude
            FROM incidents i
            JOIN locations l ON i.location_id = l.location_id
            WHERE i.incident_id = ?
        `).get(id);

        if (!incident) {
            return res.status(404).json({ error: 'Incident not found' });
        }

        const reports = db.prepare(`
            SELECT r.*, u.name as user_name, u.reliability_score
            FROM reports r
            JOIN users u ON r.user_id = u.user_id
            WHERE r.incident_id = ?
            ORDER BY r.reported_at ASC
        `).all(id);

        const complaints = db.prepare(`
            SELECT c.*, u.name as user_name, u.phone as user_phone
            FROM complaints c
            JOIN users u ON c.user_id = u.user_id
            WHERE c.incident_id = ?
        `).all(id);

        res.json({
            incident,
            reports,
            complaints
        });
    } catch (err) {
        console.error('[Incidents] Details fetch error:', err);
        res.status(500).json({ error: 'Failed to fetch incident details' });
    }
};

exports.confirmIncident = (req, res) => {
    try {
        const { id } = req.params;
        const incident = db.prepare('SELECT * FROM incidents WHERE incident_id = ?').get(id);
        if (!incident) {
            return res.status(404).json({ error: 'Incident not found' });
        }

        db.prepare(`
            UPDATE incidents
            SET confidence_score = 100, classification = 'confirmed', manually_reviewed = 1
            WHERE incident_id = ?
        `).run(id);

        logAudit(req.user.user_id, 'CONFIRM_INCIDENT', `Admin confirmed incident #${id} to 100%`);

        res.json({ message: 'Incident manually confirmed by administrator', incident_id: id });
    } catch (err) {
        console.error('[Incidents] Confirm error:', err);
        res.status(500).json({ error: 'Failed to confirm incident' });
    }
};

exports.dismissIncident = (req, res) => {
    try {
        const { id } = req.params;
        const result = OutageService.closeIncident(id, 'dismissed');

        logAudit(req.user.user_id, 'DISMISS_INCIDENT', `Admin dismissed incident #${id} as false alarm`);

        res.json({ message: 'Incident dismissed as false alarm', result });
    } catch (err) {
        console.error('[Incidents] Dismiss error:', err);
        res.status(500).json({ error: err.message || 'Failed to dismiss incident' });
    }
};

exports.restoreIncident = (req, res) => {
    try {
        const { id } = req.params;
        const result = OutageService.closeIncident(id, 'restored');

        logAudit(req.user.user_id, 'RESTORE_INCIDENT', `Admin marked incident #${id} as restored`);

        res.json({ message: 'Incident marked restored', result });
    } catch (err) {
        console.error('[Incidents] Restore error:', err);
        res.status(500).json({ error: err.message || 'Failed to restore incident' });
    }
};
