const express = require('express');
const router = express.Router();
const { subscriptionStripe, verifyPayment, paymentDetails } = require('../controllers/subscriptionStripe');
const authMiddleware = require('../middleware/auth');

router.post('/create-checkout-session', authMiddleware, subscriptionStripe)
router.get('/verify-payment', verifyPayment);
router.get('/paymentDetails', authMiddleware, paymentDetails)
module.exports = router