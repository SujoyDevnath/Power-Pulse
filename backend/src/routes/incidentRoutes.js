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
