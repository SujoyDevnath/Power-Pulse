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
