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
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
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

// Start Server
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`====================================================`);
        console.log(`⚡ PowerPulse API Server running on port ${PORT}`);
        console.log(`🌐 Base URL: http://localhost:${PORT}/api`);
        console.log(`🩺 Health:   http://localhost:${PORT}/api/health`);
        console.log(`====================================================`);
    });
}

module.exports = app;
