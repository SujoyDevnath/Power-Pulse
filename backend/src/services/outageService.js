const db = require('../config/db');
const { calculateConfidenceScore } = require('./confidence');

class OutageService {
    /**
     * Process an incoming OFF report and recalculate location incident status
     */
    static processReport(locationId) {
        // Query recent valid OFF reports in the last 30 minutes for this location
        const reports = db.prepare(`
            SELECT r.*, u.reliability_score 
            FROM reports r
            JOIN users u ON r.user_id = u.user_id
            WHERE r.location_id = ? 
              AND r.type = 'OFF'
              AND r.reported_at >= datetime('now', '-30 minutes')
            ORDER BY r.reported_at ASC
        `).all(locationId);

        // Count duplicate and spam reports in the window
        const penalties = db.prepare(`
            SELECT 
                SUM(is_duplicate) as duplicateCount,
                SUM(is_spam) as spamCount
            FROM reports
            WHERE location_id = ?
              AND reported_at >= datetime('now', '-30 minutes')
        `).get(locationId);

        const evaluation = calculateConfidenceScore(reports, {
            duplicateCount: penalties.duplicateCount || 0,
            spamCount: penalties.spamCount || 0
        });

        // Check for existing active open incident in this location
        const existingIncident = db.prepare(`
            SELECT * FROM incidents 
            WHERE location_id = ? AND status = 'open'
        `).get(locationId);

        // Threshold: score >= 40 AND at least 2 unique users
        if (evaluation.score >= 40 && evaluation.breakdown.uniqueUsers >= 2) {
            if (existingIncident) {
                // Update existing incident confidence
                db.prepare(`
                    UPDATE incidents 
                    SET confidence_score = ?, classification = ?
                    WHERE incident_id = ?
                `).run(evaluation.score, evaluation.classification, existingIncident.incident_id);

                // Link unlinked reports to this incident
                db.prepare(`
                    UPDATE reports 
                    SET incident_id = ? 
                    WHERE location_id = ? AND incident_id IS NULL AND type = 'OFF'
                `).run(existingIncident.incident_id, locationId);

                return {
                    incidentId: existingIncident.incident_id,
                    action: 'updated',
                    ...evaluation
                };
            } else {
                // Check if this matches a scheduled planned outage
                const planned = db.prepare(`
                    SELECT * FROM planned_outages 
                    WHERE location_id = ? 
                      AND outage_date = date('now')
                      AND time('now') BETWEEN start_time AND end_time
                `).get(locationId);

                const incidentType = planned ? 'planned' : 'unexpected';
                const startTime = reports[0]?.reported_at || new Date().toISOString();

                const newIncident = db.prepare(`
                    INSERT INTO incidents (location_id, confidence_score, classification, type, status, start_time)
                    VALUES (?, ?, ?, ?, 'open', ?)
                `).run(locationId, evaluation.score, evaluation.classification, incidentType, startTime);

                const incidentId = newIncident.lastInsertRowid;

                // Link reports to newly formed incident
                db.prepare(`
                    UPDATE reports 
                    SET incident_id = ? 
                    WHERE location_id = ? AND incident_id IS NULL AND type = 'OFF'
                `).run(incidentId, locationId);

                return {
                    incidentId,
                    action: 'created',
                    ...evaluation
                };
            }
        }

        return {
            incidentId: existingIncident?.incident_id || null,
            action: 'evaluated',
            ...evaluation
        };
    }

    /**
     * Process an incoming BACK report (power restored)
     */
    static processBackReport(locationId) {
        const activeIncident = db.prepare(`
            SELECT * FROM incidents 
            WHERE location_id = ? AND status = 'open'
        `).get(locationId);

        if (!activeIncident) {
            return { restored: false, message: 'No active incident for this area' };
        }

        // Count unique users who sent BACK reports in the last 15 minutes
        const backReports = db.prepare(`
            SELECT COUNT(DISTINCT user_id) as count 
            FROM reports 
            WHERE location_id = ? 
              AND type = 'BACK' 
              AND reported_at >= datetime('now', '-15 minutes')
        `).get(locationId);

        // Auto-restore if at least 2 independent users report BACK
        if (backReports.count >= 2) {
            return this.closeIncident(activeIncident.incident_id, 'restored');
        }

        return {
            restored: false,
            backReportCount: backReports.count,
            required: 2,
            message: `Received ${backReports.count} of 2 required BACK reports to confirm restoration.`
        };
    }

    /**
     * Close an incident (Restored or Dismissed)
     */
    static closeIncident(incidentId, targetStatus = 'restored') {
        const incident = db.prepare('SELECT * FROM incidents WHERE incident_id = ?').get(incidentId);
        if (!incident) throw new Error('Incident not found');

        const now = new Date();
        const start = new Date(incident.start_time);
        const durationMinutes = Math.max(1, Math.round((now - start) / (1000 * 60)));

        db.prepare(`
            UPDATE incidents 
            SET status = ?, end_time = datetime('now'), duration_minutes = ?
            WHERE incident_id = ?
        `).run(targetStatus, durationMinutes, incidentId);

        // Update contributing reporters' reliability
        const contributingUsers = db.prepare(`
            SELECT DISTINCT user_id FROM reports WHERE incident_id = ?
        `).all(incidentId);

        const delta = targetStatus === 'restored' ? 0.02 : -0.05;
        const updateReliability = db.prepare(`
            UPDATE users 
            SET reliability_score = MAX(0.05, MIN(1.00, ROUND(reliability_score + ?, 2)))
            WHERE user_id = ?
        `);

        for (const u of contributingUsers) {
            updateReliability.run(delta, u.user_id);
        }

        return {
            incidentId,
            status: targetStatus,
            durationMinutes,
            reportersAdjusted: contributingUsers.length
        };
    }
}

module.exports = OutageService;
