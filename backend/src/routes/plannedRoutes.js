const express = require('express');
const router = express.Router();
const plannedController = require('../controllers/plannedController');
const { authenticateToken } = require('../middleware/auth');
const { allowRoles } = require('../middleware/role');

router.get('/', plannedController.getPlannedOutages);
router.post('/', authenticateToken, allowRoles('admin'), plannedController.createPlannedOutage);
router.delete('/:id', authenticateToken, allowRoles('admin'), plannedController.deletePlannedOutage);

module.exports = router;
