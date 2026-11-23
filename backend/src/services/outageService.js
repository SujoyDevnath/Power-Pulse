/**
 * ⚡ Outage Lifecycle & Rules Engine (The Automated Dispatcher)
 * ============================================================================
 * Connected directly to Aiven Cloud MySQL via db wrapper
 * ============================================================================
 */
const db = require('../config/db');
const { calculateConfidenceScore } = require('./confidence');
const { notifyLocationUsers } = require('../utils/notificationService');

class OutageService {
    /**
     * Process an incoming OFF report and recalculate location incident status
     */
    static async processReport(locationId) {
        // Query recent valid OFF reports in the last 30 minutes for this location
        const reports = await db.prepare(`
            SELECT r.*, u.reliability_score 
            FROM reports r
            JOIN users u ON r.user_id = u.user_id
            WHERE r.location_id = ? 
              AND r.type = 'OFF'
              AND r.reported_at >= DATE_SUB(NOW(), INTERVAL 30 MINUTE)
            ORDER BY r.reported_at ASC
        `).all(locationId);

        // Count duplicate and spam reports in the window
        const penalties = await db.prepare(`
            SELECT 
                SUM(is_duplicate) as duplicateCount,
                SUM(is_spam) as spamCount
            FROM reports
            WHERE location_id = ?
              AND reported_at >= DATE_SUB(NOW(), INTERVAL 30 MINUTE)
        `).get(locationId);

        const evaluation = calculateConfidenceScore(reports, {
            duplicateCount: penalties?.duplicateCount || 0,
            spamCount: penalties?.spamCount || 0
        });

        // Check for existing active open incident in this location
        const existingIncident = await db.prepare(`
            SELECT * FROM incidents 
            WHERE location_id = ? AND status = 'open'
        `).get(locationId);

        // Threshold: score >= 20 OR at least 1 corroborating OFF report
        if (evaluation.score >= 20 || evaluation.breakdown.uniqueUsers >= 1) {
            if (existingIncident) {
                // Update existing incident confidence
                await db.prepare(`
                    UPDATE incidents 
                    SET confidence_score = ?, classification = ?
                    WHERE incident_id = ?
                `).run(evaluation.score, evaluation.classification, existingIncident.incident_id);

                // Link unlinked reports to this incident
                await db.prepare(`
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
                const planned = await db.prepare(`
                    SELECT * FROM planned_outages 
                    WHERE location_id = ? 
                      AND outage_date = CURDATE()
                      AND CURTIME() BETWEEN start_time AND end_time
                `).get(locationId);

                const incidentType = planned ? 'planned' : 'unexpected';
                const startTime = reports[0]?.reported_at || new Date().toISOString().slice(0, 19).replace('T', ' ');

                const newIncident = await db.prepare(`
                    INSERT INTO incidents (location_id, confidence_score, classification, type, status, start_time)
                    VALUES (?, ?, ?, ?, 'open', ?)
                `).run(locationId, evaluation.score, evaluation.classification, incidentType, startTime);

                const incidentId = newIncident.lastInsertRowid;

                // Link reports to newly formed incident
                await db.prepare(`
                    UPDATE reports 
                    SET incident_id = ? 
                    WHERE location_id = ? AND incident_id IS NULL AND type = 'OFF'
                `).run(incidentId, locationId);

                // Notify all consumers in this location about the power outage
                try {
                    const loc = await db.prepare('SELECT area, district, zone FROM locations WHERE location_id = ?').get(locationId);
                    const locName = loc ? `${loc.area}, ${loc.district}` : 'your zone';
                    await notifyLocationUsers(
                        locationId,
                        '⚠️ Power Outage Detected',
                        `Unscheduled power outage detected in ${locName}. Automated grid monitoring and field teams have been notified.`
                    );
                } catch (notifErr) {
                    console.error('[OutageService] Notification dispatch error:', notifErr.message);
                }

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
    static async processBackReport(locationId) {
        const activeIncident = await db.prepare(`
            SELECT * FROM incidents 
            WHERE location_id = ? AND status = 'open'
        `).get(locationId);

        if (!activeIncident) {
            return { restored: false, message: 'No active incident for this area' };
        }

        // Count unique users who sent BACK reports in the last 15 minutes
        const backReports = await db.prepare(`
            SELECT COUNT(DISTINCT user_id) as count 
            FROM reports 
            WHERE location_id = ? 
              AND type = 'BACK' 
              AND reported_at >= DATE_SUB(NOW(), INTERVAL 15 MINUTE)
        `).get(locationId);

        // Auto-restore if at least 1 verified user reports BACK
        if (backReports && backReports.count >= 1) {
            return await this.closeIncident(activeIncident.incident_id, 'restored');
        }

        return {
            restored: false,
            backReportCount: backReports ? backReports.count : 0,
            required: 2,
            message: `Received ${backReports ? backReports.count : 0} of 2 required BACK reports to confirm restoration.`
        };
    }

    /**
     * Close an incident (Restored or Dismissed)
     */
    static async closeIncident(incidentId, targetStatus = 'restored') {
        const incident = await db.prepare('SELECT * FROM incidents WHERE incident_id = ?').get(incidentId);
        if (!incident) throw new Error('Incident not found');

        const now = new Date();
        const start = new Date(incident.start_time);
        const durationMinutes = Math.max(1, Math.round((now - start) / (1000 * 60)));

        await db.prepare(`
            UPDATE incidents 
            SET status = ?, end_time = NOW(), duration_minutes = ?
            WHERE incident_id = ?
        `).run(targetStatus, durationMinutes, incidentId);

        // Update contributing reporters' reliability
        const contributingUsers = await db.prepare(`
            SELECT DISTINCT user_id FROM reports WHERE incident_id = ?
        `).all(incidentId);

        const delta = targetStatus === 'restored' ? 0.02 : -0.05;
        const updateReliability = db.prepare(`
            UPDATE users 
            SET reliability_score = MAX(0.05, MIN(1.00, ROUND(reliability_score + ?, 2)))
            WHERE user_id = ?
        `);

        for (const u of contributingUsers) {
            await updateReliability.run(delta, u.user_id);
        }

        // Notify location consumers that power is restored
        if (targetStatus === 'restored') {
            try {
                const loc = await db.prepare('SELECT area, district, zone FROM locations WHERE location_id = ?').get(incident.location_id);
                const locName = loc ? `${loc.area}, ${loc.district}` : 'your area';
                await notifyLocationUsers(
                    incident.location_id,
                    '💡 Power Restored',
                    `Electricity service has been restored in ${locName}. Outage duration: ${durationMinutes} minutes.`
                );
            } catch (notifErr) {
                console.error('[OutageService] Restoration notification dispatch error:', notifErr.message);
            }
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
