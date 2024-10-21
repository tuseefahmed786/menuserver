const express = require('express')
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');
const authMiddleware = require('../middleware/auth');

router.post('/restaurant',authMiddleware, restaurantController.restaurantController)
router.get('/api/restaurantData', authMiddleware, restaurantController.getRestaurantData)
module.exports = router