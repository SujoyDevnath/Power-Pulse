const db = require('../config/db');

/**
 * Send notification to a specific user
 */
async function sendNotification(userId, title, message) {
    if (!userId) return;
    try {
        await db.prepare(`
            INSERT INTO notifications (user_id, title, message, is_read, created_at)
            VALUES (?, ?, ?, 0, NOW())
        `).run(userId, title, message);
    } catch (err) {
        console.error('[Notification] Failed to send to user:', err.message);
    }
}

/**
 * Broadcast notification to all consumers in a specific municipal location
 */
async function notifyLocationUsers(locationId, title, message) {
    if (!locationId) return;
    try {
        const users = await db.prepare(`
            SELECT user_id FROM users WHERE location_id = ? AND role = 'consumer'
        `).all(locationId);

        for (const u of users) {
            await db.prepare(`
                INSERT INTO notifications (user_id, title, message, is_read, created_at)
                VALUES (?, ?, ?, 0, NOW())
            `).run(u.user_id, title, message);
        }
    } catch (err) {
        console.error('[Notification] Failed to broadcast to location:', err.message);
    }
}

module.exports = {
    sendNotification,
    notifyLocationUsers
};
