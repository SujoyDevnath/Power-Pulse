const express = require('express');
const router = express.Router();
const meterController = require('../controllers/meterController');
const { authenticateToken } = require('../middleware/auth');

// /api/bills endpoints
router.get('/current', authenticateToken, meterController.getCurrentBill);
router.get('/', authenticateToken, meterController.getBills);
router.post('/:id/pay', authenticateToken, meterController.payBill);

module.exports = router;
