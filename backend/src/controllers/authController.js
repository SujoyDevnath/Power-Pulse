const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const db = require('../config/db');
const { 
    JWT_ACCESS_SECRET, 
    JWT_REFRESH_SECRET, 
    ACCESS_TOKEN_EXPIRY, 
    REFRESH_TOKEN_EXPIRY 
} = require('../middleware/auth');
const logAudit = require('../utils/auditLogger');

/**
 * Generate Access & Refresh Token pair with database persistence
 */
function generateTokens(user) {
    const payload = {
        userId: user.user_id,
        role: user.role,
        technicianId: user.technician_id || null,
        locationId: user.location_id || null,
        jti: crypto.randomUUID()
    };

    const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });
    const refreshToken = jwt.sign(
        { userId: user.user_id, type: 'refresh', jti: crypto.randomUUID() },
        JWT_REFRESH_SECRET, 
        { expiresIn: REFRESH_TOKEN_EXPIRY }
    );

    // Store refresh token in database (7 days validity)
    db.prepare(`
        INSERT INTO refresh_tokens (user_id, token, expires_at)
        VALUES (?, ?, datetime('now', '+7 days'))
    `).run(user.user_id, refreshToken);

    return { accessToken, refreshToken };
}

exports.register = async (req, res) => {
    try {
        const { name, email, phone, password, location_id } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Name, email, and password are required' });
        }

        const existing = db.prepare('SELECT user_id FROM users WHERE email = ?').get(email.toLowerCase().trim());
        if (existing) {
            return res.status(409).json({ error: 'An account with this email already exists' });
        }

        const password_hash = await bcrypt.hash(password, 10);
        const stmt = db.prepare(`
            INSERT INTO users (name, email, phone, password_hash, role, location_id, reliability_score)
            VALUES (?, ?, ?, ?, 'consumer', ?, 0.50)
        `);

        const result = stmt.run(name.trim(), email.toLowerCase().trim(), phone || null, password_hash, location_id || null);
        const userId = result.lastInsertRowid;

        const userObj = {
            user_id: userId,
            name: name.trim(),
            email: email.toLowerCase().trim(),
            role: 'consumer',
            location_id: location_id || null,
            reliability_score: 0.50
        };

        const { accessToken, refreshToken } = generateTokens(userObj);

        logAudit(userId, 'USER_REGISTER', `New consumer registered: ${email}`);

        res.status(201).json({
            message: 'User registered successfully',
            accessToken,
            refreshToken,
            token: accessToken, // Backwards compatibility for legacy frontends
            user: userObj
        });
    } catch (err) {
        console.error('[Auth] Register error:', err);
        res.status(500).json({ error: 'Internal server error during registration' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const user = db.prepare(`
            SELECT u.*, t.technician_id, t.availability_status, l.area, l.district, l.zone
            FROM users u
            LEFT JOIN technicians t ON u.user_id = t.user_id
            LEFT JOIN locations l ON u.location_id = l.location_id
            WHERE u.email = ?
        `).get(email.toLowerCase().trim());

        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const { accessToken, refreshToken } = generateTokens(user);

        logAudit(user.user_id, 'USER_LOGIN', `User logged in with role: ${user.role}`);

        res.json({
            message: 'Login successful',
            accessToken,
            refreshToken,
            token: accessToken, // Backwards compatibility
            user: {
                user_id: user.user_id,
                name: user.name,
                email: user.email,
                role: user.role,
                location_id: user.location_id,
                area: user.area,
                district: user.district,
                zone: user.zone,
                reliability_score: user.reliability_score,
                technician_id: user.technician_id || null,
                availability_status: user.availability_status || null
            }
        });
    } catch (err) {
        console.error('[Auth] Login error:', err);
        res.status(500).json({ error: 'Internal server error during login' });
    }
};

/**
 * 🔄 Silent Refresh Token Rotation
 * Generates a new short-lived Access Token and rotates Refresh Token
 */
exports.refreshToken = (req, res) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(400).json({ 
                error: 'RefreshTokenRequired', 
                message: 'Refresh token is required in request body' 
            });
        }

        // 1. Verify cryptographic signature of refresh token
        let decoded;
        try {
            decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
        } catch (jwtErr) {
            return res.status(401).json({ 
                error: 'InvalidRefreshToken', 
                message: 'Refresh token has expired or is invalid. Please log in again.' 
            });
        }

        // 2. Check if token exists and is valid in database
        const storedToken = db.prepare(`
            SELECT * FROM refresh_tokens 
            WHERE token = ? AND expires_at > datetime('now')
        `).get(refreshToken);

        if (!storedToken) {
            return res.status(401).json({ 
                error: 'RevokedRefreshToken', 
                message: 'Refresh token has been revoked or expired.' 
            });
        }

        // 3. Fetch user details
        const user = db.prepare(`
            SELECT u.*, t.technician_id, t.availability_status 
            FROM users u 
            LEFT JOIN technicians t ON u.user_id = t.user_id 
            WHERE u.user_id = ?
        `).get(storedToken.user_id);

        if (!user) {
            return res.status(401).json({ error: 'UserNotFound', message: 'User account not found' });
        }

        // 4. Token Rotation: Delete old refresh token, generate fresh pair
        db.prepare('DELETE FROM refresh_tokens WHERE token = ?').run(refreshToken);
        const tokens = generateTokens(user);

        res.json({
            message: 'Token refreshed successfully',
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
            token: tokens.accessToken
        });
    } catch (err) {
        console.error('[Auth] Refresh error:', err);
        res.status(500).json({ error: 'Internal server error during token refresh' });
    }
};

/**
 * 🚪 Secure Logout: Invalidate refresh token & blacklist current access token
 */
exports.logout = (req, res) => {
    try {
        const { refreshToken } = req.body;
        const currentAccessToken = req.token;
        const userId = req.user?.user_id;

        // 1. Blacklist current access token until its natural expiration
        if (currentAccessToken) {
            db.prepare(`
                INSERT OR IGNORE INTO blacklisted_tokens (token, expires_at)
                VALUES (?, datetime('now', '+1 hour'))
            `).run(currentAccessToken);
        }

        // 2. Delete specified or all user refresh tokens
        if (refreshToken) {
            db.prepare('DELETE FROM refresh_tokens WHERE token = ?').run(refreshToken);
        } else if (userId) {
            db.prepare('DELETE FROM refresh_tokens WHERE user_id = ?').run(userId);
        }

        // 3. Periodic housekeeping: prune expired blacklisted and refresh tokens
        db.prepare("DELETE FROM refresh_tokens WHERE expires_at < datetime('now')").run();
        db.prepare("DELETE FROM blacklisted_tokens WHERE expires_at < datetime('now')").run();

        if (userId) {
            logAudit(userId, 'USER_LOGOUT', `User logged out; tokens invalidated`);
        }

        res.json({ message: 'Session logged out successfully' });
    } catch (err) {
        console.error('[Auth] Logout error:', err);
        res.status(500).json({ error: 'Internal server error during logout' });
    }
};

exports.getMe = (req, res) => {
    const loc = req.user.location_id 
        ? db.prepare('SELECT district, area, zone FROM locations WHERE location_id = ?').get(req.user.location_id)
        : null;

    res.json({
        user: {
            ...req.user,
            location: loc
        }
    });
};
