const db = require('../config/db');
const logAudit = require('../utils/auditLogger');
const { notifyLocationUsers } = require('../utils/notificationService');

exports.getPlannedOutages = (req, res) => {
    try {
        const { location_id } = req.query;
        let query = `
            SELECT p.*, l.district, l.area, l.zone
            FROM planned_outages p
            JOIN locations l ON p.location_id = l.location_id
            WHERE p.outage_date >= date('now')
        `;
        const params = [];

        if (location_id) {
            query += ' AND p.location_id = ?';
            params.push(location_id);
        }

        query += ' ORDER BY p.outage_date ASC, p.start_time ASC';
        const planned = db.prepare(query).all(...params);

        res.json({ planned });
    } catch (err) {
        console.error('[Planned] Fetch error:', err);
        res.status(500).json({ error: 'Failed to retrieve planned outages' });
    }
};

exports.createPlannedOutage = (req, res) => {
    try {
        const { location_id, outage_date, start_time, end_time, reason } = req.body;

        if (!location_id || !outage_date || !start_time || !end_time) {
            return res.status(400).json({ error: 'location_id, outage_date, start_time, and end_time are required' });
        }

        const stmt = db.prepare(`
            INSERT INTO planned_outages (location_id, outage_date, start_time, end_time, reason)
            VALUES (?, ?, ?, ?, ?)
        `);

        const result = stmt.run(location_id, outage_date, start_time, end_time, reason || 'Scheduled load-shedding / grid maintenance');
        const plannedId = result.lastInsertRowid;

        logAudit(req.user.user_id, 'CREATE_PLANNED_OUTAGE', `Admin scheduled planned outage #${plannedId} for location #${location_id}`);

        // Broadcast notification to all consumers in this location
        try {
            const loc = db.prepare('SELECT area, district, zone FROM locations WHERE location_id = ?').get(location_id);
            const locName = loc ? `${loc.area}, ${loc.district}` : 'your zone';
            notifyLocationUsers(
                location_id,
                '📅 Scheduled Load-Shedding',
                `Load-shedding scheduled for ${locName} on ${outage_date} from ${start_time} to ${end_time}. Reason: ${reason || 'Grid maintenance'}. Please plan accordingly.`
            );
        } catch (notifErr) {
            console.error('[Planned] Notification error:', notifErr.message);
        }

        res.status(201).json({
            message: 'Planned outage scheduled successfully',
            planned_id: plannedId
        });
    } catch (err) {
        console.error('[Planned] Create error:', err);
        res.status(500).json({ error: 'Failed to create planned outage' });
    }
};

exports.deletePlannedOutage = (req, res) => {
    try {
        const { id } = req.params;
        db.prepare('DELETE FROM planned_outages WHERE planned_id = ?').run(id);

        logAudit(req.user.user_id, 'DELETE_PLANNED_OUTAGE', `Admin removed planned outage #${id}`);

        res.json({ message: 'Planned outage removed successfully', planned_id: id });
    } catch (err) {
        console.error('[Planned] Delete error:', err);
        res.status(500).json({ error: 'Failed to delete planned outage' });
    }
};
