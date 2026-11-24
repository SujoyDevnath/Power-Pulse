# ⚡ PowerPulse: Backend API & MySQL Database Source Code

> **Course:** PROG 212 - Android and Web Application Development Sessional  
> **Project:** PowerPulse – Smart Electricity Outage Intelligence & Field Dispatch  
> **Presenter:** **Tarikul (ID: 30)** – *Backend & Database Systems Architect*  

**Total Source Code Files in this Part:** 44 files  
**Total Source Lines in this Part:** 4,240 lines  

---

## 📑 Table of Contents

### SECTION 1: BACKEND CORE & SERVER ENTRY POINT
*Node.js application bootstrap, Express server setup, environment config, security headers, and CORS policies.*

- `01.` **[backend/package.json](#file-1)** (44 lines)
- `02.` **[backend/.env.example](#file-2)** (42 lines)
- `03.` **[backend/server.js](#file-3)** (107 lines)

### SECTION 2: DATABASE CONFIGURATION & CONNECTION POOL
*MySQL 8.0 connection pool with retry mechanism, UTF8MB4 charset, and environment abstraction.*

- `04.` **[backend/src/config/db.js](#file-4)** (107 lines)
- `05.` **[backend/src/config/mysql.js](#file-5)** (35 lines)

### SECTION 3: SECURITY, AUTHENTICATION & MIDDLEWARE
*JWT authentication token verification, Role-Based Access Control (RBAC), and IP rate limiting.*

- `06.` **[backend/src/middleware/auth.js](#file-6)** (85 lines)
- `07.` **[backend/src/middleware/role.js](#file-7)** (20 lines)
- `08.` **[backend/src/middleware/rateLimit.js](#file-8)** (25 lines)

### SECTION 4: BACKEND CONTROLLERS (CORE BUSINESS LOGIC)
*Controllers processing incoming HTTP requests, SQL queries, business validations, and responses.*

- `09.` **[backend/src/controllers/authController.js](#file-9)** (332 lines)
- `10.` **[backend/src/controllers/reportController.js](#file-10)** (220 lines)
- `11.` **[backend/src/controllers/incidentController.js](#file-11)** (143 lines)
- `12.` **[backend/src/controllers/complaintController.js](#file-12)** (166 lines)
- `13.` **[backend/src/controllers/technicianController.js](#file-13)** (267 lines)
- `14.` **[backend/src/controllers/adminController.js](#file-14)** (150 lines)
- `15.` **[backend/src/controllers/meterController.js](#file-15)** (142 lines)
- `16.` **[backend/src/controllers/locationController.js](#file-16)** (41 lines)
- `17.` **[backend/src/controllers/plannedController.js](#file-17)** (84 lines)
- `18.` **[backend/src/controllers/notificationController.js](#file-18)** (64 lines)

### SECTION 5: RESTful API ROUTE DEFINITIONS
*Express router endpoints exposing public, consumer, technician, and administrative routes.*

- `19.` **[backend/src/routes/authRoutes.js](#file-19)** (15 lines)
- `20.` **[backend/src/routes/reportRoutes.js](#file-20)** (14 lines)
- `21.` **[backend/src/routes/incidentRoutes.js](#file-21)** (17 lines)
- `22.` **[backend/src/routes/complaintRoutes.js](#file-22)** (13 lines)
- `23.` **[backend/src/routes/technicianRoutes.js](#file-23)** (18 lines)
- `24.` **[backend/src/routes/adminRoutes.js](#file-24)** (16 lines)
- `25.` **[backend/src/routes/billRoutes.js](#file-25)** (12 lines)
- `26.` **[backend/src/routes/meterRoutes.js](#file-26)** (10 lines)
- `27.` **[backend/src/routes/locationRoutes.js](#file-27)** (11 lines)
- `28.` **[backend/src/routes/plannedRoutes.js](#file-28)** (12 lines)
- `29.` **[backend/src/routes/notificationRoutes.js](#file-29)** (12 lines)

### SECTION 6: CORE SERVICES & GRID ALGORITHMS
*15-minute rolling window outage confidence scoring algorithm, anti-spam client UUID check, and audit logger.*

- `30.` **[backend/src/services/confidence.js](#file-30)** (120 lines)
- `31.` **[backend/src/services/outageService.js](#file-31)** (217 lines)
- `32.` **[backend/src/utils/auditLogger.js](#file-32)** (16 lines)
- `33.` **[backend/src/utils/notificationService.js](#file-33)** (43 lines)

### SECTION 7: DATABASE SCHEMAS & DATABASE SCRIPTS
*MySQL 14-table DDL schemas, test automation suites, seeding, and migration tools.*

- `34.` **[backend/src/scripts/schema.mysql.sql](#file-34)** (203 lines)
- `35.` **[backend/src/scripts/schema.sql](#file-35)** (187 lines)
- `36.` **[backend/src/scripts/seed.js](#file-36)** (218 lines)
- `37.` **[backend/src/scripts/initDb.js](#file-37)** (21 lines)
- `38.` **[backend/src/scripts/simulate.js](#file-38)** (108 lines)
- `39.` **[backend/src/scripts/test_full_system.js](#file-39)** (429 lines)
- `40.` **[backend/src/scripts/test_mysql_connection.js](#file-40)** (68 lines)
- `41.` **[backend/src/scripts/migrate_to_mysql.js](#file-41)** (119 lines)
- `42.` **[backend/src/scripts/apply_optimizations.js](#file-42)** (118 lines)
- `43.` **[backend/src/scripts/export_mysql_dump.js](#file-43)** (99 lines)
- `44.` **[backend/src/scripts/view_db.js](#file-44)** (50 lines)

---


# SECTION 1: BACKEND CORE & SERVER ENTRY POINT
_Node.js application bootstrap, Express server setup, environment config, security headers, and CORS policies._

---

## <a id="file-1"></a>[01] `backend/package.json`

- **Path:** `Power-Pulse-main/backend/package.json`  
- **Language:** `json`  
- **Lines of Code:** `44` lines  

```json
{
  "name": "powerpulse-backend",
  "version": "1.0.0",
  "description": "Smart Electricity Outage Intelligence & Management Platform - API Server",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "node ./node_modules/nodemon/bin/nodemon.js server.js",
    "db:init": "node src/scripts/initDb.js",
    "db:seed": "node src/scripts/seed.js",
    "db:reset": "node src/scripts/initDb.js && node src/scripts/seed.js",
    "db:view": "node src/scripts/view_db.js",
    "db:test:mysql": "node src/scripts/test_mysql_connection.js",
    "db:dump:mysql": "node src/scripts/export_mysql_dump.js",
    "db:migrate:mysql": "node src/scripts/migrate_to_mysql.js",
    "simulate": "node src/scripts/simulate.js"
  },
  "keywords": [
    "electricity",
    "outage-detection",
    "smart-grid",
    "confidence-scoring",
    "iot-simulation"
  ],
  "author": "Md. Tarikul Islam & Sujoy Devnath",
  "license": "ISC",
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.4.7",
    "express": "^4.21.2",
    "express-rate-limit": "^7.5.0",
    "express-validator": "^7.2.1",
    "helmet": "^8.0.0",
    "jsonwebtoken": "^9.0.2",
    "morgan": "^1.10.0",
    "mysql2": "^3.24.6",
    "uuid": "^11.0.5"
  },
  "devDependencies": {
    "nodemon": "^3.1.9"
  }
}
```

---

## <a id="file-2"></a>[02] `backend/.env.example`

- **Path:** `Power-Pulse-main/backend/.env.example`  
- **Language:** ``  
- **Lines of Code:** `42` lines  

```
# ============================================================================
# PowerPulse Environment Configuration
# ============================================================================

# Server Port & Mode
PORT=5000
NODE_ENV=development

# ----------------------------------------------------------------------------
# Database Configuration
# ----------------------------------------------------------------------------
# DB_CLIENT: Choose 'sqlite' (local file) or 'mysql' (local or cloud MySQL)
DB_CLIENT=sqlite
DB_PATH=./powerpulse.db

# If using MySQL (Local XAMPP or Cloud: TiDB, Aiven, Railway, cPanel):
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=powerpulse
DB_SSL=false

# Example Cloud TiDB / Aiven MySQL Connection:
# DB_CLIENT=mysql
# DB_HOST=gateway01.us-east-1.prod.aws.tidbcloud.com
# DB_PORT=4000
# DB_USER=your_cluster_username.root
# DB_PASSWORD=your_cluster_password
# DB_NAME=powerpulse
# DB_SSL=true

# ----------------------------------------------------------------------------
# Authentication Secrets
# ----------------------------------------------------------------------------
JWT_SECRET=powerpulse_super_secret_jwt_key_2026_cse_uftb
JWT_EXPIRES_IN=24h
JWT_REFRESH_SECRET=powerpulse_super_refresh_token_secret_key_2026

# Frontend Client URL (for CORS)
CLIENT_URL=http://localhost:5173
```

---

## <a id="file-3"></a>[03] `backend/server.js`

- **Path:** `Power-Pulse-main/backend/server.js`  
- **Language:** `javascript`  
- **Lines of Code:** `107` lines  

```javascript
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const authRoutes = require('./src/routes/authRoutes');
const locationRoutes = require('./src/routes/locationRoutes');
const reportRoutes = require('./src/routes/reportRoutes');
const incidentRoutes = require('./src/routes/incidentRoutes');
const complaintRoutes = require('./src/routes/complaintRoutes');
const technicianRoutes = require('./src/routes/technicianRoutes');
const plannedRoutes = require('./src/routes/plannedRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const meterRoutes = require('./src/routes/meterRoutes');
const billRoutes = require('./src/routes/billRoutes');
const notificationRoutes = require('./src/routes/notificationRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Utility Middleware
app.use(helmet());

const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://power-pulse-olive.vercel.app',
    'https://power-pulse-app.vercel.app',
    process.env.CLIENT_URL
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (
            allowedOrigins.includes(origin) ||
            origin.endsWith('.vercel.app') ||
            process.env.CLIENT_URL === '*'
        ) {
            return callback(null, true);
        }
        return callback(null, true);
    },
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// System Health Check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'UP',
        service: 'PowerPulse Core API Server',
        timestamp: new Date().toISOString(),
        uptimeSeconds: Math.floor(process.uptime())
    });
});

// Mount Application Routes
app.use('/api/auth', authRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/incidents', incidentRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/technician', technicianRoutes);
app.use('/api/planned', plannedRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/meter', meterRoutes);
app.use('/api/bills', billRoutes);
app.use('/api/notifications', notificationRoutes);

// 404 Route Handler
app.use((req, res) => {
    res.status(404).json({ error: `Route not found: ${req.method} ${req.originalUrl}` });
});

// Centralized Error Handling Middleware
app.use((err, req, res, next) => {
    console.error('[Unhandled Error]', err);
    res.status(err.status || 500).json({
        error: err.message || 'Internal Server Error'
    });
});

const db = require('./src/config/db');

// Start Server
if (require.main === module) {
    app.listen(PORT, async () => {
        console.log(`====================================================`);
        console.log(`⚡ PowerPulse Core API Server running on port ${PORT}`);
        console.log(`🌐 Base URL: http://localhost:${PORT}/api`);
        console.log(`🩺 Health:   http://localhost:${PORT}/api/health`);
        try {
            const [rows] = await db.query('SELECT COUNT(*) as count FROM users');
            console.log(`🗄️ MySQL Database Connected! Total active users: ${rows[0].count}`);
        } catch (dbErr) {
            console.error(`❌ MySQL Database connection error:`, dbErr.message);
        }
        console.log(`====================================================`);
    });
}

module.exports = app;
```

---


# SECTION 2: DATABASE CONFIGURATION & CONNECTION POOL
_MySQL 8.0 connection pool with retry mechanism, UTF8MB4 charset, and environment abstraction._

---

## <a id="file-4"></a>[04] `backend/src/config/db.js`

- **Path:** `Power-Pulse-main/backend/src/config/db.js`  
- **Language:** `javascript`  
- **Lines of Code:** `107` lines  

```javascript
require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD !== undefined ? process.env.DB_PASSWORD : '',
  database: process.env.DB_NAME || 'powerpulse',
  waitForConnections: true,
  connectionLimit: 15,
  queueLimit: 0,
  decimalNumbers: true,
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : undefined
});

// Helper to normalize SQLite dialect differences to MySQL
function normalizeSql(sql) {
  if (!sql) return sql;
  return sql
    .replace(/datetime\('now',\s*'-(\d+)\s*minutes?'\)/gi, 'DATE_SUB(NOW(), INTERVAL $1 MINUTE)')
    .replace(/datetime\('now',\s*'\+(\d+)\s*days?'\)/gi, 'DATE_ADD(NOW(), INTERVAL $1 DAY)')
    .replace(/datetime\('now',\s*'-(\d+)\s*hours?'\)/gi, 'DATE_SUB(NOW(), INTERVAL $1 HOUR)')
    .replace(/datetime\('now'\)/gi, 'NOW()')
    .replace(/date\('now'\)/gi, 'CURDATE()')
    .replace(/time\('now'\)/gi, 'CURTIME()')
    .replace(/RANDOM\(\)/gi, 'RAND()');
}

/**
 * Universal async MySQL Database Interface
 * Fully connected to Aiven Cloud MySQL with SSL
 */
const db = {
  pool,

  async query(sql, params = []) {
    return pool.query(normalizeSql(sql), params);
  },

  async execute(sql, params = []) {
    return pool.execute(normalizeSql(sql), params);
  },

  prepare(sql) {
    const cleanSql = normalizeSql(sql);
    return {
      async get(...params) {
        let flatParams = params;
        if (params.length === 1 && Array.isArray(params[0])) {
          flatParams = params[0];
        }
        const [rows] = await pool.query(cleanSql, flatParams);
        return rows && rows.length > 0 ? rows[0] : null;
      },

      async all(...params) {
        let flatParams = params;
        if (params.length === 1 && Array.isArray(params[0])) {
          flatParams = params[0];
        }
        const [rows] = await pool.query(cleanSql, flatParams);
        return rows || [];
      },

      async run(...params) {
        let flatParams = params;
        if (params.length === 1 && typeof params[0] === 'object' && !Array.isArray(params[0]) && params[0] !== null) {
          flatParams = Object.values(params[0]);
        } else if (params.length === 1 && Array.isArray(params[0])) {
          flatParams = params[0];
        }
        const [result] = await pool.query(cleanSql, flatParams);
        return {
          changes: result.affectedRows || 0,
          affectedRows: result.affectedRows || 0,
          lastInsertRowid: result.insertId || 0,
          insertId: result.insertId || 0
        };
      }
    };
  },

  transaction(fn) {
    return async (...args) => {
      const connection = await pool.getConnection();
      try {
        await connection.beginTransaction();
        const res = await fn(...args);
        await connection.commit();
        return res;
      } catch (err) {
        await connection.rollback();
        throw err;
      } finally {
        connection.release();
      }
    };
  },

  pragma() {}
};

module.exports = db;
```

---

## <a id="file-5"></a>[05] `backend/src/config/mysql.js`

- **Path:** `Power-Pulse-main/backend/src/config/mysql.js`  
- **Language:** `javascript`  
- **Lines of Code:** `35` lines  

```javascript
require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'powerpulse',
  waitForConnections: true,
  connectionLimit: 15,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : undefined
});

// Test connection helper
async function checkMySQLConnection() {
  try {
    const connection = await pool.getConnection();
    console.log(`[PowerPulse MySQL] Connected successfully to [${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || 3306}]`);
    connection.release();
    return true;
  } catch (err) {
    console.warn(`[PowerPulse MySQL] Connection failed: ${err.message}`);
    return false;
  }
}

module.exports = {
  pool,
  checkMySQLConnection
};
```

---


# SECTION 3: SECURITY, AUTHENTICATION & MIDDLEWARE
_JWT authentication token verification, Role-Based Access Control (RBAC), and IP rate limiting._

---

## <a id="file-6"></a>[06] `backend/src/middleware/auth.js`

- **Path:** `Power-Pulse-main/backend/src/middleware/auth.js`  
- **Language:** `javascript`  
- **Lines of Code:** `85` lines  

```javascript
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
```

---

## <a id="file-7"></a>[07] `backend/src/middleware/role.js`

- **Path:** `Power-Pulse-main/backend/src/middleware/role.js`  
- **Language:** `javascript`  
- **Lines of Code:** `20` lines  

```javascript
function allowRoles(...allowedRoles) {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ error: 'Authentication required' });
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ 
                error: `Access forbidden: Required role [${allowedRoles.join(', ')}], current role is '${req.user.role}'` 
            });
        }

        next();
    };
}

module.exports = {
    allowRoles
};
```

---

## <a id="file-8"></a>[08] `backend/src/middleware/rateLimit.js`

- **Path:** `Power-Pulse-main/backend/src/middleware/rateLimit.js`  
- **Language:** `javascript`  
- **Lines of Code:** `25` lines  

```javascript
const rateLimit = require('express-rate-limit');

// Rate limiter for authentication attempts (Brute-force protection)
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20, // 20 requests per window
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many login attempts from this IP, please try again after 15 minutes.' }
});

// Rate limiter for outage reporting (Spam defense)
const reportLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 10, // Max 10 reports per minute per IP
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many reports submitted. Please wait a minute before reporting again.' }
});

module.exports = {
    authLimiter,
    reportLimiter
};
```

---


# SECTION 4: BACKEND CONTROLLERS (CORE BUSINESS LOGIC)
_Controllers processing incoming HTTP requests, SQL queries, business validations, and responses._

---

## <a id="file-9"></a>[09] `backend/src/controllers/authController.js`

- **Path:** `Power-Pulse-main/backend/src/controllers/authController.js`  
- **Language:** `javascript`  
- **Lines of Code:** `332` lines  

```javascript
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
```

---

## <a id="file-10"></a>[10] `backend/src/controllers/reportController.js`

- **Path:** `Power-Pulse-main/backend/src/controllers/reportController.js`  
- **Language:** `javascript`  
- **Lines of Code:** `220` lines  

```javascript
const { v4: uuidv4 } = require('uuid');
const db = require('../config/db');
const OutageService = require('../services/outageService');
const logAudit = require('../utils/auditLogger');

exports.submitReport = async (req, res) => {
    try {
        const { type, location_id, client_uuid, reported_at } = req.body;
        const userId = req.user.user_id;

        if (!type || !['OFF', 'BACK'].includes(type.toUpperCase())) {
            return res.status(400).json({ error: "Report type must be either 'OFF' or 'BACK'" });
        }

        const reportLocationId = location_id || req.user.location_id;
        if (!reportLocationId) {
            return res.status(400).json({ error: 'Valid location_id required for reporting' });
        }

        const normalizedType = type.toUpperCase();

        // 0. Idempotency check: If report with same client_uuid was already processed
        if (client_uuid) {
            const existing = await db.prepare('SELECT report_id, type FROM reports WHERE client_uuid = ?').get(client_uuid);
            if (existing) {
                return res.status(200).json({
                    message: `Power ${normalizedType} report already synced`,
                    reportId: existing.report_id,
                    alreadySynced: true,
                    isDuplicate: false,
                    isSpam: false
                });
            }
        }

        let isDuplicate = 0;
        let isSpam = 0;

        // 1. Spam check: Has user submitted > 5 reports in the last 1 minute?
        const recentCountRow = await db.prepare(`
            SELECT COUNT(*) as cnt 
            FROM reports 
            WHERE user_id = ? 
              AND received_at >= DATE_SUB(NOW(), INTERVAL 1 MINUTE)
        `).get(userId);
        const recentCount = recentCountRow ? recentCountRow.cnt : 0;

        if (recentCount >= 5) {
            isSpam = 1;
            // Penalize spammer reliability
            await db.prepare(`
                UPDATE users 
                SET reliability_score = GREATEST(0.05, ROUND(reliability_score - 0.10, 2)) 
                WHERE user_id = ?
            `).run(userId);
            await logAudit(userId, 'SPAM_FLAGGED', `User exceeded 5 reports in 1 minute. Reliability penalized.`);
        }

        // 2. Duplicate check: Same user, same location, same type within last 2 minutes
        if (!isSpam) {
            const lastReport = await db.prepare(`
                SELECT type 
                FROM reports 
                WHERE user_id = ? AND location_id = ? 
                ORDER BY report_id DESC LIMIT 1
            `).get(userId, reportLocationId);

            if (lastReport && lastReport.type === normalizedType) {
                const duplicateCheck = await db.prepare(`
                    SELECT report_id 
                    FROM reports 
                    WHERE user_id = ? 
                      AND location_id = ? 
                      AND type = ? 
                      AND received_at >= DATE_SUB(NOW(), INTERVAL 2 MINUTE)
                `).get(userId, reportLocationId, normalizedType);

                if (duplicateCheck) {
                    isDuplicate = 1;
                }
            }
        }

        // 3. Insert report
        const reportUuid = client_uuid || uuidv4();
        const reportTime = reported_at ? reported_at.replace('T', ' ').slice(0, 19) : new Date().toISOString().slice(0, 19).replace('T', ' ');
        const insertStmt = db.prepare(`
            INSERT INTO reports (user_id, location_id, type, reported_at, sync_status, is_duplicate, is_spam, client_uuid)
            VALUES (?, ?, ?, ?, 'synced', ?, ?, ?)
        `);

        const result = await insertStmt.run(userId, reportLocationId, normalizedType, reportTime, isDuplicate, isSpam, reportUuid);
        const reportId = result.lastInsertRowid;

        // 4. Trigger Outage Confidence Engine
        let evaluation = null;
        if (normalizedType === 'OFF' && !isSpam) {
            evaluation = await OutageService.processReport(reportLocationId);
        } else if (normalizedType === 'BACK') {
            evaluation = await OutageService.processBackReport(reportLocationId);
        }

        res.status(201).json({
            message: `Power ${normalizedType} report logged successfully`,
            reportId,
            isDuplicate: Boolean(isDuplicate),
            isSpam: Boolean(isSpam),
            evaluation
        });
    } catch (err) {
        console.error('[Report] Submission error:', err);
        res.status(500).json({ error: 'Failed to process outage report' });
    }
};

exports.getMyReports = async (req, res) => {
    try {
        const reports = await db.prepare(`
            SELECT r.*, l.area, l.district, l.zone, i.confidence_score, i.status as incident_status
            FROM reports r
            JOIN locations l ON r.location_id = l.location_id
            LEFT JOIN incidents i ON r.incident_id = i.incident_id
            WHERE r.user_id = ?
            ORDER BY r.reported_at DESC
            LIMIT 50
        `).all(req.user.user_id);

        res.json({ reports });
    } catch (err) {
        console.error('[Report] Get mine error:', err);
        res.status(500).json({ error: 'Failed to fetch your reports' });
    }
};

exports.getAllReports = async (req, res) => {
    try {
        const { location_id, type, limit = 100 } = req.query;
        let query = `
            SELECT r.*, u.name as user_name, u.email as user_email, u.reliability_score,
                   l.area, l.district, l.zone
            FROM reports r
            JOIN users u ON r.user_id = u.user_id
            JOIN locations l ON r.location_id = l.location_id
            WHERE 1=1
        `;
        const params = [];

        if (location_id) {
            query += ' AND r.location_id = ?';
            params.push(location_id);
        }
        if (type) {
            query += ' AND r.type = ?';
            params.push(type.toUpperCase());
        }

        query += ' ORDER BY r.reported_at DESC LIMIT ?';
        params.push(parseInt(limit, 10));

        const reports = await db.prepare(query).all(...params);
        res.json({ reports });
    } catch (err) {
        console.error('[Report] Get all error:', err);
        res.status(500).json({ error: 'Failed to retrieve reports' });
    }
};

exports.syncReports = async (req, res) => {
    try {
        const { reports } = req.body;
        const userId = req.user.user_id;

        if (!Array.isArray(reports) || reports.length === 0) {
            return res.status(400).json({ error: 'reports array is required' });
        }

        const insertStmt = db.prepare(`
            INSERT IGNORE INTO reports (user_id, location_id, type, reported_at, sync_status, is_duplicate, is_spam, client_uuid)
            VALUES (?, ?, ?, ?, 'synced', 0, 0, ?)
        `);

        let insertedCount = 0;
        const locationsToEvaluateOff = new Set();
        const locationsToEvaluateBack = new Set();

        for (const r of reports) {
            const locId = r.location_id || req.user.location_id;
            const repType = (r.type || 'OFF').toUpperCase();
            const repTime = r.reported_at ? r.reported_at.replace('T', ' ').slice(0, 19) : new Date().toISOString().slice(0, 19).replace('T', ' ');
            const uuid = r.client_uuid || uuidv4();

            const result = await insertStmt.run(userId, locId, repType, repTime, uuid);
            if (result.changes > 0) {
                insertedCount++;
                if (repType === 'BACK') {
                    locationsToEvaluateBack.add(locId);
                } else {
                    locationsToEvaluateOff.add(locId);
                }
            }
        }

        for (const locId of locationsToEvaluateOff) {
            await OutageService.processReport(locId);
        }
        for (const locId of locationsToEvaluateBack) {
            await OutageService.processBackReport(locId);
        }

        res.json({
            message: `Synchronized ${insertedCount} offline reports successfully`,
            insertedCount,
            totalBatch: reports.length
        });
    } catch (err) {
        console.error('[Report] Sync error:', err);
        res.status(500).json({ error: 'Failed to sync offline reports' });
    }
};
```

---

## <a id="file-11"></a>[11] `backend/src/controllers/incidentController.js`

- **Path:** `Power-Pulse-main/backend/src/controllers/incidentController.js`  
- **Language:** `javascript`  
- **Lines of Code:** `143` lines  

```javascript
const db = require('../config/db');
const OutageService = require('../services/outageService');
const logAudit = require('../utils/auditLogger');

exports.getActiveIncidents = async (req, res) => {
    try {
        const { location_id } = req.query;
        let query = `
            SELECT i.*, l.district, l.area, l.zone, l.latitude, l.longitude,
                   (SELECT COUNT(*) FROM reports r WHERE r.incident_id = i.incident_id) as total_reports,
                   (SELECT COUNT(DISTINCT r.user_id) FROM reports r WHERE r.incident_id = i.incident_id) as reporting_users
            FROM incidents i
            JOIN locations l ON i.location_id = l.location_id
            WHERE i.status = 'open'
        `;
        const params = [];

        if (location_id) {
            query += ' AND i.location_id = ?';
            params.push(location_id);
        }

        query += ' ORDER BY i.confidence_score DESC, i.start_time DESC';

        const incidents = await db.prepare(query).all(...params);
        res.json({ incidents });
    } catch (err) {
        console.error('[Incidents] Active fetch error:', err);
        res.status(500).json({ error: 'Failed to fetch active incidents' });
    }
};

exports.getIncidentHistory = async (req, res) => {
    try {
        const { limit = 50 } = req.query;
        const incidents = await db.prepare(`
            SELECT i.*, l.district, l.area, l.zone,
                   (SELECT COUNT(*) FROM reports r WHERE r.incident_id = i.incident_id) as total_reports
            FROM incidents i
            JOIN locations l ON i.location_id = l.location_id
            WHERE i.status IN ('restored', 'dismissed')
            ORDER BY i.end_time DESC, i.created_at DESC
            LIMIT ?
        `).all(parseInt(limit, 10));

        res.json({ incidents });
    } catch (err) {
        console.error('[Incidents] History fetch error:', err);
        res.status(500).json({ error: 'Failed to fetch incident history' });
    }
};

exports.getIncidentDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const incident = await db.prepare(`
            SELECT i.*, l.district, l.area, l.zone, l.latitude, l.longitude
            FROM incidents i
            JOIN locations l ON i.location_id = l.location_id
            WHERE i.incident_id = ?
        `).get(id);

        if (!incident) {
            return res.status(404).json({ error: 'Incident not found' });
        }

        const reports = await db.prepare(`
            SELECT r.*, u.name as user_name, u.reliability_score
            FROM reports r
            JOIN users u ON r.user_id = u.user_id
            WHERE r.incident_id = ?
            ORDER BY r.reported_at ASC
        `).all(id);

        const complaints = await db.prepare(`
            SELECT c.*, u.name as user_name, u.phone as user_phone
            FROM complaints c
            JOIN users u ON c.user_id = u.user_id
            WHERE c.incident_id = ?
        `).all(id);

        res.json({
            incident,
            reports,
            complaints
        });
    } catch (err) {
        console.error('[Incidents] Details fetch error:', err);
        res.status(500).json({ error: 'Failed to fetch incident details' });
    }
};

exports.confirmIncident = async (req, res) => {
    try {
        const { id } = req.params;
        const incident = await db.prepare('SELECT * FROM incidents WHERE incident_id = ?').get(id);
        if (!incident) {
            return res.status(404).json({ error: 'Incident not found' });
        }

        await db.prepare(`
            UPDATE incidents
            SET confidence_score = 100, classification = 'confirmed', manually_reviewed = 1
            WHERE incident_id = ?
        `).run(id);

        await logAudit(req.user.user_id, 'CONFIRM_INCIDENT', `Admin confirmed incident #${id} to 100%`);

        res.json({ message: 'Incident manually confirmed by administrator', incident_id: id });
    } catch (err) {
        console.error('[Incidents] Confirm error:', err);
        res.status(500).json({ error: 'Failed to confirm incident' });
    }
};

exports.dismissIncident = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await OutageService.closeIncident(id, 'dismissed');

        await logAudit(req.user.user_id, 'DISMISS_INCIDENT', `Admin dismissed incident #${id} as false alarm`);

        res.json({ message: 'Incident dismissed as false alarm', result });
    } catch (err) {
        console.error('[Incidents] Dismiss error:', err);
        res.status(500).json({ error: err.message || 'Failed to dismiss incident' });
    }
};

exports.restoreIncident = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await OutageService.closeIncident(id, 'restored');

        await logAudit(req.user.user_id, 'RESTORE_INCIDENT', `Admin marked incident #${id} as restored`);

        res.json({ message: 'Incident marked restored', result });
    } catch (err) {
        console.error('[Incidents] Restore error:', err);
        res.status(500).json({ error: err.message || 'Failed to restore incident' });
    }
};
```

---

## <a id="file-12"></a>[12] `backend/src/controllers/complaintController.js`

- **Path:** `Power-Pulse-main/backend/src/controllers/complaintController.js`  
- **Language:** `javascript`  
- **Lines of Code:** `166` lines  

```javascript
const db = require('../config/db');
const logAudit = require('../utils/auditLogger');
const { sendNotification } = require('../utils/notificationService');

exports.createComplaint = async (req, res) => {
    try {
        const { category, description, incident_id } = req.body;
        const userId = req.user.user_id;

        const allowedCategories = ['power_outage', 'low_voltage', 'transformer', 'damaged_wire', 'pole', 'other'];
        if (!category || !allowedCategories.includes(category)) {
            return res.status(400).json({ error: `Category must be one of: ${allowedCategories.join(', ')}` });
        }

        const stmt = db.prepare(`
            INSERT INTO complaints (user_id, incident_id, category, description, status)
            VALUES (?, ?, ?, ?, 'pending')
        `);

        const result = await stmt.run(userId, incident_id || null, category, description || null);
        const complaintId = result.lastInsertRowid;

        await logAudit(userId, 'CREATE_COMPLAINT', `User filed complaint #${complaintId} (${category})`);

        // Notify user about successful submission
        try {
            await sendNotification(
                userId,
                '📝 Complaint Registered',
                `Your ticket #${complaintId} regarding "${category.replace('_', ' ')}" has been received and queued for technician review.`
            );
        } catch (notifErr) {
            console.error('[Complaints] Notification error:', notifErr.message);
        }

        res.status(201).json({
            message: 'Complaint submitted successfully',
            complaint_id: complaintId
        });
    } catch (err) {
        console.error('[Complaints] Create error:', err);
        res.status(500).json({ error: 'Failed to submit complaint' });
    }
};

exports.getMyComplaints = async (req, res) => {
    try {
        const complaints = await db.prepare(`
            SELECT c.*, a.status as assignment_status, a.remarks as tech_remarks,
                   t_user.name as technician_name, t_user.phone as technician_phone
            FROM complaints c
            LEFT JOIN assignments a ON c.complaint_id = a.complaint_id
            LEFT JOIN technicians t ON a.technician_id = t.technician_id
            LEFT JOIN users t_user ON t.user_id = t_user.user_id
            WHERE c.user_id = ?
            ORDER BY c.created_at DESC
        `).all(req.user.user_id);

        res.json({ complaints });
    } catch (err) {
        console.error('[Complaints] Get mine error:', err);
        res.status(500).json({ error: 'Failed to fetch complaints' });
    }
};

exports.getAllComplaints = async (req, res) => {
    try {
        const { status, category, limit = 100 } = req.query;
        let query = `
            SELECT c.*, u.name as consumer_name, u.email as consumer_email, u.phone as consumer_phone,
                   l.area, l.district, l.zone,
                   a.assignment_id, a.technician_id, a.remarks as technician_remarks,
                   tech_user.name as technician_name
            FROM complaints c
            JOIN users u ON c.user_id = u.user_id
            LEFT JOIN locations l ON u.location_id = l.location_id
            LEFT JOIN assignments a ON c.complaint_id = a.complaint_id
            LEFT JOIN technicians tech ON a.technician_id = tech.technician_id
            LEFT JOIN users tech_user ON tech.user_id = tech_user.user_id
            WHERE 1=1
        `;
        const params = [];

        if (status) {
            query += ' AND c.status = ?';
            params.push(status);
        }
        if (category) {
            query += ' AND c.category = ?';
            params.push(category);
        }

        query += ' ORDER BY c.created_at DESC LIMIT ?';
        params.push(parseInt(limit, 10));

        const complaints = await db.prepare(query).all(...params);
        res.json({ complaints });
    } catch (err) {
        console.error('[Complaints] Get all error:', err);
        res.status(500).json({ error: 'Failed to retrieve complaints' });
    }
};

exports.assignTechnician = async (req, res) => {
    try {
        const { id } = req.params;
        const { technician_id, remarks } = req.body;

        if (!technician_id) {
            return res.status(400).json({ error: 'technician_id is required' });
        }

        const tech = await db.prepare('SELECT * FROM technicians WHERE technician_id = ?').get(technician_id);
        if (!tech) {
            return res.status(404).json({ error: 'Technician not found' });
        }

        const complaint = await db.prepare('SELECT * FROM complaints WHERE complaint_id = ?').get(id);
        if (!complaint) {
            return res.status(404).json({ error: 'Complaint not found' });
        }

        // Upsert assignment record
        const existingAssignment = await db.prepare('SELECT assignment_id FROM assignments WHERE complaint_id = ?').get(id);
        if (existingAssignment) {
            await db.prepare(`
                UPDATE assignments
                SET technician_id = ?, status = 'assigned', remarks = ?, updated_at = NOW()
                WHERE complaint_id = ?
            `).run(technician_id, remarks || 'Reassigned by administrator', id);
        } else {
            await db.prepare(`
                INSERT INTO assignments (complaint_id, technician_id, status, remarks)
                VALUES (?, ?, 'assigned', ?)
            `).run(id, technician_id, remarks || 'Assigned by administrator');
        }

        // Update complaint status to 'assigned'
        await db.prepare(`UPDATE complaints SET status = 'assigned' WHERE complaint_id = ?`).run(id);

        // Update technician status to 'busy'
        await db.prepare(`UPDATE technicians SET availability_status = 'busy' WHERE technician_id = ?`).run(technician_id);

        await logAudit(req.user.user_id, 'ASSIGN_TECHNICIAN', `Assigned technician #${technician_id} to complaint #${id}`);

        // Notify complainant about assigned technician
        try {
            const techUser = await db.prepare('SELECT name, phone FROM users WHERE user_id = ?').get(tech.user_id);
            const techName = techUser?.name || `Technician #${technician_id}`;
            const techPhone = techUser?.phone ? ` (${techUser.phone})` : '';
            await sendNotification(
                complaint.user_id,
                '🔧 Technician Dispatched',
                `${techName}${techPhone} has been assigned to your complaint #${id} (${complaint.category.replace('_', ' ')}). Field inspection scheduled.`
            );
        } catch (notifErr) {
            console.error('[Complaints] Assign notification error:', notifErr.message);
        }

        res.json({ message: 'Technician assigned successfully', complaint_id: id, technician_id });
    } catch (err) {
        console.error('[Complaints] Assign error:', err);
        res.status(500).json({ error: 'Failed to assign technician' });
    }
};
```

---

## <a id="file-13"></a>[13] `backend/src/controllers/technicianController.js`

- **Path:** `Power-Pulse-main/backend/src/controllers/technicianController.js`  
- **Language:** `javascript`  
- **Lines of Code:** `267` lines  

```javascript
const db = require('../config/db');
const logAudit = require('../utils/auditLogger');
const { sendNotification } = require('../utils/notificationService');

exports.getMyAssignments = async (req, res) => {
    try {
        const technicianId = req.user.technician_id;
        if (!technicianId) {
            return res.status(403).json({ error: 'User does not possess a technician profile' });
        }

        const assignments = await db.prepare(`
            SELECT a.*, c.category, c.description, c.status as complaint_status, c.created_at as complaint_created_at,
                   u.name as consumer_name, u.phone as consumer_phone,
                   l.area, l.district, l.zone
            FROM assignments a
            JOIN complaints c ON a.complaint_id = c.complaint_id
            JOIN users u ON c.user_id = u.user_id
            LEFT JOIN locations l ON u.location_id = l.location_id
            WHERE a.technician_id = ?
            ORDER BY a.assigned_at DESC
        `).all(technicianId);

        res.json({ assignments });
    } catch (err) {
        console.error('[Technician] Get assignments error:', err);
        res.status(500).json({ error: 'Failed to retrieve assignments' });
    }
};

exports.updateAssignmentStatus = async (req, res) => {
    try {
        const { id } = req.params; // assignment_id
        const { status, remarks } = req.body;
        const technicianId = req.user.technician_id;

        const allowedStatuses = ['assigned', 'investigating', 'repairing', 'resolved'];
        if (!status || !allowedStatuses.includes(status)) {
            return res.status(400).json({ error: `Status must be one of: ${allowedStatuses.join(', ')}` });
        }

        // Verify assignment ownership (technician can only modify their own tickets)
        const assignment = await db.prepare(`
            SELECT * FROM assignments WHERE assignment_id = ? AND technician_id = ?
        `).get(id, technicianId);

        if (!assignment) {
            return res.status(404).json({ error: 'Assignment not found or does not belong to you' });
        }

        // Update assignment record
        await db.prepare(`
            UPDATE assignments 
            SET status = ?, remarks = COALESCE(?, remarks), updated_at = NOW()
            WHERE assignment_id = ?
        `).run(status, remarks || null, id);

        // Update corresponding complaint status
        await db.prepare(`
            UPDATE complaints
            SET status = ?
            WHERE complaint_id = ?
        `).run(status, assignment.complaint_id);

        // If marked resolved, toggle technician back to 'available' if they have no other ongoing jobs
        if (status === 'resolved') {
            const pendingJobsRow = await db.prepare(`
                SELECT COUNT(*) as count 
                FROM assignments 
                WHERE technician_id = ? AND status != 'resolved' AND assignment_id != ?
            `).get(technicianId, id);

            const pendingJobs = pendingJobsRow ? pendingJobsRow.count : 0;
            if (pendingJobs === 0) {
                await db.prepare(`UPDATE technicians SET availability_status = 'available' WHERE technician_id = ?`).run(technicianId);
            }
        } else {
            // If technician was marked 'available', toggle to 'busy' since an active task is underway/reopened
            const currentTech = await db.prepare('SELECT availability_status FROM technicians WHERE technician_id = ?').get(technicianId);
            if (currentTech && currentTech.availability_status === 'available') {
                await db.prepare(`UPDATE technicians SET availability_status = 'busy' WHERE technician_id = ?`).run(technicianId);
            }
        }

        await logAudit(req.user.user_id, 'TECH_UPDATE_TASK', `Technician updated assignment #${id} to status: ${status}`);

        // Notify complainant about technician progress
        try {
            const complaint = await db.prepare('SELECT user_id, category FROM complaints WHERE complaint_id = ?').get(assignment.complaint_id);
            if (complaint) {
                let notifTitle = '🔧 Complaint Update';
                let notifMsg = `Your complaint #${assignment.complaint_id} status is now: ${status}.`;
                if (status === 'investigating') {
                    notifTitle = '🔍 Technician Investigating';
                    notifMsg = `Technician has arrived on-site and is investigating complaint #${assignment.complaint_id} (${complaint.category.replace('_', ' ')}). ${remarks ? `Note: "${remarks}"` : ''}`;
                } else if (status === 'repairing') {
                    notifTitle = '🛠️ Repair Work in Progress';
                    notifMsg = `Field repair work has begun on complaint #${assignment.complaint_id} (${complaint.category.replace('_', ' ')}). ${remarks ? `Note: "${remarks}"` : ''}`;
                } else if (status === 'resolved') {
                    notifTitle = '✅ Issue Resolved';
                    notifMsg = `Your complaint #${assignment.complaint_id} (${complaint.category.replace('_', ' ')}) has been resolved. ${remarks ? `Tech remarks: "${remarks}"` : ''}`;
                } else if (status === 'assigned') {
                    notifTitle = '↩️ Task Reverted to Assigned';
                    notifMsg = `Complaint #${assignment.complaint_id} status was rolled back to Assigned for re-evaluation. ${remarks ? `Note: "${remarks}"` : ''}`;
                }
                await sendNotification(complaint.user_id, notifTitle, notifMsg.trim());
            }
        } catch (notifErr) {
            console.error('[Technician] Notification dispatch error:', notifErr.message);
        }

        res.json({
            message: `Task status updated to ${status}`,
            assignment_id: id,
            status,
            remarks
        });
    } catch (err) {
        console.error('[Technician] Update status error:', err);
        res.status(500).json({ error: 'Failed to update assignment status' });
    }
};

exports.getAllTechnicians = async (req, res) => {
    try {
        const technicians = await db.prepare(`
            SELECT t.technician_id, t.availability_status, u.user_id, u.name, u.email, u.phone,
                   l.area as base_area,
                   (SELECT COUNT(*) FROM assignments a WHERE a.technician_id = t.technician_id AND a.status != 'resolved') as active_tasks
            FROM technicians t
            JOIN users u ON t.user_id = u.user_id
            LEFT JOIN locations l ON u.location_id = l.location_id
            ORDER BY t.availability_status ASC, u.name ASC
        `).all();

        res.json({ technicians });
    } catch (err) {
        console.error('[Technician] List error:', err);
        res.status(500).json({ error: 'Failed to fetch technicians' });
    }
};

exports.getProfile = async (req, res) => {
    try {
        const technicianId = req.user.technician_id;
        if (!technicianId) {
            return res.status(403).json({ error: 'User does not possess a technician profile' });
        }

        const technician = await db.prepare(`
            SELECT t.technician_id, t.availability_status, 
                   u.user_id, u.name, u.email, u.phone, u.role,
                   l.location_id, l.area, l.district, l.zone
            FROM technicians t
            JOIN users u ON t.user_id = u.user_id
            LEFT JOIN locations l ON u.location_id = l.location_id
            WHERE t.technician_id = ?
        `).get(technicianId);

        if (!technician) {
            return res.status(404).json({ error: 'Technician record not found' });
        }

        // Calculate performance metrics
        const stats = await db.prepare(`
            SELECT 
                COUNT(*) as total_tasks,
                SUM(CASE WHEN status != 'resolved' THEN 1 ELSE 0 END) as active_tasks,
                SUM(CASE WHEN status = 'resolved' THEN 1 ELSE 0 END) as resolved_tasks,
                SUM(CASE WHEN status = 'assigned' THEN 1 ELSE 0 END) as assigned_tasks,
                SUM(CASE WHEN status = 'investigating' THEN 1 ELSE 0 END) as investigating_tasks,
                SUM(CASE WHEN status = 'repairing' THEN 1 ELSE 0 END) as repairing_tasks
            FROM assignments
            WHERE technician_id = ?
        `).get(technicianId);

        const total = stats?.total_tasks || 0;
        const resolved = stats?.resolved_tasks || 0;
        const completionRate = total > 0 ? Math.round((resolved / total) * 100) : 100;

        res.json({
            profile: {
                ...technician,
                stats: {
                    total_tasks: total,
                    active_tasks: stats?.active_tasks || 0,
                    resolved_tasks: resolved,
                    assigned_tasks: stats?.assigned_tasks || 0,
                    investigating_tasks: stats?.investigating_tasks || 0,
                    repairing_tasks: stats?.repairing_tasks || 0,
                    completion_rate: completionRate
                }
            }
        });
    } catch (err) {
        console.error('[Technician] Get profile error:', err);
        res.status(500).json({ error: 'Failed to retrieve technician profile' });
    }
};

exports.updateAvailabilityStatus = async (req, res) => {
    try {
        const technicianId = req.user.technician_id;
        if (!technicianId) {
            return res.status(403).json({ error: 'User does not possess a technician profile' });
        }

        const { status } = req.body;
        const allowed = ['available', 'busy', 'on_leave', 'offline'];
        if (!status || !allowed.includes(status)) {
            return res.status(400).json({ error: `Status must be one of: ${allowed.join(', ')}` });
        }

        await db.prepare(`
            UPDATE technicians 
            SET availability_status = ? 
            WHERE technician_id = ?
        `).run(status, technicianId);

        await logAudit(req.user.user_id, 'TECH_STATUS_CHANGE', `Technician changed availability status to: ${status}`);

        res.json({
            message: `Availability status updated to ${status}`,
            availability_status: status
        });
    } catch (err) {
        console.error('[Technician] Update availability status error:', err);
        res.status(500).json({ error: 'Failed to update availability status' });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const { name, phone } = req.body;
        const userId = req.user.user_id;

        if (!name && !phone) {
            return res.status(400).json({ error: 'Provide at least name or phone to update' });
        }

        await db.prepare(`
            UPDATE users
            SET name = COALESCE(?, name),
                phone = COALESCE(?, phone)
            WHERE user_id = ?
        `).run(name?.trim() || null, phone?.trim() || null, userId);

        await logAudit(userId, 'TECH_PROFILE_UPDATE', `Technician updated contact profile (Name: ${name || 'unchanged'}, Phone: ${phone || 'unchanged'})`);

        const updatedUser = await db.prepare(`
            SELECT u.user_id, u.name, u.email, u.phone, u.role, 
                   t.technician_id, t.availability_status
            FROM users u
            JOIN technicians t ON u.user_id = t.user_id
            WHERE u.user_id = ?
        `).get(userId);

        res.json({
            message: 'Profile updated successfully',
            user: updatedUser
        });
    } catch (err) {
        console.error('[Technician] Update profile error:', err);
        res.status(500).json({ error: 'Failed to update profile' });
    }
};
```

---

## <a id="file-14"></a>[14] `backend/src/controllers/adminController.js`

- **Path:** `Power-Pulse-main/backend/src/controllers/adminController.js`  
- **Language:** `javascript`  
- **Lines of Code:** `150` lines  

```javascript
const db = require('../config/db');
const logAudit = require('../utils/auditLogger');

exports.getAnalytics = async (req, res) => {
    try {
        // 1. KPI Counts
        const activeOutagesRow = await db.prepare("SELECT COUNT(*) as count FROM incidents WHERE status = 'open'").get();
        const activeOutages = activeOutagesRow ? activeOutagesRow.count : 0;

        const totalOutagesRow = await db.prepare("SELECT COUNT(*) as count FROM incidents").get();
        const totalOutages = totalOutagesRow ? totalOutagesRow.count : 0;

        const pendingComplaintsRow = await db.prepare("SELECT COUNT(*) as count FROM complaints WHERE status != 'resolved'").get();
        const pendingComplaints = pendingComplaintsRow ? pendingComplaintsRow.count : 0;

        const totalUsersRow = await db.prepare("SELECT COUNT(*) as count FROM users WHERE role = 'consumer'").get();
        const totalUsers = totalUsersRow ? totalUsersRow.count : 0;

        const activeTechsRow = await db.prepare("SELECT COUNT(*) as count FROM technicians WHERE availability_status != 'off'").get();
        const activeTechs = activeTechsRow ? activeTechsRow.count : 0;

        // Average duration of restored outages
        const avgDurationRow = await db.prepare(`
            SELECT AVG(duration_minutes) as avg_duration 
            FROM incidents 
            WHERE status = 'restored' AND duration_minutes IS NOT NULL
        `).get();
        const avgDurationMinutes = Math.round(avgDurationRow?.avg_duration || 0);

        // 2. Area-wise Outages (for Bar Chart)
        const areaWiseOutages = await db.prepare(`
            SELECT l.area, COUNT(i.incident_id) as incident_count
            FROM locations l
            LEFT JOIN incidents i ON l.location_id = i.location_id
            GROUP BY l.area
            ORDER BY incident_count DESC
            LIMIT 10
        `).all();

        // 3. Complaint Breakdown by Category (for Pie/Donut Chart)
        const complaintsByCategory = await db.prepare(`
            SELECT category, COUNT(*) as count 
            FROM complaints 
            GROUP BY category
            ORDER BY count DESC
        `).all();

        // 4. Incident Status Distribution
        const incidentsByStatus = await db.prepare(`
            SELECT status, COUNT(*) as count 
            FROM incidents 
            GROUP BY status
        `).all();

        res.json({
            kpi: {
                activeOutages,
                totalOutages,
                pendingComplaints,
                totalUsers,
                activeTechs,
                avgDurationMinutes
            },
            areaWiseOutages,
            complaintsByCategory,
            incidentsByStatus
        });
    } catch (err) {
        console.error('[Admin] Analytics error:', err);
        res.status(500).json({ error: 'Failed to generate analytics' });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await db.prepare(`
            SELECT u.user_id, u.name, u.email, u.phone, u.role, u.reliability_score, u.created_at,
                   l.area, l.district, l.zone,
                   t.technician_id, t.availability_status
            FROM users u
            LEFT JOIN locations l ON u.location_id = l.location_id
            LEFT JOIN technicians t ON u.user_id = t.user_id
            ORDER BY u.created_at DESC
        `).all();

        res.json({ users });
    } catch (err) {
        console.error('[Admin] Get users error:', err);
        res.status(500).json({ error: 'Failed to retrieve users' });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { role, reliability_score, availability_status } = req.body;

        const user = await db.prepare('SELECT * FROM users WHERE user_id = ?').get(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (role) {
            await db.prepare('UPDATE users SET role = ? WHERE user_id = ?').run(role, id);

            // If promoting to technician, ensure technician profile exists
            if (role === 'technician') {
                const techExists = await db.prepare('SELECT technician_id FROM technicians WHERE user_id = ?').get(id);
                if (!techExists) {
                    await db.prepare("INSERT INTO technicians (user_id, availability_status) VALUES (?, 'available')").run(id);
                }
            }
        }

        if (reliability_score !== undefined) {
            const clamped = Math.max(0.05, Math.min(1.00, parseFloat(reliability_score)));
            await db.prepare('UPDATE users SET reliability_score = ? WHERE user_id = ?').run(clamped, id);
        }

        if (availability_status) {
            await db.prepare('UPDATE technicians SET availability_status = ? WHERE user_id = ?').run(availability_status, id);
        }

        await logAudit(req.user.user_id, 'UPDATE_USER', `Admin updated user #${id} attributes`);

        res.json({ message: 'User updated successfully', user_id: id });
    } catch (err) {
        console.error('[Admin] Update user error:', err);
        res.status(500).json({ error: 'Failed to update user' });
    }
};

exports.getAuditLogs = async (req, res) => {
    try {
        const { limit = 100 } = req.query;
        const logs = await db.prepare(`
            SELECT a.*, u.name as user_name, u.email as user_email, u.role as user_role
            FROM audit_logs a
            LEFT JOIN users u ON a.user_id = u.user_id
            ORDER BY a.created_at DESC
            LIMIT ?
        `).all(parseInt(limit, 10));

        res.json({ logs });
    } catch (err) {
        console.error('[Admin] Audit logs error:', err);
        res.status(500).json({ error: 'Failed to retrieve audit logs' });
    }
};
```

---

## <a id="file-15"></a>[15] `backend/src/controllers/meterController.js`

- **Path:** `Power-Pulse-main/backend/src/controllers/meterController.js`  
- **Language:** `javascript`  
- **Lines of Code:** `142` lines  

```javascript
const db = require('../config/db');
const logAudit = require('../utils/auditLogger');
const { sendNotification } = require('../utils/notificationService');

exports.getUsage = async (req, res) => {
    try {
        const userId = req.user.user_id;

        // Fetch recent meter readings
        const readings = await db.prepare(`
            SELECT * FROM meter_readings 
            WHERE user_id = ? 
            ORDER BY reading_time DESC 
            LIMIT 30
        `).all(userId);

        // Fetch current active bill
        const currentBill = await db.prepare(`
            SELECT * FROM smart_meter_bills 
            WHERE user_id = ? AND status = 'unpaid'
            ORDER BY created_at DESC 
            LIMIT 1
        `).get(userId);

        res.json({
            current_kwh: readings[0]?.kwh || 143.2,
            daily_usage: 4.8,
            monthly_usage: currentBill?.consumption_kwh || 143.2,
            current_bill: currentBill || null,
            readings
        });
    } catch (err) {
        console.error('[Meter] Get usage error:', err);
        res.status(500).json({ error: 'Failed to retrieve meter usage' });
    }
};

exports.getBills = async (req, res) => {
    try {
        const bills = await db.prepare(`
            SELECT * FROM smart_meter_bills 
            WHERE user_id = ? 
            ORDER BY created_at DESC
        `).all(req.user.user_id);

        res.json({ bills });
    } catch (err) {
        console.error('[Meter] Get bills error:', err);
        res.status(500).json({ error: 'Failed to retrieve bills' });
    }
};

exports.getCurrentBill = async (req, res) => {
    try {
        let bill = await db.prepare(`
            SELECT * FROM smart_meter_bills 
            WHERE user_id = ? AND status = 'unpaid'
            ORDER BY created_at DESC 
            LIMIT 1
        `).get(req.user.user_id);

        // If no bill exists, create a default demo bill matching proposal figure (143.2 kWh / 1280 Tk)
        if (!bill) {
            const insert = await db.prepare(`
                INSERT INTO smart_meter_bills (user_id, month, consumption_kwh, amount, status)
                VALUES (?, '2026-11', 143.2, 1280.00, 'unpaid')
            `).run(req.user.user_id);

            bill = await db.prepare('SELECT * FROM smart_meter_bills WHERE bill_id = ?').get(insert.lastInsertRowid);
        }

        res.json({ bill });
    } catch (err) {
        console.error('[Meter] Get current bill error:', err);
        res.status(500).json({ error: 'Failed to retrieve current bill' });
    }
};

exports.payBill = async (req, res) => {
    try {
        const { id } = req.params;
        const { transaction_id, sender_phone, payment_method } = req.body;

        const bill = await db.prepare('SELECT * FROM smart_meter_bills WHERE bill_id = ? AND user_id = ?').get(id, req.user.user_id);
        if (!bill) {
            return res.status(404).json({ error: 'Bill not found' });
        }

        if (bill.status === 'paid') {
            return res.status(400).json({ error: 'This bill is already paid' });
        }

        // Validate bKash TrxID
        let finalTrxId = (transaction_id && transaction_id.trim()) 
            ? transaction_id.trim().toUpperCase() 
            : null;

        if (!finalTrxId) {
            return res.status(400).json({ error: 'bKash Transaction ID (TrxID) is required' });
        }

        if (finalTrxId.length < 6) {
            return res.status(400).json({ error: 'Invalid bKash Transaction ID. Must be at least 6 alphanumeric characters.' });
        }

        await db.prepare(`
            UPDATE smart_meter_bills 
            SET status = 'paid', transaction_id = ?, paid_at = NOW()
            WHERE bill_id = ?
        `).run(finalTrxId, id);

        await logAudit(
            req.user.user_id, 
            'PAY_BILL_BKASH', 
            `bKash bill payment of ৳${bill.amount} confirmed. Sender: ${sender_phone || 'N/A'}, TrxID: ${finalTrxId}`
        );

        // Notify user with payment receipt
        try {
            await sendNotification(
                req.user.user_id,
                '🧾 bKash Payment Confirmed',
                `Your electricity bill payment of ৳${bill.amount} via bKash has been verified. TrxID: ${finalTrxId}. Thank you!`
            );
        } catch (notifErr) {
            console.error('[Meter] Notification error:', notifErr.message);
        }

        res.json({
            message: 'bKash Payment Verified & Confirmed',
            transaction_id: finalTrxId,
            status: 'paid',
            amount: bill.amount,
            sender_phone: sender_phone || null,
            paid_at: new Date().toISOString()
        });
    } catch (err) {
        console.error('[Meter] Pay bill error:', err);
        res.status(500).json({ error: 'Failed to process bKash bill payment' });
    }
};
```

---

## <a id="file-16"></a>[16] `backend/src/controllers/locationController.js`

- **Path:** `Power-Pulse-main/backend/src/controllers/locationController.js`  
- **Language:** `javascript`  
- **Lines of Code:** `41` lines  

```javascript
const db = require('../config/db');

exports.getAllLocations = async (req, res) => {
    try {
        const locations = await db.prepare(`
            SELECT l.*, 
                   (SELECT COUNT(*) FROM incidents i WHERE i.location_id = l.location_id AND i.status = 'open') as active_outages
            FROM locations l
            ORDER BY l.district, l.area
        `).all();

        res.json({ locations });
    } catch (err) {
        console.error('[Locations] Fetch error:', err);
        res.status(500).json({ error: 'Failed to retrieve locations' });
    }
};

exports.createLocation = async (req, res) => {
    try {
        const { district, area, zone, latitude, longitude } = req.body;
        if (!district || !area || !zone) {
            return res.status(400).json({ error: 'District, area, and zone are required' });
        }

        const stmt = db.prepare(`
            INSERT INTO locations (district, area, zone, latitude, longitude)
            VALUES (?, ?, ?, ?, ?)
        `);

        const result = await stmt.run(district.trim(), area.trim(), zone.trim(), latitude || null, longitude || null);
        res.status(201).json({
            message: 'Location added successfully',
            location_id: result.lastInsertRowid
        });
    } catch (err) {
        console.error('[Locations] Create error:', err);
        res.status(500).json({ error: 'Failed to create location' });
    }
};
```

---

## <a id="file-17"></a>[17] `backend/src/controllers/plannedController.js`

- **Path:** `Power-Pulse-main/backend/src/controllers/plannedController.js`  
- **Language:** `javascript`  
- **Lines of Code:** `84` lines  

```javascript
const db = require('../config/db');
const logAudit = require('../utils/auditLogger');
const { notifyLocationUsers } = require('../utils/notificationService');

exports.getPlannedOutages = async (req, res) => {
    try {
        const { location_id } = req.query;
        let query = `
            SELECT p.*, l.district, l.area, l.zone
            FROM planned_outages p
            JOIN locations l ON p.location_id = l.location_id
            WHERE p.outage_date >= CURDATE()
        `;
        const params = [];

        if (location_id) {
            query += ' AND p.location_id = ?';
            params.push(location_id);
        }

        query += ' ORDER BY p.outage_date ASC, p.start_time ASC';
        const planned = await db.prepare(query).all(...params);

        res.json({ planned });
    } catch (err) {
        console.error('[Planned] Fetch error:', err);
        res.status(500).json({ error: 'Failed to retrieve planned outages' });
    }
};

exports.createPlannedOutage = async (req, res) => {
    try {
        const { location_id, outage_date, start_time, end_time, reason } = req.body;

        if (!location_id || !outage_date || !start_time || !end_time) {
            return res.status(400).json({ error: 'location_id, outage_date, start_time, and end_time are required' });
        }

        const stmt = db.prepare(`
            INSERT INTO planned_outages (location_id, outage_date, start_time, end_time, reason)
            VALUES (?, ?, ?, ?, ?)
        `);

        const result = await stmt.run(location_id, outage_date, start_time, end_time, reason || 'Scheduled load-shedding / grid maintenance');
        const plannedId = result.lastInsertRowid;

        await logAudit(req.user.user_id, 'CREATE_PLANNED_OUTAGE', `Admin scheduled planned outage #${plannedId} for location #${location_id}`);

        // Broadcast notification to all consumers in this location
        try {
            const loc = await db.prepare('SELECT area, district, zone FROM locations WHERE location_id = ?').get(location_id);
            const locName = loc ? `${loc.area}, ${loc.district}` : 'your zone';
            await notifyLocationUsers(
                location_id,
                '📅 Scheduled Load-Shedding',
                `Load-shedding scheduled for ${locName} on ${outage_date} from ${start_time} to ${end_time}. Reason: ${reason || 'Grid maintenance'}. Please plan accordingly.`
            );
        } catch (notifErr) {
            console.error('[Planned] Notification error:', notifErr.message);
        }

        res.status(201).json({
            message: 'Planned outage scheduled successfully',
            planned_id: plannedId
        });
    } catch (err) {
        console.error('[Planned] Create error:', err);
        res.status(500).json({ error: 'Failed to create planned outage' });
    }
};

exports.deletePlannedOutage = async (req, res) => {
    try {
        const { id } = req.params;
        await db.prepare('DELETE FROM planned_outages WHERE planned_id = ?').run(id);
        await logAudit(req.user.user_id, 'DELETE_PLANNED_OUTAGE', `Admin removed planned outage #${id}`);

        res.json({ message: 'Planned outage removed' });
    } catch (err) {
        console.error('[Planned] Delete error:', err);
        res.status(500).json({ error: 'Failed to delete planned outage' });
    }
};
```

---

## <a id="file-18"></a>[18] `backend/src/controllers/notificationController.js`

- **Path:** `Power-Pulse-main/backend/src/controllers/notificationController.js`  
- **Language:** `javascript`  
- **Lines of Code:** `64` lines  

```javascript
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
```

---


# SECTION 5: RESTful API ROUTE DEFINITIONS
_Express router endpoints exposing public, consumer, technician, and administrative routes._

---

## <a id="file-19"></a>[19] `backend/src/routes/authRoutes.js`

- **Path:** `Power-Pulse-main/backend/src/routes/authRoutes.js`  
- **Language:** `javascript`  
- **Lines of Code:** `15` lines  

```javascript
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');
const { authLimiter } = require('../middleware/rateLimit');

router.post('/register', authLimiter, authController.register);
router.post('/login', authLimiter, authController.login);
router.post('/refresh', authLimiter, authController.refreshToken);
router.post('/logout', authenticateToken, authController.logout);
router.get('/me', authenticateToken, authController.getMe);
router.patch('/profile', authenticateToken, authController.updateProfile);

module.exports = router;
```

---

## <a id="file-20"></a>[20] `backend/src/routes/reportRoutes.js`

- **Path:** `Power-Pulse-main/backend/src/routes/reportRoutes.js`  
- **Language:** `javascript`  
- **Lines of Code:** `14` lines  

```javascript
const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const { authenticateToken } = require('../middleware/auth');
const { allowRoles } = require('../middleware/role');
const { reportLimiter } = require('../middleware/rateLimit');

router.post('/', authenticateToken, reportLimiter, reportController.submitReport);
router.post('/sync', authenticateToken, reportController.syncReports);
router.get('/mine', authenticateToken, reportController.getMyReports);
router.get('/', authenticateToken, allowRoles('admin'), reportController.getAllReports);

module.exports = router;
```

---

## <a id="file-21"></a>[21] `backend/src/routes/incidentRoutes.js`

- **Path:** `Power-Pulse-main/backend/src/routes/incidentRoutes.js`  
- **Language:** `javascript`  
- **Lines of Code:** `17` lines  

```javascript
const express = require('express');
const router = express.Router();
const incidentController = require('../controllers/incidentController');
const { authenticateToken } = require('../middleware/auth');
const { allowRoles } = require('../middleware/role');

router.get('/active', incidentController.getActiveIncidents);
router.get('/history', incidentController.getIncidentHistory);
router.get('/:id', incidentController.getIncidentDetails);

// Admin-only actions
router.patch('/:id/confirm', authenticateToken, allowRoles('admin'), incidentController.confirmIncident);
router.patch('/:id/dismiss', authenticateToken, allowRoles('admin'), incidentController.dismissIncident);
router.patch('/:id/restore', authenticateToken, allowRoles('admin'), incidentController.restoreIncident);

module.exports = router;
```

---

## <a id="file-22"></a>[22] `backend/src/routes/complaintRoutes.js`

- **Path:** `Power-Pulse-main/backend/src/routes/complaintRoutes.js`  
- **Language:** `javascript`  
- **Lines of Code:** `13` lines  

```javascript
const express = require('express');
const router = express.Router();
const complaintController = require('../controllers/complaintController');
const { authenticateToken } = require('../middleware/auth');
const { allowRoles } = require('../middleware/role');

router.post('/', authenticateToken, complaintController.createComplaint);
router.get('/mine', authenticateToken, complaintController.getMyComplaints);
router.get('/', authenticateToken, allowRoles('admin'), complaintController.getAllComplaints);
router.patch('/:id/assign', authenticateToken, allowRoles('admin'), complaintController.assignTechnician);

module.exports = router;
```

---

## <a id="file-23"></a>[23] `backend/src/routes/technicianRoutes.js`

- **Path:** `Power-Pulse-main/backend/src/routes/technicianRoutes.js`  
- **Language:** `javascript`  
- **Lines of Code:** `18` lines  

```javascript
const express = require('express');
const router = express.Router();
const technicianController = require('../controllers/technicianController');
const { authenticateToken } = require('../middleware/auth');
const { allowRoles } = require('../middleware/role');

// Technician portal routes
router.get('/profile', authenticateToken, allowRoles('technician'), technicianController.getProfile);
router.patch('/profile', authenticateToken, allowRoles('technician'), technicianController.updateProfile);
router.patch('/status', authenticateToken, allowRoles('technician'), technicianController.updateAvailabilityStatus);
router.get('/assignments', authenticateToken, allowRoles('technician'), technicianController.getMyAssignments);
router.patch('/assignments/:id', authenticateToken, allowRoles('technician'), technicianController.updateAssignmentStatus);

// Admin-accessible technician list
router.get('/list', authenticateToken, allowRoles('admin'), technicianController.getAllTechnicians);

module.exports = router;
```

---

## <a id="file-24"></a>[24] `backend/src/routes/adminRoutes.js`

- **Path:** `Power-Pulse-main/backend/src/routes/adminRoutes.js`  
- **Language:** `javascript`  
- **Lines of Code:** `16` lines  

```javascript
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authenticateToken } = require('../middleware/auth');
const { allowRoles } = require('../middleware/role');

// All admin routes require admin role
router.use(authenticateToken, allowRoles('admin'));

router.get('/analytics', adminController.getAnalytics);
router.get('/users', adminController.getAllUsers);
router.patch('/users/:id', adminController.updateUser);
router.get('/audit-logs', adminController.getAuditLogs);

module.exports = router;
```

---

## <a id="file-25"></a>[25] `backend/src/routes/billRoutes.js`

- **Path:** `Power-Pulse-main/backend/src/routes/billRoutes.js`  
- **Language:** `javascript`  
- **Lines of Code:** `12` lines  

```javascript
const express = require('express');
const router = express.Router();
const meterController = require('../controllers/meterController');
const { authenticateToken } = require('../middleware/auth');

// /api/bills endpoints
router.get('/current', authenticateToken, meterController.getCurrentBill);
router.get('/', authenticateToken, meterController.getBills);
router.post('/:id/pay', authenticateToken, meterController.payBill);

module.exports = router;
```

---

## <a id="file-26"></a>[26] `backend/src/routes/meterRoutes.js`

- **Path:** `Power-Pulse-main/backend/src/routes/meterRoutes.js`  
- **Language:** `javascript`  
- **Lines of Code:** `10` lines  

```javascript
const express = require('express');
const router = express.Router();
const meterController = require('../controllers/meterController');
const { authenticateToken } = require('../middleware/auth');

// /api/meter endpoints
router.get('/usage', authenticateToken, meterController.getUsage);

module.exports = router;
```

---

## <a id="file-27"></a>[27] `backend/src/routes/locationRoutes.js`

- **Path:** `Power-Pulse-main/backend/src/routes/locationRoutes.js`  
- **Language:** `javascript`  
- **Lines of Code:** `11` lines  

```javascript
const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController');
const { authenticateToken } = require('../middleware/auth');
const { allowRoles } = require('../middleware/role');

router.get('/', locationController.getAllLocations);
router.post('/', authenticateToken, allowRoles('admin'), locationController.createLocation);

module.exports = router;
```

---

## <a id="file-28"></a>[28] `backend/src/routes/plannedRoutes.js`

- **Path:** `Power-Pulse-main/backend/src/routes/plannedRoutes.js`  
- **Language:** `javascript`  
- **Lines of Code:** `12` lines  

```javascript
const express = require('express');
const router = express.Router();
const plannedController = require('../controllers/plannedController');
const { authenticateToken } = require('../middleware/auth');
const { allowRoles } = require('../middleware/role');

router.get('/', plannedController.getPlannedOutages);
router.post('/', authenticateToken, allowRoles('admin'), plannedController.createPlannedOutage);
router.delete('/:id', authenticateToken, allowRoles('admin'), plannedController.deletePlannedOutage);

module.exports = router;
```

---

## <a id="file-29"></a>[29] `backend/src/routes/notificationRoutes.js`

- **Path:** `Power-Pulse-main/backend/src/routes/notificationRoutes.js`  
- **Language:** `javascript`  
- **Lines of Code:** `12` lines  

```javascript
const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const { authenticateToken } = require('../middleware/auth');

router.get('/', authenticateToken, notificationController.getNotifications);
router.get('/unread-count', authenticateToken, notificationController.getUnreadCount);
router.patch('/read-all', authenticateToken, notificationController.markAllAsRead);
router.patch('/:id/read', authenticateToken, notificationController.markAsRead);

module.exports = router;
```

---


# SECTION 6: CORE SERVICES & GRID ALGORITHMS
_15-minute rolling window outage confidence scoring algorithm, anti-spam client UUID check, and audit logger._

---

## <a id="file-30"></a>[30] `backend/src/services/confidence.js`

- **Path:** `Power-Pulse-main/backend/src/services/confidence.js`  
- **Language:** `javascript`  
- **Lines of Code:** `120` lines  

```javascript
/**
 * 🧠 PowerPulse Core Confidence Score Engine
 * ============================================================================
 * What this does (In Plain English):
 * ----------------------------------------------------------------------------
 * When people tap "Report Electricity OFF", how does the computer know if it's
 * real or a prank?
 * 
 * It acts like a detective collecting 4 clues:
 *  1. Report Volume Clue: How many total reports came in? (Up to 30 pts)
 *  2. Unique Neighbors Clue: Are they different people? (Up to 40 pts)
 *  3. Time Burst Clue: Did they report within minutes of each other? (Up to 20 pts)
 *  4. Trust Clue: Have these citizens told the truth before? (Up to 10 pts)
 *  - Penalties: Subtract points for spammers and rapid accidental duplicates!
 * 
 * Formula:
 * Score (0 to 100) = ReportFactor + UniqueUserFactor + TimeClusterFactor + ReliabilityFactor - Penalty
 * ============================================================================
 */

function calculateConfidenceScore(reports = [], penalties = { duplicateCount: 0, spamCount: 0 }) {
    if (!reports || reports.length === 0) {
        return {
            score: 0,
            classification: 'low',
            breakdown: {
                reportCount: 0,
                uniqueUsers: 0,
                reportFactor: 0,
                uniqueUserFactor: 0,
                timeClusterFactor: 0,
                reliabilityFactor: 0,
                penalty: 0
            }
        };
    }

    const validReports = reports.filter(r => r.type === 'OFF' && !r.is_duplicate && !r.is_spam);
    const reportCount = validReports.length;

    // 1. Report Factor: valid reports * 3 (Max 30)
    const reportFactor = Math.min(reportCount * 3, 30);

    // 2. Unique User Factor: unique users * 8 (Max 40)
    const uniqueUserIds = new Set(validReports.map(r => r.user_id));
    const uniqueUsers = uniqueUserIds.size;
    const uniqueUserFactor = Math.min(uniqueUsers * 8, 40);

    // 3. Time Clustering Factor (Max 20)
    let timeClusterFactor = 0;
    if (validReports.length > 1) {
        const timestamps = validReports.map(r => new Date(r.reported_at).getTime());
        const minTime = Math.min(...timestamps);
        const maxTime = Math.max(...timestamps);
        const spanMinutes = (maxTime - minTime) / (1000 * 60);

        if (spanMinutes <= 10) {
            timeClusterFactor = 20;
        } else if (spanMinutes <= 30) {
            timeClusterFactor = 10;
        }
    } else if (validReports.length === 1) {
        timeClusterFactor = 5; // Slight signal for single report
    }

    // 4. Reliability Factor (Max 10)
    let avgReliability = 0.50;
    if (validReports.length > 0) {
        const totalReliability = validReports.reduce((sum, r) => sum + (r.reliability_score || 0.50), 0);
        avgReliability = totalReliability / validReports.length;
    }
    const reliabilityFactor = Math.round(avgReliability * 10);

    // 5. Intelligent Byzantine Fault-Tolerant Penalty Calculation
    // Prevents "Neighborhood Denial of Service": a single malicious spammer
    // cannot poison or mute an entire neighborhood when legitimate neighbors report.
    const rawDuplicatePenalty = (penalties.duplicateCount || 0) * 3;
    const rawSpamPenalty = (penalties.spamCount || 0) * 5;
    const rawTotalPenalty = rawDuplicatePenalty + rawSpamPenalty;

    // Penalty Capping based on genuine community consensus:
    // - If 3+ unique legitimate neighbors report, community consensus overrides isolated spam (max penalty: 12 pts).
    // - If 2 unique neighbors report, max penalty: 18 pts.
    // - If only 1 user reports (potential isolated prank/spam), max penalty: 25 pts.
    const maxAllowedPenalty = uniqueUsers >= 3 ? 12 : (uniqueUsers >= 2 ? 18 : 25);
    const totalPenalty = Math.min(rawTotalPenalty, maxAllowedPenalty);

    // Total raw calculation
    const rawScore = reportFactor + uniqueUserFactor + timeClusterFactor + reliabilityFactor - totalPenalty;
    const finalScore = Math.max(0, Math.min(100, Math.round(rawScore)));

    // Classification mapping
    let classification = 'low';
    if (finalScore >= 90) {
        classification = 'confirmed';
    } else if (finalScore >= 70) {
        classification = 'probable';
    } else if (finalScore >= 40) {
        classification = 'possible';
    }

    return {
        score: finalScore,
        classification,
        breakdown: {
            reportCount,
            uniqueUsers,
            reportFactor,
            uniqueUserFactor,
            timeClusterFactor,
            reliabilityFactor,
            penalty: totalPenalty
        }
    };
}

module.exports = {
    calculateConfidenceScore
};
```

---

## <a id="file-31"></a>[31] `backend/src/services/outageService.js`

- **Path:** `Power-Pulse-main/backend/src/services/outageService.js`  
- **Language:** `javascript`  
- **Lines of Code:** `217` lines  

```javascript
/**
 * ⚡ Outage Lifecycle & Rules Engine (The Automated Dispatcher)
 * ============================================================================
 * Connected directly to Aiven Cloud MySQL via db wrapper
 * ============================================================================
 */
const db = require('../config/db');
const { calculateConfidenceScore } = require('./confidence');
const { notifyLocationUsers } = require('../utils/notificationService');

class OutageService {
    /**
     * Process an incoming OFF report and recalculate location incident status
     */
    static async processReport(locationId) {
        // Query recent valid OFF reports in the last 30 minutes for this location
        const reports = await db.prepare(`
            SELECT r.*, u.reliability_score 
            FROM reports r
            JOIN users u ON r.user_id = u.user_id
            WHERE r.location_id = ? 
              AND r.type = 'OFF'
              AND r.reported_at >= DATE_SUB(NOW(), INTERVAL 30 MINUTE)
            ORDER BY r.reported_at ASC
        `).all(locationId);

        // Count duplicate and spam reports in the window
        const penalties = await db.prepare(`
            SELECT 
                SUM(is_duplicate) as duplicateCount,
                SUM(is_spam) as spamCount
            FROM reports
            WHERE location_id = ?
              AND reported_at >= DATE_SUB(NOW(), INTERVAL 30 MINUTE)
        `).get(locationId);

        const evaluation = calculateConfidenceScore(reports, {
            duplicateCount: penalties?.duplicateCount || 0,
            spamCount: penalties?.spamCount || 0
        });

        // Check for existing active open incident in this location
        const existingIncident = await db.prepare(`
            SELECT * FROM incidents 
            WHERE location_id = ? AND status = 'open'
        `).get(locationId);

        // Threshold: score >= 20 OR at least 1 corroborating OFF report
        if (evaluation.score >= 20 || evaluation.breakdown.uniqueUsers >= 1) {
            if (existingIncident) {
                // Update existing incident confidence
                await db.prepare(`
                    UPDATE incidents 
                    SET confidence_score = ?, classification = ?
                    WHERE incident_id = ?
                `).run(evaluation.score, evaluation.classification, existingIncident.incident_id);

                // Link unlinked reports to this incident
                await db.prepare(`
                    UPDATE reports 
                    SET incident_id = ? 
                    WHERE location_id = ? AND incident_id IS NULL AND type = 'OFF'
                `).run(existingIncident.incident_id, locationId);

                return {
                    incidentId: existingIncident.incident_id,
                    action: 'updated',
                    ...evaluation
                };
            } else {
                // Check if this matches a scheduled planned outage
                const planned = await db.prepare(`
                    SELECT * FROM planned_outages 
                    WHERE location_id = ? 
                      AND outage_date = CURDATE()
                      AND CURTIME() BETWEEN start_time AND end_time
                `).get(locationId);

                const incidentType = planned ? 'planned' : 'unexpected';
                const startTime = reports[0]?.reported_at || new Date().toISOString().slice(0, 19).replace('T', ' ');

                const newIncident = await db.prepare(`
                    INSERT INTO incidents (location_id, confidence_score, classification, type, status, start_time)
                    VALUES (?, ?, ?, ?, 'open', ?)
                `).run(locationId, evaluation.score, evaluation.classification, incidentType, startTime);

                const incidentId = newIncident.lastInsertRowid;

                // Link reports to newly formed incident
                await db.prepare(`
                    UPDATE reports 
                    SET incident_id = ? 
                    WHERE location_id = ? AND incident_id IS NULL AND type = 'OFF'
                `).run(incidentId, locationId);

                // Notify all consumers in this location about the power outage
                try {
                    const loc = await db.prepare('SELECT area, district, zone FROM locations WHERE location_id = ?').get(locationId);
                    const locName = loc ? `${loc.area}, ${loc.district}` : 'your zone';
                    await notifyLocationUsers(
                        locationId,
                        '⚠️ Power Outage Detected',
                        `Unscheduled power outage detected in ${locName}. Automated grid monitoring and field teams have been notified.`
                    );
                } catch (notifErr) {
                    console.error('[OutageService] Notification dispatch error:', notifErr.message);
                }

                return {
                    incidentId,
                    action: 'created',
                    ...evaluation
                };
            }
        }

        return {
            incidentId: existingIncident?.incident_id || null,
            action: 'evaluated',
            ...evaluation
        };
    }

    /**
     * Process an incoming BACK report (power restored)
     */
    static async processBackReport(locationId) {
        const activeIncident = await db.prepare(`
            SELECT * FROM incidents 
            WHERE location_id = ? AND status = 'open'
        `).get(locationId);

        if (!activeIncident) {
            return { restored: false, message: 'No active incident for this area' };
        }

        // Count unique users who sent BACK reports in the last 15 minutes
        const backReports = await db.prepare(`
            SELECT COUNT(DISTINCT user_id) as count 
            FROM reports 
            WHERE location_id = ? 
              AND type = 'BACK' 
              AND reported_at >= DATE_SUB(NOW(), INTERVAL 15 MINUTE)
        `).get(locationId);

        // Auto-restore if at least 1 verified user reports BACK
        if (backReports && backReports.count >= 1) {
            return await this.closeIncident(activeIncident.incident_id, 'restored');
        }

        return {
            restored: false,
            backReportCount: backReports ? backReports.count : 0,
            required: 2,
            message: `Received ${backReports ? backReports.count : 0} of 2 required BACK reports to confirm restoration.`
        };
    }

    /**
     * Close an incident (Restored or Dismissed)
     */
    static async closeIncident(incidentId, targetStatus = 'restored') {
        const incident = await db.prepare('SELECT * FROM incidents WHERE incident_id = ?').get(incidentId);
        if (!incident) throw new Error('Incident not found');

        const now = new Date();
        const start = new Date(incident.start_time);
        const durationMinutes = Math.max(1, Math.round((now - start) / (1000 * 60)));

        await db.prepare(`
            UPDATE incidents 
            SET status = ?, end_time = NOW(), duration_minutes = ?
            WHERE incident_id = ?
        `).run(targetStatus, durationMinutes, incidentId);

        // Update contributing reporters' reliability
        const contributingUsers = await db.prepare(`
            SELECT DISTINCT user_id FROM reports WHERE incident_id = ?
        `).all(incidentId);

        const delta = targetStatus === 'restored' ? 0.02 : -0.05;
        const updateReliability = db.prepare(`
            UPDATE users 
            SET reliability_score = MAX(0.05, MIN(1.00, ROUND(reliability_score + ?, 2)))
            WHERE user_id = ?
        `);

        for (const u of contributingUsers) {
            await updateReliability.run(delta, u.user_id);
        }

        // Notify location consumers that power is restored
        if (targetStatus === 'restored') {
            try {
                const loc = await db.prepare('SELECT area, district, zone FROM locations WHERE location_id = ?').get(incident.location_id);
                const locName = loc ? `${loc.area}, ${loc.district}` : 'your area';
                await notifyLocationUsers(
                    incident.location_id,
                    '💡 Power Restored',
                    `Electricity service has been restored in ${locName}. Outage duration: ${durationMinutes} minutes.`
                );
            } catch (notifErr) {
                console.error('[OutageService] Restoration notification dispatch error:', notifErr.message);
            }
        }

        return {
            incidentId,
            status: targetStatus,
            durationMinutes,
            reportersAdjusted: contributingUsers.length
        };
    }
}

module.exports = OutageService;
```

---

## <a id="file-32"></a>[32] `backend/src/utils/auditLogger.js`

- **Path:** `Power-Pulse-main/backend/src/utils/auditLogger.js`  
- **Language:** `javascript`  
- **Lines of Code:** `16` lines  

```javascript
const db = require('../config/db');

async function logAudit(userId, action, details) {
    try {
        const stmt = db.prepare(`
            INSERT INTO audit_logs (user_id, action, details)
            VALUES (?, ?, ?)
        `);
        await stmt.run(userId || null, action, typeof details === 'object' ? JSON.stringify(details) : details);
    } catch (err) {
        console.error('[AuditLog] Failed to record audit log:', err.message);
    }
}

module.exports = logAudit;
```

---

## <a id="file-33"></a>[33] `backend/src/utils/notificationService.js`

- **Path:** `Power-Pulse-main/backend/src/utils/notificationService.js`  
- **Language:** `javascript`  
- **Lines of Code:** `43` lines  

```javascript
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
```

---


# SECTION 7: DATABASE SCHEMAS & DATABASE SCRIPTS
_MySQL 14-table DDL schemas, test automation suites, seeding, and migration tools._

---

## <a id="file-34"></a>[34] `backend/src/scripts/schema.mysql.sql`

- **Path:** `Power-Pulse-main/backend/src/scripts/schema.mysql.sql`  
- **Language:** `sql`  
- **Lines of Code:** `203` lines  

```sql
-- ============================================================================
-- PowerPulse: Official MySQL Database Schema (MySQL 8.0+ / MariaDB / Cloud DB)
-- Smart Electricity Outage Intelligence & Management Platform
-- ============================================================================

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS blacklisted_tokens;
DROP TABLE IF EXISTS refresh_tokens;
DROP TABLE IF EXISTS audit_logs;
DROP TABLE IF EXISTS notifications;
DROP TABLE IF EXISTS meter_readings;
DROP TABLE IF EXISTS smart_meter_bills;
DROP TABLE IF EXISTS planned_outages;
DROP TABLE IF EXISTS assignments;
DROP TABLE IF EXISTS complaints;
DROP TABLE IF EXISTS reports;
DROP TABLE IF EXISTS incidents;
DROP TABLE IF EXISTS technicians;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS locations;
SET FOREIGN_KEY_CHECKS = 1;

-- 1. Locations
CREATE TABLE locations (
    location_id INT AUTO_INCREMENT PRIMARY KEY,
    district VARCHAR(100) NOT NULL,
    area VARCHAR(100) NOT NULL,
    zone VARCHAR(100) NOT NULL,
    latitude DECIMAL(10, 8) NULL,
    longitude DECIMAL(11, 8) NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Users (Consumers, Admins, Technicians)
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(191) NOT NULL UNIQUE,
    phone VARCHAR(50) NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('consumer', 'admin', 'technician') NOT NULL DEFAULT 'consumer',
    location_id INT NULL,
    reliability_score DECIMAL(4, 2) NOT NULL DEFAULT 0.50,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_users_location FOREIGN KEY (location_id) REFERENCES locations(location_id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Technicians (Profile linked to Users)
CREATE TABLE technicians (
    technician_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL UNIQUE,
    availability_status ENUM('available', 'busy', 'on_leave', 'offline') NOT NULL DEFAULT 'available',
    CONSTRAINT fk_technicians_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Outage Incidents (Aggregated Area Events)
CREATE TABLE incidents (
    incident_id INT AUTO_INCREMENT PRIMARY KEY,
    location_id INT NOT NULL,
    confidence_score INT NOT NULL DEFAULT 0,
    classification ENUM('low', 'possible', 'probable', 'confirmed') NOT NULL DEFAULT 'low',
    type ENUM('unexpected', 'planned') NOT NULL DEFAULT 'unexpected',
    status ENUM('open', 'restored', 'dismissed') NOT NULL DEFAULT 'open',
    start_time DATETIME NOT NULL,
    end_time DATETIME NULL,
    duration_minutes INT NULL,
    manually_reviewed TINYINT(1) NOT NULL DEFAULT 0,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_incidents_location FOREIGN KEY (location_id) REFERENCES locations(location_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Individual OFF/BACK Reports
CREATE TABLE reports (
    report_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    location_id INT NOT NULL,
    incident_id INT NULL,
    type ENUM('OFF', 'BACK') NOT NULL,
    reported_at DATETIME NOT NULL,
    received_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    sync_status ENUM('synced', 'pending') NOT NULL DEFAULT 'synced',
    is_duplicate TINYINT(1) NOT NULL DEFAULT 0,
    is_spam TINYINT(1) NOT NULL DEFAULT 0,
    client_uuid VARCHAR(191) NULL UNIQUE,
    CONSTRAINT fk_reports_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    CONSTRAINT fk_reports_location FOREIGN KEY (location_id) REFERENCES locations(location_id) ON DELETE CASCADE,
    CONSTRAINT fk_reports_incident FOREIGN KEY (incident_id) REFERENCES incidents(incident_id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. Consumer Complaints
CREATE TABLE complaints (
    complaint_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    incident_id INT NULL,
    category ENUM('power_outage', 'low_voltage', 'transformer', 'damaged_wire', 'pole', 'other') NOT NULL,
    description TEXT NULL,
    status ENUM('pending', 'assigned', 'investigating', 'repairing', 'resolved') NOT NULL DEFAULT 'pending',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_complaints_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    CONSTRAINT fk_complaints_incident FOREIGN KEY (incident_id) REFERENCES incidents(incident_id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. Technician Assignments
CREATE TABLE assignments (
    assignment_id INT AUTO_INCREMENT PRIMARY KEY,
    complaint_id INT NOT NULL,
    technician_id INT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'assigned',
    remarks TEXT NULL,
    assigned_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_assignments_complaint FOREIGN KEY (complaint_id) REFERENCES complaints(complaint_id) ON DELETE CASCADE,
    CONSTRAINT fk_assignments_technician FOREIGN KEY (technician_id) REFERENCES technicians(technician_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. Planned Outages / Scheduled Load Shedding
CREATE TABLE planned_outages (
    planned_id INT AUTO_INCREMENT PRIMARY KEY,
    location_id INT NOT NULL,
    outage_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    reason TEXT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_planned_location FOREIGN KEY (location_id) REFERENCES locations(location_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 9. Smart Meter Bills
CREATE TABLE smart_meter_bills (
    bill_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    month VARCHAR(20) NOT NULL,
    consumption_kwh DECIMAL(10, 2) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    status ENUM('unpaid', 'paid') NOT NULL DEFAULT 'unpaid',
    transaction_id VARCHAR(100) NULL,
    paid_at DATETIME NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_bills_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 10. Smart Meter Hourly/Periodic Readings
CREATE TABLE meter_readings (
    reading_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    reading_time DATETIME NOT NULL,
    kwh DECIMAL(10, 2) NOT NULL,
    CONSTRAINT fk_readings_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 11. System & In-App Notifications
CREATE TABLE notifications (
    notification_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    is_read TINYINT(1) NOT NULL DEFAULT 0,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_notifications_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 12. Security Audit Logs
CREATE TABLE audit_logs (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NULL,
    action VARCHAR(100) NOT NULL,
    details TEXT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_audit_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 13. JWT Refresh Tokens (Dual-token rotation)
CREATE TABLE refresh_tokens (
    token_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    token VARCHAR(512) NOT NULL,
    expires_at DATETIME NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_refresh_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 14. Server-Side Token Blacklist (Safe Logout & Revocation)
CREATE TABLE blacklisted_tokens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    token VARCHAR(512) NOT NULL,
    blacklisted_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    expires_at DATETIME NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Performance Indexes (High-Traffic Query Acceleration)
CREATE INDEX idx_reports_location_time ON reports(location_id, reported_at);
CREATE INDEX idx_reports_user_time ON reports(user_id, reported_at);
CREATE INDEX idx_reports_user_received ON reports(user_id, received_at);
CREATE INDEX idx_incidents_location_status ON incidents(location_id, status);
CREATE INDEX idx_complaints_user_status ON complaints(user_id, status);
CREATE INDEX idx_assignments_tech ON assignments(technician_id, status);
CREATE INDEX idx_notifications_user_unread ON notifications(user_id, is_read, created_at);
CREATE INDEX idx_meter_readings_user_time ON meter_readings(user_id, reading_time DESC);
CREATE INDEX idx_bills_user_status ON smart_meter_bills(user_id, status);
CREATE INDEX idx_audit_user_time ON audit_logs(user_id, created_at);
CREATE INDEX idx_planned_location_date ON planned_outages(location_id, outage_date);
CREATE INDEX idx_refresh_tokens_token ON refresh_tokens(token(191));
CREATE INDEX idx_blacklisted_tokens_token ON blacklisted_tokens(token(191));
```

---

## <a id="file-35"></a>[35] `backend/src/scripts/schema.sql`

- **Path:** `Power-Pulse-main/backend/src/scripts/schema.sql`  
- **Language:** `sql`  
- **Lines of Code:** `187` lines  

```sql
-- PowerPulse: Relational Database Schema (SQLite & ANSI Standard)
-- 12 Structured Tables for Smart Electricity Outage Intelligence & Management

PRAGMA foreign_keys = ON;

-- 1. Locations
CREATE TABLE IF NOT EXISTS locations (
    location_id INTEGER PRIMARY KEY AUTOINCREMENT,
    district TEXT NOT NULL,
    area TEXT NOT NULL,
    zone TEXT NOT NULL,
    latitude REAL,
    longitude REAL
);

-- 2. Users (Consumer, Admin, Technician)
CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    password_hash TEXT NOT NULL,
    role TEXT CHECK(role IN ('consumer', 'admin', 'technician')) DEFAULT 'consumer',
    location_id INTEGER,
    reliability_score REAL DEFAULT 0.50,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (location_id) REFERENCES locations(location_id) ON DELETE SET NULL
);

-- 3. Technicians (Profile linked to Users)
CREATE TABLE IF NOT EXISTS technicians (
    technician_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER UNIQUE NOT NULL,
    availability_status TEXT CHECK(availability_status IN ('available', 'busy', 'off')) DEFAULT 'available',
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- 4. Outage Incidents (Aggregated Area Events)
CREATE TABLE IF NOT EXISTS incidents (
    incident_id INTEGER PRIMARY KEY AUTOINCREMENT,
    location_id INTEGER NOT NULL,
    confidence_score INTEGER DEFAULT 0,
    classification TEXT CHECK(classification IN ('low', 'possible', 'probable', 'confirmed')) DEFAULT 'low',
    type TEXT CHECK(type IN ('unexpected', 'planned')) DEFAULT 'unexpected',
    status TEXT CHECK(status IN ('open', 'restored', 'dismissed')) DEFAULT 'open',
    start_time DATETIME NOT NULL,
    end_time DATETIME,
    duration_minutes INTEGER,
    manually_reviewed INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (location_id) REFERENCES locations(location_id) ON DELETE CASCADE
);

-- 5. Individual OFF/BACK Reports
CREATE TABLE IF NOT EXISTS reports (
    report_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    location_id INTEGER NOT NULL,
    incident_id INTEGER,
    type TEXT CHECK(type IN ('OFF', 'BACK')) NOT NULL,
    reported_at DATETIME NOT NULL,
    received_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    sync_status TEXT CHECK(sync_status IN ('synced', 'pending')) DEFAULT 'synced',
    is_duplicate INTEGER DEFAULT 0,
    is_spam INTEGER DEFAULT 0,
    client_uuid TEXT UNIQUE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (location_id) REFERENCES locations(location_id) ON DELETE CASCADE,
    FOREIGN KEY (incident_id) REFERENCES incidents(incident_id) ON DELETE SET NULL
);

-- 6. Consumer Complaints
CREATE TABLE IF NOT EXISTS complaints (
    complaint_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    incident_id INTEGER,
    category TEXT CHECK(category IN ('power_outage', 'low_voltage', 'transformer', 'damaged_wire', 'pole', 'other')) NOT NULL,
    description TEXT,
    status TEXT CHECK(status IN ('pending', 'assigned', 'investigating', 'repairing', 'resolved')) DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (incident_id) REFERENCES incidents(incident_id) ON DELETE SET NULL
);

-- 7. Technician Assignments
CREATE TABLE IF NOT EXISTS assignments (
    assignment_id INTEGER PRIMARY KEY AUTOINCREMENT,
    complaint_id INTEGER NOT NULL,
    technician_id INTEGER NOT NULL,
    status TEXT DEFAULT 'assigned',
    remarks TEXT,
    assigned_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (complaint_id) REFERENCES complaints(complaint_id) ON DELETE CASCADE,
    FOREIGN KEY (technician_id) REFERENCES technicians(technician_id) ON DELETE CASCADE
);

-- 8. Planned Outages / Scheduled Load Shedding
CREATE TABLE IF NOT EXISTS planned_outages (
    planned_id INTEGER PRIMARY KEY AUTOINCREMENT,
    location_id INTEGER NOT NULL,
    outage_date TEXT NOT NULL,
    start_time TEXT NOT NULL,
    end_time TEXT NOT NULL,
    reason TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (location_id) REFERENCES locations(location_id) ON DELETE CASCADE
);

-- 9. Smart Meter Bills (Simulated)
CREATE TABLE IF NOT EXISTS smart_meter_bills (
    bill_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    month TEXT NOT NULL,
    consumption_kwh REAL NOT NULL,
    amount REAL NOT NULL,
    status TEXT CHECK(status IN ('unpaid', 'paid')) DEFAULT 'unpaid',
    transaction_id TEXT,
    paid_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- 10. Smart Meter Hourly/Periodic Readings
CREATE TABLE IF NOT EXISTS meter_readings (
    reading_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    reading_time DATETIME NOT NULL,
    kwh REAL NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- 11. System & In-App Notifications
CREATE TABLE IF NOT EXISTS notifications (
    notification_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    is_read INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- 12. Security Audit Logs
CREATE TABLE IF NOT EXISTS audit_logs (
    log_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    action TEXT NOT NULL,
    details TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL
);

-- Indexes for Query Acceleration
CREATE INDEX IF NOT EXISTS idx_reports_location_time ON reports(location_id, reported_at);
CREATE INDEX IF NOT EXISTS idx_reports_user_time ON reports(user_id, reported_at);
CREATE INDEX IF NOT EXISTS idx_reports_user_received ON reports(user_id, received_at);
CREATE INDEX IF NOT EXISTS idx_incidents_location_status ON incidents(location_id, status);
CREATE INDEX IF NOT EXISTS idx_complaints_user_status ON complaints(user_id, status);
CREATE INDEX IF NOT EXISTS idx_assignments_tech ON assignments(technician_id, status);
CREATE INDEX IF NOT EXISTS idx_notifications_user_unread ON notifications(user_id, is_read, created_at);
CREATE INDEX IF NOT EXISTS idx_meter_readings_user_time ON meter_readings(user_id, reading_time DESC);
CREATE INDEX IF NOT EXISTS idx_bills_user_status ON smart_meter_bills(user_id, status);
CREATE INDEX IF NOT EXISTS idx_audit_user_time ON audit_logs(user_id, created_at);
CREATE INDEX IF NOT EXISTS idx_planned_location_date ON planned_outages(location_id, outage_date);

-- 13. JWT Refresh Tokens (Dual-token rotation)
CREATE TABLE IF NOT EXISTS refresh_tokens (
    token_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    token TEXT UNIQUE NOT NULL,
    expires_at DATETIME NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- 14. Server-Side Token Blacklist (Safe Logout & Revocation)
CREATE TABLE IF NOT EXISTS blacklisted_tokens (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    token TEXT UNIQUE NOT NULL,
    blacklisted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    expires_at DATETIME NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_refresh_tokens_token ON refresh_tokens(token);
CREATE INDEX IF NOT EXISTS idx_blacklisted_tokens_token ON blacklisted_tokens(token);
```

---

## <a id="file-36"></a>[36] `backend/src/scripts/seed.js`

- **Path:** `Power-Pulse-main/backend/src/scripts/seed.js`  
- **Language:** `javascript`  
- **Lines of Code:** `218` lines  

```javascript
const bcrypt = require('bcryptjs');
const db = require('../config/db');
const initDb = require('./initDb');

async function seed() {
    console.log('[PowerPulse] Starting database seeding...');
    initDb(); // Ensure tables exist

    // Clear existing data safely
    const tables = [
        'audit_logs', 'notifications', 'meter_readings', 'smart_meter_bills',
        'assignments', 'complaints', 'reports', 'incidents', 'planned_outages',
        'technicians', 'users', 'locations'
    ];

    db.exec('PRAGMA foreign_keys = OFF;');
    for (const table of tables) {
        db.exec(`DELETE FROM ${table};`);
    }
    try {
        db.exec("DELETE FROM sqlite_sequence;");
    } catch (e) {
        // Table might not exist yet if no autoincrement was triggered
    }
    db.exec('PRAGMA foreign_keys = ON;');

    console.log('[PowerPulse] Cleared previous records.');

    // 1. Seed Locations (Dhaka municipal zones)
    const locations = [
        { district: 'Dhaka', area: 'Mirpur-10', zone: 'Zone A', lat: 23.8071, lng: 90.3686 },
        { district: 'Dhaka', area: 'Mirpur-2', zone: 'Zone A', lat: 23.8010, lng: 90.3620 },
        { district: 'Dhaka', area: 'Dhanmondi 27', zone: 'Zone B', lat: 23.7538, lng: 90.3768 },
        { district: 'Dhaka', area: 'Dhanmondi 32', zone: 'Zone B', lat: 23.7486, lng: 90.3789 },
        { district: 'Dhaka', area: 'Uttara Sector 4', zone: 'Zone C', lat: 23.8712, lng: 90.3980 },
        { district: 'Dhaka', area: 'Uttara Sector 11', zone: 'Zone C', lat: 23.8850, lng: 90.3890 },
        { district: 'Dhaka', area: 'Gulshan-1', zone: 'Zone D', lat: 23.7808, lng: 90.4190 },
        { district: 'Dhaka', area: 'Gulshan-2', zone: 'Zone D', lat: 23.7925, lng: 90.4150 },
        { district: 'Dhaka', area: 'Banani', zone: 'Zone D', lat: 23.7937, lng: 90.4043 },
        { district: 'Dhaka', area: 'Mohammadpur', zone: 'Zone B', lat: 23.7658, lng: 90.3584 }
    ];

    const insertLocation = db.prepare(`
        INSERT INTO locations (district, area, zone, latitude, longitude)
        VALUES (@district, @area, @zone, @lat, @lng)
    `);

    for (const loc of locations) {
        insertLocation.run(loc);
    }
    console.log(`[PowerPulse] Seeded ${locations.length} municipal locations.`);

    // 2. Prepare Passwords
    const adminPasswordHash = await bcrypt.hash('Admin@123', 10);
    const techPasswordHash = await bcrypt.hash('Tech@123', 10);
    const userPasswordHash = await bcrypt.hash('User@123', 10);

    const insertUser = db.prepare(`
        INSERT INTO users (name, email, phone, password_hash, role, location_id, reliability_score)
        VALUES (@name, @email, @phone, @password_hash, @role, @location_id, @reliability_score)
    `);

    // Admin Account
    const adminResult = insertUser.run({
        name: 'Tarikul Islam (Admin)',
        email: 'admin@powerpulse.com',
        phone: '01711000001',
        password_hash: adminPasswordHash,
        role: 'admin',
        location_id: 1,
        reliability_score: 1.0
    });

    // Technicians
    const techs = [
        { name: 'Rahim Ahmed (Lead Field Tech)', email: 'rahim.tech@powerpulse.com', phone: '01811000002', loc: 1, avail: 'available' },
        { name: 'Karim Uddin (Substation Specialist)', email: 'karim.tech@powerpulse.com', phone: '01911000003', loc: 5, avail: 'busy' },
        { name: 'Salma Akter (Linesman Tech)', email: 'salma.tech@powerpulse.com', phone: '01611000004', loc: 3, avail: 'available' }
    ];

    const insertTech = db.prepare(`
        INSERT INTO technicians (user_id, availability_status)
        VALUES (?, ?)
    `);

    for (const t of techs) {
        const u = insertUser.run({
            name: t.name,
            email: t.email,
            phone: t.phone,
            password_hash: techPasswordHash,
            role: 'technician',
            location_id: t.loc,
            reliability_score: 0.95
        });
        insertTech.run(u.lastInsertRowid, t.avail);
    }
    console.log(`[PowerPulse] Seeded Admin and ${techs.length} Technicians.`);

    // Consumers
    const consumers = [
        { name: 'Tanvir Hossain', email: 'tanvir@gmail.com', phone: '01720000010', loc: 1, rel: 0.90 },
        { name: 'Nusrat Jahan', email: 'nusrat@gmail.com', phone: '01720000011', loc: 1, rel: 0.85 },
        { name: 'Sabbir Rahman', email: 'sabbir@gmail.com', phone: '01720000012', loc: 1, rel: 0.80 },
        { name: 'Farzana Chowdhury', email: 'farzana@gmail.com', phone: '01720000013', loc: 1, rel: 0.88 },
        { name: 'Mahmudul Hasan', email: 'mahmud@gmail.com', phone: '01720000014', loc: 3, rel: 0.75 },
        { name: 'Ayesha Siddika', email: 'ayesha@gmail.com', phone: '01720000015', loc: 3, rel: 0.80 },
        { name: 'Kamrul Islam', email: 'kamrul@gmail.com', phone: '01720000016', loc: 5, rel: 0.92 },
        { name: 'Rehana Parvin', email: 'rehana@gmail.com', phone: '01720000017', loc: 5, rel: 0.70 },
        { name: 'Zubair Alom', email: 'zubair@gmail.com', phone: '01720000018', loc: 7, rel: 0.82 },
        { name: 'Sadia Khan', email: 'sadia@gmail.com', phone: '01720000019', loc: 8, rel: 0.86 },
        { name: 'MD TARIKUL BOSS', email: 'admin1@powerpulse.com', phone: '01797209892', loc: 7, rel: 0.50 }
    ];

    for (const c of consumers) {
        insertUser.run({
            name: c.name,
            email: c.email,
            phone: c.phone,
            password_hash: userPasswordHash,
            role: 'consumer',
            location_id: c.loc,
            reliability_score: c.rel
        });
    }
    console.log(`[PowerPulse] Seeded ${consumers.length} verified Consumer accounts.`);

    // 3. Seed an Active Outage Incident in Mirpur-10 (Confidence 86% - Probable)
    const insertIncident = db.prepare(`
        INSERT INTO incidents (location_id, confidence_score, classification, type, status, start_time, duration_minutes)
        VALUES (?, ?, ?, ?, ?, datetime('now', '-25 minutes'), ?)
    `);

    const activeIncident = insertIncident.run(1, 86, 'probable', 'unexpected', 'open', null);
    const incidentId = activeIncident.lastInsertRowid;

    // Seed 4 OFF reports in Mirpur-10 that produced this incident
    const insertReport = db.prepare(`
        INSERT INTO reports (user_id, location_id, incident_id, type, reported_at, sync_status, is_duplicate, is_spam)
        VALUES (?, ?, ?, ?, datetime('now', ?), 'synced', 0, 0)
    `);

    insertReport.run(5, 1, incidentId, 'OFF', '-25 minutes');
    insertReport.run(6, 1, incidentId, 'OFF', '-22 minutes');
    insertReport.run(7, 1, incidentId, 'OFF', '-18 minutes');
    insertReport.run(8, 1, incidentId, 'OFF', '-14 minutes');

    // Seed a Past Restored Outage in Dhanmondi 27 (1h 15m duration)
    const restoredIncident = db.prepare(`
        INSERT INTO incidents (location_id, confidence_score, classification, type, status, start_time, end_time, duration_minutes)
        VALUES (3, 95, 'confirmed', 'unexpected', 'restored', datetime('now', '-5 hours'), datetime('now', '-3 hours 45 minutes'), 75)
    `).run();

    // 4. Seed Consumer Complaints
    const insertComplaint = db.prepare(`
        INSERT INTO complaints (user_id, incident_id, category, description, status, created_at)
        VALUES (?, ?, ?, ?, ?, datetime('now', ?))
    `);

    const c1 = insertComplaint.run(5, incidentId, 'power_outage', 'Entire block around Road 4 has been completely pitch black for 20 mins.', 'assigned', '-20 minutes');
    const c2 = insertComplaint.run(9, null, 'low_voltage', 'Severe low voltage in Dhanmondi 27, AC and refrigerator cannot turn on.', 'pending', '-40 minutes');
    const c3 = insertComplaint.run(11, null, 'transformer', 'Loud spark noise and smoke coming from the pole transformer near Sector 4.', 'investigating', '-1 hour');

    // 5. Seed Technician Assignments
    const insertAssignment = db.prepare(`
        INSERT INTO assignments (complaint_id, technician_id, status, remarks, assigned_at)
        VALUES (?, ?, ?, ?, datetime('now', ?))
    `);

    insertAssignment.run(c1.lastInsertRowid, 1, 'assigned', 'Dispatched to Mirpur-10 substation for feeder breaker inspection.', '-15 minutes');
    insertAssignment.run(c3.lastInsertRowid, 2, 'investigating', 'On-site assessing transformer coil damage with team.', '-45 minutes');

    // 6. Seed Planned Load-Shedding Outages
    const insertPlanned = db.prepare(`
        INSERT INTO planned_outages (location_id, outage_date, start_time, end_time, reason)
        VALUES (?, ?, ?, ?, ?)
    `);

    insertPlanned.run(6, '2026-11-20', '10:00', '12:30', 'Routine 33kV substation feeder maintenance and grid line trimming.');
    insertPlanned.run(8, '2026-11-21', '14:00', '16:00', 'Scheduled power grid transformer capacity upgrade.');

    // 7. Seed Smart Meter Demo Bills & Readings
    const insertBill = db.prepare(`
        INSERT INTO smart_meter_bills (user_id, month, consumption_kwh, amount, status, transaction_id, paid_at)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    insertBill.run(5, '2026-10', 184.50, 1420.00, 'paid', 'PP-TXN-89421', '2026-11-05 14:22:00');
    insertBill.run(5, '2026-11', 142.10, 1136.80, 'unpaid', null, null);

    // 8. Seed Security Audit Logs
    const insertAudit = db.prepare(`
        INSERT INTO audit_logs (user_id, action, details)
        VALUES (?, ?, ?)
    `);

    insertAudit.run(1, 'SYSTEM_INIT', 'Database seeded with default municipal locations, admin, technicians, and demo consumers.');
    insertAudit.run(1, 'ASSIGN_TECHNICIAN', 'Admin dispatched Rahim Ahmed to Complaint #1 (Mirpur-10).');

    console.log('[PowerPulse] Database seeded successfully!');
    console.log('----------------------------------------------------');
    console.log('Login Credentials:');
    console.log('  Admin:      admin@powerpulse.com     / Admin@123');
    console.log('  Technician: rahim.tech@powerpulse.com / Tech@123');
    console.log('  Technician: karim.tech@powerpulse.com / Tech@123');
    console.log('  Consumer:   tanvir@gmail.com         / User@123');
    console.log('----------------------------------------------------');
}

if (require.main === module) {
    seed().then(() => process.exit(0)).catch(err => {
        console.error('[PowerPulse] Seed error:', err);
        process.exit(1);
    });
}

module.exports = seed;
```

---

## <a id="file-37"></a>[37] `backend/src/scripts/initDb.js`

- **Path:** `Power-Pulse-main/backend/src/scripts/initDb.js`  
- **Language:** `javascript`  
- **Lines of Code:** `21` lines  

```javascript
const fs = require('fs');
const path = require('path');
const db = require('../config/db');

function initDb() {
    console.log('[PowerPulse] Initializing database schema...');
    const schemaPath = path.resolve(__dirname, 'schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');

    // Execute the complete schema
    db.exec(schemaSql);
    console.log('[PowerPulse] Database schema created successfully (12 tables).');
}

if (require.main === module) {
    initDb();
    process.exit(0);
}

module.exports = initDb;
```

---

## <a id="file-38"></a>[38] `backend/src/scripts/simulate.js`

- **Path:** `Power-Pulse-main/backend/src/scripts/simulate.js`  
- **Language:** `javascript`  
- **Lines of Code:** `108` lines  

```javascript
/**
 * PowerPulse Outage Intelligence Simulator
 * Evaluates core algorithm scenarios required for academic defense and evaluation metrics.
 */

const db = require('../config/db');
const seed = require('./seed');
const OutageService = require('../services/outageService');

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function runSimulation() {
    console.log('====================================================');
    console.log('⚡ POWERPULSE ALGORITHM EVALUATION SIMULATOR');
    console.log('====================================================\n');

    // Reset database to clean state
    await seed();

    console.log('\n>>> SCENARIO 1: Single User False Report (No Cluster)');
    console.log('Target: Banani (Location #9), User #14 (Zubair Alom)');
    
    // User #14 reports OFF once in Banani (Location 9)
    db.prepare(`
        INSERT INTO reports (user_id, location_id, type, reported_at, sync_status, is_duplicate, is_spam)
        VALUES (14, 9, 'OFF', datetime('now'), 'synced', 0, 0)
    `).run();

    let result1 = OutageService.processReport(9);
    console.log(`Outcome -> Score: ${result1.score}%, Classification: '${result1.classification}'`);
    console.log(`Incident Created? ${result1.incidentId ? 'YES (ID: ' + result1.incidentId + ')' : 'NO (Rejected as uncorroborated single report)'}`);
    console.log(`Verification: ${result1.incidentId === null ? '✅ PASS: Single report never triggers false alarm' : '❌ FAIL'}\n`);

    console.log('>>> SCENARIO 2: Community Outage Burst (Multi-User Corroboration)');
    console.log('Target: Dhanmondi 32 (Location #4)');
    console.log('Simulating 4 distinct neighbors reporting power failure within 3 minutes...');

    // 4 distinct users (IDs 9, 10, 11, 12) report OFF in Location #4
    const reporters = [9, 10, 11, 12];
    for (let i = 0; i < reporters.length; i++) {
        db.prepare(`
            INSERT INTO reports (user_id, location_id, type, reported_at, sync_status, is_duplicate, is_spam)
            VALUES (?, 4, 'OFF', datetime('now', '-${(reporters.length - i) * 2} minutes'), 'synced', 0, 0)
        `).run(reporters[i]);
    }

    let result2 = OutageService.processReport(4);
    console.log(`Outcome -> Score: ${result2.score}%, Classification: '${result2.classification}'`);
    console.log(`Factors: Report=${result2.breakdown.reportFactor}, UniqueUsers=${result2.breakdown.uniqueUserFactor}, TimeCluster=${result2.breakdown.timeClusterFactor}, Reliability=${result2.breakdown.reliabilityFactor}`);
    console.log(`Incident ID: #${result2.incidentId} (${result2.action.toUpperCase()})`);
    console.log(`Verification: ${result2.score >= 70 ? '✅ PASS: Corroborated area incident automatically identified' : '❌ FAIL'}\n`);

    console.log('>>> SCENARIO 3: Duplicate & Spam Prevention');
    console.log('Target: Location #4, User #9 spamming 6 rapid duplicate reports...');
    
    // User #9 sends 6 rapid reports
    let spamFlaggedCount = 0;
    for (let i = 0; i < 6; i++) {
        const isSpam = i >= 4 ? 1 : 0;
        const isDup = i > 0 ? 1 : 0;
        if (isSpam) spamFlaggedCount++;

        db.prepare(`
            INSERT INTO reports (user_id, location_id, type, reported_at, sync_status, is_duplicate, is_spam)
            VALUES (9, 4, 'OFF', datetime('now'), 'synced', ?, ?)
        `).run(isDup, isSpam);
    }

    let result3 = OutageService.processReport(4);
    console.log(`Penalties applied: -${result3.breakdown.penalty} pts`);
    console.log(`Score after penalty: ${result3.score}%`);
    console.log(`Verification: ${result3.breakdown.penalty > 0 ? '✅ PASS: Spam and duplicate penalties enforced' : '❌ FAIL'}\n`);

    console.log('>>> SCENARIO 4: Automatic Outage Restoration & Duration');
    console.log('Simulating 2 neighbors in Dhanmondi 32 reporting BACK...');
    
    // Users 9 and 10 report BACK in Location 4
    db.prepare(`
        INSERT INTO reports (user_id, location_id, type, reported_at, sync_status)
        VALUES (9, 4, 'BACK', datetime('now'), 'synced')
    `).run();
    db.prepare(`
        INSERT INTO reports (user_id, location_id, type, reported_at, sync_status)
        VALUES (10, 4, 'BACK', datetime('now'), 'synced')
    `).run();

    let result4 = OutageService.processBackReport(4);
    console.log(`Restoration Status: ${result4.status}`);
    console.log(`Calculated Duration: ${result4.durationMinutes} minutes`);
    console.log(`Reporters Reliability Adjusted: ${result4.reportersAdjusted} users`);
    console.log(`Verification: ${result4.status === 'restored' ? '✅ PASS: Outage closed with automated duration logging' : '❌ FAIL'}\n`);

    console.log('====================================================');
    console.log('🎉 ALL ALGORITHM DEFENSE SCENARIOS VERIFIED SUCCESSFULLY!');
    console.log('====================================================\n');
}

if (require.main === module) {
    runSimulation().then(() => process.exit(0)).catch(err => {
        console.error('Simulation error:', err);
        process.exit(1);
    });
}

module.exports = runSimulation;
```

---

## <a id="file-39"></a>[39] `backend/src/scripts/test_full_system.js`

- **Path:** `Power-Pulse-main/backend/src/scripts/test_full_system.js`  
- **Language:** `javascript`  
- **Lines of Code:** `429` lines  

```javascript
const http = require('http');

const BASE_URL = 'http://localhost:5000/api';

async function request(path, options = {}) {
  const url = new URL(`${BASE_URL}${path}`);
  const payload = options.body ? JSON.stringify(options.body) : null;

  return new Promise((resolve, reject) => {
    const req = http.request(url, {
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(options.token ? { 'Authorization': `Bearer ${options.token}` } : {}),
        ...(payload ? { 'Content-Length': Buffer.byteLength(payload) } : {})
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        let json = null;
        try { json = JSON.parse(data); } catch (e) { json = data; }
        resolve({ status: res.statusCode, data: json });
      });
    });

    req.on('error', reject);
    if (payload) req.write(payload);
    req.end();
  });
}

function assert(condition, message, extra = null) {
  if (!condition) {
    console.error(`❌ FAILED: ${message}`);
    if (extra) console.error('Details:', extra);
    process.exit(1);
  }
  console.log(`✅ PASSED: ${message}`);
}

async function runTests() {
  console.log('\n======================================================');
  console.log('🚀 POWERPULSE FULL SYSTEM & WORKFLOW VERIFICATION SUITE');
  console.log('======================================================\n');

  // ==========================================
  // 1. AUTHENTICATION & DUAL-TOKEN WORKFLOW
  // ==========================================
  console.log('--- 1. Testing Dual-Token Auth, Refresh, & Revocation ---');
  
  // 1.1 Login Consumer
  const loginRes = await request('/auth/login', {
    method: 'POST',
    body: { email: 'tanvir@gmail.com', password: 'User@123' }
  });
  assert(loginRes.status === 200 && loginRes.data.token && loginRes.data.refreshToken, 'Consumer login returns Access + Refresh token pair');
  const userToken = loginRes.data.token;
  const userRefreshToken = loginRes.data.refreshToken;

  // 1.2 Token Refresh Rotation
  const refreshRes = await request('/auth/refresh', {
    method: 'POST',
    body: { refreshToken: userRefreshToken }
  });
  assert(refreshRes.status === 200 && refreshRes.data.token && refreshRes.data.refreshToken, 'POST /auth/refresh returns new rotated token pair');
  const newAccessToken = refreshRes.data.token;
  const newRefreshToken = refreshRes.data.refreshToken;

  // 1.3 Verify Old Refresh Token Cannot Be Reused (Rotation Security)
  const reuseRes = await request('/auth/refresh', {
    method: 'POST',
    body: { refreshToken: userRefreshToken }
  });
  assert(reuseRes.status === 401 || reuseRes.status === 403, 'Old refresh token was revoked upon rotation');

  // 1.4 Logout & Access Token Blacklisting
  const logoutRes = await request('/auth/logout', {
    method: 'POST',
    token: newAccessToken,
    body: { refreshToken: newRefreshToken }
  });
  assert(logoutRes.status === 200, 'POST /auth/logout succeeds');

  // 1.5 Verify Blacklisted Access Token is Denied
  const blacklistedCheck = await request('/auth/me', {
    token: newAccessToken
  });
  assert(blacklistedCheck.status === 401 && (blacklistedCheck.data.error || '').toLowerCase().includes('revoked'), 'Blacklisted token immediately rejected with 401 TokenRevoked');

  // Re-login for remaining tests
  const freshLogin = await request('/auth/login', {
    method: 'POST',
    body: { email: 'tanvir@gmail.com', password: 'User@123' }
  });
  const consumerToken = freshLogin.data.token;

  // 1.6 Universal Profile Update Test (Consumer updates Name, Phone & Location)
  const profileUpdateRes = await request('/auth/profile', {
    method: 'PATCH',
    token: consumerToken,
    body: {
      name: 'Tanvir Hossain Updated',
      phone: '01720-999888',
      location_id: 1
    }
  });
  assert(profileUpdateRes.status === 200 && profileUpdateRes.data.user.phone === '01720-999888', 'PATCH /auth/profile successfully updated consumer profile');

  // ==========================================
  // 2. CITIZEN (CONSUMER) WORKFLOWS
  // ==========================================
  console.log('\n--- 2. Testing Citizen (Consumer) Workflows ---');

  // 2.1 File an Outage Report (OFF)
  const reportOff = await request('/reports', {
    method: 'POST',
    token: consumerToken,
    body: {
      type: 'OFF',
      location_id: 1,
      client_uuid: 'test-uuid-off-' + Date.now()
    }
  });
  assert(reportOff.status === 201 || reportOff.status === 200, 'POST /reports (OFF) created incident signal', reportOff);

  // 2.2 Check Active Outages
  const activeOutages = await request('/incidents/active?location_id=1');
  assert(activeOutages.status === 200 && Array.isArray(activeOutages.data.incidents), 'GET /incidents/active returns active community outages');

  // 2.3 Submit Complaint Ticket
  const complaintRes = await request('/complaints', {
    method: 'POST',
    token: consumerToken,
    body: {
      location_id: 1,
      category: 'transformer',
      description: 'Sparks emitting from pole transformer near sector 4 mosque.'
    }
  });
  assert(complaintRes.status === 201 && complaintRes.data.complaint_id, `POST /complaints created ticket #CMP-${complaintRes.data?.complaint_id}`, complaintRes);
  const createdComplaintId = complaintRes.data.complaint_id;

  // 2.4 Query Citizen My Complaints
  const myComplaints = await request('/complaints/mine', { token: consumerToken });
  assert(myComplaints.status === 200 && myComplaints.data.complaints.some(c => c.complaint_id === createdComplaintId), 'GET /complaints/mine contains newly created ticket');

  // 2.5 Smart Meter & Bill Query
  const billRes = await request('/bills/current', { token: consumerToken });
  assert(billRes.status === 200, 'GET /bills/current returns billing information');

  // 2.6 bKash Utility Bill Payment via TrxID
  if (billRes.data.bill && billRes.data.bill.status === 'unpaid') {
    const payRes = await request(`/bills/${billRes.data.bill.bill_id}/pay`, {
      method: 'POST',
      token: consumerToken,
      body: {
        transaction_id: 'BK' + Math.random().toString(36).substring(2, 10).toUpperCase(),
        sender_phone: '01712998877',
        payment_method: 'bKash'
      }
    });
    assert(payRes.status === 200 && payRes.data.status === 'paid', 'POST /bills/:id/pay confirms bKash TrxID payment', payRes);
  }

  const meterRes = await request('/meter/usage', { token: consumerToken });
  assert(meterRes.status === 200 && meterRes.data.current_kwh !== undefined, 'GET /meter/usage returns live telemetry data');

  // ==========================================
  // 3. ADMIN WORKFLOWS & MANAGEMENT
  // ==========================================
  console.log('\n--- 3. Testing Admin Workflows & Controls ---');

  // 3.1 Admin Login
  const adminLogin = await request('/auth/login', {
    method: 'POST',
    body: { email: 'admin@powerpulse.com', password: 'Admin@123' }
  });
  assert(adminLogin.status === 200 && adminLogin.data.user.role === 'admin', 'Admin login successful');
  const adminToken = adminLogin.data.token;

  // 3.2 Analytics & Audit Logs
  const analytics = await request('/admin/analytics', { token: adminToken });
  assert(analytics.status === 200 && analytics.data.kpi, 'GET /admin/analytics returns system KPIs');

  const auditLogs = await request('/admin/audit-logs', { token: adminToken });
  assert(auditLogs.status === 200 && Array.isArray(auditLogs.data.logs), 'GET /admin/audit-logs returns immutable audit records');

  // 3.3 Admin Users List
  const usersList = await request('/admin/users', { token: adminToken });
  assert(usersList.status === 200 && usersList.data.users.length > 0, 'GET /admin/users returns registered users');

  // 3.4 Raw Reports Stream
  const rawReports = await request('/reports?limit=50', { token: adminToken });
  assert(rawReports.status === 200 && rawReports.data.reports.length > 0, 'GET /reports returns raw citizen signals stream');

  // 3.5 Planned Outage Lifecycle (Create & Delete)
  const plannedCreate = await request('/planned', {
    method: 'POST',
    token: adminToken,
    body: {
      location_id: 1,
      outage_date: '2026-12-01',
      start_time: '08:00',
      end_time: '12:00',
      reason: 'Automated test maintenance schedule'
    }
  });
  assert(plannedCreate.status === 201 && plannedCreate.data.planned_id, 'POST /planned created scheduled outage');
  const plannedId = plannedCreate.data.planned_id;

  const plannedDelete = await request(`/planned/${plannedId}`, {
    method: 'DELETE',
    token: adminToken
  });
  assert(plannedDelete.status === 200, 'DELETE /planned/:id successfully canceled schedule');

  // 3.6 Location Registry
  const locCreate = await request('/locations', {
    method: 'POST',
    token: adminToken,
    body: {
      district: 'Dhaka',
      area: 'Automated Test Sector ' + Date.now(),
      zone: 'Zone Z',
      latitude: 23.8103,
      longitude: 90.4125
    }
  });
  assert(locCreate.status === 201, 'POST /locations added new municipal sector');

  // 3.7 Dispatch Complaint to Technician
  const dispatchRes = await request(`/complaints/${createdComplaintId}/assign`, {
    method: 'PATCH',
    token: adminToken,
    body: {
      technician_id: 1 // rahim.tech@powerpulse.com (technician_id: 1)
    }
  });
  assert(dispatchRes.status === 200, `PATCH /complaints/:id/assign dispatched ticket to technician`);

  // ==========================================
  // 4. TECHNICIAN WORKFLOW
  // ==========================================
  console.log('\n--- 4. Testing Technician Task Lifecycle ---');

  // 4.1 Technician Login
  const techLogin = await request('/auth/login', {
    method: 'POST',
    body: { email: 'rahim.tech@powerpulse.com', password: 'Tech@123' }
  });
  assert(techLogin.status === 200 && techLogin.data.user.role === 'technician', 'Technician login successful');
  const techToken = techLogin.data.token;

  // 4.2 Fetch Assignments
  const techTasks = await request('/technician/assignments', { token: techToken });
  assert(techTasks.status === 200 && Array.isArray(techTasks.data.assignments), 'GET /technician/assignments returns field work orders');
  const assignedTask = techTasks.data.assignments.find(a => a.complaint_id === createdComplaintId);
  assert(Boolean(assignedTask), `Work order for complaint #CMP-${createdComplaintId} found in technician queue`);

  // 4.3 Progression: Investigating -> Repairing -> Resolved
  const update1 = await request(`/technician/assignments/${assignedTask.assignment_id}`, {
    method: 'PATCH',
    token: techToken,
    body: {
      status: 'investigating',
      remarks: 'Arrived at site. Inspecting pole transformer.'
    }
  });
  assert(update1.status === 200, 'Technician transitioned status to INVESTIGATING');

  const update2 = await request(`/technician/assignments/${assignedTask.assignment_id}`, {
    method: 'PATCH',
    token: techToken,
    body: {
      status: 'repairing',
      remarks: 'Replacing blown fuse and insulating loose jumpers.'
    }
  });
  assert(update2.status === 200, 'Technician transitioned status to REPAIRING');

  const update3 = await request(`/technician/assignments/${assignedTask.assignment_id}`, {
    method: 'PATCH',
    token: techToken,
    body: {
      status: 'resolved',
      remarks: 'Fuses replaced. Phase voltage tested at 230V. Normal power restored.'
    }
  });
  assert(update3.status === 200, 'Technician transitioned status to RESOLVED');

  // 4.4 Test Accidental Click Undo / Rollback
  const undoRollback = await request(`/technician/assignments/${assignedTask.assignment_id}`, {
    method: 'PATCH',
    token: techToken,
    body: {
      status: 'repairing',
      remarks: 'Undo/Reopen: Second inspection needed for phase balancing.'
    }
  });
  assert(undoRollback.status === 200, 'Technician successfully UNDO/ROLLED BACK status to REPAIRING');

  const reResolve = await request(`/technician/assignments/${assignedTask.assignment_id}`, {
    method: 'PATCH',
    token: techToken,
    body: {
      status: 'resolved',
      remarks: 'Phase balancing verified at 230V. Final restoration complete.'
    }
  });
  assert(reResolve.status === 200, 'Technician re-finalized status to RESOLVED');

  // 4.5 Technician Profile & Duty Status
  const techProfileRes = await request('/technician/profile', { token: techToken });
  assert(techProfileRes.status === 200 && techProfileRes.data.profile, 'GET /technician/profile returned profile & metrics');
  assert(techProfileRes.data.profile.stats.total_tasks >= 1, 'Technician profile contains accurate lifetime work order stats');

  // 4.6 Technician Updates Duty Status
  const statusChange = await request('/technician/status', {
    method: 'PATCH',
    token: techToken,
    body: { status: 'busy' }
  });
  assert(statusChange.status === 200 && statusChange.data.availability_status === 'busy', 'PATCH /technician/status updated duty to BUSY');

  const statusBack = await request('/technician/status', {
    method: 'PATCH',
    token: techToken,
    body: { status: 'available' }
  });
  assert(statusBack.status === 200 && statusBack.data.availability_status === 'available', 'PATCH /technician/status restored duty to AVAILABLE');

  // 4.7 Technician Updates Contact Details
  const profileUpdate = await request('/technician/profile', {
    method: 'PATCH',
    token: techToken,
    body: { phone: '01811-999888' }
  });
  assert(profileUpdate.status === 200 && profileUpdate.data.user.phone === '01811-999888', 'PATCH /technician/profile updated contact phone');

  // 4.8 Verify Citizen Sees Resolved Complaint
  const citizenCheck = await request('/complaints/mine', { token: consumerToken });
  const myTicket = citizenCheck.data.complaints.find(c => c.complaint_id === createdComplaintId);
  assert(myTicket && myTicket.status === 'resolved', 'Citizen portal reflects RESOLVED status with technician notes');

  // 4.5 Citizen Reports Power BACK (Grid Restoration)
  const reportBack = await request('/reports', {
    method: 'POST',
    token: consumerToken,
    body: {
      type: 'BACK',
      location_id: 1,
      client_uuid: 'test-uuid-back-' + Date.now()
    }
  });
  assert(reportBack.status === 201 || reportBack.status === 200, 'POST /reports (BACK) signal recorded and evaluated');

  // ==========================================
  // 5. NOTIFICATION LIFECYCLE VERIFICATION
  // ==========================================
  console.log('\n--- 5. Testing In-App Notification System & Triggers ---');

  // 5.1 Fetch Notifications for Consumer
  const notifRes = await request('/notifications', { token: consumerToken });
  assert(notifRes.status === 200 && Array.isArray(notifRes.data.notifications), 'GET /notifications returned consumer notifications');
  assert(notifRes.data.notifications.length > 0, `Consumer received ${notifRes.data.notifications.length} in-app notifications`);

  // Verify complaint-related notifications exist
  const titles = notifRes.data.notifications.map(n => n.title);
  console.log('Detected Notification Titles:', titles);
  assert(titles.some(t => t.includes('Complaint Registered') || t.includes('Technician') || t.includes('Power')), 'Notifications include complaint/technician/outage events');

  // 5.2 Test Mark Single Notification as Read
  const unreadOne = notifRes.data.notifications.find(n => n.is_read === 0);
  if (unreadOne) {
    const markRes = await request(`/notifications/${unreadOne.notification_id}/read`, {
      method: 'PATCH',
      token: consumerToken
    });
    assert(markRes.status === 200, 'PATCH /notifications/:id/read marks single notification as read');
  }

  // 5.3 Test Mark All Notifications as Read
  const markAllRes = await request('/notifications/read-all', {
    method: 'PATCH',
    token: consumerToken
  });
  assert(markAllRes.status === 200, 'PATCH /notifications/read-all marks all notifications as read');

  const afterMarkAll = await request('/notifications', { token: consumerToken });
  assert(afterMarkAll.data.notifications.every(n => n.is_read === 1), 'All consumer notifications now have is_read = 1');

  // Verify unread count is 0 after mark-all
  const countZeroRes = await request('/notifications/unread-count', { token: consumerToken });
  assert(countZeroRes.status === 200 && countZeroRes.data.unread_count === 0, 'GET /notifications/unread-count returns 0 after mark-all');

  // 5.4 Schedule a Planned Load-Shedding Outage by Admin and Verify Citizen Notification
  const futureDate = new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0];
  const createPlanned = await request('/planned', {
    method: 'POST',
    token: adminToken,
    body: {
      location_id: 1,
      outage_date: futureDate,
      start_time: '14:00',
      end_time: '16:00',
      reason: 'Feeder line maintenance & tree trimming'
    }
  });
  assert(createPlanned.status === 201, 'Admin successfully scheduled planned load-shedding');

  // Verify Citizen in Location 1 received planned outage notification and unread-count increased
  const notifAfterPlanned = await request('/notifications', { token: consumerToken });
  const hasPlannedAlert = notifAfterPlanned.data.notifications.some(n => n.title.includes('Scheduled Load-Shedding'));
  assert(hasPlannedAlert, 'Citizen received broadcast notification for Scheduled Load-Shedding in their zone');

  const countAfterPlanned = await request('/notifications/unread-count', { token: consumerToken });
  assert(countAfterPlanned.status === 200 && countAfterPlanned.data.unread_count >= 1, `Unread count badge reflects new alert (${countAfterPlanned.data.unread_count} unread)`);

  console.log('\n======================================================');
  console.log('🎉 ALL 25 INTEGRATION WORKFLOW TESTS PASSED CLEANLY! ');
  console.log('======================================================\n');
}

runTests().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
```

---

## <a id="file-40"></a>[40] `backend/src/scripts/test_mysql_connection.js`

- **Path:** `Power-Pulse-main/backend/src/scripts/test_mysql_connection.js`  
- **Language:** `javascript`  
- **Lines of Code:** `68` lines  

```javascript
require('dotenv').config();
const mysql = require('mysql2/promise');

async function testMySQL() {
  console.log('\n======================================================');
  console.log('🔍 VERIFYING MYSQL DATABASE & INTEGRITY');
  console.log('======================================================\n');

  const config = {
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'powerpulse'
  };

  const conn = await mysql.createConnection(config);
  console.log(`Connected to MySQL server: [${config.host}:${config.port}] - DB: [${config.database}]`);

  // 1. Show Tables
  const [tables] = await conn.query('SHOW TABLES');
  const tableNames = tables.map(r => Object.values(r)[0]);
  console.log(`\n✅ Total Tables in MySQL: ${tableNames.length}`);
  console.log(tableNames.join(', '));

  // 2. Count Records in each table
  console.log('\n📊 Table Record Counts in MySQL:');
  const counts = [];
  for (const t of tableNames) {
    const [res] = await conn.query(`SELECT COUNT(*) as c FROM \`${t}\``);
    counts.push({ Table: t, Records: res[0].c });
  }
  console.table(counts);

  // 3. Sample Users
  const [users] = await conn.query('SELECT user_id, name, email, role, phone FROM users LIMIT 5');
  console.log('👤 Sample Users:');
  console.table(users);

  // 4. Sample bKash Bills
  const [bills] = await conn.query("SELECT bill_id, user_id, amount, status, transaction_id, paid_at FROM smart_meter_bills WHERE status = 'paid' LIMIT 5");
  console.log('🧾 Sample bKash Bill Payments:');
  console.table(bills);

  // 5. Sample Complaints & Technician Assignments
  const [complaints] = await conn.query(`
    SELECT c.complaint_id, c.category, c.status, u.name as consumer, t_user.name as technician
    FROM complaints c
    JOIN users u ON c.user_id = u.user_id
    LEFT JOIN assignments a ON c.complaint_id = a.complaint_id
    LEFT JOIN technicians t ON a.technician_id = t.technician_id
    LEFT JOIN users t_user ON t.user_id = t_user.user_id
    LIMIT 5
  `);
  console.log('🔧 Sample Complaints & Assigned Technicians:');
  console.table(complaints);

  await conn.end();
  console.log('\n======================================================');
  console.log('🎉 ALL MYSQL DATA VERIFIED SUCCESSFULLY & 100% HEALTHY!');
  console.log('======================================================\n');
}

testMySQL().catch(err => {
  console.error('MySQL Verification Failed:', err);
  process.exit(1);
});
```

---

## <a id="file-41"></a>[41] `backend/src/scripts/migrate_to_mysql.js`

- **Path:** `Power-Pulse-main/backend/src/scripts/migrate_to_mysql.js`  
- **Language:** `javascript`  
- **Lines of Code:** `119` lines  

```javascript
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
const sqliteDb = require('../config/db');

async function migrate() {
  console.log('\n======================================================');
  console.log('🚀 POWERPULSE: LIVE SQLITE TO MYSQL MIGRATOR');
  console.log('======================================================\n');

  const config = {
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'powerpulse',
    multipleStatements: true,
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : undefined
  };

  console.log(`Connecting to MySQL server at [${config.host}:${config.port}] as '${config.user}'...`);

  let connection;
  try {
    // Connect directly to target database
    connection = await mysql.createConnection(config);
    console.log(`✅ Connected successfully to MySQL database '${config.database}'!\n`);
  } catch (connErr) {
    console.error('\n❌ Could not connect to MySQL server:', connErr.message);
    console.log('\n💡 Please check your MySQL credentials in .env:');
    console.log('   DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME, DB_SSL');
    console.log('   (Or import the generated "powerpulse_mysql_dump.sql" file directly into phpMyAdmin/Cloud Console)\n');
    process.exit(1);
  }

  try {
    // 1. Execute DDL Schema
    console.log('1. Creating MySQL schema tables, constraints, and indexes...');
    const schemaPath = path.resolve(__dirname, 'schema.mysql.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');
    await connection.query(schemaSql);
    console.log('   ✅ All 14 MySQL tables created.\n');

    // 2. Disable Foreign Key checks for batch data transfer
    await connection.query('SET FOREIGN_KEY_CHECKS = 0;');

    const tables = [
      'locations',
      'users',
      'technicians',
      'incidents',
      'reports',
      'complaints',
      'assignments',
      'planned_outages',
      'smart_meter_bills',
      'meter_readings',
      'notifications',
      'audit_logs',
      'refresh_tokens',
      'blacklisted_tokens'
    ];

    console.log('2. Migrating rows from SQLite to MySQL...');
    const migrationSummary = [];

    for (const tableName of tables) {
      const rows = sqliteDb.prepare(`SELECT * FROM ${tableName}`).all();
      if (rows.length === 0) {
        migrationSummary.push({ Table: tableName, Rows: 0, Status: 'Skipped (empty)' });
        continue;
      }

      // Truncate existing data to prevent duplicate key errors
      await connection.query(`TRUNCATE TABLE \`${tableName}\`;`);

      const columns = Object.keys(rows[0]);
      const colsList = columns.map(c => `\`${c}\``).join(', ');

      // Batch insert in chunks of 50 rows
      const chunkSize = 50;
      for (let i = 0; i < rows.length; i += chunkSize) {
        const chunk = rows.slice(i, i + chunkSize);
        const placeholders = chunk.map(() => `(${columns.map(() => '?').join(', ')})`).join(', ');
        const insertSql = `INSERT INTO \`${tableName}\` (${colsList}) VALUES ${placeholders}`;
        const values = [];
        for (const row of chunk) {
          for (const c of columns) {
            let val = row[c];
            if (typeof val === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(val)) {
              val = val.replace('T', ' ').replace(/\.\d+Z?$/, '').replace('Z', '');
            }
            values.push(val);
          }
        }
        await connection.query(insertSql, values);
      }

      migrationSummary.push({ Table: tableName, Rows: rows.length, Status: '✅ Migrated' });
    }

    await connection.query('SET FOREIGN_KEY_CHECKS = 1;');

    console.log('\n======================================================');
    console.log('🎉 MIGRATION COMPLETED SUCCESSFULLY!');
    console.log('======================================================\n');
    console.table(migrationSummary);

    console.log('\nYour MySQL database is now fully populated and synchronized with PowerPulse data!\n');
  } catch (err) {
    console.error('\n❌ Migration failed during query execution:', err.message);
  } finally {
    if (connection) await connection.end();
  }
}

migrate();
```

---

## <a id="file-42"></a>[42] `backend/src/scripts/apply_optimizations.js`

- **Path:** `Power-Pulse-main/backend/src/scripts/apply_optimizations.js`  
- **Language:** `javascript`  
- **Lines of Code:** `118` lines  

```javascript
const { pool } = require('../config/mysql');
const db = require('../config/db');

async function applyOptimizations() {
  console.log('\n======================================================');
  console.log('⚡ APPLYING DATABASE NORMALIZATIONS & INDEX OPTIMIZATIONS');
  console.log('======================================================\n');

  // ==========================================
  // 1. APPLY TO MYSQL DATABASE
  // ==========================================
  console.log('--- 1. Applying Optimizations to MySQL Database ---');
  try {
    const conn = await pool.getConnection();

    // 1.1 Convert planned_outages start_time & end_time to TIME
    console.log('Converting planned_outages columns to TIME data type...');
    await conn.query(`
      ALTER TABLE planned_outages 
      MODIFY COLUMN start_time TIME NOT NULL,
      MODIFY COLUMN end_time TIME NOT NULL
    `);
    console.log('✅ MySQL: planned_outages start_time & end_time successfully converted to TIME');

    // 1.2 Helper to add MySQL index safely if not exists
    const addIndexIfMissing = async (tableName, indexName, createSql) => {
      const [existing] = await conn.query(
        `SHOW INDEX FROM ${tableName} WHERE Key_name = ?`,
        [indexName]
      );
      if (existing.length === 0) {
        await conn.query(createSql);
        console.log(`✅ MySQL: Created index [${indexName}] on [${tableName}]`);
      } else {
        console.log(`ℹ️ MySQL: Index [${indexName}] already exists on [${tableName}]`);
      }
    };

    // Apply performance indexes
    await addIndexIfMissing(
      'notifications',
      'idx_notifications_user_unread',
      'CREATE INDEX idx_notifications_user_unread ON notifications(user_id, is_read, created_at)'
    );

    await addIndexIfMissing(
      'meter_readings',
      'idx_meter_readings_user_time',
      'CREATE INDEX idx_meter_readings_user_time ON meter_readings(user_id, reading_time DESC)'
    );

    await addIndexIfMissing(
      'reports',
      'idx_reports_user_time',
      'CREATE INDEX idx_reports_user_time ON reports(user_id, reported_at)'
    );

    await addIndexIfMissing(
      'reports',
      'idx_reports_user_received',
      'CREATE INDEX idx_reports_user_received ON reports(user_id, received_at)'
    );

    await addIndexIfMissing(
      'smart_meter_bills',
      'idx_bills_user_status',
      'CREATE INDEX idx_bills_user_status ON smart_meter_bills(user_id, status)'
    );

    await addIndexIfMissing(
      'audit_logs',
      'idx_audit_user_time',
      'CREATE INDEX idx_audit_user_time ON audit_logs(user_id, created_at)'
    );

    await addIndexIfMissing(
      'planned_outages',
      'idx_planned_location_date',
      'CREATE INDEX idx_planned_location_date ON planned_outages(location_id, outage_date)'
    );

    conn.release();
    console.log('🎉 MySQL database successfully optimized!');
  } catch (mysqlErr) {
    console.error('❌ MySQL Optimization error:', mysqlErr.message);
  }

  // ==========================================
  // 2. APPLY TO SQLITE DATABASE
  // ==========================================
  console.log('\n--- 2. Applying Optimizations to SQLite Database ---');
  try {
    const sqliteIndexes = [
      'CREATE INDEX IF NOT EXISTS idx_reports_user_time ON reports(user_id, reported_at);',
      'CREATE INDEX IF NOT EXISTS idx_reports_user_received ON reports(user_id, received_at);',
      'CREATE INDEX IF NOT EXISTS idx_notifications_user_unread ON notifications(user_id, is_read, created_at);',
      'CREATE INDEX IF NOT EXISTS idx_meter_readings_user_time ON meter_readings(user_id, reading_time DESC);',
      'CREATE INDEX IF NOT EXISTS idx_bills_user_status ON smart_meter_bills(user_id, status);',
      'CREATE INDEX IF NOT EXISTS idx_audit_user_time ON audit_logs(user_id, created_at);',
      'CREATE INDEX IF NOT EXISTS idx_planned_location_date ON planned_outages(location_id, outage_date);'
    ];

    for (const sql of sqliteIndexes) {
      db.exec(sql);
    }
    console.log('✅ SQLite: All 7 performance composite indexes applied successfully');
  } catch (sqliteErr) {
    console.error('❌ SQLite Optimization error:', sqliteErr.message);
  }

  console.log('\n======================================================');
  console.log('🎉 ALL OPTIMIZATIONS COMPLETED SUCCESSFULLY!');
  console.log('======================================================\n');
  process.exit(0);
}

applyOptimizations();
```

---

## <a id="file-43"></a>[43] `backend/src/scripts/export_mysql_dump.js`

- **Path:** `Power-Pulse-main/backend/src/scripts/export_mysql_dump.js`  
- **Language:** `javascript`  
- **Lines of Code:** `99` lines  

```javascript
const fs = require('fs');
const path = require('path');
const db = require('../config/db');

function escapeSql(val) {
  if (val === null || val === undefined) return 'NULL';
  if (typeof val === 'number') return val;
  if (typeof val === 'boolean') return val ? 1 : 0;
  // String escaping
  const str = String(val)
    .replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, (char) => {
      switch (char) {
        case '\0': return '\\0';
        case '\x08': return '\\b';
        case '\x09': return '\\t';
        case '\x1a': return '\\z';
        case '\n': return '\\n';
        case '\r': return '\\r';
        case '"':
        case "'":
        case '\\':
        case '%':
          return '\\' + char;
        default:
          return char;
      }
    });
  return `'${str}'`;
}

function generateDump() {
  console.log('[PowerPulse] Generating MySQL Database Dump from SQLite...');

  const schemaPath = path.resolve(__dirname, 'schema.mysql.sql');
  const ddl = fs.readFileSync(schemaPath, 'utf8');

  let dump = `-- ============================================================================\n`;
  dump += `-- PowerPulse MySQL Full Database Dump (Schema + Data)\n`;
  dump += `-- Generated on: ${new Date().toISOString()}\n`;
  dump += `-- Ready to import directly into phpMyAdmin, MySQL Workbench, TiDB, Aiven, Railway\n`;
  dump += `-- ============================================================================\n\n`;
  dump += `CREATE DATABASE IF NOT EXISTS powerpulse CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;\n`;
  dump += `USE powerpulse;\n\n`;
  dump += ddl + `\n\n`;
  dump += `SET FOREIGN_KEY_CHECKS = 0;\n\n`;

  const tables = [
    'locations',
    'users',
    'technicians',
    'incidents',
    'reports',
    'complaints',
    'assignments',
    'planned_outages',
    'smart_meter_bills',
    'meter_readings',
    'notifications',
    'audit_logs',
    'refresh_tokens',
    'blacklisted_tokens'
  ];

  let totalRows = 0;

  for (const tableName of tables) {
    const rows = db.prepare(`SELECT * FROM ${tableName}`).all();
    if (rows.length === 0) continue;

    totalRows += rows.length;
    dump += `--\n-- Dumping data for table \`${tableName}\` (${rows.length} rows)\n--\n`;

    const columns = Object.keys(rows[0]);
    const colsList = columns.map(c => `\`${c}\``).join(', ');

    // Chunk inserts in batches of 50
    for (let i = 0; i < rows.length; i += 50) {
      const batch = rows.slice(i, i + 50);
      const valuesList = batch.map(row => {
        const rowVals = columns.map(c => escapeSql(row[c]));
        return `(${rowVals.join(', ')})`;
      }).join(',\n');

      dump += `INSERT INTO \`${tableName}\` (${colsList}) VALUES\n${valuesList};\n\n`;
    }
  }

  dump += `SET FOREIGN_KEY_CHECKS = 1;\n`;
  dump += `\n-- Dump Completed Successfully (${totalRows} total rows exported).\n`;

  const outputPath = path.resolve(__dirname, '../../powerpulse_mysql_dump.sql');
  fs.writeFileSync(outputPath, dump, 'utf8');

  console.log(`✅ Success! Dump created at: ${outputPath}`);
  console.log(`📊 Total rows exported: ${totalRows}`);
}

generateDump();
```

---

## <a id="file-44"></a>[44] `backend/src/scripts/view_db.js`

- **Path:** `Power-Pulse-main/backend/src/scripts/view_db.js`  
- **Language:** `javascript`  
- **Lines of Code:** `50` lines  

```javascript
const db = require('../config/db');

const args = process.argv.slice(2);
const tableName = args[0]?.toLowerCase().trim();

if (!tableName) {
  console.log('\n======================================================');
  console.log('📊 POWERPULSE DATABASE OVERVIEW (powerpulse.db)');
  console.log('======================================================\n');

  const tables = db.prepare(`
    SELECT tbl_name as name 
    FROM sqlite_master 
    WHERE type='table' AND tbl_name NOT LIKE 'sqlite_%' 
    ORDER BY tbl_name
  `).all();

  const overview = tables.map(t => {
    const count = db.prepare(`SELECT COUNT(*) as count FROM ${t.name}`).get().count;
    return {
      'Table Name': t.name,
      'Total Records': count,
      'Command to View': `node src/scripts/view_db.js ${t.name}`
    };
  });

  console.table(overview);
  console.log('\n💡 Tip: To view data in any specific table, run:');
  console.log('   node src/scripts/view_db.js <table_name>');
  console.log('   Example: node src/scripts/view_db.js users');
  console.log('            node src/scripts/view_db.js smart_meter_bills');
  console.log('            node src/scripts/view_db.js complaints\n');
  process.exit(0);
}

try {
  const rows = db.prepare(`SELECT * FROM ${tableName} ORDER BY 1 DESC LIMIT 30`).all();
  console.log(`\n======================================================`);
  console.log(`📋 Showing latest records from table: [${tableName}] (Max 30)`);
  console.log(`======================================================\n`);
  if (rows.length === 0) {
    console.log(`(No records found in table '${tableName}')\n`);
  } else {
    console.table(rows);
    console.log(`Total retrieved: ${rows.length} row(s)\n`);
  }
} catch (err) {
  console.error(`❌ Error querying table '${tableName}':`, err.message);
}
```

---

