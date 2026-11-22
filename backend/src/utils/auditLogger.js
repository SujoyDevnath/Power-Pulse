const db = require('../config/db');

function logAudit(userId, action, details) {
    try {
        const stmt = db.prepare(`
            INSERT INTO audit_logs (user_id, action, details)
            VALUES (?, ?, ?)
        `);
        stmt.run(userId || null, action, typeof details === 'object' ? JSON.stringify(details) : details);
    } catch (err) {
        console.error('[AuditLog] Failed to record audit log:', err.message);
    }
}

module.exports = logAudit;
