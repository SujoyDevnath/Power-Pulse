const db = require('../config/db');

exports.getNotifications = (req, res) => {
    try {
        const notifications = db.prepare(`
            SELECT * FROM notifications 
            WHERE user_id = ? 
            ORDER BY created_at DESC 
            LIMIT 30
        `).all(req.user.user_id);

        res.json({ notifications });
    } catch (err) {
        console.error('[Notifications] Get error:', err);
        res.status(500).json({ error: 'Failed to retrieve notifications' });
    }
};

exports.markAsRead = (req, res) => {
    try {
        const { id } = req.params;
        db.prepare(`
            UPDATE notifications 
            SET is_read = 1 
            WHERE notification_id = ? AND user_id = ?
        `).run(id, req.user.user_id);

        res.json({ message: 'Notification marked as read', notification_id: id });
    } catch (err) {
        console.error('[Notifications] Read error:', err);
        res.status(500).json({ error: 'Failed to update notification' });
    }
};

exports.markAllAsRead = (req, res) => {
    try {
        db.prepare(`
            UPDATE notifications 
            SET is_read = 1 
            WHERE user_id = ?
        `).run(req.user.user_id);

        res.json({ message: 'All notifications marked as read' });
    } catch (err) {
        console.error('[Notifications] Mark all read error:', err);
        res.status(500).json({ error: 'Failed to update notifications' });
    }
};
