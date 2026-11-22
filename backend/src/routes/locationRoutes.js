const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController');
const { authenticateToken } = require('../middleware/auth');
const { allowRoles } = require('../middleware/role');

router.get('/', locationController.getAllLocations);
router.post('/', authenticateToken, allowRoles('admin'), locationController.createLocation);

module.exports = router;
