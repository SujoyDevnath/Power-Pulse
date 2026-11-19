const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const { JWT_SECRET } = require('../middleware/auth');
const logAudit = require('../utils/auditLogger');

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

        const token = jwt.sign({ userId, role: 'consumer' }, JWT_SECRET, { expiresIn: '24h' });

        logAudit(userId, 'USER_REGISTER', `New consumer registered: ${email}`);

        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: {
                user_id: userId,
                name: name.trim(),
                email: email.toLowerCase().trim(),
                role: 'consumer',
                location_id: location_id || null,
                reliability_score: 0.50
            }
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

        const token = jwt.sign(
            { userId: user.user_id, role: user.role, technicianId: user.technician_id },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        logAudit(user.user_id, 'USER_LOGIN', `User logged in with role: ${user.role}`);

        res.json({
            message: 'Login successful',
            token,
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
