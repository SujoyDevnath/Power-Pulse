const jwt = require('jsonwebtoken');
const db = require('../config/db');

const JWT_SECRET = process.env.JWT_SECRET || 'powerpulse_super_secret_jwt_key_2026_cse_uftb';

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.startsWith('Bearer ') 
        ? authHeader.split(' ')[1] 
        : null;

    if (!token) {
        return res.status(401).json({ error: 'Access token required' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        
        // Fetch current user from database
        const user = db.prepare(`
            SELECT u.user_id, u.name, u.email, u.role, u.location_id, u.reliability_score,
                   t.technician_id, t.availability_status
            FROM users u
            LEFT JOIN technicians t ON u.user_id = t.user_id
            WHERE u.user_id = ?
        `).get(decoded.userId);

        if (!user) {
            return res.status(401).json({ error: 'User session invalid or user deleted' });
        }

        req.user = user;
        next();
    } catch (err) {
        return res.status(403).json({ error: 'Invalid or expired token' });
    }
}

module.exports = {
    authenticateToken,
    JWT_SECRET
};
