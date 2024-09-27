const express = require('express')
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');
const authMiddleware = require('../middleware/auth');

router.post('/restaurant',authMiddleware, restaurantController.restaurantController)

module.exports = router