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
async function generateTokens(user) {
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
    await db.prepare(`
        INSERT INTO refresh_tokens (user_id, token, expires_at)
        VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 7 DAY))
    `).run(user.user_id, refreshToken);

    return { accessToken, refreshToken };
}

exports.register = async (req, res) => {
    try {
        const { name, email, phone, password, location_id } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Name, email, and password are required' });
        }

        const existing = await db.prepare('SELECT user_id FROM users WHERE email = ?').get(email.toLowerCase().trim());
        if (existing) {
            return res.status(409).json({ error: 'An account with this email already exists' });
        }

        const password_hash = await bcrypt.hash(password, 10);
        const stmt = db.prepare(`
            INSERT INTO users (name, email, phone, password_hash, role, location_id, reliability_score)
            VALUES (?, ?, ?, ?, 'consumer', ?, 0.50)
        `);

        const result = await stmt.run(name.trim(), email.toLowerCase().trim(), phone || null, password_hash, location_id || null);
        const userId = result.lastInsertRowid;

        const userObj = {
            user_id: userId,
            name: name.trim(),
            email: email.toLowerCase().trim(),
            role: 'consumer',
            location_id: location_id || null,
            reliability_score: 0.50
        };

        const { accessToken, refreshToken } = await generateTokens(userObj);

        await logAudit(userId, 'USER_REGISTER', `New consumer registered: ${email}`);

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

        const user = await db.prepare(`
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

        const { accessToken, refreshToken } = await generateTokens(user);

        await logAudit(user.user_id, 'USER_LOGIN', `User logged in with role: ${user.role}`);

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
 */
exports.refreshToken = async (req, res) => {
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
        const storedToken = await db.prepare(`
            SELECT * FROM refresh_tokens 
            WHERE token = ? AND expires_at > NOW()
        `).get(refreshToken);

        if (!storedToken) {
            return res.status(401).json({ 
                error: 'RevokedRefreshToken', 
                message: 'Refresh token has been revoked or expired.' 
            });
        }

        // 3. Fetch user details
        const user = await db.prepare(`
            SELECT u.*, t.technician_id, t.availability_status 
            FROM users u 
            LEFT JOIN technicians t ON u.user_id = t.user_id 
            WHERE u.user_id = ?
        `).get(storedToken.user_id);

        if (!user) {
            return res.status(401).json({ error: 'UserNotFound', message: 'User account not found' });
        }

        // 4. Token Rotation: Delete old refresh token, generate fresh pair
        await db.prepare('DELETE FROM refresh_tokens WHERE token = ?').run(refreshToken);
        const tokens = await generateTokens(user);

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
 * 🚪 Secure Logout
 */
exports.logout = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        const currentAccessToken = req.token;
        const userId = req.user?.user_id;

        // 1. Blacklist current access token until its natural expiration
        if (currentAccessToken) {
            await db.prepare(`
                INSERT IGNORE INTO blacklisted_tokens (token, expires_at)
                VALUES (?, DATE_ADD(NOW(), INTERVAL 1 HOUR))
            `).run(currentAccessToken);
        }

        // 2. Delete specified or all user refresh tokens
        if (refreshToken) {
            await db.prepare('DELETE FROM refresh_tokens WHERE token = ?').run(refreshToken);
        } else if (userId) {
            await db.prepare('DELETE FROM refresh_tokens WHERE user_id = ?').run(userId);
        }

        // 3. Prune expired blacklisted and refresh tokens
        await db.prepare("DELETE FROM refresh_tokens WHERE expires_at < NOW()").run();
        await db.prepare("DELETE FROM blacklisted_tokens WHERE expires_at < NOW()").run();

        if (userId) {
            await logAudit(userId, 'USER_LOGOUT', `User logged out; tokens invalidated`);
        }

        res.json({ message: 'Session logged out successfully' });
    } catch (err) {
        console.error('[Auth] Logout error:', err);
        res.status(500).json({ error: 'Internal server error during logout' });
    }
};

exports.getMe = async (req, res) => {
    try {
        const loc = req.user.location_id 
            ? await db.prepare('SELECT district, area, zone FROM locations WHERE location_id = ?').get(req.user.location_id)
            : null;

        res.json({
            user: {
                ...req.user,
                location: loc
            }
        });
    } catch (err) {
        console.error('[Auth] getMe error:', err);
        res.status(500).json({ error: 'Failed to retrieve profile' });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const userId = req.user.user_id;
        const { name, phone, location_id, password } = req.body;

        if (!name && phone === undefined && location_id === undefined && !password) {
            return res.status(400).json({ error: 'Provide at least one profile field to update' });
        }

        let passwordHash = null;
        if (password) {
            if (password.length < 6) {
                return res.status(400).json({ error: 'Password must be at least 6 characters' });
            }
            passwordHash = await bcrypt.hash(password, 10);
        }

        const updates = [];
        const params = [];

        if (name && name.trim()) {
            updates.push('name = ?');
            params.push(name.trim());
        }
        if (phone !== undefined) {
            updates.push('phone = ?');
            params.push(phone ? phone.trim() : null);
        }
        if (location_id !== undefined) {
            updates.push('location_id = ?');
            params.push(location_id || null);
        }
        if (passwordHash) {
            updates.push('password_hash = ?');
            params.push(passwordHash);
        }

        params.push(userId);

        await db.prepare(`
            UPDATE users
            SET ${updates.join(', ')}
            WHERE user_id = ?
        `).run(...params);

        await logAudit(userId, 'USER_PROFILE_UPDATE', `User updated profile (${updates.map(u => u.split(' =')[0]).join(', ')})`);

        const updatedUser = await db.prepare(`
            SELECT u.user_id, u.name, u.email, u.phone, u.role, u.location_id, u.reliability_score,
                   t.technician_id, t.availability_status,
                   l.area, l.district, l.zone
            FROM users u
            LEFT JOIN technicians t ON u.user_id = t.user_id
            LEFT JOIN locations l ON u.location_id = l.location_id
            WHERE u.user_id = ?
        `).get(userId);

        res.json({
            message: 'Profile updated successfully',
            user: updatedUser
        });
    } catch (err) {
        console.error('[Auth] Update profile error:', err);
        res.status(500).json({ error: 'Failed to update profile' });
    }
};
