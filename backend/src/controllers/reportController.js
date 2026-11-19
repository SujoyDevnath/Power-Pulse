const { v4: uuidv4 } = require('uuid');
const db = require('../config/db');
const OutageService = require('../services/outageService');
const logAudit = require('../utils/auditLogger');

exports.submitReport = (req, res) => {
    try {
        const { type, location_id, client_uuid } = req.body;
        const userId = req.user.user_id;

        if (!type || !['OFF', 'BACK'].includes(type.toUpperCase())) {
            return res.status(400).json({ error: "Report type must be either 'OFF' or 'BACK'" });
        }

        const reportLocationId = location_id || req.user.location_id;
        if (!reportLocationId) {
            return res.status(400).json({ error: 'Valid location_id required for reporting' });
        }

        const normalizedType = type.toUpperCase();
        let isDuplicate = 0;
        let isSpam = 0;

        // 1. Spam check: Has user submitted > 5 reports in the last 1 minute?
        const recentCount = db.prepare(`
            SELECT COUNT(*) as cnt 
            FROM reports 
            WHERE user_id = ? 
              AND received_at >= datetime('now', '-1 minute')
        `).get(userId).cnt;

        if (recentCount >= 5) {
            isSpam = 1;
            // Penalize spammer reliability
            db.prepare(`
                UPDATE users 
                SET reliability_score = MAX(0.05, ROUND(reliability_score - 0.10, 2)) 
                WHERE user_id = ?
            `).run(userId);
            logAudit(userId, 'SPAM_FLAGGED', `User exceeded 5 reports in 1 minute. Reliability penalized.`);
        }

        // 2. Duplicate check: Same user, same location, same type within last 10 minutes?
        if (!isSpam) {
            const duplicateCheck = db.prepare(`
                SELECT report_id 
                FROM reports 
                WHERE user_id = ? 
                  AND location_id = ? 
                  AND type = ? 
                  AND received_at >= datetime('now', '-10 minutes')
            `).get(userId, reportLocationId, normalizedType);

            if (duplicateCheck) {
                isDuplicate = 1;
            }
        }

        // 3. Insert report
        const reportUuid = client_uuid || uuidv4();
        const insertStmt = db.prepare(`
            INSERT INTO reports (user_id, location_id, type, reported_at, sync_status, is_duplicate, is_spam, client_uuid)
            VALUES (?, ?, ?, datetime('now'), 'synced', ?, ?, ?)
        `);

        const result = insertStmt.run(userId, reportLocationId, normalizedType, isDuplicate, isSpam, reportUuid);
        const reportId = result.lastInsertRowid;

        // 4. Trigger Outage Confidence Engine
        let evaluation = null;
        if (normalizedType === 'OFF' && !isSpam) {
            evaluation = OutageService.processReport(reportLocationId);
        } else if (normalizedType === 'BACK') {
            evaluation = OutageService.processBackReport(reportLocationId);
        }

        res.status(201).json({
            message: `Power ${normalizedType} report logged successfully`,
            reportId,
            isDuplicate: Boolean(isDuplicate),
            isSpam: Boolean(isSpam),
            evaluation
        });
    } catch (err) {
        console.error('[Report] Submission error:', err);
        res.status(500).json({ error: 'Failed to process outage report' });
    }
};

exports.getMyReports = (req, res) => {
    try {
        const reports = db.prepare(`
            SELECT r.*, l.area, l.district, l.zone, i.confidence_score, i.status as incident_status
            FROM reports r
            JOIN locations l ON r.location_id = l.location_id
            LEFT JOIN incidents i ON r.incident_id = i.incident_id
            WHERE r.user_id = ?
            ORDER BY r.reported_at DESC
            LIMIT 50
        `).all(req.user.user_id);

        res.json({ reports });
    } catch (err) {
        console.error('[Report] Get mine error:', err);
        res.status(500).json({ error: 'Failed to fetch your reports' });
    }
};

exports.getAllReports = (req, res) => {
    try {
        const { location_id, type, limit = 100 } = req.query;
        let query = `
            SELECT r.*, u.name as user_name, u.email as user_email, u.reliability_score,
                   l.area, l.district, l.zone
            FROM reports r
            JOIN users u ON r.user_id = u.user_id
            JOIN locations l ON r.location_id = l.location_id
            WHERE 1=1
        `;
        const params = [];

        if (location_id) {
            query += ' AND r.location_id = ?';
            params.push(location_id);
        }
        if (type) {
            query += ' AND r.type = ?';
            params.push(type.toUpperCase());
        }

        query += ' ORDER BY r.reported_at DESC LIMIT ?';
        params.push(parseInt(limit, 10));

        const reports = db.prepare(query).all(...params);
        res.json({ reports });
    } catch (err) {
        console.error('[Report] Get all error:', err);
        res.status(500).json({ error: 'Failed to retrieve reports' });
    }
};


exports.syncReports = (req, res) => {
    try {
        const { reports } = req.body;
        const userId = req.user.user_id;

        if (!Array.isArray(reports) || reports.length === 0) {
            return res.status(400).json({ error: 'reports array is required' });
        }

        const insertStmt = db.prepare(`
            INSERT OR IGNORE INTO reports (user_id, location_id, type, reported_at, sync_status, is_duplicate, is_spam, client_uuid)
            VALUES (?, ?, ?, ?, 'synced', 0, 0, ?)
        `);

        let insertedCount = 0;
        const locationsToEvaluate = new Set();

        for (const r of reports) {
            const locId = r.location_id || req.user.location_id;
            const repType = (r.type || 'OFF').toUpperCase();
            const repTime = r.reported_at || new Date().toISOString();
            const uuid = r.client_uuid || uuidv4();

            const result = insertStmt.run(userId, locId, repType, repTime, uuid);
            if (result.changes > 0) {
                insertedCount++;
                locationsToEvaluate.add(locId);
            }
        }

        for (const locId of locationsToEvaluate) {
            OutageService.processReport(locId);
        }

        res.json({
            message: `Synchronized ${insertedCount} offline reports successfully`,
            insertedCount,
            totalBatch: reports.length
        });
    } catch (err) {
        console.error('[Report] Sync error:', err);
        res.status(500).json({ error: 'Failed to sync offline reports' });
    }
};
