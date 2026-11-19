const express = require('express');
const router = express.Router();
const meterController = require('../controllers/meterController');
const { authenticateToken } = require('../middleware/auth');

// /api/meter endpoints
router.get('/usage', authenticateToken, meterController.getUsage);

module.exports = router;
