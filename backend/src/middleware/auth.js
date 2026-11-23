const jwt = require('jsonwebtoken');
const db = require('../config/db');

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET || 'powerpulse_super_secret_jwt_key_2026_cse_uftb';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'powerpulse_super_refresh_jwt_key_2026_cse_uftb';

const ACCESS_TOKEN_EXPIRY = '15m'; // 15 minutes short-lived access token
const REFRESH_TOKEN_EXPIRY = '7d';  // 7 days long-lived refresh token

async function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.startsWith('Bearer ') 
        ? authHeader.split(' ')[1] 
        : null;

    if (!token) {
        return res.status(401).json({ error: 'AccessTokenRequired', message: 'Access token required' });
    }

    try {
        // 1. Check if token has been revoked / blacklisted on logout
        const blacklisted = await db.prepare('SELECT id FROM blacklisted_tokens WHERE token = ?').get(token);
        if (blacklisted) {
            return res.status(401).json({ 
                error: 'TokenRevoked', 
                message: 'Session has been terminated. Please log in again.' 
            });
        }

        // 2. Verify token signature and expiration
        jwt.verify(token, JWT_ACCESS_SECRET, async (err, decoded) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    return res.status(401).json({ 
                        error: 'TokenExpired', 
                        message: 'Access token has expired. Please refresh your session.' 
                    });
                }
                return res.status(401).json({ 
                    error: 'InvalidToken', 
                    message: 'Access token signature is invalid.' 
                });
            }

            try {
                // 3. Fetch user state from database
                const user = await db.prepare(`
                    SELECT u.user_id, u.name, u.email, u.role, u.location_id, u.reliability_score,
                           t.technician_id, t.availability_status
                    FROM users u
                    LEFT JOIN technicians t ON u.user_id = t.user_id
                    WHERE u.user_id = ?
                `).get(decoded.userId);

                if (!user) {
                    return res.status(401).json({ 
                        error: 'UserNotFound', 
                        message: 'User account no longer exists or session is invalid.' 
                    });
                }

                req.user = user;
                req.token = token;
                req.tokenExp = decoded.exp;
                next();
            } catch (dbErr) {
                console.error('[AuthMiddleware Error]', dbErr);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    } catch (err) {
        console.error('[AuthMiddleware Error]', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    authenticateToken,
    JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET,
    ACCESS_TOKEN_EXPIRY,
    REFRESH_TOKEN_EXPIRY,
    JWT_SECRET: JWT_ACCESS_SECRET
};
