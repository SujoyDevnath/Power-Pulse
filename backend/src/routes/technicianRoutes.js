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
