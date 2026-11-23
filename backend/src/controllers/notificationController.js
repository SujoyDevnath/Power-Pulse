const db = require('../config/db');

exports.getNotifications = async (req, res) => {
    try {
        const notifications = await db.prepare(`
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

exports.getUnreadCount = async (req, res) => {
    try {
        const result = await db.prepare(`
            SELECT COUNT(*) as unread_count 
            FROM notifications 
            WHERE user_id = ? AND is_read = 0
        `).get(req.user.user_id);

        res.json({ unread_count: result ? result.unread_count : 0 });
    } catch (err) {
        console.error('[Notifications] Count error:', err);
        res.status(500).json({ error: 'Failed to retrieve unread notification count' });
    }
};

exports.markAsRead = async (req, res) => {
    try {
        const { id } = req.params;
        await db.prepare(`
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

exports.markAllAsRead = async (req, res) => {
    try {
        await db.prepare(`
            UPDATE notifications 
            SET is_read = 1 
            WHERE user_id = ?
        `).run(req.user.user_id);

        res.json({ message: 'All notifications marked as read' });
    } catch (err) {
        console.error('[Notifications] Mark all read error:', err);
        res.status(500).json({ error: 'Failed to mark all notifications as read' });
    }
};
