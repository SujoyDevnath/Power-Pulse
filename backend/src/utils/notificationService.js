const db = require('../config/db');

/**
 * Send notification to a specific user
 */
function sendNotification(userId, title, message) {
    if (!userId) return;
    try {
        db.prepare(`
            INSERT INTO notifications (user_id, title, message, is_read, created_at)
            VALUES (?, ?, ?, 0, datetime('now'))
        `).run(userId, title, message);
    } catch (err) {
        console.error('[Notification] Failed to send to user:', err.message);
    }
}

/**
 * Broadcast notification to all consumers in a specific municipal location
 */
function notifyLocationUsers(locationId, title, message) {
    if (!locationId) return;
    try {
        const users = db.prepare(`
            SELECT user_id FROM users WHERE location_id = ? AND role = 'consumer'
        `).all(locationId);

        const insert = db.prepare(`
            INSERT INTO notifications (user_id, title, message, is_read, created_at)
            VALUES (?, ?, ?, 0, datetime('now'))
        `);

        const transaction = db.transaction((usersList) => {
            for (const u of usersList) {
                insert.run(u.user_id, title, message);
            }
        });

        transaction(users);
    } catch (err) {
        console.error('[Notification] Failed to broadcast to location:', err.message);
    }
}

module.exports = {
    sendNotification,
    notifyLocationUsers
};
