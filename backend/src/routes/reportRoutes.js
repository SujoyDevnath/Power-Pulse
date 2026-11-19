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
