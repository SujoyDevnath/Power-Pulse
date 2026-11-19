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
